export default function CookieTypeCard({ cookie }) {
  return (
    <div className="border border-gray-200 rounded-lg p-6">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-900">
          {cookie.name}
        </h3>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            cookie.canDisable
              ? "bg-yellow-100 text-yellow-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {cookie.canDisable ? "Optional" : "Essential"}
        </span>
      </div>
      <p className="text-gray-700 mb-4">
        {cookie.description}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">
            Examples:
          </h4>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {cookie.examples.map((example, idx) => (
              <li key={idx}>{example}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">
            Duration:
          </h4>
          <p className="text-gray-700">{cookie.duration}</p>
        </div>
      </div>
    </div>
  );
} 