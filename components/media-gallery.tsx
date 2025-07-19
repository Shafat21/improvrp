"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useState } from "react"
import { Icon } from "@/components/icon"

interface GalleryImage {
  src: string
  alt?: string
}

interface YouTubeVideo {
  title: string
  url: string
}

interface MediaGalleryProps {
  images: GalleryImage[] | string[] // Can accept string[] for simplicity or objects for more detail
  videos: YouTubeVideo[]
  imageGalleryTitle?: string
  videoGalleryTitle?: string
}

export function MediaGallery({
  images,
  videos,
  imageGalleryTitle = "Server Gallery",
  videoGalleryTitle = "Community Videos & Trailers",
}: MediaGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedYouTubeVideoId, setSelectedYouTubeVideoId] = useState<string | null>(null)

  // Helper to extract YouTube video ID
  const getYouTubeVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : null
  }

  return (
    <section className="py-16 px-4 container mx-auto" id="media-gallery">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        {/* Image Gallery Section */}
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">{imageGalleryTitle}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {images.map((image, index) => {
            const imgSrc = typeof image === "string" ? image : image.src
            const imgAlt =
              typeof image === "string" ? `Gallery image ${index + 1}` : image.alt || `Gallery image ${index + 1}`
            return (
              <motion.div
                key={`image-${index}`}
                className="relative overflow-hidden rounded-lg aspect-video cursor-pointer"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
                onClick={() => setSelectedImage(imgSrc)}
              >
                <Image src={imgSrc || "/placeholder.svg"} alt={imgAlt} fill className="object-cover" unoptimized />
                <div className="absolute inset-0 bg-black bg-opacity-20 hover:bg-opacity-10 transition-all duration-200"></div>
              </motion.div>
            )
          })}
        </div>

        {/* YouTube Video Gallery Section */}
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">{videoGalleryTitle}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {videos.map((video, index) => {
            const videoId = getYouTubeVideoId(video.url)
            if (!videoId) return null // Skip if video ID cannot be extracted

            return (
              <motion.div
                key={`youtube-video-${index}`}
                className="relative overflow-hidden rounded-lg aspect-video cursor-pointer group"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
                onClick={() => setSelectedYouTubeVideoId(videoId)}
              >
                {/* YouTube Thumbnail */}
                <Image
                  src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                  alt={video.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 group-hover:bg-opacity-20 transition-all duration-200">
                  <Icon
                    name="PlayCircle"
                    size={64}
                    className="text-white opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                </div>
                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white">
                  <h3 className="text-lg font-semibold truncate">{video.title}</h3>
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Image Lightbox */}
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

      {/* YouTube Video Lightbox */}
      {selectedYouTubeVideoId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
          onClick={() => setSelectedYouTubeVideoId(null)}
        >
          <button className="absolute top-6 right-6 text-white" onClick={() => setSelectedYouTubeVideoId(null)}>
            <Icon name="X" size={32} />
          </button>
          <div className="relative w-[90vw] h-[80vh] max-w-4xl">
            <iframe
              src={`https://www.youtube.com/embed/${selectedYouTubeVideoId}?autoplay=1&rel=0`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-lg"
            ></iframe>
          </div>
        </div>
      )}
    </section>
  )
}
