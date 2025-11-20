"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type ImageData = {
  id: string;
  urls: { small: string; regular: string };
  alt_description: string;
  user: { name: string; links: { html: string } };
  links: { html: string; html_download: string };
};

export default function Home() {
  const [images, setImages] = useState<ImageData[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

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
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white p-8">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold tracking-tight mb-3 bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
          🎨 Art Gallery
        </h1>
        <p className="text-gray-300 text-lg max-w-xl mx-auto">
          Jelajahi koleksi karya seni dari seluruh dunia yang diambil dari
          Unsplash API. Klik gambar untuk melihat detailnya.
        </p>
      </header>

      {/* Gallery grid */}
      <section className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
        {images.map((img) => (
          <motion.div
            key={img.id}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:brightness-110 group"
          >
            <a
              href={img.urls.regular}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={img.urls.small}
                alt={img.alt_description || "Art"}
                className="w-full rounded-2xl object-cover transition-all duration-300 group-hover:scale-105"
              />
            </a>

            {/* Overlay Info */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all flex flex-col justify-end p-4">
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
        ))}
      </section>

      {/* Tombol Load More */}
      <div className="flex justify-center mt-12">
        <button
          onClick={loadMore}
          disabled={loading}
          className="bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-pink-500/40 transition-all hover:scale-105 disabled:opacity-50"
        >
          {loading ? "Memuat..." : "Tampilkan Lebih Banyak"}
        </button>
      </div>

      {/* Footer */}
      <footer className="text-center mt-16 text-gray-500 text-sm">
        Dibuat dengan ❤️ menggunakan Next.js & Unsplash API
      </footer>
    </main>
  );
}
