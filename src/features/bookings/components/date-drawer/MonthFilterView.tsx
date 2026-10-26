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
    <div className="flex w-full flex-col gap-4">
      <div className="flex h-11 items-center justify-between rounded-xl bg-muted px-3">
        <button
          type="button"
          onClick={() => onChangeYear(tempYear - 1)}
          className="flex h-11 w-11 items-center justify-center text-muted-foreground hover:text-foreground transition"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span className="text-sm font-extrabold text-foreground">
          {BOOKING_TEXTS.labelYearPrefix} {tempYear}
        </span>
        <button
          type="button"
          onClick={() => onChangeYear(tempYear + 1)}
          className="flex h-11 w-11 items-center justify-center text-muted-foreground hover:text-foreground transition"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2.5">
        {MONTH_NAMES.map((name, idx) => {
          const isSelected = tempMonth === idx;
          return (
            <button
              key={name}
              type="button"
              onClick={() => onSelectMonth(idx)}
              className={`h-11 rounded-2xl text-xs font-bold transition ${
                isSelected
                  ? "bg-primary text-primary-foreground shadow-md"
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
