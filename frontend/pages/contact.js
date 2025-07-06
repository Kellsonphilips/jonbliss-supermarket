import React, { useState } from 'react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      <p className="mb-4">Have a question or need help? Fill out the form below or reach us directly at <a href="mailto:support@jonbliss.com" className="text-primary underline">support@jonbliss.com</a> or call <a href="tel:+1234567890" className="text-primary underline">+1 (234) 567-890</a>.</p>
      <form className="bg-white rounded shadow p-6 space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="contact-name" className="block font-medium mb-1">Name</label>
          <input id="contact-name" name="name" type="text" required className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <div>
          <label htmlFor="contact-email" className="block font-medium mb-1">Email</label>
          <input id="contact-email" name="email" type="email" required className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <div>
          <label htmlFor="contact-message" className="block font-medium mb-1">Message</label>
          <textarea id="contact-message" name="message" required className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary" rows={4}></textarea>
        </div>
        <button type="submit" className="bg-primary text-white px-6 py-2 rounded hover:bg-red-orange transition">Send Message</button>
        {submitted && <div className="text-primary mt-2">Thank you! Your message has been sent.</div>}
      </form>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Our Office</h2>
        <p>123 Market Street, Lagos, Nigeria</p>
        <p>Email: <a href="mailto:support@jonbliss.com" className="text-primary underline">support@jonbliss.com</a></p>
        <p>Phone: <a href="tel:+1234567890" className="text-primary underline">+1 (234) 567-890</a></p>
      </div>
    </div>
  );
} 