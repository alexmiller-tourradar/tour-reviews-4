import { Review } from '@/types/review';
import ReviewCard from './ReviewCard';

interface ReviewsGalleryProps {
  reviews: Review[];
}

export default function ReviewsGallery({ reviews }: ReviewsGalleryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
}
