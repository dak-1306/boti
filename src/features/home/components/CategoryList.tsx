"use client";

import React from "react";
import { Category } from "../types/home.types";
import { SafeCategoryIcon } from "@/components/common/safe-category-icon";
import { cn } from "@/lib/utils";
import { StaggerGroup } from "@/components/motion/StaggerGroup";

interface CategoryListProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (id: string) => void;
}

export function CategoryList({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryListProps) {
  return (
    <div className="w-full shrink-0 overflow-x-auto overflow-y-hidden py-3 px-4 no-scrollbar">
      <StaggerGroup className="flex items-center gap-3.5 w-max">
        {categories.map((item) => {
          const isSelected = selectedCategory === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectCategory(item.id)}
              className="group flex flex-col items-center gap-1.5 shrink-0 transition-transform active:scale-95 focus:outline-hidden"
            >
              {/* Tăng kích thước hộp & làm icon to rõ hơn hẳn */}
              <div
                className={cn(
                  "flex h-13 w-13 items-center justify-center rounded-2xl p-1.5 bg-card shadow-xs transition-all",
                  isSelected
                    ? "ring-2 ring-primary ring-offset-2 ring-offset-background bg-primary/15"
                    : "border border-border hover:border-primary/50",
                )}
              >
                <SafeCategoryIcon
                  icon={item.icon}
                  alt={item.name}
                  size={50}
                  className="h-15 w-15 object-contain"
                />
              </div>

              <span
                className={cn(
                  "text-[11px] whitespace-nowrap transition-colors",
                  isSelected
                    ? "font-bold text-primary"
                    : "font-medium text-muted-foreground group-hover:text-foreground",
                )}
              >
                {item.name}
              </span>
            </button>
          );
        })}
      </StaggerGroup>
    </div>
  );
}
