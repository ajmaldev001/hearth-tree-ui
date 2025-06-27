
import React from 'react';
import { Button } from "@/components/ui/button";
import { TreePalm, Users, Heart, LayoutDashboard } from 'lucide-react';

interface NavigationProps {
  currentView: 'registration' | 'dashboard' | 'tree';
  onViewChange: (view: 'registration' | 'dashboard' | 'tree') => void;
  familyName?: string;
}

const Navigation = ({ currentView, onViewChange, familyName }: NavigationProps) => {
  const navItems = [
    { id: 'registration', label: 'Registration', icon: Users },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'tree', label: 'Family Tree', icon: TreePalm }
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-sm shadow-lg rounded-full px-6 py-3 mb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Heart className="w-6 h-6 text-red-500" />
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {familyName ? `${familyName} Family` : 'Family Manager'}
          </span>
        </div>
        
        <div className="flex space-x-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                onClick={() => onViewChange(item.id as any)}
                className={`
                  rounded-full transition-all duration-300 transform hover:scale-105
                  ${isActive 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                    : 'text-gray-600 hover:text-gray-800'
                  }
                `}
              >
                <Icon className="w-4 h-4 mr-2" />
                {item.label}
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
