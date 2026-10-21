import React from "react";
import Image from "next/image";
import { Star, MapPin, Clock, ChevronRight } from "lucide-react";
import { Venue } from "../types/home.types";
import { HOME_TEXTS } from "../constants/home.constants";

interface VenueMapCardProps {
  venue: Venue;
  onClick?: () => void;
}

export function VenueMapCard({ venue, onClick }: VenueMapCardProps) {
  return (
    <div
      onClick={onClick}
      className="flex cursor-pointer items-center gap-3 rounded-[24px] bg-white p-3 shadow-xl transition-all active:scale-98 dark:bg-slate-900 border border-slate-100 dark:border-slate-800"
    >
      {/* Hình ảnh bên trái */}
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-slate-100">
        <Image
          src={venue.imageUrl}
          alt={venue.name}
          fill
          className="object-cover"
          sizes="96px"
        />
      </div>

      {/* Thông tin sân bên phải */}
      <div className="flex flex-1 flex-col justify-center min-w-0 pr-1">
        <h3 className="truncate text-sm font-bold text-slate-800 dark:text-slate-100">
          {venue.name}
        </h3>

        {/* Rating */}
        <div className="mt-1 flex items-center gap-1 text-[11px] text-slate-500">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          <span className="font-bold text-slate-800 dark:text-slate-200">
            {venue.rating.toFixed(1)}
          </span>
          <span>
            ({venue.reviewCount} {HOME_TEXTS.reviewsText})
          </span>
        </div>

        {/* Địa chỉ */}
        <div className="mt-1 flex items-start gap-1 text-[11px] text-slate-500">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-blue-500 mt-0.5" />
          <span className="line-clamp-2 leading-tight">{venue.address}</span>
        </div>

        {/* Giờ mở cửa */}
        <div className="mt-1 flex items-center gap-1 text-[11px] text-slate-500">
          <Clock className="h-3.5 w-3.5 shrink-0 text-blue-500" />
          <span>{venue.openTime}</span>
        </div>
      </div>

      {/* Mũi tên chuyển trang */}
      <div className="flex items-center justify-center pr-1 text-slate-800 dark:text-slate-200">
        <ChevronRight className="h-5 w-5" />
      </div>
    </div>
  );
}
