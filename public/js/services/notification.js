import { initializeFirebase } from './auth.js';
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDocs,
  query,
  where,
  updateDoc,
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

const sendNotification = async (userId, notificationData) => {
  const db = getDb();
  const docRef = await addDoc(collection(db, 'notifications'), {
    userId,
    ...notificationData,
    read: false,
    createdAt: Timestamp.now()
  });
  return docRef.id;
};

const getUserNotifications = async (userId) => {
  const db = getDb();
  const q = query(
    collection(db, 'notifications'),
    where('userId', '==', userId)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

const markNotificationAsRead = async (notificationId) => {
  const db = getDb();
  const docRef = doc(db, 'notifications', notificationId);
  await updateDoc(docRef, {
    read: true,
    readAt: Timestamp.now()
  });
};

const markAllAsRead = async (userId) => {
  const db = getDb();
  const q = query(
    collection(db, 'notifications'),
    where('userId', '==', userId),
    where('read', '==', false)
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.docs.forEach(doc => {
    updateDoc(doc.ref, { read: true, readAt: Timestamp.now() });
  });
};

export {
  sendNotification,
  getUserNotifications,
  markNotificationAsRead,
  markAllAsRead
};
