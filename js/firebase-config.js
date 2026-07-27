// Firebase SDK Imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyCHxA3QyNS7invzD46R2W7OwF7ypjHyICc",
    authDomain: "skill-game-71400.firebaseapp.com",
    projectId: "skill-game-71400",
    storageBucket: "skill-game-71400.firebasestorage.app",
    messagingSenderId: "795157421220",
    appId: "1:795157421220:web:466bc369a0578d690d1a31"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
