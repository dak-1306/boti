export const PASS_SLOT_TEXTS = {
  quickPassBadge: "Pass nhanh",
  discountTag: (percent: number) => `Giảm ${percent}%`,
  viewNowBtn: "Xem ngay",
  bookingCodeLabel: (code: string) => `Mã đơn: ${code}`,
  dateLabel: "Ngày chơi",
  timeLabel: "Khung giờ",
  addressLabel: "Địa điểm sân",
  originalPriceLabel: "Giá đặt ban đầu",
  saveAmountLabel: "Tiết kiệm được",
  resellPriceLabel: "Giá nhượng lại",
  sellerLabel: "Được nhượng bởi:",
  guaranteeNotice: "Mã QR và quyền vào sân được chuyển ngay sau khi xác nhận.",
  buyCtaBtn: (price: number) =>
    `Mua lại Slot Pass ngay (${price.toLocaleString("vi-VN")}đ)`,
  sectionTitle: (count: number) => `Pass Sân Giá Rẻ (${count})`,
  realtimeLabel: "Cập nhật thời gian thực",
};
