import { Home, Calendar, Newspaper, User } from "lucide-react";

export const NAV_ITEMS = [
  { id: "home", label: "Trang chủ", icon: Home, href: "/home" },
  { id: "bookings", label: "Lịch đặt", icon: Calendar, href: "/bookings" },
  { id: "news", label: "Tin tức", icon: Newspaper, href: "/news" },
  { id: "account", label: "Tài khoản", icon: User, href: "/account" },
] as const;
