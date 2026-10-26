"use client";

import React from "react";
import { ImageOff } from "lucide-react";
import { Venue } from "../../types/home.types";
import { HOME_TEXTS } from "../../constants/home.constants";
import { SafeImage } from "@/components/common/safe-image";

interface TabGalleryProps {
  venue: Venue;
}

export function TabGallery({ venue }: TabGalleryProps) {
  const images =
    venue.images && venue.images.length > 0
      ? venue.images
      : venue.imageUrl
        ? [venue.imageUrl]
        : [];

  if (images.length === 0) {
    return (
      <div className="flex h-32 flex-col items-center justify-center text-muted-foreground">
        <ImageOff className="h-6 w-6 stroke-[1.5]" />
        <span className="mt-1 text-xs">{HOME_TEXTS.noGalleryText}</span>
      </div>
    );
  }

  return (
    <div className="space-y-2 text-xs">
      <h4 className="font-bold text-foreground mb-2">
        {HOME_TEXTS.galleryTitle}
      </h4>

      <div className="grid grid-cols-2 gap-2">
        {images.map((imgUrl, idx) => (
          <div
            key={idx}
            className="relative h-28 w-full overflow-hidden rounded-xl bg-muted border border-border"
          >
            <SafeImage
              src={imgUrl}
              alt={`${venue.name} ${idx + 1}`}
              fill
              className="object-cover transition-transform hover:scale-105"
              sizes="(max-width: 640px) 50vw, 200px"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
