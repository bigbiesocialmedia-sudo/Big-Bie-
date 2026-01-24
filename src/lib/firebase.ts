import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics"; // Analytics optional for now

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC-yxQlBVsWAxdb9LKifADb0O9_As-BHXk",
    authDomain: "bigbie.firebaseapp.com",
    projectId: "bigbie",
    storageBucket: "bigbie.firebasestorage.app",
    messagingSenderId: "336826789702",
    appId: "1:336826789702:web:75b6aca66b15707acb3f47",
    measurementId: "G-XZ8SV0EBVM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize Services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;
