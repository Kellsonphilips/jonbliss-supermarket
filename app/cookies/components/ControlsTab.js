export default function ControlsTab() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-6">
        Managing Your Cookie Preferences
      </h2>

      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Browser Settings
          </h3>
          <p className="text-gray-700 mb-4">
            You can control and manage cookies through your browser
            settings. Most browsers allow you to:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
            <li>View and delete existing cookies</li>
            <li>Block cookies from specific websites</li>
            <li>Block all cookies</li>
            <li>Set preferences for different types of cookies</li>
          </ul>
          <p className="text-gray-700">
            Please note that disabling certain cookies may affect
            the functionality of our website.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Cookie Consent
          </h3>
          <p className="text-gray-700 mb-4">
            When you first visit our website, you&apos;ll see a
            cookie consent banner that allows you to:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
            <li>Accept all cookies</li>
            <li>Customize your cookie preferences</li>
            <li>Reject non-essential cookies</li>
          </ul>
          <p className="text-gray-700">
            You can change your preferences at any time by clicking
            the &ldquo;Cookie Settings&ldquo; link in our footer.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Opt-Out Options
          </h3>
          <p className="text-gray-700 mb-4">
            For third-party cookies, you can opt out through the
            following methods:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
            <li>
              <strong>Google Analytics:</strong> Use the Google
              Analytics Opt-out Browser Add-on
            </li>
            <li>
              <strong>Facebook:</strong> Adjust your Facebook ad
              preferences
            </li>
            <li>
              <strong>Advertising Networks:</strong> Visit the
              Digital Advertising Alliance website
            </li>
          </ul>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h4 className="font-semibold text-yellow-900 mb-2">
            Important Notice
          </h4>
          <p className="text-yellow-800">
            Disabling essential cookies may prevent our website from
            functioning properly. We recommend keeping essential
            cookies enabled for the best user experience.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Contact Us
          </h3>
          <p className="text-gray-700 mb-4">
            If you have questions about our use of cookies or need
            help managing your preferences, please contact us:
          </p>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700 mb-2">
              Email: privacy@jonbliss.com
            </p>
            <p className="text-gray-700">Phone: (555) 123-4567</p>
          </div>
        </div>
      </div>
    </div>
  );
} 