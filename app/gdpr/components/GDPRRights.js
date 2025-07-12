"use client";

import Link from 'next/link';

export default function GDPRRights({ dataRights }) {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Data Protection Rights</h2>
      <p className="text-gray-700 leading-relaxed mb-8">
        Under the General Data Protection Regulation (GDPR), you have several rights regarding your personal data. We are committed to helping you exercise these rights.
      </p>
      <div className="space-y-6">
        {dataRights.map((right, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">{right.right}</h3>
            <p className="text-gray-700 mb-4">{right.description}</p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">How to Exercise This Right:</h4>
              <p className="text-blue-800">{right.howToExercise}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-green-900 mb-3">Exercise Your Rights</h3>
        <p className="text-green-800 mb-4">
          You can exercise your GDPR rights through our Data Subject Rights Portal or by contacting our Data Protection Officer directly.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300">
            Access Rights Portal
          </button>
          <Link 
            href="/contact" 
            className="border border-green-600 text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition duration-300 text-center"
          >
            Contact DPO
          </Link>
        </div>
      </div>
    </div>
  );
} 