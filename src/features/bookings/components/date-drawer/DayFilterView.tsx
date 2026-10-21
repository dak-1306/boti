import React from "react";
import { Calendar } from "@/components/ui/calendar";

interface DayFilterViewProps {
  tempDate: Date | undefined;
  onSelectDate: (date: Date | undefined) => void;
}

export function DayFilterView({ tempDate, onSelectDate }: DayFilterViewProps) {
  return (
    <Calendar
      mode="single"
      selected={tempDate}
      onSelect={onSelectDate}
      captionLayout="dropdown"
      startMonth={new Date(2024, 0)}
      endMonth={new Date(2030, 11)}
      className="w-full flex justify-center p-0 [--cell-size:2.6rem] [--cell-radius:0.75rem]"
    />
  );
}
