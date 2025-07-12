"use client";

import { useProfile } from './hooks';
import { ProfileHero, ProfileContent } from './components';

export default function Profile() {
  const {
    user,
    loading,
    error,
    success,
    orders,
    savedItems,
    updateUser,
    handleError,
    handleSuccess
  } = useProfile();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <ProfileHero user={user} />
          <ProfileContent
            user={user}
            orders={orders}
            savedItems={savedItems}
            error={error}
            success={success}
            onUserUpdate={updateUser}
            onError={handleError}
            onSuccess={handleSuccess}
          />
        </div>
      </div>
    </div>
  );
}
