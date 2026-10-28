"use client";

import React from "react";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookingItem } from "../../types/bookings.types";
import { RESCHEDULE_TEXTS } from "../../constants/bookings.constants";
import { useRescheduleDrawer } from "../../hooks/useRescheduleDrawer";
import { RescheduleDateSelector } from "./RescheduleDateSelector";
import { RescheduleSlotPicker } from "./RescheduleSlotPicker";
import { RescheduleSummary } from "./RescheduleSummary";

interface BookingRescheduleDrawerProps {
  booking: BookingItem | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirmReschedule: (payload: {
    newDateText: string;
    newTimeText: string;
  }) => void;
}

export function BookingRescheduleDrawer({
  booking,
  isOpen,
  onClose,
  onConfirmReschedule,
}: BookingRescheduleDrawerProps) {
  const {
    dateOptions,
    selectedDateOption,
    setSelectedDateOption,
    courtSlots,
    selectedSlot,
    setSelectedSlot,
    targetSlotPrice,
    handleConfirm,
  } = useRescheduleDrawer({ booking, onConfirmReschedule, onClose });

  if (!booking) return null;

  return (
    <Drawer
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}
      showSwipeHandle
    >
      <DrawerContent className="rounded-t-[28px] bg-card text-card-foreground outline-none border-t border-border sm:mx-auto sm:max-w-[390px]">
        <div className="flex flex-col h-full max-h-[85vh]">
          {/* Header */}
          <div className="p-4 pb-2 border-b border-border space-y-1">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-extrabold tracking-tight text-foreground">
                {RESCHEDULE_TEXTS.drawerTitle}
              </h2>
              <Badge variant="default" size="sm">
                {RESCHEDULE_TEXTS.samePriceBadge}:{" "}
                {targetSlotPrice.toLocaleString("vi-VN")}đ
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground font-medium">
              {RESCHEDULE_TEXTS.drawerSubtitle}
            </p>
          </div>

          {/* Body Scroll */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
            <div className="space-y-2">
              <label className="text-xs font-bold text-foreground">
                {RESCHEDULE_TEXTS.selectDateLabel}
              </label>
              <RescheduleDateSelector
                options={dateOptions}
                selectedDate={selectedDateOption}
                onSelectDate={setSelectedDateOption}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-foreground">
                {RESCHEDULE_TEXTS.selectSlotLabel}
              </label>
              <RescheduleSlotPicker
                courtSlots={courtSlots}
                selectedSlot={selectedSlot}
                onSelectSlot={setSelectedSlot}
              />
            </div>

            <RescheduleSummary
              booking={booking}
              selectedDate={selectedDateOption}
              selectedSlot={selectedSlot}
            />
          </div>

          {/* Action Bottom */}
          <div className="p-3 border-t border-border pb-[calc(12px+env(safe-area-inset-bottom))] bg-card">
            <Button
              variant="cta"
              type="button"
              disabled={!selectedSlot}
              onClick={handleConfirm}
              className="h-11 w-full"
            >
              {RESCHEDULE_TEXTS.confirmBtn}
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
