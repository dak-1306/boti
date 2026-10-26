"use client";

import React, { Suspense, use } from "react";
import { PageHeader } from "@/components/common/page-header";
import { useBookingDetail } from "@/features/bookings/hooks/useBookingDetail";
import { BookingSummaryCard } from "@/features/bookings/components/detail/BookingSummaryCard";
import { BookingQRCard } from "@/features/bookings/components/detail/BookingQRCard";
import { BookingCustomerCard } from "@/features/bookings/components/detail/BookingCustomerCard";
import { BookingPaymentCard } from "@/features/bookings/components/detail/BookingPaymentCard";
import { BookingBottomActions } from "@/features/bookings/components/detail/BookingBottomActions";
import { BOOKING_TEXTS } from "@/features/bookings/constants/bookings.constants";

interface BookingDetailPageProps {
  params: Promise<{ id: string }>;
}

function BookingDetailContent({ id }: { id: string }) {
  const {
    booking,
    handleShare,
    openCancelDialog,
    openRescheduleDrawer,
  } = useBookingDetail(id);

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-background text-foreground">
      <PageHeader
        title={BOOKING_TEXTS.detailHeaderTitle}
        showBack
        variant="gradient"
      />

      <div className="flex-1 overflow-y-auto px-4 py-4 no-scrollbar">
        <div className="space-y-3.5 sm:mx-auto sm:max-w-[390px] w-full">
          <BookingSummaryCard booking={booking} />
          <BookingQRCard qrCodeUrl={booking.qrCodeUrl} />
          <BookingCustomerCard customer={booking.customer} />
          <BookingPaymentCard payment={booking.payment} />
        </div>
      </div>

      <BookingBottomActions
        onShare={handleShare}
        onCancel={openCancelDialog}
        onReschedule={openRescheduleDrawer}
      />
    </div>
  );
}

export default function BookingDetailPage({ params }: BookingDetailPageProps) {
  const resolvedParams = use(params);

  return (
    <Suspense
      fallback={
        <div className="flex h-full w-full items-center justify-center bg-background text-xs font-bold text-muted-foreground">
          Đang tải chi tiết đơn đặt...
        </div>
      }
    >
      <BookingDetailContent id={resolvedParams.id} />
    </Suspense>
  );
}