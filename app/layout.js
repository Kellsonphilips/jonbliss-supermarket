import './globals.css';
import Navbar from '../components/Navbar';
import { Suspense, lazy } from 'react';

// Lazy load non-critical components
const Footer = lazy(() => import('../components/Footer'));
import ErrorBoundary from '../components/ErrorBoundary';
import { SupermarketProvider } from '../utils/SupermarketContext';
import { CartProvider } from './cart/CartContext';

export default function RootLayout({ children }) {
  // Register service worker
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }

  return (
    <html lang="en">
      <head>
        <title>Jonbliss Supermarket</title>
        <meta name="description" content="Your trusted online supermarket" />
        <meta name="keywords" content="supermarket, groceries, online shopping, Nigeria, Jonbliss, food, delivery, household, fresh produce, best prices" />
        <meta name="author" content="Jonbliss Supermarket" />
        <meta property="og:title" content="Jonbliss Supermarket - Online Grocery Shopping in Nigeria" />
        <meta property="og:description" content="Shop online at Jonbliss Supermarket for fresh groceries, household essentials, and more. Fast delivery, best prices, and a wide selection of products in Nigeria." />
        <meta property="og:image" content="/jonbliss.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://jonbliss.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Jonbliss Supermarket - Online Grocery Shopping in Nigeria" />
        <meta name="twitter:description" content="Shop online at Jonbliss Supermarket for fresh groceries, household essentials, and more. Fast delivery, best prices, and a wide selection of products in Nigeria." />
        <meta name="twitter:image" content="/jonbliss.png" />
        <link rel="icon" href="/jonbliss.png" type="image/png" />
      </head>
      <body>
        <ErrorBoundary>
          <CartProvider>
            <SupermarketProvider>
              <Navbar />
              <main className="pt-24">
                {children}
              </main>
              <Suspense fallback={<div className="h-32 bg-gray-100 animate-pulse"></div>}>
                <Footer />
              </Suspense>
            </SupermarketProvider>
          </CartProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
} 
