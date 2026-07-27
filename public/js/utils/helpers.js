const createElement = (tag, className = '', content = '') => {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (content) element.innerHTML = content;
  return element;
};

const addClass = (element, className) => {
  element.classList.add(className);
};

const removeClass = (element, className) => {
  element.classList.remove(className);
};

const toggleClass = (element, className) => {
  element.classList.toggle(className);
};

const hasClass = (element, className) => {
  return element.classList.contains(className);
};

const setAttributes = (element, attributes) => {
  for (const [key, value] of Object.entries(attributes)) {
    element.setAttribute(key, value);
  }
};

const addEventListener = (element, event, handler) => {
  if (Array.isArray(element)) {
    element.forEach(el => el.addEventListener(event, handler));
  } else {
    element.addEventListener(event, handler);
  }
};

const removeEventListener = (element, event, handler) => {
  if (Array.isArray(element)) {
    element.forEach(el => el.removeEventListener(event, handler));
  } else {
    element.removeEventListener(event, handler);
  }
};

const debounce = (func, delay = 300) => {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

const throttle = (func, limit = 300) => {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const getQueryParam = (param) => {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get(param);
};

const setQueryParam = (param, value) => {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set(param, value);
  window.history.replaceState(null, '', `?${searchParams.toString()}`);
};

export {
  createElement,
  addClass,
  removeClass,
  toggleClass,
  hasClass,
  setAttributes,
  addEventListener,
  removeEventListener,
  debounce,
  throttle,
  deepClone,
  generateUUID,
  formatNumber,
  getQueryParam,
  setQueryParam
};
