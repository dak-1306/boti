"use client";

import React from "react";
import { Calendar } from "@/components/ui/calendar";

interface DayFilterViewProps {
  tempDate: Date | undefined;
  onSelectDate: (date: Date | undefined) => void;
}

export function DayFilterView({ tempDate, onSelectDate }: DayFilterViewProps) {
  return (
    <div className="flex w-full items-center justify-center">
      <Calendar
        mode="single"
        selected={tempDate}
        onSelect={onSelectDate}
        captionLayout="dropdown"
        startMonth={new Date(2024, 0)}
        endMonth={new Date(2030, 11)}
        className="p-0 [--cell-size:2.4rem] [--cell-radius:0.75rem]"
      />
    </div>
  );
}
