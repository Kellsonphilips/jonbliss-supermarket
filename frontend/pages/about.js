import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function About() {
  return (
    <>
      <Head>
        <title>About Us - Jonbliss Supermarket</title>
        <meta name="description" content="Learn more about Jonbliss Supermarket - your trusted destination for quality products" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">About Jonbliss</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your trusted destination for quality groceries, household items, and more. 
              We're committed to providing fresh products, competitive prices, and exceptional service.
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600">
                To provide our customers with the highest quality products at competitive prices, 
                while delivering exceptional service and convenience through our online platform.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600">
                To become the leading online supermarket, known for quality, reliability, 
                and customer satisfaction across Nigeria and beyond.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality</h3>
                <p className="text-gray-600">
                  We never compromise on quality. Every product in our inventory meets our high standards.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Customer First</h3>
                <p className="text-gray-600">
                  Our customers are at the heart of everything we do. We strive to exceed their expectations.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Innovation</h3>
                <p className="text-gray-600">
                  We continuously innovate to provide better service and shopping experience.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-primary text-white rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Shopping?</h2>
            <p className="text-xl mb-6">
              Join thousands of satisfied customers who trust Jonbliss for their daily needs.
            </p>
            <Link
              href="/products"
              className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors inline-block"
            >
              Browse Our Products
            </Link>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
} 