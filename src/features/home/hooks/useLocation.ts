"use client";

import { useState, useCallback } from "react";
import { toast } from "sonner";
import { LocationState } from "../types/home.types";

export function useLocation() {
  const [userLocation, setUserLocation] = useState<LocationState | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  const requestLocation = useCallback(() => {
    // 1. Kiểm tra hỗ trợ Geolocation
    if (!navigator.geolocation) {
      const msg = "Trình duyệt không hỗ trợ định vị GPS.";
      setLocationError(msg);
      toast.error(msg);
      return;
    }

    // 2. Kiểm tra điều kiện HTTPS (Secure Context)
    if (
      typeof window !== "undefined" &&
      !window.isSecureContext &&
      window.location.hostname !== "localhost" &&
      window.location.hostname !== "127.0.0.1"
    ) {
      const msg = "Định vị yêu cầu kết nối an toàn (HTTPS).";
      setLocationError(msg);
      toast.error(msg, {
        description: "Vui lòng truy cập qua HTTPS hoặc Vercel/Ngrok.",
      });
      return;
    }

    setIsLoadingLocation(true);
    setLocationError(null);

    const handleSuccess = (position: GeolocationPosition) => {
      setUserLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      setIsLoadingLocation(false);
      toast.success("Đã cập nhật vị trí của bạn!");
    };

    const handleError = (error: GeolocationPositionError) => {
      setIsLoadingLocation(false);
      let errorMsg = "Lỗi không xác định khi định vị.";

      switch (error.code) {
        case error.PERMISSION_DENIED:
          errorMsg = "Bạn đã từ chối quyền truy cập vị trí trên trình duyệt.";
          break;
        case error.POSITION_UNAVAILABLE:
          errorMsg = "Không thể xác định vị trí hiện tại.";
          break;
        case error.TIMEOUT:
          errorMsg = "Yêu cầu định vị hết thời gian phản hồi (Timeout).";
          break;
      }

      setLocationError(errorMsg);
      toast.error(errorMsg);
    };

    // 3. Gọi Geolocation API với thời gian chờ 15 giây
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError, {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 30000, // Chấp nhận vị trí cũ trong vòng 30 giây để phản hồi nhanh
    });
  }, []);

  return {
    userLocation,
    isLoadingLocation,
    locationError,
    requestLocation,
  };
}
