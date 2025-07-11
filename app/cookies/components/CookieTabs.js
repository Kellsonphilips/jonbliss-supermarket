"use client";

export default function CookieTabs({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'types', label: 'Cookie Types' },
    { id: 'controls', label: 'Cookie Controls' }
  ];

  return (
    <div className="flex flex-wrap justify-center mb-8">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`px-6 py-3 mx-2 rounded-lg font-semibold transition-colors ${
            activeTab === tab.id
              ? "bg-primary text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
} 