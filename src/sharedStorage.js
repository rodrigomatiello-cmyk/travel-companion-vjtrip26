import { initializeApp, getApps } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "",
};

const required = [
  firebaseConfig.apiKey,
  firebaseConfig.authDomain,
  firebaseConfig.projectId,
  firebaseConfig.appId,
];

export const isFirebaseEnabled = required.every(Boolean);
const tripId = import.meta.env.VITE_TRIP_DOC_ID || "vjtrip26";
const localPrefix = "vjtrip26:";

let db = null;
if (isFirebaseEnabled) {
  const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  db = getFirestore(app);
}

function localGet(key) {
  try {
    const value = window.localStorage.getItem(localPrefix + key);
    return value == null ? null : { value };
  } catch {
    return null;
  }
}

function localSet(key, value) {
  try {
    window.localStorage.setItem(localPrefix + key, value);
  } catch {
    // iOS private mode or full storage can fail. The app still continues in memory.
  }
  return { value };
}

export const storage = {
  async get(key, shared = false) {
    if (shared && db) {
      const ref = doc(db, "trips", tripId, "kv", key);
      const snap = await getDoc(ref);
      if (!snap.exists()) return null;
      const data = snap.data();
      return data?.value == null ? null : { value: data.value };
    }
    return localGet(key);
  },

  async set(key, value, shared = false) {
    if (shared && db) {
      const ref = doc(db, "trips", tripId, "kv", key);
      await setDoc(ref, { value, updatedAt: serverTimestamp() }, { merge: true });
      return { value };
    }
    return localSet(key, value);
  },
};
