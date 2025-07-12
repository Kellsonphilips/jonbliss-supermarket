import React, { useState, useEffect } from 'react';
import { changePassword, logoutUser } from '../../../utils/auth';
import { useRouter } from 'next/navigation';

export default function PasswordSection({ error, success, onError, onSuccess }) {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, label: '', color: 'gray' });
  const router = useRouter();

  // Password strength checker
  const checkPasswordStrength = (password) => {
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

  useEffect(() => {
    setPasswordStrength(checkPasswordStrength(passwordData.newPassword));
  }, [passwordData.newPassword]);

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) onError(null);
    if (success) onSuccess(null);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    onError(null);
    onSuccess(null);

    try {
      await changePassword(passwordData.currentPassword, passwordData.newPassword);
      onSuccess('Password changed successfully! You will be logged out.');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setShowPasswordForm(false);
      // Logout after short delay
      setTimeout(() => {
        logoutUser();
        router.push('/login?message=Password changed successfully! Please log in again.');
      }, 2000);
      setTimeout(() => onSuccess(''), 3000);
    } catch (error) {
      onError(error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-blue-50 rounded-lg p-6 mt-4 border border-blue-200">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-medium text-blue-900">Change Password</h4>
          <p className="text-sm text-blue-600 mt-1">
            Update your account password for enhanced security
          </p>
        </div>
        <button
          onClick={() => setShowPasswordForm(!showPasswordForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          {showPasswordForm ? 'Cancel' : 'Change Password'}
        </button>
      </div>
      
      {showPasswordForm && (
        <div className="mt-4 pt-4 border-t border-blue-200">
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                Current Password
              </label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              />
              {/* Password Strength Meter */}
              {passwordData.newPassword && (
                <div className="mt-2">
                  <div className={`h-2 rounded transition-all duration-300 bg-${passwordStrength.color}-400`} style={{ width: `${passwordStrength.score * 20}%` }}></div>
                  <span className={`text-xs font-medium text-${passwordStrength.color}-600 mt-1 block`}>
                    Strength: {passwordStrength.label}
                  </span>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              />
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={saving}
                className="bg-primary text-white px-6 py-2 rounded-md hover:bg-red-orange focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium text-sm"
              >
                {saving ? 'Changing Password...' : 'Update Password'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
} 