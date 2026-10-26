"use client";

import React from "react";
import { motion } from "framer-motion";
import { SearchX } from "lucide-react";
import { Venue } from "../types/home.types";
import { VenueCard } from "./VenueCard";
import { HOME_TEXTS } from "../constants/home.constants";
import { Button } from "@/components/ui/button";
import {
  gridContainerVariants,
  gridItemVariants,
} from "../constants/home.motion";

interface VenueGridProps {
  venues: Venue[];
  onSelectVenue: (venue: Venue) => void;
  onResetFilters?: () => void;
}

export function VenueGrid({
  venues,
  onSelectVenue,
  onResetFilters,
}: VenueGridProps) {
  if (venues.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex h-64 flex-col items-center justify-center p-6 text-center"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          <SearchX className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="mt-3 text-sm font-bold text-foreground">
          {HOME_TEXTS.emptyGridTitle}
        </h3>
        <p className="mt-1 text-xs text-muted-foreground">
          {HOME_TEXTS.emptyGridSubtitle}
        </p>
        {onResetFilters && (
          <Button
            onClick={onResetFilters}
            className="mt-4 h-11 rounded-full bg-muted px-4 text-xs font-bold text-primary hover:bg-muted/80 transition"
          >
            {HOME_TEXTS.clearFilterBtn}
          </Button>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={gridContainerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 gap-3 px-4"
    >
      {venues.map((venue) => (
        <motion.div key={venue.id} variants={gridItemVariants}>
          <VenueCard venue={venue} onClick={() => onSelectVenue(venue)} />
        </motion.div>
      ))}
    </motion.div>
  );
}
