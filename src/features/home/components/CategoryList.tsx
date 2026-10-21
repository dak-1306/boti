"use client";

import React from "react";
import { Category } from "../types/home.types";
import { SafeCategoryIcon } from "@/components/common/safe-category-icon";

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
    <div className="no-scrollbar flex gap-3 overflow-x-auto px-4 py-3">
      {categories.map((item) => {
        const isSelected = selectedCategory === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onSelectCategory(item.id)}
            className="flex flex-col items-center gap-1.5 shrink-0 transition-transform active:scale-95"
          >
            <div
              className={`flex h-14 w-14 items-center justify-center rounded-2xl p-1.5 shadow-2xs bg-white dark:bg-slate-800 transition-all ${
                isSelected
                  ? "ring-2 ring-blue-600 ring-offset-2 dark:ring-offset-slate-950"
                  : "border border-slate-100 dark:border-slate-800"
              }`}
            >
              <SafeCategoryIcon
                icon={item.icon}
                alt={item.name}
                size={38}
                className="h-9 w-9"
              />
            </div>

            <span className="text-[11px] font-medium text-slate-700 dark:text-slate-300">
              {item.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}
