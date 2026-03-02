import { Review, Media } from '@/types/review';
import fs from 'fs';
import path from 'path';

interface CSVRow {
  id: string;
  tourName: string;
  tourDestination: string;
  userName: string;
  userAvatar: string;
  rating: string;
  date: string;
  quote: string;
  fullReview: string;
  imageUrl1?: string;
  imageUrl2?: string;
  imageUrl3?: string;
  verified: string;
  tourUrl?: string;
  operatorName?: string;
}

export async function loadReviewsFromCSV(): Promise<Review[]> {
  const csvPath = path.join(process.cwd(), 'data', 'reviews.csv');
  const fileContent = fs.readFileSync(csvPath, 'utf-8');

  const rows = parseCSV(fileContent);
  const headers = rows[0];
  const reviewMap = new Map<string, any>();

  const isValidUrl = (url: string) => url && (url.startsWith('http://') || url.startsWith('https://'));

  for (let i = 1; i < rows.length; i++) {
    const values = rows[i];
    const row: any = {};

    headers.forEach((header, index) => {
      row[header] = values[index] || '';
    });

    const csvRow = row as CSVRow;
    const reviewKey = `${csvRow.id}-${csvRow.userName}`;

    if (!reviewMap.has(reviewKey)) {
      reviewMap.set(reviewKey, {
        id: csvRow.id,
        tourName: csvRow.tourName,
        tourDestination: csvRow.tourDestination,
        userName: csvRow.userName,
        userAvatar: csvRow.userAvatar,
        rating: parseInt(csvRow.rating),
        date: csvRow.date,
        quote: csvRow.quote,
        fullReview: csvRow.fullReview,
        media: [],
        verified: csvRow.verified ? csvRow.verified.toLowerCase() === 'true' : false,
        tourUrl: csvRow.tourUrl || '',
        operatorName: csvRow.operatorName || ''
      });
    }

    const review = reviewMap.get(reviewKey);

    // Add images to media array
    if (isValidUrl(csvRow.imageUrl1) && !review.media.find((m: Media) => m.url === csvRow.imageUrl1)) {
      review.media.push({
        type: 'image',
        url: csvRow.imageUrl1,
        alt: `${csvRow.tourName} - ${csvRow.tourDestination || 'Tour photo'}`
      });
    }
  }

  return Array.from(reviewMap.values());
}

// CSV parser that handles quoted fields with newlines
function parseCSV(content: string): string[][] {
  const rows: string[][] = [];
  const lines = content.split('\n');
  let currentRow: string[] = [];
  let currentField = '';
  let inQuotes = false;

  for (const line of lines) {
    for (let i = 0; i < line.length; i++) {
      const char = line[i];

      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        currentRow.push(currentField.trim());
        currentField = '';
      } else {
        currentField += char;
      }
    }

    if (!inQuotes) {
      currentRow.push(currentField.trim());
      rows.push(currentRow);
      currentRow = [];
      currentField = '';
    } else {
      currentField += '\n';
    }
  }

  return rows.filter(row => row.some(field => field.length > 0));
}
