"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { COMMON_TEXTS } from "@/constants/common.constants";

interface PageHeaderProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightAction?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  variant?: "gradient" | "solid" | "transparent";
}

export function PageHeader({
  title,
  showBack = false,
  onBack,
  rightAction,
  children,
  className,
  variant = "gradient",
}: PageHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  const variantStyles = {
    gradient:
      "bg-gradient-to-r from-primary via-primary/95 to-primary/85 text-primary-foreground border-none outline-none",
    solid: "bg-card text-card-foreground border-b border-border",
    transparent: "bg-transparent text-foreground border-none",
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-20 w-full shrink-0 pt-[env(safe-area-inset-top)] transition-all",
        variantStyles[variant],
        className,
      )}
    >
      {(title || showBack || rightAction) && (
        <div className="flex h-14 items-center justify-between px-4 sm:mx-auto sm:max-w-[390px]">
          {showBack ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBack}
              className="h-11 w-11 rounded-full bg-primary-foreground/15 text-primary-foreground hover:bg-primary-foreground/25 active:scale-95"
              aria-label={COMMON_TEXTS.backButtonLabel}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          ) : (
            <div className="h-11 w-11" />
          )}

          {title && (
            <h1 className="text-xl font-bold tracking-tight text-center truncate px-2">
              {title}
            </h1>
          )}

          <div className="flex h-11 w-11 items-center justify-end">
            {rightAction || <div className="h-11 w-11" />}
          </div>
        </div>
      )}

      {children && (
        <div className="px-4 pb-3.5 sm:mx-auto sm:max-w-[390px]">
          {children}
        </div>
      )}
    </header>
  );
}
