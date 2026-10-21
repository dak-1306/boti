import { useState, useEffect } from "react";
import { APP_CONFIG } from "@/constants/appConfig";

export const useSplashScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, APP_CONFIG.splashDuration);

    return () => clearTimeout(timer);
  }, []);

  return { isLoading };
};
