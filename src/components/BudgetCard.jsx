import React from 'react';
import { Calculator, DollarSign, PieChart, CheckCircle2, AlertCircle } from 'lucide-react';
import { formatCurrency } from '../utils/helpers.js';

const BudgetCard = ({ 
  accommodation = 0, 
  food = 0, 
  transport = 0, 
  activities = 0, 
  shopping = 0, 
  days = 1,
  currency = 'USD',
  budgetLevel = 'moderate',
  onEditClick = null 
}) => {
  const totalCost = Number(accommodation) + Number(food) + Number(transport) + Number(activities) + Number(shopping);
  const dailyAverage = days > 0 ? Math.round(totalCost / days) : totalCost;

  const getPercentage = (val) => {
    if (!totalCost || totalCost === 0) return 0;
    return Math.round((Number(val) / totalCost) * 100);
  };

  const categories = [
    { label: 'Accommodation', amount: accommodation, color: 'bg-teal-500', textColor: 'text-teal-600 dark:text-teal-400' },
    { label: 'Food & Dining', amount: food, color: 'bg-emerald-500', textColor: 'text-emerald-600 dark:text-emerald-400' },
    { label: 'Transport & Transit', amount: transport, color: 'bg-sky-500', textColor: 'text-sky-600 dark:text-sky-400' },
    { label: 'Tours & Activities', amount: activities, color: 'bg-purple-500', textColor: 'text-purple-600 dark:text-purple-400' },
    { label: 'Shopping & Extras', amount: shopping, color: 'bg-amber-500', textColor: 'text-amber-600 dark:text-amber-400' }
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800/80 shadow-xl space-y-6 transition-all duration-200">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/60 flex items-center justify-center text-teal-600 dark:text-teal-400">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Estimated Budget Breakdown</h3>
            <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">For {days} Day{days !== 1 ? 's' : ''} ({budgetLevel})</p>
          </div>
        </div>
        
        <div className="text-right">
          <p className="text-xs text-slate-400">Total Estimated Cost</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-teal-600 dark:text-teal-400">
            {formatCurrency(totalCost, currency)}
          </p>
        </div>
      </div>

      {/* Visual Multi-Color Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-300">
          <span>Cost Distribution</span>
          <span>~{formatCurrency(dailyAverage, currency)} / day</span>
        </div>
        <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex gap-0.5">
          {categories.map((cat, idx) => {
            const pct = getPercentage(cat.amount);
            if (pct <= 0) return null;
            return (
              <div
                key={cat.label}
                className={`${cat.color} h-full transition-all duration-500`}
                style={{ width: `${pct}%` }}
                title={`${cat.label}: ${pct}% (${formatCurrency(cat.amount, currency)})`}
              />
            );
          })}
        </div>
      </div>

      {/* Breakdown Items List */}
      <div className="space-y-3 pt-2">
        {categories.map((cat) => (
          <div key={cat.label} className="flex items-center justify-between text-sm py-1.5 border-b border-slate-100 dark:border-slate-800/50 last:border-0">
            <div className="flex items-center gap-2.5">
              <span className={`w-3 h-3 rounded-full ${cat.color} shrink-0`} />
              <span className="font-medium text-slate-700 dark:text-slate-200">{cat.label}</span>
            </div>
            <div className="flex items-center gap-3 font-semibold">
              <span className="text-xs text-slate-400 font-normal">({getPercentage(cat.amount)}%)</span>
              <span className={cat.textColor}>{formatCurrency(cat.amount, currency)}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Budget Advice Note */}
      <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 flex items-start gap-3 text-xs text-slate-600 dark:text-slate-300">
        <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-slate-800 dark:text-slate-100">Pro Budget Tip: </span>
          <span>Prices are estimates derived from live destination data and your selected travel comfort tier ({budgetLevel}). Always keep a 10-15% emergency buffer!</span>
        </div>
      </div>

      {onEditClick && (
        <button
          onClick={onEditClick}
          className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors"
        >
          Customize & Edit Budget Values
        </button>
      )}
    </div>
  );
};

export default BudgetCard;
