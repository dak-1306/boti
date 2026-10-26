"use client";

import React, { useState } from "react";
import Image, { ImageProps } from "next/image";
import { ImageOff, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { COMMON_TEXTS } from "@/constants/common.constants";

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

  if (!src || hasError) {
    return (
      <div
        className={cn(
          "flex h-full w-full items-center justify-center bg-muted text-muted-foreground",
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
      alt={alt || COMMON_TEXTS.imageFallbackAlt}
      className={className}
      onError={() => setHasError(true)}
      {...props}
    />
  );
}
