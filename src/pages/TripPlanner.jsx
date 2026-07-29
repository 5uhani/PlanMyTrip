import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Heart, 
  Save, 
  Trash2, 
  Plus, 
  Edit3, 
  CheckCircle2, 
  Compass, 
  Clock, 
  Share2, 
  RotateCcw, 
  AlertCircle 
} from 'lucide-react';
import { toast } from 'react-toastify';
import confetti from 'canvas-confetti';
import { DESTINATIONS, BUDGET_LEVELS, INTERESTS_LIST } from '../data/destinations.js';
import { generateAutomatedItinerary, formatCurrency } from '../utils/helpers.js';
import { saveItinerary, updateItinerary } from '../firebase/db.js';
import { useAuth } from '../hooks/useAuth.js';
import ItineraryCard from '../components/ItineraryCard.jsx';
import BudgetCard from '../components/BudgetCard.jsx';
import Button from '../components/Button.jsx';
import Modal from '../components/Modal.jsx';

const TripPlanner = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  // Initial params from URL or defaults
  const urlDestId = searchParams.get('dest') || DESTINATIONS[0].id;
  const urlDays = Number(searchParams.get('days')) || 4;
  const editId = searchParams.get('editId') || null;

  // Form selections
  const [selectedDestId, setSelectedDestId] = useState(urlDestId);
  const [days, setDays] = useState(urlDays);
  const [budgetLevel, setBudgetLevel] = useState('moderate');
  const [selectedInterests, setSelectedInterests] = useState(['history', 'food', 'photo']);

  // Generated state
  const [itinerary, setItinerary] = useState([]);
  const [isGenerated, setIsGenerated] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedDocId, setSavedDocId] = useState(editId);

  // Modal states for Activity editing
  const [modalOpen, setModalOpen] = useState(false);
  const [activeDay, setActiveDay] = useState(1);
  const [activityForm, setActivityForm] = useState({
    id: '',
    time: '10:00 AM',
    title: '',
    description: '',
    cost: 15
  });
  const [isEditingActivity, setIsEditingActivity] = useState(false);

  const selectedDestination = DESTINATIONS.find(d => d.id === selectedDestId) || DESTINATIONS[0];

  // If editing an existing saved itinerary from localStorage or sessionStorage
  useEffect(() => {
    if (editId) {
      try {
        const stored = localStorage.getItem('pmt_saved_itineraries');
        if (stored) {
          const all = JSON.parse(stored);
          const found = all.find(i => i.id === editId);
          if (found) {
            setSelectedDestId(found.destinationId || DESTINATIONS[0].id);
            setDays(found.days || 4);
            setBudgetLevel(found.budgetLevel || 'moderate');
            setSelectedInterests(found.interests || ['history', 'food']);
            setItinerary(found.itinerary || []);
            setIsGenerated(true);
            setSavedDocId(found.id);
          }
        }
      } catch (e) {
        console.error("Error loading edit itinerary:", e);
      }
    }
  }, [editId]);

  const toggleInterest = (id) => {
    setSelectedInterests(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleGenerate = (e) => {
    if (e) e.preventDefault();
    if (selectedInterests.length === 0) {
      toast.warn("Please select at least one travel interest!");
      return;
    }

    toast.info(`Generating smart ${days}-day itinerary for ${selectedDestination.name}...`);
    const generated = generateAutomatedItinerary(selectedDestination, days, budgetLevel, selectedInterests);
    setItinerary(generated);
    setIsGenerated(true);
    setSavedDocId(null);

    // Trigger celebration confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#0d9488', '#10b981', '#38bdf8', '#f59e0b']
    });
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to clear this itinerary and start over?")) {
      setIsGenerated(false);
      setItinerary([]);
      setSavedDocId(null);
    }
  };

  const handleSaveToCloud = async () => {
    if (!isGenerated || itinerary.length === 0) {
      toast.warn("Please generate an itinerary first!");
      return;
    }

    setSaving(true);
    const tripData = {
      title: `${days} Days in ${selectedDestination.name}`,
      destinationId: selectedDestination.id,
      destinationName: selectedDestination.name,
      country: selectedDestination.country,
      image: selectedDestination.image,
      days,
      budgetLevel,
      interests: selectedInterests,
      estimatedCost: calculateTotalTripCost(),
      itinerary
    };

    let res;
    if (savedDocId) {
      res = await updateItinerary(savedDocId, tripData);
    } else {
      res = await saveItinerary(tripData, currentUser?.uid);
    }

    setSaving(false);
    if (res.success) {
      if (res.id) setSavedDocId(res.id);
      toast.success(savedDocId ? "Itinerary updated in Cloud Firestore!" : "Itinerary saved to Cloud Firestore!");
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.5 }
      });
    } else {
      toast.error(res.error || "Could not save itinerary");
    }
  };

  const calculateTotalTripCost = () => {
    if (!itinerary || itinerary.length === 0) return 0;
    let total = 0;
    itinerary.forEach(day => {
      if (day.activities) {
        day.activities.forEach(act => {
          total += Number(act.cost) || 0;
        });
      }
    });
    // Add base hotel/food estimation based on days and budget level
    const baseMult = budgetLevel === 'budget' ? 0.7 : budgetLevel === 'luxury' ? 1.8 : 1.0;
    const baseDaily = (selectedDestination.averageCosts?.accommodation || 80) + (selectedDestination.averageCosts?.food || 40);
    total += Math.round(baseDaily * days * baseMult);
    return total;
  };

  // --- Modal & Activity Handlers ---
  const openAddActivityModal = (dayNum) => {
    setActiveDay(dayNum);
    setActivityForm({
      id: `custom_${Date.now()}`,
      time: '02:00 PM',
      title: '',
      description: '',
      cost: 20
    });
    setIsEditingActivity(false);
    setModalOpen(true);
  };

  const openEditActivityModal = (dayNum, act) => {
    setActiveDay(dayNum);
    setActivityForm({ ...act });
    setIsEditingActivity(true);
    setModalOpen(true);
  };

  const handleDeleteActivity = (dayNum, actId) => {
    setItinerary(prev => prev.map(d => {
      if (d.day === dayNum) {
        return {
          ...d,
          activities: d.activities.filter(a => a.id !== actId)
        };
      }
      return d;
    }));
    toast.info(`Removed activity from Day ${dayNum}`);
  };

  const handleSaveActivityModal = (e) => {
    e.preventDefault();
    if (!activityForm.title.trim()) {
      toast.warn("Please enter an activity title.");
      return;
    }

    setItinerary(prev => prev.map(d => {
      if (d.day === activeDay) {
        let newActs = [...(d.activities || [])];
        if (isEditingActivity) {
          const idx = newActs.findIndex(a => a.id === activityForm.id);
          if (idx !== -1) newActs[idx] = { ...activityForm, cost: Number(activityForm.cost) || 0 };
        } else {
          newActs.push({ ...activityForm, id: `custom_${Date.now()}`, cost: Number(activityForm.cost) || 0 });
        }
        return { ...d, activities: newActs };
      }
      return d;
    }));

    setModalOpen(false);
    toast.success(isEditingActivity ? "Activity updated!" : `Activity added to Day ${activeDay}!`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 px-3 py-1 rounded-full border border-teal-200 dark:border-teal-800">
          Intelligent Itinerary Engine
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100 font-poppins">
          Custom Trip Planner
        </h1>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed">
          Select your dream destination, travel pace, and interests. Watch our intelligent engine generate a customizable day-wise schedule in seconds.
        </p>
      </div>

      {/* Planner Control Dashboard */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          
          {/* 1. Destination Selector */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-slate-100">
              <MapPin className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <span>1. Choose Destination</span>
            </label>
            <select
              value={selectedDestId}
              onChange={(e) => setSelectedDestId(e.target.value)}
              className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all cursor-pointer"
            >
              {DESTINATIONS.map(d => (
                <option key={d.id} value={d.id} className="bg-white dark:bg-slate-900">
                  {d.name}, {d.country} ({d.category})
                </option>
              ))}
            </select>
            <div className="flex items-center gap-2 pt-1 text-xs text-slate-500 dark:text-slate-400">
              <span>Best Season:</span>
              <span className="font-semibold text-slate-700 dark:text-slate-200">{selectedDestination.bestSeason}</span>
            </div>
          </div>

          {/* 2. Number of Days */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm font-bold text-slate-800 dark:text-slate-100">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>2. Trip Duration</span>
              </span>
              <span className="text-emerald-600 dark:text-emerald-400 font-extrabold text-base">{days} Days</span>
            </div>
            <input
              type="range"
              min="1"
              max="14"
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-600 my-3"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-medium">
              <span>1 Day (Quick Getaway)</span>
              <span>7 Days (1 Week)</span>
              <span>14 Days (Extended Vacation)</span>
            </div>
          </div>

          {/* 3. Budget Comfort Level */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-slate-100">
              <DollarSign className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>3. Comfort & Budget Tier</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {BUDGET_LEVELS.map(lvl => (
                <button
                  key={lvl.id}
                  type="button"
                  onClick={() => setBudgetLevel(lvl.id)}
                  className={`p-2.5 rounded-xl text-xs font-semibold text-center border transition-all ${
                    budgetLevel === lvl.id
                      ? 'bg-amber-500 text-white border-amber-600 shadow-md shadow-amber-500/20 scale-105'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                  title={lvl.desc}
                >
                  <div className="capitalize">{lvl.label.split(' ')[0]}</div>
                  <div className="text-[10px] opacity-80 font-normal">{lvl.id === 'budget' ? '~$70/d' : lvl.id === 'moderate' ? '~$150/d' : '~$300/d'}</div>
                </button>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 pt-1 leading-tight">
              {BUDGET_LEVELS.find(l => l.id === budgetLevel)?.desc}
            </p>
          </div>

        </div>

        {/* 4. Travel Interests Multi-Select */}
        <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-500" />
              <span>4. Select Personal Interests (Multi-select)</span>
            </label>
            <span className="text-xs text-slate-400">{selectedInterests.length} selected</span>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {INTERESTS_LIST.map(item => {
              const active = selectedInterests.includes(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleInterest(item.id)}
                  className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 border ${
                    active
                      ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white border-transparent shadow-md shadow-teal-500/20 scale-105'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  <span>{active ? '✓' : '+'}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Generate / Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 border-t border-slate-100 dark:border-slate-800/80">
          <Button
            onClick={handleGenerate}
            variant="primary"
            size="lg"
            className="w-full sm:w-auto px-10 py-4 text-base shadow-xl shadow-teal-500/25 animate-pulse"
            icon={Sparkles}
          >
            {isGenerated ? 'Regenerate AI Itinerary' : 'Generate Day-wise Itinerary Now'}
          </Button>

          {isGenerated && (
            <Button
              onClick={handleReset}
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
              icon={RotateCcw}
            >
              Reset Planner
            </Button>
          )}
        </div>

      </div>

      {/* Generated Itinerary Display */}
      {isGenerated && itinerary.length > 0 && (
        <div className="space-y-10 animate-fade-in pt-4">
          
          {/* Top Banner with Total Cost & Save Actions */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-teal-950 text-white p-6 sm:p-8 rounded-3xl shadow-2xl border border-slate-800 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold border border-teal-500/30">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                <span>Custom Itinerary Built</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-poppins">
                {days} Days in {selectedDestination.name}, {selectedDestination.country}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Customized for <span className="text-amber-400 font-semibold capitalize">{budgetLevel}</span> travel with {selectedInterests.length} selected activities.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full lg:w-auto">
              <div className="bg-slate-800/80 backdrop-blur-md px-6 py-3 rounded-2xl border border-slate-700/80 text-center sm:text-right w-full sm:w-auto">
                <p className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Total Estimated Cost</p>
                <p className="text-2xl sm:text-3xl font-extrabold text-emerald-400">
                  {formatCurrency(calculateTotalTripCost(), 'USD')}
                </p>
              </div>

              <Button
                onClick={handleSaveToCloud}
                variant="primary"
                size="lg"
                loading={saving}
                className="w-full sm:w-auto bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 shadow-xl"
                icon={Save}
              >
                {savedDocId ? 'Update Saved Itinerary' : 'Save to Cloud Firestore'}
              </Button>
            </div>
          </div>

          {/* Quick Budget Summary Widget */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                <span>Day-by-Day Schedule ({itinerary.length} Days)</span>
              </h3>

              <div className="space-y-6">
                {itinerary.map((dayItem) => (
                  <ItineraryCard
                    key={dayItem.day}
                    dayData={dayItem}
                    onAddActivity={openAddActivityModal}
                    onEditActivity={openEditActivityModal}
                    onDeleteActivity={handleDeleteActivity}
                  />
                ))}
              </div>
            </div>

            {/* Right Col: Estimated Cost Breakdown */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span>Cost Breakdown</span>
              </h3>

              <BudgetCard
                accommodation={(selectedDestination.averageCosts?.accommodation || 80) * days * (budgetLevel === 'budget' ? 0.7 : budgetLevel === 'luxury' ? 1.8 : 1.0)}
                food={(selectedDestination.averageCosts?.food || 40) * days * (budgetLevel === 'budget' ? 0.7 : budgetLevel === 'luxury' ? 1.8 : 1.0)}
                transport={(selectedDestination.averageCosts?.transport || 15) * days}
                activities={itinerary.reduce((acc, d) => acc + (d.activities ? d.activities.reduce((s, a) => s + (Number(a.cost) || 0), 0) : 0), 0)}
                shopping={(selectedDestination.averageCosts?.shopping || 25) * days * 0.8}
                days={days}
                currency="USD"
                budgetLevel={budgetLevel}
              />
            </div>
          </div>

        </div>
      )}

      {/* Modal for Adding / Editing Activity */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={isEditingActivity ? `Edit Activity (Day ${activeDay})` : `Add Activity to Day ${activeDay}`}
      >
        <form onSubmit={handleSaveActivityModal} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Time / Duration</label>
              <input
                type="text"
                required
                value={activityForm.time}
                onChange={(e) => setActivityForm({ ...activityForm, time: e.target.value })}
                placeholder="e.g., 09:30 AM or Afternoon"
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Estimated Cost (USD)</label>
              <input
                type="number"
                min="0"
                value={activityForm.cost}
                onChange={(e) => setActivityForm({ ...activityForm, cost: e.target.value })}
                placeholder="15"
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Activity Title</label>
            <input
              type="text"
              required
              value={activityForm.title}
              onChange={(e) => setActivityForm({ ...activityForm, title: e.target.value })}
              placeholder="e.g., Guided Walking Tour of Historic Center"
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Description & Notes</label>
            <textarea
              rows="3"
              value={activityForm.description}
              onChange={(e) => setActivityForm({ ...activityForm, description: e.target.value })}
              placeholder="Add notes about tickets, meeting points, or recommendations..."
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
            >
              {isEditingActivity ? 'Save Changes' : 'Add Activity'}
            </Button>
          </div>
        </form>
      </Modal>

    </div>
  );
};

export default TripPlanner;
