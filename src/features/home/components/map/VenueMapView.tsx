"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Venue, LocationState } from "../../types/home.types";
import { VenueMapCard } from "./VenueMapCard";
import { LocationButton } from "./LocationButton";
import { useLeafletMap } from "../../hooks/useLeafletMap";
import { mapCardVariants } from "../../constants/home.motion";

interface VenueMapViewProps {
  venues: Venue[];
  selectedVenue: Venue | null;
  onSelectVenue: (venue: Venue) => void;
  userLocation: LocationState | null;
  onRequestLocation: () => void;
  isLoadingLocation: boolean;
  onOpenDetail: (venue: Venue) => void;
}

export function VenueMapView({
  venues,
  selectedVenue,
  onSelectVenue,
  userLocation,
  onRequestLocation,
  isLoadingLocation,
  onOpenDetail,
}: VenueMapViewProps) {
  const { mapContainerRef, handleRecenterToUser } = useLeafletMap({
    venues,
    selectedVenue,
    onSelectVenue,
    userLocation,
    onRequestLocation,
  });

  return (
    <div className="relative h-full w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
      {/* Container bản đồ có lớp nền chống giật/trắng hình khi load */}
      <div ref={mapContainerRef} className="h-full w-full z-0" />

      {/* Nút định vị GPS */}
      <LocationButton
        onClick={handleRecenterToUser}
        isLoading={isLoadingLocation}
        hasLocation={!!userLocation}
      />

      {/* Floating Card sân được chọn */}
      <AnimatePresence mode="wait">
        {selectedVenue && (
          <motion.div
            key={selectedVenue.id}
            variants={mapCardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute bottom-4 left-4 right-4 z-10"
          >
            <VenueMapCard
              venue={selectedVenue}
              onClick={() => onOpenDetail(selectedVenue)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
