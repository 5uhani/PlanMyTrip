import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Star, 
  Calendar, 
  DollarSign, 
  Sparkles, 
  Globe, 
  Users, 
  Languages, 
  Clock, 
  ArrowLeft, 
  CheckCircle2, 
  Compass, 
  ExternalLink 
} from 'lucide-react';
import { DESTINATIONS } from '../data/destinations.js';
import { fetchCountryInfo } from '../services/api.js';
import WeatherCard from '../components/WeatherCard.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import Button from '../components/Button.jsx';
import { formatCurrency } from '../utils/helpers.js';

const DestinationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [countryInfo, setCountryInfo] = useState(null);
  const [loadingCountry, setLoadingCountry] = useState(true);

  const destination = DESTINATIONS.find(d => d.id === id);

  useEffect(() => {
    if (destination?.countryCode) {
      setLoadingCountry(true);
      fetchCountryInfo(destination.countryCode)
        .then(res => setCountryInfo(res))
        .catch(() => setCountryInfo(null))
        .finally(() => setLoadingCountry(false));
    } else {
      setLoadingCountry(false);
    }
  }, [destination]);

  if (!destination) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <Compass className="w-16 h-16 text-slate-300 dark:text-slate-700 mx-auto animate-spin-slow" />
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Destination Not Found</h2>
        <p className="text-sm text-slate-500">We could not locate the destination details you requested.</p>
        <Link to="/destinations">
          <Button variant="primary" size="md">Back to All Destinations</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      
      {/* Back Button */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Destinations</span>
        </button>
      </div>

      {/* Hero Banner */}
      <div className="relative h-72 sm:h-96 lg:h-[450px] rounded-3xl overflow-hidden shadow-2xl bg-slate-900">
        <img
          src={destination.bannerImage || destination.image}
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        
        <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 text-white space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-600 text-white shadow-sm">
              {destination.category}
            </span>
            <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-slate-900/80 text-amber-400 text-xs font-bold backdrop-blur-md">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{destination.rating}</span>
              <span className="text-slate-300 font-normal">({destination.reviewsCount} reviews)</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-poppins drop-shadow-md">
            {destination.name}
          </h1>
          <p className="flex items-center gap-2 text-sm sm:text-base text-slate-200">
            <MapPin className="w-4 h-4 text-teal-400" />
            <span>{destination.country}</span>
            {countryInfo?.flagEmoji && <span>{countryInfo.flagEmoji}</span>}
          </p>
        </div>
      </div>

      {/* Main Grid: Info + Weather + REST Country Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left 2 Cols: Description, Highlights, Activities */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Overview */}
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-md space-y-4">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">About {destination.name}</h3>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {destination.description}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-100 dark:border-teal-900">
                <Calendar className="w-6 h-6 text-teal-600 dark:text-teal-400 shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase">Best Season to Visit</p>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{destination.bestSeason}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900">
                <DollarSign className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase">Estimated Daily Budget</p>
                  <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                    {formatCurrency(destination.estimatedDailyBudget, 'USD')} <span className="text-xs text-slate-500 font-normal">/ day</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Highlights */}
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-md space-y-4">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Top Highlights & Landmarks</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {destination.highlights.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                  <CheckCircle2 className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0" />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Popular Activities */}
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-md space-y-4">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Popular Activities & Experiences</h3>
            <div className="flex flex-wrap gap-2.5">
              {destination.popularActivities.map((act, idx) => (
                <span key={idx} className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-sm font-semibold border border-slate-200 dark:border-slate-700">
                  ⚡ {act}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Right Col: Live Weather + REST Countries Info + CTA */}
        <div className="space-y-6">
          
          {/* CTA Box */}
          <div className="bg-gradient-to-br from-teal-600 to-emerald-600 rounded-2xl p-6 text-white shadow-xl space-y-4 text-center">
            <Sparkles className="w-10 h-10 text-teal-200 mx-auto animate-bounce" />
            <h3 className="text-xl font-bold">Plan Your Trip to {destination.name}</h3>
            <p className="text-xs text-teal-100 leading-relaxed">
              Generate a personalized AI day-wise itinerary with custom budgets, accommodations, and activity times.
            </p>
            <Link to={`/planner?dest=${destination.id}`} className="block">
              <button className="w-full py-3.5 bg-white text-teal-800 rounded-xl font-bold text-sm shadow-md hover:bg-slate-100 transition-all active:scale-95">
                Build AI Itinerary Now
              </button>
            </Link>
          </div>

          {/* Open-Meteo Weather Card */}
          <WeatherCard
            lat={destination.lat}
            lng={destination.lng}
            destinationName={destination.name}
          />

          {/* REST Countries Information */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-md space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 px-2.5 py-0.5 rounded-full border border-sky-200 dark:border-sky-800">
                REST Countries API
              </span>
              <h4 className="text-base font-bold text-slate-800 dark:text-slate-100">Country Profile</h4>
            </div>

            {loadingCountry ? (
              <div className="py-8 text-center text-xs text-slate-400">
                <Globe className="w-6 h-6 text-sky-500 animate-spin mx-auto mb-2" />
                <span>Loading country statistics...</span>
              </div>
            ) : !countryInfo ? (
              <p className="text-xs text-slate-400 text-center py-4">Country details unavailable</p>
            ) : (
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-slate-800/60">
                  <span className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                    <Globe className="w-4 h-4 text-teal-500" />
                    <span>Official Name:</span>
                  </span>
                  <span className="font-semibold text-right text-slate-800 dark:text-slate-200 max-w-[180px] truncate">{countryInfo.officialName}</span>
                </div>

                <div className="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-slate-800/60">
                  <span className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                    <MapPin className="w-4 h-4 text-emerald-500" />
                    <span>Capital City:</span>
                  </span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{countryInfo.capital}</span>
                </div>

                <div className="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-slate-800/60">
                  <span className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                    <Users className="w-4 h-4 text-sky-500" />
                    <span>Population:</span>
                  </span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{Number(countryInfo.population).toLocaleString()}</span>
                </div>

                <div className="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-slate-800/60">
                  <span className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                    <DollarSign className="w-4 h-4 text-amber-500" />
                    <span>Currency:</span>
                  </span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{countryInfo.currencies}</span>
                </div>

                <div className="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-slate-800/60">
                  <span className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                    <Languages className="w-4 h-4 text-purple-500" />
                    <span>Languages:</span>
                  </span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200 max-w-[160px] truncate">{countryInfo.languages}</span>
                </div>

                <div className="flex items-center justify-between py-1.5">
                  <span className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                    <Clock className="w-4 h-4 text-indigo-500" />
                    <span>Timezone:</span>
                  </span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{countryInfo.timezones}</span>
                </div>

                {countryInfo.googleMapsUrl && (
                  <a
                    href={countryInfo.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 flex items-center justify-center gap-1.5 w-full py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-teal-600 dark:text-teal-400 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  >
                    <span>View on Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

export default DestinationDetails;
