"use client";

import React from "react";
import { PageHeader } from "@/components/common/page-header";
import { BOOKING_CREATE_TEXTS } from "../../constants/booking-create.constants";

interface BookingHeaderProps {
  venueName: string;
  address: string;
}

export function BookingHeader({ venueName, address }: BookingHeaderProps) {
  return (
    <div className="shrink-0 z-10">
      <PageHeader
        title={BOOKING_CREATE_TEXTS.headerTitle}
        showBack
        variant="gradient"
      />
      <div className="bg-gradient-to-r from-primary via-primary/95 to-primary/85 px-4 pb-4 pt-1 text-primary-foreground">
        <h1 className="line-clamp-1 text-sm font-extrabold">{venueName}</h1>
        <p className="line-clamp-1 text-[11px] opacity-90">{address}</p>
      </div>
    </div>
  );
}
