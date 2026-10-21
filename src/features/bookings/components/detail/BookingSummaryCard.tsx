"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Copy, Check, Calendar, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingItem } from "../../types/bookings.types";

interface BookingSummaryCardProps {
  booking: BookingItem;
}

export function BookingSummaryCard({ booking }: BookingSummaryCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(booking.bookingCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-3.5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
      {/* Header Badge & Mã Đặt Sân */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800/80">
        <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
          ✓ {booking.statusText}
        </span>

        <div className="flex items-center gap-1 text-xs">
          <span className="text-slate-400">Mã đặt sân:</span>
          <span className="font-extrabold text-slate-800 dark:text-slate-100">
            {booking.bookingCode}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCopyCode}
            className="h-6 w-6 rounded-md p-0 text-slate-400 hover:text-blue-600"
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

      {/* Thông tin Sân */}
      <div className="mt-3 flex gap-3">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-slate-100 bg-slate-100 dark:border-slate-800 dark:bg-slate-800">
          <Image
            src={booking.imageUrl}
            alt={booking.venueName}
            fill
            className="object-cover"
            sizes="80px"
          />
        </div>

        <div className="flex flex-1 flex-col justify-center gap-1 min-w-0">
          <h2 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 truncate">
            {booking.venueName}
          </h2>

          <span className="w-fit rounded-lg bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
            {booking.category}
          </span>

          <div className="mt-1 space-y-1 text-[11px] text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1.5 truncate">
              <Calendar className="h-3 w-3 text-blue-500 shrink-0" />
              <span>{booking.dateText}</span>
            </div>
            <div className="flex items-center gap-1.5 truncate">
              <Clock className="h-3 w-3 text-blue-500 shrink-0" />
              <span>{booking.timeText}</span>
            </div>
            <div className="flex items-center gap-1.5 truncate">
              <MapPin className="h-3 w-3 text-blue-500 shrink-0" />
              <span>{booking.address}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
