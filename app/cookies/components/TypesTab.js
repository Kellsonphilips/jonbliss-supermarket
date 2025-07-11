import { cookieTypes } from '../data/cookieTypes';
import { thirdPartyCookies } from '../data/thirdPartyCookies';
import CookieTypeCard from './CookieTypeCard';
import ThirdPartyServiceCard from './ThirdPartyServiceCard';

export default function TypesTab() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-6">
        Types of Cookies We Use
      </h2>

      <div className="space-y-6">
        {cookieTypes.map((cookie, index) => (
          <CookieTypeCard key={index} cookie={cookie} />
        ))}
      </div>

      <div className="mt-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Third-Party Cookies
        </h3>
        <p className="text-gray-700 mb-6">
          We also use third-party services that may set their own
          cookies. These services help us provide better
          functionality and analyze our website performance.
        </p>

        <div className="space-y-4">
          {thirdPartyCookies.map((service, index) => (
            <ThirdPartyServiceCard key={index} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
} 