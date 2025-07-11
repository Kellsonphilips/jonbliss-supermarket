import Link from 'next/link';

export default function ThirdPartyServiceCard({ service }) {
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-semibold text-gray-900">
          {service.name}
        </h4>
        <Link
          href={service.privacyPolicy}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline text-sm"
        >
          Privacy Policy
        </Link>
      </div>
      <p className="text-gray-700 mb-2">
        <strong>Purpose:</strong> {service.purpose}
      </p>
      <p className="text-gray-700 text-sm">
        <strong>Data Collected:</strong>{" "}
        {service.dataCollected}
      </p>
    </div>
  );
} 