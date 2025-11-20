"use client";

import { useState } from "react";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (e: any) => {
    e.preventDefault();

    if (!query.trim()) return;

    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${query}&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
    );

    const data = await res.json();
    setResults(data.results);
  };

  return (
    <main className="min-h-screen p-8 text-white bg-gradient-to-b from-gray-900 via-gray-800 to-black">
      {/* Header */}
      <h1 className="mb-6 text-4xl font-bold text-transparent bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text">
        🔍 Pencarian Gambar
      </h1>

      {/* Form Search */}
      <form
        onSubmit={handleSearch}
        className="flex flex-col gap-4 mb-10 md:flex-row"
      >
        <input
          type="text"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari apa aja... (misal: cat, night, cyberpunk)"
          className="flex-1 px-4 py-3 text-white border rounded-xl bg-white/5 border-white/20 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-pink-500"
        />

        <button
          type="submit"
          className="px-6 py-3 font-semibold text-white transition-all rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 hover:shadow-lg hover:shadow-pink-500/20"
        >
          Cari
        </button>
      </form>

      {/* Grid Hasil */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {results.map((img: any) => (
          <div
            key={img.id}
            className="relative overflow-hidden transition-all border group rounded-2xl bg-gray-800/40 backdrop-blur-xl border-white/10 hover:shadow-lg hover:shadow-purple-500/20"
          >
            <img
              src={img.urls.small}
              alt={img.alt_description || "image"}
              className="object-cover w-full h-64 transition-all duration-500 group-hover:scale-110"
            />

            {/* Overlay saat hover */}
            <div className="absolute inset-0 flex flex-col justify-end p-4 transition-all opacity-0 group-hover:opacity-100 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
              <p className="text-sm text-gray-300">
                📸 {img.user?.name || "Unknown"}
              </p>
              <p className="text-xs text-pink-400">{query ? `"${query}"` : ""}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Jika kosong setelah search */}
      {results.length === 0 && query !== "" && (
        <p className="mt-10 text-lg text-gray-400">Tidak ada hasil ditemukan.</p>
      )}
    </main>
  );
}
