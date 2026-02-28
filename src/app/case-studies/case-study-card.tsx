'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Building2, MapPin, Zap, CheckCircle2, ExternalLink,
  ChevronLeft, ChevronRight
} from 'lucide-react'

interface CaseStudyCardProps {
  id: string
  category: string
  title: string
  subtitle: string
  description: string
  highlights: string[]
  product: string
  productSlug: string
  location: string
  images: string[]
  youtubeId?: string
  stats: { label: string; value: string }[]
}

export function CaseStudyCard({ id, category, title, subtitle, description, highlights, product, productSlug, location, images, youtubeId, stats }: CaseStudyCardProps) {
  const [currentImage, setCurrentImage] = useState(0)

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length)
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length)

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white transition-shadow hover:shadow-lg">
      {/* Image / Video */}
      <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200">
        {youtubeId ? (
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}`}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : images.length > 0 ? (
          <>
            <img
              src={images[currentImage]}
              alt={`${title} - Photo ${currentImage + 1}`}
              className="h-full w-full object-contain bg-gray-100"
              loading="eager"
            />
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-1.5 text-white backdrop-blur-sm hover:bg-black/70"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-1.5 text-white backdrop-blur-sm hover:bg-black/70"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
                <div className="absolute bottom-2 right-2 rounded-full bg-black/60 px-2 py-0.5 text-xs text-white backdrop-blur-sm">
                  {currentImage + 1} / {images.length}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center text-gray-400">
            <Building2 className="mb-2 h-12 w-12" />
            <span className="text-sm">Project Photos Coming Soon</span>
          </div>
        )}
        <div className="absolute left-4 top-4 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
          {category}
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-1 overflow-x-auto border-b border-gray-100 bg-gray-50 p-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setCurrentImage(i)}
              className={`h-12 w-16 shrink-0 overflow-hidden rounded ${
                i === currentImage ? 'ring-2 ring-yellow-400' : 'opacity-60 hover:opacity-100'
              }`}
            >
              <img src={img} alt={`Thumbnail ${i + 1}`} className="h-full w-full object-contain bg-gray-100" />
            </button>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        <h3 className="mb-1 text-xl font-bold text-gray-900">{title}</h3>
        <p className="mb-3 text-sm font-medium text-yellow-600">{subtitle}</p>
        <p className="mb-4 text-sm leading-relaxed text-gray-500">{description}</p>

        {/* Stats */}
        <div className="mb-4 grid grid-cols-4 gap-2">
          {stats.map(s => (
            <div key={s.label} className="rounded-lg bg-gray-50 p-2 text-center">
              <div className="text-lg font-black text-gray-900">{s.value}</div>
              <div className="text-[10px] text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Highlights */}
        <details className="group">
          <summary className="cursor-pointer text-sm font-medium text-yellow-600 hover:underline">
            View highlights →
          </summary>
          <ul className="mt-3 space-y-1.5">
            {highlights.map(h => (
              <li key={h} className="flex items-start gap-2 text-sm text-gray-600">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-yellow-500" />
                {h}
              </li>
            ))}
          </ul>
        </details>

        {/* Product + Location */}
        <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-gray-100 pt-4 text-xs text-gray-500">
          <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {location}</span>
          {productSlug && (
            <Link href={`/p/${productSlug}`} className="flex items-center gap-1 text-yellow-600 hover:underline">
              <Zap className="h-3 w-3" /> {product} <ExternalLink className="h-3 w-3" />
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
