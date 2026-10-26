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
