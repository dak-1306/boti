export interface NewsItem {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string[];
  category: string;
  categorySlug: string;
  imageUrl: string;
  author: string;
  publishedAt: string;
  readTime: string;
  views: number;
  isFeatured?: boolean;
  tags?: string[];
}

export type NewsCategoryFilter =
  | "all"
  | "promotion"
  | "tournament"
  | "tips"
  | "system";

export interface NewsFilterState {
  category: NewsCategoryFilter;
  searchQuery: string;
}
