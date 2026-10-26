"use client";

import React from "react";
import { BookingTab } from "../types/bookings.types";
import { BOOKING_TABS } from "../constants/bookings.constants";
import { cn } from "@/lib/utils";

interface BookingTabsProps {
  activeTab: BookingTab;
  onTabChange: (tab: BookingTab) => void;
}

export function BookingTabs({ activeTab, onTabChange }: BookingTabsProps) {
  return (
    <div className="p-4 bg-background">
      <div className="grid grid-cols-3 gap-2 rounded-2xl bg-muted p-1.5 border border-border">
        {BOOKING_TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "h-11 rounded-xl text-xs font-bold transition-all active:scale-95",
                isActive
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
