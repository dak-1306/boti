"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { BOOKING_TEXTS } from "../../constants/bookings.constants";

interface YearFilterViewProps {
  selectedYear: number;
  onSelectYear: (year: number) => void;
}

export function YearFilterView({
  selectedYear,
  onSelectYear,
}: YearFilterViewProps) {
  const [startYear, setStartYear] = useState(() => {
    return Math.floor(selectedYear / 10) * 10;
  });

  const endYear = startYear + 9;
  const years = Array.from({ length: 10 }, (_, i) => startYear + i);

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex h-11 items-center justify-between rounded-xl bg-muted px-3">
        <button
          type="button"
          onClick={() => setStartYear((prev) => prev - 10)}
          className="flex h-11 w-11 items-center justify-center text-muted-foreground hover:text-foreground transition"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span className="text-sm font-extrabold text-foreground">
          {startYear} - {endYear}
        </span>
        <button
          type="button"
          onClick={() => setStartYear((prev) => prev + 10)}
          className="flex h-11 w-11 items-center justify-center text-muted-foreground hover:text-foreground transition"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2.5">
        {years.map((year) => {
          const isSelected = selectedYear === year;
          return (
            <button
              key={year}
              type="button"
              onClick={() => onSelectYear(year)}
              className={`flex h-11 items-center justify-between rounded-2xl px-3.5 text-xs font-bold transition ${
                isSelected
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "border border-border bg-card text-foreground hover:bg-muted"
              }`}
            >
              <span>
                {BOOKING_TEXTS.labelYearPrefix} {year}
              </span>
              {isSelected && (
                <Check className="h-4 w-4 text-primary-foreground" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
