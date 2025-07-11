"use client";

import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function CookiePolicy() {
  const [activeTab, setActiveTab] = useState('overview');
  const lastUpdated = "December 15, 2024";

  const cookieTypes = [
    {
      name: "Essential Cookies",
      description: "These cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas of the website.",
      examples: ["Authentication cookies", "Shopping cart cookies", "Security cookies"],
      duration: "Session or up to 1 year",
      canDisable: false
    },
    {
      name: "Performance Cookies",
      description: "These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.",
      examples: ["Google Analytics", "Page load time tracking", "Error tracking"],
      duration: "Up to 2 years",
      canDisable: true
    },
    {
      name: "Functional Cookies",
      description: "These cookies enable enhanced functionality and personalization, such as remembering your preferences and settings.",
      examples: ["Language preferences", "Region settings", "User interface preferences"],
      duration: "Up to 1 year",
      canDisable: true
    },
    {
      name: "Marketing Cookies",
      description: "These cookies are used to track visitors across websites to display relevant and engaging advertisements.",
      examples: ["Social media cookies", "Advertising network cookies", "Retargeting cookies"],
      duration: "Up to 2 years",
      canDisable: true
    }
  ];

  const thirdPartyCookies = [
    {
      name: "Google Analytics",
      purpose: "Website analytics and performance monitoring",
      dataCollected: "Usage data, device information, location data",
      privacyPolicy: "https://policies.google.com/privacy"
    },
    {
      name: "Facebook Pixel",
      purpose: "Advertising and conversion tracking",
      dataCollected: "User behavior, conversion events",
      privacyPolicy: "https://www.facebook.com/policy.php"
    },
    {
      name: "Stripe",
      purpose: "Payment processing",
      dataCollected: "Payment information, transaction data",
      privacyPolicy: "https://stripe.com/privacy"
    }
  ];

  return (
    <>
      <Head>
        <title>Cookie Policy - Jonbliss Supermarket</title>
        <meta
          name="description"
          content="Learn about how Jonbliss Supermarket uses cookies and similar technologies to enhance your browsing experience."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="pt-20 pb-16 bg-gradient-to-r from-primary to-red-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Cookie Policy
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Understanding how we use cookies to improve your experience
            </p>
            <p className="text-lg mt-4 opacity-90">
              Last updated: {lastUpdated}
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Navigation Tabs */}
            <div className="flex flex-wrap justify-center mb-8">
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-6 py-3 mx-2 rounded-lg font-semibold transition-colors ${
                  activeTab === "overview"
                    ? "bg-primary text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("types")}
                className={`px-6 py-3 mx-2 rounded-lg font-semibold transition-colors ${
                  activeTab === "types"
                    ? "bg-primary text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                Cookie Types
              </button>
              <button
                onClick={() => setActiveTab("controls")}
                className={`px-6 py-3 mx-2 rounded-lg font-semibold transition-colors ${
                  activeTab === "controls"
                    ? "bg-primary text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                Cookie Controls
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              {/* Overview Tab */}
              {activeTab === "overview" && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    What Are Cookies?
                  </h2>
                  <div className="space-y-6 text-gray-700 leading-relaxed">
                    <p>
                      Cookies are small text files that are stored on your
                      device (computer, tablet, or mobile phone) when you visit
                      our website. They help us provide you with a better
                      experience by remembering your preferences, analyzing how
                      you use our site, and personalizing content.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      How We Use Cookies
                    </h3>
                    <p>
                      Jonbliss Supermarket uses cookies and similar technologies
                      to:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                      <li>Remember your preferences and settings</li>
                      <li>Keep you signed in to your account</li>
                      <li>
                        Analyze how our website is used to improve performance
                      </li>
                      <li>Provide personalized content and recommendations</li>
                      <li>Process your orders and payments securely</li>
                      <li>Show relevant advertisements</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      Types of Information Collected
                    </h3>
                    <p>
                      Cookies may collect various types of information,
                      including:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                      <li>Your IP address and device information</li>
                      <li>Pages you visit and time spent on each page</li>
                      <li>Your preferences and settings</li>
                      <li>Items in your shopping cart</li>
                      <li>Login and authentication information</li>
                    </ul>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <h4 className="font-semibold text-blue-900 mb-2">
                        Important Note
                      </h4>
                      <p className="text-blue-800">
                        Cookies do not contain personally identifiable
                        information unless you have provided it to us. We use
                        the information collected through cookies to improve
                        your experience and provide better services.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Cookie Types Tab */}
              {activeTab === "types" && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    Types of Cookies We Use
                  </h2>

                  <div className="space-y-6">
                    {cookieTypes.map((cookie, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-lg p-6"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <h3 className="text-xl font-semibold text-gray-900">
                            {cookie.name}
                          </h3>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              cookie.canDisable
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {cookie.canDisable ? "Optional" : "Essential"}
                          </span>
                        </div>
                        <p className="text-gray-700 mb-4">
                          {cookie.description}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">
                              Examples:
                            </h4>
                            <ul className="list-disc list-inside text-gray-700 space-y-1">
                              {cookie.examples.map((example, idx) => (
                                <li key={idx}>{example}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">
                              Duration:
                            </h4>
                            <p className="text-gray-700">{cookie.duration}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      Third-Party Cookies
                    </h3>
                    <p className="text-gray-700 mb-6">
                      We also use third-party services that may set their own
                      cookies. These services help us provide better
                      functionality and analyze our website performance.
                    </p>

                    <div className="space-y-4">
                      {thirdPartyCookies.map((service, index) => (
                        <div
                          key={index}
                          className="border border-gray-200 rounded-lg p-4"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-semibold text-gray-900">
                              {service.name}
                            </h4>
                            <Link
                              href={service.privacyPolicy}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline text-sm"
                            >
                              Privacy Policy
                            </Link>
                          </div>
                          <p className="text-gray-700 mb-2">
                            <strong>Purpose:</strong> {service.purpose}
                          </p>
                          <p className="text-gray-700 text-sm">
                            <strong>Data Collected:</strong>{" "}
                            {service.dataCollected}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Cookie Controls Tab */}
              {activeTab === "controls" && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    Managing Your Cookie Preferences
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        Browser Settings
                      </h3>
                      <p className="text-gray-700 mb-4">
                        You can control and manage cookies through your browser
                        settings. Most browsers allow you to:
                      </p>
                      <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                        <li>View and delete existing cookies</li>
                        <li>Block cookies from specific websites</li>
                        <li>Block all cookies</li>
                        <li>Set preferences for different types of cookies</li>
                      </ul>
                      <p className="text-gray-700">
                        Please note that disabling certain cookies may affect
                        the functionality of our website.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        Cookie Consent
                      </h3>
                      <p className="text-gray-700 mb-4">
                        When you first visit our website, you&apos;ll see a
                        cookie consent banner that allows you to:
                      </p>
                      <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                        <li>Accept all cookies</li>
                        <li>Customize your cookie preferences</li>
                        <li>Reject non-essential cookies</li>
                      </ul>
                      <p className="text-gray-700">
                        You can change your preferences at any time by clicking
                        the &ldquo;Cookie Settings&ldquo; link in our footer.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        Opt-Out Options
                      </h3>
                      <p className="text-gray-700 mb-4">
                        For third-party cookies, you can opt out through the
                        following methods:
                      </p>
                      <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                        <li>
                          <strong>Google Analytics:</strong> Use the Google
                          Analytics Opt-out Browser Add-on
                        </li>
                        <li>
                          <strong>Facebook:</strong> Adjust your Facebook ad
                          preferences
                        </li>
                        <li>
                          <strong>Advertising Networks:</strong> Visit the
                          Digital Advertising Alliance website
                        </li>
                      </ul>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                      <h4 className="font-semibold text-yellow-900 mb-2">
                        Important Notice
                      </h4>
                      <p className="text-yellow-800">
                        Disabling essential cookies may prevent our website from
                        functioning properly. We recommend keeping essential
                        cookies enabled for the best user experience.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        Contact Us
                      </h3>
                      <p className="text-gray-700 mb-4">
                        If you have questions about our use of cookies or need
                        help managing your preferences, please contact us:
                      </p>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-gray-700 mb-2">
                          Email: privacy@jonbliss.com
                        </p>
                        <p className="text-gray-700">Phone: (555) 123-4567</p>
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