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
  // Hiển thị khung 12 năm (VD: 2020 - 2031) để vừa khít lưới 3 cột x 4 hàng
  const [startYear, setStartYear] = useState(() => {
    return Math.floor(selectedYear / 12) * 12;
  });

  const endYear = startYear + 11;
  const years = Array.from({ length: 12 }, (_, i) => startYear + i);

  return (
    <div className="flex w-full flex-col justify-center gap-3">
      <div className="flex h-10 items-center justify-between rounded-xl bg-muted px-2">
        <button
          type="button"
          onClick={() => setStartYear((prev) => prev - 12)}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-background hover:text-foreground transition"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="text-xs font-extrabold text-foreground">
          {startYear} - {endYear}
        </span>
        <button
          type="button"
          onClick={() => setStartYear((prev) => prev + 12)}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-background hover:text-foreground transition"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {years.map((year) => {
          const isSelected = selectedYear === year;
          return (
            <button
              key={year}
              type="button"
              onClick={() => onSelectYear(year)}
              className={`flex h-11 items-center justify-between rounded-xl px-3 text-xs font-bold transition active:scale-95 ${
                isSelected
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "border border-border bg-card text-foreground hover:bg-muted"
              }`}
            >
              <span>
                {BOOKING_TEXTS.labelYearPrefix} {year}
              </span>
              {isSelected && (
                <Check className="h-3.5 w-3.5 text-primary-foreground shrink-0" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}