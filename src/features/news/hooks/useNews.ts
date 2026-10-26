import { useState, useMemo } from "react";
import { NewsItem, NewsCategoryFilter } from "../types/news.types";
import rawNewsMock from "../data/news.mock.json";

export function useNews() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<NewsCategoryFilter>("all");
  const [detailNews, setDetailNews] = useState<NewsItem | null>(null);

  const initialNews = rawNewsMock as unknown as NewsItem[];

  const featuredNews = useMemo(() => {
    return initialNews.find((item) => item.isFeatured) || initialNews[0];
  }, [initialNews]);

  const filteredNews = useMemo(() => {
    return initialNews.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || item.categorySlug === selectedCategory;

      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, initialNews]);

  return {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    featuredNews,
    newsList: filteredNews,
    detailNews,
    openDetailDrawer: (item: NewsItem) => setDetailNews(item),
    closeDetailDrawer: () => setDetailNews(null),
    handleResetSearch: () => {
      setSearchQuery("");
      setSelectedCategory("all");
    },
  };
}
