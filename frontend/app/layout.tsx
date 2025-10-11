import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { AuthProvider } from "@/lib/auth-context";
import "./globals.css";

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial", "sans-serif"],
});

export const metadata: Metadata = {
  title: {
    default: "ClassFellow - Your AI Study Companion",
    template: "%s | ClassFellow",
  },
  description:
    "Record lectures, get instant transcriptions and summaries. ClassFellow captures your classes in real-time so you can focus on learning instead of taking notes.",
  keywords: [
    "lecture recording app",
    "AI note taking",
    "lecture transcription",
    "study app for college",
    "class recording software",
    "automatic lecture notes",
    "student productivity tool",
    "college study assistant",
  ],
  authors: [{ name: "ClassFellow" }],
  creator: "ClassFellow",
  publisher: "ClassFellow",
  metadataBase: new URL("https://classfellow.developertest.cloud"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://classfellow.developertest.cloud",
    title: "ClassFellow - Your AI Study Companion",
    description:
      "Record lectures, get instant transcriptions and summaries. Focus on learning, not note-taking.",
    siteName: "ClassFellow",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "ClassFellow - Lecture Recording App",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: [
    { rel: "apple-touch-icon", url: "/images/logo.svg" },
    { rel: "icon", url: "/images/logo.svg" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jakartaSans.variable}>
      <body className="font-sans antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}