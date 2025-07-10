"use client";

import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function GDPR() {
  const [activeTab, setActiveTab] = useState('rights');
  const lastUpdated = "December 15, 2024";

  const dataRights = [
    {
      right: "Right of Access",
      description: "You have the right to request access to your personal data and receive information about how we process it.",
      howToExercise: "Submit a request through our Data Subject Rights Portal or contact our DPO directly."
    },
    {
      right: "Right to Rectification",
      description: "You have the right to request correction of inaccurate or incomplete personal data.",
      howToExercise: "Update your information through your account settings or contact us to request corrections."
    },
    {
      right: "Right to Erasure (Right to be Forgotten)",
      description: "You have the right to request deletion of your personal data in certain circumstances.",
      howToExercise: "Submit a deletion request through our portal. Note that some data may be retained for legal obligations."
    },
    {
      right: "Right to Restrict Processing",
      description: "You have the right to request restriction of processing in certain situations.",
      howToExercise: "Contact our DPO to request processing restrictions with valid justification."
    },
    {
      right: "Right to Data Portability",
      description: "You have the right to receive your personal data in a structured, machine-readable format.",
      howToExercise: "Request your data export through our Data Subject Rights Portal."
    },
    {
      right: "Right to Object",
      description: "You have the right to object to processing based on legitimate interests or for direct marketing.",
      howToExercise: "Use the unsubscribe links in our emails or contact us to object to specific processing."
    },
    {
      right: "Rights Related to Automated Decision Making",
      description: "You have the right not to be subject to decisions based solely on automated processing.",
      howToExercise: "Contact our DPO if you believe automated decisions are affecting you."
    }
  ];

  const legalBases = [
    {
      basis: "Consent",
      description: "You have given clear consent for us to process your personal data for specific purposes.",
      examples: ["Marketing communications", "Newsletter subscriptions", "Cookie preferences"]
    },
    {
      basis: "Contract",
      description: "Processing is necessary for the performance of a contract with you.",
      examples: ["Order processing", "Account management", "Customer support"]
    },
    {
      basis: "Legitimate Interests",
      description: "Processing is necessary for our legitimate interests, provided they don't override your rights.",
      examples: ["Website analytics", "Fraud prevention", "Service improvement"]
    },
    {
      basis: "Legal Obligation",
      description: "Processing is necessary for compliance with a legal obligation.",
      examples: ["Tax reporting", "Regulatory compliance", "Legal proceedings"]
    },
    {
      basis: "Vital Interests",
      description: "Processing is necessary to protect someone's life.",
      examples: ["Emergency situations", "Health and safety"]
    },
    {
      basis: "Public Task",
      description: "Processing is necessary for the performance of a task carried out in the public interest.",
      examples: ["Government requests", "Public health measures"]
    }
  ];

  const dataCategories = [
    {
      category: "Identity and Contact Data",
      examples: ["Name, email, phone number, address"],
      purpose: "Account creation, order processing, customer support",
      retention: "7 years after account closure"
    },
    {
      category: "Transaction Data",
      examples: ["Order history, payment information, delivery details"],
      purpose: "Order fulfillment, payment processing, customer service",
      retention: "7 years for tax and legal purposes"
    },
    {
      category: "Technical Data",
      examples: ["IP address, browser type, device information"],
      purpose: "Website functionality, security, analytics",
      retention: "2 years"
    },
    {
      category: "Usage Data",
      examples: ["Pages visited, time spent, preferences"],
      purpose: "Service improvement, personalization, analytics",
      retention: "2 years"
    },
    {
      category: "Marketing Data",
      examples: ["Communication preferences, marketing interactions"],
      purpose: "Marketing communications, personalization",
      retention: "Until consent withdrawal"
    }
  ];

  return (
    <>
      <Head>
        <title>GDPR Compliance - Jonbliss Supermarket</title>
        <meta name="description" content="Learn about Jonbliss Supermarket's GDPR compliance and your data protection rights under EU law." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        
        {/* Hero Section */}
        <section className="pt-20 pb-16 bg-gradient-to-r from-primary to-red-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">GDPR Compliance</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Your data protection rights under the General Data Protection Regulation
            </p>
            <p className="text-lg mt-4 opacity-90">Last updated: {lastUpdated}</p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Navigation Tabs */}
            <div className="flex flex-wrap justify-center mb-8">
              <button
                onClick={() => setActiveTab('rights')}
                className={`px-6 py-3 mx-2 rounded-lg font-semibold transition-colors ${
                  activeTab === 'rights' 
                    ? 'bg-primary text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                Your Rights
              </button>
              <button
                onClick={() => setActiveTab('processing')}
                className={`px-6 py-3 mx-2 rounded-lg font-semibold transition-colors ${
                  activeTab === 'processing' 
                    ? 'bg-primary text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                Data Processing
              </button>
              <button
                onClick={() => setActiveTab('compliance')}
                className={`px-6 py-3 mx-2 rounded-lg font-semibold transition-colors ${
                  activeTab === 'compliance' 
                    ? 'bg-primary text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                Our Compliance
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              
              {/* Your Rights Tab */}
              {activeTab === 'rights' && (
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
              )}

              {/* Data Processing Tab */}
              {activeTab === 'processing' && (
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
              )}

              {/* Our Compliance Tab */}
              {activeTab === 'compliance' && (
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
              )}

            </div>
          </div>
        </section>

      </div>
    </>
  );
} 