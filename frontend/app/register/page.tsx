"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Eye, EyeOff, Upload, CheckCircle } from "lucide-react";

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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          profilePicture: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    setStep(2);
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  const handleFinalSubmit = () => {
    // Handle registration logic here
    console.log("Registration data:", formData);
    // Redirect to login after a short delay
    setTimeout(() => {
      router.push("/login");
    }, 2000);
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-secondary/10 p-4">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold">ClassFellow</span>
          </Link>
          <h1 className="text-2xl font-bold mb-2">Create your account</h1>
          <p className="text-muted-foreground">
            Join thousands of students transforming their learning experience
          </p>
        </div>

        {/* Progress Bar */}
        {step < 3 && (
          <div className="mb-6">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Step {step} of 2</span>
              <span>{getProgressValue()}%</span>
            </div>
            <Progress value={getProgressValue()} className="w-full" />
          </div>
        )}

        {/* Step 1: Email and Password */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Account Credentials</CardTitle>
              <CardDescription>
                Enter your email and create a secure password
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleStep1Submit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  Continue
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Personal Information */}
        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Tell us about yourself to personalize your experience
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleStep2Submit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="university">University</Label>
                  <Input
                    id="university"
                    name="university"
                    type="text"
                    placeholder="Enter your university name"
                    value={formData.university}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Profile Picture (Optional)</Label>
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={formData.profilePicture} />
                      <AvatarFallback>
                        {formData.name
                          ? formData.name.charAt(0).toUpperCase()
                          : "?"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <Input
                        id="profilePicture"
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                          document.getElementById("profilePicture")?.click()
                        }
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Photo
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button type="submit" className="flex-1">
                    Complete Registration
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Success Screen */}
        {step === 3 && (
          <Card>
            <CardContent className="text-center py-12">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">
                Welcome to ClassFellow!
              </h2>
              <p className="text-muted-foreground mb-6">
                Your account has been created successfully. You're all set to
                start your learning journey.
              </p>
              <div className="space-y-2 text-sm text-muted-foreground mb-6">
                <p>
                  <strong>Email:</strong> {formData.email}
                </p>
                <p>
                  <strong>Name:</strong> {formData.name}
                </p>
                <p>
                  <strong>University:</strong> {formData.university}
                </p>
              </div>
              <Button onClick={handleFinalSubmit} className="w-full">
                Continue to Sign In
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Sign In Link */}
        {step < 3 && (
          <div className="text-center mt-6">
            <p className="text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-primary hover:underline font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
