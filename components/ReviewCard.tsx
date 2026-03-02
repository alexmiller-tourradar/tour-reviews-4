'use client';

import Image from 'next/image';
import { Review } from '@/types/review';
import { useState } from 'react';

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFullReview, setShowFullReview] = useState(false);

  const getInitials = (name: string) => {
    if (!name || name.trim() === '') return '?';
    return name.trim().charAt(0).toUpperCase();
  };

  const getAvatarColor = (name: string) => {
    const colors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-red-500',
      'bg-yellow-500',
      'bg-teal-500'
    ];
    const index = (name || '').length % colors.length;
    return colors[index];
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === review.media.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? review.media.length - 1 : prev - 1
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
      {/* Image Gallery Section */}
      <div className="relative h-80 bg-gray-200 overflow-hidden">
        {review.media.length > 0 && (
          <>
            <Image
              src={review.media[currentImageIndex].url}
              alt={review.media[currentImageIndex].alt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />

            {/* Image Navigation */}
            {review.media.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Previous image"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Next image"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Image Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {review.media.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImageIndex
                          ? 'bg-white w-6'
                          : 'bg-white/60 hover:bg-white/80'
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}

          </>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* User Info */}
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl ${getAvatarColor(review.userName)}`}>
            {getInitials(review.userName)}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{review.userName || 'Anonymous'}</h3>
            <p className="text-sm text-gray-500">
              {new Date(review.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>

        {/* Tour Info */}
        <div className="mb-3">
          <a
            href={review.tourUrl || `https://www.tourradar.com/search?q=${encodeURIComponent(review.tourName)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl font-bold text-gray-900 mb-1 hover:text-scout-primary transition-colors inline-block"
          >
            {review.tourName}
          </a>
          <div className="flex items-center gap-3 text-sm mt-1">
            {review.tourDestination && (
              <p className="text-scout-secondary font-medium flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                {review.tourDestination}
              </p>
            )}
            {review.operatorName && (
              <p className="text-gray-500 flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                {review.operatorName}
              </p>
            )}
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-5 h-5 ${
                i < review.rating ? 'text-scout-accent' : 'text-gray-300'
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="ml-2 text-sm font-semibold text-gray-700">{review.rating}.0</span>
        </div>

        {/* Quote */}
        <blockquote className="mb-3">
          <p className="text-gray-800 font-medium italic border-l-4 border-scout-primary pl-4">
            "{review.quote.substring(0, 120)}{review.quote.length > 120 ? '...' : ''}"
          </p>
        </blockquote>

        {/* Full Review */}
        <div className="text-gray-600 text-sm leading-relaxed">
          <p className={showFullReview ? '' : 'line-clamp-3'}>
            {review.fullReview}
          </p>
          {review.fullReview.length > 200 && (
            <button
              onClick={() => setShowFullReview(!showFullReview)}
              className="text-scout-primary font-semibold mt-2 hover:text-scout-secondary transition-colors"
            >
              {showFullReview ? 'Show less' : 'Read more'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
