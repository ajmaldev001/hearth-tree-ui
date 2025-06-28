import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, TreePalm, Heart, Calendar, Phone, Mail, User, Edit, Trash2, UserPlus, MapPin, Download, Link } from 'lucide-react';
import EditMemberModal from './FamilyManager/EditMemberModal';
import ExportTree from './FamilyTree/ExportTree';
import { toast } from "sonner";
import { FamilyData, FamilyMember } from '../types/family';

interface FamilyDashboardProps {
  familyData: FamilyData;
  onViewTree: () => void;
  onAddMember: () => void;
}

const FamilyDashboard = ({ familyData, onViewTree, onAddMember }: FamilyDashboardProps) => {
  const [editingMember, setEditingMember] = useState<FamilyMember | null>(null);
  const [members, setMembers] = useState<FamilyMember[]>(familyData.members);
  const [showExportModal, setShowExportModal] = useState(false);

  const handleEditMember = (member: FamilyMember) => {
    setEditingMember(member);
  };

  const handleSaveMember = (updatedMember: FamilyMember) => {
    const updatedMembers = members.map(member => 
      member.id === updatedMember.id ? updatedMember : member
    );
    setMembers(updatedMembers);
    
    // Update localStorage
    const updatedFamilyData = { ...familyData, members: updatedMembers };
    localStorage.setItem(`family_${familyData.head.phoneNumber}`, JSON.stringify(updatedFamilyData));
    toast.success("Family member updated successfully");
  };

  const handleDeleteMember = (memberId: string) => {
    const updatedMembers = members.filter(member => member.id !== memberId);
    setMembers(updatedMembers);
    
    // Update localStorage
    const updatedFamilyData = { ...familyData, members: updatedMembers };
    localStorage.setItem(`family_${familyData.head.phoneNumber}`, JSON.stringify(updatedFamilyData));
    
    toast.success("Family member removed successfully");
  };

  const totalMembers = members.length + 1;
  const relationships = members.reduce((acc: any, member) => {
    acc[member.relationWithHead] = (acc[member.relationWithHead] || 0) + 1;
    return acc;
  }, {});

  const averageAge = members.length > 0 
    ? Math.round(members.reduce((sum, member) => sum + (member.age || 0), 0) / members.filter(m => m.age).length)
    : 0;

  const linkedMembersCount = members.filter(member => member.linkedToHead).length;

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
            {familyData.head.firstName} {familyData.head.lastName} Family
          </h1>
          <p className="text-gray-600 text-xl">Welcome to your family dashboard</p>
          {familyData.templeAssociation && (
            <p className="text-lg text-indigo-600 font-medium">
              Associated with: {familyData.templeAssociation}
            </p>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
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

          <Card className="shadow-xl border-0 bg-gradient-to-br from-orange-500 to-orange-600 text-white transform hover:scale-105 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Link className="w-12 h-12 mx-auto mb-4 opacity-80" />
              <h3 className="text-3xl font-bold mb-2">{linkedMembersCount}</h3>
              <p className="text-orange-100">Auto-Linked</p>
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

        {/* Family Head Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                Family Head Details
              </CardTitle>
              <CardDescription className="text-blue-100">
                Complete profile information
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                    <User className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-semibold text-gray-800">
                        {familyData.head.firstName} {familyData.head.middleName} {familyData.head.lastName}
                      </p>
                      <p className="text-sm text-gray-600">Full Name</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                    <Mail className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-semibold text-gray-800">{familyData.head.email}</p>
                      <p className="text-sm text-gray-600">Email Address</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                    <Phone className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-semibold text-gray-800">{familyData.head.phoneNumber}</p>
                      <p className="text-sm text-gray-600">Phone Number</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                    <User className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-semibold text-gray-800">{familyData.head.occupation}</p>
                      <p className="text-sm text-gray-600">Occupation</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                    <Users className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-semibold text-gray-800">{familyData.head.samajName}</p>
                      <p className="text-sm text-gray-600">Samaj</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                    <MapPin className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-semibold text-gray-800">
                        {familyData.head.city}, {familyData.head.state}
                      </p>
                      <p className="text-sm text-gray-600">Current Location</p>
                    </div>
                  </div>
                </div>
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

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <Button 
            onClick={onViewTree}
            size="lg"
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-6 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            <TreePalm className="w-6 h-6 mr-2" />
            View Family Tree
          </Button>

          <Button 
            onClick={onAddMember}
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            <UserPlus className="w-6 h-6 mr-2" />
            Add Family Member
          </Button>

          <Button 
            onClick={() => setShowExportModal(true)}
            size="lg"
            variant="outline"
            className="px-8 py-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <Download className="w-6 h-6 mr-2" />
            Export Tree
          </Button>
        </div>

        {/* Family Members List with Edit/Delete and Auto-Link Info */}
        {members.length > 0 && (
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Family Members ({members.length})
                </div>
                <Button
                  onClick={onAddMember}
                  size="sm"
                  className="bg-white/20 hover:bg-white/30 text-white"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add Member
                </Button>
              </CardTitle>
              <CardDescription className="text-purple-100">
                Manage your family members with auto-linking information
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {members.map((member, index) => (
                  <div 
                    key={member.id} 
                    className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border-2 border-purple-100 transition-all duration-300 hover:shadow-lg group animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">
                            {member.firstName} {member.lastName}
                          </h4>
                          <p className="text-sm text-gray-600 capitalize">{member.relationWithHead}</p>
                        </div>
                      </div>
                      <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="w-8 h-8 p-0 hover:bg-blue-100"
                          onClick={() => handleEditMember(member)}
                        >
                          <Edit className="w-4 h-4 text-blue-600" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="w-8 h-8 p-0 hover:bg-red-100"
                          onClick={() => handleDeleteMember(member.id)}
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <p className="text-gray-600">
                        <span className="font-medium">Age:</span> {member.age}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Occupation:</span> {member.occupation}
                      </p>
                      {member.phoneNumber && (
                        <p className="text-gray-600">
                          <span className="font-medium">Phone:</span> {member.phoneNumber}
                        </p>
                      )}
                      {member.email && (
                        <p className="text-gray-600 truncate">
                          <span className="font-medium">Email:</span> {member.email}
                        </p>
                      )}
                      <p className="text-gray-600">
                        <span className="font-medium">Location:</span> {member.city}, {member.state}
                      </p>
                      {member.linkedToHead && (
                        <div className="mt-3 p-2 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border border-orange-200">
                          <div className="flex items-center space-x-2">
                            <Link className="w-4 h-4 text-orange-600" />
                            <span className="text-xs font-medium text-orange-800">Auto-Linked</span>
                          </div>
                          <p className="text-xs text-orange-700 mt-1">
                            Link Strength: {member.linkedToHead.linkStrength}/5
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Export Modal */}
        {showExportModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <ExportTree familyData={{...familyData, members}} />
              <div className="mt-4 text-center">
                <Button onClick={() => setShowExportModal(false)} variant="outline">
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Member Modal */}
        {editingMember && (
          <EditMemberModal
            member={editingMember}
            onSave={handleSaveMember}
            onClose={() => setEditingMember(null)}
          />
        )}
      </div>
    </div>
  );
};

export default FamilyDashboard;
