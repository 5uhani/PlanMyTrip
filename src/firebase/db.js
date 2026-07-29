import { 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  doc, 
  updateDoc, 
  query, 
  where, 
  serverTimestamp 
} from 'firebase/firestore';
import { db, isDemoKey } from './config.js';

const LOCAL_STORAGE_KEY = 'pmt_saved_itineraries';

/**
 * Helper to get local itineraries when offline or in demo mode
 */
const getLocalItineraries = (userId) => {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    const all = data ? JSON.parse(data) : [];
    return userId ? all.filter(item => item.userId === userId) : all;
  } catch {
    return [];
  }
};

/**
 * Save an itinerary to Cloud Firestore (with local fallback)
 */
export const saveItinerary = async (itineraryData, userId) => {
  const newItinerary = {
    ...itineraryData,
    userId: userId || 'anonymous',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  if (isDemoKey || !db) {
    try {
      const data = localStorage.getItem(LOCAL_STORAGE_KEY);
      const all = data ? JSON.parse(data) : [];
      const savedDoc = { ...newItinerary, id: `local_${Date.now()}_${Math.random().toString(36).substr(2, 5)}` };
      all.unshift(savedDoc);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(all));
      return { success: true, id: savedDoc.id, data: savedDoc };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }

  try {
    const docRef = await addDoc(collection(db, 'itineraries'), {
      ...newItinerary,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return { success: true, id: docRef.id, data: { ...newItinerary, id: docRef.id } };
  } catch (error) {
    console.warn("Firestore error, falling back to local storage:", error.message);
    try {
      const data = localStorage.getItem(LOCAL_STORAGE_KEY);
      const all = data ? JSON.parse(data) : [];
      const savedDoc = { ...newItinerary, id: `local_${Date.now()}` };
      all.unshift(savedDoc);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(all));
      return { success: true, id: savedDoc.id, data: savedDoc };
    } catch (err) {
      return { success: false, error: error.message };
    }
  }
};

/**
 * Get all saved itineraries for a user from Cloud Firestore
 */
export const getUserItineraries = async (userId) => {
  if (!userId) return [];
  
  if (isDemoKey || !db) {
    return getLocalItineraries(userId);
  }

  try {
    const q = query(collection(db, 'itineraries'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    const itineraries = [];
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      itineraries.push({
        id: docSnap.id,
        ...data,
        createdAt: data.createdAt?.toDate?.()?.toISOString() || data.createdAt || new Date().toISOString()
      });
    });
    return itineraries.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } catch (error) {
    console.warn("Could not fetch from Firestore, fetching from local fallback:", error.message);
    return getLocalItineraries(userId);
  }
};

/**
 * Delete a saved itinerary
 */
export const deleteItinerary = async (id) => {
  if (!id) return false;

  if (id.toString().startsWith('local_') || isDemoKey || !db) {
    try {
      const data = localStorage.getItem(LOCAL_STORAGE_KEY);
      let all = data ? JSON.parse(data) : [];
      all = all.filter(item => item.id !== id);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(all));
      return true;
    } catch {
      return false;
    }
  }

  try {
    await deleteDoc(doc(db, 'itineraries', id));
    return true;
  } catch (error) {
    console.error("Error deleting from Firestore:", error);
    try {
      const data = localStorage.getItem(LOCAL_STORAGE_KEY);
      let all = data ? JSON.parse(data) : [];
      all = all.filter(item => item.id !== id);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(all));
      return true;
    } catch {
      return false;
    }
  }
};

/**
 * Update an existing itinerary
 */
export const updateItinerary = async (id, updatedData) => {
  if (!id) return { success: false, error: "No ID provided" };

  if (id.toString().startsWith('local_') || isDemoKey || !db) {
    try {
      const data = localStorage.getItem(LOCAL_STORAGE_KEY);
      let all = data ? JSON.parse(data) : [];
      const index = all.findIndex(item => item.id === id);
      if (index !== -1) {
        all[index] = { ...all[index], ...updatedData, updatedAt: new Date().toISOString() };
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(all));
        return { success: true, data: all[index] };
      }
      return { success: false, error: "Itinerary not found in local storage" };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }

  try {
    const docRef = doc(db, 'itineraries', id);
    await updateDoc(docRef, {
      ...updatedData,
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error("Error updating Firestore doc:", error);
    return { success: false, error: error.message };
  }
};
