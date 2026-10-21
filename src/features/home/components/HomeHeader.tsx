import React from "react";
import Image from "next/image";
import { Search, SlidersHorizontal, MapPin, Loader2 } from "lucide-react";
import { HOME_TEXTS } from "../constants/home.constants";
import Banner from "@/assets/images/banner.png";

interface HomeHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onOpenFilterDrawer: () => void;
  onRequestLocation: () => void;
  isLoadingLocation: boolean;
  hasLocation: boolean;
}

export function HomeHeader({
  searchQuery,
  onSearchChange,
  onOpenFilterDrawer,
  onRequestLocation,
  isLoadingLocation,
  hasLocation,
}: HomeHeaderProps) {
  return (
    <div className="w-full">
      {/* 1. Khung Banner Ảnh */}
      <div className="relative h-26 w-full overflow-hidden rounded-b-[28px]">
        <Image
          src={Banner}
          alt="Sports Banner"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* 2. Thanh Tìm Kiếm + Icon Filter */}
      <div className="relative z-10 -mt-5 px-4">
        <div className="flex h-10 items-center justify-between rounded-full bg-white px-3.5 shadow-md border border-slate-100/80 dark:bg-slate-900 dark:border-slate-800">
          <div className="flex flex-1 items-center mr-2">
            <Search className="mr-2 h-4 w-4 shrink-0 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={HOME_TEXTS.searchPlaceholder}
              className="w-full bg-transparent text-xs text-slate-800 placeholder-slate-400 focus:outline-none dark:text-slate-100"
            />
          </div>

          {/* Icon Filter mở Drawer trực tiếp trên thanh Search */}
          <button
            onClick={onOpenFilterDrawer}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* 3. Bộ lọc nhanh & Tìm kiếm nâng cao */}
      <div className="mt-3 flex justify-end gap-2 px-4">
        {/* Nút Sân gần nhất (Gọi Geolocation GPS) */}
        <button
          onClick={onRequestLocation}
          disabled={isLoadingLocation}
          className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-[11px] font-medium transition ${
            hasLocation
              ? "bg-blue-600 text-white"
              : "bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-950/60 dark:text-blue-300"
          }`}
        >
          {isLoadingLocation ? (
            <Loader2 className="h-3 w-3 animate-spin" />
          ) : (
            <MapPin className="h-3 w-3" />
          )}
          {isLoadingLocation ? HOME_TEXTS.locating : HOME_TEXTS.filterNearest}
        </button>

        {/* Nút Tìm kiếm nâng cao (Mở Drawer) */}
        <button
          onClick={onOpenFilterDrawer}
          className="flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1.5 text-[11px] font-medium text-blue-600 transition hover:bg-blue-100 dark:bg-blue-950/60 dark:text-blue-300"
        >
          <SlidersHorizontal className="h-3 w-3" />
          {HOME_TEXTS.advancedSearch}
        </button>
      </div>
    </div>
  );
}
