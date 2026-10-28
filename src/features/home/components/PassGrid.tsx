"use client";

import React from "react";
import { PassSlotItem } from "../types/home.types";
import { PassSlotCard } from "./PassSlotCard";
import { Button } from "@/components/ui/button";
import { StaggerGroup } from "@/components/motion/StaggerGroup";

interface PassGridProps {
  slots: PassSlotItem[];
  onSelectSlot: (slot: PassSlotItem) => void;
  onBuySlot?: (slot: PassSlotItem) => void;
  onResetFilters: () => void;
}

export function PassGrid({
  slots,
  onSelectSlot,
  onBuySlot,
  onResetFilters,
}: PassGridProps) {
  if (slots.length === 0) {
    return (
      <StaggerGroup className="flex h-64 flex-col items-center justify-center p-4 text-center">
        <p className="text-xs text-muted-foreground">
          Hiện chưa có lượt Pass sân nào phù hợp với bộ lọc.
        </p>
        <Button
          onClick={onResetFilters}
          className="mt-3 h-11 rounded-full bg-muted px-4 text-xs font-bold text-primary hover:bg-muted/80"
        >
          Xóa bộ lọc
        </Button>
      </StaggerGroup>
    );
  }

  return (
    <StaggerGroup className="flex flex-col space-y-3 px-4 pb-4">
      {slots.map((slot) => (
        <PassSlotCard
          key={slot.id}
          slot={slot}
          onClick={() => onSelectSlot(slot)}
          onBuy={onBuySlot}
        />
      ))}
    </StaggerGroup>
  );
}
