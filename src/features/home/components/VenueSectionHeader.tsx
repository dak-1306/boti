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
    <div className="flex items-center justify-between px-4 py-2">
      <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">
        {HOME_TEXTS.sectionTitle}
      </h2>

      {/* Switcher Dạng lưới / Bản đồ */}
      <div className="flex items-center rounded-full bg-slate-100 p-1 dark:bg-slate-800">
        <button
          onClick={() => onViewModeChange("grid")}
          className={`flex items-center gap-1 rounded-full p-3 text-xs font-medium transition ${
            viewMode === "grid"
              ? "bg-blue-500 text-white shadow-sm"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          <LayoutGrid className="h-3 w-3" />
          {HOME_TEXTS.viewGrid}
        </button>
        <button
          onClick={() => onViewModeChange("map")}
          className={`flex items-center gap-1 rounded-full p-3 text-xs font-medium transition ${
            viewMode === "map"
              ? "bg-blue-500 text-white shadow-sm"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          <MapPin className="h-3 w-3" />
          {HOME_TEXTS.viewMap}
        </button>
      </div>
    </div>
  );
}
