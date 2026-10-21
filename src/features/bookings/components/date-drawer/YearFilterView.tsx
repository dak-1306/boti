import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";

interface YearFilterViewProps {
  selectedYear: number;
  onSelectYear: (year: number) => void;
}

export function YearFilterView({
  selectedYear,
  onSelectYear,
}: YearFilterViewProps) {
  // Tự động tính năm bắt đầu thập kỷ (Ví dụ: 2025 -> Khung 2020 - 2029)
  const [startYear, setStartYear] = useState(() => {
    return Math.floor(selectedYear / 10) * 10;
  });

  const endYear = startYear + 9;
  const years = Array.from({ length: 10 }, (_, i) => startYear + i);

  return (
    <div className="flex w-full flex-col gap-4">
      {/* Header chuyển Thập kỷ (VD: 2020 - 2029) */}
      <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-1.5 dark:bg-slate-800/50">
        <button
          type="button"
          onClick={() => setStartYear((prev) => prev - 10)}
          className="p-1 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition"
        >
          <ChevronLeft className="size-4" />
        </button>
        <span className="text-sm font-extrabold text-slate-800 dark:text-slate-100">
          {startYear} - {endYear}
        </span>
        <button
          type="button"
          onClick={() => setStartYear((prev) => prev + 10)}
          className="p-1 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>

      {/* Grid 10 Năm */}
      <div className="grid grid-cols-2 gap-2.5">
        {years.map((year) => {
          const isSelected = selectedYear === year;
          return (
            <button
              key={year}
              type="button"
              onClick={() => onSelectYear(year)}
              className={`flex items-center justify-between rounded-2xl px-4 py-3 text-xs font-bold transition ${
                isSelected
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "border border-slate-200/80 bg-slate-50 text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300"
              }`}
            >
              <span>Năm {year}</span>
              {isSelected && <Check className="size-3.5 text-white" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
