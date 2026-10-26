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
      <label className="mb-2 block font-bold text-foreground">
        {HOME_TEXTS.ratingLabel}
      </label>
      <div className="flex gap-2">
        {ratingOptions.map((stars) => {
          const isSelected = selectedRating === stars;
          return (
            <button
              key={stars}
              onClick={() => onSelectRating(stars)}
              className={`h-11 flex-1 rounded-xl text-xs font-semibold transition active:scale-95 ${
                isSelected
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              }`}
            >
              {stars === 0 ? HOME_TEXTS.ratingAll : `${stars}+ ⭐`}
            </button>
          );
        })}
      </div>
    </div>
  );
}
