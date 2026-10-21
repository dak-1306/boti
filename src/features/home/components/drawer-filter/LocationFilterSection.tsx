"use client";

import React from "react";
import { CITIES_DATA, DISTRICTS_BY_CITY } from "../../constants/home.constants";

interface LocationFilterSectionProps {
  selectedCity: string;
  onSelectCity: (city: string) => void;
  selectedDistrict: string;
  onSelectDistrict: (district: string) => void;
}

export function LocationFilterSection({
  selectedCity,
  onSelectCity,
  selectedDistrict,
  onSelectDistrict,
}: LocationFilterSectionProps) {
  // Lấy danh sách quận/huyện tương ứng với thành phố hiện tại
  const currentDistricts = DISTRICTS_BY_CITY[selectedCity] || [
    "Tất cả Quận/Huyện",
  ];

  return (
    <div className="space-y-4">
      {/* 1. Chọn Thành phố */}
      <div>
        <label className="mb-2 block font-bold text-slate-800 dark:text-slate-100">
          Thành phố
        </label>
        <div className="flex flex-wrap gap-2">
          {CITIES_DATA.map((city) => {
            const isSelected = selectedCity === city;
            return (
              <button
                key={city}
                onClick={() => onSelectCity(city)}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-medium transition active:scale-95 ${
                  isSelected
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                }`}
              >
                {city}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Chọn Quận / Huyện (Thay đổi động) */}
      <div>
        <label className="mb-2 block font-bold text-slate-800 dark:text-slate-100">
          Khu vực tại {selectedCity}
        </label>
        <div className="flex flex-wrap gap-1.5">
          {currentDistricts.map((dist) => {
            const targetValue = dist === "Tất cả Quận/Huyện" ? "" : dist;
            const isSelected = selectedDistrict === targetValue;
            return (
              <button
                key={dist}
                onClick={() => onSelectDistrict(targetValue)}
                className={`rounded-lg px-2.5 py-1.5 text-[11px] font-medium transition active:scale-95 ${
                  isSelected
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                }`}
              >
                {dist}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
