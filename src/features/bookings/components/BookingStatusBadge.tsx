"use client";

import React from "react";
import { cn } from "@/lib/utils";
import {Check, X, RefreshCw} from "lucide-react";
import { BookingStatus } from "../types/bookings.types";

interface BookingStatusBadgeProps {
  status: BookingStatus;
  statusText?: string;
  size?: "sm" | "md";
  showIcon?: boolean;
  className?: string;
}

const STATUS_CONFIG: Record<
  BookingStatus,
  { defaultText: string; style: string; icon: React.ReactNode }
> = {
  confirmed: {
    defaultText: "Đã đặt",
    style:
      "bg-emerald-50 text-emerald-600 border-emerald-200/60 dark:bg-emerald-950/60 dark:text-emerald-400 dark:border-emerald-800/60",
    icon: <Check className="h-3 w-3" />,
  },
  rescheduled: {
    defaultText: "Đã dời lịch",
    style:
      "bg-amber-50 text-amber-600 border-amber-200/60 dark:bg-amber-950/60 dark:text-amber-400 dark:border-amber-800/60",
    icon: <RefreshCw className="h-3 w-3" />,
  },
  cancelled: {
    defaultText: "Đã hủy",
    style:
      "bg-rose-50 text-rose-600 border-rose-200/60 dark:bg-rose-950/60 dark:text-rose-400 dark:border-rose-800/60",
    icon: <X className="h-3 w-3" />,
  },
};

export function BookingStatusBadge({
  status,
  statusText,
  size = "md",
  showIcon = false,
  className,
}: BookingStatusBadgeProps) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.confirmed;
  const label = statusText || config.defaultText;

  const sizeClasses =
    size === "sm"
      ? "px-2 py-0.5 text-[9px] font-bold"
      : "px-2.5 py-0.5 text-[11px] font-bold";

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1 rounded-full border transition-colors",
        config.style,
        sizeClasses,
        className,
      )}
    >
      {showIcon && <span>{config.icon}</span>}
      <span>{label}</span>
    </span>
  );
}
