"use client";

import React, { Suspense, use } from "react";
import { PageHeader } from "@/components/common/page-header";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { useBookingDetail } from "@/features/bookings/hooks/useBookingDetail";
import { useProfile } from "@/features/profile/hooks/useProfile";
import { BookingSummaryCard } from "@/features/bookings/components/detail/BookingSummaryCard";
import { BookingQRCard } from "@/features/bookings/components/detail/BookingQRCard";
import { BookingCustomerCard } from "@/features/bookings/components/detail/BookingCustomerCard";
import { BookingPaymentCard } from "@/features/bookings/components/detail/BookingPaymentCard";
import { BookingBottomActions } from "@/features/bookings/components/detail/BookingBottomActions";
import { BookingRescheduleDrawer } from "@/features/bookings/components/reschedule/BookingRescheduleDrawer";
import { PassCourtDrawer } from "@/features/bookings/components/pass/PassCourtDrawer";
import { BOOKING_TEXTS } from "@/features/bookings/constants/bookings.constants";
import { StaggerGroup } from "@/components/motion/StaggerGroup";

interface BookingDetailPageProps {
  params: Promise<{ id: string }>;
}

function BookingDetailContent({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { user } = useProfile();

  const {
    booking,
    handleShare,
    isCancelDialogOpen,
    openCancelDialog,
    closeCancelDialog,
    handleConfirmCancel,
    isRescheduleDrawerOpen,
    openRescheduleDrawer,
    closeRescheduleDrawer,
    handleConfirmReschedule,
    isPassDrawerOpen,
    openPassDrawer,
    closePassDrawer,
    handleConfirmPass,
  } = useBookingDetail(resolvedParams.id);

  if (!booking) {
    return (
      <div className="flex h-full w-full flex-col bg-background text-foreground">
        <PageHeader
          title={BOOKING_TEXTS.detailHeaderTitle}
          showBack
          variant="gradient"
        />
        <div className="flex flex-1 items-center justify-center p-4 text-center text-xs font-medium text-muted-foreground">
          Không tìm thấy thông tin đơn đặt sân.
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-background text-foreground">
      <PageHeader
        title={BOOKING_TEXTS.detailHeaderTitle}
        showBack
        variant="gradient"
        headerClassName="pb-16"
        extensionClassName="-mt-12"
        bottomExtension={<BookingSummaryCard booking={booking} />}
      />

      <div className="flex-1 overflow-y-auto px-4 p-4 no-scrollbar">
        <StaggerGroup className="w-full space-y-3.5 sm:mx-auto sm:max-w-[390px]">
          <BookingQRCard qrCodeUrl={booking.qrCodeUrl} />
          <BookingCustomerCard customer={booking.customer} />
          <BookingPaymentCard payment={booking.payment} />
        </StaggerGroup>
      </div>

      {/* Cập nhật: Truyền status và trigger onPass */}
      <BookingBottomActions
        status={booking.status}
        onShare={handleShare}
        onCancel={openCancelDialog}
        onReschedule={openRescheduleDrawer}
        onPass={openPassDrawer}
      />

      <BookingRescheduleDrawer
        booking={booking}
        isOpen={isRescheduleDrawerOpen}
        onClose={closeRescheduleDrawer}
        onConfirmReschedule={handleConfirmReschedule}
      />

      {/* Drawer Đăng Pass Sân */}
      <PassCourtDrawer
        booking={booking}
        isOpen={isPassDrawerOpen}
        onClose={closePassDrawer}
        userBankInfo={user?.bankInfo}
        onConfirmPass={handleConfirmPass}
      />

      <ConfirmDialog
        isOpen={isCancelDialogOpen}
        onClose={closeCancelDialog}
        onConfirm={handleConfirmCancel}
        title="Xác nhận hủy đơn đặt sân"
        description="Bạn có chắc chắn muốn hủy đơn đặt sân này? Hành động này không thể hoàn tác."
        confirmText="Hủy đặt sân"
        cancelText="Giữ lại"
        variant="destructive"
      />
    </div>
  );
}

export default function BookingDetailPage({ params }: BookingDetailPageProps) {
  return (
    <Suspense
      fallback={
        <div className="flex h-full w-full items-center justify-center bg-background text-xs font-bold text-muted-foreground">
          Đang tải chi tiết đơn đặt...
        </div>
      }
    >
      <BookingDetailContent params={params} />
    </Suspense>
  );
}
