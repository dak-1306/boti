"use client";

import React from "react";
import { motion } from "framer-motion";
import { SearchX } from "lucide-react";
import { Venue } from "../types/home.types";
import { VenueCard } from "./VenueCard";
import {
  gridContainerVariants,
  gridItemVariants,
} from "../constants/home.motion";

interface VenueGridProps {
  venues: Venue[];
  onSelectVenue: (venue: Venue) => void;
  onResetFilters?: () => void;
}

export function VenueGrid({
  venues,
  onSelectVenue,
  onResetFilters,
}: VenueGridProps) {
  if (venues.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex h-64 flex-col items-center justify-center p-6 text-center"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
          <SearchX className="h-6 w-6 text-slate-400" />
        </div>
        <h3 className="mt-3 text-sm font-bold text-slate-700 dark:text-slate-200">
          Không tìm thấy sân phù hợp
        </h3>
        <p className="mt-1 text-xs text-slate-400">
          Thử thay đổi từ khóa hoặc thiết lập lại bộ lọc nâng cao.
        </p>
        {onResetFilters && (
          <button
            onClick={onResetFilters}
            className="mt-4 rounded-full bg-blue-50 px-4 py-2 text-xs font-bold text-blue-600 transition hover:bg-blue-100 dark:bg-blue-950/60 dark:text-blue-300"
          >
            Xóa bộ lọc
          </button>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={gridContainerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 gap-3 px-4"
    >
      {venues.map((venue) => (
        <motion.div key={venue.id} variants={gridItemVariants}>
          <VenueCard venue={venue} onClick={() => onSelectVenue(venue)} />
        </motion.div>
      ))}
    </motion.div>
  );
}
