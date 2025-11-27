import "./globals.css";
import type { ReactNode } from "react";
import { NavbarMenu } from "@/components/ui/navbar-menu";
import { BookmarkProvider } from "@/components/BookmarkContext";


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="text-white bg-black">
        <NavbarMenu />

        <BookmarkProvider>
          <main className="pt-4">{children}</main>
        </BookmarkProvider>
      </body>
    </html>
  );
}
