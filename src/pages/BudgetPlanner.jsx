import React, { useState } from 'react';
import { Calculator, DollarSign, PieChart, Sparkles, RefreshCw, CheckCircle2, ArrowRight } from 'lucide-react';
import { toast } from 'react-toastify';
import BudgetCard from '../components/BudgetCard.jsx';
import Button from '../components/Button.jsx';
import { DESTINATIONS, BUDGET_LEVELS } from '../data/destinations.js';
import { formatCurrency } from '../utils/helpers.js';

const BudgetPlanner = () => {
  const [days, setDays] = useState(5);
  const [currency, setCurrency] = useState('USD');
  const [budgetLevel, setBudgetLevel] = useState('moderate');
  const [selectedDestId, setSelectedDestId] = useState(DESTINATIONS[0].id);

  // Editable cost fields
  const [accommodation, setAccommodation] = useState(400);
  const [food, setFood] = useState(200);
  const [transport, setTransport] = useState(80);
  const [activities, setActivities] = useState(150);
  const [shopping, setShopping] = useState(100);

  const selectedDest = DESTINATIONS.find(d => d.id === selectedDestId) || DESTINATIONS[0];

  const handleApplyDestinationDefaults = () => {
    const mult = budgetLevel === 'budget' ? 0.65 : budgetLevel === 'luxury' ? 1.8 : 1.0;
    const costs = selectedDest.averageCosts || { accommodation: 80, food: 40, transport: 15, activities: 30, shopping: 25 };
    
    setAccommodation(Math.round(costs.accommodation * days * mult));
    setFood(Math.round(costs.food * days * mult));
    setTransport(Math.round(costs.transport * days * mult));
    setActivities(Math.round(costs.activities * days * mult));
    setShopping(Math.round(costs.shopping * days * mult));
    
    toast.success(`Applied ${selectedDest.name} estimated average costs for ${days} days!`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />
        <div className="max-w-2xl space-y-3 relative z-10">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800/60">
            Expense Calculator
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-poppins">
            Trip Budget Planner
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
            Estimate, adjust, and break down travel costs across accommodations, dining, transportation, activities, and souvenirs.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left 7 Cols: Configuration & Sliders */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-8">
          
          {/* Top Quick Load Bar */}
          <div className="p-4 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200/60 dark:border-teal-800/60 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">Auto-Calculate by Destination</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Load realistic daily averages from our live database</p>
              </div>
              
              <div className="flex items-center gap-2">
                <select
                  value={selectedDestId}
                  onChange={(e) => setSelectedDestId(e.target.value)}
                  className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold focus:outline-none"
                >
                  {DESTINATIONS.map(d => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
                <Button
                  onClick={handleApplyDestinationDefaults}
                  variant="primary"
                  size="sm"
                  icon={RefreshCw}
                >
                  Apply
                </Button>
              </div>
            </div>
          </div>

          {/* Days & Currency */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Number of Days</label>
              <input
                type="number"
                min="1"
                max="30"
                value={days}
                onChange={(e) => setDays(Math.max(1, Number(e.target.value)))}
                className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 font-bold text-base focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Currency Display</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 font-bold text-base focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
              >
                <option value="USD">USD ($) - US Dollar</option>
                <option value="EUR">EUR (€) - Euro</option>
                <option value="GBP">GBP (£) - British Pound</option>
                <option value="JPY">JPY (¥) - Japanese Yen</option>
                <option value="CHF">CHF (CHF) - Swiss Franc</option>
                <option value="AED">AED (AED) - UAE Dirham</option>
              </select>
            </div>
          </div>

          {/* Comfort Level Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Travel Comfort Tier</label>
            <div className="grid grid-cols-3 gap-3">
              {BUDGET_LEVELS.map(lvl => (
                <button
                  key={lvl.id}
                  type="button"
                  onClick={() => {
                    setBudgetLevel(lvl.id);
                    // Re-adjust values slightly
                    if (selectedDest) handleApplyDestinationDefaults();
                  }}
                  className={`p-3 rounded-2xl text-xs font-bold text-center border transition-all ${
                    budgetLevel === lvl.id
                      ? 'bg-teal-600 text-white border-teal-600 shadow-md shadow-teal-500/20'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  <div className="text-sm">{lvl.label.split(' ')[0]}</div>
                  <div className="text-[10px] opacity-80 font-normal mt-0.5">{lvl.desc.split(',')[0]}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Individual Category Sliders & Inputs */}
          <div className="space-y-6 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">Customize Expense Categories ({currency})</h3>

            {/* Accommodation */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-sm font-semibold">
                <span className="flex items-center gap-2 text-teal-600 dark:text-teal-400">
                  <span className="w-3 h-3 rounded-full bg-teal-500" />
                  <span>Accommodation & Hotels</span>
                </span>
                <span className="text-slate-800 dark:text-slate-100 font-bold">{formatCurrency(accommodation, currency)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="3000"
                step="25"
                value={accommodation}
                onChange={(e) => setAccommodation(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-600"
              />
            </div>

            {/* Food */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-sm font-semibold">
                <span className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                  <span className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span>Food & Dining Out</span>
                </span>
                <span className="text-slate-800 dark:text-slate-100 font-bold">{formatCurrency(food, currency)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="2000"
                step="20"
                value={food}
                onChange={(e) => setFood(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
            </div>

            {/* Transport */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-sm font-semibold">
                <span className="flex items-center gap-2 text-sky-600 dark:text-sky-400">
                  <span className="w-3 h-3 rounded-full bg-sky-500" />
                  <span>Transport & Flights/Trains</span>
                </span>
                <span className="text-slate-800 dark:text-slate-100 font-bold">{formatCurrency(transport, currency)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1500"
                step="15"
                value={transport}
                onChange={(e) => setTransport(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-600"
              />
            </div>

            {/* Activities */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-sm font-semibold">
                <span className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
                  <span className="w-3 h-3 rounded-full bg-purple-500" />
                  <span>Tours, Tickets & Activities</span>
                </span>
                <span className="text-slate-800 dark:text-slate-100 font-bold">{formatCurrency(activities, currency)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1500"
                step="15"
                value={activities}
                onChange={(e) => setActivities(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
              />
            </div>

            {/* Shopping */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-sm font-semibold">
                <span className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                  <span className="w-3 h-3 rounded-full bg-amber-500" />
                  <span>Shopping & Emergency Buffer</span>
                </span>
                <span className="text-slate-800 dark:text-slate-100 font-bold">{formatCurrency(shopping, currency)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1000"
                step="10"
                value={shopping}
                onChange={(e) => setShopping(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-600"
              />
            </div>
          </div>

        </div>

        {/* Right 5 Cols: Visual Breakdown Card & Tips */}
        <div className="lg:col-span-5 space-y-8">
          
          <BudgetCard
            accommodation={accommodation}
            food={food}
            transport={transport}
            activities={activities}
            shopping={shopping}
            days={days}
            currency={currency}
            budgetLevel={budgetLevel}
          />

          <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl border border-slate-800 space-y-4">
            <h4 className="text-base font-bold flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>Smart Money Tips for Travelers</span>
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300 leading-relaxed list-disc list-inside">
              <li>Book train tickets and museum entry passes at least 3 weeks ahead for up to 30% discounts.</li>
              <li>Always carry a small amount of local cash for street markets and family bistros.</li>
              <li>Use fee-free foreign transaction debit cards for ATMs to avoid high exchange kiosk markups.</li>
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
};

export default BudgetPlanner;
