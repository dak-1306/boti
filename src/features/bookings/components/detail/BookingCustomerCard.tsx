"use client";

import React from "react";
import { User, Phone, Users, FileText, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingCustomerInfo } from "../../types/bookings.types";
import { BOOKING_TEXTS } from "../../constants/bookings.constants";

interface BookingCustomerCardProps {
  customer?: BookingCustomerInfo;
  onEdit?: () => void;
}

export function BookingCustomerCard({
  customer,
  onEdit,
}: BookingCustomerCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-xs text-card-foreground">
      <div className="flex items-center justify-between border-b border-border pb-2.5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
          {BOOKING_TEXTS.customerCardTitle}
        </h3>

        {onEdit && (
          <Button
            size="sm"
            variant="outline"
            onClick={onEdit}
            className="h-11 rounded-full border-primary/20 bg-primary/10 px-3 text-[11px] font-bold text-primary hover:bg-primary/20"
          >
            <Edit3 className="mr-1 h-3.5 w-3.5" />
            {BOOKING_TEXTS.btnEditCustomer}
          </Button>
        )}
      </div>

      <div className="mt-3 space-y-2.5 text-xs">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-muted-foreground">
            <User className="h-4 w-4" /> {BOOKING_TEXTS.labelCustomerName}
          </span>
          <span className="font-bold text-foreground">
            {customer?.name || "Nguyễn Văn A"}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-muted-foreground">
            <Phone className="h-4 w-4" /> {BOOKING_TEXTS.labelCustomerPhone}
          </span>
          <span className="font-bold text-foreground">
            {customer?.phone || "0901 234 567"}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-muted-foreground">
            <Users className="h-4 w-4" /> {BOOKING_TEXTS.labelPlayerCount}
          </span>
          <span className="font-bold text-foreground">
            {customer?.playerCount ?? 4} {BOOKING_TEXTS.unitPeople}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-muted-foreground">
            <FileText className="h-4 w-4" /> {BOOKING_TEXTS.labelNotes}
          </span>
          <span className="font-medium text-muted-foreground">
            {customer?.notes || BOOKING_TEXTS.defaultNotes}
          </span>
        </div>
      </div>
    </div>
  );
}
