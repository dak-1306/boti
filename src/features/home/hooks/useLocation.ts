import { useState, useCallback } from "react";
import { LocationState } from "../types/home.types";

export function useLocation() {
  const [userLocation, setUserLocation] = useState<LocationState | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationError("Trình duyệt không hỗ trợ định vị GPS.");
      return;
    }

    setIsLoadingLocation(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setIsLoadingLocation(false);
      },
      (error) => {
        setIsLoadingLocation(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationError("Bạn đã từ chối quyền truy cập vị trí.");
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationError("Không thể xác định vị trí hiện tại.");
            break;
          case error.TIMEOUT:
            setLocationError("Yêu cầu định vị hết thời gian phản hồi.");
            break;
          default:
            setLocationError("Lỗi không xác định khi định vị.");
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  }, []);

  return {
    userLocation,
    isLoadingLocation,
    locationError,
    requestLocation,
  };
}
