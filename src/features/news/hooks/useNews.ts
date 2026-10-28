"use client";

import { useState, useMemo } from "react";
import { NewsItem, NewsCategoryFilter } from "../types/news.types";
import { useNewsQuery } from "./useNewsQuery";

export function useNews() {
  const { data: newsList = [], isLoading } = useNewsQuery();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<NewsCategoryFilter>("all");
  const [detailNews, setDetailNews] = useState<NewsItem | null>(null);

  const featuredNews = useMemo(() => {
    return newsList.find((item) => item.isFeatured) || newsList[0];
  }, [newsList]);

  const filteredNews = useMemo(() => {
    return newsList.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || item.categorySlug === selectedCategory;

      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, newsList]);

  return {
    isLoading,
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
