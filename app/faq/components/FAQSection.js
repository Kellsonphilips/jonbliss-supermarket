import FAQItem from './FAQItem';

export default function FAQSection({ section, openFaq, setOpenFaq, startIndex }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-primary mb-4">{section.title}</h2>
      <div className="space-y-4">
        {section.faqs.map((faq, idx) => {
          const currentIndex = startIndex + idx;
          return (
            <FAQItem
              key={faq.question}
              faq={faq}
              isOpen={openFaq === currentIndex}
              onToggle={() => setOpenFaq(openFaq === currentIndex ? null : currentIndex)}
            />
          );
        })}
      </div>
    </div>
  );
} 