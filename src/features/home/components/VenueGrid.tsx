import React from "react";
import { Venue } from "../types/home.types";
import { VenueCard } from "./VenueCard";

interface VenueGridProps {
  venues: Venue[];
}

export function VenueGrid({ venues }: VenueGridProps) {
  if (venues.length === 0) {
    return (
      <div className="py-8 text-center text-xs text-slate-400">
        Không tìm thấy sân phù hợp.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 px-4 pb-20">
      {venues.map((venue) => (
        <VenueCard key={venue.id} venue={venue} />
      ))}
    </div>
  );
}
