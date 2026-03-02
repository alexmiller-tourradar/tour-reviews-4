# Tour Reviews - TourRadar

A beautiful, social media-style reviews page showcasing authentic tour experiences with photos, videos, and traveler stories.

## Features

- Responsive masonry-style grid layout (Instagram/Etsy aesthetic)
- Image galleries with smooth navigation
- Verified review badges
- Star ratings and user avatars
- Beautiful card hover effects
- Mobile-first responsive design
- TypeScript for type safety
- Tailwind CSS for styling

## Prerequisites

Before running this project, make sure you have:

1. **Node.js** installed (v18 or higher)
2. **npm** package manager

If you don't have these installed yet:

```bash
# Install Homebrew (if not already installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js
brew install node
```

## Getting Started

1. **Install dependencies:**

```bash
cd ~/Desktop/tour-reviews
npm install
```

2. **Configure data source:**

Copy `.env.example` to `.env.local` and configure:

```bash
cp .env.example .env.local
```

Edit `.env.local`:
- For **CSV data** (default): Set `DATA_SOURCE=csv`
- For **Database data**: Set `DATA_SOURCE=database` and add your database credentials

3. **Run the development server:**

```bash
npm run dev
```

4. **Open your browser:**

Navigate to [http://localhost:3000](http://localhost:3000) to see the Tour Reviews page.

## Project Structure

```
tour-reviews/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page with reviews gallery
│   └── globals.css         # Global styles
├── components/
│   ├── ReviewCard.tsx      # Individual review card component
│   └── ReviewsGallery.tsx  # Gallery grid layout
├── lib/
│   ├── csvLoader.ts        # CSV data loader
│   ├── dbLoader.ts         # Database data loader
│   ├── db.ts               # Database connection utility
│   ├── mockData.ts         # Mock review data (backup)
│   └── queries.sql         # SQL queries for TourRadar DB
├── data/
│   └── reviews.csv         # CSV data file
├── types/
│   └── review.ts           # TypeScript types
└── public/                 # Static assets

```

## Data Sources

This app supports two data sources:

### CSV Data (Default)
Edit `/data/reviews.csv` to add or modify reviews. The CSV format:
- `id, tourName, tourDestination, userName, userAvatar, rating, date, quote, fullReview, imageUrl1, imageUrl2, imageUrl3, verified`

### Database Data
The app can connect to the TourRadar MySQL database. Configure in `.env.local`:

```env
DATA_SOURCE=database
DB_HOST=your-database-host
DB_USER=your-database-user
DB_PASSWORD=your-database-password
DB_NAME=tourradar
```

The SQL query (in `/lib/queries.sql`) fetches:
- Review images with AI-generated descriptions
- Quality scores and destinations
- Latest 5000 reviews with verified images

## Customization

### Styling

The project uses Tailwind CSS with Scout brand colors defined in `tailwind.config.ts`:
- `scout-primary`: #FF6B35 (Orange)
- `scout-secondary`: #2C3E50 (Dark blue)
- `scout-accent`: #F39C12 (Gold)
- `scout-dark`: #1A252F
- `scout-light`: #ECF0F1

### Image Sources

Currently using Unsplash for demo images. Update `next.config.js` to add your own image domains.

## Building for Production

```bash
npm run build
npm start
```

## Deploy to Vercel

Once you have the Vercel CLI installed and authenticated:

```bash
vercel
```

Follow the prompts to deploy your Tour Reviews page!

## Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling with Scout brand colors
- **React Hooks** - State management
- **MySQL2** - Database connectivity
- **CSV Parser** - Custom CSV data loading

## Future Enhancements

- Video support for reviews
- Filter by destination/rating
- Infinite scroll
- API integration for real review data
- User interactions (likes, shares)
- Search functionality
