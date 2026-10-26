"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { BOOKING_CREATE_TEXTS } from "../../constants/booking-create.constants";

interface BookingBottomBarProps {
  totalPrice: number;
  slotCount: number;
  onSubmit: () => void;
}

export function BookingBottomBar({
  totalPrice,
  slotCount,
  onSubmit,
}: BookingBottomBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-border bg-card p-3 shadow-lg sm:mx-auto sm:max-w-[390px]">
      <div className="flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] text-muted-foreground block">
            {BOOKING_CREATE_TEXTS.totalLabel} ({slotCount} khung giờ)
          </span>
          <span className="text-base font-extrabold text-primary">
            {totalPrice.toLocaleString("vi-VN")} đ
          </span>
        </div>

        <Button
          disabled={slotCount === 0}
          onClick={onSubmit}
          className="h-11 flex-1 rounded-full bg-primary text-xs font-bold text-primary-foreground shadow-md hover:bg-primary/90 disabled:opacity-50"
        >
          {BOOKING_CREATE_TEXTS.btnSubmit}
        </Button>
      </div>
    </div>
  );
}
