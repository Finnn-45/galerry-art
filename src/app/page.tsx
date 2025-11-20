"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useBookmarks } from "./BookmarkContext";

type ImageData = {
  id: string;
  url: string; 
  urls: { small: string; regular: string };
  alt_description: string;
  user: { name: string; links: { html: string } };
  links: { html: string };
};


export default function Home() {
  const [images, setImages] = useState<ImageData[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // ⬇️ Ambil fungsi bookmark
  const { bookmarks, toggleBookmark } = useBookmarks();

  const fetchImages = async (pageNumber: number) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=art&page=${pageNumber}&per_page=15&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
      );
      const data = await res.json();
      setImages((prev) => [...prev, ...data.results]);
    } catch (error) {
      console.error("Gagal memuat gambar:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages(page);
  }, [page]);

  const loadMore = () => setPage((prev) => prev + 1);

  return (
    <main className="min-h-screen p-8 text-white bg-gradient-to-b from-gray-900 via-gray-800 to-black">
      <header className="mb-12 text-center">
        <h1 className="mb-3 text-5xl font-extrabold tracking-tight text-transparent bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text">
          🎨 Art Gallery
        </h1>
        <p className="max-w-xl mx-auto text-lg text-gray-300">
          Jelajahi koleksi karya seni dari seluruh dunia.
        </p>
      </header>

      {/* Gallery */}
      <section className="gap-6 space-y-6 columns-1 sm:columns-2 md:columns-3 lg:columns-4">
        {images.map((img) => {
          const saved = bookmarks.some((b: any) => b.id === img.id);

          return (
            <motion.div
              key={img.id}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="relative overflow-hidden shadow-lg rounded-2xl hover:shadow-2xl hover:brightness-110 group"
            >
              {/* Tombol Bookmark ⭐ */}
              <button
                onClick={() => toggleBookmark(img)}
                className="absolute z-20 px-2 py-1 text-lg text-yellow-400 bg-black/60 rounded-xl top-2 right-2"
              >
                {saved ? "⭐" : "☆"}
              </button>

              {/* Gambar */}
              <a
                href={img.urls.regular}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={img.urls.small}
                  alt={img.alt_description || "Art"}
                  className="object-cover w-full transition-all duration-300 rounded-2xl group-hover:scale-105"
                />
              </a>

              {/* Overlay info */}
              <div className="absolute inset-0 flex flex-col justify-end p-4 transition-all opacity-0 bg-black/50 group-hover:opacity-100">
                <p className="text-sm">
                  📸{" "}
                  <a
                    href={img.user.links.html}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-400 hover:underline"
                  >
                    {img.user.name}
                  </a>
                </p>
                <p className="text-xs text-gray-400">
                  Sumber:{" "}
                  <a
                    href="https://unsplash.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:underline"
                  >
                    Unsplash
                  </a>
                </p>
              </div>
            </motion.div>
          );
        })}
      </section>

      {/* Tombol Load More */}
      <div className="flex justify-center mt-12">
        <button
          onClick={loadMore}
          disabled={loading}
          className="px-6 py-3 font-semibold transition-all rounded-full shadow-lg bg-gradient-to-r from-pink-500 to-purple-600 hover:shadow-pink-500/40 hover:scale-105 disabled:opacity-50"
        >
          {loading ? "Memuat..." : "Tampilkan Lebih Banyak"}
        </button>
      </div>

      <footer className="mt-16 text-sm text-center text-gray-500">
        Dibuat dengan ❤️ menggunakan Next.js & Unsplash API
      </footer>
    </main>
  );
}
