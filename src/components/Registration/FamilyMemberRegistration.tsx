
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { User, Phone, MapPin, UserPlus, Trash2, ArrowRight, Users } from 'lucide-react';
import { toast } from "sonner";
import { FamilyMember, HeadProfile } from '../../types/family';

interface FamilyMemberRegistrationProps {
  onComplete: (members: FamilyMember[]) => void;
  headData?: HeadProfile;
}

const FamilyMemberRegistration = ({ onComplete, headData }: FamilyMemberRegistrationProps) => {
  const [members, setMembers] = useState<FamilyMember[]>([]);
  const [currentMember, setCurrentMember] = useState<FamilyMember>({
    id: '',
    firstName: '',
    middleName: '',
    lastName: '',
    birthDate: '',
    age: 0,
    gender: 'male',
    maritalStatus: 'single',
    qualification: '',
    occupation: '',
    exactNatureOfDuties: '',
    bloodGroup: '',
    photo: '',
    relationWithHead: '',
    phoneNumber: '',
    alternativeNumber: '',
    landlineNumber: '',
    email: '',
    socialMediaLink: '',
    country: 'India',
    state: '',
    district: '',
    city: '',
    streetName: '',
    landmark: '',
    buildingName: '',
    doorNumber: '',
    flatNumber: '',
    pincode: '',
    nativeCity: '',
    nativeState: ''
  });

  const [activeTab, setActiveTab] = useState('personal');
  const [numberOfMembers, setNumberOfMembers] = useState(1);

  const relationshipOptions = [
    'Spouse', 'Son', 'Daughter', 'Father', 'Mother', 'Brother', 'Sister',
    'Grandfather', 'Grandmother', 'Grandson', 'Granddaughter', 'Uncle',
    'Aunt', 'Nephew', 'Niece', 'Cousin', 'Son-in-law', 'Daughter-in-law',
    'Father-in-law', 'Mother-in-law', 'Brother-in-law', 'Sister-in-law', 'Other'
  ];

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const handleInputChange = (field: keyof FamilyMember, value: string | number) => {
    setCurrentMember(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateMember = (member: FamilyMember) => {
    const requiredFields = [
      'firstName', 'lastName', 'birthDate', 'age', 'gender', 'maritalStatus',
      'qualification', 'occupation', 'bloodGroup', 'relationWithHead',
      'country', 'state', 'district', 'city', 'streetName', 'pincode',
      'nativeCity', 'nativeState'
    ];

    for (const field of requiredFields) {
      if (!member[field as keyof FamilyMember] || member[field as keyof FamilyMember] === '') {
        toast.error(`Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} for ${member.firstName}`);
        return false;
      }
    }

    if (member.age < 1 || member.age > 120) {
      toast.error(`Please enter a valid age for ${member.firstName}`);
      return false;
    }

    return true;
  };

  const addMember = () => {
    if (validateMember(currentMember)) {
      const newMember = {
        ...currentMember,
        id: Date.now().toString()
      };
      setMembers([...members, newMember]);
      setCurrentMember({
        id: '',
        firstName: '',
        middleName: '',
        lastName: '',
        birthDate: '',
        age: 0,
        gender: 'male',
        maritalStatus: 'single',
        qualification: '',
        occupation: '',
        exactNatureOfDuties: '',
        bloodGroup: '',
        photo: '',
        relationWithHead: '',
        phoneNumber: '',
        alternativeNumber: '',
        landlineNumber: '',
        email: '',
        socialMediaLink: '',
        country: 'India',
        state: '',
        district: '',
        city: '',
        streetName: '',
        landmark: '',
        buildingName: '',
        doorNumber: '',
        flatNumber: '',
        pincode: '',
        nativeCity: '',
        nativeState: ''
      });
      toast.success("Family member added successfully!");
    }
  };

  const removeMember = (id: string) => {
    setMembers(members.filter(member => member.id !== id));
    toast.success("Family member removed");
  };

  const handleComplete = () => {
    if (members.length === 0) {
      toast.error("Please add at least one family member");
      return;
    }
    onComplete(members);
    toast.success("Family member registration completed!");
  };

  const skipRegistration = () => {
    onComplete([]);
    toast.success("Registration completed! You can add family members later.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-green-600 to-blue-600 p-3 rounded-full">
              <Users className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Family Member Registration
          </h1>
          <p className="text-gray-600 text-lg">Add your family members to complete your family tree</p>
        </div>

        {/* Number of Members Input */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm mb-6">
          <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-t-lg">
            <CardTitle>Family Size</CardTitle>
            <CardDescription className="text-indigo-100">
              How many family members would you like to add?
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <Label htmlFor="numberOfMembers">Number of Family Members:</Label>
              <Input
                id="numberOfMembers"
                type="number"
                min="0"
                max="20"
                value={numberOfMembers}
                onChange={(e) => setNumberOfMembers(parseInt(e.target.value) || 0)}
                className="w-32"
              />
              <span className="text-sm text-gray-600">
                Added: {members.length} / {numberOfMembers}
              </span>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add Member Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center">
                  <UserPlus className="w-5 h-5 mr-2" />
                  Add Family Member
                </CardTitle>
                <CardDescription className="text-green-100">
                  Fill in the details for each family member
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                  <TabsList className="grid w-full grid-cols-3 bg-gray-100 rounded-full p-1">
                    <TabsTrigger value="personal" className="rounded-full">
                      <User className="w-4 h-4 mr-2" />
                      Personal
                    </TabsTrigger>
                    <TabsTrigger value="contact" className="rounded-full">
                      <Phone className="w-4 h-4 mr-2" />
                      Contact
                    </TabsTrigger>
                    <TabsTrigger value="address" className="rounded-full">
                      <MapPin className="w-4 h-4 mr-2" />
                      Address
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="personal" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          value={currentMember.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          placeholder="Enter first name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="middleName">Middle Name</Label>
                        <Input
                          id="middleName"
                          value={currentMember.middleName}
                          onChange={(e) => handleInputChange('middleName', e.target.value)}
                          placeholder="Enter middle name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          value={currentMember.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          placeholder="Enter last name"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="birthDate">Birth Date *</Label>
                        <Input
                          id="birthDate"
                          type="date"
                          value={currentMember.birthDate}
                          onChange={(e) => handleInputChange('birthDate', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="age">Age *</Label>
                        <Input
                          id="age"
                          type="number"
                          value={currentMember.age || ''}
                          onChange={(e) => handleInputChange('age', parseInt(e.target.value) || 0)}
                          placeholder="Enter age"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="gender">Gender *</Label>
                        <Select value={currentMember.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="maritalStatus">Marital Status *</Label>
                        <Select value={currentMember.maritalStatus} onValueChange={(value) => handleInputChange('maritalStatus', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select marital status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="single">Single</SelectItem>
                            <SelectItem value="married">Married</SelectItem>
                            <SelectItem value="divorced">Divorced</SelectItem>
                            <SelectItem value="widowed">Widowed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="qualification">Qualification *</Label>
                        <Input
                          id="qualification"
                          value={currentMember.qualification}
                          onChange={(e) => handleInputChange('qualification', e.target.value)}
                          placeholder="Enter qualification"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="occupation">Occupation *</Label>
                        <Input
                          id="occupation"
                          value={currentMember.occupation}
                          onChange={(e) => handleInputChange('occupation', e.target.value)}
                          placeholder="Enter occupation"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="bloodGroup">Blood Group *</Label>
                        <Select value={currentMember.bloodGroup} onValueChange={(value) => handleInputChange('bloodGroup', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select blood group" />
                          </SelectTrigger>
                          <SelectContent>
                            {bloodGroups.map((group) => (
                              <SelectItem key={group} value={group}>{group}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="relationWithHead">Relation with Head *</Label>
                        <Select value={currentMember.relationWithHead} onValueChange={(value) => handleInputChange('relationWithHead', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select relationship" />
                          </SelectTrigger>
                          <SelectContent>
                            {relationshipOptions.map((relation) => (
                              <SelectItem key={relation} value={relation.toLowerCase()}>{relation}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="exactNatureOfDuties">Exact Nature of Duties</Label>
                      <Textarea
                        id="exactNatureOfDuties"
                        value={currentMember.exactNatureOfDuties}
                        onChange={(e) => handleInputChange('exactNatureOfDuties', e.target.value)}
                        placeholder="Describe job responsibilities"
                        rows={2}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="contact" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phoneNumber">Phone Number</Label>
                        <Input
                          id="phoneNumber"
                          type="tel"
                          value={currentMember.phoneNumber}
                          onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                          placeholder="Enter phone number"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="alternativeNumber">Alternative Number</Label>
                        <Input
                          id="alternativeNumber"
                          type="tel"
                          value={currentMember.alternativeNumber}
                          onChange={(e) => handleInputChange('alternativeNumber', e.target.value)}
                          placeholder="Enter alternative number"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="landlineNumber">Landline Number</Label>
                        <Input
                          id="landlineNumber"
                          type="tel"
                          value={currentMember.landlineNumber}
                          onChange={(e) => handleInputChange('landlineNumber', e.target.value)}
                          placeholder="Enter landline number"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email ID</Label>
                        <Input
                          id="email"
                          type="email"
                          value={currentMember.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="Enter email address"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="socialMediaLink">Social Media Link</Label>
                      <Input
                        id="socialMediaLink"
                        type="url"
                        value={currentMember.socialMediaLink}
                        onChange={(e) => handleInputChange('socialMediaLink', e.target.value)}
                        placeholder="Enter social media profile URL"
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="address" className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Current Address</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="country">Country *</Label>
                          <Input
                            id="country"
                            value={currentMember.country}
                            onChange={(e) => handleInputChange('country', e.target.value)}
                            placeholder="Enter country"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="state">State *</Label>
                          <Input
                            id="state"
                            value={currentMember.state}
                            onChange={(e) => handleInputChange('state', e.target.value)}
                            placeholder="Enter state"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div className="space-y-2">
                          <Label htmlFor="district">District *</Label>
                          <Input
                            id="district"
                            value={currentMember.district}
                            onChange={(e) => handleInputChange('district', e.target.value)}
                            placeholder="Enter district"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="city">City *</Label>
                          <Input
                            id="city"
                            value={currentMember.city}
                            onChange={(e) => handleInputChange('city', e.target.value)}
                            placeholder="Enter city"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div className="space-y-2">
                          <Label htmlFor="streetName">Street Name *</Label>
                          <Input
                            id="streetName"
                            value={currentMember.streetName}
                            onChange={(e) => handleInputChange('streetName', e.target.value)}
                            placeholder="Enter street name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="landmark">Landmark</Label>
                          <Input
                            id="landmark"
                            value={currentMember.landmark}
                            onChange={(e) => handleInputChange('landmark', e.target.value)}
                            placeholder="Enter landmark"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        <div className="space-y-2">
                          <Label htmlFor="buildingName">Building Name</Label>
                          <Input
                            id="buildingName"
                            value={currentMember.buildingName}
                            onChange={(e) => handleInputChange('buildingName', e.target.value)}
                            placeholder="Enter building name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="doorNumber">Door Number</Label>
                          <Input
                            id="doorNumber"
                            value={currentMember.doorNumber}
                            onChange={(e) => handleInputChange('doorNumber', e.target.value)}
                            placeholder="Enter door number"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="flatNumber">Flat Number</Label>
                          <Input
                            id="flatNumber"
                            value={currentMember.flatNumber}
                            onChange={(e) => handleInputChange('flatNumber', e.target.value)}
                            placeholder="Enter flat number"
                          />
                        </div>
                      </div>

                      <div className="space-y-2 mt-4">
                        <Label htmlFor="pincode">Pincode *</Label>
                        <Input
                          id="pincode"
                          value={currentMember.pincode}
                          onChange={(e) => handleInputChange('pincode', e.target.value)}
                          placeholder="Enter pincode"
                        />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Native Place</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="nativeCity">Native City *</Label>
                          <Input
                            id="nativeCity"
                            value={currentMember.nativeCity}
                            onChange={(e) => handleInputChange('nativeCity', e.target.value)}
                            placeholder="Enter native city"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="nativeState">Native State *</Label>
                          <Input
                            id="nativeState"
                            value={currentMember.nativeState}
                            onChange={(e) => handleInputChange('nativeState', e.target.value)}
                            placeholder="Enter native state"
                          />
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="mt-6">
                  <Button 
                    onClick={addMember}
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add Family Member
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Added Members List */}
          <div className="lg:col-span-1">
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
                <CardTitle>Added Members ({members.length})</CardTitle>
                <CardDescription className="text-purple-100">
                  Family members added so far
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                {members.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No members added yet</p>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {members.map((member, index) => (
                      <div 
                        key={member.id}
                        className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border-2 border-purple-100 transition-all duration-300"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800">
                              {member.firstName} {member.lastName}
                            </h4>
                            <p className="text-sm text-gray-600 capitalize">
                              {member.relationWithHead}
                            </p>
                            <p className="text-sm text-gray-500">
                              Age: {member.age}
                            </p>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => removeMember(member.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={skipRegistration}
            variant="outline"
            size="lg"
            className="px-8 py-6 rounded-full"
          >
            Skip for Now
          </Button>
          <Button 
            onClick={handleComplete}
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

export default FamilyMemberRegistration;
