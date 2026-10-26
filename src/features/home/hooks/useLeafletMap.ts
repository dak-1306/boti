import { useEffect, useRef, useState } from "react";
import type L from "leaflet";
import { Venue, LocationState } from "../types/home.types";
import { CATEGORIES_DATA } from "../constants/home.constants";
import { autoFitMapBounds, flyToCoordinates } from "../utils/mapCamera";
import { getIconUrl } from "@/utils/getIconUrl";
import {
  createUserPinHtml,
  createVenuePinHtml,
} from "../utils/mapMarkerTemplates";

interface UseLeafletMapProps {
  venues: Venue[];
  selectedVenue: Venue | null;
  onSelectVenue: (venue: Venue) => void;
  userLocation: LocationState | null;
  onRequestLocation?: () => void;
}

export function useLeafletMap({
  venues,
  selectedVenue,
  onSelectVenue,
  userLocation,
}: UseLeafletMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const venueMarkersLayerRef = useRef<L.LayerGroup | null>(null);
  const userMarkerRef = useRef<L.Marker | null>(null);

  const [isMapReady, setIsMapReady] = useState(false);

  // 1. Khởi tạo Leaflet Map (chỉ chạy 1 lần duy nhất ở Client)
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    let resizeObserver: ResizeObserver | null = null;

    import("leaflet").then((L) => {
      if (mapInstanceRef.current || !mapContainerRef.current) return;

      const initialLat =
        userLocation?.lat || selectedVenue?.location?.lat || 10.778;
      const initialLng =
        userLocation?.lng || selectedVenue?.location?.lng || 106.669;

      const map = L.map(mapContainerRef.current, {
        center: [initialLat, initialLng],
        zoom: 13,
        zoomControl: false,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      venueMarkersLayerRef.current = L.layerGroup().addTo(map);
      mapInstanceRef.current = map;
      setIsMapReady(true);

      setTimeout(() => {
        map.invalidateSize();
      }, 200);

      resizeObserver = new ResizeObserver(() => {
        map.invalidateSize();
      });
      resizeObserver.observe(mapContainerRef.current);
    });

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        setIsMapReady(false);
      }
    };
  }, []);

  // 2. Render marker vị trí người dùng
  useEffect(() => {
    if (!isMapReady || !mapInstanceRef.current || !userLocation) return;

    import("leaflet").then((L) => {
      if (!mapInstanceRef.current) return;

      if (userMarkerRef.current) {
        userMarkerRef.current.remove();
      }

      const userIcon = L.divIcon({
        className: "user-location-pin",
        html: createUserPinHtml(),
        iconSize: [22, 22],
        iconAnchor: [11, 11],
      });

      userMarkerRef.current = L.marker([userLocation.lat, userLocation.lng], {
        icon: userIcon,
        zIndexOffset: 1000,
      }).addTo(mapInstanceRef.current);
    });
  }, [isMapReady, userLocation]);

  // 3. Render các Marker sân bóng
  useEffect(() => {
    if (!isMapReady || !mapInstanceRef.current || !venueMarkersLayerRef.current)
      return;

    import("leaflet").then((L) => {
      if (!venueMarkersLayerRef.current || !mapInstanceRef.current) return;

      venueMarkersLayerRef.current.clearLayers();

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
        });

        marker.on("click", () => {
          onSelectVenue(venue);
          flyToCoordinates(mapInstanceRef.current!, venue.location, 15);
        });

        venueMarkersLayerRef.current?.addLayer(marker);
      });
    });
  }, [isMapReady, venues, selectedVenue, onSelectVenue]);

  // 4. Chỉ tự động fit camera khi danh sách venues thay đổi (ví dụ khi lọc)
  useEffect(() => {
    if (isMapReady && mapInstanceRef.current && venues.length > 0) {
      autoFitMapBounds(mapInstanceRef.current, venues);
    }
  }, [isMapReady, venues]);

  const handleRecenterToUser = () => {
    if (userLocation && mapInstanceRef.current) {
      flyToCoordinates(mapInstanceRef.current, userLocation, 15);
    }
  };

  return {
    mapContainerRef,
    handleRecenterToUser,
  };
}
