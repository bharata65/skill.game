const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  return password.length >= 8;
};

const validatePhoneNumber = (phone) => {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone.replace(/[^0-9]/g, ''));
};

const validateAmount = (amount) => {
  const amountNum = parseFloat(amount);
  return !isNaN(amountNum) && amountNum > 0;
};

const validateForm = (formData, rules) => {
  const errors = {};

  for (const [field, rule] of Object.entries(rules)) {
    const value = formData[field];

    if (rule.required && !value) {
      errors[field] = `${field} is required`;
      continue;
    }

    if (rule.type === 'email' && !validateEmail(value)) {
      errors[field] = 'Invalid email address';
    }

    if (rule.type === 'password' && !validatePassword(value)) {
      errors[field] = 'Password must be at least 8 characters long';
    }

    if (rule.type === 'phone' && !validatePhoneNumber(value)) {
      errors[field] = 'Invalid phone number';
    }

    if (rule.type === 'amount' && !validateAmount(value)) {
      errors[field] = 'Invalid amount';
    }

    if (rule.minLength && value.length < rule.minLength) {
      errors[field] = `${field} must be at least ${rule.minLength} characters`;
    }

    if (rule.maxLength && value.length > rule.maxLength) {
      errors[field] = `${field} must not exceed ${rule.maxLength} characters`;
    }

    if (rule.pattern && !rule.pattern.test(value)) {
      errors[field] = rule.patternMessage || `${field} is invalid`;
    }
  }

  return errors;
};

export {
  validateEmail,
  validatePassword,
  validatePhoneNumber,
  validateAmount,
  validateForm
};
