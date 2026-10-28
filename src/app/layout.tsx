import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import { MobileContainer } from "@/components/layout/MobileContainer";
import { QueryProvider } from "@/providers/query-provider";
import { APP_CONFIG } from "@/constants/appConfig";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const beVietnamPro = Be_Vietnam_Pro({
  weight: ["400", "500", "600", "700"],
  subsets: ["vietnamese", "latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: APP_CONFIG.name,
  description: APP_CONFIG.description,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${beVietnamPro.variable} h-full antialiased`}>
      <body className="h-[100dvh] w-full overflow-hidden bg-background text-foreground font-sans antialiased">
        <QueryProvider>
          <Toaster />
          <MobileContainer>{children}</MobileContainer>
        </QueryProvider>
      </body>
    </html>
  );
}
