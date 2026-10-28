"use client";

import React from "react";
import { MapPin, Clock, Calendar, Tag } from "lucide-react";
import { PassSlotItem } from "../types/home.types";
import { getCategoryMeta } from "@/constants/category.constants";
import { SafeImage } from "@/components/common/safe-image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PASS_SLOT_TEXTS } from "../constants/pass-slot.constants";

interface PassSlotCardProps {
  slot: PassSlotItem;
  onClick: () => void;
  onBuy?: (slot: PassSlotItem) => void;
}

export function PassSlotCard({ slot, onClick, onBuy }: PassSlotCardProps) {
  const categoryMeta = getCategoryMeta(slot.categorySlug || slot.category);

  return (
    <div
      onClick={onClick}
      className="group relative flex w-full cursor-pointer overflow-hidden rounded-2xl border border-border bg-card p-2.5 shadow-xs transition-all hover:border-primary/40 active:scale-[0.98] text-card-foreground gap-3"
    >
      {/* Khối Ảnh bên trái */}
      <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-muted flex items-center justify-center">
        <SafeImage
          src={slot.imageUrl || ""}
          alt={slot.venueName}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="112px"
        />
        <Badge variant="passing" className="absolute top-1.5 left-1.5 z-10">
          <Tag className="h-2.5 w-2.5" />
          {PASS_SLOT_TEXTS.discountTag(slot.discountPercent)}
        </Badge>
      </div>

      {/* Khối Thông Tin bên phải */}
      <div className="flex flex-1 flex-col justify-between min-w-0">
        <div className="space-y-1">
          <div className="flex items-center justify-between gap-1">
            <Badge variant={categoryMeta.variant} size="sm" className="font-bold">
              {categoryMeta.label}
            </Badge>
            <Badge variant="passing" size="sm">
              {PASS_SLOT_TEXTS.quickPassBadge}
            </Badge>
          </div>

          <h3 className="line-clamp-1 text-xs font-bold text-foreground">
            {slot.venueName}
          </h3>

          <p className="line-clamp-1 text-[11px] font-semibold text-primary">
            {slot.courtName}
          </p>

          <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
            <span className="flex items-center gap-0.5 shrink-0">
              <Calendar className="h-3 w-3 text-primary" />
              {slot.dateText}
            </span>
            <span className="flex items-center gap-0.5 shrink-0 font-medium text-foreground">
              <Clock className="h-3 w-3 text-primary" />
              {slot.timeText}
            </span>
          </div>

          <div className="flex items-center gap-1 text-muted-foreground">
            <MapPin className="h-3 w-3 shrink-0 text-primary" />
            <p className="line-clamp-1 text-[10px]">{slot.address}</p>
          </div>
        </div>

        {/* Thanh Giá & Nút Xem */}
        <div className="mt-2 flex items-center justify-between gap-2 border-t border-border/60 pt-2">
          <div className="flex items-baseline gap-1.5">
            <span className="text-xs font-bold text-primary">
              {slot.passPrice.toLocaleString("vi-VN")}đ
            </span>
            {slot.originalPrice > slot.passPrice && (
              <span className="text-[10px] text-muted-foreground line-through">
                {slot.originalPrice.toLocaleString("vi-VN")}đ
              </span>
            )}
          </div>

          <Button
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              if (onBuy) {
                onBuy(slot);
              } else {
                onClick();
              }
            }}
            className="h-7 rounded-lg bg-primary px-3 text-[10px] font-bold text-primary-foreground transition hover:bg-primary/90 active:scale-95 shadow-xs"
          >
            {PASS_SLOT_TEXTS.viewNowBtn}
          </Button>
        </div>
      </div>
    </div>
  );
}