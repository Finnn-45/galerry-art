"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const navItems = [
  { name: "Gallery", href: "/" },
  { name: "Bookmarks", href: "/bookmarks" },
];

export function NavbarMenu() {
  const [active, setActive] = useState(0);

  return (
    <div className="sticky top-0 z-50 flex justify-center w-full py-4">
      <nav className="relative flex items-center gap-10 px-10 py-3 text-white border rounded-full bg-neutral-900 border-neutral-700/50">
        {navItems.map((item, index) => {
          const isActive = index === active;

          return (
            <Link
              key={item.name}
              href={item.href}
              className="relative text-sm font-medium"
            >
              <span
                onClick={() => setActive(index)}
                className={`${isActive ? "text-white" : "text-neutral-400"}`}
              >
                {item.name}
              </span>

              {/* indikator animasi */}
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute left-0 right-0 h-[2px] bg-white rounded-full -bottom-1"
                />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
