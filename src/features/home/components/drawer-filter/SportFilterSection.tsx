"use client";

import React from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import { CATEGORIES_DATA, HOME_TEXTS } from "../../constants/home.constants";
import { getIconUrl } from "@/utils/getIconUrl";

interface SportFilterSectionProps {
  selectedSports: string[];
  onToggleSport: (sportName: string) => void;
}

export function SportFilterSection({
  selectedSports,
  onToggleSport,
}: SportFilterSectionProps) {
  return (
    <div>
      <label className="mb-2.5 block font-bold text-slate-800 dark:text-slate-100">
        {HOME_TEXTS.sportTypeLabel}
      </label>

      {/* Dùng 2 cột với bố cục icon + text nằm ngang */}
      <div className="grid grid-cols-2 gap-2">
        {CATEGORIES_DATA.map((cat) => {
          const isSelected = selectedSports.includes(cat.name);
          const iconSrc = getIconUrl(cat.icon);

          return (
            <button
              key={cat.id}
              onClick={() => onToggleSport(cat.name)}
              className={`flex items-center justify-between rounded-xl p-2.5 transition-all active:scale-95 border ${
                isSelected
                  ? "border-blue-600 bg-blue-50/80 text-blue-600 shadow-sm dark:bg-blue-950/50 dark:text-blue-300"
                  : "border-slate-100 bg-slate-50 text-slate-600 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300"
              }`}
            >
              <div className="flex items-center gap-2 overflow-hidden pr-1">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center">
                  {iconSrc ? (
                    <Image
                      src={iconSrc}
                      alt={cat.name}
                      width={24}
                      height={24}
                      className="h-5 w-5 object-contain"
                    />
                  ) : (
                    <span className="text-[10px] font-bold">
                      {cat.name.slice(0, 2)}
                    </span>
                  )}
                </div>
                <span className="truncate text-xs font-semibold">
                  {cat.name}
                </span>
              </div>

              {isSelected && (
                <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                  <Check className="h-2.5 w-2.5 stroke-[3]" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
