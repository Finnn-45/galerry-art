"use client";

import { useBookmarks } from "@/components/BookmarkContext";
import ImageModal from "@/components/ImageModal";

type ImageData = {
  id: string;
  urls: { small: string; regular: string };
  alt_description: string | null;
  user: { name: string; links: { html: string } };
  links: { html: string };
};

export default function BookmarksPage() {
  const { bookmarks } = useBookmarks();

  return (
    <main className="px-6 py-8">
      <h1 className="mb-6 text-2xl font-bold">Your Bookmarks</h1>

      {bookmarks.length === 0 && (
        <p className="text-gray-500">No bookmarks yet.</p>
      )}

      <div className="gap-4 columns-2 sm:columns-3 md:columns-4">
        {bookmarks.map((img: ImageData) => (
          <div key={img.id} className="relative mb-4 break-inside-avoid">
            
            {/* Modal Trigger */}
            <ImageModal img={img} />

            {/* Info overlay */}
            <div className="absolute flex items-center justify-between p-2 text-sm text-white rounded-md bottom-2 left-2 right-2 bg-black/60">
              <span className="font-semibold">{img.user.name}</span>
              <a
                href={img.links.html}
                target="_blank"
                className="text-xs text-blue-400 underline"
              >
                Unsplash
              </a>
            </div>

          </div>
        ))}
      </div>
    </main>
  );
}
