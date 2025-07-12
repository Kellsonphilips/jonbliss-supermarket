"use client";

export default function GDPRCompliance() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Our GDPR Compliance Measures</h2>
      <div className="space-y-8">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Organizational Measures</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Data Protection Officer</h4>
              <p className="text-gray-700 mb-3">We have appointed a dedicated Data Protection Officer to oversee our GDPR compliance.</p>
              <p className="text-gray-700 text-sm">Contact: dpo@jonbliss.com</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Employee Training</h4>
              <p className="text-gray-700">All employees receive regular training on data protection principles and GDPR requirements.</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Privacy by Design</h4>
              <p className="text-gray-700">We implement privacy considerations at the design stage of all new products and services.</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Data Protection Impact Assessments</h4>
              <p className="text-gray-700">We conduct DPIAs for high-risk processing activities to identify and mitigate privacy risks.</p>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Technical Measures</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li><strong>Encryption:</strong> All personal data is encrypted in transit and at rest</li>
            <li><strong>Access Controls:</strong> Strict access controls and authentication measures</li>
            <li><strong>Data Minimization:</strong> We only collect and process data that is necessary</li>
            <li><strong>Regular Audits:</strong> Regular security assessments and compliance audits</li>
            <li><strong>Incident Response:</strong> Comprehensive data breach response procedures</li>
          </ul>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Your Rights Implementation</h3>
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Data Subject Rights Portal</h4>
              <p className="text-gray-700 mb-3">Our self-service portal allows you to exercise your rights easily and track your requests.</p>
              <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition duration-300">
                Access Portal
              </button>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Response Timeframes</h4>
              <p className="text-gray-700">We respond to all data subject requests within 30 days, as required by GDPR.</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">No Fee Policy</h4>
              <p className="text-gray-700">We do not charge fees for processing data subject requests, except in cases of manifestly unfounded or excessive requests.</p>
            </div>
          </div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-blue-900 mb-3">Contact Our Data Protection Officer</h3>
          <p className="text-blue-800 mb-4">
            If you have any questions about our GDPR compliance or need to exercise your rights, our Data Protection Officer is here to help.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-blue-800"><strong>Email:</strong> dpo@jonbliss.com</p>
              <p className="text-blue-800"><strong>Phone:</strong> (555) 123-4567</p>
            </div>
            <div>
              <p className="text-blue-800"><strong>Address:</strong></p>
              <p className="text-blue-800">Data Protection Officer</p>
              <p className="text-blue-800">Jonbliss Supermarket</p>
              <p className="text-blue-800">123 Main Street, Downtown District</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 