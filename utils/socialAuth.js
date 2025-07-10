// Social Authentication Utilities
// This file handles social login providers with mock implementations
// In a real app, you would integrate with actual OAuth providers

// Mock social login providers
const SOCIAL_PROVIDERS = {
  GOOGLE: 'google',
  APPLE: 'apple',
  MICROSOFT: 'microsoft'
};

// Provider configurations
const PROVIDER_CONFIGS = {
  [SOCIAL_PROVIDERS.GOOGLE]: {
    name: 'Google'
  },
  [SOCIAL_PROVIDERS.APPLE]: {
    name: 'Apple'
  },
  [SOCIAL_PROVIDERS.MICROSOFT]: {
    name: 'Microsoft'
  }
};

// Mock user data for social logins
const MOCK_SOCIAL_USERS = {
  [SOCIAL_PROVIDERS.GOOGLE]: [
    { email: 'john.doe@gmail.com', name: 'John Doe', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
    { email: 'sarah.wilson@gmail.com', name: 'Sarah Wilson', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face' }
  ],
  [SOCIAL_PROVIDERS.APPLE]: [
    { email: 'alex.smith@icloud.com', name: 'Alex Smith', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face' },
    { email: 'lisa.brown@icloud.com', name: 'Lisa Brown', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face' }
  ],
  [SOCIAL_PROVIDERS.MICROSOFT]: [
    { email: 'james.wilson@outlook.com', name: 'James Wilson', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face' },
    { email: 'sophia.taylor@outlook.com', name: 'Sophia Taylor', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face' }
  ]
};

// Simulate social login process
export const handleSocialLogin = async (provider) => {
  return new Promise((resolve, reject) => {
    // Simulate API call delay
    setTimeout(() => {
      try {
        // Simulate random success/failure (90% success rate)
        const isSuccess = Math.random() > 0.1;
        
        if (!isSuccess) {
          throw new Error(`Failed to authenticate with ${PROVIDER_CONFIGS[provider].name}. Please try again.`);
        }

        // Get random user from the provider's mock data
        const users = MOCK_SOCIAL_USERS[provider];
        const randomUser = users[Math.floor(Math.random() * users.length)];
        
        // Create user object with provider info
        const user = {
          ...randomUser,
          id: `social_${provider}_${Date.now()}`,
          provider: provider,
          providerName: PROVIDER_CONFIGS[provider].name,
          isSocialLogin: true,
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString()
        };

        resolve(user);
      } catch (error) {
        reject(error);
      }
    }, 1500 + Math.random() * 1000); // Random delay between 1.5-2.5 seconds
  });
};

// Get provider configuration
export const getProviderConfig = (provider) => {
  return PROVIDER_CONFIGS[provider] || null;
};

// Get all available providers
export const getAvailableProviders = () => {
  return Object.values(SOCIAL_PROVIDERS);
};

// Check if a provider is available
export const isProviderAvailable = (provider) => {
  return Object.values(SOCIAL_PROVIDERS).includes(provider);
};

// Get provider display name
export const getProviderName = (provider) => {
  return PROVIDER_CONFIGS[provider]?.name || provider;
};

// Validate social login response
export const validateSocialLoginResponse = (user) => {
  if (!user || !user.email || !user.name) {
    throw new Error('Invalid user data received from social provider');
  }
  
  if (!user.provider || !isProviderAvailable(user.provider)) {
    throw new Error('Invalid or unsupported social provider');
  }
  
  return true;
};

// Create social login user profile
export const createSocialUserProfile = (socialUser) => {
  return {
    id: socialUser.id,
    name: socialUser.name,
    email: socialUser.email,
    avatar: socialUser.avatar,
    provider: socialUser.provider,
    providerName: socialUser.providerName,
    isSocialLogin: true,
    isEmailVerified: true, // Social logins are typically pre-verified
    createdAt: socialUser.createdAt,
    lastLogin: socialUser.lastLogin,
    preferences: {
      notifications: true,
      marketing: false,
      theme: 'light'
    }
  };
};

export { SOCIAL_PROVIDERS }; 