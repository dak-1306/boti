import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MONTH_NAMES = [
  "Thg 1",
  "Thg 2",
  "Thg 3",
  "Thg 4",
  "Thg 5",
  "Thg 6",
  "Thg 7",
  "Thg 8",
  "Thg 9",
  "Thg 10",
  "Thg 11",
  "Thg 12",
];

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
      {/* Header chuyển Năm */}
      <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-1.5 dark:bg-slate-800/50">
        <button
          type="button"
          onClick={() => onChangeYear(tempYear - 1)}
          className="p-1 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition"
        >
          <ChevronLeft className="size-4" />
        </button>
        <span className="text-sm font-extrabold text-slate-800 dark:text-slate-100">
          Năm {tempYear}
        </span>
        <button
          type="button"
          onClick={() => onChangeYear(tempYear + 1)}
          className="p-1 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>

      {/* Grid 12 Tháng */}
      <div className="grid grid-cols-3 gap-2.5">
        {MONTH_NAMES.map((name, idx) => {
          const isSelected = tempMonth === idx;
          return (
            <button
              key={name}
              type="button"
              onClick={() => onSelectMonth(idx)}
              className={`rounded-2xl py-3 text-xs font-bold transition ${
                isSelected
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "border border-slate-200/80 bg-slate-50 text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300"
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
