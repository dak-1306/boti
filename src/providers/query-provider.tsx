"use client";

import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // Cache dữ liệu trong 5 phút
            gcTime: 1000 * 60 * 30, // Giữ garbage collection trong 30 phút
            refetchOnWindowFocus: false, // Tránh tự refetch không cần thiết khi switch tab
            retry: 1,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
