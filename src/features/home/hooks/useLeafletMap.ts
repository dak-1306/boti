import { useEffect, useRef, useState, useCallback } from "react";
import type L from "leaflet";
import { Venue, LocationState } from "../types/home.types";
import { CATEGORIES_DATA } from "../constants/home.constants";
import { autoFitMapBounds, flyToCoordinates } from "../utils/mapCamera";
import { getIconUrl } from "@/utils/getIconUrl";
import {
  createUserPinHtml,
  createVenuePinHtml,
} from "../utils/mapMarkerTemplates";

// Import CSS Leaflet bắt buộc để Marker không bị vỡ layout
import "leaflet/dist/leaflet.css";

interface UseLeafletMapProps {
  venues: Venue[];
  selectedVenue: Venue | null;
  onSelectVenue: (venue: Venue) => void;
  userLocation: LocationState | null;
  isVisible: boolean; // Trạng thái hiển thị view map
}

export function useLeafletMap({
  venues,
  selectedVenue,
  onSelectVenue,
  userLocation,
  isVisible,
}: UseLeafletMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const leafletRef = useRef<typeof L | null>(null); // Lưu module Leaflet dùng chung
  const venueLayerRef = useRef<L.LayerGroup | null>(null);
  const userMarkerRef = useRef<L.Marker | null>(null);

  const [isMapReady, setIsMapReady] = useState(false);

  // Ref lưu callback để tránh re-trigger useEffect khi callback thay đổi
  const onSelectVenueRef = useRef(onSelectVenue);
  useEffect(() => {
    onSelectVenueRef.current = onSelectVenue;
  }, [onSelectVenue]);

  // 1. Khởi tạo Map DUY NHẤT 1 LẦN ở Client
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    let isMounted = true;

    import("leaflet").then((L) => {
      if (!isMounted || mapInstanceRef.current || !mapContainerRef.current)
        return;

      leafletRef.current = L;

      const initialLat =
        userLocation?.lat || selectedVenue?.location?.lat || 10.778;
      const initialLng =
        userLocation?.lng || selectedVenue?.location?.lng || 106.669;

      const map = L.map(mapContainerRef.current, {
        center: [initialLat, initialLng],
        zoom: 13,
        zoomControl: false,
        attributionControl: false,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
      }).addTo(map);

      venueLayerRef.current = L.layerGroup().addTo(map);
      mapInstanceRef.current = map;
      setIsMapReady(true);
    });

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        setIsMapReady(false);
      }
    };
  }, []);

  // 2. Tự động tính lại khung hình (invalidateSize) khi Viewport/Visibility thay đổi
  useEffect(() => {
    if (isMapReady && mapInstanceRef.current && isVisible) {
      const timer = setTimeout(() => {
        mapInstanceRef.current?.invalidateSize({ animate: false });
        if (venues.length > 0) {
          autoFitMapBounds(mapInstanceRef.current!, venues);
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isMapReady, isVisible, venues]);

  // 3. Cập nhật Marker vị trí Người dùng (Đồng bộ)
  useEffect(() => {
    const L = leafletRef.current;
    const map = mapInstanceRef.current;
    if (!isMapReady || !map || !L) return;

    if (userMarkerRef.current) {
      userMarkerRef.current.remove();
      userMarkerRef.current = null;
    }

    if (userLocation) {
      const userIcon = L.divIcon({
        className: "user-location-pin",
        html: createUserPinHtml(),
        iconSize: [22, 22],
        iconAnchor: [11, 11],
      });

      userMarkerRef.current = L.marker([userLocation.lat, userLocation.lng], {
        icon: userIcon,
        zIndexOffset: 1000,
      }).addTo(map);
    }
  }, [isMapReady, userLocation]);

  // 4. Cập nhật Marker Danh sách Sân (Đồng bộ 100%, không bị Race Condition)
  useEffect(() => {
    const L = leafletRef.current;
    const map = mapInstanceRef.current;
    const venueLayer = venueLayerRef.current;

    if (!isMapReady || !map || !L || !venueLayer) return;

    venueLayer.clearLayers();

    venues.forEach((venue) => {
      const isSelected = selectedVenue?.id === venue.id;

      const categoryObj = CATEGORIES_DATA.find(
        (c) =>
          c.name.toLowerCase() === venue.category.toLowerCase() ||
          c.id.toLowerCase() === venue.category.toLowerCase(),
      );

      const iconSrc = getIconUrl(categoryObj?.icon);

      const customIcon = L.divIcon({
        className: "custom-map-pin-clean",
        html: createVenuePinHtml(venue, isSelected, iconSrc),
        iconSize: [80, 58],
        iconAnchor: [40, 22],
      });

      const marker = L.marker([venue.location.lat, venue.location.lng], {
        icon: customIcon,
        zIndexOffset: isSelected ? 500 : 0,
      });

      marker.on("click", () => {
        onSelectVenueRef.current(venue);
        flyToCoordinates(map, venue.location, 15);
      });

      venueLayer.addLayer(marker);
    });
  }, [isMapReady, venues, selectedVenue]);

  const handleRecenterToUser = useCallback(() => {
    if (userLocation && mapInstanceRef.current) {
      flyToCoordinates(mapInstanceRef.current, userLocation, 15);
    }
  }, [userLocation]);

  return {
    mapContainerRef,
    handleRecenterToUser,
  };
}
