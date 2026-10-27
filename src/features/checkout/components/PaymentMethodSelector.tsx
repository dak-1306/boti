"use client";

import React from "react";
import { Wallet, QrCode, Banknote, Check } from "lucide-react";
import { CHECKOUT_TEXTS } from "../constants/checkout.constants";
import { PaymentMethodType } from "../types/checkout.types";
import { cn } from "@/lib/utils";

interface PaymentMethodSelectorProps {
  selectedMethod: PaymentMethodType;
  onSelectMethod: (method: PaymentMethodType) => void;
}

export function PaymentMethodSelector({
  selectedMethod,
  onSelectMethod,
}: PaymentMethodSelectorProps) {
  const methods = [
    {
      id: "zalopay" as PaymentMethodType,
      title: CHECKOUT_TEXTS.methodZaloPayTitle,
      desc: CHECKOUT_TEXTS.methodZaloPayDesc,
      icon: Wallet,
    },
    {
      id: "vietqr" as PaymentMethodType,
      title: CHECKOUT_TEXTS.methodVietQRTitle,
      desc: CHECKOUT_TEXTS.methodVietQRDesc,
      icon: QrCode,
    },
    {
      id: "cash" as PaymentMethodType,
      title: CHECKOUT_TEXTS.methodCashTitle,
      desc: CHECKOUT_TEXTS.methodCashDesc,
      icon: Banknote,
    },
  ];

  return (
    <div className="space-y-2.5">
      <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1">
        {CHECKOUT_TEXTS.paymentMethodTitle}
      </h3>

      <div className="space-y-2">
        {methods.map((m) => {
          const Icon = m.icon;
          const isSelected = selectedMethod === m.id;

          return (
            <button
              key={m.id}
              type="button"
              onClick={() => onSelectMethod(m.id)}
              className={cn(
                "flex w-full items-center justify-between rounded-2xl border p-3.5 transition-all text-left active:scale-[0.99]",
                isSelected
                  ? "border-primary bg-primary/5 shadow-2xs"
                  : "border-border bg-card hover:bg-muted/50",
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border",
                    isSelected
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-muted text-muted-foreground",
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground">{m.title}</p>
                  <p className="text-[11px] text-muted-foreground font-medium">
                    {m.desc}
                  </p>
                </div>
              </div>

              <div
                className={cn(
                  "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all",
                  isSelected
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-muted-foreground/30 bg-transparent",
                )}
              >
                {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
