import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const VITE_APP_API_KEY = import.meta.env.VITE_APP_API_KEY;
const VITE_AUTH_DOMAIN = import.meta.env.VITE_AUTH_DOMAIN;
const VITE_APP_ID = import.meta.env.VITE_APP_ID;
const VITE_MEASUREMENT_ID = import.meta.env.VITE_MEASUREMENT_ID;
const VITE_MESSAGING_SENDER_ID = import.meta.env.VITE_MESSAGING_SENDER_ID;


const firebaseConfig = {
  apiKey: VITE_APP_API_KEY,
  authDomain: VITE_AUTH_DOMAIN,
  databaseURL: "https://learnlingo-bd07e-default-rtdb.firebaseio.com",
  projectId: "learnlingo-bd07e",
  storageBucket: "learnlingo-bd07e.firebasestorage.app",
  messagingSenderId: VITE_MESSAGING_SENDER_ID,
  appId: VITE_APP_ID,
  measurementId: VITE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const database = getDatabase();