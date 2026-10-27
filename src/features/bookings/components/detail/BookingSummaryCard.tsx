"use client";

import React, { useState } from "react";
import { Copy, Check, Calendar, Clock, MapPin } from "lucide-react";
import { SafeImage } from "@/components/common/safe-image";
import { SafeCategoryIcon } from "@/components/common/safe-category-icon";
import { Button } from "@/components/ui/button";
import { BookingItem } from "../../types/bookings.types";
import { BookingStatusBadge } from "../BookingStatusBadge";
import { BOOKING_TEXTS } from "../../constants/bookings.constants";
import { CATEGORIES_DATA } from "@/features/home/constants/home.constants";

interface BookingSummaryCardProps {
  booking: BookingItem;
}

export function BookingSummaryCard({ booking }: BookingSummaryCardProps) {
  const [copied, setCopied] = useState(false);

  const categoryInfo = CATEGORIES_DATA.find(
    (c) => c.name.toLowerCase() === (booking.category || "").toLowerCase(),
  );

  const handleCopyCode = () => {
    navigator.clipboard.writeText(booking.bookingCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-3xl border border-border bg-card p-4 text-card-foreground shadow-md">
      {/* Thanh Trạng thái & Mã Đặt Sân */}
      <div className="flex  items-center justify-between border-b border-border/80 pb-3">
        <BookingStatusBadge
          status={booking.status}
          statusText={booking.statusText}
          size="md"
          showIcon
        />

        <div className="flex items-center gap-1.5 text-xs">
          <span className="font-extrabold text-foreground tracking-wide">
            {booking.bookingCode}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCopyCode}
            className="h-7 w-7 rounded-lg text-muted-foreground hover:bg-muted hover:text-primary active:scale-90"
            title={BOOKING_TEXTS.summaryCopyTooltip}
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-emerald-500" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </Button>
        </div>
      </div>

      {/* Thông tin Sân & Lịch chơi */}
      <div className="mt-3.5 flex items-start gap-3.5">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-border bg-muted shadow-2xs">
          <SafeImage
            src={booking.imageUrl}
            alt={booking.venueName}
            fill
            className="object-cover"
            sizes="80px"
          />
        </div>

        <div className="flex flex-1 flex-col justify-center gap-1.5 min-w-0">
          <h2 className="text-sm font-extrabold leading-snug text-foreground break-words">
            {booking.venueName}
          </h2>

          <div className="inline-flex items-center gap-1.5 w-fit rounded-lg bg-muted/80 border border-border/80 px-2 py-0.5 text-[11px] font-bold text-foreground">
            <SafeCategoryIcon
              icon={categoryInfo?.icon}
              alt={booking.category}
              size={16}
            />
            <span>{booking.category}</span>
          </div>

          <div className="mt-0.5 space-y-1 text-[11px] text-muted-foreground font-medium">
            <div className="flex items-center gap-1.5 truncate">
              <Calendar className="h-3.5 w-3.5 text-primary shrink-0" />
              <span>{booking.dateText}</span>
            </div>
            <div className="flex items-center gap-1.5 truncate">
              <Clock className="h-3.5 w-3.5 text-primary shrink-0" />
              <span>{booking.timeText}</span>
            </div>
            <div className="flex items-start gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
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
