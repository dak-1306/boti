import { HttpMethod, ApiResponse } from "@/types/api.types";
import { createSuccessResponse, createErrorResponse } from "../api-response";
import { mockDb } from "../mock-db";
import {
  BookingItem,
  PassCourtPayload,
} from "@/features/bookings/types/bookings.types";
import { CheckoutBookingData } from "@/features/checkout/types/checkout.types";
import { Venue, PassSlotItem } from "@/features/home/types/home.types";
import { UserProfile } from "@/features/profile/types/profile.types";

export interface RescheduleBookingPayload {
  newDateText: string;
  newTimeText: string;
}

export interface BuyPassSlotPayload {
  customerName: string;
  customerPhone: string;
}

export async function handleBookingsRequest<T, P = Record<string, unknown>>(
  method: HttpMethod,
  endpoint: string,
  payload?: P,
): Promise<ApiResponse<T>> {
  const bookings = mockDb.get<BookingItem[]>("BOOKINGS") || [];

  const isTargetBooking = (b: BookingItem, targetId: string) => {
    const decodedTarget = decodeURIComponent(targetId);
    return (
      String(b.id) === String(targetId) ||
      String(b.id) === decodedTarget ||
      b.bookingCode === targetId ||
      b.bookingCode === decodedTarget
    );
  };

  // 1. Endpoint Đăng Pass Sân: PUT /bookings/:id/pass
  if (
    method === "PUT" &&
    endpoint.includes("/pass") &&
    !endpoint.includes("/pass-slots")
  ) {
    const match = endpoint.match(/\/bookings\/([^/]+)\/pass/);
    const bookingId = match ? match[1].split("?")[0] : null;

    if (!bookingId) {
      return createErrorResponse<T>("Mã đơn không hợp lệ", 400);
    }

    const passPayload = payload as unknown as PassCourtPayload;
    let found = false;

    const updatedBookings = bookings.map((b) => {
      if (isTargetBooking(b, bookingId)) {
        found = true;
        return {
          ...b,
          status: "passing" as const,
          statusText: "Đang Pass",
          isPassing: true,
          passPrice: passPayload.passPrice,
          passDiscountPercent: passPayload.discountPercent,
          passCreatedAt: new Date().toISOString(),
          sellerBankInfo: passPayload.bankInfo,
          sellerName: b.customer.name,
          sellerPhone: b.customer.phone,
        };
      }
      return b;
    });

    if (!found) {
      return createErrorResponse<T>("Không tìm thấy đơn đặt sân", 404);
    }

    // Cập nhật Ngân hàng vào Profile người dùng
    const userProfile = mockDb.get<UserProfile>("USER");
if (userProfile) {
  mockDb.set("USER", {
    ...userProfile,
    bankInfo: passPayload.bankInfo,
  });
}

    mockDb.set("BOOKINGS", updatedBookings);
    const updatedItem = updatedBookings.find((b) =>
      isTargetBooking(b, bookingId),
    );

    return createSuccessResponse(
      updatedItem as unknown as T,
      "Đăng Pass sân thành công!",
    );
  }

  // 2. Endpoint Mua Slot Pass: POST /bookings/pass-slots/:id/buy
  if (
    method === "POST" &&
    endpoint.includes("/pass-slots/") &&
    endpoint.includes("/buy")
  ) {
    const match = endpoint.match(/\/bookings\/pass-slots\/([^/]+)\/buy/);
    const passSlotId = match ? match[1].split("?")[0] : null;

    if (!passSlotId) {
      return createErrorResponse<T>("Mã slot Pass không hợp lệ", 400);
    }

    const buyPayload = payload as unknown as BuyPassSlotPayload;

    // Tìm đơn đang đăng pass tương ứng
    const targetBooking = bookings.find(
      (b) =>
        String(b.id) === String(passSlotId) || b.bookingCode === passSlotId,
    );

    if (!targetBooking || targetBooking.status !== "passing") {
      return createErrorResponse<T>("Slot pass này không còn khả dụng", 404);
    }

    const now = new Date();
    const newBookingCode = `TB-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}-${Math.floor(1000 + Math.random() * 9000)}`;

    // Tạo đơn mới cho người mua (B)
    const newBuyerBooking: BookingItem = {
      id: `b_${Date.now()}`,
      bookingCode: newBookingCode,
      venueId: targetBooking.venueId,
      venueName: targetBooking.venueName,
      category: targetBooking.category,
      categorySlug: targetBooking.categorySlug,
      imageUrl: targetBooking.imageUrl,
      status: "confirmed",
      statusText: "Đã xác nhận",
      date: targetBooking.date,
      dateText: targetBooking.dateText,
      timeText: targetBooking.timeText,
      address: targetBooking.address,
      courtName: targetBooking.courtName,
      qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${newBookingCode}`,
      customer: {
        name: buyPayload.customerName || "Người mua Pass",
        phone: buyPayload.customerPhone || "0900000000",
        playerCount: targetBooking.customer.playerCount || 2,
        notes: `Slot Pass nhượng lại từ ${targetBooking.customer.name}`,
      },
      payment: {
        method: "ZaloPay",
        status: "paid",
        statusText: "Đã thanh toán",
        transactionId: `TXN-PASS-${Date.now()}`,
        paidAt: now.toISOString(),
        courtFee: targetBooking.payment.totalFee,
        discountFee:
          (targetBooking.payment.totalFee || 0) -
          (targetBooking.passPrice || 0),
        serviceFee: 0,
        totalFee: targetBooking.passPrice || targetBooking.payment.totalFee,
      },
    };

    // Cập nhật trạng thái đơn gốc của người bán (A) sang "passed_success"
    const updatedBookings = bookings.map((b) => {
      if (String(b.id) === String(targetBooking.id)) {
        return {
          ...b,
          status: "passed_success" as const,
          statusText: "Đã Pass",
          isPassing: false,
        };
      }
      return b;
    });

    // Lưu lại cả đơn mới và đơn đã cập nhật
    mockDb.set("BOOKINGS", [newBuyerBooking, ...updatedBookings]);

    return createSuccessResponse(
      newBuyerBooking as unknown as T,
      "Mua slot Pass thành công!",
      201,
    );
  }

  // 3. Endpoint Lấy danh sách Slot Pass ở Trang chủ: GET /bookings/pass-slots
  if (method === "GET" && endpoint.includes("/pass-slots")) {
    const activePassBookings = bookings.filter((b) => b.status === "passing");

    const passSlots: PassSlotItem[] = activePassBookings.map((b) => ({
      id: String(b.id),
      bookingId: String(b.id),
      bookingCode: b.bookingCode,
      venueId: b.venueId,
      venueName: b.venueName,
      category: b.category,
      categorySlug: b.categorySlug,
      imageUrl: b.imageUrl,
      address: b.address,
      courtName: b.courtName || "Sân tiêu chuẩn",
      date: b.date,
      dateText: b.dateText,
      timeText: b.timeText,
      startTime: b.timeText.split("-")[0]?.trim() || "00:00",
      originalPrice: b.payment.totalFee || 200000,
      passPrice: b.passPrice || b.payment.totalFee || 160000,
      discountPercent: b.passDiscountPercent || 0,
      sellerName: b.customer.name,
      sellerPhone: b.customer.phone,
      sellerBankInfo: b.sellerBankInfo || {
        bankName: "MBBank",
        bankCode: "MB",
        accountNumber: "0000000000",
        accountHolder: "N/A",
      },
      createdAt: b.passCreatedAt || new Date().toISOString(),
    }));

    return createSuccessResponse(passSlots as unknown as T);
  }

  // 4. Endpoint Hủy đơn: PUT /bookings/:id/cancel
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

  // 5. Endpoint Dời lịch: PUT /bookings/:id/reschedule
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

    const isConflict = safeBookings.some((b) => {
      if (
        String(b.id) === String(targetBooking.id) ||
        b.bookingCode === targetBooking.bookingCode
      ) {
        return false;
      }
      if (b.status === "cancelled") return false;
      if (String(b.venueId) !== String(targetBooking.venueId)) return false;
      if (newDate && b.date !== newDate) return false;

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

  // 6. Endpoint Lấy danh sách: GET /bookings
  if (method === "GET") {
    return createSuccessResponse(bookings as unknown as T);
  }

  // 7. Endpoint Tạo đơn mới: POST /bookings
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
