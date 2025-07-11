export default function ContactMap() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Find Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Visit our store location for the full Jonbliss experience
          </p>
        </div>
        <div className="bg-gray-200 rounded-lg overflow-hidden h-96 flex items-center justify-center relative">
          <iframe
            title="Jonbliss Supermarket Location"
            src="https://www.google.com/maps?q=123+Main+Street,+Downtown+District,+City,+State+12345&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 w-full h-full"
          ></iframe>
          <noscript>
            <div className="text-gray-600 text-center p-8">
              Map could not be loaded. Please enable JavaScript to view the map.
            </div>
          </noscript>
        </div>
        <div className="text-center mt-4 text-sm text-gray-500">
          123 Main Street, Downtown District, City, State 12345
        </div>
      </div>
    </section>
  );
} 