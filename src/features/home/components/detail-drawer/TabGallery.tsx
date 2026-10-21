"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ImageOff } from "lucide-react";
import { Venue } from "../../types/home.types";

interface TabGalleryProps {
  venue: Venue;
}

export function TabGallery({ venue }: TabGalleryProps) {
  const images =
    venue.images && venue.images.length > 0
      ? venue.images
      : venue.imageUrl
        ? [venue.imageUrl]
        : [];

  if (images.length === 0) {
    return (
      <div className="flex h-32 flex-col items-center justify-center text-slate-400">
        <ImageOff className="h-6 w-6 stroke-[1.5]" />
        <span className="mt-1 text-xs">Chưa có hình ảnh.</span>
      </div>
    );
  }

  return (
    <div className="space-y-2 text-xs">
      <h4 className="font-bold text-slate-800 dark:text-slate-100 mb-2">
        Hình ảnh sân
      </h4>

      <div className="grid grid-cols-2 gap-2">
        {images.map((imgUrl, idx) => (
          <GalleryImage
            key={idx}
            src={imgUrl}
            alt={`${venue.name} ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function GalleryImage({ src, alt }: { src: string; alt: string }) {
  const [error, setError] = useState(false);

  return (
    <div className="relative h-28 w-full overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
      {!error ? (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-transform hover:scale-105"
          sizes="200px"
          onError={() => setError(true)}
        />
      ) : (
        <div className="flex h-full items-center justify-center text-slate-400">
          <ImageOff className="h-5 w-5" />
        </div>
      )}
    </div>
  );
}
