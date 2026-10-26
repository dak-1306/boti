"use client";

import React from "react";
import Image from "next/image";
import { Search, SlidersHorizontal, MapPin, Loader2 } from "lucide-react";
import { HOME_TEXTS } from "../constants/home.constants";
import Banner from "@/assets/images/banner.png";
import { Button } from "@/components/ui/button";

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
    <div className="w-full">
      <div className="relative h-26 w-full overflow-hidden rounded-b-[28px]">
        <Image
          src={Banner}
          alt="Sports Banner"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="relative z-10 -mt-5 px-4">
        <div className="flex h-11 items-center justify-between rounded-full bg-card px-3.5 shadow-md border border-border">
          <div className="flex flex-1 items-center mr-2">
            <Search className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={HOME_TEXTS.searchPlaceholder}
              className="w-full bg-transparent text-xs text-foreground placeholder-muted-foreground focus:outline-hidden"
            />
          </div>
        </div>
      </div>

      <div className="mt-3 flex justify-end gap-2 px-4">
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
      </div>
    </div>
  );
}
