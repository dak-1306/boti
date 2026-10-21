import React from "react";
import { MoreHorizontal, X, Signal, Wifi, Battery } from "lucide-react";

export function ZaloHeaderMock() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-50 flex flex-col pt-[env(safe-area-inset-top)]">
      {/* 1. Status Bar Mock (9:41, Pin, Sóng) */}
      <div className="flex h-7 w-full items-center justify-between px-6 pt-1 text-slate-800 dark:text-white">
        <span className="text-[11px] font-bold tracking-tight">9:41</span>
        <div className="flex items-center gap-1.5">
          <Signal className="h-3 w-3 fill-current" />
          <Wifi className="h-3 w-3" />
          <Battery className="h-3.5 w-3.5 fill-current" />
        </div>
      </div>

      {/* 2. Zalo Action Capsule (Nút ... và X mặc định) */}
      <div className="flex justify-end px-3 pt-1">
        <div className="pointer-events-auto flex h-7 items-center rounded-full border border-slate-200/80 bg-white/90 px-2.5 shadow-sm backdrop-blur-md dark:border-slate-700/80 dark:bg-slate-900/90">
          <button className="flex items-center justify-center text-slate-700 transition hover:text-black dark:text-slate-200">
            <MoreHorizontal className="h-4 w-4" />
          </button>
          <div className="mx-2 h-3 w-[1px] bg-slate-200 dark:bg-slate-700" />
          <button className="flex items-center justify-center text-slate-700 transition hover:text-black dark:text-slate-200">
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}