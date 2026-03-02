export interface Review {
  id: string;
  tourName: string;
  tourDestination: string;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  quote: string;
  fullReview: string;
  media: Media[];
  verified: boolean;
  tourUrl?: string;
  operatorName?: string;
}

export interface Media {
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  alt: string;
}
