"use client";

import React from "react";
import { motion } from "framer-motion";
import { Share2, XCircle, CalendarSync, TicketPercent } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BOOKING_TEXTS } from "../../constants/bookings.constants";

interface BookingBottomActionsProps {
  status?: string;
  onShare: () => void;
  onCancel: () => void;
  onReschedule: () => void;
  onPass?: () => void;
}

export function BookingBottomActions({
  status = "confirmed",
  onShare,
  onCancel,
  onReschedule,
  onPass,
}: BookingBottomActionsProps) {
  const isConfirmed = status === "confirmed";

  return (
    <div className="shrink-0 border-t border-border bg-card/95 px-4 py-3 pb-[calc(12px+env(safe-area-inset-bottom))] shadow-lg backdrop-blur-md">
      <div className="flex flex-col gap-2 sm:mx-auto sm:max-w-[390px]">
        {/* HÀNG 1: 3 NÚT TÁC VỤ PHỤ */}
        <div className="flex items-center gap-2 w-full">
          <motion.div whileTap={{ scale: 0.92 }}>
            <Button
              variant="outline"
              size="icon"
              onClick={onShare}
              className="h-10 w-10 shrink-0 rounded-xl border-border text-muted-foreground hover:bg-muted hover:text-foreground"
              title={BOOKING_TEXTS.actionShare}
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </motion.div>

          {isConfirmed && (
            <motion.div whileTap={{ scale: 0.92 }} className="flex-1">
              <Button
                variant="outline"
                onClick={onCancel}
                className="h-10 w-full rounded-xl border-destructive/30 bg-destructive/10 text-xs font-bold text-destructive hover:bg-destructive/20"
              >
                <XCircle className="mr-1 h-4 w-4" />
                {BOOKING_TEXTS.actionCancel}
              </Button>
            </motion.div>
          )}

          {isConfirmed && (
            <motion.div whileTap={{ scale: 0.92 }} className="flex-1">
              <Button
                variant="outline"
                onClick={onReschedule}
                className="h-10 w-full rounded-xl border-border text-xs font-bold text-foreground hover:bg-muted"
              >
                <CalendarSync className="mr-1 h-4 w-4" />
                {BOOKING_TEXTS.actionReschedule}
              </Button>
            </motion.div>
          )}
        </div>

        {/* HÀNG 2: NÚT PASS SÂN CHÍNH (Full-width, Variant CTA) */}
        {isConfirmed && onPass && (
          <motion.div whileTap={{ scale: 0.96 }} className="w-full">
            <Button
              variant="cta"
              onClick={onPass}
              className="h-11 w-full rounded-xl text-xs font-bold shadow-md"
            >
              <TicketPercent className="mr-1.5 h-4 w-4" />
              {BOOKING_TEXTS.actionPass}
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
