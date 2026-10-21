"use client";

import React, { useState } from "react";
import { SlidersHorizontal, RotateCcw } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from "@/components/ui/drawer";
import { FilterState } from "../../types/home.types";
import {
  HOME_TEXTS,
  DEFAULT_FILTER_STATE,
} from "../../constants/home.constants";

import { SportFilterSection } from "./SportFilterSection";
import { LocationFilterSection } from "./LocationFilterSection";
import { RatingFilterSection } from "./RatingFilterSection";
import { OpenNowFilterSection } from "./OpenNowFilterSection";

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onApplyFilters: (newFilters: FilterState) => void;
}

export function FilterDrawer({
  isOpen,
  onClose,
  filters,
  onApplyFilters,
}: FilterDrawerProps) {
  const [tempFilters, setTempFilters] = useState<FilterState>(filters);

  const handleToggleSport = (sportName: string) => {
    setTempFilters((prev) => {
      const exists = prev.selectedSports.includes(sportName);
      return {
        ...prev,
        selectedSports: exists
          ? prev.selectedSports.filter((s) => s !== sportName)
          : [...prev.selectedSports, sportName],
      };
    });
  };

  // Tự động reset Quận/Huyện khi thay đổi Thành phố
  const handleCityChange = (newCity: string) => {
    setTempFilters((prev) => ({
      ...prev,
      city: newCity,
      district: "", // Reset về Tất cả Quận/Huyện của TP mới
    }));
  };

  const handleReset = () => {
    setTempFilters(DEFAULT_FILTER_STATE);
  };

  const handleApply = () => {
    onApplyFilters(tempFilters);
    onClose();
  };

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="max-h-[85vh] rounded-t-[28px] bg-white dark:bg-slate-900 sm:mx-auto sm:max-w-[390px]">
        {/* Header */}
        <DrawerHeader className="border-b border-slate-100 pb-3 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-blue-600" />
              <DrawerTitle className="text-base font-bold text-slate-800 dark:text-slate-100">
                {HOME_TEXTS.drawerTitle}
              </DrawerTitle>
            </div>
            <button
              onClick={handleReset}
              className="flex items-center gap-1 text-xs font-medium text-slate-400 transition hover:text-slate-600"
            >
              <RotateCcw className="h-3 w-3" />
              {HOME_TEXTS.resetBtn}
            </button>
          </div>
        </DrawerHeader>

        {/* Body Sections */}
        <div className="space-y-6 overflow-y-auto p-4 text-xs no-scrollbar">
          {/* 1. Chọn Bộ môn có Icon (Hàng ngang) */}
          <SportFilterSection
            selectedSports={tempFilters.selectedSports}
            onToggleSport={handleToggleSport}
          />

          {/* 2. Chọn Địa điểm Flex-wrap Chips (Động theo Thành phố) */}
          <LocationFilterSection
            selectedCity={tempFilters.city}
            onSelectCity={handleCityChange}
            selectedDistrict={tempFilters.district}
            onSelectDistrict={(district) =>
              setTempFilters((prev) => ({ ...prev, district }))
            }
          />

          {/* 3. Chọn Đánh giá */}
          <RatingFilterSection
            selectedRating={tempFilters.ratingMin}
            onSelectRating={(ratingMin) =>
              setTempFilters((prev) => ({ ...prev, ratingMin }))
            }
          />

          {/* 4. Toggle Trạng thái mở cửa */}
          <OpenNowFilterSection
            openNow={tempFilters.openNow}
            onToggleOpenNow={() =>
              setTempFilters((prev) => ({
                ...prev,
                openNow: !prev.openNow,
              }))
            }
          />
        </div>

        {/* Footer */}
        <DrawerFooter className="border-t border-slate-100 pt-3 dark:border-slate-800">
          <button
            onClick={handleApply}
            className="w-full rounded-full bg-blue-600 py-3 text-xs font-bold text-white transition hover:bg-blue-700 active:scale-98"
          >
            {HOME_TEXTS.applyBtn}
          </button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
