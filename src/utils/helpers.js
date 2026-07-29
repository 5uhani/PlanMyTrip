// Utility and Helper functions for PlanMyTrip

/**
 * Format number into currency string
 * @param {number} amount - Cost amount
 * @param {string} currency - Currency code (default USD)
 */
export const formatCurrency = (amount, currency = 'USD') => {
  if (amount === undefined || amount === null) return '$0';
  const symbols = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    IDR: 'Rp ',
    CHF: 'CHF ',
    AED: 'AED ',
    ISK: 'kr ',
    ZAR: 'R '
  };
  const symbol = symbols[currency] || '$';
  return `${symbol}${Number(amount).toLocaleString()}`;
};

/**
 * Calculate total estimated budget based on days and multiplier
 */
export const calculateEstimatedCost = (dailyRate, days, multiplier = 1.0) => {
  if (!dailyRate || !days) return 0;
  return Math.round(dailyRate * days * multiplier);
};

/**
 * Map WMO weather code from Open-Meteo to human readable condition & icon name
 */
export const getWeatherCondition = (code) => {
  if (code === undefined || code === null) return { condition: "Sunny", icon: "Sun", color: "text-amber-500" };
  
  if (code === 0) return { condition: "Clear Sky", icon: "Sun", color: "text-amber-500" };
  if ([1, 2, 3].includes(code)) return { condition: "Partly Cloudy", icon: "CloudSun", color: "text-sky-500" };
  if ([45, 48].includes(code)) return { condition: "Foggy & Mist", icon: "CloudFog", color: "text-slate-400" };
  if ([51, 53, 55, 56, 57].includes(code)) return { condition: "Light Drizzle", icon: "CloudDrizzle", color: "text-blue-400" };
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return { condition: "Rain Showers", icon: "CloudRain", color: "text-blue-600" };
  if ([71, 73, 75, 77, 85, 86].includes(code)) return { condition: "Snowfall", icon: "Snowflake", color: "text-indigo-400" };
  if ([95, 96, 99].includes(code)) return { condition: "Thunderstorm", icon: "CloudLightning", color: "text-purple-600" };
  
  return { condition: "Pleasant", icon: "Sun", color: "text-amber-500" };
};

/**
 * Generate a smart automated day-wise itinerary based on destination and preferences
 */
export const generateAutomatedItinerary = (destination, days, budgetLevel = "moderate", interests = []) => {
  const itinerary = [];
  const destName = destination.name || "Destination";
  
  const sampleActivitiesPool = [
    { title: `Morning Walking Tour of ${destName} Highlights`, time: "09:00 AM", desc: `Get oriented with the city's top landmarks and historic architecture.`, cost: 15 },
    { title: `Local Market Tasting & Culinary Lunch`, time: "12:30 PM", desc: `Savor authentic street foods and regional specialties at a lively bazaar.`, cost: 25 },
    { title: `Visit Famous Museum or Heritage Shrine`, time: "03:00 PM", desc: `Immerse yourself in the art, history, and cultural traditions.`, cost: 18 },
    { title: `Sunset Viewpoint & Scenic Promenade`, time: "06:00 PM", desc: `Relax and take breathtaking panoramic photos during the golden hour.`, cost: 0 },
    { title: `Authentic Regional Dinner Experience`, time: "08:00 PM", desc: `Dine at a recommended local restaurant with signature dishes.`, cost: 40 },
    { title: `Nature Trail & Scenic Outdoor Excursion`, time: "09:30 AM", desc: `Explore pristine parks, botanical gardens, or coastal paths.`, cost: 10 },
    { title: `Artisan Souvenir Shopping & Crafts`, time: "02:00 PM", desc: `Browse independent boutiques and craft workshops for unique gifts.`, cost: 20 },
    { title: `Evening Cultural Show or Live Music`, time: "07:30 PM", desc: `Experience traditional dance, music, or local entertainment.`, cost: 30 }
  ];

  // Adjust cost multiplier based on budget level
  const mult = budgetLevel === "budget" ? 0.6 : budgetLevel === "luxury" ? 1.8 : 1.0;

  for (let d = 1; d <= days; d++) {
    const dayActivities = [];
    
    // Pick 3-4 activities per day dynamically
    const act1 = sampleActivitiesPool[(d * 2) % sampleActivitiesPool.length];
    const act2 = sampleActivitiesPool[(d * 3 + 1) % sampleActivitiesPool.length];
    const act3 = sampleActivitiesPool[(d * 4 + 2) % sampleActivitiesPool.length];
    
    dayActivities.push({
      id: `d${d}-a1`,
      time: "09:30 AM",
      title: d === 1 ? `Arrival & Welcome Exploration of ${destName}` : act1.title,
      description: d === 1 ? `Check in to your accommodation and take an easy intro stroll around the neighborhood.` : act1.desc,
      cost: Math.round(act1.cost * mult)
    });

    dayActivities.push({
      id: `d${d}-a2`,
      time: "01:00 PM",
      title: act2.title,
      description: act2.desc,
      cost: Math.round(act2.cost * mult)
    });

    dayActivities.push({
      id: `d${d}-a3`,
      time: "05:30 PM",
      title: d === days ? `Farewell Sunset Toast & Souvenir Shopping` : act3.title,
      description: d === days ? `Pick up final memories and celebrate an amazing vacation in ${destName}.` : act3.desc,
      cost: Math.round(act3.cost * mult)
    });

    itinerary.push({
      day: d,
      title: d === 1 ? `Day 1: Arrival & Orientation` : d === days ? `Day ${d}: Farewell & Memories` : `Day ${d}: Discovering ${destName} Highlights`,
      activities: dayActivities
    });
  }

  return itinerary;
};

/**
 * LocalStorage Helpers for user preferences and recent searches
 */
export const storageHelpers = {
  getTheme: () => {
    try {
      return localStorage.getItem('pmt_theme') || 'light';
    } catch {
      return 'light';
    }
  },
  setTheme: (theme) => {
    try {
      localStorage.setItem('pmt_theme', theme);
    } catch (e) {
      console.error(e);
    }
  },
  getRecentSearches: () => {
    try {
      const data = localStorage.getItem('pmt_recent_searches');
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },
  addRecentSearch: (query) => {
    if (!query || query.trim() === '') return;
    try {
      let searches = storageHelpers.getRecentSearches();
      searches = searches.filter(s => s.toLowerCase() !== query.toLowerCase());
      searches.unshift(query);
      if (searches.length > 5) searches = searches.slice(0, 5);
      localStorage.setItem('pmt_recent_searches', JSON.stringify(searches));
    } catch (e) {
      console.error(e);
    }
  },
  clearRecentSearches: () => {
    try {
      localStorage.removeItem('pmt_recent_searches');
    } catch (e) {
      console.error(e);
    }
  }
};
