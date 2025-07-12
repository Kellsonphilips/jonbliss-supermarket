// Profile utility functions

export const formatAddress = (profile) => {
  if (!profile?.address) return 'Not provided';
  
  const parts = [
    profile.address,
    profile.city,
    profile.state,
    profile.zipCode
  ].filter(Boolean);
  
  return parts.join(', ');
};

export const formatBillingAddress = (billing) => {
  if (!billing?.billingAddress?.address) return 'Not provided';
  
  const parts = [
    billing.billingAddress.address,
    billing.billingAddress.city,
    billing.billingAddress.state
  ].filter(Boolean);
  
  return parts.join(', ');
};

export const maskCardNumber = (cardNumber) => {
  if (!cardNumber) return '•••• •••• •••• 1234';
  return cardNumber.replace(/(\d{4})(?=\d)/g, '$1 ').replace(/\d(?=\d{4})/g, '•');
};

export const validatePassword = (password) => {
  const errors = [];
  
  if (password.length < 6) {
    errors.push('Password must be at least 6 characters long');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  return errors;
};

export const checkPasswordStrength = (password) => {
  let score = 0;
  if (password.length >= 6) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  
  let label = 'Very Weak', color = 'red';
  if (score === 1) { label = 'Very Weak'; color = 'red'; }
  else if (score === 2) { label = 'Weak'; color = 'orange'; }
  else if (score === 3) { label = 'Moderate'; color = 'yellow'; }
  else if (score === 4) { label = 'Strong'; color = 'green'; }
  else if (score === 5) { label = 'Very Strong'; color = 'emerald'; }
  
  return { score, label, color };
}; 