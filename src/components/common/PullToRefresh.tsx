"use client";

import React, { useState, useRef, useCallback } from "react";
import { Loader2, ArrowDown } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { cn } from "@/lib/utils";

interface PullToRefreshProps {
  children: React.ReactNode;
  onRefresh?: () => Promise<unknown>;
  className?: string;
  pullThreshold?: number; // Khoảng cách kéo tối thiểu để kích hoạt (mặc định 70px)
}

export function PullToRefresh({
  children,
  onRefresh,
  className,
  pullThreshold = 70,
}: PullToRefreshProps) {
  const queryClient = useQueryClient();
  const containerRef = useRef<HTMLDivElement>(null);

  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isPulling, setIsPulling] = useState(false); // 👈 Chuyển sang State thay vì Ref

  const touchStartY = useRef(0);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container || isRefreshing) return;

    // Chỉ cho phép kéo khi đang ở đỉnh đầu trang
    if (container.scrollTop === 0) {
      touchStartY.current = e.touches[0].clientY;
      setIsPulling(true);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container || !isPulling || isRefreshing) return;

    const currentY = e.touches[0].clientY;
    const diff = currentY - touchStartY.current;

    // Chỉ tính khi người dùng vuốt xuống & ở vị trí scrollTop = 0
    if (diff > 0 && container.scrollTop === 0) {
      // Công thức tạo độ cản elastic nhẹ nhàng (Dampening)
      const distance = Math.min(diff * 0.45, pullThreshold * 1.5);
      setPullDistance(distance);

      // Tránh cuộn trang trùng lặp của trình duyệt
      if (e.cancelable && distance > 10) {
        e.preventDefault();
      }
    } else {
      setPullDistance(0);
      setIsPulling(false);
    }
  };

  const handleTouchEnd = useCallback(async () => {
    if (!isPulling && !isRefreshing) return;
    setIsPulling(false);

    if (pullDistance >= pullThreshold) {
      setIsRefreshing(true);
      setPullDistance(pullThreshold);

      try {
        if (onRefresh) {
          await onRefresh();
        } else {
          // Mặc định tự động làm mới tất cả API Cache của TanStack Query
          await queryClient.invalidateQueries();
        }
      } catch (error) {
        console.error("Refresh failed:", error);
      } finally {
        setIsRefreshing(false);
        setPullDistance(0);
      }
    } else {
      setPullDistance(0);
    }
  }, [
    isPulling,
    isRefreshing,
    pullDistance,
    pullThreshold,
    onRefresh,
    queryClient,
  ]);

  const progress = Math.min(pullDistance / pullThreshold, 1);

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className={cn("relative flex-1 overflow-y-auto no-scrollbar", className)}
    >
      {/* Indicator Icon kéo xuống / Spinner Loading */}
      <div
        style={{
          transform: `translate3d(0, ${pullDistance}px, 0)`,
          opacity: pullDistance > 10 || isRefreshing ? 1 : 0,
        }}
        className="pointer-events-none absolute top-0 left-0 right-0 z-30 flex -translate-y-full items-center justify-center py-2 transition-opacity duration-200 ease-out will-change-transform"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-card border border-border shadow-md text-primary">
          {isRefreshing ? (
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
          ) : (
            <ArrowDown
              className="h-4 w-4 transition-transform duration-150"
              style={{
                transform: `rotate(${progress * 180}deg)`,
              }}
            />
          )}
        </div>
      </div>

      {/* Khung nội dung được di chuyển mượt bằng GPU */}
      <div
        style={{
          transform: `translate3d(0, ${pullDistance}px, 0)`,
          transition: isPulling
            ? "none"
            : "transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)", // 👈 Sử dụng state isPulling an toàn trong render
        }}
        className="will-change-transform flex-1"
      >
        {children}
      </div>
    </div>
  );
}
