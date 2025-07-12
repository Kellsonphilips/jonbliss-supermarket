import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ErrorBoundary from '../components/ErrorBoundary';
import { SupermarketProvider } from '../utils/SupermarketContext';
import { CartProvider } from './cart/CartContext';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ErrorBoundary>
          <CartProvider>
            <SupermarketProvider>
              <Navbar />
              <main className="pt-20">
                {children}
              </main>
              <Footer />
            </SupermarketProvider>
          </CartProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
} 
