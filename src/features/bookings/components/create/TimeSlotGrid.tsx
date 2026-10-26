"use client";

import React from "react";
import { TimeSlot } from "../../types/booking-create.types";
import { BOOKING_CREATE_TEXTS } from "../../constants/booking-create.constants";
import { cn } from "@/lib/utils";

interface TimeSlotGridProps {
  slots: TimeSlot[];
  selectedSlotIds: string[];
  onToggleSlot: (slotId: string) => void;
}

export function TimeSlotGrid({
  slots,
  selectedSlotIds,
  onToggleSlot,
}: TimeSlotGridProps) {
  return (
    <div className="space-y-2 px-4 pt-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          {BOOKING_CREATE_TEXTS.timeSlotsLabel}
        </label>
        <div className="flex items-center gap-3 text-[10px]">
          <span className="flex items-center gap-1 text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-muted border border-border" />{" "}
            {BOOKING_CREATE_TEXTS.statusAvailable}
          </span>
          <span className="flex items-center gap-1 text-primary font-bold">
            <span className="h-2 w-2 rounded-full bg-primary" />{" "}
            {BOOKING_CREATE_TEXTS.statusSelected}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {slots.map((slot) => {
          const isSelected = selectedSlotIds.includes(slot.id);
          const isDisabled = !slot.isAvailable;

          return (
            <button
              key={slot.id}
              type="button"
              disabled={isDisabled}
              onClick={() => onToggleSlot(slot.id)}
              className={cn(
                "flex h-11 items-center justify-between rounded-xl px-3 border text-xs transition-all active:scale-95",
                isDisabled
                  ? "opacity-40 bg-muted/30 border-border text-muted-foreground cursor-not-allowed line-through"
                  : isSelected
                    ? "border-primary bg-primary text-primary-foreground font-bold shadow-2xs"
                    : "border-border bg-card text-foreground hover:bg-muted",
              )}
            >
              <span className="font-semibold">
                {slot.startTime} - {slot.endTime}
              </span>
              <span className="text-[11px] opacity-90">
                {slot.price.toLocaleString("vi-VN")}đ
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
