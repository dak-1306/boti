"use client";

import React from "react";
import { Star, MapPin, Phone, ChevronLeft, Clock } from "lucide-react";
import { Venue } from "../../types/home.types";
import { SafeImage } from "@/components/common/safe-image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getCategoryMeta } from "@/constants/category.constants";

interface VenueDetailHeaderProps {
  venue: Venue;
  onClose: () => void;
}

export function VenueDetailHeader({ venue, onClose }: VenueDetailHeaderProps) {
  const bannerImg = venue.images?.[0] || venue.imageUrl || "";
  const categoryMeta = getCategoryMeta(venue.categorySlug || venue.category);

  return (
    <div className="relative w-full">
      <div className="relative h-36 w-full bg-muted overflow-hidden">
        <SafeImage
          src={bannerImg}
          alt={venue.name}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />

        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-3 left-3 z-20 h-11 w-11 rounded-full bg-card/90 text-foreground shadow-md backdrop-blur-xs hover:bg-card active:scale-95 border border-border"
          aria-label="Quay lại"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
      </div>

      <div className="relative z-10 -mt-8 px-3">
        <div className="rounded-[20px] bg-card p-3 shadow-lg border border-border text-card-foreground">
          <div className="flex items-center gap-2.5">
            <div className="min-w-0 flex-1">
              <h2 className="truncate text-sm font-bold text-foreground">
                {venue.name}
              </h2>
              <div className="mt-0.5 flex items-center gap-2">
                {/* Gọi Badge tự nhiên, sạch sẽ và chuẩn Type 100% */}
                <Badge
                  variant={categoryMeta.variant}
                  size="sm"
                  className="font-bold"
                >
                  {categoryMeta.label}
                </Badge>

                <div className="flex items-center gap-0.5 text-[10px] font-bold text-amber-500">
                  <Star className="h-3 w-3 fill-amber-500" />
                  <span>{venue.rating.toFixed(1)}</span>
                  <span className="font-normal text-muted-foreground">
                    ({venue.reviewCount})
                  </span>
                </div>
              </div>

              <div className="mt-1 flex items-center gap-1 text-[10px] text-muted-foreground">
                <MapPin className="h-3 w-3 shrink-0 text-primary" />
                <span className="truncate">{venue.address}</span>
              </div>

              <div className="mt-1 flex items-center gap-1 text-[10px] text-muted-foreground">
                <Clock className="h-3 w-3 shrink-0 text-primary" />
                <span className="truncate">{venue.openTime}</span>
              </div>

              {venue.phone && (
                <div className="mt-1 flex items-center gap-1 text-[10px] text-muted-foreground">
                  <Phone className="h-3 w-3 shrink-0 text-primary" />
                  <span className="truncate">{venue.phone}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
