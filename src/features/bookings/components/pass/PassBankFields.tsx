"use client";

import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { CreditCard } from "lucide-react";
import { Input } from "@/components/ui/input";
import { PASS_COURT_TEXTS } from "../../constants/pass.constants";
import { PassCourtFormValues } from "./PassCourtDrawer";

interface PassBankFieldsProps {
  register: UseFormRegister<PassCourtFormValues>;
  errors: FieldErrors<PassCourtFormValues>;
}

export function PassBankFields({ register, errors }: PassBankFieldsProps) {
  return (
    <div className="space-y-2 pt-1 border-t border-border">
      <label className="font-bold text-foreground flex items-center gap-1">
        <CreditCard className="h-4 w-4 text-primary" />
        {PASS_COURT_TEXTS.bankSectionTitle}
      </label>

      <div className="space-y-3 bg-card p-3 rounded-2xl border border-border">
        <div>
          <span className="text-[11px] text-muted-foreground">
            {PASS_COURT_TEXTS.bankNameLabel}
          </span>
          <Input
            {...register("bankName")}
            placeholder={PASS_COURT_TEXTS.bankNamePlaceholder}
            className="h-9 text-xs mt-1"
          />
          {errors.bankName && (
            <p className="text-[10px] text-destructive mt-1 font-medium">
              {errors.bankName.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <span className="text-[11px] text-muted-foreground">
              {PASS_COURT_TEXTS.accountNumberLabel}
            </span>
            <Input
              {...register("accountNumber")}
              placeholder={PASS_COURT_TEXTS.accountNumberPlaceholder}
              className="h-9 text-xs mt-1"
            />
            {errors.accountNumber && (
              <p className="text-[10px] text-destructive mt-1 font-medium">
                {errors.accountNumber.message}
              </p>
            )}
          </div>
          <div>
            <span className="text-[11px] text-muted-foreground">
              {PASS_COURT_TEXTS.accountHolderLabel}
            </span>
            <Input
              {...register("accountHolder")}
              placeholder={PASS_COURT_TEXTS.accountHolderPlaceholder}
              className="h-9 text-xs mt-1 uppercase"
            />
            {errors.accountHolder && (
              <p className="text-[10px] text-destructive mt-1 font-medium">
                {errors.accountHolder.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
