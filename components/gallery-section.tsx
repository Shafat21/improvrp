"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Icon } from "@/components/icon"

interface GallerySectionProps {
  images: string[]
}

export function GallerySection({ images }: GallerySectionProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <section className="py-16 px-4 container mx-auto" id="gallery">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Server Gallery</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="relative overflow-hidden rounded-lg aspect-video cursor-pointer"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelectedImage(image)}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`Gallery image ${index + 1}`}
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 hover:bg-opacity-10 transition-all duration-200"></div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
          onClick={() => setSelectedImage(null)}
        >
          <button className="absolute top-6 right-6 text-white" onClick={() => setSelectedImage(null)}>
            <Icon name="X" size={32} />
          </button>
          <div className="relative w-[90vw] h-[80vh]">
            <Image src={selectedImage || "/placeholder.svg"} alt="Gallery image" fill className="object-contain" />
          </div>
        </div>
      )}
    </section>
  )
}
