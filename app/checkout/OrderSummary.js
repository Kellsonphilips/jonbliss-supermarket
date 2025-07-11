import Image from 'next/image';
import { calculateSubtotal, calculateTax, calculateShipping, calculateTotal, formatPrice } from './checkoutUtils';

export default function OrderSummary({ cartItems }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
      {/* Cart Items */}
      <div className="space-y-4 mb-6">
        {cartItems.map((item, index) => (
          <div key={item.id || index} className="flex items-center space-x-4">
            <Image
              src={item.image || '/placeholder-product.jpg'}
              alt={item.name}
              width={60}
              height={60}
              className="rounded-lg object-cover"
            />
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">{item.name}</h4>
              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
            </div>
            <div className="text-right">
              <p className="font-medium text-gray-900">{item.price}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Totals */}
      <div className="border-t border-gray-200 pt-4 space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">{formatPrice(calculateSubtotal(cartItems))}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Tax (7.5%)</span>
          <span className="font-medium">{formatPrice(calculateTax(cartItems))}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium">
            {calculateShipping(cartItems) === 0 ? 'Free' : formatPrice(calculateShipping(cartItems))}
          </span>
        </div>
        <div className="border-t border-gray-200 pt-3">
          <div className="flex justify-between">
            <span className="text-lg font-semibold text-gray-900">Total</span>
            <span className="text-lg font-semibold text-primary">{formatPrice(calculateTotal(cartItems))}</span>
          </div>
        </div>
      </div>
    </div>
  );
} 