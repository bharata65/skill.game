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
  updateDoc,
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

const getWalletBalance = async (userId) => {
  const db = getDb();
  const docRef = doc(db, 'users', userId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data().walletBalance : 0;
};

const getTransactions = async (userId) => {
  const db = getDb();
  const q = query(collection(db, 'transactions'), where('userId', '==', userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

const createTransaction = async (transactionData) => {
  const db = getDb();
  const docRef = await addDoc(collection(db, 'transactions'), {
    ...transactionData,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  });
  return docRef.id;
};

const requestDeposit = async (userId, amount, paymentMethod) => {
  const db = getDb();
  const transactionId = await createTransaction({
    userId,
    type: 'deposit',
    amount,
    paymentMethod,
    status: 'pending',
    description: 'Deposit Request'
  });
  return transactionId;
};

const requestWithdrawal = async (userId, amount, bankDetails) => {
  const db = getDb();
  const transactionId = await createTransaction({
    userId,
    type: 'withdrawal',
    amount,
    bankDetails,
    status: 'pending',
    description: 'Withdrawal Request'
  });
  return transactionId;
};

const approveTransaction = async (transactionId, updates = {}) => {
  const db = getDb();
  const docRef = doc(db, 'transactions', transactionId);
  const transactionSnap = await getDoc(docRef);
  const transaction = transactionSnap.data();

  const batch = writeBatch(db);
  batch.update(docRef, {
    status: 'approved',
    approvedAt: Timestamp.now(),
    ...updates
  });

  if (transaction.type === 'deposit') {
    const userRef = doc(db, 'users', transaction.userId);
    batch.update(userRef, {
      walletBalance: (await getWalletBalance(transaction.userId)) + transaction.amount,
      totalDeposited: (await getDoc(userRef)).data().totalDeposited + transaction.amount
    });
  }

  await batch.commit();
};

const rejectTransaction = async (transactionId, reason) => {
  const db = getDb();
  const docRef = doc(db, 'transactions', transactionId);
  await updateDoc(docRef, {
    status: 'rejected',
    rejectionReason: reason,
    rejectedAt: Timestamp.now()
  });
};

export {
  getWalletBalance,
  getTransactions,
  createTransaction,
  requestDeposit,
  requestWithdrawal,
  approveTransaction,
  rejectTransaction
};
