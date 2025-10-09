"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Eye, 
  EyeOff, 
  CheckCircle, 
  AlertCircle, 
  Mail, 
  Lock, 
  User, 
  Building2,
} from "lucide-react";
import SignupRightPanel from "@/components/signup-right-panel";
import OAuthButtons from "@/components/ui/oauth-buttons";

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  university: string;
  profilePicture: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    university: "",
    profilePicture: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Clear any previous errors
    if (!showPassword && formData.password !== formData.confirmPassword) {
      setError("Passwords don't match!");
      return;
    }
    setStep(2);
  };

  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Generate a random seed for the profile picture
      const randomSeed = Math.floor(Math.random() * 10000);
      const profilePhotoUrl = `https://api.dicebear.com/9.x/rings/svg?seed=${randomSeed}`;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`,
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include", // Include cookies
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            name: formData.name,
            university: formData.university,
            photo: profilePhotoUrl,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        // Update form data with the generated profile picture
        setFormData((prev) => ({
          ...prev,
          profilePicture: profilePhotoUrl,
        }));
        setStep(3);
      } else {
        setError(data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFinalSubmit = () => {
    router.push("/login");
  };

  const getProgressValue = () => {
    switch (step) {
      case 1:
        return 33;
      case 2:
        return 66;
      case 3:
        return 100;
      default:
        return 0;
    }
  };



 return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Step Indicator Carousel */}
            {step < 3 && (
              <div className="flex items-center gap-2 mb-8">
                {[1, 2].map((s) => (
                  <div
                    key={s}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      s === step
                        ? "w-12 bg-gradient-to-r from-primary to-secondary"
                        : s < step
                        ? "w-8 bg-gradient-to-r from-primary to-secondary opacity-70"
                        : "w-8 bg-muted"
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-muted-foreground font-medium">
                  {step}/2
                </span>
              </div>
            )}
          {/* Step 1: Credentials */}
          {step === 1 && (
            <div>
              <h1 className="text-3xl font-bold mb-2 text-gray-900">
                Welcome back!
              </h1>
              <p className="text-gray-500 mb-8">
               Sign up to get started
              </p>

              <form onSubmit={handleStep1Submit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email*
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="pl-12 h-12 rounded-xl border-gray-200 focus:border-primary focus:ring-primary"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password*
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 z-10" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="pl-12 pr-12 h-12 rounded-xl border-gray-200 focus:border-primary focus:ring-primary"
                      required
                    />
                  <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
                  </div>
                </div>

                {!showPassword && (
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                      Confirm Password*
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 z-10" />
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="pl-12 pr-12 h-12 rounded-xl border-gray-200 focus:primary focus:ring-primary"
                        required
                      />
                      <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                    </div>
                  </div>
                )}

                {error && (
                  <Alert variant="destructive" className="rounded-xl">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button 
                  type="submit" 
                  variant="default"
                  className="w-full"
                >
                  Continue
                </Button>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">or continue with</span>
                  </div>
                </div>
                <OAuthButtons />
              </form>
            </div>
          )}

          
          {/* Step 2: Personal Info */}
          {step === 2 && (
            <div>
              <h1 className="text-3xl font-bold mb-2 text-gray-900">
                Personal Information
              </h1>
              <p className="text-gray-500 mb-8">
                Tell us about yourself to personalize your experience
              </p>

              <form onSubmit={handleStep2Submit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                    Full Name*
                  </Label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="pl-12 h-12 rounded-xl border-gray-200 focus:border-primary focus:ring-primary"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="university" className="text-sm font-medium text-gray-700">
                    University*
                  </Label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="university"
                      name="university"
                      type="text"
                      placeholder="Enter your university name"
                      value={formData.university}
                      onChange={handleInputChange}
                      className="pl-12 h-12 rounded-xl border-gray-200 focus:border-primary focus:ring-primary"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Profile Picture</Label>
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                    <Avatar className="w-14 h-14">
                      <AvatarFallback className="bg-primary text-white">
                        {formData.name ? formData.name.charAt(0).toUpperCase() : "?"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-sm text-gray-500">
                      <p>A unique profile picture will be</p>
                      <p>automatically generated for you!</p>
                    </div>
                  </div>
                </div>

                {error && (
                  <Alert variant="destructive" className="rounded-xl">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="flex gap-3 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setStep(1);
                      setError("");
                    }}
                    className="flex-1"
                    disabled={isLoading}
                  >
                    Back
                  </Button>
                  <Button 
                    type="submit" 
                    variant="default"
                    className="flex-1" 
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating..." : "Complete"}
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Step 3: Success */}
          {step === 3 && (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold mb-3 text-gray-900">
                Welcome {formData.name.split(" ")[0]}!
              </h2>
              <p className="text-gray-500 mb-8">
                Your account has been created successfully. You&apos;re all set to start your learning journey.
              </p>
              <Button 
                onClick={handleFinalSubmit} 
                className="w-full h-12 rounded-xl bg-black hover:bg-gray-800 text-white font-semibold"
              >
                Continue to Sign In
              </Button>
            </div>
          )}

          {/* Sign In Link */}
          {step < 3 && (
            <p className="text-center text-sm text-gray-500 mt-6">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline font-semibold">
                Login Here
              </Link>
            </p>
          )}
        </div>
      </div>
      {/* Right Side - Decorative Panel */}
      <SignupRightPanel />
    </div>
  );
}