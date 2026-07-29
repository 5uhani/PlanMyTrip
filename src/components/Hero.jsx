import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Compass, MapPin, Calculator, ArrowRight, Star } from 'lucide-react';
import SearchBar from './SearchBar.jsx';

const Hero = ({ onSearchSubmit }) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-teal-900 via-slate-900 to-slate-950 text-white py-16 sm:py-24 lg:py-32">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-teal-500 blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -left-40 w-96 h-96 rounded-full bg-emerald-500 blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs sm:text-sm font-medium backdrop-blur-sm animate-fade-in">
            <Sparkles className="w-4 h-4 text-teal-400" />
            <span>Smart AI & Itinerary Generator Powered by Live Data</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight sm:leading-none font-poppins">
            Explore the World, <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-teal-400 via-emerald-300 to-sky-400 bg-clip-text text-transparent">
              Planned Perfectly.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed font-light">
            Build custom day-wise travel itineraries in seconds. Discover top destinations, check real-time Open-Meteo weather forecasts, and calculate detailed travel budgets effortlessly.
          </p>

          {/* Quick CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2">
            <Link
              to="/planner"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white font-semibold shadow-lg shadow-teal-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Sparkles className="w-5 h-5" />
              Start Trip Planner
            </Link>
            <Link
              to="/destinations"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold border border-white/20 backdrop-blur-md transition-all"
            >
              <MapPin className="w-5 h-5 text-teal-400" />
              Explore Destinations
            </Link>
          </div>
        </div>

        {/* Embedded Interactive Search Bar */}
        <div className="mt-12 sm:mt-16 max-w-4xl mx-auto">
          <SearchBar onSearchSubmit={onSearchSubmit} />
        </div>

        {/* Hero Stats */}
        <div className="mt-16 pt-10 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-2xl sm:text-3xl font-bold text-white">50+</p>
            <p className="text-xs sm:text-sm text-slate-400">Curated Destinations</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-bold text-white">100% Free</p>
            <p className="text-xs sm:text-sm text-slate-400">Live Weather & Budgets</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-bold text-white">25k+</p>
            <p className="text-xs sm:text-sm text-slate-400">Itineraries Generated</p>
          </div>
          <div>
            <div className="flex items-center justify-center gap-1 text-amber-400 font-bold text-xl sm:text-2xl">
              <span>4.9</span>
              <Star className="w-5 h-5 fill-amber-400" />
            </div>
            <p className="text-xs sm:text-sm text-slate-400">Traveler Satisfaction</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
