"use client";

import { Star, MapPin, Clock, ChevronRight } from "lucide-react";
import { Venue } from "../../types/home.types";
import { SafeImage } from "@/components/common/safe-image";

interface VenueMapCardProps {
  venue: Venue;
  onClick?: () => void;
}

export function VenueMapCard({ venue, onClick }: VenueMapCardProps) {
  return (
    <div
      onClick={onClick}
      className="flex cursor-pointer items-center gap-3 rounded-[22px] bg-white p-2.5 shadow-xl transition-all active:scale-98 dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80"
    >
      {/* 1. Hình ảnh bên trái + Fallback & Badge Khoảng cách */}
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
        <SafeImage
          src={venue.images?.[0] || venue.imageUrl || ""}
          alt={venue.name}
          fill
          className="object-cover"
          sizes="80px"
        />

        {/* Badge khoảng cách GPS nếu có */}
        {venue.distanceText && (
          <span className="absolute top-1 left-1 rounded-md bg-blue-600/90 px-1 py-0.5 text-[8px] font-bold text-white backdrop-blur-xs shadow-xs">
            {venue.distanceText}
          </span>
        )}
      </div>

      {/* 2. Thông tin chính bên phải */}
      <div className="flex flex-1 flex-col justify-center min-w-0 pr-1 space-y-0.5">
        <div className="flex items-center justify-between gap-1">
          <span className="truncate text-[10px] font-semibold text-blue-600 dark:text-blue-400">
            {venue.category}
          </span>
          {/* Rating */}
          <div className="flex items-center gap-0.5 shrink-0 text-amber-500">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200">
              {venue.rating.toFixed(1)}
            </span>
            <span className="text-[9px] text-slate-400">
              ({venue.reviewCount})
            </span>
          </div>
        </div>

        {/* Tên sân */}
        <h3 className="truncate text-xs font-bold text-slate-800 dark:text-slate-100">
          {venue.name}
        </h3>

        {/* Địa chỉ */}
        <div className="flex items-center gap-1 text-[10px] text-slate-500 dark:text-slate-400">
          <MapPin className="h-3 w-3 shrink-0 text-slate-400" />
          <span className="truncate">{venue.address}</span>
        </div>

        {/* Giờ mở cửa */}
        <div className="flex items-center gap-1 text-[10px] text-slate-400">
          <Clock className="h-3 w-3 shrink-0" />
          <span className="truncate">{venue.openTime}</span>
        </div>
      </div>

      {/* 3. Mũi tên chỉ hướng */}
      <div className="flex items-center justify-center pr-1 text-slate-400 dark:text-slate-500">
        <ChevronRight className="h-5 w-5" />
      </div>
    </div>
  );
}
