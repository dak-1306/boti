"use client";

import React, { useState } from "react";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SafeImage } from "@/components/common/safe-image";
import { PassSlotItem, Venue } from "../../types/home.types";
import { getCategoryMeta } from "@/constants/category.constants";
import { useHome } from "../../hooks/useHome";
import {
  MapPin,
  Clock,
  Calendar,
  Tag,
  ShieldCheck,
  UserCheck,
  X,
  Star,
} from "lucide-react";
import { PASS_SLOT_TEXTS } from "../../constants/pass-slot.constants";

// Tái sử dụng các Tab components sẵn có
import { TabInfo } from "./TabInfo";
import { TabGallery } from "./TabGallery";
import { TabRules } from "./TabRules";

interface PassSlotDetailDrawerProps {
  slot: PassSlotItem | null;
  isOpen: boolean;
  onClose: () => void;
  onBuy: (slot: PassSlotItem) => void;
}

type PassDetailTabType = "pass" | "info" | "gallery" | "rules";

function PassSlotDetailContent({
  slot,
  onClose,
  onBuy,
}: {
  slot: PassSlotItem;
  onClose: () => void;
  onBuy: (slot: PassSlotItem) => void;
}) {
  const [activeTab, setActiveTab] = useState<PassDetailTabType>("pass");
  const { venues } = useHome(); // Lấy danh sách Venue chuẩn từ system

  const categoryMeta = getCategoryMeta(slot.categorySlug || slot.category);
  const ratingValue = (slot as unknown as { rating?: number }).rating ?? 5.0;

  // 1. Tìm Venue gốc đầy đủ dữ liệu từ hệ thống qua venueId
  const matchedVenue = venues.find(
    (v) => String(v.id) === String(slot.venueId),
  );

  // 2. Nếu không tìm thấy, tạo Fallback Venue đáp ứng 100% Interface Venue (Fix lỗi TypeScript)
  const adaptedVenue: Venue = matchedVenue || {
    id: slot.venueId,
    name: slot.venueName,
    category: slot.category,
    categorySlug: slot.categorySlug,
    address: slot.address,
    imageUrl: slot.imageUrl,
    images: [slot.imageUrl || ""],
    rating: ratingValue,
    reviewCount: 124, // Fix TS: reviewCount
    location: { lat: 10.776889, lng: 106.700806 }, // Fix TS: location
    openTime: "06:00 - 23:00",
    description: `Cụm sân ${slot.venueName} đạt chuẩn chất lượng cao, trang bị hệ thống ánh sáng chống chói, mặt thảm thi đấu êm ái cùng đầy đủ dịch vụ tiện ích đi kèm.`,
  };

  const tabs: { id: PassDetailTabType; label: string }[] = [
    { id: "pass", label: "Chi tiết Pass" },
    { id: "info", label: "Thông tin sân" },
    { id: "gallery", label: "Hình ảnh" },
    { id: "rules", label: "Quy định sân" },
  ];

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Header Banner Ảnh & Badges */}
      <div className="relative h-44 w-full shrink-0 bg-muted">
        <SafeImage
          src={slot.imageUrl || ""}
          alt={slot.venueName}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-black/20 to-black/60 pointer-events-none" />

        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background/90 backdrop-blur-md text-foreground shadow-sm active:scale-90"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between gap-2">
          <div className="space-y-1.5 min-w-0">
            <div className="flex items-center gap-2">
              <Badge
                variant={categoryMeta.variant}
                size="sm"
                className="font-bold bg-background/90 backdrop-blur-md text-foreground border border-border/80 shadow-xs"
              >
                {categoryMeta.label}
              </Badge>
              <div className="flex items-center gap-1 rounded-full bg-background/90 backdrop-blur-md px-2 py-0.5 text-amber-500 shadow-xs border border-border/80">
                <Star className="h-3 w-3 fill-amber-500" />
                <span className="text-[11px] font-bold text-foreground">
                  {adaptedVenue.rating}
                </span>
              </div>
            </div>

            <h2 className="text-base font-bold text-primary line-clamp-1 drop-shadow-md">
              {slot.venueName}
            </h2>
          </div>

          <Badge
            variant="passing"
            className="shrink-0 font-bold bg-primary text-primary-foreground border-none shadow-md px-2.5 py-1"
          >
            <Tag className="h-3 w-3 mr-1" />
            {PASS_SLOT_TEXTS.discountTag(slot.discountPercent)}
          </Badge>
        </div>
      </div>

      {/* Thanh chuyển Nav Tabs */}
      <div className="shrink-0 border-b border-border px-4 bg-card">
        <div className="no-scrollbar flex gap-4 overflow-x-auto text-xs font-semibold">
          {tabs.map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`h-11 shrink-0 flex items-center transition-colors relative ${
                  isSelected
                    ? "text-primary font-bold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
                {isSelected && (
                  <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-primary" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Nội dung Chi tiết Tab */}
      <div
        className="flex-1 overflow-y-auto p-4 no-scrollbar text-card-foreground"
        data-vaul-no-drag
      >
        {/* TAB 1: CHI TIẾT PASS */}
        {activeTab === "pass" && (
          <div className="space-y-4">
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
                    <p className="font-semibold text-foreground">
                      {slot.dateText}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary shrink-0" />
                  <div>
                    <p className="text-[10px] text-muted-foreground">
                      {PASS_SLOT_TEXTS.timeLabel}
                    </p>
                    <p className="font-semibold text-foreground">
                      {slot.timeText}
                    </p>
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
                  -
                  {(slot.originalPrice - slot.passPrice).toLocaleString(
                    "vi-VN",
                  )}
                  đ
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
        )}

        {/* TÁI SỬ DỤNG TRỰC TIẾP SUB-COMPONENTS DÙNG DATA SÂN GỐC */}
        {activeTab === "info" && <TabInfo venue={adaptedVenue} />}
        {activeTab === "gallery" && <TabGallery venue={adaptedVenue} />}
        {activeTab === "rules" && <TabRules venue={adaptedVenue} />}
      </div>

      {/* Nút Đặt Sân CTA */}
      <div className="shrink-0 border-t border-border p-3 pb-[calc(12px+env(safe-area-inset-bottom))] bg-card">
        <Button
          variant="cta"
          type="button"
          onClick={() => onBuy(slot)}
          className="h-11 w-full font-bold text-xs"
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
      snapPoints={["60vh", "88vh"]}
      defaultSnapPoint="60vh"
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
