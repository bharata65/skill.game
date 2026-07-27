import { initializeFirebase } from './auth.js';
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
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

const generateLeaderboard = async (contestId) => {
  const db = getDb();
  const userContestQuery = query(
    collection(db, 'userContests'),
    where('contestId', '==', contestId)
  );
  const userContests = await getDocs(userContestQuery);

  const leaderboardData = userContests.docs.map(doc => ({
    ...doc.data(),
    id: doc.id
  }));

  leaderboardData.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return a.timeTaken - b.timeTaken;
  });

  const batch = writeBatch(db);
  const contestRef = doc(db, 'contests', contestId);

  leaderboardData.forEach((entry, index) => {
    const userContestRef = doc(db, 'userContests', entry.id);
    batch.update(userContestRef, {
      rank: index + 1,
      leaderboardGeneratedAt: Timestamp.now()
    });
  });

  batch.update(contestRef, {
    leaderboard: leaderboardData.map((entry, index) => ({
      rank: index + 1,
      userId: entry.userId,
      score: entry.score,
      timeTaken: entry.timeTaken,
      status: 'completed'
    })),
    leaderboardGeneratedAt: Timestamp.now()
  });

  await batch.commit();
  return leaderboardData.map((entry, index) => ({
    rank: index + 1,
    ...entry
  }));
};

const getLeaderboard = async (contestId) => {
  const db = getDb();
  const contestRef = doc(db, 'contests', contestId);
  const contestSnap = await getDoc(contestRef);
  return contestSnap.exists() ? contestSnap.data().leaderboard || [] : [];
};

const getContestResults = async (contestId) => {
  const db = getDb();
  const userContestQuery = query(
    collection(db, 'userContests'),
    where('contestId', '==', contestId),
    orderBy('rank', 'asc')
  );
  const querySnapshot = await getDocs(userContestQuery);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export {
  generateLeaderboard,
  getLeaderboard,
  getContestResults
};
