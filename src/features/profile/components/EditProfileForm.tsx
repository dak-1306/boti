"use client";

import React from "react";
import { User as UserIcon, Phone, CreditCard, Hash } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { UserProfile } from "../types/profile.types";
import { PROFILE_TEXTS } from "../constants/profile.constants";
import { profileSchema, ProfileFormData } from "../schemas/profile.schema";
import { BankSelector } from "./BankSelector";
import { cn } from "@/lib/utils";

interface EditProfileFormProps {
  user: UserProfile;
  onClose: () => void;
  onSave: (updatedUser: Partial<UserProfile>) => void;
}

export function EditProfileForm({
  user,
  onClose,
  onSave,
}: EditProfileFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name ?? "",
      phone: user?.phone ?? "",
      bankCode: user?.bankInfo?.bankCode ?? "MB",
      bankName: user?.bankInfo?.bankName ?? "MB Bank",
      accountNumber: user?.bankInfo?.accountNumber ?? "",
      accountHolder: user?.bankInfo?.accountHolder ?? "",
    },
  });

  const onValidSubmit = (data: ProfileFormData) => {
    onSave({
      name: data.name,
      phone: data.phone,
      bankInfo: {
        bankCode: data.bankCode,
        bankName: data.bankName,
        accountNumber: data.accountNumber,
        accountHolder: data.accountHolder,
      },
    });
    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit(onValidSubmit)}
      className="flex flex-col max-h-[85vh]"
    >
      <DrawerHeader className="border-b border-border pb-3 pt-4 px-4">
        <DrawerTitle className="text-center text-sm font-extrabold uppercase tracking-wider text-foreground">
          {PROFILE_TEXTS.drawerTitle}
        </DrawerTitle>
      </DrawerHeader>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs no-scrollbar">
        {/* Họ và tên */}
        <div className="space-y-1">
          <Label className="text-xs font-bold text-foreground flex items-center gap-1.5">
            <UserIcon className="h-3.5 w-3.5 text-primary" />
            {PROFILE_TEXTS.labelFullName}
          </Label>
          <Input
            type="text"
            {...register("name")}
            className={cn(
              "h-11 rounded-xl bg-muted/50 border-border text-xs font-semibold text-foreground focus-visible:ring-primary",
              errors.name &&
                "border-destructive focus-visible:ring-destructive",
            )}
          />
          {errors.name && (
            <p className="text-[11px] font-medium text-destructive mt-0.5">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Số điện thoại */}
        <div className="space-y-1">
          <Label className="text-xs font-bold text-foreground flex items-center gap-1.5">
            <Phone className="h-3.5 w-3.5 text-primary" />
            {PROFILE_TEXTS.labelPhone}
          </Label>
          <Input
            type="tel"
            {...register("phone")}
            className={cn(
              "h-11 rounded-xl bg-muted/50 border-border text-xs font-semibold text-foreground focus-visible:ring-primary",
              errors.phone &&
                "border-destructive focus-visible:ring-destructive",
            )}
          />
          {errors.phone && (
            <p className="text-[11px] font-medium text-destructive mt-0.5">
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Chọn ngân hàng */}
        <Controller
          name="bankCode"
          control={control}
          render={({ field }) => (
            <Controller
              name="bankName"
              control={control}
              render={({ field: bankNameField }) => (
                <BankSelector
                  selectedBankCode={field.value}
                  selectedBankName={bankNameField.value}
                  onSelectBank={(code, name) => {
                    field.onChange(code);
                    bankNameField.onChange(name);
                  }}
                />
              )}
            />
          )}
        />

        {/* Số tài khoản */}
        <div className="space-y-1">
          <Label className="text-xs font-bold text-foreground flex items-center gap-1.5">
            <Hash className="h-3.5 w-3.5 text-primary" />
            {PROFILE_TEXTS.labelAccountNo}
          </Label>
          <Input
            type="text"
            {...register("accountNumber")}
            className={cn(
              "h-11 rounded-xl bg-muted/50 border-border text-xs font-semibold text-foreground focus-visible:ring-primary font-mono",
              errors.accountNumber &&
                "border-destructive focus-visible:ring-destructive",
            )}
          />
          {errors.accountNumber && (
            <p className="text-[11px] font-medium text-destructive mt-0.5">
              {errors.accountNumber.message}
            </p>
          )}
        </div>

        {/* Tên chủ tài khoản */}
        <div className="space-y-1">
          <Label className="text-xs font-bold text-foreground flex items-center gap-1.5">
            <CreditCard className="h-3.5 w-3.5 text-primary" />
            {PROFILE_TEXTS.labelAccountHolder}
          </Label>
          <Input
            type="text"
            {...register("accountHolder")}
            className={cn(
              "h-11 rounded-xl bg-muted/50 border-border text-xs font-semibold text-foreground uppercase focus-visible:ring-primary",
              errors.accountHolder &&
                "border-destructive focus-visible:ring-destructive",
            )}
          />
          {errors.accountHolder && (
            <p className="text-[11px] font-medium text-destructive mt-0.5">
              {errors.accountHolder.message}
            </p>
          )}
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
