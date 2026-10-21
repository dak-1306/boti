"use client";

import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from "@/components/ui/drawer";

interface BookingDateDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date | undefined;
  onSelectDate: (date: Date | undefined) => void;
}

export function BookingDateDrawer({
  isOpen,
  onClose,
  selectedDate,
  onSelectDate,
}: BookingDateDrawerProps) {
  const [tempDate, setTempDate] = useState<Date | undefined>(selectedDate);

  const currentYear = new Date().getFullYear();
  const startMonth = new Date(currentYear - 1, 0);
  const endMonth = new Date(currentYear + 5, 11);

  const handleApply = () => {
    onSelectDate(tempDate);
    onClose();
  };

  const handleReset = () => {
    setTempDate(undefined);
    onSelectDate(undefined);
    onClose();
  };

  return (
    <Drawer
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}
      showSwipeHandle
    >
      {/* 1. GIỚI HẠN CHIỀU RỘNG CHUẨN 430PX CHO PC PREVIEW & MOBILE */}
      <DrawerContent className="sm:mx-auto sm:max-w-[390px]  rounded-t-[28px] border-none bg-white p-0 shadow-2xl dark:bg-slate-900">
        <div className="flex w-full flex-col">
          {/* 2. THÊM pt-6 ĐỂ TẠO KHOẢNG CÁCH ĐẸP VỚI SWIPE HANDLE */}
          <DrawerHeader className="border-b border-slate-100 pb-3 pt-6 dark:border-slate-800/80">
            <DrawerTitle className="text-center text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-200">
              Lọc lịch đặt theo ngày
            </DrawerTitle>
          </DrawerHeader>

          {/* 3. LỊCH CÙNG SELECT DROPDOWN ĐƯỢC CUSTOM TINH TẾ */}
          <div className="flex justify-center px-4 py-3">
            <Calendar
              mode="single"
              selected={tempDate}
              onSelect={setTempDate}
              captionLayout="dropdown"
              startMonth={startMonth}
              endMonth={endMonth}
              className="w-full flex justify-center p-0 [--cell-size:2.6rem] [--cell-radius:0.75rem]"
              classNames={{
                // Custom lại bộ khung Dropdown Chọn Tháng / Năm thành dạng Chip Button cao cấp
                dropdowns:
                  "flex items-center justify-center gap-2 text-xs font-semibold",
                dropdown_root:
                  "relative flex items-center rounded-xl border border-slate-200/80 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/80 px-2.5 py-1 text-slate-700 dark:text-slate-200 transition hover:bg-slate-100 dark:hover:bg-slate-800",
                caption_label: "text-xs font-bold flex items-center gap-1",
              }}
            />
          </div>

          {/* FOOTER ACTION BUTTONS */}
          <DrawerFooter className="flex flex-row gap-3 border-t border-slate-100 p-4 dark:border-slate-800/80">
            <button
              onClick={handleReset}
              className="flex-1 rounded-xl border border-slate-200 dark:border-slate-800 py-2.5 text-xs font-semibold text-slate-600 dark:text-slate-300 transition active:scale-95 hover:bg-slate-50 dark:hover:bg-slate-800/50"
            >
              Xem tất cả
            </button>
            <button
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
