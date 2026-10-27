import { create } from "zustand";
import { newsService, NewsItem } from "@/services/news.service";

interface NewsState {
  newsList: NewsItem[];
  selectedNews: NewsItem | null;
  isLoading: boolean;
  fetchNews: () => Promise<void>;
  fetchNewsById: (id: string) => Promise<void>;
}

export const useNewsStore = create<NewsState>((set) => ({
  newsList: [],
  selectedNews: null,
  isLoading: false,

  fetchNews: async () => {
    set({ isLoading: true });
    const res = await newsService.getNews();
    if (res.success) {
      set({ newsList: res.data });
    }
    set({ isLoading: false });
  },

  fetchNewsById: async (id) => {
    set({ isLoading: true });
    const res = await newsService.getNewsById(id);
    if (res.success) {
      set({ selectedNews: res.data });
    }
    set({ isLoading: false });
  },
}));
