import CheckoutForm from '../CheckoutForm';
import OrderSummary from '../OrderSummary';

export default function CheckoutLayout({ cartItems, setOrderComplete, setLoading }) {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Checkout Form */}
          <div className="lg:col-span-1">
            <CheckoutForm 
              cartItems={cartItems} 
              setOrderComplete={setOrderComplete} 
              setLoading={setLoading} 
            />
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <OrderSummary cartItems={cartItems} />
          </div>
        </div>
      </div>
    </section>
  );
} 