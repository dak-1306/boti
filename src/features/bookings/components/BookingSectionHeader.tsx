"use client";

import React from "react";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { BOOKING_TEXTS } from "../constants/bookings.constants";

interface BookingSectionHeaderProps {
  title: string;
  selectedDateText?: string | null;
  onOpenCalendar: () => void;
  onClearDateFilter?: () => void;
}

export function BookingSectionHeader({
  title,
  selectedDateText,
  onOpenCalendar,
  onClearDateFilter,
}: BookingSectionHeaderProps) {
  return (
    <div className="flex h-11 items-center justify-between px-4 bg-background border-b border-border">
      <h2 className="text-xs font-extrabold text-foreground">{title}</h2>

      <div className="flex items-center gap-1.5">
        {selectedDateText ? (
          <div className="flex h-8 items-center gap-1 rounded-full bg-primary/10 border border-primary/20 px-2.5 text-[10px] font-bold text-primary">
            <CalendarIcon className="h-3 w-3" />
            <span>{selectedDateText}</span>
            <button
              onClick={onClearDateFilter}
              className="ml-0.5 flex h-5 w-5 items-center justify-center rounded-full hover:bg-primary/20"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ) : (
          <button
            onClick={onOpenCalendar}
            className="flex h-8 items-center gap-1 rounded-full border border-border bg-card px-2.5 text-[10px] font-semibold text-muted-foreground transition hover:bg-muted active:scale-95 shadow-2xs"
          >
            <CalendarIcon className="h-3 w-3 text-muted-foreground" />
            <span>{BOOKING_TEXTS.viewAllBtn}</span>
          </button>
        )}
      </div>
    </div>
  );
}
