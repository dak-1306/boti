"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MONTH_NAMES, BOOKING_TEXTS } from "../../constants/bookings.constants";

interface MonthFilterViewProps {
  tempMonth: number;
  tempYear: number;
  onSelectMonth: (month: number) => void;
  onChangeYear: (year: number) => void;
}

export function MonthFilterView({
  tempMonth,
  tempYear,
  onSelectMonth,
  onChangeYear,
}: MonthFilterViewProps) {
  return (
    <div className="flex w-full flex-col justify-center gap-3">
      <div className="flex h-10 items-center justify-between rounded-xl bg-muted px-2">
        <button
          type="button"
          onClick={() => onChangeYear(tempYear - 1)}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-background hover:text-foreground transition"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="text-xs font-extrabold text-foreground">
          {BOOKING_TEXTS.labelYearPrefix} {tempYear}
        </span>
        <button
          type="button"
          onClick={() => onChangeYear(tempYear + 1)}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-background hover:text-foreground transition"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {MONTH_NAMES.map((name, idx) => {
          const isSelected = tempMonth === idx;
          return (
            <button
              key={name}
              type="button"
              onClick={() => onSelectMonth(idx)}
              className={`h-11 rounded-xl text-xs font-bold transition active:scale-95 ${
                isSelected
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "border border-border bg-card text-foreground hover:bg-muted"
              }`}
            >
              {name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
