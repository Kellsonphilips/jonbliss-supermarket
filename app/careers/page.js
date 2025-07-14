import Image from 'next/image';
import Link from 'next/link';

const openPositions = [
  {
    title: 'Store Associate',
    type: 'Full-Time',
    location: 'Downtown, City',
    description: 'Deliver excellent customer service, restock shelves, and assist with daily store operations.'
  },
  {
    title: 'Delivery Driver',
    type: 'Part-Time',
    location: 'Citywide',
    description: 'Ensure timely and safe delivery of groceries to our customers. Must have a valid driver’s license.'
  },
  {
    title: 'Customer Support Specialist',
    type: 'Remote',
    location: 'Work from Home',
    description: 'Assist customers with inquiries, returns, and feedback via phone and email.'
  }
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="pt-20 pb-16 relative text-white overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <Image src="/service1.webp" alt="Careers at Jonbliss" fill className="w-full h-full object-cover object-center" priority />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">Careers at Jonbliss</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto drop-shadow-md">
            Join our team and help us deliver quality groceries and exceptional service to our community.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Work With Us?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              At Jonbliss, we believe in teamwork, growth, and making a difference. We offer a supportive environment, opportunities for advancement, and a chance to be part of something meaningful.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Inclusive Culture</h3>
              <p className="text-gray-600">We welcome everyone and celebrate diversity in our team.</p>
            </div>
            <div className="text-center p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Growth Opportunities</h3>
              <p className="text-gray-600">Advance your career with training, mentorship, and promotions from within.</p>
            </div>
            <div className="text-center p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="text-4xl mb-4">🌱</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Make an Impact</h3>
              <p className="text-gray-600">Help us serve our community and make a real difference every day.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Open Positions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We’re always looking for passionate individuals to join our team. See our current openings below.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {openPositions.map((job, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-lg p-8 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-semibold text-primary mb-2">{job.title}</h3>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold">{job.type}</span>
                    <span className="inline-block px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-xs font-semibold">{job.location}</span>
                  </div>
                  <p className="text-gray-700 mb-4">{job.description}</p>
                </div>
                <Link href="/contact" className="mt-4 inline-block px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow hover:bg-orange-600 transition-all duration-300 text-center">Apply Now</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-primary to-orange-500 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Don’t see your dream job?</h2>
          <p className="text-xl mb-8">We’re always interested in meeting talented people. Send us your resume or reach out to discuss future opportunities!</p>
          <Link href="/contact" className="inline-block px-8 py-4 bg-white text-primary font-bold rounded-xl shadow hover:bg-gray-100 transition-all duration-300">Contact HR</Link>
        </div>
      </section>
    </div>
  );
} 
