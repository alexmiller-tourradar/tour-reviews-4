import { Review, Media } from '@/types/review';
import { query } from './db';

interface ReviewImageRow {
  review_id: number;
  image_id: number;
  ai_description: string;
  quality_score: number;
  cdn_link: string;
  destination: string;
}

interface ReviewDetailsRow {
  review_id: number;
  tour_name: string;
  user_name: string;
  user_avatar: string;
  rating: number;
  review_date: string;
  review_text: string;
  verified: boolean;
}

export async function loadReviewsFromDatabase(): Promise<Review[]> {
  // Get review images with AI metadata
  const imagesSql = `
    SELECT
      ir.review_id,
      ir.image_id,
      aim.description AS ai_description,
      aim.quality_rating AS quality_score,
      CONCAT('https://cdn.tourradar.com/s3/review/original/', i.name) AS cdn_link,
      c.name AS destination
    FROM tourradar.images_reviews ir
    JOIN tourradar.images i ON i.id = ir.image_id
    LEFT JOIN tourradar.images_ai_metadata aim ON aim.image_id = ir.image_id
    LEFT JOIN tourradar.images_ai_destinations aid ON aid.image_id = ir.image_id
    LEFT JOIN tourradar.cities c ON c.id = aid.destination_id
    WHERE ir.deleted_at IS NULL
      AND aim.image_id IS NOT NULL
      AND aim.description IS NOT NULL
      AND aim.description != ''
      AND aid.destination_id IS NOT NULL
    ORDER BY ir.review_id DESC
    LIMIT 5000
  `;

  const images = await query<ReviewImageRow>(imagesSql);

  // Group images by review_id
  const reviewImagesMap = new Map<number, ReviewImageRow[]>();
  images.forEach((img) => {
    if (!reviewImagesMap.has(img.review_id)) {
      reviewImagesMap.set(img.review_id, []);
    }
    reviewImagesMap.get(img.review_id)!.push(img);
  });

  // Get unique review IDs
  const reviewIds = Array.from(reviewImagesMap.keys()).slice(0, 100); // Limit to 100 reviews for performance

  if (reviewIds.length === 0) {
    return [];
  }

  // Get review details
  const reviewsSql = `
    SELECT
      r.id as review_id,
      t.name as tour_name,
      COALESCE(u.first_name, 'Anonymous') as user_name,
      COALESCE(u.avatar_url, 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop') as user_avatar,
      r.rating,
      r.created_at as review_date,
      r.review_text,
      r.verified
    FROM tourradar.reviews r
    LEFT JOIN tourradar.tours t ON t.id = r.tour_id
    LEFT JOIN tourradar.users u ON u.id = r.user_id
    WHERE r.id IN (${reviewIds.join(',')})
    AND r.deleted_at IS NULL
  `;

  const reviewDetails = await query<ReviewDetailsRow>(reviewsSql);

  // Combine reviews with images
  const reviews: Review[] = reviewDetails.map((review) => {
    const reviewImages = reviewImagesMap.get(review.review_id) || [];

    const media: Media[] = reviewImages.slice(0, 3).map((img) => ({
      type: 'image' as const,
      url: img.cdn_link,
      alt: img.ai_description || `${review.tour_name} - ${img.destination}`,
    }));

    // Use AI description as quote if available
    const quote = reviewImages[0]?.ai_description ||
                  review.review_text.substring(0, 100) + '...';

    return {
      id: review.review_id.toString(),
      tourName: review.tour_name || 'Unknown Tour',
      tourDestination: reviewImages[0]?.destination || 'Unknown',
      userName: review.user_name,
      userAvatar: review.user_avatar,
      rating: review.rating,
      date: new Date(review.review_date).toISOString().split('T')[0],
      quote: quote,
      fullReview: review.review_text,
      media,
      verified: review.verified,
    };
  });

  return reviews;
}
