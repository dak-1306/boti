import { useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CHECKOUT_TEXTS } from "../constants/checkout.constants";
import {
  PaymentMethodType,
  CheckoutBookingData,
} from "../types/checkout.types";
import { useBookingStore } from "@/stores/useBookingStore";

const fallbackBookingData: CheckoutBookingData = {
  venueId: "v1",
  venueName: "Sân Cầu Lông Tân Bình",
  venueAddress: "120 Cộng Hòa, Q. Tân Bình, TP.HCM",
  courtName: "Sân số 2",
  dateText: "Hôm nay, 27/10/2026",
  slots: [
    { id: "s1", timeText: "17:00 - 18:00", price: 80000 },
    { id: "s2", timeText: "18:00 - 19:00", price: 80000 },
  ],
  totalPrice: 160000,
  customerName: "Nguyễn Văn A",
  customerPhone: "0901234567",
};

export function useCheckout() {
  const router = useRouter();
  const { activeDraft, confirmBooking } = useBookingStore();
  const [selectedMethod, setSelectedMethod] =
    useState<PaymentMethodType>("zalopay");
  const [isProcessing, setIsProcessing] = useState(false);
  const [shouldSimulateSuccess, setShouldSimulateSuccess] = useState(true);

  const bookingData = useMemo<CheckoutBookingData>(() => {
    if (activeDraft) {
      return {
        venueId: activeDraft.venueId,
        venueName: activeDraft.venueName,
        venueAddress: activeDraft.venueAddress,
        courtName: activeDraft.courtName,
        dateText: activeDraft.dateText,
        slots: activeDraft.slots,
        totalPrice: activeDraft.totalPrice,
        customerName: activeDraft.customerName,
        customerPhone: activeDraft.customerPhone,
      };
    }
    return fallbackBookingData;
  }, [activeDraft]);

  const handleProcessPayment = useCallback(async () => {
    setIsProcessing(true);

    if (shouldSimulateSuccess) {
      const success = await confirmBooking(bookingData);
      setIsProcessing(false);

      if (success) {
        toast.success(CHECKOUT_TEXTS.toastSuccess, {
          description: CHECKOUT_TEXTS.toastSuccessDesc,
        });
        router.push("/bookings");
      } else {
        toast.error("Không thể lưu đơn hàng. Vui lòng thử lại.");
      }
    } else {
      setIsProcessing(false);
      toast.error(CHECKOUT_TEXTS.toastError, {
        description: CHECKOUT_TEXTS.toastErrorDesc,
      });
    }
  }, [shouldSimulateSuccess, confirmBooking, bookingData, router]);

  return {
    bookingData,
    selectedMethod,
    setSelectedMethod,
    isProcessing,
    shouldSimulateSuccess,
    setShouldSimulateSuccess,
    handleProcessPayment,
  };
}
