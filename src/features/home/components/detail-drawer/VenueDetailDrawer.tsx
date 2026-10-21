"use client";

import React, { useState } from "react";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Venue } from "../../types/home.types";
import { HOME_TEXTS } from "../../constants/home.constants";

import { VenueDetailHeader } from "./VenueDetailHeader";
import { TabInfo } from "./TabInfo";
import { TabPrice } from "./TabPrice";
import { TabGallery } from "./TabGallery";
import { TabRules } from "./TabRules";

interface VenueDetailDrawerProps {
  venue: Venue | null;
  isOpen: boolean;
  onClose: () => void;
}

type TabType = "info" | "price" | "gallery" | "rules";

export function VenueDetailDrawer({
  venue,
  isOpen,
  onClose,
}: VenueDetailDrawerProps) {
  const [activeTab, setActiveTab] = useState<TabType>("info");

  if (!venue) return null;

  const tabs: { id: TabType; label: string }[] = [
    { id: "info", label: "Thông tin" },
    { id: "price", label: "Bảng giá" },
    { id: "gallery", label: "Hình ảnh" },
    { id: "rules", label: "Quy định" },
  ];

  return (
    <Drawer
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      /* Cú pháp Snap Points chuẩn Base UI: Mở 55vh mặc định, vuốt tối đa lên 85vh */
      snapPoints={["55vh", "85vh"]}
      defaultSnapPoint="55vh"
      showSwipeHandle
    >
      <DrawerContent className="rounded-t-[28px] bg-white p-0 dark:bg-slate-900 sm:mx-auto sm:max-w-[390px] ">
        <div className="flex h-full flex-col overflow-hidden">
          {/* Header Banner & Thông tin sân */}
          <VenueDetailHeader venue={venue} onClose={onClose} />

          {/* Navigation Tabs */}
          <div className="mt-2 shrink-0 border-b border-slate-100 px-4 dark:border-slate-800">
            <div className="no-scrollbar flex gap-4 overflow-x-auto text-xs font-semibold">
              {tabs.map((tab) => {
                const isSelected = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`shrink-0 pb-2 transition-colors relative ${
                      isSelected
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    {tab.label}
                    {isSelected && (
                      <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-blue-600" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Nội dung Tab */}
          <div className="flex-1 overflow-y-auto p-4 no-scrollbar">
            {activeTab === "info" && <TabInfo venue={venue} />}
            {activeTab === "price" && <TabPrice venue={venue} />}
            {activeTab === "gallery" && <TabGallery venue={venue} />}
            {activeTab === "rules" && <TabRules venue={venue} />}
          </div>

          {/* Nút Đặt lịch cố định ở đáy */}
          <div className="shrink-0 border-t border-slate-100 p-3 dark:border-slate-800 bg-white dark:bg-slate-900">
            <button className="w-full rounded-full bg-blue-600 py-2.5 text-xs font-bold text-white transition hover:bg-blue-700 active:scale-98 shadow-md">
              {HOME_TEXTS.bookBtn}
            </button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
