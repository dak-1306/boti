"use client";

import React from "react";
import { Star, MapPin, Clock } from "lucide-react";
import { Venue } from "../types/home.types";
import { HOME_TEXTS } from "../constants/home.constants";
import { SafeImage } from "@/components/common/safe-image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface VenueCardProps {
  venue: Venue;
  onClick: () => void;
}

export function VenueCard({ venue, onClick }: VenueCardProps) {
  return (
    <div
      onClick={onClick}
      className="flex cursor-pointer flex-col overflow-hidden rounded-2xl bg-card shadow-xs border border-border transition-transform active:scale-[0.98] text-card-foreground"
    >
      <div className="relative h-28 w-full bg-muted flex items-center justify-center">
        <SafeImage
          src={venue.images?.[0] || venue.imageUrl || ""}
          alt={venue.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 50vw, 200px"
        />

        {venue.distanceText && (
          <span className="absolute top-2 left-2 z-10 rounded-md bg-primary/90 px-1.5 py-0.5 text-[9px] font-bold text-primary-foreground backdrop-blur-xs shadow-xs">
            {venue.distanceText}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col justify-between p-2.5">
        <div className="space-y-1">
          <div className="flex items-center justify-between gap-1">
            <Badge variant="sky" size="sm">
              {venue.categorySlug || venue.category}
            </Badge>
            <div className="flex items-center gap-0.5 shrink-0 text-amber-500">
              <Star className="h-3 w-3 fill-amber-500" />
              <span className="text-[11px] font-bold">{venue.rating}</span>
            </div>
          </div>

          <h3 className="line-clamp-1 text-xs font-bold text-foreground">
            {venue.name}
          </h3>

          <div className="flex items-center gap-1 text-muted-foreground">
            <MapPin className="h-3 w-3 shrink-0 text-primary" />
            <p className="line-clamp-1 text-[10px]">{venue.address}</p>
          </div>

          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="h-3 w-3 shrink-0 text-primary" />
            <span className="text-[9px] font-medium truncate">
              {venue.openTime}
            </span>
          </div>
        </div>

        <Button
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          className="mt-3 h-11 w-full rounded-xl bg-primary text-xs font-bold text-primary-foreground transition hover:bg-primary/90 active:scale-95 shadow-xs"
        >
          {HOME_TEXTS.bookBtn}
        </Button>
      </div>
    </div>
  );
}
