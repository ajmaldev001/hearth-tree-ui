
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Phone, User, Users, Lock, ArrowRight } from 'lucide-react';
import { toast } from "sonner";

interface SignUpProps {
  onSignUp: (userData: any) => void;
  onSwitchToSignIn: () => void;
}

const SignUp = ({ onSignUp, onSwitchToSignIn }: SignUpProps) => {
  const [formData, setFormData] = useState({
    name: '',
    familyName: '',
    phone: '',
    email: ''
  });
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOTP = () => {
    if (!formData.name || !formData.familyName || formData.phone.length < 10) {
      toast.error("Please fill all required fields");
      return;
    }
    
    setOtpSent(true);
    toast.success("OTP sent to your mobile number");
  };

  const handleVerifyAndSignUp = () => {
    if (otp.length !== 6) {
      toast.error("Please enter valid 6-digit OTP");
      return;
    }
    
    const userData = {
      head: {
        name: formData.name,
        familyName: formData.familyName,
        phone: formData.phone,
        email: formData.email
      },
      members: [],
      createdAt: new Date().toISOString()
    };
    
    toast.success("Account created successfully!");
    onSignUp(userData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="text-center bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-t-lg">
          <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
          <CardDescription className="text-green-100">
            Join your family tree network
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          {!otpSent ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="familyName">Family Name *</Label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="familyName"
                    placeholder="Enter family name"
                    value={formData.familyName}
                    onChange={(e) => setFormData({...formData, familyName: e.target.value})}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Mobile Number *</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter mobile number"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email (Optional)</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <Button onClick={handleSendOTP} className="w-full bg-gradient-to-r from-green-600 to-blue-600">
                Send OTP
              </Button>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="otp">Enter OTP</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="otp"
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="pl-10"
                    maxLength={6}
                  />
                </div>
              </div>
              <Button onClick={handleVerifyAndSignUp} className="w-full bg-gradient-to-r from-purple-600 to-pink-600">
                Verify & Create Account
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </>
          )}

          <div className="text-center pt-4 border-t">
            <p className="text-gray-600">
              Already have an account?{' '}
              <button
                onClick={onSwitchToSignIn}
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Sign In
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
