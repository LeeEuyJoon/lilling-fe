import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import { Toaster } from "@/components/shadcn/sonner";
import { AuthProvider } from "@/lib/auth-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lilling - Simple URL Shortener",
  description: "무료 URL 단축 변환기",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
          ${geistSans.variable} ${geistMono.variable}
          antialiased flex flex-col min-h-screen
          bg-gray-100
          `}
      >
        <AuthProvider>
          <Navbar />
          <div className="flex-1">{children}</div>
          <Footer />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
