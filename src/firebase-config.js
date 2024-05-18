
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Import Firestore
import { getAnalytics } from "firebase/analytics"; // Import Analytics
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAyjiyNTVTNA-aDYeiaju4MssrssX_VDqI",
  authDomain: "portfolio-db644.firebaseapp.com",
  projectId: "portfolio-db644",
  storageBucket: "portfolio-db644.appspot.com",
  messagingSenderId: "277949851954",
  appId: "1:277949851954:web:9125f7c138bf69e53d4f2b",
  measurementId: "G-T2K8EXX3HR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Analytics
const analytics = getAnalytics(app);

// export { app, db, analytics }; 

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { app, db, auth, provider, analytics };
export const storage = getStorage()
