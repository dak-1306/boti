"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TicketPercent, ArrowRight, Sparkles } from "lucide-react";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PASS_ANNOUNCEMENT_TEXTS } from "../constants/pass-announcement.constants";

export function PassFeatureAnnouncementDrawer() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Chỉ hiển thị 1 lần duy nhất cho người dùng mới
    const hasSeen = localStorage.getItem(PASS_ANNOUNCEMENT_TEXTS.storageKey);
    if (!hasSeen) {
      const timer = setTimeout(() => setIsOpen(true), 600);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem(PASS_ANNOUNCEMENT_TEXTS.storageKey, "true");
    setIsOpen(false);
  };

  const handleNavigateToPass = () => {
    handleClose();
    router.push("/pass");
  };

  return (
    <Drawer
      open={isOpen}
      onOpenChange={(open) => !open && handleClose()}
      showSwipeHandle
    >
      <DrawerContent className="rounded-t-[28px] bg-card p-0 text-card-foreground sm:mx-auto sm:max-w-[390px] outline-none border-t border-border">
        <div className="p-5 pb-[calc(16px+env(safe-area-inset-bottom))] space-y-4 text-center">
          {/* Badge & Icon nổi bật nhẹ nhàng */}
          <div className="flex flex-col items-center gap-2 pt-1">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-xs">
              <TicketPercent className="h-6 w-6" />
            </div>

            <Badge
              variant="outline"
              className="border-primary/30 bg-primary/5 text-primary text-[10px] font-bold px-2 py-0.5"
            >
              <Sparkles className="mr-1 h-3 w-3" />
              {PASS_ANNOUNCEMENT_TEXTS.badge}
            </Badge>
          </div>

          {/* Tiêu đề & Nội dung lời nhắc */}
          <div className="space-y-1.5 px-2">
            <h3 className="text-base font-bold text-foreground leading-snug">
              {PASS_ANNOUNCEMENT_TEXTS.title}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {PASS_ANNOUNCEMENT_TEXTS.description}
            </p>
          </div>

          {/* Cụm Nút Thao Tác */}
          <div className="pt-2 space-y-2">
            <Button
              variant="cta"
              onClick={handleNavigateToPass}
              className="w-full h-11 rounded-xl text-xs font-bold shadow-md"
            >
              {PASS_ANNOUNCEMENT_TEXTS.ctaBtn}
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>

            <button
              type="button"
              onClick={handleClose}
              className="w-full py-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition"
            >
              {PASS_ANNOUNCEMENT_TEXTS.dismissBtn}
            </button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
