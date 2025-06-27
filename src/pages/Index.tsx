
import React, { useState } from 'react';
import SignIn from '../components/Auth/SignIn';
import SignUp from '../components/Auth/SignUp';
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
  const [authView, setAuthView] = useState<'signin' | 'signup'>('signin');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<'registration' | 'dashboard' | 'tree'>('registration');
  const [familyData, setFamilyData] = useState<FamilyData | null>(null);
  const [userPhone, setUserPhone] = useState<string>('');

  const handleSignIn = (phone: string) => {
    setUserPhone(phone);
    setIsAuthenticated(true);
    // Check if user has existing family data
    const existingData = localStorage.getItem(`family_${phone}`);
    if (existingData) {
      setFamilyData(JSON.parse(existingData));
      setCurrentView('dashboard');
    } else {
      setCurrentView('registration');
    }
  };

  const handleSignUp = (userData: any) => {
    setUserPhone(userData.head.phone);
    setFamilyData(userData);
    setIsAuthenticated(true);
    setCurrentView('dashboard');
    // Save to localStorage
    localStorage.setItem(`family_${userData.head.phone}`, JSON.stringify(userData));
  };

  const handleRegistrationComplete = (data: FamilyData) => {
    setFamilyData(data);
    setCurrentView('dashboard');
    // Save to localStorage
    localStorage.setItem(`family_${userPhone}`, JSON.stringify(data));
  };

  const handleViewTree = () => {
    setCurrentView('tree');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
  };

  const handleViewChange = (view: 'registration' | 'dashboard' | 'tree') => {
    if ((view === 'dashboard' || view === 'tree') && !familyData) {
      return;
    }
    setCurrentView(view);
  };

  // Show authentication screens if not authenticated
  if (!isAuthenticated) {
    return (
      <>
        {authView === 'signin' && (
          <SignIn 
            onSignIn={handleSignIn}
            onSwitchToSignUp={() => setAuthView('signup')}
          />
        )}
        {authView === 'signup' && (
          <SignUp 
            onSignUp={handleSignUp}
            onSwitchToSignIn={() => setAuthView('signin')}
          />
        )}
      </>
    );
  }

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
