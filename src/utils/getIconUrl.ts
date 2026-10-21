import { StaticImageData } from "next/image";

export function getIconUrl(icon: StaticImageData | string | any): string {
  if (!icon) return "";
  
  // 1. Nếu đã là chuỗi URL
  if (typeof icon === "string") return icon;

  // 2. Nếu là Next.js StaticImageData Object
  if (typeof icon === "object") {
    if ("src" in icon && typeof icon.src === "string") return icon.src;
    if ("default" in icon && typeof icon.default === "object" && "src" in icon.default) {
      return icon.default.src;
    }
    if ("default" in icon && typeof icon.default === "string") {
      return icon.default;
    }
  }

  // 3. Nếu Next.js compile SVG thành React Component Function
  if (typeof icon === "function" && (icon as any).src) {
    return (icon as any).src;
  }

  return "";
}