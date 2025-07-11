import ContactForm from './ContactForm';
import ContactSidebar from './ContactSidebar';

export default function ContactMain() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ContactForm />
          <ContactSidebar />
        </div>
      </div>
    </section>
  );
} 