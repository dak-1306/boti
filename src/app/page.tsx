"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { SplashScreen } from "@/components/common/SplashScreen";
import { APP_CONFIG } from "@/constants/appConfig";

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/home");
    }, APP_CONFIG.splashDuration || 1800);

    return () => clearTimeout(timer);
  }, [router]);

  return <SplashScreen />;
}
