"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, isLoggedIn, changePassword } from '../../../utils/auth';
import AdminSidebar from '../../../components/admin/AdminSidebar';
import AdminHeader from '../../../components/admin/AdminHeader';

export default function AdminProfile() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('account');
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState(null);
  const [passwordSuccess, setPasswordSuccess] = useState(null);
  const [changingPassword, setChangingPassword] = useState(false);
  const router = useRouter();

  // Mock sub-admins data
  const [subAdmins, setSubAdmins] = useState([
    {
      id: 1,
      name: 'John Manager',
      email: 'john.manager@jonbliss.com',
      role: 'sub-admin',
      status: 'active',
      permissions: ['products', 'orders', 'customers'],
      lastLogin: '2024-01-15T10:30:00Z',
      createdAt: '2024-01-01T00:00:00Z'
    },
    {
      id: 2,
      name: 'Sarah Assistant',
      email: 'sarah.assistant@jonbliss.com',
      role: 'sub-admin',
      status: 'inactive',
      permissions: ['products', 'orders'],
      lastLogin: '2024-01-10T14:20:00Z',
      createdAt: '2024-01-05T00:00:00Z'
    },
    {
      id: 3,
      name: 'Mike Supervisor',
      email: 'mike.supervisor@jonbliss.com',
      role: 'sub-admin',
      status: 'active',
      permissions: ['products', 'orders', 'customers', 'categories'],
      lastLogin: '2024-01-15T16:45:00Z',
      createdAt: '2024-01-08T00:00:00Z'
    }
  ]);

  // Mock financial data
  const [financialData] = useState({
    totalRevenue: 2450000,
    monthlyRevenue: 450000,
    totalOrders: 1234,
    averageOrderValue: 1985,
    profitMargin: 0.35,
    expenses: 1592500,
    netProfit: 857500,
    monthlyGrowth: 0.125,
    topProducts: [
      { name: 'Organic Bananas', revenue: 117000, units: 234 },
      { name: 'Fresh Milk', revenue: 94500, units: 189 },
      { name: 'Whole Grain Bread', revenue: 78000, units: 156 }
    ]
  });

  useEffect(() => {
    const checkAuth = () => {
      if (!isLoggedIn()) {
        router.push('/login');
        return;
      }

      const user = getCurrentUser();
      if (!user || user.role !== 'admin') {
        router.push('/');
        return;
      }

      setCurrentUser(user);
      setLoading(false);
    };

    checkAuth();
  }, [router]);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setChangingPassword(true);
    setPasswordError(null);
    setPasswordSuccess(null);

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('New passwords do not match');
      setChangingPassword(false);
      return;
    }

    try {
      await changePassword(passwordData.currentPassword, passwordData.newPassword);
      setPasswordSuccess('Password changed successfully!');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      setPasswordError(error.message);
    } finally {
      setChangingPassword(false);
    }
  };

  const toggleSubAdminStatus = (adminId) => {
    setSubAdmins(prev => prev.map(admin => 
      admin.id === adminId 
        ? { ...admin, status: admin.status === 'active' ? 'inactive' : 'active' }
        : admin
    ));
  };

  const updateSubAdminPermissions = (adminId, permissions) => {
    setSubAdmins(prev => prev.map(admin => 
      admin.id === adminId 
        ? { ...admin, permissions }
        : admin
    ));
  };

  const isMainAdmin = currentUser?.role === 'admin' && currentUser?.email === 'admin@jonbliss.com';

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'account', name: 'Account Information', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    { id: 'password', name: 'Change Password', icon: 'M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z' },
    ...(isMainAdmin ? [
      { id: 'financial', name: 'Financial Statement', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1' },
      { id: 'subadmins', name: 'Sub-Admins Management', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' }
    ] : [])
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      
      <div className="flex-1 lg:ml-64">
        <AdminHeader 
          currentUser={currentUser} 
          onMenuClick={() => setSidebarOpen(true)}
        />
        
        <main className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Admin Profile</h1>
              <p className="mt-2 text-gray-600">
                Manage your account settings and {isMainAdmin ? 'system administration' : 'profile information'}
              </p>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-8">
              <nav className="-mb-px flex space-x-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center ${
                      activeTab === tab.id
                        ? 'border-red-500 text-red-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
                    </svg>
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="bg-white shadow rounded-lg">
              {/* Account Information */}
              {activeTab === 'account' && (
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-6">Account Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        value={currentUser?.name || ''}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        value={currentUser?.email || ''}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                      <input
                        type="text"
                        value={currentUser?.role === 'admin' ? (isMainAdmin ? 'Main Administrator' : 'Sub Administrator') : currentUser?.role}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Account Created</label>
                      <input
                        type="text"
                        value={currentUser?.createdAt ? new Date(currentUser.createdAt).toLocaleDateString() : 'N/A'}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Change Password */}
              {activeTab === 'password' && (
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-6">Change Password</h3>
                  <form onSubmit={handlePasswordChange} className="max-w-md space-y-4">
                    <div>
                      <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-2">
                        Current Password
                      </label>
                      <input
                        type="password"
                        id="currentPassword"
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                        New Password
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      />
                    </div>
                    
                    {passwordError && (
                      <div className="text-red-600 text-sm">{passwordError}</div>
                    )}
                    
                    {passwordSuccess && (
                      <div className="text-green-600 text-sm">{passwordSuccess}</div>
                    )}
                    
                    <button
                      type="submit"
                      disabled={changingPassword}
                      className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50"
                    >
                      {changingPassword ? 'Changing Password...' : 'Change Password'}
                    </button>
                  </form>
                </div>
              )}

              {/* Financial Statement (Main Admin Only) */}
              {activeTab === 'financial' && isMainAdmin && (
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-6">Financial Statement</h3>
                  
                  {/* Financial Overview */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-green-800">Total Revenue</h4>
                      <p className="text-2xl font-bold text-green-900">₦{financialData.totalRevenue.toLocaleString()}</p>
                      <p className="text-sm text-green-600">+{financialData.monthlyGrowth * 100}% this month</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-blue-800">Net Profit</h4>
                      <p className="text-2xl font-bold text-blue-900">₦{financialData.netProfit.toLocaleString()}</p>
                      <p className="text-sm text-blue-600">{financialData.profitMargin * 100}% margin</p>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-yellow-800">Total Orders</h4>
                      <p className="text-2xl font-bold text-yellow-900">{financialData.totalOrders}</p>
                      <p className="text-sm text-yellow-600">₦{financialData.averageOrderValue} avg order</p>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-red-800">Expenses</h4>
                      <p className="text-2xl font-bold text-red-900">₦{financialData.expenses.toLocaleString()}</p>
                      <p className="text-sm text-red-600">Operating costs</p>
                    </div>
                  </div>

                  {/* Top Products */}
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Top Revenue Products</h4>
                    <div className="space-y-3">
                      {financialData.topProducts.map((product, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">{product.name}</p>
                            <p className="text-sm text-gray-500">{product.units} units sold</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-gray-900">₦{product.revenue.toLocaleString()}</p>
                            <p className="text-sm text-gray-500">Revenue</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Sub-Admins Management (Main Admin Only) */}
              {activeTab === 'subadmins' && isMainAdmin && (
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-medium text-gray-900">Sub-Admins Management</h3>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                      Add Sub-Admin
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {subAdmins.map((admin) => (
                      <div key={admin.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h4 className="font-medium text-gray-900">{admin.name}</h4>
                            <p className="text-sm text-gray-500">{admin.email}</p>
                            <p className="text-xs text-gray-400">Last login: {new Date(admin.lastLogin).toLocaleString()}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              admin.status === 'active' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {admin.status}
                            </span>
                            <button
                              onClick={() => toggleSubAdminStatus(admin.id)}
                              className={`px-3 py-1 text-xs font-medium rounded ${
                                admin.status === 'active'
                                  ? 'bg-red-100 text-red-700 hover:bg-red-200'
                                  : 'bg-green-100 text-green-700 hover:bg-green-200'
                              }`}
                            >
                              {admin.status === 'active' ? 'Disable' : 'Enable'}
                            </button>
                          </div>
                        </div>
                        
                        <div>
                          <h5 className="text-sm font-medium text-gray-700 mb-2">Permissions</h5>
                          <div className="flex flex-wrap gap-2">
                            {['products', 'orders', 'customers', 'categories', 'analytics'].map((permission) => (
                              <label key={permission} className="flex items-center">
                                <input
                                  type="checkbox"
                                  checked={admin.permissions.includes(permission)}
                                  onChange={(e) => {
                                    const newPermissions = e.target.checked
                                      ? [...admin.permissions, permission]
                                      : admin.permissions.filter(p => p !== permission);
                                    updateSubAdminPermissions(admin.id, newPermissions);
                                  }}
                                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                                />
                                <span className="ml-2 text-sm text-gray-700 capitalize">{permission}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 