import type { Metadata } from "next";
import "./globals.css";
import { ReduxProvider } from "@/components/ReduxProvider";
import { ThemeRegistry } from "@/components/ThemeRegistry";
import { AuthGuard } from "@/components/AuthGuard";
import { AuthInitializer } from "@/components/AuthInitializer";

export const metadata: Metadata = {
  title: "Infraseed Admin",
  description: "Infraseed admin page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <ThemeRegistry>
            <AuthInitializer />
            <AuthGuard>{children}</AuthGuard>
          </ThemeRegistry>
        </ReduxProvider>
      </body>
    </html>
  );
}
