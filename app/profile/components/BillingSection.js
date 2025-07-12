import React, { useState, useEffect } from 'react';
import { updateUserProfile } from '../../../utils/auth';

export default function BillingSection({ user, onUserUpdate, error, success, onError, onSuccess }) {
  const [showBillingForm, setShowBillingForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [billingData, setBillingData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
    billingAddress: {
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'Nigeria'
    }
  });

  // Update billingData when user changes
  useEffect(() => {
    if (user) {
      setBillingData({
        cardNumber: user.billing?.cardNumber || '',
        cardHolder: user.billing?.cardHolder || '',
        expiryDate: user.billing?.expiryDate || '',
        cvv: user.billing?.cvv || '',
        billingAddress: {
          address: user.billing?.billingAddress?.address || '',
          city: user.billing?.billingAddress?.city || '',
          state: user.billing?.billingAddress?.state || '',
          zipCode: user.billing?.billingAddress?.zipCode || '',
          country: user.billing?.billingAddress?.country || 'Nigeria'
        }
      });
    }
  }, [user]);

  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setBillingData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setBillingData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    if (error) onError(null);
    if (success) onSuccess(null);
  };

  const handleBillingSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    onError(null);
    onSuccess(null);

    try {
      // Save billing info to user profile
      const updatedUser = await updateUserProfile({
        billing: billingData
      });
      onUserUpdate(updatedUser);
      onSuccess('Billing information updated successfully!');
      setShowBillingForm(false);
      setTimeout(() => onSuccess(''), 3000);
    } catch (error) {
      onError(error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-orange-50 rounded-lg p-6 mt-4 border border-orange-200">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-medium text-orange-900">Billing Information</h4>
          <p className="text-sm text-orange-600 mt-1">
            Manage your payment methods and billing details
          </p>
        </div>
        <button
          onClick={() => setShowBillingForm(!showBillingForm)}
          className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-200"
        >
          {showBillingForm ? 'Cancel' : 'Edit Billing'}
        </button>
      </div>
      
      {!showBillingForm ? (
        <div className="mt-4 pt-4 border-t border-orange-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Card Number</p>
              <p className="text-sm text-gray-900 mt-1">•••• •••• •••• 1234</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Card Holder</p>
              <p className="text-sm text-gray-900 mt-1">{user?.name || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Expiry Date</p>
              <p className="text-sm text-gray-900 mt-1">12/25</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Billing Address</p>
              <p className="text-sm text-gray-900 mt-1">
                {user?.profile?.address ? (
                  <>
                    {user.profile.address}
                    {user.profile.city && `, ${user.profile.city}`}
                    {user.profile.state && `, ${user.profile.state}`}
                  </>
                ) : (
                  'Not provided'
                )}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleBillingSubmit} className="mt-4 pt-4 border-t border-orange-200">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                Card Number
              </label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={billingData.cardNumber}
                onChange={handleBillingChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="1234 5678 9012 3456"
              />
            </div>

            <div>
              <label htmlFor="cardHolder" className="block text-sm font-medium text-gray-700">
                Card Holder Name
              </label>
              <input
                type="text"
                id="cardHolder"
                name="cardHolder"
                value={billingData.cardHolder}
                onChange={handleBillingChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                Expiry Date
              </label>
              <input
                type="text"
                id="expiryDate"
                name="expiryDate"
                value={billingData.expiryDate}
                onChange={handleBillingChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="MM/YY"
              />
            </div>

            <div>
              <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                CVV
              </label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                value={billingData.cvv}
                onChange={handleBillingChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="123"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="billingAddress" className="block text-sm font-medium text-gray-700">
                Billing Address
              </label>
              <input
                type="text"
                id="billingAddress"
                name="billingAddress.address"
                value={billingData.billingAddress.address}
                onChange={handleBillingChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Enter billing address"
              />
            </div>

            <div>
              <label htmlFor="billingCity" className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                id="billingCity"
                name="billingAddress.city"
                value={billingData.billingAddress.city}
                onChange={handleBillingChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Enter city"
              />
            </div>

            <div>
              <label htmlFor="billingState" className="block text-sm font-medium text-gray-700">
                State
              </label>
              <input
                type="text"
                id="billingState"
                name="billingAddress.state"
                value={billingData.billingAddress.state}
                onChange={handleBillingChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Enter state"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={saving}
              className="bg-primary text-white px-6 py-2 rounded-md hover:bg-red-orange focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium text-sm"
            >
              {saving ? 'Updating...' : 'Update Billing'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
} 