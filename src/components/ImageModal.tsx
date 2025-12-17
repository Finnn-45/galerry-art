"use client";

import AnimatedModal from "@/components/ui/animated-modal";
import { ImageData } from "@/components/BookmarkContext";

export default function ImageModal({ img }: { img: ImageData }) {
  return (
    <AnimatedModal.Modal>
      {/* Trigger */}
      <AnimatedModal.ModalTrigger>
        <img
          src={img.urls.small}
          alt={img.alt_description ?? "Artwork"}
          className="w-full transition-transform rounded-lg cursor-pointer hover:scale-105"
        />
      </AnimatedModal.ModalTrigger>

      {/* Body */}
      <AnimatedModal.ModalBody>
        <AnimatedModal.ModalContent className="flex flex-col items-center modal-scroll">
          <img
            src={img.urls.regular}
            alt={img.alt_description ?? "Artwork"}
            className="w-full max-h-[80vh] object-contain rounded-lg"
          />

          <div className="flex flex-col items-start w-full mt-4 text-white">
            <p className="text-xl font-semibold">{img.user.name}</p>
            <a
              href={img.links.html}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 text-blue-400 underline"
            >
              View on Unsplash
            </a>
          </div>
        </AnimatedModal.ModalContent>
      </AnimatedModal.ModalBody>
    </AnimatedModal.Modal>
  );
}
