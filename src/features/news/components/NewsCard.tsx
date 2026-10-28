"use client";

import React from "react";
import { Clock, Eye } from "lucide-react";
import { NewsItem } from "../types/news.types";
import { SafeImage } from "@/components/common/safe-image";
import { Badge } from "@/components/ui/badge";
import { getCategoryMeta } from "@/constants/category.constants";

interface NewsCardProps {
  news: NewsItem;
  onClick: () => void;
}

export function NewsCard({ news, onClick }: NewsCardProps) {
  const categoryMeta = getCategoryMeta(news.category);

  return (
    <div
      onClick={onClick}
      className="flex cursor-pointer gap-3 rounded-2xl bg-card p-2.5 border border-border shadow-xs transition-transform active:scale-[0.98] text-card-foreground"
    >
      <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-xl bg-muted">
        <SafeImage
          src={news.imageUrl}
          alt={news.title}
          fill
          sizes="100px"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between min-w-0">
        <div className="space-y-1">
          <div className="flex items-center justify-between gap-1">
            <Badge variant={categoryMeta.variant} size="sm" className="font-bold">
              {categoryMeta.label}
            </Badge>
            <span className="text-[10px] text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" /> {news.readTime}
            </span>
          </div>

          <h4 className="line-clamp-2 text-xs font-bold text-foreground leading-snug">
            {news.title}
          </h4>
        </div>

        <div className="flex items-center justify-between text-[10px] text-muted-foreground mt-1">
          <span>{news.author}</span>
          <span className="flex items-center gap-1">
            <Eye className="h-3 w-3" /> {news.views}
          </span>
        </div>
      </div>
    </div>
  );
}