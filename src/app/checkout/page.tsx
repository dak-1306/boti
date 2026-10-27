"use client";

import React, { Suspense } from "react";
import { PageHeader } from "@/components/common/page-header";
import { CheckoutSummaryCard } from "@/features/checkout/components/CheckoutSummaryCard";
import { PaymentMethodSelector } from "@/features/checkout/components/PaymentMethodSelector";
import { CheckoutBottomBar } from "@/features/checkout/components/CheckoutBottomBar";
import { useCheckout } from "@/features/checkout/hooks/useCheckout";
import { CHECKOUT_TEXTS } from "@/features/checkout/constants/checkout.constants";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

function CheckoutContent() {
  const {
    bookingData,
    selectedMethod,
    setSelectedMethod,
    isProcessing,
    shouldSimulateSuccess,
    setShouldSimulateSuccess,
    handleProcessPayment,
  } = useCheckout();

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-background text-foreground">
      <PageHeader
        title={CHECKOUT_TEXTS.headerTitle}
        showBack
        variant="gradient"
      />

      <div className="flex-1 overflow-y-auto p-4 pb-24 no-scrollbar">
        <div className="w-full space-y-4 sm:mx-auto sm:max-w-[390px]">
          {/* Tóm tắt đơn */}
          <CheckoutSummaryCard data={bookingData} />

          {/* Chọn PTTT */}
          <PaymentMethodSelector
            selectedMethod={selectedMethod}
            onSelectMethod={setSelectedMethod}
          />

          {/* DEV Switch Test Giả Lập Thành Công / Thất Bại */}
          <div className="flex items-center justify-between rounded-xl border border-dashed border-border bg-muted/30 p-3 mt-4">
            <Label className="text-[11px] font-semibold text-muted-foreground">
              {CHECKOUT_TEXTS.devModeTitle}{" "}
              <span
                className={
                  shouldSimulateSuccess
                    ? "text-emerald-500 font-bold"
                    : "text-destructive font-bold"
                }
              >
                {shouldSimulateSuccess
                  ? CHECKOUT_TEXTS.devStatusSuccess
                  : CHECKOUT_TEXTS.devStatusFail}
              </span>
            </Label>
            <Switch
              checked={shouldSimulateSuccess}
              onCheckedChange={setShouldSimulateSuccess}
            />
          </div>
        </div>
      </div>

      <CheckoutBottomBar
        totalPrice={bookingData.totalPrice}
        isProcessing={isProcessing}
        onPayNow={handleProcessPayment}
      />
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-full w-full items-center justify-center bg-background text-xs font-bold text-muted-foreground">
          Đang chuẩn bị trang thanh toán...
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
