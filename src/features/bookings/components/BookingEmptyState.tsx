"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { BOOKING_TEXTS } from "../constants/bookings.constants";
import emptyBookingIcon from "@/assets/icons/empty_booking.svg";

interface BookingEmptyStateProps {
  onBookNow: () => void;
}

export function BookingEmptyState({ onBookNow }: BookingEmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center  text-center"
    >
      {/* SVG Minh họa Lịch đặt trống */}
      <div className="relative h-44 w-44">
        <Image
          src={emptyBookingIcon}
          alt="Chưa có lịch đặt"
          fill
          priority
          className="object-contain"
        />
      </div>

      {/* Thông điệp */}
      <h3 className="mt-4 text-base font-extrabold text-slate-800 dark:text-slate-100">
        {BOOKING_TEXTS.emptyTitle}
      </h3>
      <p className="mt-1.5 text-xs text-slate-400 max-w-[260px] leading-relaxed">
        {BOOKING_TEXTS.emptySubtitle}
      </p>

      {/* Nút Đặt sân ngay */}
      <button
        onClick={onBookNow}
        className="mt-6 w-full max-w-[220px] rounded-full bg-blue-600 py-3 text-xs font-bold text-white shadow-lg transition hover:bg-blue-700 active:scale-95"
      >
        {BOOKING_TEXTS.bookNowBtn}
      </button>
    </motion.div>
  );
}
