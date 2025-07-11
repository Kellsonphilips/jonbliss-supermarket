import Link from 'next/link';

export default function EmptyCart() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-20 pb-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">
              Add some items to your cart before proceeding to checkout.
            </p>
            <Link
              href="/products"
              className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition duration-300"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 