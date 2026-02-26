'use client'

import { useState } from 'react'
import { Play } from 'lucide-react'

interface ProductVideoProps {
  videoUrl?: string
  videoTitle?: string
  thumbnailUrl?: string
}

function getYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?#]+)/)
  return match?.[1] || null
}

export function ProductVideo({ videoUrl, videoTitle, thumbnailUrl }: ProductVideoProps) {
  const [playing, setPlaying] = useState(false)

  if (!videoUrl) return null

  const youtubeId = getYouTubeId(videoUrl)

  return (
    <div className="mt-4">
      <div className="relative rounded-xl overflow-hidden bg-black aspect-video">
        {playing || !youtubeId ? (
          <iframe
            src={youtubeId
              ? `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`
              : videoUrl
            }
            title={videoTitle || 'Product Video'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        ) : (
          <button
            onClick={() => setPlaying(true)}
            className="w-full h-full relative group cursor-pointer"
          >
            <img
              src={thumbnailUrl || `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`}
              alt={videoTitle || 'Product Video'}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Play className="w-7 h-7 text-black ml-1" fill="currentColor" />
              </div>
            </div>
            {videoTitle && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <p className="text-white text-sm font-medium">{videoTitle}</p>
              </div>
            )}
          </button>
        )}
      </div>
    </div>
  )
}
