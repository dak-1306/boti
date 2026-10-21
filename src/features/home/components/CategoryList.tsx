import React from "react";
import Image from "next/image";
import { Category } from "../types/home.types";

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
    <div className="no-scrollbar flex gap-3 overflow-x-auto px-4 py-4">
      {categories.map((item) => {
        const isSelected = selectedCategory === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onSelectCategory(item.id)}
            className="flex flex-col items-center gap-1.5 shrink-0 transition-transform active:scale-95"
          >
            <div
              className={`flex h-14 w-14 items-center justify-center rounded-2xl p-1.5 shadow-sm bg-white dark:bg-slate-800 ${
                isSelected ? "ring-2 ring-blue-600 ring-offset-2" : ""
              }`}
            >
              <Image
                src={item.icon}
                alt={item.name}
                width={48}
                height={48}
                className="h-12 w-12 object-contain"
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
