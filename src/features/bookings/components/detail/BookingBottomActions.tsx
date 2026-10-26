"use client";

import React from "react";
import { motion } from "framer-motion";
import { Share2, XCircle, CalendarSync } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BOOKING_TEXTS } from "../../constants/bookings.constants";

interface BookingBottomActionsProps {
  onShare: () => void;
  onCancel: () => void;
  onReschedule: () => void;
}

export function BookingBottomActions({
  onShare,
  onCancel,
  onReschedule,
}: BookingBottomActionsProps) {
  return (
    <div className="shrink-0 border-t border-border bg-card/95 px-4 py-3 pb-[calc(12px+env(safe-area-inset-bottom))] shadow-lg backdrop-blur-md">
      <div className="flex items-center gap-2.5 sm:mx-auto sm:max-w-[390px]">
        <motion.div whileTap={{ scale: 0.92 }}>
          <Button
            variant="outline"
            size="icon"
            onClick={onShare}
            className="h-11 w-11 rounded-xl border-border text-muted-foreground hover:bg-muted hover:text-foreground"
            title={BOOKING_TEXTS.actionShare}
          >
            <Share2 className="h-5 w-5" />
          </Button>
        </motion.div>

        <motion.div whileTap={{ scale: 0.92 }} className="flex-1">
          <Button
            variant="outline"
            onClick={onCancel}
            className="h-11 w-full rounded-xl border-destructive/30 bg-destructive/10 text-xs font-bold text-destructive hover:bg-destructive/20"
          >
            <XCircle className="mr-1.5 h-4 w-4" />
            {BOOKING_TEXTS.actionCancel}
          </Button>
        </motion.div>

        <motion.div whileTap={{ scale: 0.92 }} className="flex-[1.3]">
          <Button
            onClick={onReschedule}
            className="h-11 w-full rounded-xl bg-primary text-xs font-bold text-primary-foreground shadow-md hover:bg-primary/90"
          >
            <CalendarSync className="mr-1.5 h-4 w-4" />
            {BOOKING_TEXTS.actionReschedule}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
