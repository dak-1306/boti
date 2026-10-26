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
import { Button } from "@/components/ui/button";
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

  const handleCityChange = (newCity: string) => {
    setTempFilters((prev) => ({
      ...prev,
      city: newCity,
      district: "",
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
    <Drawer
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}
      snapPoints={["55vh", "85vh"]}
      defaultSnapPoint="55vh"
      showSwipeHandle
    >
      <DrawerContent className="max-h-[85vh] rounded-t-[28px] bg-card p-0 text-card-foreground sm:mx-auto sm:max-w-[390px]">
        <DrawerHeader className="border-b border-border pb-3 pt-5 px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-primary" />
              <DrawerTitle className="text-base font-bold text-foreground">
                {HOME_TEXTS.drawerTitle}
              </DrawerTitle>
            </div>
            <button
              onClick={handleReset}
              className="flex h-11 items-center gap-1 text-xs font-medium text-muted-foreground transition hover:text-foreground"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              {HOME_TEXTS.resetBtn}
            </button>
          </div>
        </DrawerHeader>

        <div className="space-y-6 overflow-y-auto p-4 text-xs no-scrollbar">
          <SportFilterSection
            selectedSports={tempFilters.selectedSports}
            onToggleSport={handleToggleSport}
          />
          <LocationFilterSection
            selectedCity={tempFilters.city}
            onSelectCity={handleCityChange}
            selectedDistrict={tempFilters.district}
            onSelectDistrict={(district) =>
              setTempFilters((prev) => ({ ...prev, district }))
            }
          />
          <RatingFilterSection
            selectedRating={tempFilters.ratingMin}
            onSelectRating={(ratingMin) =>
              setTempFilters((prev) => ({ ...prev, ratingMin }))
            }
          />
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

        <DrawerFooter className="border-t border-border p-4">
          <Button
            onClick={handleApply}
            className="h-11 w-full rounded-full bg-primary text-xs font-bold text-primary-foreground shadow-md hover:bg-primary/90 active:scale-95"
          >
            {HOME_TEXTS.applyBtn}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
