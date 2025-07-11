import Link from 'next/link';

export default function ContactCTA() {
  return (
    <div className="mt-12 p-6 bg-gray-50 rounded-lg text-center">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        Still have questions?
      </h3>
      <p className="text-gray-600 mb-6">
        Our customer service team is here to help you with any questions or concerns.
      </p>
      <Link
        href="/contact"
        className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition duration-300"
      >
        Contact Us
      </Link>
    </div>
  );
} 