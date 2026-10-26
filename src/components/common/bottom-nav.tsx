"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { NAV_ITEMS } from "@/constants/navigation.constants";

interface BottomNavProps {
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
}

export function BottomNav({ activeTab = "home", onTabChange }: BottomNavProps) {
  return (
    <div className="shrink-0 border-t border-slate-100/80 bg-white/90 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_25px_rgba(0,0,0,0.04)] backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/90">
      <div className="flex h-14 items-center justify-around px-3">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => onTabChange?.(item.id)}
              className="relative flex flex-1 flex-col items-center justify-center py-1 text-center"
            >
              {/* Nền Pill trượt mượt phía sau tab active */}
              {isActive && (
                <motion.div
                  layoutId="bottomNavPill"
                  className="absolute inset-x-2 inset-y-1 rounded-2xl bg-blue-50/80 dark:bg-blue-950/50"
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                  }}
                />
              )}

              {/* Icon & Label */}
              <motion.div
                whileTap={{ scale: 0.9 }}
                className={`relative z-10 flex flex-col items-center gap-0.5 transition-colors ${
                  isActive
                    ? "font-bold text-blue-600 dark:text-blue-400"
                    : "text-slate-400 hover:text-slate-600 dark:text-slate-500"
                }`}
              >
                <Icon className="h-5 w-5 stroke-[1.8]" />
                <span className="text-[10px] tracking-tight">{item.label}</span>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
