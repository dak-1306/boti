"use client";

import React from "react";
import { Search, SlidersHorizontal, MapPin, Loader2 } from "lucide-react";
import { HOME_TEXTS } from "../constants/home.constants";
import Banner from "@/assets/images/banner.png";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/common/page-header";
import { StaggerGroup } from "@/components/motion/StaggerGroup";

interface HomeHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onOpenFilterDrawer: () => void;
  onRequestLocation: () => void;
  isLoadingLocation: boolean;
  hasLocation: boolean;
}

export function HomeHeader({
  searchQuery,
  onSearchChange,
  onOpenFilterDrawer,
  onRequestLocation,
  isLoadingLocation,
  hasLocation,
}: HomeHeaderProps) {
  return (
    <PageHeader
      variant="banner"
      bannerImg={Banner}
      className="min-h-[100px]"
      bottomExtension={
        /* Thanh Search nổi 50/50 qua viền Banner */
        <div className="flex h-11 items-center rounded-full bg-card px-3.5 shadow-md border border-border">
          <Search className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={HOME_TEXTS.searchPlaceholder}
            className="w-full bg-transparent text-xs text-foreground placeholder-muted-foreground focus:outline-hidden"
          />
        </div>
      }
    >
      {/* 2 nút phía dưới nằm trên nền trang trắng */}
      <StaggerGroup className="mt-3 flex justify-end gap-2">
        <Button
          type="button"
          onClick={onRequestLocation}
          disabled={isLoadingLocation}
          className={`h-11 rounded-full px-3 text-[11px] font-medium transition ${
            hasLocation
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "bg-muted text-primary hover:bg-muted/80"
          }`}
        >
          {isLoadingLocation ? (
            <Loader2 className="mr-1 h-3.5 w-3.5 animate-spin" />
          ) : (
            <MapPin className="mr-1 h-3.5 w-3.5" />
          )}
          {isLoadingLocation ? HOME_TEXTS.locating : HOME_TEXTS.filterNearest}
        </Button>

        <Button
          type="button"
          onClick={onOpenFilterDrawer}
          className="h-11 rounded-full bg-muted px-3 text-[11px] font-medium text-primary hover:bg-muted/80 transition"
        >
          <SlidersHorizontal className="mr-1 h-3.5 w-3.5" />
          {HOME_TEXTS.advancedSearch}
        </Button>
      </StaggerGroup>
    </PageHeader>
  );
}
