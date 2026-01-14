import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import {
  initializeAuth,
  browserLocalPersistence,
  indexedDBLocalPersistence,
  getReactNativePersistence,
} from "firebase/auth";
import {
  getFirestore,
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
  enableNetwork,
  disableNetwork,
} from "firebase/firestore";
import { getMessaging, isSupported } from "firebase/messaging";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

let app: FirebaseApp | undefined;

export function getFirebaseApp() {
  if (app) return app;
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApps()[0];
  }
  return app;
}

export function getFirebaseAuth() {
  const firebaseApp = getFirebaseApp();
  // Use indexedDB for resilience; fallback to localStorage.
  const persistenceLayers =
    typeof window !== "undefined" && "indexedDB" in window
      ? [indexedDBLocalPersistence, browserLocalPersistence]
      : [browserLocalPersistence];
  return initializeAuth(firebaseApp, { persistence: persistenceLayers });
}

export function getDb() {
  const firebaseApp = getFirebaseApp();
  return initializeFirestore(firebaseApp, {
    localCache: persistentLocalCache({
      tabManager: persistentMultipleTabManager(),
    }),
  });
}

export async function setOffline(enabled: boolean) {
  const db = getDb();
  if (enabled) {
    await disableNetwork(db);
  } else {
    await enableNetwork(db);
  }
}

export async function getMessagingIfSupported() {
  const firebaseApp = getFirebaseApp();
  if (typeof window === "undefined") return null;
  if (!(await isSupported())) return null;
  return getMessaging(firebaseApp);
}

