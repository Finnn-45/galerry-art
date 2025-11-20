"use client";

import { createContext, useContext, useState } from "react";

type ImageData = { 
  id: string; 
  urls: { small: string; regular: string }; 
  alt_description?: string;
};


type BookmarkContextType = {
  bookmarks: ImageData[];
  toggleBookmark: (img: ImageData) => void;
};

const BookmarkContext = createContext<BookmarkContextType | null>(null);

export function BookmarkProvider({ children }: { children: React.ReactNode }) {
  const [bookmarks, setBookmarks] = useState<ImageData[]>([]);

  const toggleBookmark = (item: ImageData) => {
    setBookmarks((prev) => {
      const exists = prev.some((b) => b.id === item.id);
      return exists
        ? prev.filter((b) => b.id !== item.id)
        : [...prev, item];
    });
  };

  return (
    <BookmarkContext.Provider value={{ bookmarks, toggleBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
}

export const useBookmarks = () => {
  const ctx = useContext(BookmarkContext);
  if (!ctx) throw new Error("useBookmarks must be used within BookmarkProvider");
  return ctx;
};
  