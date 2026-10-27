"use client";

import React from "react";
import { BookingTab } from "../types/bookings.types";
import { BOOKING_TABS } from "../constants/bookings.constants";
import { cn } from "@/lib/utils";
import { StaggerGroup } from "@/components/motion/StaggerGroup";

interface BookingTabsProps {
  activeTab: BookingTab;
  onTabChange: (tab: BookingTab) => void;
}

export function BookingTabs({ activeTab, onTabChange }: BookingTabsProps) {
  return (
    <div className="grid grid-cols-3 gap-1.5 rounded-2xl bg-card p-1.5 shadow-md border border-border/80">
      {BOOKING_TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "h-10 rounded-xl text-xs font-semibold transition-all duration-200 active:scale-95 select-none",
              isActive
                ? "bg-primary text-primary-foreground font-bold shadow-xs"
                : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
