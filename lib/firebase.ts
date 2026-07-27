import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import firebaseConfig from "../firebase-applet-config.json";

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// The project uses a *named* Firestore database, not "(default)". Calling
// getFirestore(app) without the id silently targets the wrong database.
export const db = firebaseConfig.firestoreDatabaseId
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

export const auth = getAuth(app);
