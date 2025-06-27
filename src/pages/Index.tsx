
import React, { useState } from 'react';
import FamilyRegistration from '../components/FamilyRegistration';
import FamilyDashboard from '../components/FamilyDashboard';
import FamilyTree from '../components/FamilyTree';
import Navigation from '../components/Navigation';

interface FamilyData {
  head: {
    name: string;
    email: string;
    phone: string;
    familyName: string;
  };
  members: Array<{
    id: string;
    name: string;
    relationship: string;
    age: string;
    email: string;
    phone: string;
  }>;
  createdAt: string;
}

const Index = () => {
  const [currentView, setCurrentView] = useState<'registration' | 'dashboard' | 'tree'>('registration');
  const [familyData, setFamilyData] = useState<FamilyData | null>(null);

  const handleRegistrationComplete = (data: FamilyData) => {
    setFamilyData(data);
    setCurrentView('dashboard');
  };

  const handleViewTree = () => {
    setCurrentView('tree');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
  };

  const handleViewChange = (view: 'registration' | 'dashboard' | 'tree') => {
    // Prevent navigation to dashboard/tree without family data
    if ((view === 'dashboard' || view === 'tree') && !familyData) {
      return;
    }
    setCurrentView(view);
  };

  return (
    <div className="min-h-screen">
      {familyData && (
        <div className="sticky top-0 z-50 p-4">
          <div className="max-w-4xl mx-auto">
            <Navigation 
              currentView={currentView}
              onViewChange={handleViewChange}
              familyName={familyData.head.familyName}
            />
          </div>
        </div>
      )}

      {currentView === 'registration' && (
        <FamilyRegistration onComplete={handleRegistrationComplete} />
      )}

      {currentView === 'dashboard' && familyData && (
        <FamilyDashboard 
          familyData={familyData} 
          onViewTree={handleViewTree} 
        />
      )}

      {currentView === 'tree' && familyData && (
        <FamilyTree 
          familyData={familyData} 
          onBack={handleBackToDashboard} 
        />
      )}
    </div>
  );
};

export default Index;
