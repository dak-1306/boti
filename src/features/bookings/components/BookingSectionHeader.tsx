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
    <div className="flex items-center justify-between pt-4 pb-2 px-1">
      {/* Tiêu đề phân đoạn */}
      <h2 className="text-sm font-extrabold tracking-tight text-foreground">
        {title}
      </h2>

      {/* Nút bộ lọc thời gian */}
      <div className="flex items-center gap-1.5">
        {selectedDateText ? (
          <div className="flex h-8 items-center gap-1.5 rounded-full bg-primary/10 border border-primary/25 px-3 text-[11px] font-bold text-primary shadow-2xs">
            <CalendarIcon className="h-3.5 w-3.5" />
            <span>{selectedDateText}</span>
            <button
              type="button"
              onClick={onClearDateFilter}
              className="ml-0.5 -mr-1 flex h-5 w-5 items-center justify-center rounded-full hover:bg-primary/20 transition active:scale-90"
              aria-label="Xóa lọc ngày"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={onOpenCalendar}
            className="flex h-8 items-center gap-1.5 rounded-full border border-border bg-card px-3 text-[11px] font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground active:scale-95 shadow-2xs"
          >
            <CalendarIcon className="h-3.5 w-3.5 text-primary" />
            <span>{BOOKING_TEXTS.viewAllBtn}</span>
          </button>
        )}
      </div>
    </div>
  );
}