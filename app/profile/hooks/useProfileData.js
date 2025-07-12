import { useState, useEffect } from 'react';

export default function useProfileData(user) {
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

  // Update profile data when user changes
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

  return {
    profileData,
    setProfileData,
    billingData,
    setBillingData
  };
} 