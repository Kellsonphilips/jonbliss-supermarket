export default function OverviewTab() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-6">
        What Are Cookies?
      </h2>
      <div className="space-y-6 text-gray-700 leading-relaxed">
        <p>
          Cookies are small text files that are stored on your
          device (computer, tablet, or mobile phone) when you visit
          our website. They help us provide you with a better
          experience by remembering your preferences, analyzing how
          you use our site, and personalizing content.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          How We Use Cookies
        </h3>
        <p>
          Jonbliss Supermarket uses cookies and similar technologies
          to:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>Remember your preferences and settings</li>
          <li>Keep you signed in to your account</li>
          <li>
            Analyze how our website is used to improve performance
          </li>
          <li>Provide personalized content and recommendations</li>
          <li>Process your orders and payments securely</li>
          <li>Show relevant advertisements</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          Types of Information Collected
        </h3>
        <p>
          Cookies may collect various types of information,
          including:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>Your IP address and device information</li>
          <li>Pages you visit and time spent on each page</li>
          <li>Your preferences and settings</li>
          <li>Items in your shopping cart</li>
          <li>Login and authentication information</li>
        </ul>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h4 className="font-semibold text-blue-900 mb-2">
            Important Note
          </h4>
          <p className="text-blue-800">
            Cookies do not contain personally identifiable
            information unless you have provided it to us. We use
            the information collected through cookies to improve
            your experience and provide better services.
          </p>
        </div>
      </div>
    </div>
  );
} 