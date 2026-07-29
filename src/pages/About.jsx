import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Sparkles, Shield, Globe, Award, Users, Heart, ArrowRight } from 'lucide-react';

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-emerald-950 rounded-3xl p-8 sm:p-12 lg:p-16 text-white shadow-2xl relative overflow-hidden text-center">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-3xl mx-auto space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold border border-teal-500/30">
            <Sparkles className="w-4 h-4 text-teal-400" />
            <span>Our Story & Mission</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-poppins">
            We Simplify Travel Planning
          </h1>
          <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed">
            PlanMyTrip was created to transform overwhelming travel research into intuitive, automated, and beautifully structured day-wise itineraries.
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 px-3 py-1 rounded-full border border-teal-200 dark:border-teal-800">
            Why We Built This
          </span>
          <h2 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 font-poppins">
            From Scattered Notes to Seamless Itineraries
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Every traveler knows the struggle: dozens of browser tabs open across flight aggregators, hotel review blogs, weather apps, and currency calculators. PlanMyTrip consolidates everything into a single, cohesive dashboard.
          </p>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Whether you are planning a romantic 5-day escape to Paris, an adventurous trekking expedition in Iceland, or a relaxing beach retreat in Bali, our platform generates tailored schedules and budgets in seconds.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md space-y-2 text-center">
            <Globe className="w-8 h-8 text-teal-600 dark:text-teal-400 mx-auto" />
            <h4 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100">100+</h4>
            <p className="text-xs text-slate-500">Countries Supported via REST API</p>
          </div>
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md space-y-2 text-center">
            <Shield className="w-8 h-8 text-sky-600 dark:text-sky-400 mx-auto" />
            <h4 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100">Live</h4>
            <p className="text-xs text-slate-500">Open-Meteo Weather Integration</p>
          </div>
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md space-y-2 text-center">
            <Award className="w-8 h-8 text-amber-600 dark:text-amber-400 mx-auto" />
            <h4 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100">4.9★</h4>
            <p className="text-xs text-slate-500">Community Traveler Rating</p>
          </div>
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md space-y-2 text-center">
            <Users className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mx-auto" />
            <h4 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100">25,000+</h4>
            <p className="text-xs text-slate-500">Trips Planned Globally</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center space-y-6 pt-4">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-slate-100 font-poppins">
          Start Your Journey Today
        </h3>
        <Link
          to="/planner"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-bold text-base shadow-xl shadow-teal-500/25 hover:from-teal-500 hover:to-emerald-500 transition-all active:scale-95"
        >
          <span>Launch AI Trip Planner</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>

    </div>
  );
};

export default About;
