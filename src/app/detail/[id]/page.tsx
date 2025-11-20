"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type ImageDetail = {
  id: string;
  urls: { regular: string };
  alt_description: string;
  user: { name: string };
};

export default function DetailPage() {
  const { id } = useParams();
  const [image, setImage] = useState<ImageDetail | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchImage = async () => {
      try {
        const res = await fetch(
          `https://api.unsplash.com/photos/${id}?client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
        );
        const data = await res.json();
        setImage(data);
      } catch (err) {
        console.error("Gagal memuat detail:", err);
      }
    };

    fetchImage();
  }, [id]);

  if (!image)
    return (
      <p className="p-6 text-gray-400">
        Memuat detail gambar...
      </p>
    );

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold text-pink-400">
        Detail Gambar
      </h1>

      <img
        src={image.urls.regular}
        alt={image.alt_description}
        className="w-full shadow-lg rounded-xl"
      />

      <p className="mt-4 text-lg text-white">
        📸 Dibuat oleh: <span className="text-pink-400">{image.user.name}</span>
      </p>

      <p className="mt-1 text-gray-300">
        {image.alt_description || "Tidak ada deskripsi."}
      </p>

      <button
        onClick={() => history.back()}
        className="px-4 py-2 mt-6 text-white bg-pink-500 rounded-lg hover:bg-pink-600"
      >
        ⬅ Kembali
      </button>
    </div>
  );
}
