import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Tag, ArrowRight } from 'lucide-react';
import { DESTINATIONS, CATEGORIES } from '../data/destinations.js';
import { storageHelpers } from '../utils/helpers.js';

const SearchBar = ({ onSearchSubmit, initialQuery = '', initialCategory = 'All' }) => {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  const handleQueryChange = (e) => {
    const val = e.target.value;
    setQuery(val);

    if (val.trim().length > 0) {
      const filtered = DESTINATIONS.filter(
        d => d.name.toLowerCase().includes(val.toLowerCase()) ||
             d.country.toLowerCase().includes(val.toLowerCase()) ||
             d.category.toLowerCase().includes(val.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    setShowSuggestions(false);
    if (query.trim()) {
      storageHelpers.addRecentSearch(query.trim());
    }

    if (onSearchSubmit) {
      onSearchSubmit({ query, category });
    } else {
      const params = new URLSearchParams();
      if (query.trim()) params.append('q', query.trim());
      if (category && category !== 'All') params.append('category', category);
      navigate(`/destinations?${params.toString()}`);
    }
  };

  const selectSuggestion = (dest) => {
    setQuery(dest.name);
    setShowSuggestions(false);
    storageHelpers.addRecentSearch(`${dest.name}, ${dest.country}`);
    navigate(`/destinations/${dest.id}`);
  };

  return (
    <div className="relative w-full">
      <form
        onSubmit={handleSearch}
        className="bg-white dark:bg-slate-900 p-2 sm:p-3 rounded-2xl shadow-2xl border border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row items-center gap-2 sm:gap-3 transition-all duration-200"
      >
        {/* Search Query Input */}
        <div className="relative flex-1 w-full flex items-center bg-slate-100 dark:bg-slate-800/80 rounded-xl px-3.5 py-3 border border-transparent focus-within:border-teal-500 focus-within:bg-white dark:focus-within:bg-slate-900 transition-all">
          <Search className="w-5 h-5 text-slate-400 shrink-0 mr-2.5" />
          <input
            type="text"
            value={query}
            onChange={handleQueryChange}
            onFocus={() => { if (query.trim()) setShowSuggestions(true); }}
            placeholder="Search destination, country, or keyword (e.g. Paris, Bali)..."
            className="w-full bg-transparent text-slate-800 dark:text-slate-100 placeholder-slate-400 text-sm focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => { setQuery(''); setSuggestions([]); }}
              className="text-xs font-medium text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Select */}
        <div className="w-full sm:w-48 flex items-center bg-slate-100 dark:bg-slate-800/80 rounded-xl px-3 py-3 border border-transparent focus-within:border-teal-500">
          <Tag className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mr-2" />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-transparent text-slate-800 dark:text-slate-200 text-sm focus:outline-none cursor-pointer"
          >
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat} className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100">
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-teal-500/20 transition-all flex items-center justify-center gap-2 active:scale-95 shrink-0"
        >
          <span>Search</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      {/* Autocomplete Dropdown Suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <>
          <div className="fixed inset-0 z-20" onClick={() => setShowSuggestions(false)} />
          <div className="absolute left-0 right-0 mt-2 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-30 animate-scale-up">
            <div className="p-2">
              <p className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-400">Top Suggestions</p>
              {suggestions.map((dest) => (
                <div
                  key={dest.id}
                  onClick={() => selectSuggestion(dest)}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/80 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img src={dest.image} alt={dest.name} className="w-10 h-10 rounded-lg object-cover" />
                    <div>
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{dest.name}, <span className="font-normal text-slate-500">{dest.country}</span></p>
                      <p className="text-xs text-teal-600 dark:text-teal-400">{dest.category}</p>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md">
                    ${dest.estimatedDailyBudget}/day
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SearchBar;
