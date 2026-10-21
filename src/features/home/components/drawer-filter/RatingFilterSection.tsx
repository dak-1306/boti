"use client";

import React from "react";
import { HOME_TEXTS } from "../../constants/home.constants";

interface RatingFilterSectionProps {
  selectedRating: number;
  onSelectRating: (rating: number) => void;
}

export function RatingFilterSection({
  selectedRating,
  onSelectRating,
}: RatingFilterSectionProps) {
  const ratingOptions = [0, 3, 4, 4.5];

  return (
    <div>
      <label className="mb-2 block font-bold text-slate-800 dark:text-slate-100">
        {HOME_TEXTS.ratingLabel}
      </label>
      <div className="flex gap-2">
        {ratingOptions.map((stars) => {
          const isSelected = selectedRating === stars;
          return (
            <button
              key={stars}
              onClick={() => onSelectRating(stars)}
              className={`flex-1 rounded-xl py-2 text-xs font-medium transition active:scale-95 ${
                isSelected
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
              }`}
            >
              {stars === 0 ? "Tất cả" : `${stars}+ ⭐`}
            </button>
          );
        })}
      </div>
    </div>
  );
}
