"use client";

import React from "react";
import { BottomNav } from "@/components/common/bottom-nav";
import { NewsHeader } from "@/features/news/components/NewsHeader";
import { NewsCategoryTabs } from "@/features/news/components/NewsCategoryTabs";
import { NewsList } from "@/features/news/components/NewsList";
import { NewsDetailDrawer } from "@/features/news/components/NewsDetailDrawer";
import { useNews } from "@/features/news/hooks/useNews";

export default function NewsPage() {
  const {
    isLoading,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    featuredNews,
    newsList,
    detailNews,
    openDetailDrawer,
    closeDetailDrawer,
    handleResetSearch,
  } = useNews();

  // SKELETON LOADING KHỚP 1:1 CHO TRANG TIN TỨC
  if (isLoading) {
    return (
      <div className="flex h-full w-full flex-col overflow-hidden bg-background text-foreground">
        <div className="shrink-0 z-10">
          <NewsHeader
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
          <NewsCategoryTabs
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        <div className="flex-1 overflow-y-auto pt-2 pb-20 no-scrollbar">
          <div className="sm:mx-auto sm:max-w-[390px] w-full px-4 space-y-4 animate-pulse">
            {/* Featured Article Skeleton */}
            <div className="space-y-2">
              <div className="h-3 w-28 rounded-md bg-muted" />
              <div className="overflow-hidden rounded-2xl border border-border bg-card">
                <div className="h-44 w-full bg-muted" />
                <div className="p-3 space-y-2">
                  <div className="h-4 w-4/5 rounded-md bg-muted" />
                  <div className="h-3 w-full rounded-md bg-muted" />
                  <div className="flex justify-between items-center pt-1">
                    <div className="h-3 w-20 rounded-md bg-muted" />
                    <div className="h-3 w-16 rounded-md bg-muted" />
                  </div>
                </div>
              </div>
            </div>

            {/* News Item List Skeleton */}
            <div className="space-y-2.5">
              <div className="h-3 w-24 rounded-md bg-muted mb-2" />
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-2xl border border-border bg-card"
                >
                  <div className="h-20 w-20 rounded-xl bg-muted shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3.5 w-full rounded-md bg-muted" />
                    <div className="h-3 w-4/5 rounded-md bg-muted" />
                    <div className="h-2.5 w-1/2 rounded-md bg-muted" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <BottomNav activeTab="news" />
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-background text-foreground">
      <div className="shrink-0 z-10">
        <NewsHeader searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <NewsCategoryTabs
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </div>

      <div className="flex-1 overflow-y-auto pt-2 pb-20 no-scrollbar">
        <div className="sm:mx-auto sm:max-w-[390px] w-full">
          <NewsList
            featuredNews={featuredNews}
            newsList={newsList}
            onSelectNews={openDetailDrawer}
            onResetSearch={handleResetSearch}
          />
        </div>
      </div>

      <BottomNav activeTab="news" />

      <NewsDetailDrawer
        news={detailNews}
        isOpen={!!detailNews}
        onClose={closeDetailDrawer}
      />
    </div>
  );
}
