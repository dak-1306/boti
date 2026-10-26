"use client";

import React from "react";
import { Building2, Check } from "lucide-react";
import { POPULAR_BANKS } from "../constants/profile.constants";
import { cn } from "@/lib/utils";

interface BankSelectorProps {
  selectedBankCode?: string;
  selectedBankName?: string;
  onSelectBank: (code: string, name: string) => void;
}

export function BankSelector({
  selectedBankCode = "",
  selectedBankName = "",
  onSelectBank,
}: BankSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
        <Building2 className="h-3.5 w-3.5 text-primary" />
        Ngân hàng thụ hưởng
      </label>

      <div className="grid grid-cols-2 gap-2">
        {POPULAR_BANKS.map((bank) => {
          const code = bank?.code ?? "";
          const name = bank?.name ?? "";
          const targetCode = (selectedBankCode ?? "").toLowerCase();
          const targetName = (selectedBankName ?? "").toLowerCase();

          const isSelected =
            (targetCode !== "" && targetCode === code.toLowerCase()) ||
            (targetName !== "" && targetName === name.toLowerCase());

          return (
            <button
              key={code}
              type="button"
              onClick={() => onSelectBank(code, name)}
              className={cn(
                "flex h-11 items-center justify-between rounded-xl px-3 text-xs font-semibold border transition-all active:scale-95",
                isSelected
                  ? "border-primary bg-primary/10 text-primary font-bold shadow-2xs"
                  : "border-border bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <div className="flex items-center gap-2 truncate">
                <span className="font-mono text-[11px] font-bold uppercase text-foreground">
                  {code}
                </span>
                <span className="truncate text-[11px] opacity-80">{name}</span>
              </div>

              {isSelected && (
                <Check className="h-4 w-4 shrink-0 text-primary" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
