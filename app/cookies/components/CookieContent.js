import OverviewTab from './OverviewTab';
import TypesTab from './TypesTab';
import ControlsTab from './ControlsTab';

export default function CookieContent({ activeTab }) {
  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab />;
      case 'types':
        return <TypesTab />;
      case 'controls':
        return <ControlsTab />;
      default:
        return <OverviewTab />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      {renderTabContent()}
    </div>
  );
} 