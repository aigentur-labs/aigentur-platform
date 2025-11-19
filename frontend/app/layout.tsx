import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Aigentur Blog",
  description: "AI-optimized blog frontend powered by Aigentur.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}