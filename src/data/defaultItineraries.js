export const FEATURED_TRIPS = [
  {
    id: "trip-paris-5days",
    title: "5 Days of Romance & Art in Paris",
    destinationId: "paris-france",
    destinationName: "Paris, France",
    days: 5,
    budgetLevel: "moderate",
    estimatedCost: 900,
    rating: 4.9,
    reviews: 84,
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
    tags: ["Culture", "Romance", "Food"],
    description: "Experience the quintessential Parisian dream: morning croissants by the Seine, world-renowned masterpieces at the Louvre, and champagne under the sparkling Eiffel Tower.",
    itinerary: [
      {
        day: 1,
        title: "Arrival & Historic Heart of Paris",
        activities: [
          { time: "09:30 AM", title: "Walk along the Seine & Notre-Dame Cathedral Exterior", description: "Start your Parisian journey strolling the historic Ile de la Cité.", cost: 0 },
          { time: "11:30 AM", title: "Sainte-Chapelle Glass Windows", description: "Marvel at the 13th-century Gothic chapel famous for its mesmerizing stained glass.", cost: 15 },
          { time: "01:30 PM", title: "Lunch at a traditional Bistro in Latin Quarter", description: "Enjoy French onion soup and croque monsieur.", cost: 28 },
          { time: "03:30 PM", title: "Explore Shakespeare and Company Bookstore", description: "Visit the legendary English-language bookstore on the Left Bank.", cost: 0 },
          { time: "07:30 PM", title: "Sunset River Cruise on the Seine", description: "Glide past illuminated monuments with commentary.", cost: 20 }
        ]
      },
      {
        day: 2,
        title: "Artistic Masterpieces & Royal Gardens",
        activities: [
          { time: "09:00 AM", title: "The Louvre Museum", description: "Discover the Mona Lisa, Venus de Milo, and Winged Victory of Samothrace.", cost: 22 },
          { time: "01:00 PM", title: "Stroll through Tuileries Garden", description: "Relax by the fountains and statues in the royal garden.", cost: 0 },
          { time: "02:30 PM", title: "Musée d'Orsay Impressionist Art", description: "Admire works by Monet, Van Gogh, Renoir, and Degas in a grand Beaux-Arts railway station.", cost: 16 },
          { time: "06:00 PM", title: "Evening walk along Champs-Élysées & Arc de Triomphe", description: "Climb the terrace of Arc de Triomphe for panoramic avenue views.", cost: 14 }
        ]
      },
      {
        day: 3,
        title: "Eiffel Tower & Bohemian Montmartre",
        activities: [
          { time: "09:30 AM", title: "Eiffel Tower Summit Ascent", description: "Ride the elevator to the top of Paris's most famous landmark.", cost: 29 },
          { time: "12:30 PM", title: "Picnic at Champ de Mars", description: "Enjoy fresh baguettes, cheese, and pastries on the lawn.", cost: 18 },
          { time: "03:00 PM", title: "Explore Montmartre & Place du Tertre", description: "Wander cobblestone streets where Picasso and Van Gogh once lived.", cost: 0 },
          { time: "05:00 PM", title: "Visit Sacré-Cœur Basilica", description: "Take in the breathtaking view over all of Paris from the white domed basilica.", cost: 0 },
          { time: "08:00 PM", title: "Traditional Dinner & Cabaret Atmosphere", description: "Savor duck confit and French wine in Montmartre.", cost: 45 }
        ]
      },
      {
        day: 4,
        title: "Grand Versailles Palace Day Trip",
        activities: [
          { time: "08:30 AM", title: "RER Train to Versailles", description: "Comfortable train journey from central Paris.", cost: 8 },
          { time: "09:30 AM", title: "Château de Versailles & Hall of Mirrors", description: "Explore the opulent royal apartments of Louis XIV and Marie Antoinette.", cost: 24 },
          { time: "01:00 PM", title: "Explore the Grand Gardens of Versailles", description: "Walk or rent a bicycle around the Grand Canal and Trianon palaces.", cost: 0 },
          { time: "06:00 PM", title: "Return to Paris & Dinner in Le Marais", description: "Experience trendy boutiques and kosher bakeries in the historic Jewish quarter.", cost: 35 }
        ]
      },
      {
        day: 5,
        title: "Fashion Shopping & Farewell Parisian Treats",
        activities: [
          { time: "10:00 AM", title: "Galeries Lafayette Haussmann & Rooftop View", description: "Admire the Neo-classical glass dome and enjoy free panoramic city views.", cost: 0 },
          { time: "12:30 PM", title: "Macaron Tasting at Ladurée or Pierre Hermé", description: "Treat yourself to world-famous gourmet macarons.", cost: 18 },
          { time: "03:00 PM", title: "Opéra Garnier Architectural Tour", description: "Step inside the magnificent opera house that inspired Phantom of the Opera.", cost: 15 },
          { time: "07:00 PM", title: "Farewell Gourmet Dinner", description: "Celebrate your unforgettable Parisian journey.", cost: 60 }
        ]
      }
    ]
  },
  {
    id: "trip-bali-7days",
    title: "7 Days Island Paradise in Bali",
    destinationId: "bali-indonesia",
    destinationName: "Bali, Indonesia",
    days: 7,
    budgetLevel: "budget",
    estimatedCost: 525,
    rating: 4.9,
    reviews: 112,
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
    tags: ["Beach", "Wellness", "Temples"],
    description: "Immerse yourself in spiritual Ubud rice terraces, majestic ocean cliff temples, turquoise island snorkeling, and golden beach sunsets.",
    itinerary: [
      {
        day: 1,
        title: "Arrival & Seminyak Beach Sunset",
        activities: [
          { time: "02:00 PM", title: "Check-in & Relax at Seminyak Resort", description: "Unwind by the pool with fresh coconut water.", cost: 0 },
          { time: "05:00 PM", title: "Seminyak Beach Sunset Stroll", description: "Watch the sky turn vibrant purple and orange over the Indian Ocean.", cost: 0 },
          { time: "07:30 PM", title: "Welcome Dinner at Beachfront Cafe", description: "Enjoy grilled seafood and Indonesian Nasi Goreng.", cost: 18 }
        ]
      },
      {
        day: 2,
        title: "Ubud Culture & Sacred Monkey Forest",
        activities: [
          { time: "09:00 AM", title: "Sacred Monkey Forest Sanctuary Ubud", description: "Wander ancient temple ruins amidst hundreds of playful long-tailed macaques.", cost: 6 },
          { time: "11:30 AM", title: "Ubud Traditional Art Market", description: "Shop for handcrafted woven bags, batik sarongs, and wood carvings.", cost: 15 },
          { time: "01:30 PM", title: "Healthy Organic Lunch in Ubud", description: "Savor smoothie bowls and farm-to-table Balinese delicacies.", cost: 12 },
          { time: "03:30 PM", title: "Tegalalang Rice Terraces & Jungle Swing", description: "Walk through emerald terraced paddies and try the iconic Ubud swing.", cost: 14 }
        ]
      },
      {
        day: 3,
        title: "Waterfalls & Holy Water Cleansing",
        activities: [
          { time: "08:30 AM", title: "Tegenungan & Kanto Lampo Waterfalls", description: "Swim in refreshing natural jungle plunge pools.", cost: 5 },
          { time: "11:30 AM", title: "Tirta Empul Water Temple", description: "Participate in a traditional Hindu spiritual purification bath.", cost: 4 },
          { time: "03:00 PM", title: "Coffee Plantation & Luwak Coffee Tasting", description: "Learn traditional coffee roasting and taste exotic herbal teas.", cost: 8 }
        ]
      },
      {
        day: 4,
        title: "Nusa Penida Island Adventure",
        activities: [
          { time: "07:30 AM", title: "Fast Boat from Sanur to Nusa Penida", description: "Scenic 45-minute ocean crossing.", cost: 22 },
          { time: "09:30 AM", title: "Kelingking Beach T-Rex Cliff", description: "Photograph one of the most iconic coastal viewpoints in the world.", cost: 3 },
          { time: "01:00 PM", title: "Angel's Billabong & Broken Beach", description: "Explore natural ocean infinity pools and limestone sea arches.", cost: 0 },
          { time: "03:30 PM", title: "Crystal Bay Snorkeling", description: "Swim with vibrant tropical fish and sea turtles in clear turquoise waters.", cost: 10 }
        ]
      },
      {
        day: 5,
        title: "Uluwatu Cliff Temple & Kecak Fire Dance",
        activities: [
          { time: "10:00 AM", title: "Padang Padang or Bingin Beach Swimming", description: "Relax on white sand surf beaches enclosed by limestone cliffs.", cost: 3 },
          { time: "04:30 PM", title: "Uluwatu Temple Cliff Walk", description: "Explore an ancient sea temple perched 70 meters above crashing waves.", cost: 4 },
          { time: "06:00 PM", title: "Traditional Kecak Fire Dance at Sunset", description: "Witness a dramatic hypnotic Balinese dance performance at twilight.", cost: 12 },
          { time: "08:00 PM", title: "Jimbaran Bay Seafood Dinner on the Sand", description: "Dine by candlelight right on the beach.", cost: 25 }
        ]
      },
      {
        day: 6,
        title: "Holistic Wellness & Spa Day",
        activities: [
          { time: "09:00 AM", title: "Morning Yoga Session in Jungle Shala", description: "Rejuvenate mind and body looking out over lush ravines.", cost: 12 },
          { time: "01:00 PM", title: "Full Balinese Flower Bath & Spa Treatment", description: "Enjoy a 2-hour massage, body scrub, and aromatic petal bath.", cost: 35 },
          { time: "06:00 PM", title: "Sunset at Canggu Beach Club", description: "Listen to chill tropical beats with fresh fruit cocktails.", cost: 20 }
        ]
      },
      {
        day: 7,
        title: "Souvenir Shopping & Farewell Bali",
        activities: [
          { time: "10:00 AM", title: "Love Anchor Market Canggu", description: "Pick up bohemian jewelry, local spices, and handmade ceramics.", cost: 25 },
          { time: "01:00 PM", title: "Farewell Balinese Feast", description: "Celebrate your incredible island trip.", cost: 20 },
          { time: "04:00 PM", title: "Transfer to Denpasar Airport (DPS)", description: "Safe travels home!", cost: 10 }
        ]
      }
    ]
  },
  {
    id: "trip-kyoto-4days",
    title: "4 Days Ancient Temples of Kyoto",
    destinationId: "kyoto-japan",
    destinationName: "Kyoto, Japan",
    days: 4,
    budgetLevel: "moderate",
    estimatedCost: 560,
    rating: 4.8,
    reviews: 67,
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
    tags: ["History", "Culture", "Gardens"],
    description: "Step back in time among thousands of vermilion torii gates, tranquil Zen rock gardens, whispering bamboo groves, and mysterious geisha alleys.",
    itinerary: [
      {
        day: 1,
        title: "Fushimi Inari & Historic Southern Kyoto",
        activities: [
          { time: "08:30 AM", title: "Fushimi Inari Shrine Torii Gate Hike", description: "Walk through 10,000 vibrant orange torii gates winding up Mount Inari.", cost: 0 },
          { time: "01:00 PM", title: "Lunch at Nishiki Market (The Kitchen of Kyoto)", description: "Taste takoyaki, matcha ice cream, and fresh seafood skewers.", cost: 20 },
          { time: "03:30 PM", title: "Kiyomizu-dera Wooden Temple", description: "Marvel at the UNESCO heritage temple built without a single nail overlooking Kyoto.", cost: 8 },
          { time: "06:30 PM", title: "Evening Walk in Gion Geisha District", description: "Stroll lantern-lit wooden machiya streets looking for geiko and maiko.", cost: 0 }
        ]
      },
      {
        day: 2,
        title: "Arashiyama Bamboo Forest & Golden Pavilion",
        activities: [
          { time: "08:00 AM", title: "Arashiyama Bamboo Grove", description: "Experience the ethereal morning light filtering through towering green bamboo stalks.", cost: 0 },
          { time: "10:30 AM", title: "Tenryu-ji Zen Temple Garden", description: "Admire one of Kyoto's finest 14th-century landscape gardens.", cost: 6 },
          { time: "01:00 PM", title: "Traditional Soba Noodle Lunch by Katsura River", description: "Handmade buckwheat noodles with tempura.", cost: 18 },
          { time: "03:30 PM", title: "Kinkaku-ji (The Golden Pavilion)", description: "Witness the magnificent Zen temple whose top two floors are covered in gold leaf.", cost: 6 }
        ]
      },
      {
        day: 3,
        title: "Zen Meditation & Authentic Tea Ceremony",
        activities: [
          { time: "09:00 AM", title: "Ryoan-ji Rock Garden", description: "Contemplate Japan's most famous dry landscape rock garden.", cost: 5 },
          { time: "11:30 AM", title: "Traditional Japanese Tea Ceremony Experience", description: "Learn the mindful preparation of matcha green tea in a tatami mat room.", cost: 30 },
          { time: "02:30 PM", title: "Nijo Castle & Nightingale Floors", description: "Explore the former shogun's residence with squeaking wooden security floors.", cost: 10 },
          { time: "07:00 PM", title: "Kaiseki Multi-Course Traditional Dinner", description: "An artistic seasonal dining experience.", cost: 65 }
        ]
      },
      {
        day: 4,
        title: "Philosopher's Path & Silver Pavilion",
        activities: [
          { time: "09:30 AM", title: "Ginkaku-ji (The Silver Pavilion)", description: "Explore meticulous sand cones and moss gardens.", cost: 5 },
          { time: "11:30 AM", title: "Walk along the Philosopher's Path", description: "A tranquil stone path alongside a canal lined with cherry trees.", cost: 0 },
          { time: "02:00 PM", title: "Matcha Sweets & Souvenir Shopping in Higashiyama", description: "Buy authentic green tea treats, ceramics, and folding fans.", cost: 25 }
        ]
      }
    ]
  }
];
