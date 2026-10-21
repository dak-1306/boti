import { useEffect, useRef, useState } from "react";
import { Venue, LocationState } from "../types/home.types";
import { CATEGORIES_DATA } from "../constants/home.constants";
import { autoFitMapBounds, flyToCoordinates } from "../utils/mapCamera";
import { getIconUrl } from "@/utils/getIconUrl";

interface UseLeafletMapProps {
  venues: Venue[];
  selectedVenue: Venue | null;
  onSelectVenue: (venue: Venue) => void;
  userLocation: LocationState | null;
  onRequestLocation: () => void;
}

export function useLeafletMap({
  venues,
  selectedVenue,
  onSelectVenue,
  userLocation,
  onRequestLocation,
}: UseLeafletMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const venueMarkersLayerRef = useRef<L.LayerGroup | null>(null);
  const userMarkerRef = useRef<L.Marker | null>(null);

  const [isMapReady, setIsMapReady] = useState(false);

  // 1. Khởi tạo bản đồ
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    import("leaflet").then((L) => {
      if (mapInstanceRef.current) return;

      const initialLat =
        userLocation?.lat || selectedVenue?.location.lat || 10.778;
      const initialLng =
        userLocation?.lng || selectedVenue?.location.lng || 106.669;

      const map = L.map(mapContainerRef.current!, {
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
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        setIsMapReady(false);
      }
    };
  }, []);

  // 2. Render User Marker (Chấm xanh nhấp nháy)
  useEffect(() => {
    if (!isMapReady || !mapInstanceRef.current || !userLocation) return;

    import("leaflet").then((L) => {
      if (!mapInstanceRef.current) return;

      if (userMarkerRef.current) {
        userMarkerRef.current.remove();
      }

      const userIcon = L.divIcon({
        className: "user-location-pin",
        html: `
          <div style="position: relative; width: 22px; height: 22px;">
            <div style="
              position: absolute;
              width: 100%;
              height: 100%;
              background-color: #2563eb;
              border-radius: 50%;
              opacity: 0.4;
              animation: ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite;
            "></div>
            <div style="
              position: relative;
              width: 16px;
              height: 16px;
              margin: 3px;
              background-color: #2563eb;
              border: 2.5px solid #ffffff;
              border-radius: 50%;
              box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            "></div>
          </div>
        `,
        iconSize: [22, 22],
        iconAnchor: [11, 11],
      });

      userMarkerRef.current = L.marker([userLocation.lat, userLocation.lng], {
        icon: userIcon,
        zIndexOffset: 1000,
      }).addTo(mapInstanceRef.current);
    });
  }, [isMapReady, userLocation]);

  // 3. Render Venue Markers & Auto Fit Bounds
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
          html: `
            <div style="display: flex; flex-direction: column; align-items: center; cursor: pointer;">
              <div style="
                display: flex;
                width: 32px;
                height: 32px;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                border: ${isSelected ? "3px solid #2563eb" : "2px solid #ffffff"};
                box-shadow: 0 3px 8px rgba(0, 0, 0, 0.25);
                transform: ${isSelected ? "scale(1.15)" : "scale(1)"};
                transition: transform 0.2s ease, border-color 0.2s ease;
                overflow: hidden;
                background-color: #ffffff;
              ">
                ${
                  iconSrc
                    ? `<img 
                        src="${iconSrc}" 
                        style="
                          width: 100%; 
                          height: 100%; 
                          object-fit: cover; 
                          display: block;
                        " 
                        alt="${venue.category}" 
                       />`
                    : `<span style="color: #1e293b; font-weight: bold; font-size: 11px;">${venue.category.slice(0, 1)}</span>`
                }
              </div>
              <span style="
                margin-top: 4px;
                white-space: nowrap;
                border-radius: 6px;
                background-color: rgba(255, 255, 255, 0.95);
                padding: 2px 8px;
                font-size: 10px;
                font-weight: 600;
                color: #1e293b;
                box-shadow: 0 2px 4px rgba(0,0,0,0.12);
              ">
                ${venue.name}
              </span>
            </div>
          `,
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

      autoFitMapBounds(mapInstanceRef.current, venues);
    });
  }, [isMapReady, venues, selectedVenue, onSelectVenue]);

  // Hành động bay tới vị trí người dùng
  const handleRecenterToUser = () => {
    if (userLocation && mapInstanceRef.current) {
      flyToCoordinates(mapInstanceRef.current, userLocation, 15);
    } else {
      onRequestLocation();
    }
  };

  return {
    mapContainerRef,
    handleRecenterToUser,
  };
}
