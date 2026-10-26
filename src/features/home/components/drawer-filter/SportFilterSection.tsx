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
      <label className="mb-2.5 block font-bold text-foreground">
        {HOME_TEXTS.sportTypeLabel}
      </label>

      <div className="grid grid-cols-2 gap-2">
        {CATEGORIES_DATA.map((cat) => {
          const isSelected = selectedSports.includes(cat.name);
          const iconSrc = getIconUrl(cat.icon);

          return (
            <button
              key={cat.id}
              onClick={() => onToggleSport(cat.name)}
              className={`flex h-11 items-center justify-between rounded-xl px-3 transition-all active:scale-95 border ${
                isSelected
                  ? "border-primary bg-primary/10 text-primary font-bold shadow-xs"
                  : "border-border bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
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
                <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
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
