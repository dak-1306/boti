import { Home, TicketPercent, Calendar, Newspaper, User } from "lucide-react";

export const NAV_ITEMS = [
  { id: "home", label: "Trang chủ", icon: Home, href: "/home" },
  { id: "pass", label: "Pass sân", icon: TicketPercent, href: "/pass" },
  { id: "bookings", label: "Lịch đặt", icon: Calendar, href: "/bookings" },
  { id: "news", label: "Tin tức", icon: Newspaper, href: "/news" },
  { id: "profile", label: "Tài khoản", icon: User, href: "/profile" },
] as const;
