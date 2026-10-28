export const PASS_COURT_TEXTS = {
  createTitle: "Đăng Pass lượt đặt sân",
  editTitle: "Chỉnh sửa thông tin Pass sân",
  discountSectionTitle: "1. Chọn mức chiết khấu Pass sân",
  originalPriceLabel: "Giá mua ban đầu:",
  resellPriceLabel: "Giá bán lại:",
  savePercentLabel: (percent: number) => `Tiết kiệm ${percent}%`,
  bankSectionTitle: "2. Tài khoản nhận tiền hoàn khi Pass thành công",
  bankNameLabel: "Tên ngân hàng:",
  bankNamePlaceholder: "VD: MBBank, Vietcombank...",
  accountNumberLabel: "Số tài khoản:",
  accountNumberPlaceholder: "Nhập số tài khoản",
  accountHolderLabel: "Chủ tài khoản:",
  accountHolderPlaceholder: "NGUYEN VAN A",
  termsNotice:
    "Sân pass sẽ xuất hiện công khai trên trang Pass sân. Tiền bán sân sẽ được chuyển vào tài khoản trên ngay khi có người mua thành công.",
  submitCreateBtn: (price: number) =>
    `Xác nhận đăng Pass sân • ${price.toLocaleString("vi-VN")}đ`,
  submitEditBtn: "Lưu thay đổi thông tin Pass",
  originalPriceOption: "Giá gốc",
  discountOption: (opt: number) => `-${opt}%`,
  actionRevokePass: "Thu hồi Pass",
  actionEditPass: "Chỉnh sửa thông tin Pass",
  revokeConfirmTitle: "Xác nhận thu hồi Pass sân",
  revokeConfirmDescription:
    "Bạn có chắc chắn muốn thu hồi lượt Pass sân này? Slot của bạn sẽ không còn xuất hiện trên trang Pass sân nữa.",
  revokeConfirmText: "Thu hồi ngay",
  revokeCancelText: "Giữ nguyên",
};

export const PASS_DISCOUNT_OPTIONS = [0, 10, 20, 30, 50];

export const PASS_FORM_VALIDATION = {
  bankNameMin: "Vui lòng nhập tên ngân hàng",
  bankCodeMin: "Vui lòng chọn mã ngân hàng",
  accountNumberMin: "Số tài khoản phải từ 6 chữ số",
  accountHolderMin: "Vui lòng nhập tên chủ tài khoản",
};
