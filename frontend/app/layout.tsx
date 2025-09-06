import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ClassFellow",
  description:
    "Your AI study partner for recording, summarizing, and organizing lectures and references.",
  icons: [
    { rel: "apple-touch-icon", url: "/images/logo.svg" },
    {
      rel: "icon",
      url: "/images/logo.svg",
    },
    {
      rel: "icon",
      url: "/images/logo.svg",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
