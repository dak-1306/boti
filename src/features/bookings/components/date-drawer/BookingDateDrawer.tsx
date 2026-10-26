"use client";

import React, { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from "@/components/ui/drawer";
import {
  BookingFilterState,
  DateFilterMode,
} from "@/features/bookings/types/bookings.types";
import { DayFilterView } from "./DayFilterView";
import { MonthFilterView } from "./MonthFilterView";
import { YearFilterView } from "./YearFilterView";
import { BOOKING_TEXTS } from "../../constants/bookings.constants";

interface BookingDateDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: BookingFilterState;
  onApplyFilters: (newFilters: Partial<BookingFilterState>) => void;
}

function BookingDateDrawerContent({
  onClose,
  filters,
  onApplyFilters,
}: Omit<BookingDateDrawerProps, "isOpen">) {
  const [activeMode, setActiveMode] = useState<DateFilterMode>(() =>
    filters.filterMode === "all" ? "day" : filters.filterMode,
  );

  const [tempDate, setTempDate] = useState<Date | undefined>(
    () => filters.selectedDate ?? new Date(),
  );
  const [tempMonth, setTempMonth] = useState<number>(
    () => filters.selectedMonth ?? new Date().getMonth(),
  );
  const [tempYear, setTempYear] = useState<number>(
    () => filters.selectedYear ?? new Date().getFullYear(),
  );

  const handleApply = () => {
    onApplyFilters({
      filterMode: activeMode,
      selectedDate: tempDate,
      selectedMonth: tempMonth,
      selectedYear: tempYear,
    });
    onClose();
  };

  const handleReset = () => {
    onApplyFilters({ filterMode: "all" });
    onClose();
  };

  return (
    <div className="flex w-full flex-col">
      <DrawerHeader className="border-b border-border pb-3 pt-6">
        <DrawerTitle className="text-center text-xs font-extrabold uppercase tracking-wider text-foreground">
          {BOOKING_TEXTS.dateDrawerTitle}
        </DrawerTitle>

        <div className="mt-3 flex rounded-xl bg-muted p-1">
          {(["day", "month", "year"] as DateFilterMode[]).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setActiveMode(mode)}
              className={`flex-1 h-11 rounded-lg text-xs font-bold transition-all ${
                activeMode === mode
                  ? "bg-card text-primary shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {mode === "day"
                ? BOOKING_TEXTS.tabDay
                : mode === "month"
                  ? BOOKING_TEXTS.tabMonth
                  : BOOKING_TEXTS.tabYear}
            </button>
          ))}
        </div>
      </DrawerHeader>

      <div className="flex justify-center px-4 py-4" data-vaul-no-drag>
        {activeMode === "day" && (
          <DayFilterView tempDate={tempDate} onSelectDate={setTempDate} />
        )}

        {activeMode === "month" && (
          <MonthFilterView
            tempMonth={tempMonth}
            tempYear={tempYear}
            onSelectMonth={setTempMonth}
            onChangeYear={setTempYear}
          />
        )}

        {activeMode === "year" && (
          <YearFilterView selectedYear={tempYear} onSelectYear={setTempYear} />
        )}
      </div>

      <DrawerFooter className="flex flex-row gap-3 border-t border-border p-4">
        <button
          type="button"
          onClick={handleReset}
          className="h-11 flex-1 rounded-xl border border-border bg-card text-xs font-semibold text-foreground transition active:scale-95 hover:bg-muted"
        >
          {BOOKING_TEXTS.viewAllBtn}
        </button>
        <button
          type="button"
          onClick={handleApply}
          className="h-11 flex-1 rounded-xl bg-primary text-xs font-semibold text-primary-foreground transition hover:bg-primary/90 active:scale-95 shadow-md"
        >
          {BOOKING_TEXTS.btnApply}
        </button>
      </DrawerFooter>
    </div>
  );
}

export function BookingDateDrawer({
  isOpen,
  onClose,
  filters,
  onApplyFilters,
}: BookingDateDrawerProps) {
  return (
    <Drawer
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}
      showSwipeHandle
    >
      <DrawerContent className="sm:mx-auto sm:max-w-[390px] w-full rounded-t-[28px] border-none bg-card p-0 shadow-2xl text-card-foreground">
        {isOpen && (
          <BookingDateDrawerContent
            onClose={onClose}
            filters={filters}
            onApplyFilters={onApplyFilters}
          />
        )}
      </DrawerContent>
    </Drawer>
  );
}
