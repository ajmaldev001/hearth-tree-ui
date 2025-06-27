
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, UserPlus, Heart, ArrowRight } from 'lucide-react';
import { toast } from "sonner";

interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
  age: string;
  email: string;
  phone: string;
}

interface FamilyHead {
  name: string;
  email: string;
  phone: string;
  familyName: string;
}

const FamilyRegistration = ({ onComplete }: { onComplete: (data: any) => void }) => {
  const [familyHead, setFamilyHead] = useState<FamilyHead>({
    name: '',
    email: '',
    phone: '',
    familyName: ''
  });
  
  const [members, setMembers] = useState<FamilyMember[]>([]);
  const [currentMember, setCurrentMember] = useState<FamilyMember>({
    id: '',
    name: '',
    relationship: '',
    age: '',
    email: '',
    phone: ''
  });

  const addMember = () => {
    if (currentMember.name && currentMember.relationship) {
      const newMember = {
        ...currentMember,
        id: Date.now().toString()
      };
      setMembers([...members, newMember]);
      setCurrentMember({
        id: '',
        name: '',
        relationship: '',
        age: '',
        email: '',
        phone: ''
      });
      toast.success("Family member added successfully!");
    } else {
      toast.error("Please fill in required fields");
    }
  };

  const removeMember = (id: string) => {
    setMembers(members.filter(member => member.id !== id));
    toast.success("Family member removed");
  };

  const handleSubmit = () => {
    if (familyHead.name && familyHead.email && familyHead.familyName) {
      const familyData = {
        head: familyHead,
        members: members,
        createdAt: new Date().toISOString()
      };
      onComplete(familyData);
      toast.success("Family registration completed!");
    } else {
      toast.error("Please fill in all required fields for family head");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full">
              <Heart className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Family Registration
          </h1>
          <p className="text-gray-600 text-lg">Create your family profile and connect with your loved ones</p>
        </div>

        <Tabs defaultValue="head" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-white shadow-lg rounded-full p-1">
            <TabsTrigger value="head" className="rounded-full transition-all duration-300">
              <Users className="w-4 h-4 mr-2" />
              Family Head
            </TabsTrigger>
            <TabsTrigger value="members" className="rounded-full transition-all duration-300">
              <UserPlus className="w-4 h-4 mr-2" />
              Family Members
            </TabsTrigger>
          </TabsList>

          <TabsContent value="head" className="animate-fade-in">
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Family Head Information
                </CardTitle>
                <CardDescription className="text-blue-100">
                  Register as the primary contact for your family
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="familyName">Family Name *</Label>
                    <Input
                      id="familyName"
                      placeholder="Enter your family name"
                      value={familyHead.familyName}
                      onChange={(e) => setFamilyHead({...familyHead, familyName: e.target.value})}
                      className="transition-all duration-300 focus:scale-105"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="headName">Full Name *</Label>
                    <Input
                      id="headName"
                      placeholder="Enter your full name"
                      value={familyHead.name}
                      onChange={(e) => setFamilyHead({...familyHead, name: e.target.value})}
                      className="transition-all duration-300 focus:scale-105"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="headEmail">Email Address *</Label>
                    <Input
                      id="headEmail"
                      type="email"
                      placeholder="Enter your email"
                      value={familyHead.email}
                      onChange={(e) => setFamilyHead({...familyHead, email: e.target.value})}
                      className="transition-all duration-300 focus:scale-105"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="headPhone">Phone Number</Label>
                    <Input
                      id="headPhone"
                      placeholder="Enter your phone number"
                      value={familyHead.phone}
                      onChange={(e) => setFamilyHead({...familyHead, phone: e.target.value})}
                      className="transition-all duration-300 focus:scale-105"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="members" className="animate-fade-in">
            <div className="space-y-6">
              <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center">
                    <UserPlus className="w-5 h-5 mr-2" />
                    Add Family Members
                  </CardTitle>
                  <CardDescription className="text-green-100">
                    Add your family members to build your family tree
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="memberName">Name *</Label>
                      <Input
                        id="memberName"
                        placeholder="Enter member name"
                        value={currentMember.name}
                        onChange={(e) => setCurrentMember({...currentMember, name: e.target.value})}
                        className="transition-all duration-300 focus:scale-105"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="relationship">Relationship *</Label>
                      <Select value={currentMember.relationship} onValueChange={(value) => setCurrentMember({...currentMember, relationship: value})}>
                        <SelectTrigger className="transition-all duration-300 focus:scale-105">
                          <SelectValue placeholder="Select relationship" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="spouse">Spouse</SelectItem>
                          <SelectItem value="child">Child</SelectItem>
                          <SelectItem value="parent">Parent</SelectItem>
                          <SelectItem value="sibling">Sibling</SelectItem>
                          <SelectItem value="grandparent">Grandparent</SelectItem>
                          <SelectItem value="grandchild">Grandchild</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="memberAge">Age</Label>
                      <Input
                        id="memberAge"
                        placeholder="Enter age"
                        value={currentMember.age}
                        onChange={(e) => setCurrentMember({...currentMember, age: e.target.value})}
                        className="transition-all duration-300 focus:scale-105"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="memberEmail">Email</Label>
                      <Input
                        id="memberEmail"
                        type="email"
                        placeholder="Enter email"
                        value={currentMember.email}
                        onChange={(e) => setCurrentMember({...currentMember, email: e.target.value})}
                        className="transition-all duration-300 focus:scale-105"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="memberPhone">Phone</Label>
                      <Input
                        id="memberPhone"
                        placeholder="Enter phone"
                        value={currentMember.phone}
                        onChange={(e) => setCurrentMember({...currentMember, phone: e.target.value})}
                        className="transition-all duration-300 focus:scale-105"
                      />
                    </div>
                  </div>
                  <Button 
                    onClick={addMember} 
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add Family Member
                  </Button>
                </CardContent>
              </Card>

              {members.length > 0 && (
                <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Family Members ({members.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {members.map((member) => (
                        <div key={member.id} className="p-4 border rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 transition-all duration-300 hover:shadow-md animate-fade-in">
                          <div className="flex justify-between items-start">
                            <div className="space-y-1">
                              <h4 className="font-semibold text-gray-800">{member.name}</h4>
                              <p className="text-sm text-gray-600 capitalize">{member.relationship}</p>
                              {member.age && <p className="text-sm text-gray-500">Age: {member.age}</p>}
                              {member.email && <p className="text-sm text-gray-500">{member.email}</p>}
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeMember(member.id)}
                              className="text-red-600 hover:text-red-700 hover:border-red-300"
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-8 text-center">
          <Button 
            onClick={handleSubmit}
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            Complete Registration
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FamilyRegistration;
