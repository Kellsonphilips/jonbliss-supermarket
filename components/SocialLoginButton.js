"use client";

import React from 'react';
import { getProviderConfig } from '../utils/socialAuth';
import { getSocialIcon } from './SocialIcons';

const SocialLoginButton = ({ provider, onClick, loading = false, disabled = false, action = 'signin' }) => {
  const config = getProviderConfig(provider);
  const IconComponent = getSocialIcon(provider);
  
  if (!config) {
    console.error(`Unknown provider: ${provider}`);
    return null;
  }

  // Define social brand colors
  const socialColors = {
    google: {
      bg: '#ffffff',
      text: '#4285F4',
      border: '#4285F4',
      hover: '#f8f9fa',
      focus: '#4285F4'
    },
    facebook: {
      bg: '#1877F2',
      text: '#ffffff',
      border: '#1877F2',
      hover: '#166FE5',
      focus: '#1877F2'
    },
    apple: {
      bg: '#000000',
      text: '#ffffff',
      border: '#000000',
      hover: '#1a1a1a',
      focus: '#666666'
    },
    twitter: {
      bg: '#1DA1F2',
      text: '#ffffff',
      border: '#1DA1F2',
      hover: '#1A91DA',
      focus: '#1DA1F2'
    },
    github: {
      bg: '#24292E',
      text: '#ffffff',
      border: '#24292E',
      hover: '#1F2328',
      focus: '#24292E'
    },
    microsoft: {
      bg: '#00A4EF',
      text: '#ffffff',
      border: '#00A4EF',
      hover: '#0098DB',
      focus: '#00A4EF'
    }
  };

  const colors = socialColors[provider] || socialColors.google;

  const buttonStyle = {
    backgroundColor: colors.bg,
    color: colors.text,
    borderColor: colors.border,
    borderWidth: '1px',
    borderStyle: 'solid',
    transition: 'all 0.2s ease-in-out',
  };

  const handleMouseEnter = (e) => {
    e.target.style.backgroundColor = colors.hover;
  };

  const handleMouseLeave = (e) => {
    e.target.style.backgroundColor = colors.bg;
  };

  const handleFocus = (e) => {
    e.target.style.outline = 'none';
    e.target.style.boxShadow = `0 0 0 2px ${colors.focus}40, 0 0 0 4px ${colors.focus}20`;
  };

  const handleBlur = (e) => {
    e.target.style.boxShadow = 'none';
  };

  // Determine the button text based on action
  const getButtonText = () => {
    const actionText = action === 'signup' ? 'Sign up with' : 'Sign in with';
    return loading ? `${actionText} ${config.name}...` : `${actionText} ${config.name}`;
  };

  return (
    <button
      type="button"
      onClick={() => onClick(provider)}
      disabled={disabled || loading}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      style={buttonStyle}
      className={`
        w-full flex items-center justify-center px-4 py-3 rounded-md shadow-sm text-sm font-medium
        disabled:opacity-50 disabled:cursor-not-allowed 
        ${loading ? 'cursor-wait' : 'cursor-pointer'}
        transform hover:scale-[1.02] active:scale-[0.98]
      `}
    >
      {loading ? (
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : (
        <div className="mr-3 flex-shrink-0">
          {IconComponent ? (
            <IconComponent className="w-5 h-5" />
          ) : (
            <span className="text-lg">🔐</span>
          )}
        </div>
      )}
      <span className="font-medium">
        {getButtonText()}
      </span>
    </button>
  );
};

export default SocialLoginButton; 