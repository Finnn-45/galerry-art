import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { BookmarkProvider } from "./BookmarkContext";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gallery Art",
  description: "Create by pindes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        <BookmarkProvider>
          {/* Navbar fixed / floating */}
         

          {/* Konten halaman */}
          <main className="pt-4">{children}</main>
        </BookmarkProvider>
      </body>
    </html>
  );
}
