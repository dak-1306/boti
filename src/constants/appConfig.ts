export const APP_CONFIG = {
  name: "Boti",
  description: "Ứng dụng đặt sân thể thao nhanh chóng và tiện lợi",
  splashDuration: 2000, // Thời gian hiển thị Splash Screen (ms)

  USE_MOCK_API: true, // 👈 Đổi thành false để chuyển sang dùng Backend thật
  API_BASE_URL: process.env.NEXT_PUBLIC_API_URL || "https://api.tabby.vn/v1",
  MOCK_DELAY_MS: 300,

  mobileFrame: {
    maxWidth: "430px",
    maxHeight: "932px",
  },
} as const;
