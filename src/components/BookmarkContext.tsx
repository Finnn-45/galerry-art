"use client";

import { createContext, useContext, useState, ReactNode } from "react";

/**
 * Single source of truth untuk data gambar
 * Disesuaikan dengan field yang benar-benar dipakai di UI
 */
export type ImageData = {
  id: string;
  alt_description: string | null;

  urls: {
    small: string;
    regular: string;
  };

  user: {
    name: string;
  };

  links: {
    html: string;
  };
};

type BookmarkContextType = {
  bookmarks: ImageData[];
  toggleBookmark: (img: ImageData) => void;
};

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export function BookmarkProvider({ children }: { children: ReactNode }) {
  const [bookmarks, setBookmarks] = useState<ImageData[]>([]);

  const toggleBookmark = (img: ImageData) => {
    setBookmarks((prev) => {
      const exists = prev.some((b) => b.id === img.id);
      return exists ? prev.filter((b) => b.id !== img.id) : [...prev, img];
    });
  };

  return (
    <BookmarkContext.Provider value={{ bookmarks, toggleBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmarks() {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error("useBookmarks must be used within BookmarkProvider");
  }
  return context;
}
