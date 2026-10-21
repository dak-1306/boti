import React from "react";
import Image from "next/image";
import { Search, ChevronDown } from "lucide-react";
import { HOME_TEXTS } from "../constants/home.constants";
import Banner from "@/assets/images/banner.png";

interface HomeHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function HomeHeader({ searchQuery, onSearchChange }: HomeHeaderProps) {
  return (
    <div className="w-full">
      {/* 1. Khung Banner Ảnh (Bo góc dưới) */}
      <div className="relative h-26 w-full overflow-hidden rounded-b-[28px]">
        <Image
          src={Banner}
          alt="Sports Banner"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* 2. Thanh Tìm Kiếm (Chiều cao 40px, -mt-5 kéo lên 20px để mép dưới banner nằm đúng giữa) */}
      <div className="relative z-10 -mt-5 px-4">
        <div className="flex h-10 items-center rounded-full bg-white px-3.5 shadow-md border border-slate-100/80 dark:bg-slate-900 dark:border-slate-800">
          <Search className="mr-2 h-4 w-4 shrink-0 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={HOME_TEXTS.searchPlaceholder}
            className="w-full bg-transparent text-xs text-slate-800 placeholder-slate-400 focus:outline-none dark:text-slate-100"
          />
        </div>
      </div>

      {/* 3. Bộ lọc nhanh (Nằm bên dưới thanh tìm kiếm trên nền sáng) */}
      <div className="mt-3 flex justify-end gap-2 px-4">
        <button className="rounded-full bg-blue-50 px-3 py-1.5 text-[11px] font-medium text-blue-600 transition hover:bg-blue-100 dark:bg-blue-950/60 dark:text-blue-300">
          {HOME_TEXTS.filterNearest}
        </button>
        <button className="flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1.5 text-[11px] font-medium text-blue-600 transition hover:bg-blue-100 dark:bg-blue-950/60 dark:text-blue-300">
          {HOME_TEXTS.filterRegion}
          <ChevronDown className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}
