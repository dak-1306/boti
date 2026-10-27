"use client";

import React from "react";
import { Venue } from "../types/home.types";
import { VenueCard } from "./VenueCard";
import { Button } from "@/components/ui/button";
import { StaggerGroup } from "@/components/motion/StaggerGroup";

interface VenueGridProps {
  venues: Venue[];
  onSelectVenue: (venue: Venue) => void;
  onBookVenue?: (venueId: string) => void;
  onResetFilters: () => void;
}

export function VenueGrid({
  venues,
  onSelectVenue,
  onBookVenue,
  onResetFilters,
}: VenueGridProps) {
  if (venues.length === 0) {
    return (
      <div className="flex h-64 flex-col items-center justify-center p-4 text-center">
        <p className="text-xs text-muted-foreground">
          Không tìm thấy sân phù hợp với bộ lọc.
        </p>
        <Button
          onClick={onResetFilters}
          className="mt-3 h-11 rounded-full bg-muted px-4 text-xs font-bold text-primary hover:bg-muted/80"
        >
          Xóa bộ lọc
        </Button>
      </div>
    );
  }

  return (
    <StaggerGroup className="grid grid-cols-2 gap-3 px-4 pb-4">
      {venues.map((venue) => (
        <VenueCard
          key={venue.id}
          venue={venue}
          onClick={() => onSelectVenue(venue)}
          onBook={onBookVenue}
        />
      ))}
    </StaggerGroup>
  );
}
