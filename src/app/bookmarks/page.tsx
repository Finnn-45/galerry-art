"use client";

import { useBookmarks } from "../BookmarkContext";
import Link from "next/link";

export default function BookmarksPage() {
  const { bookmarks } = useBookmarks();

  return (
    <div className="min-h-screen p-8 text-white bg-gradient-to-b from-gray-900 via-gray-800 to-black">
      {/* Header */}
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text">
          ⭐ Bookmarks Gallery
        </h1>
        <p className="mt-2 text-gray-400">Koleksi gambar favoritmu</p>
      </header>

      {/* Jika kosong */}
      {bookmarks.length === 0 && (
        <div className="flex flex-col items-center justify-center mt-20">
          <div className="text-6xl">📭</div>
          <p className="mt-4 text-lg text-gray-400">
            Belum ada gambar yang disimpan.
          </p>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {bookmarks.map((img: any) => (
          <Link
            key={img.id}
            href={`/detail/${img.id}`}
            className="relative block overflow-hidden transition-all border shadow-lg group rounded-2xl bg-gray-800/40 backdrop-blur-lg border-white/10 hover:shadow-pink-500/20"
          >
            {/* Image */}
            <img
              src={img.urls.small}
              alt={img.alt_description || "image"}
              className="object-cover w-full h-64 transition-all duration-500 group-hover:scale-110"
            />

            {/* Overlay */}
            <div className="absolute inset-0 flex flex-col justify-end p-4 transition-all opacity-0 group-hover:opacity-100 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
              <p className="text-sm text-gray-300">
                📸 {img.user?.name || "Unknown"}
              </p>
              <p className="text-xs text-pink-400">Klik untuk lihat detail</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
