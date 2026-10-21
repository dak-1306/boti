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
    <div className="flex items-center justify-between px-4 py-2 bg-slate-50 dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800/60">
      {/* Tiêu đề danh sách động theo Tab */}
      <h2 className="text-xs font-extrabold text-slate-800 dark:text-slate-100">
        {title}
      </h2>

      {/* Chip/Nút chọn ngày lọc */}
      <div className="flex items-center gap-1.5">
        {selectedDateText ? (
          <div className="flex items-center gap-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 px-2.5 py-1 text-[10px] font-bold text-blue-600 dark:text-blue-400">
            <CalendarIcon className="h-3 w-3" />
            <span>{selectedDateText}</span>
            <button
              onClick={onClearDateFilter}
              className="ml-0.5 rounded-full p-0.5 hover:bg-blue-100 dark:hover:bg-blue-900"
            >
              <X className="h-2.5 w-2.5" />
            </button>
          </div>
        ) : (
          <button
            onClick={onOpenCalendar}
            className="flex items-center gap-1 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-2.5 py-1 text-[10px] font-semibold text-slate-600 dark:text-slate-300 transition hover:bg-slate-100 active:scale-95 shadow-2xs"
          >
            <CalendarIcon className="h-3 w-3 text-slate-500" />
            <span>{BOOKING_TEXTS.viewAllBtn}</span>
          </button>
        )}
      </div>
    </div>
  );
}
