import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Check if valid Firebase configuration is provided via environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDemoPlaceholderKeyPlanMyTrip2026",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "planmytrip-demo.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "planmytrip-demo",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "planmytrip-demo.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1234567890",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1234567890:web:abcdef12345678"
};

const isDemoKey = firebaseConfig.apiKey.includes("DemoPlaceholder") || firebaseConfig.apiKey === "your_api_key_here";

let app;
let auth;
let db;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
} catch (error) {
  console.warn("Firebase initialization error, running in local fallback mode:", error);
}

export { auth, db, isDemoKey };
export default app;
