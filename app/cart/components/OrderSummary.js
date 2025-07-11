import Link from 'next/link';
import { formatPrice } from '../cartUtils';

export default function OrderSummary({ subtotal, tax, total, clearCart }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Tax (7.5%)</span>
          <span className="font-medium">{formatPrice(tax)}</span>
        </div>
        <div className="border-t border-gray-200 pt-3">
          <div className="flex justify-between">
            <span className="text-lg font-semibold text-gray-900">Total</span>
            <span className="text-lg font-semibold text-primary">{formatPrice(total)}</span>
          </div>
        </div>
      </div>
      <div className="mt-6 space-y-3">
        <Link
          href="/checkout"
          className="w-full bg-primary text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-700 transition duration-300 text-center block"
        >
          Proceed to Checkout
        </Link>
        <Link
          href="/products"
          className="w-full bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-300 transition duration-300 text-center block"
        >
          Continue Shopping
        </Link>
        <button
          onClick={clearCart}
          className="w-full text-red-600 hover:text-red-800 text-sm font-medium mt-2"
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
} 