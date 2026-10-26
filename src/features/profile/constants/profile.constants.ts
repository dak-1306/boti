import { ProfileMenuGroup } from "../types/profile.types";

export const PROFILE_TEXTS = {
  pageTitle: "Cá nhân",
  zaloVerifiedBadge: "Zalo Verified",
  editProfileTitle: "Chỉnh sửa hồ sơ",
  changeAvatarTitle: "Đổi ảnh đại diện",
  changeAvatarSuccess: "Đã đổi ảnh đại diện thành công!",
  promptAvatarUrl: "Nhập URL hình ảnh avatar mới:",
  bankCardTitle: "Tài khoản nhận hoàn tiền",
  bankCardEditBtn: "Thay đổi",
  copySuccess: "Đã sao chép!",
  copyTooltip: "Sao chép STK",
  labelBank: "Ngân hàng:",
  labelAccountNo: "Số tài khoản:",
  labelAccountHolder: "Chủ tài khoản:",
  logoutDialogTitle: "Xác nhận đăng xuất",
  drawerTitle: "Cập nhật Hồ sơ & Ngân hàng",
  drawerSectionRefund: "Tài khoản nhận tiền khi hủy lịch",
  labelFullName: "Họ và tên",
  labelPhone: "Số điện thoại",
  labelEmail: "Email",
  labelSelectBank: "Ngân hàng",
  btnCancel: "Hủy",
  btnSave: "Lưu thay đổi",
  zaloSupportAlert: "Đang chuyển hướng sang Zalo OA CSKH...",
  termsAlert: "Boti Sports Platform v1.0.0 - Điều khoản dịch vụ & Bảo mật.",
  logoutConfirm: "Bạn có chắc chắn muốn đăng xuất khỏi Zalo Mini App?",
  logoutSuccessAlert: "Đã đăng xuất thành công!",
  updateSuccessToast: "Cập nhật thông tin thành công!",
} as const;

export const POPULAR_BANKS = [
  { code: "MB", name: "MB Bank" },
  { code: "VCB", name: "Vietcombank" },
  { code: "TCB", name: "Techcombank" },
  { code: "VPB", name: "VPBank" },
  { code: "ACB", name: "ACB" },
  { code: "BIDV", name: "BIDV" },
  { code: "CTG", name: "VietinBank" },
  { code: "TPB", name: "TPBank" },
] as const;

export const PROFILE_MENU_GROUPS: ProfileMenuGroup[] = [
  {
    groupTitle: "Tài khoản & Thanh toán",
    items: [
      {
        id: "edit_profile",
        label: "Thông tin cá nhân & Ngân hàng hoàn tiền",
        iconName: "UserCheck",
        actionType: "drawer",
      },
      {
        id: "tx_history",
        label: "Lịch sử giao dịch thanh toán",
        iconName: "History",
        actionType: "navigate",
        path: "/bookings",
      },
    ],
  },
  {
    groupTitle: "Cài đặt & Tiện ích",
    items: [
      {
        id: "notifications",
        label: "Thông báo nhắc lịch chơi",
        iconName: "Bell",
        actionType: "toggle",
      },
      {
        id: "zalo_sync",
        label: "Đồng bộ tài khoản Zalo",
        iconName: "Smartphone",
        badgeText: "Đã liên kết",
        badgeVariant: "success",
        actionType: "action",
      },
    ],
  },
  {
    groupTitle: "Hỗ trợ & Hệ thống",
    items: [
      {
        id: "support",
        label: "Trung tâm hỗ trợ Zalo OA",
        iconName: "Headphones",
        actionType: "action",
      },
      {
        id: "terms",
        label: "Điều khoản & Bảo mật",
        iconName: "FileText",
        actionType: "action",
      },
      {
        id: "logout",
        label: "Đăng xuất / Thoát Mini App",
        iconName: "LogOut",
        actionType: "logout",
      },
    ],
  },
];
