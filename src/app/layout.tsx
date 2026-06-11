import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { ProbixProvider } from "@/store/ProbixContext";
import { Toaster } from 'sonner';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Probix2 | Africa's Premier Prediction Node",
  description: "Synchronize with high-fidelity prediction markets across Nigeria and Africa. Trade outcomes, established nodes, and institutional-grade data.",
  keywords: ["prediction market", "nigeria", "africa", "forecast", "trading", "crypto", "naira"],
  authors: [{ name: "Probix Team" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#050505",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-probix-bg`}>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ProbixProvider>
            {children}
            <Toaster position="top-right" richColors theme="dark" expand={false} />
          </ProbixProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
