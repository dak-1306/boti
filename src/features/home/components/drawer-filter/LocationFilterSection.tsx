"use client";

import React from "react";
import {
  CITIES_DATA,
  DISTRICTS_BY_CITY,
  HOME_TEXTS,
} from "../../constants/home.constants";

interface LocationFilterSectionProps {
  selectedCity: string;
  onSelectCity: (city: string) => void;
  selectedDistrict: string;
  onSelectDistrict: (district: string) => void;
}

export function LocationFilterSection({
  selectedCity,
  onSelectCity,
  selectedDistrict,
  onSelectDistrict,
}: LocationFilterSectionProps) {
  const currentDistricts = DISTRICTS_BY_CITY[selectedCity] || [
    "Tất cả Quận/Huyện",
  ];

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-2 block font-bold text-foreground">
          {HOME_TEXTS.locationLabel}
        </label>
        <div className="flex flex-wrap gap-2">
          {CITIES_DATA.map((city) => {
            const isSelected = selectedCity === city;
            return (
              <button
                key={city}
                onClick={() => onSelectCity(city)}
                className={`h-11 rounded-xl px-4 text-xs font-semibold transition active:scale-95 ${
                  isSelected
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                }`}
              >
                {city}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className="mb-2 block font-bold text-foreground">
          {HOME_TEXTS.locationInCityLabel} {selectedCity}
        </label>
        <div className="flex flex-wrap gap-2">
          {currentDistricts.map((dist) => {
            const targetValue = dist === "Tất cả Quận/Huyện" ? "" : dist;
            const isSelected = selectedDistrict === targetValue;
            return (
              <button
                key={dist}
                onClick={() => onSelectDistrict(targetValue)}
                className={`h-11 rounded-lg px-3 text-[11px] font-semibold transition active:scale-95 ${
                  isSelected
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                }`}
              >
                {dist}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
