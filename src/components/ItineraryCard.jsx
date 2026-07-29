import React from 'react';
import { Calendar, Clock, DollarSign, MapPin, Edit3, Trash2, CheckCircle2, Sparkles } from 'lucide-react';
import { formatCurrency } from '../utils/helpers.js';

const ItineraryCard = ({ 
  dayData, 
  onEditActivity, 
  onDeleteActivity, 
  onAddActivity, 
  readOnly = false 
}) => {
  if (!dayData) return null;

  const totalDayCost = dayData.activities ? dayData.activities.reduce((acc, curr) => acc + (Number(curr.cost) || 0), 0) : 0;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-md hover:shadow-xl transition-all duration-200 overflow-hidden">
      
      {/* Day Banner Header */}
      <div className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center font-extrabold text-base shadow-sm">
            {dayData.day}
          </div>
          <div>
            <h4 className="text-lg font-bold tracking-tight">{dayData.title}</h4>
            <p className="text-xs text-teal-100 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>Day {dayData.day} Scheduled Activities</span>
            </p>
          </div>
        </div>

        <div className="text-right sm:text-right">
          <span className="text-[10px] font-semibold uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full">
            Day Est. Cost
          </span>
          <p className="text-base font-extrabold mt-0.5">{formatCurrency(totalDayCost, 'USD')}</p>
        </div>
      </div>

      {/* Activities Timeline */}
      <div className="p-6 space-y-6">
        {(!dayData.activities || dayData.activities.length === 0) ? (
          <div className="text-center py-6 text-slate-400 text-sm">
            <p>No activities scheduled for this day yet.</p>
            {!readOnly && onAddActivity && (
              <button
                onClick={() => onAddActivity(dayData.day)}
                className="mt-2 text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline"
              >
                + Add First Activity
              </button>
            )}
          </div>
        ) : (
          <div className="relative pl-6 sm:pl-8 border-l-2 border-teal-500/30 space-y-6">
            {dayData.activities.map((act, idx) => (
              <div key={act.id || idx} className="relative group">
                
                {/* Timeline Dot */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-5 h-5 rounded-full bg-white dark:bg-slate-900 border-4 border-teal-500 shadow-sm" />

                {/* Activity Content Box */}
                <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-4 border border-slate-200/60 dark:border-slate-800 hover:border-teal-500/50 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-slate-200/60 dark:border-slate-700/60">
                    <div className="flex items-center gap-2 text-xs font-semibold text-teal-600 dark:text-teal-400">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{act.time || "Flexible Time"}</span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      {act.cost !== undefined && (
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-md">
                          {act.cost === 0 ? "FREE" : formatCurrency(act.cost, 'USD')}
                        </span>
                      )}

                      {!readOnly && (
                        <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                          {onEditActivity && (
                            <button
                              onClick={() => onEditActivity(dayData.day, act)}
                              title="Edit Activity"
                              className="p-1 rounded text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                          )}
                          {onDeleteActivity && (
                            <button
                              onClick={() => onDeleteActivity(dayData.day, act.id)}
                              title="Delete Activity"
                              className="p-1 rounded text-slate-400 hover:text-red-600 transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <h5 className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100 mt-2">
                    {act.title}
                  </h5>
                  {act.description && (
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                      {act.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add Activity Button (if editable) */}
        {!readOnly && onAddActivity && (
          <div className="pt-2">
            <button
              onClick={() => onAddActivity(dayData.day)}
              className="w-full py-2.5 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-teal-500 dark:hover:border-teal-500 text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>+ Add Custom Activity to Day {dayData.day}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItineraryCard;
