"use client";

import React, { useState } from "react";
import { Copy, Check, Calendar, Clock, MapPin } from "lucide-react";
import { SafeImage } from "@/components/common/safe-image";
import { SafeCategoryIcon } from "@/components/common/safe-category-icon";
import { Button } from "@/components/ui/button";

import { BookingItem } from "../../types/bookings.types";
import { BookingStatusBadge } from "../BookingStatusBadge";
import { CATEGORIES_DATA } from "@/features/home/constants/home.constants";

interface BookingSummaryCardProps {
  booking: BookingItem;
}

export function BookingSummaryCard({ booking }: BookingSummaryCardProps) {
  const [copied, setCopied] = useState(false);

  // Tìm category khớp theo name hoặc slug
  const categoryInfo = CATEGORIES_DATA.find(
    (c) => c.name.toLowerCase() === (booking.category || "").toLowerCase(),
  );

  const handleCopyCode = () => {
    navigator.clipboard.writeText(booking.bookingCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-3.5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
      {/* 1. HEADER: BANNER TRẠNG THÁI & MÃ ĐẶT SÂN */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800/80">
        <BookingStatusBadge
          status={booking.status}
          statusText={booking.statusText}
          size="md"
          showIcon
        />

        <div className="flex items-center gap-1 text-xs">
          <span className="text-slate-400">Mã đặt:</span>
          <span className="font-extrabold text-slate-800 dark:text-slate-100">
            {booking.bookingCode}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCopyCode}
            className="h-6 w-6 rounded-md p-0 text-slate-400 hover:text-blue-600 active:scale-90"
            title="Sao chép mã"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-emerald-500" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </Button>
        </div>
      </div>

      {/* 2. BODY: THÔNG TIN SÂN VÀ BỘ MÔN */}
      <div className="mt-3 flex items-start gap-3">
        {/* Ảnh Banner Sân */}
        <div className="relative h-22 w-22 shrink-0 overflow-hidden rounded-xl border border-slate-100 bg-slate-100 dark:border-slate-800 dark:bg-slate-800">
          <SafeImage
            src={booking.imageUrl}
            alt={booking.venueName}
            fill
            className="object-cover"
            sizes="88px"
          />
        </div>

        <div className="flex flex-1 flex-col justify-center gap-1.5 min-w-0">
          {/* Tên Sân Hiển Thị Đầy Đủ */}
          <h2 className="text-sm font-extrabold leading-snug text-slate-900 dark:text-slate-100 break-words">
            {booking.venueName}
          </h2>

          {/* Badge Bộ Môn Thiết Kế Neutral Tinh Tế */}
          <div className="inline-flex items-center gap-1.5 w-fit rounded-lg bg-slate-100/90 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 px-2 py-0.5 text-[11px] font-bold text-slate-700 dark:text-slate-200">
            <SafeCategoryIcon
              icon={categoryInfo?.icon}
              alt={booking.category}
              size={25}
            />
            <span>{booking.category}</span>
          </div>

          {/* Chi tiết Thời Gian & Địa Chỉ */}
          <div className="mt-0.5 space-y-1 text-[11px] text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1.5 truncate">
              <Calendar className="h-3 w-3 text-blue-500 shrink-0" />
              <span>{booking.dateText}</span>
            </div>
            <div className="flex items-center gap-1.5 truncate">
              <Clock className="h-3 w-3 text-blue-500 shrink-0" />
              <span>{booking.timeText}</span>
            </div>
            <div className="flex items-start gap-1.5">
              <MapPin className="h-3 w-3 text-blue-500 shrink-0 mt-0.5" />
              <span className="leading-snug break-words">
                {booking.address}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
