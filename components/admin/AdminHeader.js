"use client";

export default function AdminHeader({ onMenuClick }) {
  return (
    <header className="bg-white shadow-sm border-b sticky top-16 lg:top-20 z-40">
      <div className="flex items-center px-4 py-3">
        {/* Hamburger menu for mobile */}
        <button
          className="lg:hidden mr-3 p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
          onClick={onMenuClick}
          aria-label="Open sidebar"
        >
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
      </div>
    </header>
  );
} 