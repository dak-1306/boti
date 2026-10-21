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

interface BookingPaymentCardProps {
  payment: BookingPaymentInfo;
}

export function BookingPaymentCard({ payment }: BookingPaymentCardProps) {
  const [copiedTx, setCopiedTx] = useState(false);

  const formatVND = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const handleCopyTx = () => {
    navigator.clipboard.writeText(payment.transactionId);
    setCopiedTx(true);
    setTimeout(() => setCopiedTx(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 dark:border-slate-800/80">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-100">
          Thông tin thanh toán
        </h3>

        <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-extrabold text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
          <CheckCircle2 className="h-3 w-3" />
          <span>{payment.statusText}</span>
        </span>
      </div>

      <div className="mt-3 space-y-2.5 text-xs">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-slate-400">
            <CreditCard className="h-3.5 w-3.5" /> Phương thức:
          </span>
          <span className="font-bold text-slate-800 dark:text-slate-200">
            {payment.method}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-slate-400">
            <Receipt className="h-3.5 w-3.5" /> Mã giao dịch:
          </span>
          <div className="flex items-center gap-1 font-mono font-bold text-slate-700 dark:text-slate-300">
            <span>{payment.transactionId}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCopyTx}
              className="h-5 w-5 rounded-md p-0 text-slate-400 hover:text-blue-600"
              title="Sao chép mã giao dịch"
            >
              {copiedTx ? (
                <Check className="h-3 w-3 text-emerald-500" />
              ) : (
                <Copy className="h-3 w-3" />
              )}
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-slate-400">
            <Clock className="h-3.5 w-3.5" /> Thời gian:
          </span>
          <span className="font-medium text-slate-600 dark:text-slate-300">
            {payment.paidAt}
          </span>
        </div>

        <div className="my-2 border-t border-dashed border-slate-200 dark:border-slate-800" />

        <div className="flex items-center justify-between">
          <span className="text-slate-500">Tiền sân:</span>
          <span className="font-semibold text-slate-800 dark:text-slate-200">
            {formatVND(payment.courtFee)}
          </span>
        </div>

        {payment.discountFee > 0 && (
          <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400">
            <span>Khuyến mãi / Voucher:</span>
            <span className="font-semibold">
              -{formatVND(payment.discountFee)}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="text-slate-500">Phí dịch vụ:</span>
          <span className="font-semibold text-slate-800 dark:text-slate-200">
            {payment.serviceFee === 0
              ? "Miễn phí"
              : formatVND(payment.serviceFee)}
          </span>
        </div>

        <div className="mt-2 flex items-center justify-between rounded-xl bg-blue-50/70 p-2.5 dark:bg-blue-950/40">
          <span className="font-bold text-slate-800 dark:text-slate-100">
            Tổng thanh toán:
          </span>
          <span className="text-base font-black text-blue-600 dark:text-blue-400">
            {formatVND(payment.totalFee)}
          </span>
        </div>
      </div>
    </div>
  );
}
