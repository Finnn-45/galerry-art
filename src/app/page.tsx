"use client";

import { useEffect, useState } from "react";
import { useBookmarks } from "@/components/BookmarkContext";
import ImageModal from "@/components/ImageModal";

type ImageData = {
  id: string;
  urls: { small: string; regular: string };
  alt_description: string | null; // FIX: Unsplash bisa null
  user: { name: string; links: { html: string } };
  links: { html: string };
};

export default function Home() {
  const [images, setImages] = useState<ImageData[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const { bookmarks, toggleBookmark } = useBookmarks();

  // 🔥 FIX DUPLIKAT KEY
  const fetchImages = async (pageNumber: number) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=art&page=${pageNumber}&per_page=15&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
      );

      const data = await res.json();

      setImages((prev) => {
        const filtered = data.results.filter(
          (img: ImageData) => !prev.some((p) => p.id === img.id)
        );
        return [...prev, ...filtered];
      });
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
    <main className="px-6 py-8">

<div className="gap-4 columns-2 sm:columns-3 md:columns-4">
  {images.map((img) => (
    <div key={img.id} className="relative mb-4 break-inside-avoid">
      
      {/* modal */}
      <ImageModal img={img} />

      {/* bookmark button */}
      <button
        onClick={() => toggleBookmark(img)}
        className="absolute px-2 py-1 text-white rounded top-2 right-2 bg-black/60"
      >
        {bookmarks.some((b) => b.id === img.id) ? "★" : "☆"}
      </button>
    </div>
  ))}
</div>



      {/* LOAD MORE */}
      <div className="flex justify-center mt-6">
        <button
          onClick={loadMore}
          className="px-4 py-2 text-black bg-white rounded-lg"
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      </div>
    </main>
  );
}
