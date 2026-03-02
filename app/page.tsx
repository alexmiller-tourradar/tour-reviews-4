import ReviewsGallery from '@/components/ReviewsGallery';
import { loadReviewsFromCSV } from '@/lib/csvLoader';
import { loadReviewsFromDatabase } from '@/lib/dbLoader';

export default async function Home() {
  const dataSource = process.env.DATA_SOURCE || 'csv';

  const reviews = dataSource === 'database'
    ? await loadReviewsFromDatabase()
    : await loadReviewsFromCSV();

  return (
    <main className="min-h-screen bg-gradient-to-br from-scout-light via-white to-slate-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-12">
          <div className="mb-8">
            <a href="https://www.tourradar.com" target="_blank" rel="noopener noreferrer">
              <img
                src="/tourradar-logo.png"
                alt="TourRadar"
                className="h-10 hover:opacity-80 transition-opacity"
              />
            </a>
          </div>

          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-scout-dark leading-tight">
              Real Stories from Real Travelers
            </h1>
            <p className="text-xl md:text-2xl text-scout-secondary">
              See what our customers are saying about their recent adventures
            </p>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              These are the latest verified reviews from TourRadar customers who have just returned from their tours.
              Every review includes photos and authentic experiences shared by travelers like you.
            </p>
          </div>
        </header>

        <ReviewsGallery reviews={reviews} />
      </div>
    </main>
  );
}
