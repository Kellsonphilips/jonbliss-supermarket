"use client";

import { useState } from 'react';

export const useCookieTabs = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return {
    activeTab,
    setActiveTab,
  };
}; 