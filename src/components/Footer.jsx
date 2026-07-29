import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Heart, Send, Globe, Shield, Award, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white shadow-md shadow-teal-500/20">
                <Compass className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                PlanMyTrip
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Your intelligent, all-in-one travel companion. Discover breathtaking destinations, build custom day-wise itineraries, calculate budgets, and check real-time weather forecasts.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center gap-1.5 text-xs text-teal-400 bg-teal-950/60 px-3 py-1.5 rounded-full border border-teal-800/60">
                <Globe className="w-3.5 h-3.5" />
                <span>REST Countries API</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-sky-400 bg-sky-950/60 px-3 py-1.5 rounded-full border border-sky-800/60">
                <Shield className="w-3.5 h-3.5" />
                <span>Open-Meteo Weather</span>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Explore</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/destinations" className="text-slate-400 hover:text-teal-400 transition-colors">Popular Destinations</Link></li>
              <li><Link to="/planner" className="text-slate-400 hover:text-teal-400 transition-colors">AI Trip Planner</Link></li>
              <li><Link to="/budget" className="text-slate-400 hover:text-teal-400 transition-colors">Budget Calculator</Link></li>
              <li><Link to="/destinations?category=Beach+%26+Relaxation" className="text-slate-400 hover:text-teal-400 transition-colors">Beach Resorts</Link></li>
              <li><Link to="/destinations?category=Culture+%26+Romance" className="text-slate-400 hover:text-teal-400 transition-colors">Romantic Getaways</Link></li>
            </ul>
          </div>

          {/* Col 3: Company */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Company</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/about" className="text-slate-400 hover:text-teal-400 transition-colors">About PlanMyTrip</Link></li>
              <li><Link to="/contact" className="text-slate-400 hover:text-teal-400 transition-colors">Contact & Support</Link></li>
              <li><Link to="/profile" className="text-slate-400 hover:text-teal-400 transition-colors">User Profile</Link></li>
              <li><Link to="/privacy" className="text-slate-400 hover:text-teal-400 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-slate-400 hover:text-teal-400 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Stay Inspired</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Subscribe to get seasonal travel guides and curated itinerary inspiration delivered to your inbox.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing to PlanMyTrip updates!'); }} className="flex gap-2 pt-1">
              <input
                type="email"
                required
                placeholder="Enter email address"
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
              />
              <button
                type="submit"
                className="px-3.5 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-semibold transition-colors shrink-0 flex items-center justify-center"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} PlanMyTrip. Built with React, Vite & Tailwind CSS.</p>
          <div className="flex items-center gap-1.5">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for passionate world travelers</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
