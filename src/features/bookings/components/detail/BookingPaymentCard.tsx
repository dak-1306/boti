"use client";

import React, { useState } from "react";
import {
  CreditCard,
  Receipt,
  Clock,
  CheckCircle2,
  Copy,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingPaymentInfo } from "../../types/bookings.types";
import { BOOKING_TEXTS } from "../../constants/bookings.constants";

interface BookingPaymentCardProps {
  payment?: BookingPaymentInfo;
}

export function BookingPaymentCard({ payment }: BookingPaymentCardProps) {
  const [copiedTx, setCopiedTx] = useState(false);

  const formatVND = (amount: number = 0) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const handleCopyTx = () => {
    if (payment?.transactionId) {
      navigator.clipboard.writeText(payment.transactionId);
      setCopiedTx(true);
      setTimeout(() => setCopiedTx(false), 2000);
    }
  };

  if (!payment) return null;

  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-xs text-card-foreground">
      <div className="flex items-center justify-between border-b border-border pb-2.5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
          {BOOKING_TEXTS.paymentCardTitle}
        </h3>

        <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="h-3.5 w-3.5" />
          <span>{payment?.statusText || "Đã thanh toán"}</span>
        </span>
      </div>

      <div className="mt-3 space-y-2.5 text-xs">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-muted-foreground">
            <CreditCard className="h-4 w-4" /> {BOOKING_TEXTS.labelMethod}
          </span>
          <span className="font-bold text-foreground">
            {payment?.method || "Ví ZaloPay"}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-muted-foreground">
            <Receipt className="h-4 w-4" /> {BOOKING_TEXTS.labelTxId}
          </span>
          <div className="flex items-center gap-1 font-mono font-bold text-foreground">
            <span>{payment?.transactionId || "N/A"}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCopyTx}
              className="h-11 w-11 rounded-md text-muted-foreground hover:text-primary"
              title={BOOKING_TEXTS.copyTxTooltip}
            >
              {copiedTx ? (
                <Check className="h-4 w-4 text-emerald-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" /> {BOOKING_TEXTS.labelPaidTime}
          </span>
          <span className="font-medium text-muted-foreground">
            {payment?.paidAt || "--:--"}
          </span>
        </div>

        <div className="my-2 border-t border-dashed border-border" />

        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">
            {BOOKING_TEXTS.labelCourtFee}
          </span>
          <span className="font-semibold text-foreground">
            {formatVND(payment?.courtFee)}
          </span>
        </div>

        {(payment?.discountFee ?? 0) > 0 && (
          <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400">
            <span>{BOOKING_TEXTS.labelDiscountFee}</span>
            <span className="font-semibold">
              -{formatVND(payment?.discountFee)}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">
            {BOOKING_TEXTS.labelServiceFee}
          </span>
          <span className="font-semibold text-foreground">
            {payment?.serviceFee === 0
              ? BOOKING_TEXTS.labelFree
              : formatVND(payment?.serviceFee)}
          </span>
        </div>

        <div className="mt-2 flex items-center justify-between rounded-xl bg-muted p-2.5">
          <span className="font-bold text-foreground">
            {BOOKING_TEXTS.labelTotalFee}
          </span>
          <span className="text-base font-black text-primary">
            {formatVND(payment?.totalFee)}
          </span>
        </div>
      </div>
    </div>
  );
}
