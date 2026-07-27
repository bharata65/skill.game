import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  updateProfile
} from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  query,
  collection,
  where,
  getDocs
} from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js';
import firebaseConfig from '../config/firebase.js';

let auth;
let db;
let initialized = false;

const initializeFirebase = () => {
  if (initialized) return;
  const app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  initialized = true;
};

const getCurrentUser = () => {
  initializeFirebase();
  return auth.currentUser;
};

const getCurrentUserAsync = () => {
  return new Promise((resolve) => {
    initializeFirebase();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    });
  });
};

const register = async (email, password, userData) => {
  initializeFirebase();
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  await updateProfile(user, {
    displayName: userData.displayName
  });

  const userDocRef = doc(db, 'users', user.uid);
  await setDoc(userDocRef, {
    uid: user.uid,
    email: user.email,
    displayName: userData.displayName,
    phone: userData.phone || '',
    role: 'user',
    walletBalance: 0,
    totalDeposited: 0,
    totalWithdrawn: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    emailVerified: false,
    kyc: {
      verified: false,
      documentType: null,
      documentNumber: null
    }
  });

  return user;
};

const login = async (email, password) => {
  initializeFirebase();
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

const logout = async () => {
  initializeFirebase();
  await signOut(auth);
};

const sendPasswordReset = async (email) => {
  initializeFirebase();
  await sendPasswordResetEmail(auth, email);
};

const getUserProfile = async (uid) => {
  initializeFirebase();
  const userDocRef = doc(db, 'users', uid);
  const userDoc = await getDoc(userDocRef);
  return userDoc.exists() ? userDoc.data() : null;
};

const updateUserProfile = async (uid, updates) => {
  initializeFirebase();
  const userDocRef = doc(db, 'users', uid);
  const updateData = {
    ...updates,
    updatedAt: new Date()
  };
  await setDoc(userDocRef, updateData, { merge: true });
};

const observeAuthState = (callback) => {
  initializeFirebase();
  return onAuthStateChanged(auth, callback);
};

export {
  initializeFirebase,
  getCurrentUser,
  getCurrentUserAsync,
  register,
  login,
  logout,
  sendPasswordReset,
  getUserProfile,
  updateUserProfile,
  observeAuthState
};
