"use client";

import React from "react";
import {
  PASS_COURT_TEXTS,
  PASS_DISCOUNT_OPTIONS,
} from "../../constants/pass.constants";

interface PassCourtDiscountFormProps {
  discountPercent: number;
  originalPrice: number;
  passPrice: number;
  onSelectDiscount: (opt: number) => void;
}

export function PassCourtDiscountForm({
  discountPercent,
  originalPrice,
  passPrice,
  onSelectDiscount,
}: PassCourtDiscountFormProps) {
  return (
    <div className="space-y-2">
      <label className="font-bold text-foreground block">
        {PASS_COURT_TEXTS.discountSectionTitle}
      </label>
      <div className="grid grid-cols-5 gap-1.5">
        {PASS_DISCOUNT_OPTIONS.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onSelectDiscount(opt)}
            className={`py-2 rounded-xl font-bold border transition-all text-xs ${
              discountPercent === opt
                ? "bg-primary text-primary-foreground border-primary shadow-xs"
                : "bg-card border-border text-foreground hover:bg-muted"
            }`}
          >
            {opt === 0
              ? PASS_COURT_TEXTS.originalPriceOption
              : PASS_COURT_TEXTS.discountOption(opt)}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between p-3 rounded-xl bg-primary/10 border border-primary/20 mt-2">
        <div>
          <p className="text-muted-foreground text-[11px]">
            {PASS_COURT_TEXTS.originalPriceLabel}{" "}
            <span className="line-through">
              {originalPrice.toLocaleString("vi-VN")}đ
            </span>
          </p>
          <p className="font-bold text-primary text-sm">
            {PASS_COURT_TEXTS.resellPriceLabel}{" "}
            {passPrice.toLocaleString("vi-VN")}đ
          </p>
        </div>
        <span className="text-[10px] font-bold px-2 py-1 rounded-md bg-primary text-primary-foreground">
          {PASS_COURT_TEXTS.savePercentLabel(discountPercent)}
        </span>
      </div>
    </div>
  );
}
