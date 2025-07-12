import React from 'react';
import Image from 'next/image';
import { getSocialIcon } from '../../../components/SocialIcons';

export default function ProfileHero({ user }) {
  const getProviderIcon = (provider) => {
    const IconComponent = getSocialIcon(provider);
    if (IconComponent) {
      return <IconComponent className="w-4 h-4" />;
    }
    return <span className="text-lg">🔐</span>;
  };

  return (
    <div className="px-6 py-4 border-b border-gray-200">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
          <span className="text-white text-2xl font-bold">
            {user.name?.charAt(0)?.toUpperCase() || 'U'}
          </span>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-sm text-gray-500">Member since {new Date(user.createdAt).toLocaleDateString()}</p>
          {user.isSocialLogin && (
            <p className="text-sm text-gray-500 flex items-center mt-1">
              <span className="mr-2">{getProviderIcon(user.provider)}</span>
              Signed in with {user.providerName}
            </p>
          )}
        </div>
      </div>
    </div>
  );
} 