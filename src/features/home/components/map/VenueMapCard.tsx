"use client";

import React from "react";
import { Star, MapPin, Clock, ChevronRight } from "lucide-react";
import { Venue } from "../../types/home.types";
import { SafeImage } from "@/components/common/safe-image";
import { getCategoryBadgeConfig } from "@/constants/category.constants";
import { cn } from "@/lib/utils";

interface VenueMapCardProps {
  venue: Venue;
  onClick?: () => void;
}

export function VenueMapCard({ venue, onClick }: VenueMapCardProps) {
  const categoryConfig = getCategoryBadgeConfig(
    venue.categorySlug || venue.category,
  );

  return (
    <div
      onClick={onClick}
      className="flex cursor-pointer items-center gap-3 rounded-[22px] bg-card p-2.5 shadow-xl transition-all active:scale-98 border border-border text-card-foreground"
    >
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-muted flex items-center justify-center">
        <SafeImage
          src={venue.images?.[0] || venue.imageUrl || ""}
          alt={venue.name}
          fill
          className="object-cover"
          sizes="80px"
        />

        {venue.distanceText && (
          <span className="absolute top-1 left-1 rounded-md bg-primary/90 px-1 py-0.5 text-[8px] font-bold text-primary-foreground backdrop-blur-xs shadow-xs">
            {venue.distanceText}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col justify-center min-w-0 pr-1 space-y-1">
        <div className="flex items-center justify-between gap-1">
          {/* Badge Category Đồng bộ */}
          <span
            className={cn(
              "inline-flex items-center rounded-md border px-1.5 py-0.5 text-[10px] font-bold transition-colors",
              categoryConfig.badgeStyle,
            )}
          >
            {categoryConfig.label}
          </span>
          <div className="flex items-center gap-0.5 shrink-0 text-amber-500">
            <Star className="h-3 w-3 fill-amber-500" />
            <span className="text-[11px] font-bold text-foreground">
              {venue.rating.toFixed(1)}
            </span>
            <span className="text-[9px] text-muted-foreground">
              ({venue.reviewCount})
            </span>
          </div>
        </div>

        <h3 className="truncate text-xs font-bold text-foreground">
          {venue.name}
        </h3>

        <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
          <MapPin className="h-3 w-3 shrink-0 text-primary" />
          <span className="truncate">{venue.address}</span>
        </div>

        <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
          <Clock className="h-3 w-3 shrink-0 text-primary" />
          <span className="truncate">{venue.openTime}</span>
        </div>
      </div>

      <div className="flex items-center justify-center pr-1 text-muted-foreground">
        <ChevronRight className="h-5 w-5" />
      </div>
    </div>
  );
}
