import React from 'react';
import { logoutUser } from '../../../utils/auth';
import { useRouter } from 'next/navigation';

export default function LogoutSection() {
  const router = useRouter();

  const handleLogout = () => {
    logoutUser();
    router.push('/login?message=You have been logged out. Please sign in again to access your profile.');
  };

  return (
    <div className="bg-red-50 rounded-lg p-6 mt-4 border border-red-200">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-medium text-red-900">Sign Out</h4>
          <p className="text-sm text-red-600 mt-1">
            Sign out of your account. You will need to sign in again to access your account.
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
} 