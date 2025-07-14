"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const initialCategories = [
  { id: 1, name: 'Fruits & Vegetables', products: 320, status: 'active', created: '2023-10-01' },
  { id: 2, name: 'Dairy & Eggs', products: 120, status: 'active', created: '2023-10-05' },
  { id: 3, name: 'Bakery', products: 80, status: 'inactive', created: '2023-10-10' },
  { id: 4, name: 'Beverages', products: 150, status: 'active', created: '2023-10-15' },
  { id: 5, name: 'Snacks', products: 60, status: 'active', created: '2023-10-20' },
  { id: 6, name: 'Household', products: 90, status: 'inactive', created: '2023-10-25' },
];

export default function AdminCategories() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState(initialCategories);
  const [modalOpen, setModalOpen] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const [form, setForm] = useState({ name: '', status: 'active' });
  const [formError, setFormError] = useState('');

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusColor = (status) =>
    status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';

  const openAddModal = () => {
    setEditCategory(null);
    setForm({ name: '', status: 'active' });
    setFormError('');
    setModalOpen(true);
  };

  const openEditModal = (category) => {
    setEditCategory(category);
    setForm({ name: category.name, status: category.status });
    setFormError('');
    setModalOpen(true);
  };

  const handleDelete = (category) => {
    if (window.confirm(`Delete category "${category.name}"?`)) {
      setCategories(cats => cats.filter(c => c.id !== category.id));
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setFormError('Category name is required');
      return;
    }
    if (editCategory) {
      setCategories(cats => cats.map(c => c.id === editCategory.id ? { ...c, name: form.name, status: form.status } : c));
    } else {
      const newId = Math.max(...categories.map(c => c.id)) + 1;
      setCategories(cats => [
        ...cats,
        { id: newId, name: form.name, status: form.status, products: 0, created: new Date().toISOString().slice(0, 10) }
      ]);
    }
    setModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 w-full">
      {/* Header */}
      <div className="mb-6 md:mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Categories</h1>
          <p className="text-gray-600">Manage all product categories</p>
        </div>
        <button onClick={openAddModal} className="inline-flex items-center px-2.5 py-1.5 border border-transparent rounded-md shadow-sm text-xs font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 w-auto mt-2 md:mt-0" style={{ alignSelf: 'flex-start' }}>
          + Add Category
        </button>
      </div>
      {/* Filters */}
      <div className="bg-white shadow rounded-lg p-4 md:p-6 mb-6">
        <input
          type="text"
          placeholder="Search by category name"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
        />
      </div>
      {/* Categories Table */}
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <div className="px-4 md:px-6 py-4 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-0">
            <h3 className="text-lg font-medium text-gray-900">
              Categories ({filteredCategories.length})
            </h3>
            <div className="text-sm text-gray-500">
              Showing {filteredCategories.length} of {categories.length} categories
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCategories.map((category) => (
                <tr key={category.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{category.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{category.products}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(category.status)}`}>
                      {category.status.charAt(0).toUpperCase() + category.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(category.created).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button onClick={() => openEditModal(category)} className="text-red-600 hover:text-red-900">Edit</button>
                      <button onClick={() => handleDelete(category)} className="text-gray-600 hover:text-gray-900">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <h3 className="mt-2 text-lg font-semibold text-gray-900">No categories found</h3>
            <p className="mt-1 text-base text-gray-500">
              Sorry, we couldn&apos;t find any categories matching your search.
            </p>
            {search && (
              <p className="mt-2 text-sm text-gray-400">Try a different keyword or check your spelling.</p>
            )}
          </div>
        )}
      </div>
      {/* Modal for Add/Edit Category */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-2">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md mx-auto p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-red-600 text-2xl font-bold focus:outline-none"
              onClick={() => setModalOpen(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">{editCategory ? 'Edit Category' : 'Add Category'}</h2>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              {formError && <div className="text-red-600 text-sm">{formError}</div>}
              <button
                type="submit"
                className="w-full px-4 py-2 bg-red-600 text-white rounded-md font-semibold hover:bg-red-700 transition-all duration-200"
              >
                {editCategory ? 'Update Category' : 'Add Category'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 