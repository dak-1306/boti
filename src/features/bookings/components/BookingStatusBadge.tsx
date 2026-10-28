"use client";

import React from "react";
import { Badge, BadgeVariant } from "@/components/ui/badge";
import { BookingStatus } from "../types/bookings.types";
import { COMMON_TEXTS } from "@/constants/common.constants";

interface BookingStatusBadgeProps {
  status: BookingStatus;
  statusText?: string;
  size?: "sm" | "default" | "md";
  showIcon?: boolean;
  className?: string;
}

const STATUS_CONFIG: Record<
  BookingStatus,
  {
    defaultText: string;
    variant: BadgeVariant;
    icon: string;
  }
> = {
  confirmed: {
    defaultText: "Đã đặt",
    variant: "success",
    icon: COMMON_TEXTS.statusIcons?.confirmed || "✓",
  },
  rescheduled: {
    defaultText: "Đã dời lịch",
    variant: "warning",
    icon: COMMON_TEXTS.statusIcons?.rescheduled || "🔄",
  },
  cancelled: {
    defaultText: "Đã hủy",
    variant: "cancelled",
    icon: COMMON_TEXTS.statusIcons?.cancelled || "✕",
  },
  passing: {
    defaultText: "Đang Pass",
    variant: "passing",
    icon: (COMMON_TEXTS.statusIcons as Record<string, string>)?.passing || "🎟️",
  },
  passed_success: {
    defaultText: "Đã Pass",
    variant: "passed",
    icon: (COMMON_TEXTS.statusIcons as Record<string, string>)?.passed_success || "✅",
  },
};

export function BookingStatusBadge({
  status,
  statusText,
  size = "default",
  showIcon = false,
  className,
}: BookingStatusBadgeProps) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.confirmed;
  const label = statusText || config.defaultText;

  return (
    <Badge variant={config.variant} size={size} className={className}>
      {showIcon && <span>{config.icon}</span>}
      <span>{label}</span>
    </Badge>
  );
}