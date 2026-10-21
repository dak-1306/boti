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

interface BookingDateDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: BookingFilterState;
  onApplyFilters: (newFilters: Partial<BookingFilterState>) => void;
}

export function BookingDateDrawer({
  isOpen,
  onClose,
  filters,
  onApplyFilters,
}: BookingDateDrawerProps) {
  const [activeMode, setActiveMode] = useState<DateFilterMode>(
    filters.filterMode === "all" ? "day" : filters.filterMode,
  );

  const [tempDate, setTempDate] = useState<Date | undefined>(
    filters.selectedDate || new Date(),
  );
  const [tempMonth, setTempMonth] = useState<number>(
    filters.selectedMonth ?? new Date().getMonth(),
  );
  const [tempYear, setTempYear] = useState<number>(
    filters.selectedYear ?? new Date().getFullYear(),
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
    <Drawer
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}
      showSwipeHandle
    >
      {/* SỬ DỤNG sm:mx-auto sm:max-w-[390px] THEO YÊU CẦU */}
      <DrawerContent className="sm:mx-auto sm:max-w-[390px] w-full rounded-t-[28px] border-none bg-white p-0 shadow-2xl dark:bg-slate-900">
        <div className="flex w-full flex-col">
          {/* HEADER & TAB SWITCHER */}
          <DrawerHeader className="border-b border-slate-100 pb-3 pt-6 dark:border-slate-800/80">
            <DrawerTitle className="text-center text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-200">
              Lọc lịch đặt theo thời gian
            </DrawerTitle>

            <div className="mt-3 flex rounded-xl bg-slate-100 p-1 dark:bg-slate-800/80">
              {(["day", "month", "year"] as DateFilterMode[]).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setActiveMode(mode)}
                  className={`flex-1 rounded-lg py-1.5 text-xs font-bold transition-all ${
                    activeMode === mode
                      ? "bg-white text-blue-600 shadow-xs dark:bg-slate-900 dark:text-blue-400"
                      : "text-slate-500 hover:text-slate-700 dark:text-slate-400"
                  }`}
                >
                  {mode === "day"
                    ? "Theo Ngày"
                    : mode === "month"
                      ? "Theo Tháng"
                      : "Theo Năm"}
                </button>
              ))}
            </div>
          </DrawerHeader>

          {/* VIEW SWITCHER */}
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
              <YearFilterView
                selectedYear={tempYear}
                onSelectYear={setTempYear}
              />
            )}
          </div>

          {/* FOOTER ACTIONS */}
          <DrawerFooter className="flex flex-row gap-3 border-t border-slate-100 p-4 dark:border-slate-800/80">
            <button
              type="button"
              onClick={handleReset}
              className="flex-1 rounded-xl border border-slate-200 dark:border-slate-800 py-2.5 text-xs font-semibold text-slate-600 dark:text-slate-300 transition active:scale-95 hover:bg-slate-50 dark:hover:bg-slate-800/50"
            >
              Xem tất cả
            </button>
            <button
              type="button"
              onClick={handleApply}
              className="flex-1 rounded-xl bg-blue-600 py-2.5 text-xs font-semibold text-white transition hover:bg-blue-700 active:scale-95 shadow-md shadow-blue-500/20"
            >
              Áp dụng
            </button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
