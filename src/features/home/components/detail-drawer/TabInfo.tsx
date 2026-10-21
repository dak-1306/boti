"use client";

import React from "react";
import { Check, Armchair, Car, DoorClosed, Coffee } from "lucide-react";
import { Venue } from "../../types/home.types";

interface TabInfoProps {
  venue: Venue;
}

// Ánh xạ tiện ích với icon tương ứng
const AMENITY_ICONS: Record<string, React.ReactNode> = {
  "Khu vực nghỉ ngơi": <Armchair className="h-3.5 w-3.5 text-blue-600" />,
  "Khu vực để xe": <Car className="h-3.5 w-3.5 text-blue-600" />,
  "Nhà vệ sinh": <DoorClosed className="h-3.5 w-3.5 text-blue-600" />,
  "Nước uống": <Coffee className="h-3.5 w-3.5 text-blue-600" />,
};

export function TabInfo({ venue }: TabInfoProps) {
  return (
    <div className="space-y-4 text-xs">
      {/* 1. Giới thiệu sân */}
      <div>
        <h4 className="font-bold text-slate-800 dark:text-slate-100">
          Giới thiệu sân
        </h4>
        <p className="mt-1 leading-relaxed text-slate-600 dark:text-slate-300">
          {venue.description || "Chưa có thông tin mô tả chi tiết."}
        </p>
      </div>

      {/* 2. Tiện ích tại sân */}
      {venue.amenities && venue.amenities.length > 0 && (
        <div>
          <h4 className="font-bold text-slate-800 dark:text-slate-100 mb-2">
            Tiện ích tại sân
          </h4>
          <div className="flex flex-wrap gap-2">
            {venue.amenities.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-1.5 rounded-xl bg-slate-100 px-3 py-1.5 font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200"
              >
                {AMENITY_ICONS[item] || (
                  <Check className="h-3.5 w-3.5 text-blue-600" />
                )}
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Trước khi đến sân */}
      {venue.preparationNotes && venue.preparationNotes.length > 0 && (
        <div>
          <h4 className="font-bold text-slate-800 dark:text-slate-100 mb-2">
            Trước khi đến sân
          </h4>
          <ul className="space-y-1.5 text-slate-600 dark:text-slate-300">
            {venue.preparationNotes.map((note, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-600" />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
