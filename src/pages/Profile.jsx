import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { 
  User as UserIcon, 
  Heart, 
  Settings, 
  Calendar, 
  MapPin, 
  Trash2, 
  Edit3, 
  ExternalLink, 
  LogOut, 
  CheckCircle2, 
  Compass, 
  Share2, 
  Sparkles, 
  AlertCircle 
} from 'lucide-react';
import { toast } from 'react-toastify';
import { useAuth } from '../hooks/useAuth.js';
import { getUserItineraries, deleteItinerary } from '../firebase/db.js';
import Button from '../components/Button.jsx';
import Modal from '../components/Modal.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import { formatCurrency } from '../utils/helpers.js';

const Profile = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { currentUser, logout, updateProfileName, isDemoMode } = useAuth();

  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'saved');
  const [savedTrips, setSavedTrips] = useState([]);
  const [loadingTrips, setLoadingTrips] = useState(true);

  // Profile Edit State
  const [newName, setNewName] = useState(currentUser?.displayName || '');
  const [savingProfile, setSavingProfile] = useState(false);

  // View Modal State
  const [viewTripModalOpen, setViewTripModalOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);

  useEffect(() => {
    if (currentUser) {
      setNewName(currentUser.displayName || '');
      loadTrips();
    }
  }, [currentUser]);

  const loadTrips = async () => {
    setLoadingTrips(true);
    const trips = await getUserItineraries(currentUser?.uid);
    setSavedTrips(trips);
    setLoadingTrips(false);
  };

  const handleDeleteTrip = async (id, e) => {
    if (e) e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this saved itinerary? This cannot be undone.")) {
      const success = await deleteItinerary(id);
      if (success) {
        setSavedTrips(prev => prev.filter(t => t.id !== id));
        toast.info("Itinerary deleted.");
      } else {
        toast.error("Failed to delete itinerary.");
      }
    }
  };

  const handleEditTrip = (trip, e) => {
    if (e) e.stopPropagation();
    // Save to local storage temporary edit pointer and navigate to planner
    try {
      const existing = localStorage.getItem('pmt_saved_itineraries');
      let all = existing ? JSON.parse(existing) : [];
      if (!all.find(i => i.id === trip.id)) {
        all.push(trip);
        localStorage.setItem('pmt_saved_itineraries', JSON.stringify(all));
      }
    } catch {}
    navigate(`/planner?dest=${trip.destinationId}&days=${trip.days}&editId=${trip.id}`);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!newName.trim()) {
      toast.warn("Name cannot be empty");
      return;
    }
    setSavingProfile(true);
    const success = await updateProfileName(newName.trim());
    setSavingProfile(false);
    if (success) {
      toast.success("Profile name updated successfully!");
    } else {
      toast.error("Could not update profile.");
    }
  };

  if (!currentUser) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      
      {/* User Header Card */}
      <div className="bg-gradient-to-r from-teal-800 via-slate-900 to-slate-950 rounded-3xl p-6 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          <div className="relative">
            <img
              src={currentUser.photoURL}
              alt={currentUser.displayName}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover border-4 border-white/20 shadow-xl"
            />
            {isDemoMode && (
              <span className="absolute -top-2 -right-2 px-2.5 py-0.5 rounded-full bg-amber-500 text-white font-bold text-[10px] shadow-sm">
                Demo
              </span>
            )}
          </div>
          <div className="space-y-1.5">
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-poppins">
              {currentUser.displayName}
            </h1>
            <p className="text-sm text-slate-300">{currentUser.email}</p>
            <div className="flex items-center justify-center sm:justify-start gap-3 pt-2">
              <span className="text-xs font-semibold bg-teal-500/20 text-teal-300 px-3 py-1 rounded-full border border-teal-500/30">
                ⚡ {savedTrips.length} Saved Itineraries
              </span>
              <span className="text-xs font-semibold bg-white/10 text-white px-3 py-1 rounded-full">
                Member since {new Date().getFullYear()}
              </span>
            </div>
          </div>
        </div>

        <div>
          <Button
            onClick={() => { logout(); navigate('/'); }}
            variant="danger"
            size="sm"
            icon={LogOut}
            className="px-5 py-2.5"
          >
            Sign Out
          </Button>
        </div>
      </div>

      {/* Tabs Toolbar */}
      <div className="border-b border-slate-200 dark:border-slate-800 flex gap-6">
        <button
          onClick={() => setActiveTab('saved')}
          className={`pb-4 text-sm font-bold transition-all flex items-center gap-2 border-b-2 ${
            activeTab === 'saved'
              ? 'border-teal-600 text-teal-600 dark:border-teal-400 dark:text-teal-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>My Saved Trips ({savedTrips.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`pb-4 text-sm font-bold transition-all flex items-center gap-2 border-b-2 ${
            activeTab === 'settings'
              ? 'border-teal-600 text-teal-600 dark:border-teal-400 dark:text-teal-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Account Settings</span>
        </button>
      </div>

      {/* Tab Content: Saved Trips */}
      {activeTab === 'saved' && (
        <div className="space-y-8 animate-fade-in">
          {loadingTrips ? (
            <LoadingSpinner message="Fetching your saved itineraries from Cloud Firestore..." />
          ) : savedTrips.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md max-w-xl mx-auto space-y-4">
              <Compass className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto animate-bounce" />
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">No Saved Trips Yet</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 px-6">
                You haven't generated or saved any itineraries to your account yet. Let's create your first adventure!
              </p>
              <Link to="/planner">
                <Button variant="primary" size="md" icon={Sparkles}>Start Trip Planner</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {savedTrips.map((trip) => (
                <div
                  key={trip.id}
                  onClick={() => { setSelectedTrip(trip); setViewTripModalOpen(true); }}
                  className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800/80 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between cursor-pointer group transform hover:-translate-y-1"
                >
                  <div>
                    <div className="relative h-44 overflow-hidden bg-slate-800">
                      <img src={trip.image || "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80"} alt={trip.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                      
                      <div className="absolute top-3 right-3 flex gap-1.5">
                        <button
                          onClick={(e) => handleEditTrip(trip, e)}
                          title="Edit Itinerary"
                          className="p-2 rounded-xl bg-white/90 text-slate-800 hover:bg-white shadow-md transition-all"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={(e) => handleDeleteTrip(trip.id, e)}
                          title="Delete Itinerary"
                          className="p-2 rounded-xl bg-red-600/90 text-white hover:bg-red-600 shadow-md transition-all"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <span className="text-[10px] font-bold bg-teal-600 px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                          {trip.days} Days • {trip.budgetLevel}
                        </span>
                        <h3 className="text-lg font-bold mt-1 line-clamp-1">{trip.title}</h3>
                      </div>
                    </div>

                    <div className="p-5 space-y-3">
                      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                          <span>{trip.destinationName || trip.country}</span>
                        </span>
                        <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                          {formatCurrency(trip.estimatedCost || 0, 'USD')}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {(trip.interests || []).slice(0, 3).map(i => (
                          <span key={i} className="text-[10px] font-medium bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md text-slate-600 dark:text-slate-300">
                            #{i}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 pt-0 mt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400 font-medium">
                    <span>Saved on {new Date(trip.createdAt || Date.now()).toLocaleDateString()}</span>
                    <span className="text-teal-600 dark:text-teal-400 font-semibold group-hover:underline flex items-center gap-1">
                      <span>View Full Plan</span>
                      <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab Content: Account Settings */}
      {activeTab === 'settings' && (
        <div className="max-w-xl bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-6 animate-fade-in">
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Profile & Preferences</h3>
          
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Display Name</label>
              <input
                type="text"
                required
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Email Address (Read only)</label>
              <input
                type="text"
                disabled
                value={currentUser.email}
                className="w-full p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-500 text-sm cursor-not-allowed"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              loading={savingProfile}
              className="w-full py-3.5 mt-2"
            >
              Save Profile Changes
            </Button>
          </form>
        </div>
      )}

      {/* Modal: View Saved Trip Details */}
      <Modal
        isOpen={viewTripModalOpen}
        onClose={() => setViewTripModalOpen(false)}
        title={selectedTrip ? selectedTrip.title : "Saved Itinerary"}
        maxWidth="max-w-4xl"
      >
        {selectedTrip && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-xs font-bold text-teal-600 bg-teal-50 dark:bg-teal-950/60 px-2.5 py-1 rounded-md">
                  {selectedTrip.destinationName || selectedTrip.country}
                </span>
                <p className="text-sm text-slate-500 mt-1">
                  Duration: <strong className="text-slate-800 dark:text-slate-100">{selectedTrip.days} Days</strong> • Est. Cost: <strong className="text-emerald-600">{formatCurrency(selectedTrip.estimatedCost || 0, 'USD')}</strong>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  onClick={() => {
                    setViewTripModalOpen(false);
                    handleEditTrip(selectedTrip);
                  }}
                  variant="primary"
                  size="sm"
                  icon={Edit3}
                >
                  Edit in Planner
                </Button>
                <Button
                  onClick={() => {
                    handleDeleteTrip(selectedTrip.id);
                    setViewTripModalOpen(false);
                  }}
                  variant="danger"
                  size="sm"
                  icon={Trash2}
                >
                  Delete
                </Button>
              </div>
            </div>

            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
              {(selectedTrip.itinerary || []).map((dayItem) => (
                <div key={dayItem.day} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 space-y-2">
                  <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100">
                    Day {dayItem.day}: {dayItem.title}
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                    {(dayItem.activities || []).map((act, idx) => (
                      <li key={idx} className="flex items-start justify-between gap-2 py-1 border-b border-slate-200/40 dark:border-slate-700/40 last:border-0">
                        <span><strong>{act.time || "Time"}:</strong> {act.title}</span>
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400 shrink-0">{act.cost ? formatCurrency(act.cost, 'USD') : 'FREE'}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
};

export default Profile;
