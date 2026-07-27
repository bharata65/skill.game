export const APP_NAME = 'SKILL GAME';
export const APP_VERSION = '1.0.0';

export const ROUTES = {
  WELCOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  DASHBOARD: '/dashboard',
  WALLET: '/wallet',
  CONTEST_LIST: '/contests',
  CONTEST_DETAILS: '/contests/:id',
  CONTEST_JOIN: '/contests/:id/join',
  WAITING_ROOM: '/contests/:id/waiting',
  PUZZLE_GAME: '/contests/:id/game',
  LEADERBOARD: '/contests/:id/leaderboard',
  TRANSACTION_HISTORY: '/transactions',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  NOTIFICATIONS: '/notifications',
  ADMIN_DASHBOARD: '/admin',
  ADMIN_CONTESTS: '/admin/contests',
  ADMIN_PUZZLES: '/admin/puzzles',
  ADMIN_USERS: '/admin/users',
  ADMIN_WALLET: '/admin/wallet',
  ADMIN_REPORTS: '/admin/reports',
  NOT_FOUND: '/404'
};

export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin'
};

export const CONTEST_STATUS = {
  DRAFT: 'draft',
  UPCOMING: 'upcoming',
  LIVE: 'live',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
};

export const TRANSACTION_TYPES = {
  DEPOSIT: 'deposit',
  WITHDRAWAL: 'withdrawal',
  REFUND: 'refund',
  PRIZE: 'prize',
  CONTEST_ENTRY: 'contest_entry'
};

export const TRANSACTION_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  COMPLETED: 'completed'
};

export const PUZZLE_ROUNDS = 5;
export const PUZZLE_TIME_LIMIT = 60 * 1000; // 60 seconds in milliseconds
export const PUZZLE_OPTIONS = 4;

export const PAGINATION_LIMIT = 20;

export const ERROR_MESSAGES = {
  GENERIC: 'Something went wrong. Please try again.',
  NETWORK: 'Network error. Please check your connection.',
  AUTH_REQUIRED: 'Please sign in to continue.',
  PERMISSION_DENIED: 'You do not have permission to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  CONTEST_FULL: 'This contest is full.',
  CONTEST_STARTED: 'This contest has already started.',
  INSUFFICIENT_BALANCE: 'Insufficient wallet balance.',
  INVALID_INPUT: 'Invalid input provided.',
  DUPLICATE_ENTRY: 'You have already joined this contest.',
  CONTEST_NOT_JOINED: 'You have not joined this contest.',
  CONTEST_IN_PROGRESS: 'You cannot withdraw from a contest in progress.',
  WITHDRAWAL_LIMIT: 'Withdrawal limit exceeded.'
};

export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'You have been logged in successfully.',
  LOGOUT_SUCCESS: 'You have been logged out successfully.',
  REGISTRATION_SUCCESS: 'Registration successful. Please check your email to verify your account.',
  PASSWORD_RESET_SENT: 'Password reset link has been sent to your email.',
  PROFILE_UPDATED: 'Profile updated successfully.',
  CONTEST_JOINED: 'You have joined the contest successfully.',
  DEPOSIT_REQUEST_SUBMITTED: 'Deposit request submitted successfully.',
  WITHDRAWAL_REQUEST_SUBMITTED: 'Withdrawal request submitted successfully.',
  TRANSACTION_COMPLETED: 'Transaction completed successfully.'
};

export const LEADERBOARD_RANKING = {
  1: { position: 1, label: '🥇' },
  2: { position: 2, label: '🥈' },
  3: { position: 3, label: '🥉' }
};
