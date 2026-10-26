"use client";

import React from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BookingDateStripProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}

export function BookingDateStrip({
  selectedDate,
  onSelectDate,
}: BookingDateStripProps) {
  const dateList = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d;
  });

  const formatDateKey = (d: Date) => d.toISOString().split("T")[0];

  return (
    <div className="flex items-center gap-2 px-4 py-3 bg-card border-b border-border">
      <div className="flex-1 overflow-x-auto overflow-y-hidden no-scrollbar touch-pan-x">
        <div className="flex items-center gap-2 w-max">
          {dateList.map((d) => {
            const isSelected = formatDateKey(d) === formatDateKey(selectedDate);
            const dayName = d.toLocaleDateString("vi-VN", { weekday: "short" });
            const dayNum = d.getDate();
            const monthNum = d.getMonth() + 1;

            return (
              <button
                key={formatDateKey(d)}
                type="button"
                onClick={() => onSelectDate(d)}
                className={cn(
                  "flex h-11 w-14 shrink-0 flex-col items-center justify-center rounded-xl border text-xs transition-all active:scale-95",
                  isSelected
                    ? "border-primary bg-primary text-primary-foreground font-bold shadow-2xs"
                    : "border-border bg-muted/40 text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <span className="text-[10px] uppercase">{dayName}</span>
                <span className="text-xs font-extrabold">
                  {dayNum}/{monthNum}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <Popover>
        <PopoverTrigger>
          <Button
            variant="outline"
            className="h-11 w-11 shrink-0 rounded-xl border-border p-0 bg-card text-foreground hover:bg-muted"
          >
            <CalendarIcon className="h-4 w-4 text-primary" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          className="w-auto p-0 bg-card border-border"
        >
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && onSelectDate(date)}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
