// Cấu hình Màu sắc Badge & Tên chuẩn dùng chung cho Toàn bộ App
export function getCategoryBadgeConfig(rawCategory?: string) {
  const cat = (rawCategory || "").toLowerCase();

  // 1. Pickleball: Xanh dương
  if (cat.includes("pickleball")) {
    return {
      label: "Pickleball",
      badgeStyle:
        "bg-blue-500/15 text-blue-700 dark:text-blue-400 border-blue-500/30",
    };
  }

  // 2. Cầu lông: Xanh lá
  if (cat.includes("badminton") || cat.includes("cầu lông")) {
    return {
      label: "Cầu lông",
      badgeStyle:
        "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30",
    };
  }

  // 3. Quần vợt: Cam
  if (cat.includes("tennis") || cat.includes("quần vợt")) {
    return {
      label: "Quần vợt",
      badgeStyle:
        "bg-orange-500/15 text-orange-700 dark:text-orange-400 border-orange-500/30",
    };
  }

  // 4. Bóng đá: Xanh ngọc
  if (cat.includes("football") || cat.includes("bóng đá")) {
    return {
      label: "Bóng đá",
      badgeStyle:
        "bg-teal-500/15 text-teal-700 dark:text-teal-400 border-teal-500/30",
    };
  }

  // 5. Bóng rổ: Cam
  if (cat.includes("basketball") || cat.includes("bóng rổ")) {
    return {
      label: "Bóng rổ",
      badgeStyle:
        "bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30",
    };
  }

  // 6. Bóng chuyền: Tím
  if (
    cat.includes("volleyball") ||
    cat.includes("bóng chuyền") ||
    cat.includes("b.chuyền")
  ) {
    return {
      label: "Bóng chuyền",
      badgeStyle:
        "bg-purple-500/15 text-purple-700 dark:text-purple-400 border-purple-500/30",
    };
  }

  return {
    label: rawCategory || "Sân tập",
    badgeStyle: "bg-primary/10 text-primary border-primary/20",
  };
}
