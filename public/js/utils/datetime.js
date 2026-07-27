const formatDate = (date, format = 'MMM DD, YYYY') => {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }

  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return format
    .replace('DD', String(day).padStart(2, '0'))
    .replace('MMM', month)
    .replace('YYYY', year)
    .replace('HH', hours)
    .replace('mm', minutes);
};

const formatTime = (milliseconds) => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const formatCurrency = (amount, currency = 'INR') => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency
  }).format(amount);
};

const getTimeAgo = (date) => {
  const now = new Date();
  const diff = now.getTime() - new Date(date).getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return 'just now';
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;
  return formatDate(date);
};

const addMilliseconds = (date, ms) => {
  return new Date(date.getTime() + ms);
};

const addSeconds = (date, seconds) => {
  return addMilliseconds(date, seconds * 1000);
};

const addMinutes = (date, minutes) => {
  return addSeconds(date, minutes * 60);
};

const addHours = (date, hours) => {
  return addMinutes(date, hours * 60);
};

const addDays = (date, days) => {
  return addHours(date, days * 24);
};

const getCountdownTime = (targetDate) => {
  const now = new Date();
  const diff = new Date(targetDate).getTime() - now.getTime();

  if (diff <= 0) return null;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
};

export {
  formatDate,
  formatTime,
  formatCurrency,
  getTimeAgo,
  addMilliseconds,
  addSeconds,
  addMinutes,
  addHours,
  addDays,
  getCountdownTime
};
