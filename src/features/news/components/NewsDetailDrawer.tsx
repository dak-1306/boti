"use client";

import React from "react";
import { Eye, Share2, Calendar, User, X } from "lucide-react";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { SafeImage } from "@/components/common/safe-image";
import { NewsItem } from "../types/news.types";
import { NEWS_TEXTS } from "../constants/news.constants";

interface NewsDetailDrawerProps {
  news: NewsItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function NewsDetailDrawer({
  news,
  isOpen,
  onClose,
}: NewsDetailDrawerProps) {
  if (!news) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: news.title,
          text: news.summary,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert(NEWS_TEXTS.shareSuccess);
    }
  };

  return (
    <Drawer
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}
      snapPoints={["75vh", "92vh"]}
      defaultSnapPoint="75vh"
      showSwipeHandle
    >
      <DrawerContent className="rounded-t-[28px] bg-card p-0 text-card-foreground sm:mx-auto sm:max-w-[390px] outline-none border-t border-border">
        <div className="flex h-full flex-col overflow-hidden">
          {/* Ảnh Cover + Badge Thể loại + Nút Đóng 'X' Nổi */}
          <div className="relative h-48 w-full shrink-0 bg-muted">
            <SafeImage
              src={news.imageUrl}
              alt={news.title}
              fill
              priority
              sizes="(max-width: 640px) 100vw, 390px"
              className="object-cover"
            />

            {/* Badge Thể Loại */}
            <div className="absolute top-3 left-3 z-10">
              <span className="rounded-full bg-black/60 px-3 py-1 text-[10px] font-bold text-white backdrop-blur-md border border-white/20 shadow-md">
                {news.category}
              </span>
            </div>

            {/* Nút Đóng 'X' Nổi Phía Trên Bên Phải (Gọn & Tinh Tế Chuẩn Mobile) */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="absolute top-3 right-3 z-20 h-8 w-8 rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-black/70 active:scale-90 border border-white/20 shadow-md transition"
              aria-label="Đóng chi tiết tin tức"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Chi tiết nội dung bài viết */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
            <div>
              <h2 className="text-base font-extrabold leading-snug text-foreground">
                {news.title}
              </h2>
              <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground border-b border-border pb-3">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 font-medium">
                    <User className="h-3.5 w-3.5 text-primary" /> {news.author}
                  </span>
                  <span className="flex items-center gap-1 font-medium">
                    <Calendar className="h-3.5 w-3.5 text-primary" />{" "}
                    {news.publishedAt}
                  </span>
                </div>
                <span className="flex items-center gap-1 font-medium">
                  <Eye className="h-3.5 w-3.5" /> {news.views}
                </span>
              </div>
            </div>

            {/* Đoạn Tóm Tắt Tải Trọng Nổi Bật */}
            <p className="text-xs font-semibold leading-relaxed text-foreground bg-muted/60 p-3.5 rounded-2xl border border-border">
              {news.summary}
            </p>

            {/* Nội dung chi tiết */}
            <div className="space-y-3 text-xs leading-relaxed text-muted-foreground">
              {news.content.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Thanh Action Đáy - Tự động thích ứng Notch / Gestures di động */}
          <div className="shrink-0 border-t border-border p-3 pb-[calc(12px+env(safe-area-inset-bottom))] bg-card">
            <Button
              type="button"
              onClick={handleShare}
              className="h-11 w-full rounded-full bg-primary text-xs font-bold text-primary-foreground shadow-md hover:bg-primary/90 active:scale-98 transition"
            >
              <Share2 className="mr-2 h-4 w-4" />
              {NEWS_TEXTS.shareBtn}
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
