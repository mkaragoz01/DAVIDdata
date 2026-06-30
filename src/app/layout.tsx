import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import MobileHeader from "@/components/MobileHeader";

export const metadata: Metadata = {
  title: "DAVIData — Kişisel Finans Takibi",
  description: "Gelir, gider ve yatırımlarınızı tek panelden yönetin.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        {/* Mobile header (hamburger + logo) */}
        <MobileHeader />

        <div style={{ display: "flex", minHeight: "100vh" }}>
          <Sidebar />
          <main style={{
            flex: 1,
            minWidth: 0,
            padding: "clamp(16px, 4vw, 40px)",
            paddingTop: "calc(var(--header-h) + clamp(16px, 3vw, 32px))",
            maxWidth: "1400px",
            margin: "0 auto",
            width: "100%",
          }}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
