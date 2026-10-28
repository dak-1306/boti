import { BadgeVariant } from "@/components/ui/badge";

export interface CategoryMeta {
  variant: BadgeVariant;
  label: string;
}

const CATEGORY_MAP: Record<string, CategoryMeta> = {
  // --- Môn thể thao ---
  pickleball: { variant: "pickleball", label: "Pickleball" },
  badminton: { variant: "badminton", label: "Cầu lông" },
  "cầu lông": { variant: "badminton", label: "Cầu lông" },
  tennis: { variant: "tennis", label: "Quần vợt" },
  "quần vợt": { variant: "tennis", label: "Quần vợt" },
  football: { variant: "football", label: "Bóng đá" },
  "bóng đá": { variant: "football", label: "Bóng đá" },
  basketball: { variant: "basketball", label: "Bóng rổ" },
  "bóng rổ": { variant: "basketball", label: "Bóng rổ" },
  volleyball: { variant: "volleyball", label: "Bóng chuyền" },
  "bóng chuyền": { variant: "volleyball", label: "Bóng chuyền" },
  "b.chuyền": { variant: "volleyball", label: "Bóng chuyền" },

  // --- Tin tức & Ưu đãi ---
  promotion: { variant: "promotion", label: "Khuyến mãi" },
  "khuyến mãi": { variant: "promotion", label: "Khuyến mãi" },
  tournament: { variant: "tournament", label: "Giải đấu" },
  "giải đấu": { variant: "tournament", label: "Giải đấu" },
  tips: { variant: "tips", label: "Mẹo & Kinh nghiệm" },
  "mẹo & kinh nghiệm": { variant: "tips", label: "Mẹo & Kinh nghiệm" },
  mẹo: { variant: "tips", label: "Mẹo & Kinh nghiệm" },
  system: { variant: "system", label: "Thông báo" },
  "thông báo": { variant: "system", label: "Thông báo" },
};

export function getCategoryMeta(rawCategory?: string): CategoryMeta {
  if (!rawCategory) return { variant: "default", label: "Chung" };

  const key = rawCategory.trim().toLowerCase();
  if (CATEGORY_MAP[key]) return CATEGORY_MAP[key];

  const matchedKey = Object.keys(CATEGORY_MAP).find((k) => key.includes(k));
  return matchedKey
    ? CATEGORY_MAP[matchedKey]
    : { variant: "default", label: rawCategory };
}
