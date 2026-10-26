"use client";

import React from "react";
import { Clock } from "lucide-react";
import { HOME_TEXTS } from "../../constants/home.constants";

interface OpenNowFilterSectionProps {
  openNow: boolean;
  onToggleOpenNow: () => void;
}

export function OpenNowFilterSection({
  openNow,
  onToggleOpenNow,
}: OpenNowFilterSectionProps) {
  return (
    <div className="flex h-14 items-center justify-between rounded-2xl bg-muted px-4">
      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4 text-primary" />
        <span className="font-bold text-foreground">
          {HOME_TEXTS.openNowLabel}
        </span>
      </div>

      <button
        type="button"
        onClick={onToggleOpenNow}
        className={`relative h-6 w-11 rounded-full transition-colors ${
          openNow ? "bg-primary" : "bg-muted-foreground/30"
        }`}
      >
        <span
          className={`absolute top-1 left-1 h-4 w-4 rounded-full bg-card transition-transform ${
            openNow ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}
