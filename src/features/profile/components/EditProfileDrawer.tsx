"use client";

import React, { useState } from "react";
import { User as UserIcon, Phone, CreditCard, Hash } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { UserProfile } from "../types/profile.types";
import { PROFILE_TEXTS } from "../constants/profile.constants";
import { BankSelector } from "./BankSelector";

interface EditProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onSave: (updatedUser: Partial<UserProfile>) => void;
}

function EditProfileForm({
  user,
  onClose,
  onSave,
}: Omit<EditProfileDrawerProps, "isOpen">) {
  const [formData, setFormData] = useState({
    name: user?.name ?? "",
    phone: user?.phone ?? "",
    bankCode: user?.bankInfo?.bankCode ?? "MB",
    bankName: user?.bankInfo?.bankName ?? "MB Bank",
    accountNumber: user?.bankInfo?.accountNumber ?? "",
    accountHolder: user?.bankInfo?.accountHolder ?? "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name: formData.name,
      phone: formData.phone,
      bankInfo: {
        bankCode: formData.bankCode,
        bankName: formData.bankName,
        accountNumber: formData.accountNumber,
        accountHolder: formData.accountHolder,
      },
    });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col max-h-[85vh]">
      <DrawerHeader className="border-b border-border pb-3 pt-4 px-4">
        <DrawerTitle className="text-center text-sm font-extrabold uppercase tracking-wider text-foreground">
          {PROFILE_TEXTS.drawerTitle}
        </DrawerTitle>
      </DrawerHeader>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs no-scrollbar">
        <div className="space-y-1.5">
          <Label className="text-xs font-bold text-foreground flex items-center gap-1.5">
            <UserIcon className="h-3.5 w-3.5 text-primary" />
            {PROFILE_TEXTS.labelFullName}
          </Label>
          <Input
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            className="h-11 rounded-xl bg-muted/50 border-border text-xs font-semibold text-foreground focus-visible:ring-primary"
            required
          />
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs font-bold text-foreground flex items-center gap-1.5">
            <Phone className="h-3.5 w-3.5 text-primary" />
            {PROFILE_TEXTS.labelPhone}
          </Label>
          <Input
            type="tel"
            value={formData.phone}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, phone: e.target.value }))
            }
            className="h-11 rounded-xl bg-muted/50 border-border text-xs font-semibold text-foreground focus-visible:ring-primary"
            required
          />
        </div>

        <BankSelector
          selectedBankCode={formData.bankCode}
          selectedBankName={formData.bankName}
          onSelectBank={(bankCode, bankName) =>
            setFormData((prev) => ({ ...prev, bankCode, bankName }))
          }
        />

        <div className="space-y-1.5">
          <Label className="text-xs font-bold text-foreground flex items-center gap-1.5">
            <Hash className="h-3.5 w-3.5 text-primary" />
            {PROFILE_TEXTS.labelAccountNo}
          </Label>
          <Input
            type="text"
            value={formData.accountNumber}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                accountNumber: e.target.value,
              }))
            }
            className="h-11 rounded-xl bg-muted/50 border-border text-xs font-semibold text-foreground focus-visible:ring-primary font-mono"
            required
          />
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs font-bold text-foreground flex items-center gap-1.5">
            <CreditCard className="h-3.5 w-3.5 text-primary" />
            {PROFILE_TEXTS.labelAccountHolder}
          </Label>
          <Input
            type="text"
            value={formData.accountHolder}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                accountHolder: e.target.value.toUpperCase(),
              }))
            }
            className="h-11 rounded-xl bg-muted/50 border-border text-xs font-semibold text-foreground uppercase focus-visible:ring-primary"
            required
          />
        </div>
      </div>

      <DrawerFooter className="flex flex-row gap-3 border-t border-border p-4">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          className="h-11 flex-1 rounded-xl border-border bg-card text-xs font-semibold text-foreground hover:bg-muted"
        >
          {PROFILE_TEXTS.btnCancel}
        </Button>
        <Button
          type="submit"
          className="h-11 flex-1 rounded-xl bg-primary text-xs font-semibold text-primary-foreground hover:bg-primary/90 shadow-md"
        >
          {PROFILE_TEXTS.btnSave}
        </Button>
      </DrawerFooter>
    </form>
  );
}

export function EditProfileDrawer({
  isOpen,
  onClose,
  user,
  onSave,
}: EditProfileDrawerProps) {
  return (
    <Drawer
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}
      showSwipeHandle
    >
      <DrawerContent className="sm:mx-auto sm:max-w-[390px] w-full rounded-t-[28px] border-none bg-card p-0 pt-4 shadow-2xl text-card-foreground">
        {isOpen && user && (
          <EditProfileForm
            key={`${user?.phone ?? ""}-${user?.bankInfo?.accountNumber ?? ""}`}
            user={user}
            onClose={onClose}
            onSave={onSave}
          />
        )}
      </DrawerContent>
    </Drawer>
  );
}
