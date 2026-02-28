'use client'

import { useState } from 'react'
import { Play, Film } from 'lucide-react'

interface VideoItem {
  url: string
  title: string
}

interface ProductVideoProps {
  videos: VideoItem[]
}

function getYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?#]+)/)
  return match?.[1] || null
}

export function ProductVideo({ videos }: ProductVideoProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [playing, setPlaying] = useState(false)

  if (!videos || videos.length === 0) return null

  const current = videos[activeIndex]
  const youtubeId = getYouTubeId(current.url)

  return (
    <div className="mt-4">
      {/* Main Video */}
      <div className="relative rounded-xl overflow-hidden bg-black aspect-video">
        {playing ? (
          <iframe
            src={youtubeId
              ? `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`
              : current.url
            }
            title={current.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        ) : (
          <button
            onClick={() => setPlaying(true)}
            className="w-full h-full relative group cursor-pointer"
          >
            {youtubeId ? (
              <img
                src={`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`}
                alt={current.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-900" />
            )}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Play className="w-7 h-7 text-black ml-1" fill="currentColor" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <div className="flex items-center gap-2">
                <Film className="w-4 h-4 text-yellow-400" />
                <p className="text-white text-sm font-medium">{current.title}</p>
              </div>
            </div>
          </button>
        )}
      </div>

      {/* Video selector (if multiple) */}
      {videos.length > 1 && (
        <div className="flex gap-2 mt-2">
          {videos.map((v, i) => {
            const vid = getYouTubeId(v.url)
            return (
              <button
                key={i}
                onClick={() => { setActiveIndex(i); setPlaying(false) }}
                className={`flex-1 rounded-lg overflow-hidden border-2 transition-all ${
                  activeIndex === i ? 'border-yellow-500' : 'border-gray-200 hover:border-gray-400'
                }`}
              >
                <div className="aspect-video relative">
                  {vid ? (
                    <img src={`https://img.youtube.com/vi/${vid}/mqdefault.jpg`} alt={v.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gray-200" />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play className="w-4 h-4 text-white drop-shadow" fill="white" />
                  </div>
                </div>
                <p className="text-[10px] text-gray-600 p-1 line-clamp-1">{v.title}</p>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
