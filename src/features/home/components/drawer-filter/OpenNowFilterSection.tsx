"use client";

import React from "react";
import { Clock } from "lucide-react";

interface OpenNowFilterSectionProps {
  openNow: boolean;
  onToggleOpenNow: () => void;
}

export function OpenNowFilterSection({
  openNow,
  onToggleOpenNow,
}: OpenNowFilterSectionProps) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-3.5 dark:bg-slate-800/60">
      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4 text-blue-600" />
        <span className="font-bold text-slate-700 dark:text-slate-200">
          Chỉ hiển thị sân đang mở cửa
        </span>
      </div>

      <button
        type="button"
        onClick={onToggleOpenNow}
        className={`relative h-6 w-11 rounded-full transition-colors ${
          openNow ? "bg-blue-600" : "bg-slate-300 dark:bg-slate-700"
        }`}
      >
        <span
          className={`absolute top-1 left-1 h-4 w-4 rounded-full bg-white transition-transform ${
            openNow ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}
