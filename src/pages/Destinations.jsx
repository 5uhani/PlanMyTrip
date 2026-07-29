import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, MapPin, Tag, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import DestinationCard from '../components/DestinationCard.jsx';
import { DESTINATIONS, CATEGORIES } from '../data/destinations.js';

const Destinations = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const initialQuery = searchParams.get('q') || '';
  const initialCategory = searchParams.get('category') || 'All';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState('rating'); // rating, budget-asc, budget-desc, name
  const [maxBudget, setMaxBudget] = useState(300);

  const filteredDestinations = useMemo(() => {
    return DESTINATIONS.filter(dest => {
      const matchesQuery = 
        dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || dest.category === selectedCategory;
      const matchesBudget = dest.estimatedDailyBudget <= maxBudget;

      return matchesQuery && matchesCategory && matchesBudget;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'budget-asc') return a.estimatedDailyBudget - b.estimatedDailyBudget;
      if (sortBy === 'budget-desc') return b.estimatedDailyBudget - a.estimatedDailyBudget;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });
  }, [searchQuery, selectedCategory, sortBy, maxBudget]);

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    const params = new URLSearchParams(searchParams);
    if (cat === 'All') params.delete('category');
    else params.set('category', cat);
    setSearchParams(params);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-800 via-slate-900 to-slate-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-teal-500/20 blur-3xl pointer-events-none" />
        <div className="max-w-2xl space-y-3 relative z-10">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-400 bg-teal-950/60 px-3 py-1 rounded-full border border-teal-800/60">
            World Directory
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-poppins">
            Explore Destinations
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
            Browse our comprehensive collection of global travel destinations. Check daily budget estimates, best seasons, and live weather conditions.
          </p>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-lg space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by city or country..."
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Sort Select */}
          <div className="relative flex items-center bg-slate-50 dark:bg-slate-800 rounded-xl px-3.5 border border-slate-200 dark:border-slate-700">
            <ArrowUpDown className="w-5 h-5 text-slate-400 shrink-0 mr-2" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-transparent py-3 text-slate-800 dark:text-slate-100 text-sm focus:outline-none cursor-pointer"
            >
              <option value="rating" className="bg-white dark:bg-slate-900">Sort by Rating (Highest)</option>
              <option value="budget-asc" className="bg-white dark:bg-slate-900">Sort by Budget (Lowest to Highest)</option>
              <option value="budget-desc" className="bg-white dark:bg-slate-900">Sort by Budget (Highest to Lowest)</option>
              <option value="name" className="bg-white dark:bg-slate-900">Sort Alphabetically (A-Z)</option>
            </select>
          </div>

          {/* Max Daily Budget Slider */}
          <div className="flex flex-col justify-center px-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              <span>Max Daily Budget:</span>
              <span className="text-teal-600 dark:text-teal-400 font-bold">${maxBudget}/day</span>
            </div>
            <input
              type="range"
              min="50"
              max="300"
              step="10"
              value={maxBudget}
              onChange={(e) => setMaxBudget(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-600"
            />
          </div>

        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-slate-100 dark:border-slate-800 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-md shadow-teal-500/20'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count & Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
            Showing <span className="font-bold text-slate-800 dark:text-slate-100">{filteredDestinations.length}</span> destinations
          </p>
          {(searchQuery || selectedCategory !== 'All' || maxBudget < 300) && (
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); setMaxBudget(300); }}
              className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>

        {filteredDestinations.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md">
            <MapPin className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3 animate-bounce" />
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">No destinations found</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Try adjusting your search keywords or budget range slider.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredDestinations.map((dest) => (
              <DestinationCard key={dest.id} destination={dest} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default Destinations;
