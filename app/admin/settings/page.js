"use client"

import React, { useState } from 'react';

export default function AdminSettings() {
  // Mock state for settings
  const [account, setAccount] = useState({ name: 'Admin User', email: 'admin@jonbliss.com', password: '' });
  const [store, setStore] = useState({ name: 'Jonbliss Supermarket', email: 'contact@jonbliss.com', address: '123 Market St, Lagos' });
  const [notifications, setNotifications] = useState({ email: true, sms: false, push: true });
  const [showPassword, setShowPassword] = useState(false);

  const handleAccountChange = e => setAccount({ ...account, [e.target.name]: e.target.value });
  const handleStoreChange = e => setStore({ ...store, [e.target.name]: e.target.value });
  const handleNotificationsChange = e => setNotifications({ ...notifications, [e.target.name]: e.target.checked });

  const handleAccountSave = e => { e.preventDefault(); alert('Account settings saved!'); };
  const handleStoreSave = e => { e.preventDefault(); alert('Store settings saved!'); };
  const handleDeleteAccount = () => { if (window.confirm('Are you sure? This cannot be undone.')) alert('Account deleted!'); };

  return (
    <div className="py-4 w-full">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Manage your account, store, and notification preferences.</p>
        </div>

        {/* Account Settings */}
        <form onSubmit={handleAccountSave} className="bg-white rounded-lg shadow p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Account Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input name="name" value={account.name} onChange={handleAccountChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input name="email" type="email" value={account.email} onChange={handleAccountChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <div className="flex items-center">
                <input name="password" type={showPassword ? 'text' : 'password'} value={account.password} onChange={handleAccountChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500" />
                <button type="button" onClick={() => setShowPassword(v => !v)} className="ml-2 text-xs text-gray-500 hover:text-gray-700">{showPassword ? 'Hide' : 'Show'}</button>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button type="submit" className="px-4 py-2 bg-red-600 text-white rounded-md font-medium hover:bg-red-700">Save</button>
          </div>
        </form>

        {/* Store Settings */}
        <form onSubmit={handleStoreSave} className="bg-white rounded-lg shadow p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Store Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Store Name</label>
              <input name="name" value={store.name} onChange={handleStoreChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
              <input name="email" type="email" value={store.email} onChange={handleStoreChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Store Address</label>
              <input name="address" value={store.address} onChange={handleStoreChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500" />
            </div>
          </div>
          <div className="flex justify-end">
            <button type="submit" className="px-4 py-2 bg-red-600 text-white rounded-md font-medium hover:bg-red-700">Save</button>
          </div>
        </form>

        {/* Notification Preferences */}
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Notification Preferences</h2>
          <div className="space-y-3">
            <label className="flex items-center">
              <input type="checkbox" name="email" checked={notifications.email} onChange={handleNotificationsChange} className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded" />
              <span className="ml-2 text-sm text-gray-700">Email Notifications</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" name="sms" checked={notifications.sms} onChange={handleNotificationsChange} className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded" />
              <span className="ml-2 text-sm text-gray-700">SMS Notifications</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" name="push" checked={notifications.push} onChange={handleNotificationsChange} className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded" />
              <span className="ml-2 text-sm text-gray-700">Push Notifications</span>
            </label>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-red-600 mb-2">Danger Zone</h2>
          <p className="text-sm text-gray-600 mb-4">Delete your admin account. This action cannot be undone.</p>
          {account.email === 'admin@jonbliss.com' ? (
            <button onClick={handleDeleteAccount} className="px-4 py-2 bg-red-100 text-red-700 rounded-md font-medium hover:bg-red-200">Delete Account</button>
          ) : (
            <p className="text-xs text-gray-400">Only the main admin can delete this account.</p>
          )}
        </div>
      </div>
    </div>
  );
} 