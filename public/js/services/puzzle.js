import { initializeFirebase } from './auth.js';
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  setDoc,
  updateDoc,
  deleteDoc,
  Timestamp
} from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js';

let db;

const getDb = () => {
  if (!db) {
    initializeFirebase();
    db = getFirestore();
  }
  return db;
};

const createPuzzle = async (puzzleData) => {
  const db = getDb();
  const docRef = await addDoc(collection(db, 'puzzles'), {
    ...puzzleData,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  });
  return docRef.id;
};

const getPuzzle = async (puzzleId) => {
  const db = getDb();
  const docRef = doc(db, 'puzzles', puzzleId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
};

const getContestPuzzles = async (contestId) => {
  const db = getDb();
  const q = query(collection(db, 'puzzles'), where('contestId', '==', contestId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

const updatePuzzle = async (puzzleId, updates) => {
  const db = getDb();
  const docRef = doc(db, 'puzzles', puzzleId);
  await updateDoc(docRef, {
    ...updates,
    updatedAt: Timestamp.now()
  });
};

const deletePuzzle = async (puzzleId) => {
  const db = getDb();
  const docRef = doc(db, 'puzzles', puzzleId);
  await deleteDoc(docRef);
};

export {
  createPuzzle,
  getPuzzle,
  getContestPuzzles,
  updatePuzzle,
  deletePuzzle
};
