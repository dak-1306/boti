"use client";

import React, { useState } from "react";
import Image, { ImageProps } from "next/image";
import { ImageOff, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SafeImageProps extends Omit<ImageProps, "onError"> {
  fallbackIcon?: LucideIcon;
  fallbackClassName?: string;
  containerClassName?: string;
}

export function SafeImage({
  src,
  alt,
  fallbackIcon: FallbackIcon = ImageOff,
  fallbackClassName,
  containerClassName,
  className,
  ...props
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  // Nếu không có src hoặc bị lỗi tải ảnh
  if (!src || hasError) {
    return (
      <div
        className={cn(
          "flex h-full w-full items-center justify-center bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500",
          containerClassName,
        )}
      >
        <FallbackIcon className={cn("h-5 w-5", fallbackClassName)} />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt || "Image"}
      className={className}
      onError={() => setHasError(true)}
      {...props}
    />
  );
}
