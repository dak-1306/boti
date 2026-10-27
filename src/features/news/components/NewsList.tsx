"use client";

import React from "react";
import { FileQuestion } from "lucide-react";
import { NewsItem } from "../types/news.types";
import { FeaturedNewsCard } from "./FeaturedNewsCard";
import { NewsCard } from "./NewsCard";
import { NEWS_TEXTS } from "../constants/news.constants";
import { Button } from "@/components/ui/button";
import { StaggerGroup } from "@/components/motion/StaggerGroup";

interface NewsListProps {
  featuredNews?: NewsItem;
  newsList: NewsItem[];
  onSelectNews: (item: NewsItem) => void;
  onResetSearch: () => void;
}

export function NewsList({
  featuredNews,
  newsList,
  onSelectNews,
  onResetSearch,
}: NewsListProps) {
  if (newsList.length === 0) {
    return (
      <StaggerGroup className="flex h-64 flex-col items-center justify-center p-6 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          <FileQuestion className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="mt-3 text-sm font-bold text-foreground">
          {NEWS_TEXTS.emptyTitle}
        </h3>
        <p className="mt-1 text-xs text-muted-foreground">
          {NEWS_TEXTS.emptySubtitle}
        </p>
        <Button
          onClick={onResetSearch}
          className="mt-4 h-11 rounded-full bg-muted px-4 text-xs font-bold text-primary hover:bg-muted/80"
        >
          {NEWS_TEXTS.clearSearchBtn}
        </Button>
      </StaggerGroup>
    );
  }

  return (
    <div className="space-y-4 px-4 pb-4">
      {featuredNews && (
        <StaggerGroup className="space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            {NEWS_TEXTS.featuredTitle}
          </h2>
          <FeaturedNewsCard
            news={featuredNews}
            onClick={() => onSelectNews(featuredNews)}
          />
        </StaggerGroup>
      )}

      <StaggerGroup className="space-y-2">
        <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          {NEWS_TEXTS.allNewsTitle}
        </h2>
        <StaggerGroup className="space-y-2.5">
          {newsList.map((item) => (
            <NewsCard
              key={item.id}
              news={item}
              onClick={() => onSelectNews(item)}
            />
          ))}
        </StaggerGroup>
      </StaggerGroup>
    </div>
  );
}
