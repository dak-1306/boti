"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { SplashScreen } from "@/features/splash/components/SplashScreen";
import { APP_CONFIG } from "@/constants/appConfig";

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/home");
    }, APP_CONFIG.splashDuration || 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return <SplashScreen />;
}
