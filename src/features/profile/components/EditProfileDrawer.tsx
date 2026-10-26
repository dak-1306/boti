"use client";

import React, { useState } from "react";
import { X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserProfile } from "../types/profile.types";
import { VIETNAM_BANKS, PROFILE_TEXTS } from "../constants/profile.constants";

interface EditProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onSave: (updated: Partial<UserProfile>) => void;
}

export function EditProfileDrawer({
  isOpen,
  onClose,
  user,
  onSave,
}: EditProfileDrawerProps) {
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [email, setEmail] = useState(user.email);
  const [bankName, setBankName] = useState(user.bankInfo.bankName);
  const [accountNumber, setAccountNumber] = useState(
    user.bankInfo.accountNumber,
  );
  const [accountHolder, setAccountHolder] = useState(
    user.bankInfo.accountHolder,
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name,
      phone,
      email,
      bankInfo: {
        ...user.bankInfo,
        bankName,
        accountNumber,
        accountHolder: accountHolder.toUpperCase(),
      },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-background/80 backdrop-blur-xs transition-opacity">
      <div className="w-full max-w-[430px] rounded-t-3xl bg-card p-5 text-card-foreground shadow-2xl border-t border-border sm:mx-auto">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <h3 className="text-sm font-extrabold text-foreground">
            {PROFILE_TEXTS.drawerTitle}
          </h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-11 w-11 rounded-full text-muted-foreground hover:bg-muted"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5 text-xs">
          <div>
            <label className="mb-1 block font-bold text-foreground">
              {PROFILE_TEXTS.labelFullName}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="h-11 w-full rounded-xl border border-border bg-muted px-3 font-medium text-foreground outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="mb-1 block font-bold text-foreground">
                {PROFILE_TEXTS.labelPhone}
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="h-11 w-full rounded-xl border border-border bg-muted px-3 font-medium text-foreground outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="mb-1 block font-bold text-foreground">
                {PROFILE_TEXTS.labelEmail}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 w-full rounded-xl border border-border bg-muted px-3 font-medium text-foreground outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          <div className="my-2 border-t border-dashed border-border" />

          <h4 className="font-extrabold uppercase tracking-wider text-muted-foreground text-[10px]">
            {PROFILE_TEXTS.drawerSectionRefund}
          </h4>

          <div>
            <label className="mb-1 block font-bold text-foreground">
              {PROFILE_TEXTS.labelSelectBank}
            </label>
            <select
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              className="h-11 w-full rounded-xl border border-border bg-muted px-3 font-medium text-foreground outline-none focus:ring-2 focus:ring-ring"
            >
              {VIETNAM_BANKS.map((bank) => (
                <option key={bank.code} value={bank.name}>
                  {bank.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="mb-1 block font-bold text-foreground">
                {PROFILE_TEXTS.labelAccountNo}
              </label>
              <input
                type="text"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                required
                className="h-11 w-full rounded-xl border border-border bg-muted px-3 font-mono font-bold text-foreground outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="mb-1 block font-bold text-foreground">
                {PROFILE_TEXTS.labelAccountHolder}
              </label>
              <input
                type="text"
                value={accountHolder}
                onChange={(e) => setAccountHolder(e.target.value.toUpperCase())}
                required
                className="h-11 w-full rounded-xl border border-border bg-muted px-3 font-bold uppercase text-foreground outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          <div className="mt-5 flex items-center gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="h-11 flex-1 rounded-xl text-xs font-bold"
            >
              {PROFILE_TEXTS.btnCancel}
            </Button>
            <Button
              type="submit"
              className="h-11 flex-[1.5] rounded-xl bg-primary text-xs font-bold text-primary-foreground shadow-md hover:bg-primary/90"
            >
              <Check className="mr-1.5 h-4 w-4" />
              {PROFILE_TEXTS.btnSave}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
