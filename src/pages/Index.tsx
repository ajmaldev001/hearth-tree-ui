
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
      try {
        const data = JSON.parse(existingData);
        // Validate the data structure before setting
        if (data && data.head && data.head.firstName) {
          setFamilyData(data as FamilyData);
          setCurrentView('dashboard');
        } else {
          // Invalid data structure, start fresh
          setCurrentView('head-registration');
        }
      } catch (error) {
        console.error('Error parsing family data:', error);
        setCurrentView('head-registration');
      }
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

  const autoLinkFamilyMember = (member: FamilyMember, headData: HeadProfile): FamilyMember => {
    // Auto-link based on relationship and phone number
    const linkedMember = {
      ...member,
      // Establish connection to head
      linkedToHead: {
        headId: headData.phoneNumber, // Using phone as unique identifier
        headName: `${headData.firstName} ${headData.lastName}`,
        relationship: member.relationWithHead,
        linkStrength: calculateLinkStrength(member, headData)
      }
    };

    console.log(`Auto-linked ${member.firstName} ${member.lastName} to head ${headData.firstName} ${headData.lastName} as ${member.relationWithHead}`);
    
    return linkedMember;
  };

  const calculateLinkStrength = (member: FamilyMember, headData: HeadProfile): number => {
    let strength = 0;
    
    // Stronger link for direct relationships
    const directRelationships = ['spouse', 'son', 'daughter', 'father', 'mother'];
    if (directRelationships.includes(member.relationWithHead.toLowerCase())) {
      strength += 3;
    }
    
    // Additional strength for shared contact info
    if (member.phoneNumber && member.phoneNumber === headData.phoneNumber) {
      strength += 2;
    }
    
    // Additional strength for same address
    if (member.city === headData.city && member.state === headData.state) {
      strength += 1;
    }
    
    return Math.min(strength, 5); // Cap at 5
  };

  const handleMemberRegistrationComplete = (members: FamilyMember[]) => {
    if (familyData) {
      // Auto-link each member to the head
      const linkedMembers = members.map(member => autoLinkFamilyMember(member, familyData.head));
      
      const updatedFamilyData = {
        ...familyData,
        members: linkedMembers
      };
      setFamilyData(updatedFamilyData);
      setCurrentView('dashboard');
      // Save to localStorage
      localStorage.setItem(`family_${userPhone}`, JSON.stringify(updatedFamilyData));
      
      console.log(`Successfully auto-linked ${linkedMembers.length} family members to head`);
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

  const handleAddMember = () => {
    setCurrentView('member-registration');
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
          onAddMember={handleAddMember}
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
