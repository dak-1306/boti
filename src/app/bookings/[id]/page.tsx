"use client";

import React, { Suspense } from "react";
import { BookingDetailHeader } from "@/features/bookings/components/detail/BookingDetailHeader";
import { BookingSummaryCard } from "@/features/bookings/components/detail/BookingSummaryCard";
import { BookingQRCard } from "@/features/bookings/components/detail/BookingQRCard";
import { BookingCustomerCard } from "@/features/bookings/components/detail/BookingCustomerCard";
import { BookingPaymentCard } from "@/features/bookings/components/detail/BookingPaymentCard";
import { BookingBottomActions } from "@/features/bookings/components/detail/BookingBottomActions";
import { useBookingDetail } from "@/features/bookings/hooks/useBookingDetail";

function BookingDetailContent() {
  const {
    booking,
    handleShare,
    openCancelDialog,
    openRescheduleDrawer,
  } = useBookingDetail();

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-slate-50 dark:bg-slate-950">
      {/* 1. STICKY HEADER CỐ ĐỊNH BAN ĐẦU */}
      <BookingDetailHeader />

      {/* 2. KHUNG NỘI DUNG CUỘN ĐỘC LẬP VỚI PADDING CHUẨN */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-6 no-scrollbar">
        <div className="space-y-3.5 sm:mx-auto sm:max-w-[390px]">
          <BookingSummaryCard booking={booking} />
          <BookingQRCard qrCodeUrl={booking.qrCodeUrl} />
          <BookingCustomerCard customer={booking.customer} />
          <BookingPaymentCard payment={booking.payment} />
        </div>
      </div>

      {/* 3. STICKY BOTTOM ACTIONS (3 NÚT CHỨC NĂNG) */}
      <BookingBottomActions
        onShare={handleShare}
        onCancel={openCancelDialog}
        onReschedule={openRescheduleDrawer}
      />
    </div>
  );
}

export default function BookingDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-full w-full items-center justify-center bg-slate-50 dark:bg-slate-950">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
        </div>
      }
    >
      <BookingDetailContent />
    </Suspense>
  );
}