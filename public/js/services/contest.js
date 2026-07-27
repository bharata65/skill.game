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
  orderBy,
  limit,
  startAfter,
  setDoc,
  updateDoc,
  deleteDoc,
  writeBatch,
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

const createContest = async (contestData) => {
  const db = getDb();
  const docRef = await addDoc(collection(db, 'contests'), {
    ...contestData,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
    participants: [],
    leaderboard: [],
    status: 'draft'
  });
  return docRef.id;
};

const getContest = async (contestId) => {
  const db = getDb();
  const docRef = doc(db, 'contests', contestId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
};

const getContests = async (filters = {}) => {
  const db = getDb();
  let q = query(collection(db, 'contests'));

  if (filters.status) {
    q = query(collection(db, 'contests'), where('status', '==', filters.status));
  }

  if (filters.orderBy) {
    q = query(collection(db, 'contests'), orderBy(filters.orderBy, 'desc'));
  }

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

const updateContest = async (contestId, updates) => {
  const db = getDb();
  const docRef = doc(db, 'contests', contestId);
  await updateDoc(docRef, {
    ...updates,
    updatedAt: Timestamp.now()
  });
};

const deleteContest = async (contestId) => {
  const db = getDb();
  const docRef = doc(db, 'contests', contestId);
  await deleteDoc(docRef);
};

const joinContest = async (contestId, userId, entryFee) => {
  const db = getDb();
  const contestRef = doc(db, 'contests', contestId);
  const userContestRef = doc(collection(db, 'userContests'), `${userId}_${contestId}`);

  const batch = writeBatch(db);
  batch.update(contestRef, {
    participants: [...new Set([...((await getDoc(contestRef)).data().participants || []), userId])]
  });
  batch.set(userContestRef, {
    userId,
    contestId,
    joinedAt: Timestamp.now(),
    status: 'joined',
    score: 0,
    timeTaken: 0,
    rank: null,
    answers: []
  });

  await batch.commit();
};

const getUserContests = async (userId) => {
  const db = getDb();
  const q = query(collection(db, 'userContests'), where('userId', '==', userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

const getUserContest = async (userId, contestId) => {
  const db = getDb();
  const docRef = doc(db, 'userContests', `${userId}_${contestId}`);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
};

const updateUserContest = async (userId, contestId, updates) => {
  const db = getDb();
  const docRef = doc(db, 'userContests', `${userId}_${contestId}`);
  await updateDoc(docRef, {
    ...updates,
    updatedAt: Timestamp.now()
  });
};

export {
  createContest,
  getContest,
  getContests,
  updateContest,
  deleteContest,
  joinContest,
  getUserContests,
  getUserContest,
  updateUserContest
};
