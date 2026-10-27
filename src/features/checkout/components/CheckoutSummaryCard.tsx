"use client";

import React from "react";
import { MapPin, Calendar, Clock, User } from "lucide-react";
import { CHECKOUT_TEXTS } from "../constants/checkout.constants";
import { CheckoutBookingData } from "../types/checkout.types";

interface CheckoutSummaryCardProps {
  data: CheckoutBookingData;
}

export function CheckoutSummaryCard({ data }: CheckoutSummaryCardProps) {
  return (
    <div className="space-y-3 rounded-2xl border border-border bg-card p-4 shadow-xs">
      <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground border-b border-border pb-2">
        {CHECKOUT_TEXTS.summarySectionTitle}
      </h3>

      <div className="space-y-2.5 text-xs">
        <div>
          <span className="font-extrabold text-foreground text-sm block">
            {data.venueName} - {data.courtName}
          </span>
          <span className="text-[11px] text-muted-foreground flex items-center gap-1 mt-0.5">
            <MapPin className="h-3 w-3 shrink-0 text-primary" />
            {data.venueAddress}
          </span>
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="text-muted-foreground flex items-center gap-1.5 font-medium">
            <Calendar className="h-3.5 w-3.5 text-primary" />
            {CHECKOUT_TEXTS.dateLabel}
          </span>
          <span className="font-bold text-foreground">{data.dateText}</span>
        </div>

        <div className="flex items-start justify-between">
          <span className="text-muted-foreground flex items-center gap-1.5 font-medium">
            <Clock className="h-3.5 w-3.5 text-primary" />
            {CHECKOUT_TEXTS.slotsLabel}
          </span>
          <div className="text-right space-y-0.5">
            {data.slots.map((s) => (
              <div key={s.id} className="font-semibold text-foreground">
                {s.timeText} ({s.price.toLocaleString("vi-VN")}đ)
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-border pt-2 mt-2">
          <span className="text-muted-foreground flex items-center gap-1.5 font-medium">
            <User className="h-3.5 w-3.5 text-primary" />
            {CHECKOUT_TEXTS.customerLabel}
          </span>
          <span className="font-semibold text-foreground">
            {data.customerName} • {data.customerPhone}
          </span>
        </div>
      </div>
    </div>
  );
}
