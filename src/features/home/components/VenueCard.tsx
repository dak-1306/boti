"use client";

import { Star, MapPin, Clock} from "lucide-react";
import { Venue } from "../types/home.types";
import { HOME_TEXTS } from "../constants/home.constants";
import { SafeImage } from "@/components/common/safe-image";

interface VenueCardProps {
  venue: Venue;
  onClick: () => void;
}

export function VenueCard({ venue, onClick }: VenueCardProps) {

  return (
    <div
      onClick={onClick}
      className="flex cursor-pointer flex-col overflow-hidden rounded-2xl bg-white shadow-xs border border-slate-100 dark:bg-slate-900 dark:border-slate-800/80 transition-transform active:scale-[0.98]"
    >
      {/* 1. Khung Ảnh Sân (Xử lý Fallback khi ảnh lỗi) */}
      <div className="relative h-28 w-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
        <SafeImage
            src={venue.images?.[0] || venue.imageUrl || ""}
            alt={venue.name}
            fill
            className="object-cover"
            
          />

        {/* Badge khoảng cách GPS */}
        {venue.distanceText && (
          <span className="absolute top-2 left-2 z-10 rounded-md bg-blue-600/90 px-1.5 py-0.5 text-[9px] font-bold text-white backdrop-blur-xs shadow-xs">
            {venue.distanceText}
          </span>
        )}
      </div>

      {/* 2. Nội dung thông tin card */}
      <div className="flex flex-1 flex-col justify-between p-2.5">
        <div className="space-y-1">
          {/* Loại môn & Đánh giá */}
          <div className="flex items-center justify-between gap-1">
            <span className="truncate text-[10px] font-semibold text-blue-600 dark:text-blue-400">
              {venue.category}
            </span>
            <div className="flex items-center gap-0.5 shrink-0 text-amber-500">
              <Star className="h-3 w-3 fill-amber-500" />
              <span className="text-[11px] font-bold">{venue.rating}</span>
            </div>
          </div>

          {/* Tên sân */}
          <h3 className="line-clamp-1 text-xs font-bold text-slate-800 dark:text-slate-100">
            {venue.name}
          </h3>

          {/* Địa chỉ */}
          <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
            <MapPin className="h-3 w-3 shrink-0 text-slate-400" />
            <p className="line-clamp-1 text-[10px]">{venue.address}</p>
          </div>

          {/* Giờ mở cửa */}
          <div className="flex items-center gap-1 text-slate-400">
            <Clock className="h-3 w-3 shrink-0" />
            <span className="text-[9px] font-medium truncate">
              {venue.openTime}
            </span>
          </div>
        </div>

        {/* 3. Nút Đặt Lịch Full Width */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          className="mt-3 w-full rounded-xl bg-blue-600 py-2 text-xs font-bold text-white transition hover:bg-blue-700 active:scale-95 shadow-xs"
        >
          {HOME_TEXTS.bookBtn}
        </button>
      </div>
    </div>
  );
}
