import { apiClient } from "@/lib/api-client";
import { ApiResponse } from "@/types/api.types";

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content?: string;
  imageUrl: string;
  publishedAt: string;
  category?: string;
}

export const newsService = {
  getNews: (): Promise<ApiResponse<NewsItem[]>> => {
    return apiClient.get<NewsItem[]>("/news");
  },

  getNewsById: (id: string): Promise<ApiResponse<NewsItem>> => {
    return apiClient.get<NewsItem>(`/news/${id}`);
  },
};
