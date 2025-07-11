import Image from 'next/image';

export default function CheckoutHero() {
  return (
    <section className="pt-20 pb-16 relative text-white overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <Image 
          src="/exceptional-service.jpg" 
          alt="Checkout Background" 
          fill 
          className="w-full h-full object-cover object-center" 
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Checkout</h1>
        <p className="text-xl md:text-2xl max-w-3xl mx-auto">
          Complete your purchase securely
        </p>
      </div>
    </section>
  );
} 