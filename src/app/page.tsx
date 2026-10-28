// src/app/page.tsx
import { redirect } from "next/navigation";

export default function RootPage() {
  // Chuyển hướng tức thì ngay tại Server-side trước khi gửi HTML về Client
  redirect("/home");
}
