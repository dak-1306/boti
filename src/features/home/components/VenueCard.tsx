import React from "react";
import Image from "next/image";
import { Star, MapPin, Clock } from "lucide-react";
import { Venue } from "../types/home.types";
import { HOME_TEXTS } from "../constants/home.constants";

interface VenueCardProps {
  venue: Venue;
}

export function VenueCard({ venue }: VenueCardProps) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      {/* Thumbnail */}
      <div className="relative h-28 w-full bg-slate-100">
        <Image
          src={venue.imageUrl}
          alt={venue.name}
          fill
          className="object-cover"
          sizes="(max-width: 430px) 50vw, 200px"
        />
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col p-2.5">
        <h3 className="line-clamp-1 text-xs font-bold text-slate-800 dark:text-slate-100">
          {venue.name}
        </h3>

        {/* Tag Category */}
        <div className="mt-1">
          <span className="rounded-md bg-blue-50 px-1.5 py-0.5 text-[9px] font-medium text-blue-600 dark:bg-blue-950 dark:text-blue-300">
            {venue.category}
          </span>
        </div>

        {/* Rating */}
        <div className="mt-2 flex items-center gap-1 text-[10px] text-slate-500">
          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
          <span className="font-semibold text-slate-700 dark:text-slate-200">
            {venue.rating.toFixed(1)}
          </span>
          <span>
            ({venue.reviewCount} {HOME_TEXTS.reviewsText})
          </span>
        </div>

        {/* Address */}
        <div className="mt-1 flex items-start gap-1 text-[10px] text-slate-500">
          <MapPin className="h-3 w-3 shrink-0 text-blue-500" />
          <span className="line-clamp-2">{venue.address}</span>
        </div>

        {/* Open Time */}
        <div className="mt-1 flex items-center gap-1 text-[10px] text-slate-500">
          <Clock className="h-3 w-3 shrink-0 text-blue-500" />
          <span>{venue.openTime}</span>
        </div>

        {/* Action Button */}
        <button className="mt-3 w-full rounded-xl bg-blue-500 py-1.5 text-xs font-semibold text-white transition hover:bg-blue-600 active:scale-95">
          {HOME_TEXTS.bookBtn}
        </button>
      </div>
    </div>
  );
}
