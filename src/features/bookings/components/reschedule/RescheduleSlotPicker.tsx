"use client";

import React from "react";
import { RescheduleSlotOption } from "../../types/bookings.types";
import { RESCHEDULE_TEXTS } from "../../constants/bookings.constants";
import { cn } from "@/lib/utils";

interface RescheduleSlotPickerProps {
  courtSlots: Array<{
    courtId: string;
    courtName: string;
    slots: RescheduleSlotOption[];
  }>;
  selectedSlot: RescheduleSlotOption | null;
  onSelectSlot: (slot: RescheduleSlotOption) => void;
}

export function RescheduleSlotPicker({
  courtSlots,
  selectedSlot,
  onSelectSlot,
}: RescheduleSlotPickerProps) {
  const hasAnySamePriceSlot = courtSlots.some((c) =>
    c.slots.some((s) => s.isAvailable && s.isSamePrice),
  );

  if (!hasAnySamePriceSlot) {
    return (
      <div className="rounded-2xl border border-border bg-muted/50 p-4 text-center text-xs font-medium text-muted-foreground">
        {RESCHEDULE_TEXTS.noSlotsAvailable}
      </div>
    );
  }

  return (
    <div className="space-y-3.5">
      {courtSlots.map((court) => (
        <div key={court.courtId} className="space-y-1.5">
          <span className="text-xs font-extrabold text-foreground">
            {court.courtName}
          </span>

          <div className="grid grid-cols-3 gap-2">
            {court.slots.map((slot) => {
              const isSelected = selectedSlot?.slotId === slot.slotId;
              const isDisabled = !slot.isAvailable || !slot.isSamePrice;

              return (
                <button
                  key={slot.slotId}
                  type="button"
                  disabled={isDisabled}
                  onClick={() => onSelectSlot(slot)}
                  className={cn(
                    "flex h-11 flex-col items-center justify-center rounded-xl border px-2 text-xs font-bold transition active:scale-95",
                    isSelected &&
                      "border-primary bg-primary text-primary-foreground shadow-xs",
                    !isSelected &&
                      !isDisabled &&
                      "border-border bg-card text-foreground hover:border-primary/50",
                    isDisabled &&
                      "border-border/50 bg-muted/40 text-muted-foreground opacity-50 cursor-not-allowed",
                  )}
                >
                  <span>
                    {slot.startTime} - {slot.endTime}
                  </span>
                  {!slot.isAvailable && (
                    <span className="text-[9px] font-medium text-destructive">
                      {RESCHEDULE_TEXTS.bookedLabel}
                    </span>
                  )}
                  {slot.isAvailable && !slot.isSamePrice && (
                    <span className="text-[9px] font-medium text-muted-foreground">
                      {RESCHEDULE_TEXTS.differentPriceLabel}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
