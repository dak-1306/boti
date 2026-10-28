import { useQuery } from "@tanstack/react-query";
import { newsService } from "@/services/news.service";

export const newsKeys = {
  all: ["news"] as const,
  detail: (id: string) => ["news", id] as const,
};

export function useNewsQuery() {
  return useQuery({
    queryKey: newsKeys.all,
    queryFn: async () => {
      const res = await newsService.getNews();
      if (!res.success || !res.data) {
        throw new Error(res.message || "Không thể tải danh sách tin tức");
      }
      return res.data;
    },
  });
}

export function useNewsDetailQuery(id?: string) {
  return useQuery({
    queryKey: newsKeys.detail(id || ""),
    queryFn: async () => {
      if (!id) return null;
      const res = await newsService.getNewsById(id);
      if (!res.success || !res.data) {
        throw new Error(res.message || "Không tìm thấy bài viết");
      }
      return res.data;
    },
    enabled: !!id,
  });
}
