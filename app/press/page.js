import Image from 'next/image';
import Link from 'next/link';

const pressReleases = [
  {
    title: 'Jonbliss Supermarket Launches Same-Day Delivery Service',
    date: '2024-04-10',
    summary: 'Jonbliss now offers same-day delivery across the city, making grocery shopping more convenient than ever.',
    link: '#'
  },
  {
    title: 'Jonbliss Partners with Local Farmers for Fresh Produce',
    date: '2024-02-22',
    summary: 'Our new partnership brings farm-fresh fruits and vegetables directly to our customers.',
    link: '#'
  },
  {
    title: 'Jonbliss Supermarket Wins Customer Service Award',
    date: '2023-12-15',
    summary: 'We are honored to be recognized for our commitment to exceptional customer service.',
    link: '#'
  }
];

export default function PressPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="pt-20 pb-16 relative text-white overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <Image src="/exceptional-service.jpg" alt="Press at Jonbliss" fill className="w-full h-full object-cover object-center" priority />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">Press & News</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto drop-shadow-md">
            The latest news, press releases, and media resources from Jonbliss Supermarket.
          </p>
        </div>
      </section>

      {/* Recent Press Releases */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Recent Press Releases</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Stay up to date with our latest announcements and achievements.
            </p>
          </div>
          <div className="space-y-8">
            {pressReleases.map((press, idx) => (
              <div key={idx} className="bg-gray-50 rounded-xl shadow p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-2xl font-semibold text-primary mb-2">{press.title}</h3>
                  <p className="text-gray-600 mb-2">{press.summary}</p>
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold mb-2">{new Date(press.date).toLocaleDateString()}</span>
                </div>
                <div className="mt-4 md:mt-0 md:ml-8">
                  <Link href={press.link} className="inline-block px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow hover:bg-orange-600 transition-all duration-300 text-center">Read More</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Contact Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Media Contact</h2>
          <p className="text-gray-600 mb-6">For press inquiries, interviews, or media resources, please contact our communications team:</p>
          <div className="bg-white rounded-xl shadow-lg p-8 inline-block">
            <p className="text-lg font-semibold text-primary mb-2">Jane Doe</p>
            <p className="text-gray-700 mb-1">Head of Communications</p>
            <p className="text-gray-700 mb-1">Email: <a href="mailto:press@jonbliss.com" className="text-primary hover:underline">press@jonbliss.com</a></p>
            <p className="text-gray-700">Phone: (555) 123-9876</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-primary to-orange-500 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Looking to feature Jonbliss?</h2>
          <p className="text-xl mb-8">We’re happy to provide interviews, images, and more. Reach out to our media team for all press needs.</p>
          <a href="mailto:press@jonbliss.com" className="inline-block px-8 py-4 bg-white text-primary font-bold rounded-xl shadow hover:bg-gray-100 transition-all duration-300">Contact Media Team</a>
        </div>
      </section>
    </div>
  );
} 