"use client";

import { useBookmarks } from "@/components/BookmarkContext";
import ImageModal from "@/components/ImageModal";

export default function BookmarksPage() {
  const { bookmarks } = useBookmarks();

  return (
    <div className="p-10">
      <h1 className="mb-6 text-2xl font-bold">Your Bookmarks</h1>

      {bookmarks.length === 0 && (
        <p className="text-gray-500">No bookmarks yet.</p>
      )}

      {/* MASONRY LAYOUT */}
      <div className="gap-4 columns-2 sm:columns-3 md:columns-4">
        {bookmarks.map((img) => (
          <div key={img.id} className="mb-4 break-inside-avoid">
            <img
              src={img.urls.small}
              alt={img.alt_description ?? "image"}
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
