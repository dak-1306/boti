"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { COMMON_TEXTS } from "@/constants/common.constants";

interface PageHeaderProps {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightAction?: React.ReactNode;
  bannerImg?: StaticImageData | string;
  variant?: "gradient" | "solid" | "transparent" | "banner";
  disableRounded?: boolean;
  className?: string;
  headerClassName?: string;
  bottomExtension?: React.ReactNode;
  extensionClassName?: string;
  children?: React.ReactNode;
}

export function PageHeader({
  title,
  subtitle,
  showBack = false,
  onBack,
  rightAction,
  bannerImg,
  variant = "gradient",
  disableRounded = false,
  className,
  headerClassName,
  bottomExtension,
  extensionClassName = "-mt-5.5",
  children,
}: PageHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) onBack();
    else router.back();
  };

  const variantStyles = {
    gradient:
      "bg-gradient-to-r from-primary via-primary/95 to-primary/85 text-primary-foreground border-none",
    solid:
      "bg-card/95 backdrop-blur-md text-card-foreground border-b border-border shadow-xs",
    transparent: "bg-transparent text-foreground border-none",
    banner:
      "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground",
  };

  return (
    <div className={cn("w-full shrink-0", className)}>
      {/* KHỐI HEADER BACKGROUND: Cân bằng khoảng thở trên/dưới */}
      <header
        className={cn(
          "relative w-full transition-all z-10 overflow-hidden",
          !disableRounded && "rounded-b-[24px]",
          "pt-[calc(env(safe-area-inset-top)+24px)]",
          bottomExtension ? "pb-8" : "pb-4",
          variantStyles[variant],
          headerClassName,
        )}
      >
        {/* Banner Ảnh Nền */}
        {variant === "banner" && bannerImg && (
          <div className="absolute inset-0 z-0">
            <Image
              src={bannerImg}
              alt="Header Banner"
              fill
              priority
              sizes="100vw"
              className="object-cover object-right"
            />
            <div className="absolute inset-0 bg-black/15" />
          </div>
        )}

        {/* Nội dung thanh tiêu đề */}
        <div className="relative z-10 px-4 sm:mx-auto sm:max-w-[390px]">
          {title || showBack || rightAction ? (
            <div className="grid min-h-[40px] grid-cols-[40px_1fr_40px] items-center gap-2">
              <div className="flex items-center">
                {showBack ? (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleBack}
                    className={cn(
                      "h-10 w-10 rounded-full transition active:scale-95",
                      variant === "gradient" || variant === "banner"
                        ? "bg-primary-foreground/15 text-primary-foreground hover:bg-primary-foreground/25"
                        : "bg-muted text-foreground hover:bg-muted/80",
                    )}
                    aria-label={COMMON_TEXTS.backButtonLabel}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                ) : (
                  <div className="h-10 w-10" />
                )}
              </div>

              <div className="flex flex-col items-center justify-center text-center overflow-hidden">
                {title && (
                  <h1 className="w-full truncate text-base font-bold tracking-tight">
                    {title}
                  </h1>
                )}
                {subtitle && (
                  <p className="w-full truncate text-[11px] font-medium opacity-85 mt-0.5">
                    {subtitle}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-end">
                {rightAction || <div className="h-10 w-10" />}
              </div>
            </div>
          ) : (
            /* Chiều cao tự nhiên cho Banner không có tiêu đề (Trang chủ) */
            <div className="h-8" />
          )}
        </div>
      </header>

      {/* TẬP TRUNG ĐÈ NỔI (Search / Tabs / Profile Card) */}
      {bottomExtension && (
        <div
          className={cn(
            "relative z-20 px-4 sm:mx-auto sm:max-w-[390px]",
            extensionClassName,
          )}
        >
          {bottomExtension}
        </div>
      )}

      {/* NỘI DUNG PHÍA DƯỚI */}
      {children && (
        <div className="relative z-10 px-4 sm:mx-auto sm:max-w-[390px]">
          {children}
        </div>
      )}
    </div>
  );
}
