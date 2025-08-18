import { useState, useEffect, useRef } from 'react'

interface ImageGalleryProps {
  images: string[]
  alt: string
  className?: string
}

export default function ImageGallery({ images, alt, className = '' }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const lightboxRef = useRef<HTMLDialogElement>(null)

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault()
          goToPrevious()
          break
        case 'ArrowRight':
          e.preventDefault()
          goToNext()
          break
        case 'Escape':
          e.preventDefault()
          closeLightbox()
          break
      }
    }

    if (isLightboxOpen) {
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isLightboxOpen, currentIndex])

  // Handle lightbox modal
  useEffect(() => {
    const dialog = lightboxRef.current
    if (!dialog) return

    if (isLightboxOpen) {
      dialog.showModal()
    } else {
      dialog.close()
    }
  }, [isLightboxOpen])

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToIndex = (index: number) => {
    setCurrentIndex(index)
  }

  const openLightbox = () => {
    setIsLightboxOpen(true)
  }

  const closeLightbox = () => {
    setIsLightboxOpen(false)
  }

  const handleLightboxClick = (e: React.MouseEvent) => {
    // Close if clicking the backdrop
    if (e.target === lightboxRef.current) {
      closeLightbox()
    }
  }

  if (!images || images.length === 0) {
    return (
      <div className={`w-full h-64 bg-base-200 rounded-lg flex items-center justify-center ${className}`}>
        <div className="text-base-content/40">
          <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Main Gallery */}
      <div className={`relative ${className}`}>
        {/* Main Image */}
        <div className="relative group">
          <img
            src={images[currentIndex]}
            alt={`${alt} - Image ${currentIndex + 1}`}
            className="w-full h-64 object-cover rounded-lg cursor-pointer transition-transform hover:scale-[1.02]"
            onClick={openLightbox}
            loading="lazy"
          />
          
          {/* Navigation Arrows (only show if more than 1 image) */}
          {images.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-2 top-1/2 -translate-y-1/2 btn btn-circle btn-sm bg-black/50 border-none text-white hover:bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Previous image"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={goToNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 btn btn-circle btn-sm bg-black/50 border-none text-white hover:bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Next image"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Expand Icon */}
          <button
            onClick={openLightbox}
            className="absolute top-2 right-2 btn btn-circle btn-sm bg-black/50 border-none text-white hover:bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Expand image"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </button>

          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
              {currentIndex + 1} / {images.length}
            </div>
          )}
        </div>

        {/* Thumbnail Strip (only show if more than 1 image) */}
        {images.length > 1 && (
          <div className="flex gap-2 mt-3 overflow-x-auto">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => goToIndex(index)}
                className={`flex-shrink-0 w-16 h-16 rounded border-2 transition-all ${
                  index === currentIndex 
                    ? 'border-primary ring-2 ring-primary/20' 
                    : 'border-transparent hover:border-base-300'
                }`}
              >
                <img
                  src={image}
                  alt={`${alt} thumbnail ${index + 1}`}
                  className="w-full h-full object-cover rounded"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <dialog
        ref={lightboxRef}
        className="modal backdrop-blur-sm"
        onClick={handleLightboxClick}
      >
        <div className="modal-box max-w-6xl max-h-[95vh] p-0 bg-black/90 border-none">
          {/* Lightbox Header */}
          <div className="flex justify-between items-center p-4 bg-black/50">
            <span className="text-white font-medium">
              {currentIndex + 1} / {images.length}
            </span>
            <button
              onClick={closeLightbox}
              className="btn btn-circle btn-sm bg-transparent border-white/20 text-white hover:bg-white/10"
              aria-label="Close lightbox"
            >
              ✕
            </button>
          </div>

          {/* Lightbox Image */}
          <div className="relative flex items-center justify-center p-4">
            <img
              src={images[currentIndex]}
              alt={`${alt} - Image ${currentIndex + 1}`}
              className="max-w-full max-h-[80vh] object-contain"
            />

            {/* Lightbox Navigation */}
            {images.length > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 btn btn-circle bg-black/50 border-none text-white hover:bg-black/70"
                  aria-label="Previous image"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <button
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 btn btn-circle bg-black/50 border-none text-white hover:bg-black/70"
                  aria-label="Next image"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
          </div>

          {/* Lightbox Thumbnail Strip */}
          {images.length > 1 && (
            <div className="p-4 bg-black/50">
              <div className="flex gap-2 justify-center overflow-x-auto">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => goToIndex(index)}
                    className={`flex-shrink-0 w-12 h-12 rounded border-2 transition-all ${
                      index === currentIndex 
                        ? 'border-white ring-2 ring-white/20' 
                        : 'border-transparent hover:border-white/50'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${alt} thumbnail ${index + 1}`}
                      className="w-full h-full object-cover rounded"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </dialog>
    </>
  )
}