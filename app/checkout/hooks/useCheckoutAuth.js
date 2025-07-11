"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isLoggedIn } from '../../../utils/auth';

export const useCheckoutAuth = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Only check authentication on the client side
    const checkAuth = () => {
      const authenticated = isLoggedIn();
      setIsAuthenticated(authenticated);
      
      if (!authenticated) {
        router.push('/login?redirect=/checkout');
      }
      
      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

  return { isAuthenticated, isLoading };
}; 