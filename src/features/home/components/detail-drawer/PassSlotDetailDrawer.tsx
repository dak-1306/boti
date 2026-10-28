"use client";

import React from "react";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SafeImage } from "@/components/common/safe-image";
import { PassSlotItem } from "../../types/home.types";
import { getCategoryMeta } from "@/constants/category.constants";
import {
  MapPin,
  Clock,
  Calendar,
  Tag,
  ShieldCheck,
  UserCheck,
  X,
} from "lucide-react";
import { PASS_SLOT_TEXTS } from "../../constants/pass-slot.constants";

interface PassSlotDetailDrawerProps {
  slot: PassSlotItem | null;
  isOpen: boolean;
  onClose: () => void;
  onBuy: (slot: PassSlotItem) => void;
}

function PassSlotDetailContent({
  slot,
  onClose,
  onBuy,
}: {
  slot: PassSlotItem;
  onClose: () => void;
  onBuy: (slot: PassSlotItem) => void;
}) {
  const categoryMeta = getCategoryMeta(slot.categorySlug || slot.category);

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="relative h-40 w-full shrink-0 bg-muted">
        <SafeImage
          src={slot.imageUrl || ""}
          alt={slot.venueName}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-black/30" />

        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 backdrop-blur-md text-foreground shadow-xs active:scale-90"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
          <div className="space-y-1">
            <Badge
              variant={categoryMeta.variant}
              size="sm"
              className="font-bold"
            >
              {categoryMeta.label}
            </Badge>
            <h2 className="text-base font-bold text-foreground line-clamp-1 drop-shadow-xs">
              {slot.venueName}
            </h2>
          </div>
          <Badge variant="passing">
            <Tag className="h-3 w-3" />
            {PASS_SLOT_TEXTS.discountTag(slot.discountPercent)}
          </Badge>
        </div>
      </div>

      <div
        className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar text-card-foreground"
        data-vaul-no-drag
      >
        <div className="rounded-2xl bg-muted/50 p-3.5 border border-border space-y-3">
          <div className="flex items-center justify-between border-b border-border/60 pb-2.5">
            <span className="text-xs font-bold text-primary">
              {slot.courtName}
            </span>
            <span className="text-[10px] font-medium text-muted-foreground bg-background px-2 py-0.5 rounded-full border border-border">
              {PASS_SLOT_TEXTS.bookingCodeLabel(slot.bookingCode)}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary shrink-0" />
              <div>
                <p className="text-[10px] text-muted-foreground">
                  {PASS_SLOT_TEXTS.dateLabel}
                </p>
                <p className="font-semibold text-foreground">{slot.dateText}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary shrink-0" />
              <div>
                <p className="text-[10px] text-muted-foreground">
                  {PASS_SLOT_TEXTS.timeLabel}
                </p>
                <p className="font-semibold text-foreground">{slot.timeText}</p>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2 text-xs pt-1">
            <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="text-[10px] text-muted-foreground">
                {PASS_SLOT_TEXTS.addressLabel}
              </p>
              <p className="font-medium text-foreground leading-snug">
                {slot.address}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-primary/5 p-3.5 border border-primary/20 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              {PASS_SLOT_TEXTS.originalPriceLabel}
            </span>
            <span className="text-xs font-semibold text-muted-foreground line-through">
              {slot.originalPrice.toLocaleString("vi-VN")}đ
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-foreground">
              {PASS_SLOT_TEXTS.saveAmountLabel}
            </span>
            <span className="text-xs font-bold text-emerald-600">
              -{(slot.originalPrice - slot.passPrice).toLocaleString("vi-VN")}đ
            </span>
          </div>
          <div className="flex items-center justify-between border-t border-primary/20 pt-2">
            <span className="text-xs font-bold text-foreground">
              {PASS_SLOT_TEXTS.resellPriceLabel}
            </span>
            <span className="text-base font-extrabold text-primary">
              {slot.passPrice.toLocaleString("vi-VN")}đ
            </span>
          </div>
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2 text-muted-foreground">
            <UserCheck className="h-4 w-4 text-primary shrink-0" />
            <span>
              {PASS_SLOT_TEXTS.sellerLabel}{" "}
              <strong className="text-foreground">{slot.sellerName}</strong>
            </span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
            <span>{PASS_SLOT_TEXTS.guaranteeNotice}</span>
          </div>
        </div>
      </div>

      <div className="shrink-0 border-t border-border p-3 pb-[calc(12px+env(safe-area-inset-bottom))] bg-card">
        <Button
          variant="cta"
          type="button"
          onClick={() => onBuy(slot)}
          className="h-11 w-full font-bold"
        >
          {PASS_SLOT_TEXTS.buyCtaBtn(slot.passPrice)}
        </Button>
      </div>
    </div>
  );
}

export function PassSlotDetailDrawer({
  slot,
  isOpen,
  onClose,
  onBuy,
}: PassSlotDetailDrawerProps) {
  return (
    <Drawer
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}
      snapPoints={["55vh", "85vh"]}
      defaultSnapPoint="55vh"
      showSwipeHandle
    >
      <DrawerContent className="rounded-t-[28px] bg-card p-0 text-card-foreground sm:mx-auto sm:max-w-[390px] outline-none border-t border-border">
        {slot && (
          <PassSlotDetailContent slot={slot} onClose={onClose} onBuy={onBuy} />
        )}
      </DrawerContent>
    </Drawer>
  );
}
