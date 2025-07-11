"use client";

import Head from 'next/head';
import Link from 'next/link';

export default function TermsOfService() {
  const lastUpdated = "December 15, 2024";

  return (
    <>
      <Head>
        <title>Terms of Service - Jonbliss Supermarket</title>
        <meta name="description" content="Read Jonbliss Supermarket's Terms of Service. Understand your rights and obligations when using our services." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        
        {/* Hero Section */}
        <section className="pt-20 pb-16 bg-gradient-to-r from-primary to-red-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Terms of Service</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Please read these terms carefully before using our services.
            </p>
            <p className="text-lg mt-4 opacity-90">Last updated: {lastUpdated}</p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              
              {/* Introduction */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  These Terms of Service (&quot;Terms&quot;) govern your use of Jonbliss Supermarket&apos;s website, mobile application, and services (collectively, the &quot;Services&quot;). By accessing or using our Services, you agree to be bound by these Terms and all applicable laws and regulations.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  If you do not agree with any of these terms, you are prohibited from using or accessing our Services. These Terms apply to all visitors, users, and others who access or use the Services.
                </p>
              </div>

              {/* Definitions */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Definitions</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li><strong>&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;</strong> refers to Jonbliss Supermarket</li>
                  <li><strong>&quot;User,&quot; &quot;you,&quot; or &quot;your&quot;</strong> refers to the individual accessing or using the Services</li>
                  <li><strong>&quot;Services&quot;</strong> refers to our website, mobile application, and all related services</li>
                  <li><strong>&quot;Content&quot;</strong> refers to text, images, videos, and other materials on our Services</li>
                  <li><strong>&quot;Account&quot;</strong> refers to your user account with Jonbliss Supermarket</li>
                </ul>
              </div>

              {/* Use License */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Use License</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Subject to these Terms, we grant you a limited, non-exclusive, non-transferable, and revocable license to use our Services for personal, non-commercial purposes.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  You may not:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                  <li>Use the Services for any unlawful purpose or in violation of these Terms</li>
                  <li>Attempt to gain unauthorized access to our systems or networks</li>
                  <li>Interfere with or disrupt the Services or servers</li>
                  <li>Use automated systems to access the Services without our permission</li>
                  <li>Copy, modify, or distribute our Content without authorization</li>
                  <li>Reverse engineer or attempt to extract source code from our Services</li>
                </ul>
              </div>

              {/* User Accounts */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. User Accounts</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  To access certain features of our Services, you may be required to create an account. You are responsible for:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                  <li>Providing accurate and complete information when creating your account</li>
                  <li>Maintaining the security of your account credentials</li>
                  <li>All activities that occur under your account</li>
                  <li>Notifying us immediately of any unauthorized use of your account</li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  We reserve the right to terminate or suspend your account at any time for violations of these Terms.
                </p>
              </div>

              {/* Orders and Payment */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Orders and Payment</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  When placing orders through our Services:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                  <li>All prices are subject to change without notice</li>
                  <li>Orders are subject to product availability</li>
                  <li>Payment must be made at the time of ordering</li>
                  <li>We accept payment through approved payment methods only</li>
                  <li>Orders may be cancelled or modified subject to our policies</li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  We reserve the right to refuse or cancel any order for any reason, including but not limited to product availability, errors in pricing, or suspected fraud.
                </p>
              </div>

              {/* Delivery and Returns */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Delivery and Returns</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  <strong>Delivery:</strong> Delivery times are estimates only. We are not responsible for delays beyond our control. Risk of loss and title for items pass to you upon delivery.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  <strong>Returns:</strong> Returns are subject to our return policy. Perishable items may have different return conditions. Please contact our customer service for return instructions.
                </p>
              </div>

              {/* Intellectual Property */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Intellectual Property</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The Services and their original content, features, and functionality are owned by Jonbliss Supermarket and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  You may not use our trademarks, service marks, or logos without our prior written consent.
                </p>
              </div>

              {/* User Content */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. User Content</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  You may submit content to our Services (reviews, comments, etc.). By submitting content, you grant us a non-exclusive, royalty-free, perpetual, and worldwide license to use, modify, and distribute your content.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  You represent that your content does not violate any third-party rights and is not unlawful, harmful, or objectionable.
                </p>
              </div>

              {/* Privacy */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Privacy</h2>
                <p className="text-gray-700 leading-relaxed">
                  Your privacy is important to us. Please review our <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>, which also governs your use of the Services, to understand our practices.
                </p>
              </div>

              {/* Disclaimers */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Disclaimers</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  THE SERVICES ARE PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We do not warrant that the Services will be uninterrupted, secure, or error-free, or that defects will be corrected.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Product information, including pricing and availability, is subject to change without notice.
                </p>
              </div>

              {/* Limitation of Liability */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Limitation of Liability</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  IN NO EVENT SHALL JONBLISS SUPERMARKET BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR USE OF THE SERVICES.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  OUR TOTAL LIABILITY TO YOU FOR ANY CLAIMS ARISING FROM THE USE OF THE SERVICES SHALL NOT EXCEED THE AMOUNT PAID BY YOU, IF ANY, FOR ACCESSING THE SERVICES.
                </p>
              </div>

              {/* Indemnification */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Indemnification</h2>
                <p className="text-gray-700 leading-relaxed">
                  You agree to defend, indemnify, and hold harmless Jonbliss Supermarket and its officers, directors, employees, and agents from and against any claims, damages, obligations, losses, liabilities, costs, or debt arising from your use of the Services or violation of these Terms.
                </p>
              </div>

              {/* Governing Law */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Governing Law</h2>
                <p className="text-gray-700 leading-relaxed">
                  These Terms shall be governed by and construed in accordance with the laws of [Your State/Country], without regard to its conflict of law provisions. Any disputes arising from these Terms shall be resolved in the courts of [Your State/Country].
                </p>
              </div>

              {/* Severability */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Severability</h2>
                <p className="text-gray-700 leading-relaxed">
                  If any provision of these Terms is held to be invalid or unenforceable, such provision shall be struck and the remaining provisions shall be enforced to the fullest extent under law.
                </p>
              </div>

              {/* Changes to Terms */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">15. Changes to Terms</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We reserve the right to modify these Terms at any time. We will notify users of any material changes by posting the new Terms on this page and updating the &quot;Last updated&quot; date.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Your continued use of the Services after any changes constitutes acceptance of the new Terms.
                </p>
              </div>

              {/* Contact Information */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">16. Contact Information</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-gray-700 mb-2"><strong>Jonbliss Supermarket</strong></p>
                  <p className="text-gray-700 mb-2">123 Main Street, Downtown District</p>
                  <p className="text-gray-700 mb-2">City, State 12345</p>
                  <p className="text-gray-700 mb-2">Email: legal@jonbliss.com</p>
                  <p className="text-gray-700">Phone: (555) 123-4567</p>
                </div>
              </div>

            </div>
          </div>
        </section>

      </div>
    </>
  );
} 