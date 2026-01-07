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
  major: string;
}

interface CourseData {
  id: string;
  name: string;
  description: string;
  books: BookData[];
}

interface BookData {
  id: string;
  name: string;
  pdfUrl: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [currentCourse, setCurrentCourse] = useState<CourseData>({
    id: "",
    name: "",
    description: "",
    books: [],
  });
  const [currentBook, setCurrentBook] = useState({ name: "", pdfUrl: "" });
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    university: "",
    profilePicture: "",
    major: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "password") {
      if (value.length < 6 && value.length > 0) {
        setPasswordError(`Password must be at least 6 characters (${value.length}/6)`);
      } else {
        setPasswordError("");
      }
    }
  };

  const handleAddBook = () => {
    if (!currentBook.name.trim() || !currentBook.pdfUrl.trim()) {
      setError("Please fill in all book fields");
      return;
    }
    setCurrentCourse({
      ...currentCourse,
      books: [
        ...currentCourse.books,
        {
          id: Date.now().toString(),
          name: currentBook.name,
          pdfUrl: currentBook.pdfUrl,
        },
      ],
    });
    setCurrentBook({ name: "", pdfUrl: "" });
    setError("");
  };

  const handleRemoveBook = (bookId: string) => {
    setCurrentCourse({
      ...currentCourse,
      books: currentCourse.books.filter((b) => b.id !== bookId),
    });
  };

  const handleAddCourse = () => {
    if (!currentCourse.name.trim() || !currentCourse.description.trim()) {
      setError("Please fill in course name and description");
      return;
    }
    if (currentCourse.books.length === 0) {
      setError("Please add at least one book to the course");
      return;
    }
    setCourses([
      ...courses,
      {
        ...currentCourse,
        id: Date.now().toString(),
      },
    ]);
    setCurrentCourse({
      id: "",
      name: "",
      description: "",
      books: [],
    });
    setError("");
  };

  const handleRemoveCourse = (courseId: string) => {
    setCourses(courses.filter((c) => c.id !== courseId));
  };


  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Clear any previous errors
    
    // Validate password length
    if (formData.password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }
    
    if (!showPassword && formData.password !== formData.confirmPassword) {
      setError("Passwords don't match!");
      return;
    }
    setStep(2);
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setStep(3);
  };

  const handleStep3Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (courses.length === 0) {
        setError("Please add at least one course with at least one book");
        setIsLoading(false);
        return;
      }

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
          credentials: "include",
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            name: formData.name,
            university: formData.university,
            major: formData.major,
            photo: profilePhotoUrl,
            courses: courses.map((course) => ({
              name: course.name,
              description: course.description,
              books: course.books.map((book) => ({
                name: book.name,
                pdfUrl: book.pdfUrl,
              })),
            })),
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        // Automatically log in the user after signup
        const loginResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
          {
            method: "POST",
            headers: {
              accept: "application/json",
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              email: formData.email,
              password: formData.password,
            }),
          }
        );

        const loginData = await loginResponse.json();

        if (loginData.success) {
          // Redirect to dashboard
          router.push("/dashboard");
        } else {
          setError("Signup successful but login failed. Please log in manually.");
          setStep(4);
        }
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

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Step Indicator Carousel */}
            {step < 4 && (
              <div className="flex items-center gap-2 mb-8">
                {[1, 2, 3].map((s) => (
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
                  {step}/3
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
                      placeholder="Create a password (minimum 6 characters)"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`pl-12 pr-12 h-12 rounded-xl border-gray-200 focus:border-primary focus:ring-primary ${
                        passwordError ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                      }`}
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
                  {passwordError && (
                    <p className="text-sm text-red-500 font-medium flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {passwordError}
                    </p>
                  )}
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
                  disabled={passwordError !== ""}
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
                    {isLoading ? "Creating..." : "Continue"}
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Step 3: Academic Information */}
          {step === 3 && (
            <div>
              <h1 className="text-3xl font-bold mb-2 text-gray-900">
                Academic Information
              </h1>
              <p className="text-gray-500 mb-8">
                Add your courses and learning materials
              </p>

              <form onSubmit={handleStep3Submit} className="space-y-5 max-h-[60vh] overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-gray-400">
                <div className="space-y-4 bg-gray-50 p-4 rounded-xl">
                  <h3 className="font-semibold text-gray-900">Add Course</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="courseName" className="text-sm font-medium text-gray-700">
                      Course Name*
                    </Label>
                    <Input
                      id="courseName"
                      type="text"
                      placeholder="e.g., Introduction to Web Development"
                      value={currentCourse.name}
                      onChange={(e) =>
                        setCurrentCourse({ ...currentCourse, name: e.target.value })
                      }
                      className="h-10 rounded-lg border-gray-200 focus:border-primary focus:ring-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="courseDescription" className="text-sm font-medium text-gray-700">
                      Course Description*
                    </Label>
                    <Input
                      id="courseDescription"
                      type="text"
                      placeholder="e.g., Learn the basics of web development"
                      value={currentCourse.description}
                      onChange={(e) =>
                        setCurrentCourse({ ...currentCourse, description: e.target.value })
                      }
                      className="h-10 rounded-lg border-gray-200 focus:border-primary focus:ring-primary"
                    />
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Add Books to Course</h4>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bookName" className="text-sm font-medium text-gray-700">
                        Book Name*
                      </Label>
                      <Input
                        id="bookName"
                        type="text"
                        placeholder="e.g., Modern JavaScript Guide"
                        value={currentBook.name}
                        onChange={(e) =>
                          setCurrentBook({ ...currentBook, name: e.target.value })
                        }
                        className="h-10 rounded-lg border-gray-200 focus:border-primary focus:ring-primary"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bookPdf" className="text-sm font-medium text-gray-700">
                        PDF URL*
                      </Label>
                      <Input
                        id="bookPdf"
                        type="url"
                        placeholder="https://example.com/book.pdf"
                        value={currentBook.pdfUrl}
                        onChange={(e) =>
                          setCurrentBook({ ...currentBook, pdfUrl: e.target.value })
                        }
                        className="h-10 rounded-lg border-gray-200 focus:border-primary focus:ring-primary"
                      />
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleAddBook}
                      className="w-full mt-3"
                    >
                      Add Book
                    </Button>
                  </div>

                  {currentCourse.books.length > 0 && (
                    <div className="border-t pt-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Books in this course</h4>
                      <div className="space-y-2">
                        {currentCourse.books.map((book) => (
                          <div
                            key={book.id}
                            className="flex items-center justify-between bg-white p-2 rounded border border-gray-200"
                          >
                            <div>
                              <p className="text-sm font-medium text-gray-900">{book.name}</p>
                              <p className="text-xs text-gray-500 truncate">{book.pdfUrl}</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveBook(book.id)}
                              className="text-red-500 hover:text-red-700 cursor-pointer text-sm font-medium"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <Button
                    type="button"
                    onClick={handleAddCourse}
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    Add Course
                  </Button>
                </div>

                {courses.length > 0 && (
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Added Courses</h3>
                    <div className="space-y-3">
                      {courses.map((course) => (
                        <div
                          key={course.id}
                          className="bg-white p-3 rounded-lg border border-blue-200"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <p className="font-medium text-gray-900">{course.name}</p>
                              <p className="text-sm text-gray-600">{course.description}</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveCourse(course.id)}
                              className="text-red-500 cursor-pointer hover:text-red-700 text-sm font-medium"
                            >
                              Remove
                            </button>
                          </div>
                          <div className="text-xs text-gray-500">
                            {course.books.length} book{course.books.length !== 1 ? 's' : ''}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

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
                      setStep(2);
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
                    disabled={isLoading || courses.length === 0 || !courses.some(c => c.books.length > 0)}
                  >
                    {isLoading ? "Creating..." : "Complete"}
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Sign In Link */}
          {step < 4 && (
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