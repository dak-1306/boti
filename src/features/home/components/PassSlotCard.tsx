"use client";

import React from "react";
import { MapPin, Clock, Calendar, Tag, Star } from "lucide-react";
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
  const ratingValue = (slot as unknown as { rating?: number }).rating ?? 5.0;

  return (
    <div
      onClick={onClick}
      className="group relative flex w-full cursor-pointer overflow-hidden rounded-2xl border border-border bg-card shadow-xs transition-all hover:border-primary/40 active:scale-[0.98] text-card-foreground"
    >
      {/* Khối Ảnh bên trái - Tràn viền vừa khớp 100% chiều cao khung chứa */}
      <div className="relative w-32 shrink-0 bg-muted self-stretch">
        <SafeImage
          src={slot.imageUrl || ""}
          alt={slot.venueName}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="128px"
        />

        {/* Lớp phủ gradient ở góc trên ảnh */}
        <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />

        {/* Badge Giảm Giá nổi tương phản cao */}
        <Badge
          variant="passing"
          className="absolute top-2 left-2 z-10 font-bold bg-background/95 text-primary border border-border/80 backdrop-blur-md shadow-xs"
        >
          <Tag className="h-2.5 w-2.5 mr-0.5" />
          {PASS_SLOT_TEXTS.discountTag(slot.discountPercent)}
        </Badge>
      </div>

      {/* Khối Thông Tin bên phải - Padding 2.5 đồng bộ với VenueCard */}
      <div className="flex flex-1 flex-col justify-between p-2.5 min-w-0">
        <div className="space-y-1">
          {/* Tiêu đề sân */}
          <h3 className="line-clamp-1 text-xs font-bold text-foreground">
            {slot.venueName}
          </h3>

          {/* Badge Bộ môn + Rating */}
          <div className="flex items-center justify-between gap-1">
            <Badge
              variant={categoryMeta.variant}
              size="sm"
              className="font-bold"
            >
              {categoryMeta.label}
            </Badge>
            <div className="flex items-center gap-0.5 shrink-0 text-amber-500">
              <Star className="h-3 w-3 fill-amber-500" />
              <span className="text-[11px] font-bold">{ratingValue}</span>
            </div>
          </div>

          {/* Dòng 1: Ngày chơi */}
          <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground pt-0.5">
            <Calendar className="h-3 w-3 text-primary shrink-0" />
            <span className="truncate">{slot.dateText}</span>
          </div>

          {/* Dòng 2: Khung giờ chơi */}
          <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
            <Clock className="h-3 w-3 text-primary shrink-0" />
            <span className="font-medium text-foreground truncate">
              {slot.timeText}
            </span>
          </div>

          {/* Dòng 3: Địa chỉ hiển thị tối đa 2 dòng */}
          <div className="flex items-start gap-1 text-muted-foreground">
            <MapPin className="h-3 w-3 shrink-0 text-primary mt-0.5" />
            <p className="line-clamp-2 text-[10px] leading-snug">
              {slot.address}
            </p>
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
