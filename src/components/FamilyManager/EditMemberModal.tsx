
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Save, User } from 'lucide-react';
import { toast } from "sonner";
import { FamilyMember } from '../../types/family';

interface EditMemberModalProps {
  member: FamilyMember;
  onSave: (updatedMember: FamilyMember) => void;
  onClose: () => void;
}

const EditMemberModal = ({ member, onSave, onClose }: EditMemberModalProps) => {
  const [formData, setFormData] = useState<FamilyMember>(member);

  const handleSave = () => {
    if (!formData.firstName || !formData.relationWithHead) {
      toast.error("Name and relationship are required");
      return;
    }
    
    onSave(formData);
    toast.success("Member updated successfully!");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md shadow-2xl border-0 bg-white">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                Edit Family Member
              </CardTitle>
              <CardDescription className="text-blue-100">
                Update member information
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white/20"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name *</Label>
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              placeholder="Enter first name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              placeholder="Enter last name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="relationship">Relationship *</Label>
            <Select value={formData.relationWithHead} onValueChange={(value) => setFormData({...formData, relationWithHead: value})}>
              <SelectTrigger>
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
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              value={formData.age}
              onChange={(e) => setFormData({...formData, age: parseInt(e.target.value) || 0})}
              placeholder="Enter age"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={formData.phoneNumber || ''}
              onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
              placeholder="Enter phone number"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email || ''}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="Enter email address"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="occupation">Occupation</Label>
            <Input
              id="occupation"
              value={formData.occupation}
              onChange={(e) => setFormData({...formData, occupation: e.target.value})}
              placeholder="Enter occupation"
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              onClick={handleSave}
              className="flex-1 bg-gradient-to-r from-green-600 to-blue-600"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditMemberModal;
