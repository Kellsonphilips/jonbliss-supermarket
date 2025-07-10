// Authentication utility functions for Jonbliss Supermarket

// Import social authentication utilities
import { handleSocialLogin, createSocialUserProfile, validateSocialLoginResponse } from './socialAuth';

// User data structure
const USERS_KEY = 'jonbliss-users';
const CURRENT_USER_KEY = 'jonbliss-current-user';
const LOGIN_STATUS_KEY = 'jonbliss-login-status';

// Check if we're in a browser environment
const isBrowser = typeof window !== 'undefined';

// Initialize default users if none exist
const initializeDefaultUsers = () => {
  if (!isBrowser) return;
  
  const existingUsers = getUsers();
  if (existingUsers.length === 0) {
    const defaultUsers = [
      {
        id: '1',
        name: 'Demo User',
        email: 'demo@jonbliss.com',
        password: 'demo123', // In production, this would be hashed
        createdAt: new Date().toISOString(),
        role: 'customer'
      },
      {
        id: '2',
        name: 'Admin User',
        email: 'admin@jonbliss.com',
        password: 'admin123',
        createdAt: new Date().toISOString(),
        role: 'admin'
      }
    ];
    localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
  }
};

// Get all users
export const getUsers = () => {
  if (!isBrowser) return [];
  
  try {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
  } catch (error) {
    console.error('Error getting users:', error);
    return [];
  }
};

// Save users to localStorage
const saveUsers = (users) => {
  if (!isBrowser) return;
  
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch (error) {
    console.error('Error saving users:', error);
    throw new Error('Failed to save user data');
  }
};

// Validate email format
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate password strength
export const validatePassword = (password) => {
  if (password.length < 6) {
    return { valid: false, message: 'Password must be at least 6 characters long' };
  }
  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one uppercase letter' };
  }
  if (!/[a-z]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one lowercase letter' };
  }
  if (!/\d/.test(password)) {
    return { valid: false, message: 'Password must contain at least one number' };
  }
  return { valid: true, message: 'Password is valid' };
};

// Register a new user
export const registerUser = async (userData) => {
  if (!isBrowser) {
    throw new Error('Registration is only available in browser environment');
  }
  
  try {
    // Validate input
    if (!userData.name || !userData.email || !userData.password) {
      throw new Error('All fields are required');
    }

    if (!validateEmail(userData.email)) {
      throw new Error('Please enter a valid email address');
    }

    const passwordValidation = validatePassword(userData.password);
    if (!passwordValidation.valid) {
      throw new Error(passwordValidation.message);
    }

    // Check if user already exists
    const users = getUsers();
    const existingUser = users.find(user => user.email.toLowerCase() === userData.email.toLowerCase());
    
    if (existingUser) {
      throw new Error('An account with this email already exists');
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name: userData.name.trim(),
      email: userData.email.toLowerCase().trim(),
      password: userData.password, // In production, hash this password
      createdAt: new Date().toISOString(),
      role: 'customer',
      profile: {
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'Nigeria'
      }
    };

    // Add user to storage
    users.push(newUser);
    saveUsers(users);

    // Return user data without password
    const { password, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  } catch (error) {
    throw error;
  }
};

// Login user
export const loginUser = async (email, password) => {
  if (!isBrowser) {
    throw new Error('Login is only available in browser environment');
  }
  
  try {
    // Validate input
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    if (!validateEmail(email)) {
      throw new Error('Please enter a valid email address');
    }

    // Find user
    const users = getUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      throw new Error('No account found with this email address');
    }

    // Check password (in production, compare hashed passwords)
    if (user.password !== password) {
      throw new Error('Incorrect password');
    }

    // Set login status
    localStorage.setItem(LOGIN_STATUS_KEY, 'true');
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));

    // Return user data without password
    const { password: userPassword, ...userWithoutPassword } = user;
    return userWithoutPassword;
  } catch (error) {
    throw error;
  }
};

// Social login user
export const socialLoginUser = async (provider) => {
  if (!isBrowser) {
    throw new Error('Social login is only available in browser environment');
  }
  
  try {
    // Handle social login through the social auth utility
    const socialUser = await handleSocialLogin(provider);
    
    // Validate the social login response
    validateSocialLoginResponse(socialUser);
    
    // Create a standardized user profile
    const userProfile = createSocialUserProfile(socialUser);
    
    // Check if user already exists in our system
    const users = getUsers();
    const existingUser = users.find(u => u.email.toLowerCase() === userProfile.email.toLowerCase());
    
    let finalUser;
    
    if (existingUser) {
      // Update existing user with social login info
      const userIndex = users.findIndex(u => u.id === existingUser.id);
      users[userIndex] = {
        ...existingUser,
        ...userProfile,
        lastLogin: new Date().toISOString(),
        isSocialLogin: true,
        provider: userProfile.provider,
        providerName: userProfile.providerName
      };
      finalUser = users[userIndex];
    } else {
      // Create new user from social login
      const newUser = {
        ...userProfile,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        role: 'customer',
        lastLogin: new Date().toISOString(),
        isSocialLogin: true,
        provider: userProfile.provider,
        providerName: userProfile.providerName
      };
      users.push(newUser);
      finalUser = newUser;
    }
    
    // Save updated users
    saveUsers(users);
    
    // Set login status
    localStorage.setItem(LOGIN_STATUS_KEY, 'true');
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(finalUser));
    
    // Return user data without sensitive info
    const { password, ...userWithoutPassword } = finalUser;
    return userWithoutPassword;
  } catch (error) {
    throw error;
  }
};

// Logout user
export const logoutUser = () => {
  if (!isBrowser) return false;
  
  try {
    localStorage.removeItem(LOGIN_STATUS_KEY);
    localStorage.removeItem(CURRENT_USER_KEY);
    
    // Dispatch custom event to notify components
    window.dispatchEvent(new CustomEvent('auth-state-changed', { 
      detail: { isLoggedIn: false, user: null } 
    }));
    
    return true;
  } catch (error) {
    console.error('Error during logout:', error);
    return false;
  }
};

// Get current user
export const getCurrentUser = () => {
  if (!isBrowser) return null;
  
  try {
    const userData = localStorage.getItem(CURRENT_USER_KEY);
    if (!userData) return null;
    
    const user = JSON.parse(userData);
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

// Check if user is logged in
export const isLoggedIn = () => {
  if (!isBrowser) return false;
  
  try {
    const loginStatus = localStorage.getItem(LOGIN_STATUS_KEY);
    return loginStatus === 'true';
  } catch (error) {
    console.error('Error checking login status:', error);
    return false;
  }
};

// Update user profile
export const updateUserProfile = (updates) => {
  if (!isBrowser) {
    throw new Error('Profile updates are only available in browser environment');
  }
  
  try {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      throw new Error('No user is currently logged in');
    }

    const users = getUsers();
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    
    if (userIndex === -1) {
      throw new Error('User not found');
    }

    // Update user profile
    users[userIndex] = {
      ...users[userIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    // Save updated users
    saveUsers(users);

    // Update current user in localStorage
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(users[userIndex]));

    // Return updated user without password
    const { password, ...userWithoutPassword } = users[userIndex];
    return userWithoutPassword;
  } catch (error) {
    throw error;
  }
};

// Change password
export const changePassword = (currentPassword, newPassword) => {
  if (!isBrowser) {
    throw new Error('Password changes are only available in browser environment');
  }
  
  try {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      throw new Error('No user is currently logged in');
    }

    const users = getUsers();
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    
    if (userIndex === -1) {
      throw new Error('User not found');
    }

    // Verify current password
    if (users[userIndex].password !== currentPassword) {
      throw new Error('Current password is incorrect');
    }

    // Validate new password
    const passwordValidation = validatePassword(newPassword);
    if (!passwordValidation.valid) {
      throw new Error(passwordValidation.message);
    }

    // Update password
    users[userIndex].password = newPassword;
    users[userIndex].updatedAt = new Date().toISOString();

    // Save updated users
    saveUsers(users);

    // Update current user in localStorage
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(users[userIndex]));

    return true;
  } catch (error) {
    throw error;
  }
};

// Listen for auth state changes
export const onAuthStateChanged = (callback) => {
  if (!isBrowser) return () => {};
  
  const handleAuthChange = (event) => {
    const { isLoggedIn, user } = event.detail;
    callback({ isLoggedIn, user });
  };

  window.addEventListener('auth-state-changed', handleAuthChange);

  // Return unsubscribe function
  return () => {
    window.removeEventListener('auth-state-changed', handleAuthChange);
  };
};

// Initialize default users on module load (only in browser)
if (isBrowser) {
  initializeDefaultUsers();
} 