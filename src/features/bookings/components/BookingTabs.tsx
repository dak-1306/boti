"use client";

import React from "react";
import { BookingTab } from "../types/bookings.types";
import { BOOKING_TABS } from "../constants/bookings.constants";

interface BookingTabsProps {
  activeTab: BookingTab;
  onTabChange: (tab: BookingTab) => void;
}

export function BookingTabs({ activeTab, onTabChange }: BookingTabsProps) {
  return (
    <div className="p-4 bg-slate-50 dark:bg-slate-950">
      <div className="grid grid-cols-3 gap-2 rounded-2xl bg-blue-50/70 p-1.5 dark:bg-slate-900 border border-blue-100/50 dark:border-slate-800">
        {BOOKING_TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`rounded-xl py-2 text-xs font-bold transition-all ${
                isActive
                  ? "bg-blue-600 text-white shadow-md active:scale-95"
                  : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
