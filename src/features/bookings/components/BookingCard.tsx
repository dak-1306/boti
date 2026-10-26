"use client";

import React from "react";
import { Calendar, Clock, MapPin } from "lucide-react";
import { SafeImage } from "@/components/common/safe-image";
import { Badge } from "@/components/ui/badge";
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
      className="flex cursor-pointer items-start gap-3 rounded-[22px] bg-card p-3 shadow-xs border border-border transition-all active:scale-[0.98]"
    >
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-muted flex items-center justify-center">
        <SafeImage
          src={booking.imageUrl}
          alt={booking.venueName}
          fill
          className="object-cover"
          sizes="96px"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between min-w-0 space-y-1">
        <div className="flex items-start justify-between gap-1">
          <Badge variant="sky" size="sm">
            {booking.category}
          </Badge>
          <BookingStatusBadge
            status={booking.status}
            statusText={booking.statusText}
            size="sm"
          />
        </div>

        <div>
          <h3 className="line-clamp-1 text-xs font-bold text-foreground">
            {booking.venueName}
          </h3>
        </div>

        <div className="flex items-center gap-1.5 text-[10px] font-medium text-muted-foreground">
          <Calendar className="h-3 w-3 shrink-0 text-primary" />
          <span className="truncate">{booking.dateText}</span>
        </div>

        <div className="flex items-center gap-1.5 text-[10px] font-medium text-muted-foreground">
          <Clock className="h-3 w-3 shrink-0 text-primary" />
          <span className="truncate">{booking.timeText}</span>
        </div>

        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
          <MapPin className="h-3 w-3 shrink-0 text-primary" />
          <span className="truncate">{booking.address}</span>
        </div>
      </div>
    </div>
  );
}
