"use client";

import React from "react";
import { LayoutGrid, MapPin } from "lucide-react";
import { ViewMode } from "../types/home.types";
import { HOME_TEXTS } from "../constants/home.constants";

interface VenueSectionHeaderProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

export function VenueSectionHeader({
  viewMode,
  onViewModeChange,
}: VenueSectionHeaderProps) {
  return (
    <div className="flex h-14 items-center justify-between px-4 py-2">
      <h2 className="text-base font-bold text-foreground">
        {HOME_TEXTS.sectionTitle}
      </h2>

      <div className="flex h-11 items-center rounded-full bg-muted p-1">
        <button
          onClick={() => onViewModeChange("grid")}
          className={`flex h-9 items-center gap-1 rounded-full px-3 text-xs font-medium transition ${
            viewMode === "grid"
              ? "bg-primary text-primary-foreground shadow-xs"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <LayoutGrid className="h-3.5 w-3.5" />
          {HOME_TEXTS.viewGrid}
        </button>
        <button
          onClick={() => onViewModeChange("map")}
          className={`flex h-9 items-center gap-1 rounded-full px-3 text-xs font-medium transition ${
            viewMode === "map"
              ? "bg-primary text-primary-foreground shadow-xs"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <MapPin className="h-3.5 w-3.5" />
          {HOME_TEXTS.viewMap}
        </button>
      </div>
    </div>
  );
}
