
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Phone, Lock, ArrowRight } from 'lucide-react';
import { toast } from "sonner";

interface SignUpProps {
  onSignUp: (phone: string) => void;
  onSwitchToSignIn: () => void;
}

const SignUp = ({ onSignUp, onSwitchToSignIn }: SignUpProps) => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [resendCount, setResendCount] = useState(0);
  const [resendTimer, setResendTimer] = useState(0);

  const handleSendOTP = () => {
    if (phone.length < 10) {
      toast.error("Please enter a valid phone number");
      return;
    }
    
    setOtpSent(true);
    setResendTimer(30);
    toast.success("OTP sent to your mobile number");
    
    // Start countdown timer
    const timer = setInterval(() => {
      setResendTimer(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleResendOTP = () => {
    if (resendTimer > 0) return;
    
    setResendCount(prev => prev + 1);
    setResendTimer(30);
    toast.success("OTP resent to your mobile number");
    
    // Start countdown timer
    const timer = setInterval(() => {
      setResendTimer(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleVerifyAndSignUp = () => {
    if (otp.length !== 6) {
      toast.error("Please enter valid 6-digit OTP");
      return;
    }
    
    toast.success("Account created successfully!");
    onSignUp(phone);
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
                <Label htmlFor="phone">Mobile Number *</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter mobile number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="pl-10"
                  />
                </div>
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

              <div className="flex items-center justify-between">
                <button
                  onClick={handleResendOTP}
                  disabled={resendTimer > 0}
                  className={`text-sm ${
                    resendTimer > 0 
                      ? 'text-gray-400 cursor-not-allowed' 
                      : 'text-blue-600 hover:text-blue-700'
                  }`}
                >
                  {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : 'Resend OTP'}
                </button>
                <span className="text-sm text-gray-500">
                  Attempts: {resendCount}/3
                </span>
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
