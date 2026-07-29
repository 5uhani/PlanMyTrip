import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, DollarSign, Calendar, ArrowRight, Sparkles } from 'lucide-react';
import { formatCurrency } from '../utils/helpers.js';

const DestinationCard = ({ destination, onPlanTrip }) => {
  if (!destination) return null;

  return (
    <div className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800/80 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1">
      
      {/* Image & Category Banner */}
      <div className="relative h-56 w-full overflow-hidden bg-slate-200 dark:bg-slate-800">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
        
        {/* Category Pill */}
        <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/90 dark:bg-slate-900/90 text-teal-700 dark:text-teal-300 backdrop-blur-md shadow-sm border border-white/20">
          {destination.category}
        </span>

        {/* Rating Badge */}
        <div className="absolute top-3.5 right-3.5 flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900/80 text-amber-400 text-xs font-bold backdrop-blur-md">
          <Star className="w-3.5 h-3.5 fill-amber-400" />
          <span>{destination.rating}</span>
          <span className="text-[10px] text-slate-300 font-normal">({destination.reviewsCount})</span>
        </div>

        {/* Name & Country on Image Bottom */}
        <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
          <h3 className="text-xl font-bold tracking-tight drop-shadow-sm">
            {destination.name}
          </h3>
          <p className="flex items-center gap-1 text-xs text-slate-200 mt-0.5">
            <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
            <span>{destination.country}</span>
          </p>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
          {destination.description}
        </p>

        {/* Best Season & Cost info */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-2 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              <span>Best Time:</span>
            </span>
            <span className="font-medium text-slate-700 dark:text-slate-200 truncate max-w-[140px]" title={destination.bestSeason}>
              {destination.bestSeason}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Est. Daily Cost:</span>
            </span>
            <span className="font-bold text-sm text-emerald-600 dark:text-emerald-400">
              {formatCurrency(destination.estimatedDailyBudget, 'USD')} <span className="text-slate-400 font-normal text-xs">/ day</span>
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex items-center gap-2">
          <Link
            to={`/destinations/${destination.id}`}
            className="flex-1 text-center py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold transition-colors"
          >
            Explore Details
          </Link>
          <Link
            to={`/planner?dest=${destination.id}`}
            onClick={() => onPlanTrip && onPlanTrip(destination)}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white text-xs font-semibold shadow-md shadow-teal-500/20 transition-all"
            title="Create Custom Itinerary"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Plan Trip</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
