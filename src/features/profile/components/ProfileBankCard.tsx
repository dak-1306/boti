"use client";

import React, { useState } from "react";
import { CreditCard, Edit3, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BankInfo } from "../types/profile.types";
import { PROFILE_TEXTS } from "../constants/profile.constants";

interface ProfileBankCardProps {
  bankInfo: BankInfo;
  onEdit: () => void;
}

export function ProfileBankCard({ bankInfo, onEdit }: ProfileBankCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(bankInfo.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-4 text-card-foreground shadow-xs">
      <div className="flex items-center justify-between border-b border-border pb-2.5">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted text-primary">
            <CreditCard className="h-5 w-5" />
          </div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
            {PROFILE_TEXTS.bankCardTitle}
          </h3>
        </div>

        <Button
          size="sm"
          variant="ghost"
          onClick={onEdit}
          className="h-11 rounded-lg px-3 text-xs font-bold text-primary hover:bg-muted"
        >
          <Edit3 className="mr-1 h-4 w-4" />
          {PROFILE_TEXTS.bankCardEditBtn}
        </Button>
      </div>

      <div className="mt-3 space-y-2 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">
            {PROFILE_TEXTS.labelBank}
          </span>
          <span className="font-bold text-foreground truncate max-w-[200px] text-right">
            {bankInfo.bankName}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">
            {PROFILE_TEXTS.labelAccountNo}
          </span>
          <div className="flex items-center gap-1 font-mono font-bold text-foreground">
            <span>{bankInfo.accountNumber}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCopy}
              className="h-11 w-11 rounded-md text-muted-foreground hover:text-primary"
              title={PROFILE_TEXTS.copyTooltip}
            >
              {copied ? (
                <Check className="h-4 w-4 text-emerald-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">
            {PROFILE_TEXTS.labelAccountHolder}
          </span>
          <span className="font-bold uppercase text-foreground">
            {bankInfo.accountHolder}
          </span>
        </div>
      </div>
    </div>
  );
}
