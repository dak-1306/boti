import rawUserMock from "@/data/user.mock.json";
import rawVenuesMock from "@/data/venues.mock.json";
import rawNewsMock from "@/data/news.mock.json";

const STORAGE_KEYS = {
  USER: "boti_mock_user",
  VENUES: "boti_mock_venues",
  BOOKINGS: "boti_mock_bookings",
  NEWS: "boti_mock_news",
} as const;

type StorageKey = keyof typeof STORAGE_KEYS;

export const mockDb = {
  init: (): void => {
    if (typeof window === "undefined") return;
    if (!localStorage.getItem(STORAGE_KEYS.USER)) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(rawUserMock));
    }
    if (!localStorage.getItem(STORAGE_KEYS.VENUES)) {
      localStorage.setItem(STORAGE_KEYS.VENUES, JSON.stringify(rawVenuesMock));
    }
    if (!localStorage.getItem(STORAGE_KEYS.BOOKINGS)) {
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify([]));
    }
    if (!localStorage.getItem(STORAGE_KEYS.NEWS)) {
      localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(rawNewsMock));
    }
  },

  get: <T>(key: StorageKey): T => {
    if (typeof window === "undefined") return [] as unknown as T;
    mockDb.init();
    const raw = localStorage.getItem(STORAGE_KEYS[key]);
    return raw ? (JSON.parse(raw) as T) : ([] as unknown as T);
  },

  set: <T>(key: StorageKey, value: T): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEYS[key], JSON.stringify(value));
  },
};
