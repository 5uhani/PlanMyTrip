import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, MapPin, Compass, ArrowRight, Star, Heart, Calendar, DollarSign, Award, Shield, CheckCircle2 } from 'lucide-react';
import Hero from '../components/Hero.jsx';
import DestinationCard from '../components/DestinationCard.jsx';
import { DESTINATIONS, CATEGORIES } from '../data/destinations.js';
import { FEATURED_TRIPS } from '../data/defaultItineraries.js';
import { formatCurrency } from '../utils/helpers.js';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();

  const filteredDestinations = selectedCategory === 'All'
    ? DESTINATIONS.slice(0, 6)
    : DESTINATIONS.filter(d => d.category === selectedCategory).slice(0, 6);

  const handlePlanTrip = (destination) => {
    navigate(`/planner?dest=${destination.id}`);
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Popular Destinations Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 text-xs font-semibold uppercase tracking-wider mb-2 border border-teal-200/60 dark:border-teal-800/60">
              <Compass className="w-3.5 h-3.5" />
              <span>Explore The World</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100">
              Popular Destinations
            </h2>
            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
              Handpicked travel gems from bustling neon metropolises to serene tropical island sanctuaries.
            </p>
          </div>

          <Link
            to="/destinations"
            className="inline-flex items-center gap-2 text-sm font-semibold text-teal-600 dark:text-teal-400 hover:text-teal-500 transition-colors group"
          >
            <span>View All Destinations ({DESTINATIONS.length})</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {CATEGORIES.slice(0, 6).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-md shadow-teal-500/20 scale-105'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid of Destination Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredDestinations.map((dest) => (
            <DestinationCard
              key={dest.id}
              destination={dest}
              onPlanTrip={handlePlanTrip}
            />
          ))}
        </div>
      </section>

      {/* 3. Featured Trips Section */}
      <section className="bg-slate-100 dark:bg-slate-900/60 py-16 sm:py-20 border-y border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 text-xs font-semibold uppercase tracking-wider border border-amber-200/60 dark:border-amber-800/60">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ready-to-Use Itineraries</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100 font-poppins">
              Featured Pre-Built Trips
            </h2>
            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
              Need instant inspiration? Clone these comprehensive day-wise itineraries directly into your planner and customize them to your style.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FEATURED_TRIPS.map((trip) => (
              <div
                key={trip.id}
                className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800/80 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1"
              >
                <div>
                  <div className="relative h-48 overflow-hidden">
                    <img src={trip.image} alt={trip.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                      <span className="text-xs font-bold bg-teal-600 px-2.5 py-1 rounded-lg shadow-sm">
                        {trip.days} Days
                      </span>
                      <span className="text-xs font-bold bg-slate-900/80 px-2.5 py-1 rounded-lg backdrop-blur-md">
                        Est. {formatCurrency(trip.estimatedCost, 'USD')}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex flex-wrap gap-1.5">
                      {trip.tags.map(t => (
                        <span key={t} className="text-[10px] font-semibold uppercase bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-md">
                          {t}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 line-clamp-1">
                      {trip.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                      {trip.description}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                    <Star className="w-4 h-4 fill-amber-500" />
                    <span>{trip.rating}</span>
                    <span className="text-slate-400 font-normal">({trip.reviews})</span>
                  </div>
                  <Link
                    to={`/planner?dest=${trip.destinationId}&days=${trip.days}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-50 dark:bg-teal-950/60 hover:bg-teal-100 dark:hover:bg-teal-900/60 text-teal-600 dark:text-teal-400 text-xs font-semibold transition-colors"
                  >
                    <span>Clone & Customize</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Feature Highlights Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100">
            Why Plan With PlanMyTrip?
          </h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
            Everything you need to turn travel dreams into structured, seamless itineraries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-100 dark:bg-teal-950/60 flex items-center justify-center text-teal-600 dark:text-teal-400">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Smart AI Day-wise Itineraries</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Generate intelligent schedules optimized by your travel pace, budget level, and personal interests in seconds.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-sky-100 dark:bg-sky-950/60 flex items-center justify-center text-sky-600 dark:text-sky-400">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Live Weather & REST Country Info</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Check real-time atmospheric conditions from Open-Meteo and official country data including currency, language, and timezones.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <DollarSign className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Accurate Budget Estimator</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Calculate costs for accommodation, dining, transit, and activities with interactive visual progress bars.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Call to Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-700 rounded-3xl p-8 sm:p-12 lg:p-16 text-white shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-4 max-w-2xl text-center lg:text-left z-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-poppins">
              Ready to Craft Your Next Great Adventure?
            </h2>
            <p className="text-base sm:text-lg text-teal-100 font-light leading-relaxed">
              Join thousands of world travelers. Build your custom itinerary, check weather forecasts, and estimate expenses today.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 z-10 shrink-0">
            <Link
              to="/planner"
              className="px-8 py-4 rounded-xl bg-white text-teal-800 font-bold shadow-xl hover:bg-slate-100 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Start Trip Planner Now
            </Link>
            <Link
              to="/signup"
              className="px-6 py-4 rounded-xl bg-teal-800/80 hover:bg-teal-800 text-white font-semibold border border-white/20 backdrop-blur-md transition-all"
            >
              Create Free Account
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
