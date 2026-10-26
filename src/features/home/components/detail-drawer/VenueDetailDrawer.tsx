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
    { id: "info", label: HOME_TEXTS.tabDetailInfo },
    { id: "price", label: HOME_TEXTS.tabDetailPrice },
    { id: "gallery", label: HOME_TEXTS.tabDetailGallery },
    { id: "rules", label: HOME_TEXTS.tabDetailRules },
  ];

  return (
    <Drawer
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      snapPoints={["55vh", "85vh"]}
      defaultSnapPoint="55vh"
      showSwipeHandle
    >
      <DrawerContent className="rounded-t-[28px] bg-card p-0 text-card-foreground sm:mx-auto sm:max-w-[390px]">
        <div className="flex h-full flex-col overflow-hidden">
          <VenueDetailHeader venue={venue} onClose={onClose} />

          <div className="mt-2 shrink-0 border-b border-border px-4">
            <div className="no-scrollbar flex gap-4 overflow-x-auto text-xs font-semibold">
              {tabs.map((tab) => {
                const isSelected = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
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

          <div className="flex-1 overflow-y-auto p-4 no-scrollbar">
            {activeTab === "info" && <TabInfo venue={venue} />}
            {activeTab === "price" && <TabPrice venue={venue} />}
            {activeTab === "gallery" && <TabGallery venue={venue} />}
            {activeTab === "rules" && <TabRules venue={venue} />}
          </div>

          <div className="shrink-0 border-t border-border p-3 bg-card">
            <Button className="h-11 w-full rounded-full bg-primary text-xs font-bold text-primary-foreground transition hover:bg-primary/90 active:scale-95 shadow-md">
              {HOME_TEXTS.bookBtn}
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
