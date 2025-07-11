import Image from 'next/image';

export default function ContactHero() {
  return (
    <section className="pt-24 pb-16 relative text-white overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <Image 
          src="/contact.jpg" 
          alt="Contact Jonbliss" 
          fill 
          className="w-full h-full object-cover object-center" 
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">Contact Us</h1>
        <p className="text-xl md:text-2xl max-w-3xl mx-auto drop-shadow-md">
          We&apos;d love to hear from you. Get in touch with our team for any questions or assistance.
        </p>
      </div>
    </section>
  );
} 