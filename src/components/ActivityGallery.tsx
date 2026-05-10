import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ActivityGalleryProps {
  images: string[];
  title: string;
}

export const ActivityGallery = ({ images, title }: ActivityGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // If no images, return null or a placeholder
  if (!images || images.length === 0) return null;

  // Ensure we have at least 3 thumbnails (total 4 images: 1 main + 3 thumbnails)
  const displayImages = images.slice(0, 4);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-border bg-background">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeIndex}
            src={displayImages[activeIndex]}
            alt={`${title} - view ${activeIndex + 1}`}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="h-full w-full object-cover"
          />
        </AnimatePresence>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-3 gap-3">
        {displayImages.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={cn(
              "relative aspect-square overflow-hidden rounded-xl border-2 transition-all duration-300",
              activeIndex === idx
                ? "border-accent shadow-glow scale-[0.98]"
                : "border-transparent hover:border-border grayscale hover:grayscale-0"
            )}
          >
            <img
              src={img}
              alt={`${title} thumbnail ${idx + 1}`}
              className="h-full w-full object-cover"
            />
            {activeIndex === idx && (
              <motion.div
                layoutId="active-thumb"
                className="absolute inset-0 bg-accent/10 pointer-events-none"
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
