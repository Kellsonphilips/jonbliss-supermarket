import BusinessHours from './BusinessHours';
import FAQ from './FAQ';

export default function ContactSidebar() {
  return (
    <div className="space-y-8">
      <BusinessHours />
      <FAQ />
    </div>
  );
} 