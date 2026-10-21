"use client";

import React from "react";
import { motion } from "framer-motion";
import { Share2, XCircle, CalendarSync } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    <div className="shrink-0 border-t border-slate-100 bg-white/95 px-4 py-3 pb-[calc(12px+env(safe-area-inset-bottom))] shadow-[0_-4px_20px_rgba(0,0,0,0.05)] backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/95">
      <div className="flex items-center gap-2.5 sm:mx-auto sm:max-w-[390px]">
        {/* NÚT 1: CHIA SẺ (Icon Button gọn gàng) */}
        <motion.div whileTap={{ scale: 0.92 }}>
          <Button
            variant="outline"
            size="icon"
            onClick={onShare}
            className="h-11 w-11 rounded-xl border-slate-200/80 text-slate-600 hover:bg-slate-100 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
            title="Chia sẻ"
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </motion.div>

        {/* NÚT 2: HỦY LỊCH (Outline Destructive) */}
        <motion.div whileTap={{ scale: 0.92 }} className="flex-1">
          <Button
            variant="outline"
            onClick={onCancel}
            className="h-11 w-full rounded-xl border-rose-200/80 bg-rose-50/50 text-xs font-bold text-rose-600 hover:bg-rose-100 hover:text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/30 dark:text-rose-400"
          >
            <XCircle className="mr-1.5 h-4 w-4" />
            Hủy lịch
          </Button>
        </motion.div>

        {/* NÚT 3: DỜI LỊCH (Primary CTA nổi bật nhất) */}
        <motion.div whileTap={{ scale: 0.92 }} className="flex-[1.3]">
          <Button
            onClick={onReschedule}
            className="h-11 w-full rounded-xl bg-blue-600 text-xs font-bold text-white shadow-md shadow-blue-500/20 hover:bg-blue-700"
          >
            <CalendarSync className="mr-1.5 h-4 w-4" />
            Dời lịch
          </Button>
        </motion.div>
      </div>
    </div>
  );
}