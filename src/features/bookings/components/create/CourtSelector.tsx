"use client";

import React from "react";
import { CourtOption } from "../../types/booking-create.types";
import { BOOKING_CREATE_TEXTS } from "../../constants/booking-create.constants";
import { cn } from "@/lib/utils";

interface CourtSelectorProps {
  courts: CourtOption[];
  selectedCourtId: string;
  onSelectCourt: (courtId: string) => void;
}

export function CourtSelector({
  courts,
  selectedCourtId,
  onSelectCourt,
}: CourtSelectorProps) {
  return (
    <div className="space-y-2 px-4 pt-3">
      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
        {BOOKING_CREATE_TEXTS.selectCourtLabel}
      </label>

      <div className="flex items-center gap-2 overflow-x-auto overflow-y-hidden no-scrollbar">
        {courts.map((court) => {
          const isSelected = court.id === selectedCourtId;
          return (
            <button
              key={court.id}
              type="button"
              onClick={() => onSelectCourt(court.id)}
              className={cn(
                "h-11 shrink-0 rounded-xl px-4 text-xs font-semibold border transition-all active:scale-95",
                isSelected
                  ? "border-primary bg-primary/10 text-primary font-bold shadow-2xs"
                  : "border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              {court.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
