import { businessHours } from '../data/businessHours';

export default function BusinessHours() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Business Hours</h3>
      <div className="space-y-4">
        {businessHours.map((schedule, index) => (
          <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
            <span className="font-medium text-gray-900">{schedule.day}</span>
            <span className="text-gray-600">{schedule.hours}</span>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-sm text-yellow-800">
          <strong>Holiday Hours:</strong> We may have modified hours during holidays. 
          Please call ahead to confirm.
        </p>
      </div>
    </div>
  );
} 