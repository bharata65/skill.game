const isDevelopment = window.location.hostname === 'localhost';

const log = (message, data = null) => {
  if (isDevelopment) {
    console.log(`[SKILL GAME] ${message}`, data || '');
  }
};

const error = (message, error = null) => {
  if (isDevelopment) {
    console.error(`[SKILL GAME ERROR] ${message}`, error || '');
  }
};

const warn = (message, data = null) => {
  if (isDevelopment) {
    console.warn(`[SKILL GAME WARN] ${message}`, data || '');
  }
};

const info = (message, data = null) => {
  if (isDevelopment) {
    console.info(`[SKILL GAME INFO] ${message}`, data || '');
  }
};

export { log, error, warn, info };
