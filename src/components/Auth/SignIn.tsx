
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Phone, Lock, ArrowRight } from 'lucide-react';
import { toast } from "sonner";

interface SignInProps {
  onSignIn: (phone: string) => void;
  onSwitchToSignUp: () => void;
}

const SignIn = ({ onSignIn, onSwitchToSignUp }: SignInProps) => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOTP = () => {
    if (phone.length < 10) {
      toast.error("Please enter a valid phone number");
      return;
    }
    
    // Simulate OTP sending
    setOtpSent(true);
    toast.success("OTP sent to your mobile number");
  };

  const handleVerifyOTP = () => {
    if (otp.length !== 6) {
      toast.error("Please enter valid 6-digit OTP");
      return;
    }
    
    // Simulate OTP verification
    toast.success("Signed in successfully!");
    onSignIn(phone);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
          <CardDescription className="text-blue-100">
            Sign in to access your family tree
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Mobile Number</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your mobile number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="pl-10"
                disabled={otpSent}
              />
            </div>
          </div>

          {!otpSent ? (
            <Button onClick={handleSendOTP} className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
              Send OTP
            </Button>
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
              <Button onClick={handleVerifyOTP} className="w-full bg-gradient-to-r from-green-600 to-blue-600">
                Verify & Sign In
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </>
          )}

          <div className="text-center pt-4 border-t">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={onSwitchToSignUp}
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Sign Up
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;
