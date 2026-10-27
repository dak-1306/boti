"use client";

import React, { memo } from "react";
import { NEWS_CATEGORIES } from "../constants/news.constants";
import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { NewsCategoryFilter } from "../types/news.types";
import { cn } from "@/lib/utils";

interface NewsCategoryTabsProps {
  selectedCategory: NewsCategoryFilter;
  onSelectCategory: (cat: NewsCategoryFilter) => void;
}

export const NewsCategoryTabs = memo(function NewsCategoryTabs({
  selectedCategory,
  onSelectCategory,
}: NewsCategoryTabsProps) {
  return (
    <div className="w-full shrink-0 overflow-x-auto overflow-y-hidden px-4 py-3 no-scrollbar touch-pan-x will-change-transform">
      <StaggerGroup className="flex items-center gap-2 w-max">
        {NEWS_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className={cn(
                "h-11 shrink-0 rounded-full px-4 text-xs font-semibold transition-colors focus:outline-hidden",
                isSelected
                  ? "bg-primary text-primary-foreground shadow-2xs font-bold"
                  : "bg-muted/80 text-muted-foreground hover:bg-muted hover:text-foreground border border-border",
              )}
            >
              {cat.label}
            </button>
          );
        })}
      </StaggerGroup>
    </div>
  );
});
