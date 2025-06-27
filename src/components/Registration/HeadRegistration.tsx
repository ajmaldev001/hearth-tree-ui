
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { User, Phone, MapPin, Heart, Camera, ArrowRight } from 'lucide-react';
import { toast } from "sonner";
import { HeadProfile } from '../../types/family';

interface HeadRegistrationProps {
  onComplete: (headData: HeadProfile) => void;
}

const HeadRegistration = ({ onComplete }: HeadRegistrationProps) => {
  const [formData, setFormData] = useState<HeadProfile>({
    firstName: '',
    middleName: '',
    lastName: '',
    age: 0,
    gender: 'male',
    maritalStatus: 'single',
    occupation: '',
    samajName: '',
    qualification: '',
    birthDate: '',
    bloodGroup: '',
    exactNatureOfDuties: '',
    email: '',
    phoneNumber: '',
    alternativeNumber: '',
    landlineNumber: '',
    socialMediaLink: '',
    flatNumber: '',
    buildingName: '',
    streetName: '',
    landmark: '',
    city: '',
    district: '',
    state: '',
    nativeCity: '',
    nativeState: '',
    country: 'India',
    pincode: '',
    photo: ''
  });

  const [activeTab, setActiveTab] = useState('profile');

  const handleInputChange = (field: keyof HeadProfile, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    const requiredFields = [
      'firstName', 'lastName', 'age', 'gender', 'maritalStatus', 'occupation',
      'samajName', 'qualification', 'birthDate', 'bloodGroup', 'email',
      'phoneNumber', 'streetName', 'city', 'district', 'state', 'country',
      'nativeCity', 'nativeState', 'pincode'
    ];

    for (const field of requiredFields) {
      if (!formData[field as keyof HeadProfile] || formData[field as keyof HeadProfile] === '') {
        toast.error(`Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return false;
      }
    }

    if (formData.phoneNumber.length < 10) {
      toast.error('Please enter a valid phone number');
      return false;
    }

    if (formData.age < 1 || formData.age > 120) {
      toast.error('Please enter a valid age');
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onComplete(formData);
      toast.success('Head registration completed successfully!');
    }
  };

  const samajOptions = [
    'Gujarati Samaj', 'Marathi Samaj', 'Punjabi Samaj', 'Tamil Samaj', 
    'Bengali Samaj', 'Telugu Samaj', 'Kannada Samaj', 'Malayalam Samaj',
    'Hindi Samaj', 'Other'
  ];

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

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
            Head Registration
          </h1>
          <p className="text-gray-600 text-lg">Register as the head of your family</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white shadow-lg rounded-full p-1">
            <TabsTrigger value="profile" className="rounded-full">
              <User className="w-4 h-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="personal" className="rounded-full">
              <Heart className="w-4 h-4 mr-2" />
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

          <TabsContent value="profile" className="animate-fade-in">
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
                <CardTitle>Profile Summary</CardTitle>
                <CardDescription className="text-blue-100">
                  Basic information about yourself
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      placeholder="Enter first name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="middleName">Middle Name</Label>
                    <Input
                      id="middleName"
                      value={formData.middleName}
                      onChange={(e) => handleInputChange('middleName', e.target.value)}
                      placeholder="Enter middle name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      placeholder="Enter last name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">Age *</Label>
                    <Input
                      id="age"
                      type="number"
                      value={formData.age || ''}
                      onChange={(e) => handleInputChange('age', parseInt(e.target.value) || 0)}
                      placeholder="Enter age"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender *</Label>
                    <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="maritalStatus">Marital Status *</Label>
                    <Select value={formData.maritalStatus} onValueChange={(value) => handleInputChange('maritalStatus', value)}>
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
                  <div className="space-y-2">
                    <Label htmlFor="occupation">Occupation *</Label>
                    <Input
                      id="occupation"
                      value={formData.occupation}
                      onChange={(e) => handleInputChange('occupation', e.target.value)}
                      placeholder="Enter occupation"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="samajName">Samaj Name *</Label>
                    <Select value={formData.samajName} onValueChange={(value) => handleInputChange('samajName', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your Samaj" />
                      </SelectTrigger>
                      <SelectContent>
                        {samajOptions.map((samaj) => (
                          <SelectItem key={samaj} value={samaj}>{samaj}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="qualification">Qualification *</Label>
                    <Input
                      id="qualification"
                      value={formData.qualification}
                      onChange={(e) => handleInputChange('qualification', e.target.value)}
                      placeholder="Enter qualification"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="personal" className="animate-fade-in">
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-t-lg">
                <CardTitle>Personal Information</CardTitle>
                <CardDescription className="text-green-100">
                  Additional personal details
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="birthDate">Birth Date *</Label>
                    <Input
                      id="birthDate"
                      type="date"
                      value={formData.birthDate}
                      onChange={(e) => handleInputChange('birthDate', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bloodGroup">Blood Group *</Label>
                    <Select value={formData.bloodGroup} onValueChange={(value) => handleInputChange('bloodGroup', value)}>
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
                </div>

                <div className="space-y-2">
                  <Label htmlFor="exactNatureOfDuties">Exact Nature of Duties *</Label>
                  <Textarea
                    id="exactNatureOfDuties"
                    value={formData.exactNatureOfDuties}
                    onChange={(e) => handleInputChange('exactNatureOfDuties', e.target.value)}
                    placeholder="Describe your job responsibilities"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="animate-fade-in">
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
                <CardTitle>Contact Information</CardTitle>
                <CardDescription className="text-purple-100">
                  How can we reach you?
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email ID *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Enter email address"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Phone Number *</Label>
                    <Input
                      id="phoneNumber"
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="alternativeNumber">Alternative Number</Label>
                    <Input
                      id="alternativeNumber"
                      type="tel"
                      value={formData.alternativeNumber}
                      onChange={(e) => handleInputChange('alternativeNumber', e.target.value)}
                      placeholder="Enter alternative number"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="landlineNumber">Landline Number</Label>
                    <Input
                      id="landlineNumber"
                      type="tel"
                      value={formData.landlineNumber}
                      onChange={(e) => handleInputChange('landlineNumber', e.target.value)}
                      placeholder="Enter landline number"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="socialMediaLink">Social Media Link</Label>
                  <Input
                    id="socialMediaLink"
                    type="url"
                    value={formData.socialMediaLink}
                    onChange={(e) => handleInputChange('socialMediaLink', e.target.value)}
                    placeholder="Enter social media profile URL"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="address" className="animate-fade-in">
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-t-lg">
                <CardTitle>Address Information</CardTitle>
                <CardDescription className="text-orange-100">
                  Current and native address details
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Current Address</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="flatNumber">Flat Number</Label>
                      <Input
                        id="flatNumber"
                        value={formData.flatNumber}
                        onChange={(e) => handleInputChange('flatNumber', e.target.value)}
                        placeholder="Enter flat number"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="buildingName">Building Name</Label>
                      <Input
                        id="buildingName"
                        value={formData.buildingName}
                        onChange={(e) => handleInputChange('buildingName', e.target.value)}
                        placeholder="Enter building name"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="streetName">Street Name *</Label>
                      <Input
                        id="streetName"
                        value={formData.streetName}
                        onChange={(e) => handleInputChange('streetName', e.target.value)}
                        placeholder="Enter street name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="landmark">Landmark</Label>
                      <Input
                        id="landmark"
                        value={formData.landmark}
                        onChange={(e) => handleInputChange('landmark', e.target.value)}
                        placeholder="Enter landmark"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        placeholder="Enter city"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="district">District *</Label>
                      <Input
                        id="district"
                        value={formData.district}
                        onChange={(e) => handleInputChange('district', e.target.value)}
                        placeholder="Enter district"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        value={formData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        placeholder="Enter state"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="country">Country *</Label>
                      <Input
                        id="country"
                        value={formData.country}
                        onChange={(e) => handleInputChange('country', e.target.value)}
                        placeholder="Enter country"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pincode">Pincode *</Label>
                      <Input
                        id="pincode"
                        value={formData.pincode}
                        onChange={(e) => handleInputChange('pincode', e.target.value)}
                        placeholder="Enter pincode"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Native Place</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nativeCity">Native City *</Label>
                      <Input
                        id="nativeCity"
                        value={formData.nativeCity}
                        onChange={(e) => handleInputChange('nativeCity', e.target.value)}
                        placeholder="Enter native city"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nativeState">Native State *</Label>
                      <Input
                        id="nativeState"
                        value={formData.nativeState}
                        onChange={(e) => handleInputChange('nativeState', e.target.value)}
                        placeholder="Enter native state"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 text-center">
          <Button 
            onClick={handleSubmit}
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            Complete Head Registration
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeadRegistration;
