"use client";

import AnimatedModal from "@/components/ui/animated-modal";

type ImageData = {
  id: string;
  urls: { small: string; regular: string };
  alt_description: string | null;
  user: { name: string; links: { html: string } };
  links: { html: string };
};

export default function ImageModal({ img }: { img: ImageData }) {
  return (
    <AnimatedModal.Modal>
      {/* Trigger */}
      <AnimatedModal.ModalTrigger>
        <img
          src={img.urls.small}
          alt={img.alt_description ?? "Artwork"}
          className="w-full rounded-lg cursor-pointer"
        />
      </AnimatedModal.ModalTrigger>

      {/* Body */}
      <AnimatedModal.ModalBody>
        <AnimatedModal.ModalContent className="max-w-3xl p-4">
          {/* Full Image */}
          <img
            src={img.urls.regular}
            alt={img.alt_description ?? "Artwork"}
            className="w-full rounded-lg"
          />

          {/* Info */}
          <div className="mt-3">
            <p className="text-lg font-semibold">{img.user.name}</p>
            <a
              href={img.links.html}
              target="_blank"
              className="text-blue-500 underline"
            >
              View on Unsplash
            </a>
          </div>
        </AnimatedModal.ModalContent>
      </AnimatedModal.ModalBody>
    </AnimatedModal.Modal>
  );
}
