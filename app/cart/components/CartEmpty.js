import Image from 'next/image';
import Link from 'next/link';

export default function CartEmpty() {
  return (
    <div className="text-center py-12">
      <Image
        src="/cart.png"
        alt="Empty Cart"
        width={120}
        height={120}
        sizes="120px"
        className="mx-auto mb-4 opacity-50"
        style={{ width: 'auto', height: 'auto' }}
      />
      <h3 className="mt-2 text-sm font-medium text-gray-900">Your cart is empty</h3>
      <p className="mt-1 text-sm text-gray-500">
        Start shopping to add items to your cart.
      </p>
      <div className="mt-6">
        <Link
          href="/products"
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-red-700"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
} 