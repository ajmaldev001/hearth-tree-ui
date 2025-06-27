
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, TreePalm, Heart, Calendar, Phone, Mail, User } from 'lucide-react';

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

const FamilyDashboard = ({ familyData, onViewTree }: { familyData: FamilyData; onViewTree: () => void }) => {
  const totalMembers = familyData.members.length + 1; // +1 for family head
  const relationships = familyData.members.reduce((acc: any, member) => {
    acc[member.relationship] = (acc[member.relationship] || 0) + 1;
    return acc;
  }, {});

  const averageAge = familyData.members.length > 0 
    ? Math.round(familyData.members.reduce((sum, member) => sum + (parseInt(member.age) || 0), 0) / familyData.members.filter(m => m.age).length)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-full shadow-lg">
              <Heart className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            {familyData.head.familyName} Family
          </h1>
          <p className="text-gray-600 text-xl">Welcome to your family dashboard</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-xl border-0 bg-gradient-to-br from-blue-500 to-blue-600 text-white transform hover:scale-105 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Users className="w-12 h-12 mx-auto mb-4 opacity-80" />
              <h3 className="text-3xl font-bold mb-2">{totalMembers}</h3>
              <p className="text-blue-100">Total Members</p>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-0 bg-gradient-to-br from-green-500 to-green-600 text-white transform hover:scale-105 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <TreePalm className="w-12 h-12 mx-auto mb-4 opacity-80" />
              <h3 className="text-3xl font-bold mb-2">{Object.keys(relationships).length}</h3>
              <p className="text-green-100">Relationships</p>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-0 bg-gradient-to-br from-purple-500 to-purple-600 text-white transform hover:scale-105 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Calendar className="w-12 h-12 mx-auto mb-4 opacity-80" />
              <h3 className="text-3xl font-bold mb-2">{averageAge || 'N/A'}</h3>
              <p className="text-purple-100">Avg Age</p>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-0 bg-gradient-to-br from-pink-500 to-pink-600 text-white transform hover:scale-105 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Heart className="w-12 h-12 mx-auto mb-4 opacity-80" />
              <h3 className="text-3xl font-bold mb-2">100%</h3>
              <p className="text-pink-100">Love Index</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Family Head Info */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                Family Head
              </CardTitle>
              <CardDescription className="text-blue-100">
                Primary contact and family leader
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                  <User className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-semibold text-gray-800">{familyData.head.name}</p>
                    <p className="text-sm text-gray-600">Head of Family</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-semibold text-gray-800">{familyData.head.email}</p>
                    <p className="text-sm text-gray-600">Email Address</p>
                  </div>
                </div>
                {familyData.head.phone && (
                  <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                    <Phone className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-semibold text-gray-800">{familyData.head.phone}</p>
                      <p className="text-sm text-gray-600">Phone Number</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Relationship Breakdown */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Family Composition
              </CardTitle>
              <CardDescription className="text-green-100">
                Breakdown of family relationships
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                {Object.entries(relationships).map(([relationship, count]) => (
                  <div key={relationship} className="flex justify-between items-center p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                    <span className="font-medium text-gray-800 capitalize">{relationship}</span>
                    <span className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {count as number}
                    </span>
                  </div>
                ))}
                {Object.keys(relationships).length === 0 && (
                  <p className="text-gray-500 text-center py-4">No family members added yet</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Family Members List */}
        {familyData.members.length > 0 && (
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm mt-8">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Family Members ({familyData.members.length})
              </CardTitle>
              <CardDescription className="text-purple-100">
                All registered family members
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {familyData.members.map((member, index) => (
                  <div 
                    key={member.id} 
                    className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border-2 border-purple-100 transition-all duration-300 hover:shadow-lg hover:scale-105 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{member.name}</h4>
                        <p className="text-sm text-gray-600 capitalize">{member.relationship}</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      {member.age && (
                        <p className="text-gray-600">
                          <span className="font-medium">Age:</span> {member.age}
                        </p>
                      )}
                      {member.email && (
                        <p className="text-gray-600 truncate">
                          <span className="font-medium">Email:</span> {member.email}
                        </p>
                      )}
                      {member.phone && (
                        <p className="text-gray-600">
                          <span className="font-medium">Phone:</span> {member.phone}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Button */}
        <div className="mt-8 text-center">
          <Button 
            onClick={onViewTree}
            size="lg"
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-6 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            <TreePalm className="w-6 h-6 mr-2" />
            View Family Tree
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FamilyDashboard;
