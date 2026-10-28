"use client";

import { useNewsDetailQuery } from "./useNewsQuery";

export function useNewsDetail(id?: string) {
  const targetId = id || "n_01";
  const { data: news, isLoading } = useNewsDetailQuery(targetId);

  const handleShare = async () => {
    if (!news) return;

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
    isLoading,
    handleShare,
  };
}
