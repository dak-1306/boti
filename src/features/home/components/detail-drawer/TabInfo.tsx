"use client";

import React from "react";
import { Check, Armchair, Car, DoorClosed, Coffee } from "lucide-react";
import { Venue } from "../../types/home.types";
import { HOME_TEXTS } from "../../constants/home.constants";

interface TabInfoProps {
  venue: Venue;
}

const AMENITY_ICONS: Record<string, React.ReactNode> = {
  "Khu vực nghỉ ngơi": <Armchair className="h-3.5 w-3.5 text-primary" />,
  "Khu vực để xe": <Car className="h-3.5 w-3.5 text-primary" />,
  "Nhà vệ sinh": <DoorClosed className="h-3.5 w-3.5 text-primary" />,
  "Nước uống": <Coffee className="h-3.5 w-3.5 text-primary" />,
};

export function TabInfo({ venue }: TabInfoProps) {
  return (
    <div className="space-y-4 text-xs">
      <div>
        <h4 className="font-bold text-foreground">{HOME_TEXTS.introTitle}</h4>
        <p className="mt-1 leading-relaxed text-muted-foreground">
          {venue.description || HOME_TEXTS.noDescriptionText}
        </p>
      </div>

      {venue.amenities && venue.amenities.length > 0 && (
        <div>
          <h4 className="font-bold text-foreground mb-2">
            {HOME_TEXTS.amenitiesTitle}
          </h4>
          <div className="flex flex-wrap gap-2">
            {venue.amenities.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-1.5 rounded-xl bg-muted border border-border px-3 py-1.5 font-medium text-foreground"
              >
                {AMENITY_ICONS[item] || (
                  <Check className="h-3.5 w-3.5 text-primary" />
                )}
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {venue.preparationNotes && venue.preparationNotes.length > 0 && (
        <div>
          <h4 className="font-bold text-foreground mb-2">
            {HOME_TEXTS.prepTitle}
          </h4>
          <ul className="space-y-1.5 text-muted-foreground">
            {venue.preparationNotes.map((note, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
