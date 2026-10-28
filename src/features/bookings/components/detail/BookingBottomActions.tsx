"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Share2,
  XCircle,
  CalendarSync,
  TicketPercent,
  Undo2,
  Edit3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { BOOKING_TEXTS } from "../../constants/bookings.constants";
import { PASS_COURT_TEXTS } from "../../constants/pass.constants";

interface BookingBottomActionsProps {
  status?: string;
  onShare: () => void;
  onCancel: () => void;
  onReschedule: () => void;
  onPass?: () => void;
  onRevokePass?: () => void;
}

export function BookingBottomActions({
  status = "confirmed",
  onShare,
  onCancel,
  onReschedule,
  onPass,
  onRevokePass,
}: BookingBottomActionsProps) {
  const isConfirmed = status === "confirmed";
  const isPassing = status === "passing";

  return (
    <div className="shrink-0 border-t border-border bg-card/95 px-4 py-3 pb-[calc(12px+env(safe-area-inset-bottom))] shadow-lg backdrop-blur-md">
      <div className="flex flex-col gap-2 sm:mx-auto sm:max-w-[390px]">
        {/* TRẠNG THÁI: ĐÃ ĐẶT (CONFIRMED) */}
        {isConfirmed && (
          <>
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
            </div>

            {onPass && (
              <motion.div whileTap={{ scale: 0.96 }} className="w-full">
                <Button
                  variant="cta"
                  onClick={onPass}
                  className="h-11 w-full rounded-xl text-xs font-bold shadow-md"
                >
                  <TicketPercent className="mr-1.5 h-4 w-4" />
                  Đăng Pass sân này
                </Button>
              </motion.div>
            )}
          </>
        )}

        {/* TRẠNG THÁI: ĐANG PASS (PASSING) */}
        {isPassing && (
          <>
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

              {onRevokePass && (
                <motion.div whileTap={{ scale: 0.92 }} className="flex-1">
                  <Button
                    variant="outline"
                    onClick={onRevokePass}
                    className="h-10 w-full rounded-xl border-destructive/40 bg-destructive/10 text-xs font-bold text-destructive hover:bg-destructive/20"
                  >
                    <Undo2 className="mr-1.5 h-4 w-4" />
                    {PASS_COURT_TEXTS.actionRevokePass}
                  </Button>
                </motion.div>
              )}
            </div>

            {onPass && (
              <motion.div whileTap={{ scale: 0.96 }} className="w-full">
                <Button
                  variant="cta"
                  onClick={onPass}
                  className="h-11 w-full rounded-xl text-xs font-bold shadow-md"
                >
                  <Edit3 className="mr-1.5 h-4 w-4" />
                  {PASS_COURT_TEXTS.actionEditPass}
                </Button>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
