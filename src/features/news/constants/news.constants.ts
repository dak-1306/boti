import { NewsCategoryFilter } from "../types/news.types";

export const NEWS_TEXTS = {
  pageTitle: "Tin tức & Ưu đãi",
  searchPlaceholder: "Tìm kiếm bài viết, tin tức, giải đấu...",
  featuredTitle: "Tin nổi bật",
  allNewsTitle: "Bài viết mới nhất",
  emptyTitle: "Không tìm thấy bài viết",
  emptySubtitle: "Thử tìm kiếm với từ khóa khác hoặc chuyển danh mục.",
  clearSearchBtn: "Xóa tìm kiếm",
  readMore: "Đọc tiếp",
  shareBtn: "Chia sẻ bài viết",
  shareSuccess: "Đã sao chép liên kết bài viết!",
  viewsLabel: "lượt xem",
  backBtn: "Quay lại",
} as const;

export interface CategoryOption {
  id: NewsCategoryFilter;
  label: string;
}

export const NEWS_CATEGORIES: CategoryOption[] = [
  { id: "all", label: "Tất cả" },
  { id: "promotion", label: "Khuyến mãi" },
  { id: "tournament", label: "Giải đấu" },
  { id: "tips", label: "Mẹo & Kinh nghiệm" },
  { id: "system", label: "Thông báo" },
];
