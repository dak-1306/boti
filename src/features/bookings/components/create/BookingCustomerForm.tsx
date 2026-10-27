"use client";

import React from "react";
import { User, Phone, FileText } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BOOKING_CREATE_TEXTS } from "../../constants/booking-create.constants";
import { BookingCustomerFormData } from "../../schemas/booking-create.schema";
import { cn } from "@/lib/utils";

interface BookingCustomerFormProps {
  form: UseFormReturn<BookingCustomerFormData>;
}

export function BookingCustomerForm({ form }: BookingCustomerFormProps) {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="space-y-3 px-4 pt-4 border-t border-border mt-4">
      <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
        {BOOKING_CREATE_TEXTS.customerSectionTitle}
      </Label>

      <div className="space-y-3">
        {/* Họ và tên */}
        <div className="space-y-1">
          <Label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
            <User className="h-3.5 w-3.5 text-primary" />
            {BOOKING_CREATE_TEXTS.labelFullName}
          </Label>
          <Input
            type="text"
            placeholder={BOOKING_CREATE_TEXTS.placeholderFullName}
            {...register("name")}
            className={cn(
              "h-11 rounded-xl bg-card border-border text-xs text-foreground focus-visible:ring-primary",
              errors.name &&
                "border-destructive focus-visible:ring-destructive",
            )}
          />
          {errors.name && (
            <p className="text-[11px] font-medium text-destructive mt-0.5">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Số điện thoại */}
        <div className="space-y-1">
          <Label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
            <Phone className="h-3.5 w-3.5 text-primary" />
            {BOOKING_CREATE_TEXTS.labelPhone}
          </Label>
          <Input
            type="tel"
            placeholder={BOOKING_CREATE_TEXTS.placeholderPhone}
            {...register("phone")}
            className={cn(
              "h-11 rounded-xl bg-card border-border text-xs text-foreground focus-visible:ring-primary",
              errors.phone &&
                "border-destructive focus-visible:ring-destructive",
            )}
          />
          {errors.phone && (
            <p className="text-[11px] font-medium text-destructive mt-0.5">
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Ghi chú */}
        <div className="space-y-1">
          <Label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
            <FileText className="h-3.5 w-3.5 text-primary" />
            {BOOKING_CREATE_TEXTS.labelNotes}
          </Label>
          <Input
            type="text"
            placeholder={BOOKING_CREATE_TEXTS.placeholderNotes}
            {...register("notes")}
            className="h-11 rounded-xl bg-card border-border text-xs text-foreground focus-visible:ring-primary"
          />
        </div>
      </div>
    </div>
  );
}
