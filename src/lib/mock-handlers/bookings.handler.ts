import { HttpMethod, ApiResponse } from "@/types/api.types";
import { createSuccessResponse, createErrorResponse } from "../api-response";
import { mockDb } from "../mock-db";
import { BookingItem } from "@/features/bookings/types/bookings.types";
import { CheckoutBookingData } from "@/features/checkout/types/checkout.types";
import { Venue } from "@/features/home/types/home.types";

export interface RescheduleBookingPayload {
  newDateText: string;
  newTimeText: string;
}

export async function handleBookingsRequest<T, P = Record<string, unknown>>(
  method: HttpMethod,
  endpoint: string,
  payload?: P,
): Promise<ApiResponse<T>> {
  // Đảm bảo an toàn 100% nếu mockDb chưa khởi tạo
  const bookings = mockDb.get<BookingItem[]>("BOOKINGS") || [];

  // Helper kiểm tra khớp ID hoặc BookingCode (hỗ trợ cả URL decode)
  const isTargetBooking = (b: BookingItem, targetId: string) => {
    const decodedTarget = decodeURIComponent(targetId);
    return (
      String(b.id) === String(targetId) ||
      String(b.id) === decodedTarget ||
      b.bookingCode === targetId ||
      b.bookingCode === decodedTarget
    );
  };

  // 1. Endpoint Hủy đơn: PUT /bookings/:id/cancel
  if (method === "PUT" && endpoint.includes("/cancel")) {
    const match = endpoint.match(/\/bookings\/([^/]+)\/cancel/);
    const rawBookingId = match ? match[1] : null;
    const bookingId = rawBookingId ? rawBookingId.split("?")[0] : null;

    if (!bookingId) {
      return createErrorResponse<T>("Mã đơn không hợp lệ", 400);
    }

    let found = false;
    const updatedBookings = bookings.map((b) => {
      if (isTargetBooking(b, bookingId)) {
        found = true;
        return { ...b, status: "cancelled" as const, statusText: "Đã hủy" };
      }
      return b;
    });

    if (!found) {
      return createErrorResponse<T>("Không tìm thấy đơn đặt sân", 404);
    }

    mockDb.set("BOOKINGS", updatedBookings);
    const updatedItem = updatedBookings.find((b) =>
      isTargetBooking(b, bookingId),
    );
    return createSuccessResponse(
      updatedItem as unknown as T,
      "Hủy đơn thành công",
    );
  }

  // 2. Endpoint Dời lịch: PUT /bookings/:id/reschedule
  if (method === "PUT" && endpoint.includes("/reschedule")) {
    const match = endpoint.match(/\/bookings\/([^/]+)\/reschedule/);
    const rawBookingId = match ? match[1] : null;
    const bookingId = rawBookingId ? rawBookingId.split("?")[0] : null;

    if (!bookingId) {
      return createErrorResponse<T>("Mã đơn không hợp lệ", 400);
    }

    const targetIdStr = decodeURIComponent(bookingId);
    const safeBookings = bookings || [];
    const targetBooking = safeBookings.find(
      (b) =>
        String(b.id) === String(bookingId) ||
        String(b.id) === targetIdStr ||
        b.bookingCode === bookingId ||
        b.bookingCode === targetIdStr,
    );

    if (!targetBooking) {
      return createErrorResponse<T>("Không tìm thấy đơn đặt sân", 404);
    }

    const { newDateText, newTimeText } = (payload ||
      {}) as unknown as RescheduleBookingPayload;

    const dateMatch = newDateText?.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
    const newDate = dateMatch
      ? `${dateMatch[3]}-${dateMatch[2].padStart(2, "0")}-${dateMatch[1].padStart(2, "0")}`
      : undefined;

    // 🔴 KIỂM TRA XUNG ĐỘT TRÙNG LỊCH KHI DỜI (EXCLUDING CURRENT BOOKING)
    const isConflict = safeBookings.some((b) => {
      // Bỏ qua chính đơn đang dời lịch
      if (
        String(b.id) === String(targetBooking.id) ||
        b.bookingCode === targetBooking.bookingCode
      ) {
        return false;
      }
      if (b.status === "cancelled") return false;
      if (String(b.venueId) !== String(targetBooking.venueId)) return false;
      if (newDate && b.date !== newDate) return false;

      // Kiểm tra trùng giờ / sân con
      const timeMatch =
        b.timeText &&
        newTimeText &&
        (b.timeText === newTimeText ||
          (b.timeText.includes(newTimeText.split(" (")[0]) &&
            b.timeText.includes(
              newTimeText.split("(")[1]?.replace(")", "") || "",
            )));

      return timeMatch;
    });

    if (isConflict) {
      return createErrorResponse<T>(
        "Khung giờ này đã có đơn khác chiếm chỗ. Vui lòng chọn khung giờ khác!",
        409,
      );
    }

    const updatedBookings = safeBookings.map((b) => {
      if (
        String(b.id) === String(bookingId) ||
        String(b.id) === targetIdStr ||
        b.bookingCode === bookingId ||
        b.bookingCode === targetIdStr
      ) {
        return {
          ...b,
          status: "rescheduled" as const,
          statusText: "Đã dời lịch",
          dateText: newDateText || b.dateText,
          timeText: newTimeText || b.timeText,
          date: newDate || b.date,
        };
      }
      return b;
    });

    mockDb.set("BOOKINGS", updatedBookings);
    const updatedItem = updatedBookings.find(
      (b) =>
        String(b.id) === String(bookingId) ||
        String(b.id) === targetIdStr ||
        b.bookingCode === bookingId ||
        b.bookingCode === targetIdStr,
    );

    return createSuccessResponse(
      updatedItem as unknown as T,
      "Dời lịch thành công",
    );
  }

  // 3. Endpoint Lấy danh sách: GET /bookings
  if (method === "GET") {
    return createSuccessResponse(bookings as unknown as T);
  }

  // 4. Endpoint Tạo đơn mới: POST /bookings
  if (method === "POST" && payload) {
    const draft = payload as unknown as CheckoutBookingData;
    const venues = mockDb.get<Venue[]>("VENUES") || [];
    const matchedVenue =
      venues.find((v) => String(v.id) === String(draft.venueId)) || venues[0];

    const now = new Date();
    const dateMatch = draft.dateText.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
    const formattedDate = dateMatch
      ? `${dateMatch[3]}-${dateMatch[2].padStart(2, "0")}-${dateMatch[1].padStart(2, "0")}`
      : now.toISOString().split("T")[0];

    // 🔴 KIỂM TRA XUNG ĐỘT TRÙNG LỊCH (API GUARD)
    const isConflict = bookings.some((b) => {
      if (String(b.venueId) !== String(draft.venueId)) return false;
      if (b.status === "cancelled") return false;
      if (b.date !== formattedDate) return false;

      return draft.slots?.some((slot) => {
        const isCourtMatch =
          !b.timeText.includes("(") ||
          (draft.courtName && b.timeText.includes(draft.courtName));
        const isTimeMatch = b.timeText.includes(slot.timeText);
        return isCourtMatch && isTimeMatch;
      });
    });

    if (isConflict) {
      return createErrorResponse<T>(
        "Khung giờ này vừa có người đặt thành công. Vui lòng chọn khung giờ khác!",
        409,
      );
    }

    const cleanDateCode = formattedDate.replace(/-/g, "");
    const bookingCode = `TB-${cleanDateCode}-${Math.floor(1000 + Math.random() * 9000)}`;
    const slotTimes = draft.slots
      ? draft.slots.map((s) => s.timeText).join(", ")
      : "";
    const timeTextCombined = draft.courtName
      ? `${slotTimes} (${draft.courtName})`
      : slotTimes;

    const venueRaw = matchedVenue as unknown as {
      imageUrl?: string;
      image?: string;
      images?: string[];
      category?: string;
    };
    const venueImageUrl =
      venueRaw.imageUrl ||
      venueRaw.image ||
      (Array.isArray(venueRaw.images) && venueRaw.images[0]) ||
      "/images/placeholder-venue.png";

    const newBooking: BookingItem = {
      id: `b_${Date.now()}`,
      bookingCode,
      venueId: draft.venueId,
      venueName: draft.venueName || matchedVenue?.name || "Sân Cầu Lông",
      category: venueRaw.category || matchedVenue?.category || "Cầu lông",
      imageUrl: venueImageUrl,
      status: "confirmed",
      statusText: "Đã xác nhận",
      date: formattedDate,
      dateText: draft.dateText,
      timeText: timeTextCombined,
      address: draft.venueAddress || matchedVenue?.address || "",
      qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${bookingCode}`,
      customer: {
        name: draft.customerName,
        phone: draft.customerPhone,
        playerCount: 2,
        notes: (draft as unknown as { notes?: string }).notes || "",
      },
      payment: {
        method: "ZaloPay",
        status: "paid",
        statusText: "Đã thanh toán",
        transactionId: `TXN-${Date.now()}`,
        paidAt: now.toISOString(),
        courtFee: draft.totalPrice,
        discountFee: 0,
        serviceFee: 0,
        totalFee: draft.totalPrice,
      },
    };

    const updatedList = [newBooking, ...bookings];
    mockDb.set("BOOKINGS", updatedList);
    return createSuccessResponse(
      newBooking as unknown as T,
      "Tạo đơn thành công",
      201,
    );
  }

  return createErrorResponse<T>("Hành động không hợp lệ", 400);
}
