import React, { createContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail, 
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { auth, isDemoKey } from '../firebase/config.js';

export const AuthContext = createContext();

const LOCAL_USER_KEY = 'pmt_current_user';

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(isDemoKey);

  useEffect(() => {
    // If in demo mode or auth not initialized, check local storage
    if (isDemoKey || !auth) {
      try {
        const stored = localStorage.getItem(LOCAL_USER_KEY);
        if (stored) {
          setCurrentUser(JSON.parse(stored));
        } else {
          // Provide a default demo user for instant testing
          const demoUser = {
            uid: 'demo_user_planmytrip_2026',
            email: 'traveler@planmytrip.io',
            displayName: 'Alex Explorer',
            photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
            isDemo: true
          };
          localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(demoUser));
          setCurrentUser(demoUser);
        }
      } catch (e) {
        console.error("Local auth storage error:", e);
      }
      setLoading(false);
      return;
    }

    // Subscribe to Firebase Auth state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || user.email.split('@')[0],
          photoURL: user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.uid}`
        };
        setCurrentUser(userData);
        try {
          localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(userData));
        } catch {}
      } else {
        setCurrentUser(null);
        try {
          localStorage.removeItem(LOCAL_USER_KEY);
        } catch {}
      }
      setLoading(false);
    }, (error) => {
      console.warn("Firebase Auth listener error, switching to demo mode:", error);
      setIsDemoMode(true);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [isDemoMode]);

  // Sign Up
  const signup = async (email, password, name) => {
    if (isDemoMode || !auth) {
      const newUser = {
        uid: `demo_${Date.now()}`,
        email,
        displayName: name || email.split('@')[0],
        photoURL: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Date.now()}`,
        isDemo: true
      };
      localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(newUser));
      setCurrentUser(newUser);
      return { success: true, user: newUser };
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      if (name) {
        await updateProfile(userCredential.user, {
          displayName: name,
          photoURL: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userCredential.user.uid}`
        });
      }
      const updatedUser = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: name || userCredential.user.email.split('@')[0],
        photoURL: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userCredential.user.uid}`
      };
      setCurrentUser(updatedUser);
      return { success: true, user: updatedUser };
    } catch (error) {
      console.error("Signup error:", error);
      return { success: false, error: error.message };
    }
  };

  // Login
  const login = async (email, password) => {
    if (isDemoMode || !auth) {
      const existing = localStorage.getItem(LOCAL_USER_KEY);
      let userObj;
      if (existing) {
        userObj = JSON.parse(existing);
        userObj.email = email;
        userObj.displayName = email.split('@')[0];
      } else {
        userObj = {
          uid: `demo_${Date.now()}`,
          email,
          displayName: email.split('@')[0],
          photoURL: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Date.now()}`,
          isDemo: true
        };
      }
      localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(userObj));
      setCurrentUser(userObj);
      return { success: true, user: userObj };
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, user: userCredential.user };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, error: error.message };
    }
  };

  // Logout
  const logout = async () => {
    if (isDemoMode || !auth) {
      localStorage.removeItem(LOCAL_USER_KEY);
      setCurrentUser(null);
      return { success: true };
    }

    try {
      await signOut(auth);
      localStorage.removeItem(LOCAL_USER_KEY);
      setCurrentUser(null);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Forgot Password
  const resetPassword = async (email) => {
    if (isDemoMode || !auth) {
      return { success: true, message: "In Demo Mode: A simulated reset link has been generated for " + email };
    }

    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true, message: "Password reset email sent successfully!" };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Update Profile Name
  const updateProfileName = async (newName) => {
    if (!currentUser) return false;
    
    const updated = { ...currentUser, displayName: newName };
    setCurrentUser(updated);
    try {
      localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(updated));
    } catch {}

    if (!isDemoMode && auth?.currentUser) {
      try {
        await updateProfile(auth.currentUser, { displayName: newName });
      } catch (e) {
        console.warn("Could not update Firebase profile:", e);
      }
    }
    return true;
  };

  const value = {
    currentUser,
    loading,
    isDemoMode,
    signup,
    login,
    logout,
    resetPassword,
    updateProfileName
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
