
export interface HeadProfile {
  // Profile Summary
  firstName: string;
  middleName?: string;
  lastName: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  maritalStatus: 'single' | 'married' | 'divorced' | 'widowed';
  occupation: string;
  samajName: string;
  qualification: string;
  
  // Personal Information
  birthDate: string;
  bloodGroup: string;
  exactNatureOfDuties: string;
  
  // Contact Information
  email: string;
  phoneNumber: string;
  alternativeNumber?: string;
  landlineNumber?: string;
  socialMediaLink?: string;
  
  // Address
  flatNumber?: string;
  buildingName?: string;
  streetName: string;
  landmark?: string;
  city: string;
  district: string;
  state: string;
  nativeCity: string;
  nativeState: string;
  country: string;
  pincode: string;
  
  // Additional
  photo?: string;
}

export interface FamilyMember {
  id: string;
  
  // Personal Information
  firstName: string;
  middleName?: string;
  lastName: string;
  birthDate: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  maritalStatus: 'single' | 'married' | 'divorced' | 'widowed';
  qualification: string;
  occupation: string;
  exactNatureOfDuties: string;
  bloodGroup: string;
  photo?: string;
  relationWithHead: string;
  
  // Contact Information
  phoneNumber?: string;
  alternativeNumber?: string;
  landlineNumber?: string;
  email?: string;
  socialMediaLink?: string;
  
  // Current Address
  country: string;
  state: string;
  district: string;
  city: string;
  streetName: string;
  landmark?: string;
  buildingName?: string;
  doorNumber?: string;
  flatNumber?: string;
  pincode: string;
  
  // Native Place
  nativeCity: string;
  nativeState: string;
}

export interface FamilyData {
  head: HeadProfile;
  members: FamilyMember[];
  createdAt: string;
  templeAssociation?: string;
}
