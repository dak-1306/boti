import { useMemo } from "react";
import { NewsItem } from "../types/news.types";
import rawNewsMock from "../data/news.mock.json";

export function useNewsDetail(id?: string) {
  const targetId = id || "n_01";

  const news = useMemo<NewsItem>(() => {
    const list = rawNewsMock as unknown as NewsItem[];
    const found = list.find((n) => n.id === targetId || n.slug === targetId);
    return found || list[0];
  }, [targetId]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: news.title,
          text: news.summary,
          url: window.location.href,
        });
      } catch {
        // Hủy chia sẻ
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Đã sao chép liên kết bài viết!");
    }
  };

  return {
    news,
    handleShare,
  };
}
