
import React, { useState } from 'react';
import SignIn from '../components/Auth/SignIn';
import SignUp from '../components/Auth/SignUp';
import HeadRegistration from '../components/Registration/HeadRegistration';
import FamilyMemberRegistration from '../components/Registration/FamilyMemberRegistration';
import FamilyDashboard from '../components/FamilyDashboard';
import FamilyTree from '../components/FamilyTree';
import Navigation from '../components/Navigation';
import { HeadProfile, FamilyMember, FamilyData } from '../types/family';

const Index = () => {
  const [authView, setAuthView] = useState<'signin' | 'signup'>('signin');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<'head-registration' | 'member-registration' | 'dashboard' | 'tree'>('head-registration');
  const [familyData, setFamilyData] = useState<FamilyData | null>(null);
  const [userPhone, setUserPhone] = useState<string>('');

  const handleSignIn = (phone: string) => {
    setUserPhone(phone);
    setIsAuthenticated(true);
    // Check if user has existing family data
    const existingData = localStorage.getItem(`family_${phone}`);
    if (existingData) {
      const data = JSON.parse(existingData);
      // Convert old format to new format if needed
      const convertedData: FamilyData = {
        head: data.head.firstName ? data.head : {
          // Convert old format to new format
          firstName: data.head.name?.split(' ')[0] || '',
          lastName: data.head.name?.split(' ').slice(1).join(' ') || '',
          age: 0,
          gender: 'male' as const,
          maritalStatus: 'single' as const,
          occupation: '',
          samajName: '',
          qualification: '',
          birthDate: '',
          bloodGroup: '',
          exactNatureOfDuties: '',
          email: data.head.email || '',
          phoneNumber: data.head.phone || phone,
          streetName: '',
          city: '',
          district: '',
          state: '',
          nativeCity: '',
          nativeState: '',
          country: '',
          pincode: ''
        },
        members: data.members || [],
        createdAt: data.createdAt || new Date().toISOString(),
        templeAssociation: data.templeAssociation || getTempleAssociation('')
      };
      setFamilyData(convertedData);
      setCurrentView('dashboard');
    } else {
      setCurrentView('head-registration');
    }
  };

  const handleSignUp = (phone: string) => {
    setUserPhone(phone);
    setIsAuthenticated(true);
    setCurrentView('head-registration');
  };

  const handleHeadRegistrationComplete = (headData: HeadProfile) => {
    const newFamilyData: FamilyData = {
      head: headData,
      members: [],
      createdAt: new Date().toISOString(),
      templeAssociation: getTempleAssociation(headData.samajName)
    };
    setFamilyData(newFamilyData);
    setCurrentView('member-registration');
    // Save to localStorage
    localStorage.setItem(`family_${userPhone}`, JSON.stringify(newFamilyData));
  };

  const handleMemberRegistrationComplete = (members: FamilyMember[]) => {
    if (familyData) {
      const updatedFamilyData = {
        ...familyData,
        members: members
      };
      setFamilyData(updatedFamilyData);
      setCurrentView('dashboard');
      // Save to localStorage
      localStorage.setItem(`family_${userPhone}`, JSON.stringify(updatedFamilyData));
    }
  };

  const getTempleAssociation = (samajName: string): string => {
    // Auto-associate temples based on Samaj
    const templeMapping: { [key: string]: string } = {
      'Gujarati Samaj': 'Swaminarayan Temple',
      'Marathi Samaj': 'Ganpati Temple',
      'Punjabi Samaj': 'Gurudwara',
      'Tamil Samaj': 'Murugan Temple',
      'Bengali Samaj': 'Kali Temple'
    };
    return templeMapping[samajName] || 'Local Community Temple';
  };

  const handleViewTree = () => {
    setCurrentView('tree');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
  };

  const handleViewChange = (view: 'dashboard' | 'tree' | 'registration') => {
    if ((view === 'dashboard' || view === 'tree') && !familyData) {
      return;
    }
    
    // Map the navigation view to our internal view
    if (view === 'registration') {
      setCurrentView('head-registration');
    } else {
      setCurrentView(view);
    }
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
      {familyData && currentView !== 'head-registration' && currentView !== 'member-registration' && (
        <div className="sticky top-0 z-50 p-4">
          <div className="max-w-4xl mx-auto">
            <Navigation 
              currentView={currentView === 'dashboard' ? 'dashboard' : currentView === 'tree' ? 'tree' : 'registration'}
              onViewChange={handleViewChange}
              familyName={familyData.head.firstName + ' ' + familyData.head.lastName}
            />
          </div>
        </div>
      )}

      {currentView === 'head-registration' && (
        <HeadRegistration onComplete={handleHeadRegistrationComplete} />
      )}

      {currentView === 'member-registration' && (
        <FamilyMemberRegistration 
          onComplete={handleMemberRegistrationComplete}
          headData={familyData?.head}
        />
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
