"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Tag, Info, ArrowRight } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { BookingItem, PassCourtPayload } from "../../types/bookings.types";
import { BankInfo } from "@/features/profile/types/profile.types";
import {
  PASS_COURT_TEXTS,
  PASS_FORM_VALIDATION,
} from "../../constants/pass.constants";
import { PassCourtDiscountForm } from "./PassCourtDiscountForm";
import { PassBankFields } from "./PassBankFields";

const passCourtSchema = z.object({
  discountPercent: z.number().min(0).max(100),
  bankName: z.string().min(2, PASS_FORM_VALIDATION.bankNameMin),
  bankCode: z.string().min(1, PASS_FORM_VALIDATION.bankCodeMin),
  accountNumber: z.string().min(6, PASS_FORM_VALIDATION.accountNumberMin),
  accountHolder: z.string().min(2, PASS_FORM_VALIDATION.accountHolderMin),
});

export type PassCourtFormValues = z.infer<typeof passCourtSchema>;

interface PassCourtDrawerProps {
  booking: BookingItem | null;
  isOpen: boolean;
  onClose: () => void;
  userBankInfo?: BankInfo;
  onConfirmPass: (payload: PassCourtPayload) => void;
}

export function PassCourtDrawer({
  booking,
  isOpen,
  onClose,
  userBankInfo,
  onConfirmPass,
}: PassCourtDrawerProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm<PassCourtFormValues>({
    resolver: zodResolver(passCourtSchema),
    defaultValues: {
      discountPercent: 20,
      bankName: userBankInfo?.bankName || "",
      bankCode: userBankInfo?.bankCode || "MB",
      accountNumber: userBankInfo?.accountNumber || "",
      accountHolder: userBankInfo?.accountHolder || "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (userBankInfo) {
      reset({
        discountPercent: watch("discountPercent") ?? 20,
        bankName: userBankInfo.bankName || "",
        bankCode: userBankInfo.bankCode || "MB",
        accountNumber: userBankInfo.accountNumber || "",
        accountHolder: userBankInfo.accountHolder || "",
      });
    }
  }, [userBankInfo, reset, watch]);

  const discountPercent = watch("discountPercent") ?? 20;
  const originalPrice = booking?.payment?.totalFee || 200000;
  const passPrice = Math.round((originalPrice * (100 - discountPercent)) / 100);

  const onSubmit = (data: PassCourtFormValues) => {
    onConfirmPass({
      passPrice,
      discountPercent: data.discountPercent,
      bankInfo: {
        bankName: data.bankName,
        bankCode: data.bankCode,
        accountNumber: data.accountNumber,
        accountHolder: data.accountHolder.toUpperCase(),
      },
    });
  };

  if (!booking) return null;

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="max-h-[90vh] rounded-t-[28px]">
        <DrawerHeader className="text-left border-b border-border pb-3">
          <DrawerTitle className="text-base font-bold flex items-center gap-2 text-foreground">
            <Tag className="h-5 w-5 text-primary" />
            {PASS_COURT_TEXTS.drawerTitle}
          </DrawerTitle>
        </DrawerHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col flex-1 overflow-hidden"
        >
          <div className="overflow-y-auto p-4 space-y-4 no-scrollbar text-xs flex-1">
            <div className="rounded-2xl bg-muted/60 p-3 space-y-1.5 border border-border">
              <p className="font-bold text-foreground text-sm">
                {booking.venueName}
              </p>
              <p className="text-muted-foreground">
                {booking.courtName || "Sân tiêu chuẩn"} • {booking.dateText}
              </p>
              <p className="text-muted-foreground">
                Khung giờ:{" "}
                <span className="font-semibold text-foreground">
                  {booking.timeText}
                </span>
              </p>
            </div>

            <PassCourtDiscountForm
              discountPercent={discountPercent}
              originalPrice={originalPrice}
              passPrice={passPrice}
              onSelectDiscount={(opt) =>
                setValue("discountPercent", opt, { shouldValidate: true })
              }
            />

            <PassBankFields register={register} errors={errors} />

            <div className="flex items-start gap-2 p-2.5 rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-400 text-[11px]">
              <Info className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{PASS_COURT_TEXTS.termsNotice}</span>
            </div>
          </div>

          <div className="p-4 border-t border-border bg-card">
            <Button
              type="submit"
              disabled={!isValid}
              variant="cta"
              className="w-full h-11 text-xs font-bold"
            >
              {PASS_COURT_TEXTS.submitBtn(passPrice)}
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>
          </div>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
