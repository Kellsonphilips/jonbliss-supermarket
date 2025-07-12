import React, { useState, useEffect } from 'react';
import { updateUserProfile } from '../../../utils/auth';

export default function AccountInfo({ user, onUserUpdate, error, success, onError, onSuccess }) {
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    profile: {
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'Nigeria'
    }
  });

  // Update profileData when user changes
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        profile: {
          phone: user.profile?.phone || '',
          address: user.profile?.address || '',
          city: user.profile?.city || '',
          state: user.profile?.state || '',
          zipCode: user.profile?.zipCode || '',
          country: user.profile?.country || 'Nigeria'
        }
      });
    }
  }, [user]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setProfileData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setProfileData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    if (error) onError(null);
    if (success) onSuccess(null);
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    onError(null);
    onSuccess(null);

    try {
      const updatedUser = await updateUserProfile(profileData);
      onUserUpdate(updatedUser);
      onSuccess('Profile updated successfully!');
      setShowProfileForm(false);
      
      setTimeout(() => onSuccess(''), 3000);
    } catch (error) {
      onError(error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="text-sm font-medium text-gray-900">Account Information</h4>
          <p className="text-sm text-gray-500 mt-1">
            Your saved profile information
          </p>
        </div>
        <button
          onClick={() => setShowProfileForm(!showProfileForm)}
          className="text-primary hover:text-red-orange text-sm font-medium"
        >
          {showProfileForm ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>
      
      {!showProfileForm ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Full Name</p>
            <p className="text-sm text-gray-900 mt-1">{user?.name || 'Not provided'}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Email Address</p>
            <p className="text-sm text-gray-900 mt-1">{user?.email}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Phone Number</p>
            <p className="text-sm text-gray-900 mt-1">{user?.profile?.phone || 'Not provided'}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Country</p>
            <p className="text-sm text-gray-900 mt-1">{user?.profile?.country || 'Not provided'}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Address</p>
            <p className="text-sm text-gray-900 mt-1">
              {user?.profile?.address ? (
                <>
                  {user.profile.address}
                  {user.profile.city && `, ${user.profile.city}`}
                  {user.profile.state && `, ${user.profile.state}`}
                  {user.profile.zipCode && ` ${user.profile.zipCode}`}
                </>
              ) : (
                'Not provided'
              )}
            </p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleProfileSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={profileData.name}
                onChange={handleProfileChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={profileData.email}
                readOnly
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50 text-gray-500 cursor-not-allowed sm:text-sm"
                title="Email address cannot be changed"
              />
              <p className="mt-1 text-xs text-gray-500">
                Email address cannot be changed for security reasons
              </p>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="profile.phone"
                value={profileData.profile.phone}
                onChange={handleProfileChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Enter your phone number"
              />
            </div>

            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                Country
              </label>
              <select
                id="country"
                name="profile.country"
                value={profileData.profile.country}
                onChange={handleProfileChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              >
                <option value="Nigeria">Nigeria</option>
                <option value="Ghana">Ghana</option>
                <option value="Kenya">Kenya</option>
                <option value="South Africa">South Africa</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                id="address"
                name="profile.address"
                value={profileData.profile.address}
                onChange={handleProfileChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Enter your address"
              />
            </div>

            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                id="city"
                name="profile.city"
                value={profileData.profile.city}
                onChange={handleProfileChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Enter your city"
              />
            </div>

            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                State/Province
              </label>
              <input
                type="text"
                id="state"
                name="profile.state"
                value={profileData.profile.state}
                onChange={handleProfileChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Enter your state/province"
              />
            </div>

            <div>
              <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                ZIP/Postal Code
              </label>
              <input
                type="text"
                id="zipCode"
                name="profile.zipCode"
                value={profileData.profile.zipCode}
                onChange={handleProfileChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Enter your ZIP/postal code"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-200">
            <button
              type="submit"
              disabled={saving}
              className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-red-orange focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium text-sm shadow-sm"
            >
              {saving ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Updating...
                </>
              ) : (
                'Update Profile'
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
} 