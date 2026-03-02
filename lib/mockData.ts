import { Review } from '@/types/review';

export const mockReviews: Review[] = [
  {
    id: '1',
    tourName: 'Machu Picchu Trek Adventure',
    tourDestination: 'Peru',
    userName: 'Sarah Johnson',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    rating: 5,
    date: '2024-02-15',
    quote: 'The most incredible experience of my life! The views were absolutely breathtaking.',
    fullReview: 'This trek exceeded all my expectations. Our guide was knowledgeable and caring, the accommodations were comfortable, and the other travelers were wonderful. Reaching Machu Picchu at sunrise was a moment I will never forget.',
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&h=600&fit=crop',
        alt: 'Machu Picchu at sunrise'
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800&h=600&fit=crop',
        alt: 'Hiking through the mountains'
      }
    ],
    verified: true
  },
  {
    id: '2',
    tourName: 'Northern Lights Iceland Explorer',
    tourDestination: 'Iceland',
    userName: 'Michael Chen',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    rating: 5,
    date: '2024-02-10',
    quote: 'Witnessing the Aurora Borealis was a dream come true. Pure magic!',
    fullReview: 'Everything about this tour was perfect. From the ice caves to the hot springs, every moment was special. Our guide knew exactly where to take us for the best northern lights viewing. The small group size made it feel personal and intimate.',
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1579033461380-adb47c3eb938?w=800&h=600&fit=crop',
        alt: 'Northern Lights over Iceland'
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=800&h=600&fit=crop',
        alt: 'Ice cave exploration'
      }
    ],
    verified: true
  },
  {
    id: '3',
    tourName: 'Safari Tanzania Wildlife Adventure',
    tourDestination: 'Tanzania',
    userName: 'Emma Williams',
    userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    rating: 5,
    date: '2024-02-08',
    quote: 'Saw the Big Five and witnessed the Great Migration. Absolutely unforgettable!',
    fullReview: 'This safari was beyond incredible. We saw lions, elephants, rhinos, leopards, and buffalo all in their natural habitat. The lodges were luxurious and our guide\'s knowledge of the wildlife was impressive. I\'ve already recommended this to all my friends.',
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&h=600&fit=crop',
        alt: 'Lions in the Serengeti'
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1549366021-9f761d450615?w=800&h=600&fit=crop',
        alt: 'Elephant family'
      }
    ],
    verified: true
  },
  {
    id: '4',
    tourName: 'Japanese Cultural Discovery',
    tourDestination: 'Japan',
    userName: 'David Martinez',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
    rating: 4,
    date: '2024-02-05',
    quote: 'From Tokyo\'s neon lights to Kyoto\'s temples - Japan stole my heart.',
    fullReview: 'The perfect blend of ancient tradition and modern innovation. We experienced tea ceremonies, stayed in a ryokan, explored bamboo forests, and ate the most amazing sushi. The tour was well-organized and our guide made sure we understood the cultural significance of everything we saw.',
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=800&h=600&fit=crop',
        alt: 'Kyoto temple'
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=800&h=600&fit=crop',
        alt: 'Tokyo at night'
      }
    ],
    verified: true
  },
  {
    id: '5',
    tourName: 'Greek Islands Sailing Adventure',
    tourDestination: 'Greece',
    userName: 'Sophie Anderson',
    userAvatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop',
    rating: 5,
    date: '2024-02-01',
    quote: 'Sailing through crystal-clear waters, exploring hidden beaches, living the dream!',
    fullReview: 'This was the vacation of a lifetime. Each island had its own unique charm - from Santorini\'s sunsets to Mykonos\' beaches. The boat was comfortable, the food was delicious, and swimming in those turquoise waters was paradise. Can\'t wait to do it again!',
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&h=600&fit=crop',
        alt: 'Santorini sunset'
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1601581987809-a874a81309c9?w=800&h=600&fit=crop',
        alt: 'Greek island beach'
      }
    ],
    verified: true
  },
  {
    id: '6',
    tourName: 'New Zealand South Island Adventure',
    tourDestination: 'New Zealand',
    userName: 'James Wilson',
    userAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop',
    rating: 5,
    date: '2024-01-28',
    quote: 'Adventure seeker\'s paradise! Bungee jumping, hiking, and stunning landscapes.',
    fullReview: 'If you love adventure and nature, this is the tour for you. We did everything from skydiving to glacier hiking to exploring fjords. The scenery is like something out of a movie - because it literally is! Lord of the Rings fans will be in heaven.',
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=800&h=600&fit=crop',
        alt: 'Milford Sound fjord'
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop',
        alt: 'Mountain landscape'
      }
    ],
    verified: true
  }
];
