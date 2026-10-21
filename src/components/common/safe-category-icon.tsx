"use client";

import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

interface SafeCategoryIconProps {
  icon?: StaticImageData | string | null;
  alt?: string;
  size?: number;
  className?: string;
}

export function SafeCategoryIcon({
  icon,
  alt = "Category Icon",
  size = 16,
  className,
}: SafeCategoryIconProps) {
  const [hasError, setHasError] = useState(false);

  // Fallback icon khi không có file hoặc tải file thất bại
  if (!icon || hasError) {
    return (
      <Trophy
        style={{ width: size, height: size }}
        className={cn("shrink-0 text-amber-500/80", className)}
      />
    );
  }

  return (
    <Image
      src={icon}
      alt={alt}
      width={size}
      height={size}
      onError={() => setHasError(true)}
      className={cn("shrink-0 object-contain", className)}
    />
  );
}
