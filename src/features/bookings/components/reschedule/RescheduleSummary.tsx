"use client";

import React from "react";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import {
  BookingItem,
  RescheduleSlotOption,
  RescheduleDateOption,
} from "../../types/bookings.types";
import { RESCHEDULE_TEXTS } from "../../constants/bookings.constants";

interface RescheduleSummaryProps {
  booking: BookingItem;
  selectedDate: RescheduleDateOption;
  selectedSlot: RescheduleSlotOption | null;
}

export function RescheduleSummary({
  booking,
  selectedDate,
  selectedSlot,
}: RescheduleSummaryProps) {
  return (
    <div className="rounded-2xl border border-border bg-muted/40 p-3 space-y-2 text-xs">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
        {/* Lịch Cũ */}
        <div className="space-y-0.5">
          <span className="text-[10px] font-bold text-muted-foreground">
            {RESCHEDULE_TEXTS.oldScheduleLabel}
          </span>
          <div className="flex items-center gap-1 font-semibold text-foreground truncate">
            <Calendar className="h-3 w-3 shrink-0 text-muted-foreground" />
            <span className="truncate">{booking.dateText.split(",")[1]}</span>
          </div>
          <div className="flex items-center gap-1 font-semibold text-foreground truncate">
            <Clock className="h-3 w-3 shrink-0 text-muted-foreground" />
            <span className="truncate">{booking.timeText.split("(")[0]}</span>
          </div>
        </div>

        <ArrowRight className="h-4 w-4 text-primary shrink-0" />

        {/* Lịch Mới */}
        <div className="space-y-0.5">
          <span className="text-[10px] font-bold text-primary">
            {RESCHEDULE_TEXTS.newScheduleLabel}
          </span>
          <div className="flex items-center gap-1 font-bold text-foreground truncate">
            <Calendar className="h-3 w-3 shrink-0 text-primary" />
            <span className="truncate">{selectedDate.displayDate}/2026</span>
          </div>
          <div className="flex items-center gap-1 font-bold text-foreground truncate">
            <Clock className="h-3 w-3 shrink-0 text-primary" />
            <span className="truncate">
              {selectedSlot
                ? `${selectedSlot.startTime}-${selectedSlot.endTime}`
                : "---"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
