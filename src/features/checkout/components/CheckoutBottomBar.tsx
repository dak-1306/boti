"use client";

import React from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CHECKOUT_TEXTS } from "../constants/checkout.constants";

interface CheckoutBottomBarProps {
  totalPrice: number;
  isProcessing: boolean;
  onPayNow: () => void;
}

export function CheckoutBottomBar({
  totalPrice,
  isProcessing,
  onPayNow,
}: CheckoutBottomBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-border bg-card p-3 shadow-lg sm:mx-auto sm:max-w-[390px]">
      <div className="flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] text-muted-foreground block font-medium">
            {CHECKOUT_TEXTS.totalLabel}
          </span>
          <span className="text-base font-extrabold text-primary">
            {totalPrice.toLocaleString("vi-VN")} đ
          </span>
        </div>

        <Button
          variant="cta"
          disabled={isProcessing}
          onClick={onPayNow}
          className="h-11 flex-1"
        >
          {isProcessing ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              {CHECKOUT_TEXTS.btnProcessing}
            </span>
          ) : (
            CHECKOUT_TEXTS.btnPayNow
          )}
        </Button>
      </div>
    </div>
  );
}
