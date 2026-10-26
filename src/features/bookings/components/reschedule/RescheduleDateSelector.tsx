"use client";

import React from "react";
import { RescheduleDateOption } from "../../types/bookings.types";
import { cn } from "@/lib/utils";

interface RescheduleDateSelectorProps {
  options: RescheduleDateOption[];
  selectedDate: RescheduleDateOption;
  onSelectDate: (option: RescheduleDateOption) => void;
}

export function RescheduleDateSelector({
  options,
  selectedDate,
  onSelectDate,
}: RescheduleDateSelectorProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
      {options.map((option) => {
        const isSelected = selectedDate.date === option.date;
        return (
          <button
            key={option.date}
            type="button"
            onClick={() => onSelectDate(option)}
            className={cn(
              "flex h-11 min-w-[72px] shrink-0 flex-col items-center justify-center rounded-2xl border text-xs font-semibold transition active:scale-95",
              isSelected
                ? "border-primary bg-primary text-primary-foreground shadow-xs font-bold"
                : "border-border bg-card text-card-foreground hover:bg-muted",
            )}
          >
            <span className="text-[10px] opacity-80">{option.dayName}</span>
            <span className="text-xs font-extrabold">{option.displayDate}</span>
          </button>
        );
      })}
    </div>
  );
}
