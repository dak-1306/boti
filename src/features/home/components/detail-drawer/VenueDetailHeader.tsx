"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Star,
  MapPin,
  Clock,
  Phone,
  ChevronLeft,
  ImageOff,
} from "lucide-react";
import { Venue } from "../../types/home.types";

interface VenueDetailHeaderProps {
  venue: Venue;
  onClose: () => void;
}

export function VenueDetailHeader({ venue, onClose }: VenueDetailHeaderProps) {
  const [imageError, setImageError] = useState(false);
  const bannerImg = venue.images?.[0] || venue.imageUrl || "";

  return (
    <div className="relative w-full">
      {/* 1. Banner Ảnh Sân - Tràn góc trên rounded-t-[28px] */}
      <div className="relative h-36 w-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
        {!imageError && bannerImg ? (
          <Image
            src={bannerImg}
            alt={venue.name}
            fill
            priority
            className="object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-slate-400">
            <ImageOff className="h-6 w-6" />
          </div>
        )}

        {/* Nút Back quay lại */}
        <button
          onClick={onClose}
          className="absolute top-3 left-3 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-slate-800 shadow-md backdrop-blur-xs transition active:scale-90 dark:bg-slate-900/90 dark:text-slate-100"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
      </div>

      {/* 2. Floating Card Thông tin nổi đè nhẹ lên Banner */}
      <div className="relative z-10 -mt-8 px-3">
        <div className="rounded-[20px] bg-white p-3 shadow-lg dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/60 font-bold text-blue-600 dark:text-blue-400 text-xs">
              {venue.category.slice(0, 2)}
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="truncate text-sm font-bold text-slate-800 dark:text-slate-100">
                {venue.name}
              </h2>
              <div className="mt-0.5 flex items-center gap-2">
                <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[9px] font-semibold text-blue-600 dark:bg-blue-950/60 dark:text-blue-300">
                  {venue.category}
                </span>
                <div className="flex items-center gap-0.5 text-[10px] font-bold text-amber-500">
                  <Star className="h-3 w-3 fill-amber-400" />
                  <span>{venue.rating.toFixed(1)}</span>
                  <span className="font-normal text-slate-400">
                    ({venue.reviewCount})
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
