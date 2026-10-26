"use client";

import React from "react";
import { User, Phone, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookingCustomer } from "../../types/booking-create.types";
import { BOOKING_CREATE_TEXTS } from "../../constants/booking-create.constants";

interface BookingCustomerFormProps {
  customer: BookingCustomer;
  onChangeCustomer: (
    field: keyof BookingCustomer,
    value: string | number,
  ) => void;
}

export function BookingCustomerForm({
  customer,
  onChangeCustomer,
}: BookingCustomerFormProps) {
  return (
    <div className="space-y-3 px-4 pt-4 border-t border-border mt-4">
      <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
        {BOOKING_CREATE_TEXTS.customerSectionTitle}
      </Label>

      <div className="space-y-2.5">
        <div className="space-y-1">
          <Label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
            <User className="h-3.5 w-3.5 text-primary" />{" "}
            {BOOKING_CREATE_TEXTS.labelFullName}
          </Label>
          <Input
            type="text"
            value={customer.name}
            onChange={(e) => onChangeCustomer("name", e.target.value)}
            className="h-11 rounded-xl bg-card border-border text-xs text-foreground focus-visible:ring-primary"
            required
          />
        </div>

        <div className="space-y-1">
          <Label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
            <Phone className="h-3.5 w-3.5 text-primary" />{" "}
            {BOOKING_CREATE_TEXTS.labelPhone}
          </Label>
          <Input
            type="tel"
            value={customer.phone}
            onChange={(e) => onChangeCustomer("phone", e.target.value)}
            className="h-11 rounded-xl bg-card border-border text-xs text-foreground focus-visible:ring-primary"
            required
          />
        </div>

        <div className="space-y-1">
          <Label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
            <FileText className="h-3.5 w-3.5 text-primary" />{" "}
            {BOOKING_CREATE_TEXTS.labelNotes}
          </Label>
          <Input
            type="text"
            placeholder={BOOKING_CREATE_TEXTS.placeholderNotes}
            value={customer.notes || ""}
            onChange={(e) => onChangeCustomer("notes", e.target.value)}
            className="h-11 rounded-xl bg-card border-border text-xs text-foreground focus-visible:ring-primary"
          />
        </div>
      </div>
    </div>
  );
}
