"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/dashboard-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

export default function CoursesPage() {
  // Course objects now follow the ICourse shape:
  // { _id: string, name: string, description: string, createdAt: Date, updatedAt: Date }
  const [activeCourses, setActiveCourses] = useState([
    {
      _id: "1",
      name: "Advanced Mathematics",
      description:
        "A deep dive into calculus, linear algebra and differential equations.",
      createdAt: new Date("2024-02-12"),
      updatedAt: new Date("2024-06-10"),
    },
    {
      _id: "2",
      name: "Physics Fundamentals",
      description: "Classical mechanics, waves and thermodynamics.",
      createdAt: new Date("2024-03-05"),
      updatedAt: new Date("2024-07-01"),
    },
    {
      _id: "3",
      name: "Organic Chemistry",
      description:
        "Structure, nomenclature and reactions of organic molecules.",
      createdAt: new Date("2024-01-20"),
      updatedAt: new Date("2024-05-22"),
    },
    {
      _id: "4",
      name: "Computer Science Principles",
      description:
        "Intro to algorithms, data structures and programming concepts.",
      createdAt: new Date("2024-04-15"),
      updatedAt: new Date("2024-08-02"),
    },
  ]);

  const [completedCourses, setCompletedCourses] = useState([
    {
      _id: "5",
      name: "Introduction to Biology",
      description: "Foundational concepts in cell biology and genetics.",
      createdAt: new Date("2023-08-10"),
      updatedAt: new Date("2023-12-01"),
    },
    {
      _id: "6",
      name: "Statistics and Probability",
      description: "Probability theory, distributions and inference basics.",
      createdAt: new Date("2023-09-05"),
      updatedAt: new Date("2023-11-20"),
    },
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const router = useRouter();

  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    const now = new Date();
    const newCourse = {
      _id: String(Date.now()),
      name: newName || "Untitled Course",
      description: newDescription || "",
      createdAt: now,
      updatedAt: now,
    };
    setActiveCourses((prev) => [newCourse, ...prev]);
    setNewName("");
    setNewDescription("");
    setDialogOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">My Courses</h2>
            <p className="text-muted-foreground">
              Manage and track your learning progress across all courses
            </p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="mr-2"
                >
                  <line x1="12" x2="12" y1="5" y2="19" />
                  <line x1="5" x2="19" y1="12" y2="12" />
                </svg>
                Add New Course
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Course</DialogTitle>
                <DialogDescription>
                  Create a new course. Only name and description are required
                  for now.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleAddCourse} className="space-y-4 py-2">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    rows={4}
                  />
                </div>

                <DialogFooter>
                  <Button type="submit">Create Course</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Courses
              </CardTitle>
              <div className="h-4 w-4 text-blue-600">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeCourses.length}</div>
              <p className="text-xs text-muted-foreground">
                Currently enrolled
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Completed Courses
              </CardTitle>
              <div className="h-4 w-4 text-green-600">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {completedCourses.length}
              </div>
              <p className="text-xs text-muted-foreground">
                Successfully finished
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Average Progress
              </CardTitle>
              <div className="h-4 w-4 text-purple-600">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9 11H1v3h8v3l3-4-3-4v2z" />
                  <path d="M22 12h-7v3h7a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1z" />
                  <path d="M15 9h7a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-7v-3z" />
                </svg>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">—</div>
              <p className="text-xs text-muted-foreground">
                Across all courses
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Study Hours</CardTitle>
              <div className="h-4 w-4 text-orange-600">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12,6 12,12 16,14" />
                </svg>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">147</div>
              <p className="text-xs text-muted-foreground">
                Total this semester
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Course Tabs */}
        <Tabs defaultValue="active" className="space-y-4">
          <TabsList>
            <TabsTrigger value="active">Active Courses</TabsTrigger>
            <TabsTrigger value="completed">Completed Courses</TabsTrigger>
            <TabsTrigger value="archived">Archived</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {activeCourses.map((course) => (
                <Card
                  key={course._id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between w-full">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{course.name}</CardTitle>
                        <CardDescription className="text-sm text-muted-foreground">
                          {course.description}
                        </CardDescription>
                      </div>
                      <div className="text-xs text-muted-foreground text-right">
                        <div>
                          Created: {course.createdAt.toLocaleDateString()}
                        </div>
                        <div>
                          Updated: {course.updatedAt.toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-2 pt-2">
                      <Button
                        size="sm"
                        className="flex-1"
                        onClick={() =>
                          router.push(`/dashboard/courses/${course._id}`)
                        }
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="mr-1"
                        >
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14,2 14,8 20,8" />
                        </svg>
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {completedCourses.map((course) => (
                <Card
                  key={course._id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between w-full">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{course.name}</CardTitle>
                        <CardDescription className="text-sm text-muted-foreground">
                          {course.description}
                        </CardDescription>
                      </div>
                      <div className="text-xs text-muted-foreground text-right">
                        <div>
                          Created: {course.createdAt.toLocaleDateString()}
                        </div>
                        <div>
                          Updated: {course.updatedAt.toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-2 pt-2">
                      <Button
                        size="sm"
                        className="flex-1"
                        onClick={() =>
                          router.push(`/dashboard/courses/${course._id}`)
                        }
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="mr-1"
                        >
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14,2 14,8 20,8" />
                        </svg>
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="archived" className="space-y-4">
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
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14,2 14,8 20,8" />
                    <line x1="16" x2="8" y1="13" y2="13" />
                    <line x1="16" x2="8" y1="17" y2="17" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-semibold">
                  No Archived Courses
                </h3>
                <p className="mt-2 text-center text-sm text-muted-foreground">
                  You don&apos;t have any archived courses yet. Completed
                  courses can be archived for better organization.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
