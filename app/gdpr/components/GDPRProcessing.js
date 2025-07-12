"use client";

export default function GDPRProcessing({ legalBases, dataCategories }) {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-6">How We Process Your Data</h2>
      <div className="space-y-8">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Legal Bases for Processing</h3>
          <p className="text-gray-700 mb-6">
            We process your personal data based on one or more of the following legal grounds:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {legalBases.map((basis, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">{basis.basis}</h4>
                <p className="text-gray-700 mb-3 text-sm">{basis.description}</p>
                <div>
                  <h5 className="font-medium text-gray-900 mb-1">Examples:</h5>
                  <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                    {basis.examples.map((example, idx) => (
                      <li key={idx}>{example}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Categories of Personal Data</h3>
          <div className="space-y-4">
            {dataCategories.map((category, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">{category.category}</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h5 className="font-medium text-gray-900 mb-1">Examples:</h5>
                    <p className="text-gray-700 text-sm">{category.examples}</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900 mb-1">Purpose:</h5>
                    <p className="text-gray-700 text-sm">{category.purpose}</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900 mb-1">Retention:</h5>
                    <p className="text-gray-700 text-sm">{category.retention}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Data Transfers</h3>
          <p className="text-gray-700 mb-4">
            Your personal data may be transferred to and processed in countries outside the European Economic Area (EEA). We ensure that such transfers comply with GDPR requirements through:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Adequacy decisions by the European Commission</li>
            <li>Standard Contractual Clauses (SCCs)</li>
            <li>Binding Corporate Rules (BCRs)</li>
            <li>Other appropriate safeguards</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 