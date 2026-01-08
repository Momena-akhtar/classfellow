"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/dashboard-layout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Loader, ArrowLeft } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Book {
  _id: string;
  name: string;
  pdfUrl: string;
  course: string;
  createdAt: string;
  updatedAt: string;
}

interface Course {
  _id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface CourseWithBooks extends Course {
  books: Book[];
}

interface CourseDetailClientProps {
  courseId: string | null;
}

export default function CourseDetailClient({
  courseId,
}: CourseDetailClientProps) {
  const router = useRouter();

  const [course, setCourse] = useState<CourseWithBooks | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      if (!courseId) {
        setError("No course selected");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        // Fetch course details with books
        const courseResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/courses/${courseId}/books`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
            },
            credentials: "include",
          }
        );

        if (!courseResponse.ok) {
          throw new Error("Failed to fetch course details");
        }

        const courseData = await courseResponse.json();
        setCourse(courseData.course);
        setError(null);
      } catch (err) {
        console.error("Error fetching course:", err);
        setError("Failed to load course details");
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex flex-col items-center gap-2">
            <Loader className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Loading course details...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error || !course) {
    return (
      <DashboardLayout>
        <div className="space-y-4">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Courses
          </Button>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error || "Course not found"}</AlertDescription>
          </Alert>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold tracking-tight">{course.name}</h1>
            <p className="text-muted-foreground mt-1">{course.description}</p>
          </div>
        </div>

        {/* Course Info */}
        <Card>
          <CardHeader>
            <CardTitle>Course Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Created</p>
                <p className="font-medium">
                  {new Date(course.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Last Updated</p>
                <p className="font-medium">
                  {new Date(course.updatedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Books Section */}
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold">Course Materials</h2>
            <p className="text-muted-foreground">
              {course.books.length} book
              {course.books.length !== 1 ? "s" : ""} available
            </p>
          </div>

          {course.books.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-muted-foreground"
                  >
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-semibold">No Books Added</h3>
                <p className="mt-2 text-center text-sm text-muted-foreground">
                  No study materials have been added to this course yet.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {course.books.map((book) => (
                <Card
                  key={book._id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardHeader>
                    <CardTitle className="text-lg line-clamp-2">
                      {book.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button
                      asChild
                      className="w-full"
                      onClick={() => window.open(book.pdfUrl, "_blank")}
                    >
                      <a
                        href={book.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="mr-2"
                        >
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="7 10 12 15 17 10" />
                          <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        Open PDF
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
