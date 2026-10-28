"use client";

import React, { useState } from "react";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
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
  onBook: (venueId: string) => void;
}

type TabType = "info" | "price" | "gallery" | "rules";

// Tách Nội dung Drawer thành Sub-component riêng để reset state tab khi mở lại
function VenueDetailDrawerContent({
  venue,
  onClose,
  onBook,
}: {
  venue: Venue;
  onClose: () => void;
  onBook: (venueId: string) => void;
}) {
  const [activeTab, setActiveTab] = useState<TabType>("info");

  const tabs: { id: TabType; label: string }[] = [
    { id: "info", label: HOME_TEXTS.tabDetailInfo },
    { id: "price", label: HOME_TEXTS.tabDetailPrice },
    { id: "gallery", label: HOME_TEXTS.tabDetailGallery },
    { id: "rules", label: HOME_TEXTS.tabDetailRules },
  ];

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Header Chi tiết Sân */}
      <VenueDetailHeader venue={venue} onClose={onClose} />

      {/* Thanh chuyển Nav Tabs */}
      <div className="mt-2 shrink-0 border-b border-border px-4">
        <div className="no-scrollbar flex gap-4 overflow-x-auto text-xs font-semibold">
          {tabs.map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`h-11 shrink-0 flex items-center transition-colors relative ${
                  isSelected
                    ? "text-primary font-bold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
                {isSelected && (
                  <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-primary" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Nội dung Chi tiết Tab */}
      <div
        className="flex-1 overflow-y-auto p-4 no-scrollbar"
        data-vaul-no-drag
      >
        {activeTab === "info" && <TabInfo venue={venue} />}
        {activeTab === "price" && <TabPrice venue={venue} />}
        {activeTab === "gallery" && <TabGallery venue={venue} />}
        {activeTab === "rules" && <TabRules venue={venue} />}
      </div>

      {/* Nút Đặt Sân CTA cố định ở đáy */}
      <div className="shrink-0 border-t border-border p-3 pb-[calc(12px+env(safe-area-inset-bottom))] bg-card">
        <Button
          variant="cta"
          type="button"
          onClick={() => onBook(venue.id)}
          className="h-11 w-full"
        >
          {HOME_TEXTS.bookBtn}
        </Button>
      </div>
    </div>
  );
}

export function VenueDetailDrawer({
  venue,
  isOpen,
  onClose,
  onBook,
}: VenueDetailDrawerProps) {
  return (
    <Drawer
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}
      snapPoints={["55vh", "85vh"]}
      defaultSnapPoint="55vh"
      showSwipeHandle
    >
      <DrawerContent className="rounded-t-[28px] bg-card p-0 text-card-foreground sm:mx-auto sm:max-w-[390px] outline-none border-t border-border">
        {venue && (
          <VenueDetailDrawerContent
            venue={venue}
            onClose={onClose}
            onBook={onBook}
          />
        )}
      </DrawerContent>
    </Drawer>
  );
}
