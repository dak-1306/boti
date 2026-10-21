import React from "react";
import { NAV_ITEMS } from "@/constants/navigation.constants";

interface BottomNavProps {
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
}

export function BottomNav({ activeTab = "home", onTabChange }: BottomNavProps) {
  return (
    <div className="shrink-0 rounded-t-[25px] border-t border-slate-100/80 bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_20px_rgba(0,0,0,0.05)] backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95">
      <div className="flex h-14 items-center justify-around px-2">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange?.(item.id)}
              className={`flex flex-col items-center gap-1 transition-colors ${
                isActive
                  ? "font-semibold text-blue-600"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
