"use client";

import React from "react";
import { Clock, Eye } from "lucide-react";
import { NewsItem } from "../types/news.types";
import { SafeImage } from "@/components/common/safe-image";
import { NEWS_TEXTS } from "../constants/news.constants";

interface FeaturedNewsCardProps {
  news: NewsItem;
  onClick: () => void;
}

export function FeaturedNewsCard({ news, onClick }: FeaturedNewsCardProps) {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer overflow-hidden rounded-2xl bg-card border border-border shadow-xs transition-transform active:scale-[0.99] text-card-foreground"
    >
      <div className="relative h-44 w-full bg-muted">
        <SafeImage
          src={news.imageUrl}
          alt={news.title}
          fill
          priority
          sizes="(max-width: 640px) 100vw, 400px"
          className="object-cover transition-transform group-hover:scale-105 duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

        <div className="absolute top-3 left-3 z-10">
          <span className="rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur-md border border-white/20 shadow-md">
            {news.category}
          </span>
        </div>

        <div className="absolute bottom-3 left-3 right-3 space-y-1 text-white">
          <h3 className="line-clamp-2 text-sm font-extrabold leading-snug">
            {news.title}
          </h3>
          <div className="flex items-center gap-3 text-[10px] opacity-90">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" /> {news.publishedAt}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="h-3 w-3" /> {news.views} {NEWS_TEXTS.viewsLabel}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
