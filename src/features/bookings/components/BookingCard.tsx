"use client";
import { Calendar, Clock, MapPin } from "lucide-react";
import { SafeImage } from "@/components/common/safe-image";
import { BookingItem } from "../types/bookings.types";
import { BookingStatusBadge } from "./BookingStatusBadge";

interface BookingCardProps {
  booking: BookingItem;
  onClick?: () => void;
}

export function BookingCard({ booking, onClick }: BookingCardProps) {
  return (
    <div
      onClick={onClick}
      className="flex cursor-pointer items-start gap-3 rounded-[22px] bg-white p-3 shadow-xs border border-slate-100/80 dark:bg-slate-900 dark:border-slate-800 transition-all active:scale-[0.98]"
    >
      {/* 1. Hình ảnh sân bên trái */}
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
        <SafeImage
          src={booking.imageUrl}
          alt={booking.venueName}
          fill
          className="object-cover"
          sizes="96px"
        />
      </div>

      {/* 2. Thông tin đặt sân bên phải */}
      <div className="flex flex-1 flex-col justify-between min-w-0 space-y-1">
        {/* Hàng 1: Tên sân & Tag trạng thái động */}
        <div className="flex items-start justify-between gap-1">
          <h3 className="line-clamp-1 text-xs font-bold text-slate-800 dark:text-slate-100">
            {booking.venueName}
          </h3>
          <BookingStatusBadge
            status={booking.status}
            statusText={booking.statusText}
            size="sm"
          />
        </div>

        {/* Hàng 2: Pill bộ môn */}
        <div>
          <span className="inline-block rounded-full bg-sky-50 px-2 py-0.5 text-[9px] font-semibold text-sky-600 dark:bg-sky-950/60 dark:text-sky-300">
            {booking.category}
          </span>
        </div>

        {/* Hàng 3: Ngày đặt */}
        <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-600 dark:text-slate-300">
          <Calendar className="h-3 w-3 shrink-0 text-blue-500" />
          <span className="truncate">{booking.dateText}</span>
        </div>

        {/* Hàng 4: Khung giờ */}
        <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-600 dark:text-slate-300">
          <Clock className="h-3 w-3 shrink-0 text-blue-500" />
          <span className="truncate">{booking.timeText}</span>
        </div>

        {/* Hàng 5: Địa chỉ */}
        <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
          <MapPin className="h-3 w-3 shrink-0 text-slate-400" />
          <span className="truncate">{booking.address}</span>
        </div>
      </div>
    </div>
  );
}
