"use client";

import React from "react";
import { Search } from "lucide-react";
import { NEWS_TEXTS } from "../constants/news.constants";
import { PageHeader } from "@/components/common/page-header";

interface NewsHeaderProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
}

export function NewsHeader({ searchQuery, onSearchChange }: NewsHeaderProps) {
  return (
    <div className="w-full shrink-0">
      <PageHeader title={NEWS_TEXTS.pageTitle} variant="gradient" />

      <div className="relative bg-gradient-to-r from-primary via-primary/95 to-primary/85 pb-9">
        <div className="h-2 w-full" />
      </div>

      <div className="relative z-10 -mt-5 px-4">
        <div className="flex h-11 items-center rounded-full bg-card px-3.5 shadow-md border border-border">
          <Search className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={NEWS_TEXTS.searchPlaceholder}
            className="w-full bg-transparent text-xs text-foreground placeholder-muted-foreground focus:outline-hidden"
          />
        </div>
      </div>
    </div>
  );
}
