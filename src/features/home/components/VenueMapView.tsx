"use client";

import React, { useEffect, useRef } from "react";
import { Locate } from "lucide-react";
import { Venue } from "../types/home.types";
import { CATEGORIES_DATA } from "../constants/home.constants";
import { VenueMapCard } from "./VenueMapCard";
import { getIconUrl } from "@/utils/getIconUrl";
import "leaflet/dist/leaflet.css";

interface VenueMapViewProps {
  venues: Venue[];
  selectedVenue: Venue | null;
  onSelectVenue: (venue: Venue) => void;
}

export function VenueMapView({
  venues,
  selectedVenue,
  onSelectVenue,
}: VenueMapViewProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    import("leaflet").then((L) => {
      if (mapInstanceRef.current) return;

      const centerLat = selectedVenue?.location.lat || 10.778;
      const centerLng = selectedVenue?.location.lng || 10.669;

      const map = L.map(mapContainerRef.current!, {
        center: [centerLat, centerLng],
        zoom: 13,
        zoomControl: false,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      mapInstanceRef.current = map;

      venues.forEach((venue) => {
        const isSelected = selectedVenue?.id === venue.id;

        // 1. Tìm object danh mục để lấy Icon
        const categoryObj = CATEGORIES_DATA.find(
          (c) =>
            c.name.toLowerCase() === venue.category.toLowerCase() ||
            c.id.toLowerCase() === venue.category.toLowerCase(),
        );

        // 2. Lấy đường dẫn URL của SVG
        const iconSrc = getIconUrl(categoryObj?.icon);

        // 3. Render Custom Marker (Kích thước 34px, viền trắng, không dùng bg thừa)
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
        border: ${isSelected ? "2px solid #ffffff" : "1px solid #ffffff"};
        box-shadow: 0 3px 8px rgba(0, 0, 0, 0.25);
        transform: ${isSelected ? "scale(1.2)" : "scale(1)"};
        transition: transform 0.2s ease;
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
        }).addTo(map);

        marker.on("click", () => {
          onSelectVenue(venue);
          map.panTo([venue.location.lat, venue.location.lng], {
            animate: true,
          });
        });
      });
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [venues, selectedVenue, onSelectVenue]);

  useEffect(() => {
    if (mapInstanceRef.current && selectedVenue) {
      mapInstanceRef.current.panTo(
        [selectedVenue.location.lat, selectedVenue.location.lng],
        { animate: true },
      );
    }
  }, [selectedVenue]);

  const handleRecenter = () => {
    if (mapInstanceRef.current && selectedVenue) {
      mapInstanceRef.current.panTo([
        selectedVenue.location.lat,
        selectedVenue.location.lng,
      ]);
    }
  };

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div ref={mapContainerRef} className="h-full w-full z-0" />

      {/* Nút GPS Định vị */}
      <button
        onClick={handleRecenter}
        className="absolute bottom-32 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition active:scale-90"
      >
        <Locate className="h-5 w-5" />
      </button>

      {/* Floating Card hiển thị thông tin sân đang chọn */}
      {selectedVenue && (
        <div className="absolute bottom-4 left-4 right-4 z-10">
          <VenueMapCard venue={selectedVenue} />
        </div>
      )}
    </div>
  );
}
