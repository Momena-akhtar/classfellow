"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useParams } from "next/navigation";
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

type IBook = {
  _id: string;
  name: string;
  pdfUrl: string;
  course: string;
  createdAt: Date;
  updatedAt: Date;
};

type ICourse = {
  _id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};

type ISessionMeta = {
  additionalLinks?: string[];
  referenceMaterials?: string[];
  aiSummary?: string;
  transcription?: string;
  keywords?: string[];
  duration?: number; // in minutes
};

type ISession = {
  _id: string;
  courseId: string;
  title: string;
  date: string; // ISO string
  meta?: ISessionMeta;
};

const mockCourses: ICourse[] = [
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
    description: "Structure, nomenclature and reactions of organic molecules.",
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
];

const mockBooks: IBook[] = [
  {
    _id: "b1",
    name: "Calculus Mastery (Vol. 1)",
    pdfUrl: "#", // Open in new tab, non-functional for now
    course: "1",
    createdAt: new Date("2024-02-13"),
    updatedAt: new Date("2024-02-13"),
  },
  {
    _id: "b2",
    name: "Physics Essentials PDF",
    pdfUrl: "#",
    course: "2",
    createdAt: new Date("2024-03-07"),
    updatedAt: new Date("2024-03-07"),
  },
];

const mockSessions: ISession[] = [
  {
    _id: "s1",
    courseId: "1",
    title: "Derivatives and Rate of Change",
    date: "2024-09-15T14:00:00Z",
    meta: { duration: 90, keywords: ["derivatives", "limits"] },
  },
  {
    _id: "s2",
    courseId: "1",
    title: "Integrals: Fundamentals",
    date: "2024-09-10T14:00:00Z",
    meta: { duration: 80, aiSummary: "Key points on Riemann sums" },
  },
  {
    _id: "s3",
    courseId: "2",
    title: "Kinematics and Motion",
    date: "2024-09-12T10:00:00Z",
    meta: { duration: 60 },
  },
  {
    _id: "s4",
    courseId: "2",
    title: "Thermodynamics Basics",
    date: "2024-09-20T10:00:00Z",
    meta: { duration: 110, transcription: "..." },
  },
  {
    _id: "s5",
    courseId: "3",
    title: "Hydrocarbons Overview",
    date: "2024-08-30T13:30:00Z",
    meta: { duration: 75 },
  },
];

function formatDateTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function CourseDetailsPage() {
  const params = useParams<{ id: string }>();
  const courseId = params?.id as string;

  const course = useMemo(
    () => mockCourses.find((c) => c._id === courseId),
    [courseId]
  );
  const book = useMemo(
    () => mockBooks.find((b) => b.course === courseId),
    [courseId]
  );
  const sessions = useMemo(() => {
    return mockSessions
      .filter((s) => s.courseId === courseId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [courseId]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              {course?.name || "Course"}
            </h2>
            <p className="text-muted-foreground">
              {course?.description || "View details and session history"}
            </p>
          </div>
          <div className="flex gap-2">
            <Link href="/dashboard/courses" className="inline-flex">
              <Button variant="outline">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="mr-2"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
                Back to Courses
              </Button>
            </Link>
          </div>
        </div>

        <Tabs defaultValue="details" className="space-y-4">
          <TabsList>
            <TabsTrigger value="details">Course Details</TabsTrigger>
            <TabsTrigger value="sessions">Sessions</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                  <CardDescription>About this course</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <div className="text-sm text-muted-foreground">Name</div>
                    <div className="text-base font-medium">{course?.name}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">
                      Description
                    </div>
                    <div className="text-base">{course?.description}</div>
                  </div>
                  <div className="flex gap-6 text-sm text-muted-foreground">
                    <div>
                      <span className="mr-1">Created:</span>
                      <span>
                        {course?.createdAt
                          ? course.createdAt.toLocaleDateString()
                          : "—"}
                      </span>
                    </div>
                    <div>
                      <span className="mr-1">Updated:</span>
                      <span>
                        {course?.updatedAt
                          ? course.updatedAt.toLocaleDateString()
                          : "—"}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Book</CardTitle>
                  <CardDescription>
                    Reference material linked to this course
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {book ? (
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">PDF</Badge>
                          <span className="font-medium">{book.name}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Added {book.createdAt.toLocaleDateString()}
                        </p>
                      </div>
                      <a
                        href={book.pdfUrl || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button size="sm" variant="outline">
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="mr-1"
                          >
                            <path d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                            <path d="M15 3h6v6" />
                            <path d="M10 14 21 3" />
                          </svg>
                          Open in new tab
                        </Button>
                      </a>
                    </div>
                  ) : (
                    <div className="text-sm text-muted-foreground">
                      No book linked yet.
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sessions" className="space-y-4">
            {sessions.length === 0 ? (
              <Card>
                <CardContent className="py-10 text-center text-sm text-muted-foreground">
                  No sessions found for this course.
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {sessions.map((session) => (
                  <Card
                    key={session._id}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-lg">
                            {session.title}
                          </CardTitle>
                          <CardDescription className="flex items-center gap-3">
                            <span className="flex items-center gap-1">
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                              >
                                <path d="M8 2v4" />
                                <path d="M16 2v4" />
                                <rect
                                  width="18"
                                  height="18"
                                  x="3"
                                  y="4"
                                  rx="2"
                                />
                                <path d="M3 10h18" />
                              </svg>
                              {formatDateTime(session.date)}
                            </span>
                            {session.meta?.duration ? (
                              <span className="flex items-center gap-1">
                                <svg
                                  width="14"
                                  height="14"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                >
                                  <path d="M12 2v12l3 3" />
                                  <circle cx="12" cy="12" r="10" />
                                </svg>
                                {session.meta.duration} min
                              </span>
                            ) : null}
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          {session.meta?.aiSummary && (
                            <Badge
                              className="bg-purple-100 text-purple-700"
                              variant="secondary"
                            >
                              AI Summary
                            </Badge>
                          )}
                          {session.meta?.transcription && (
                            <Badge
                              className="bg-green-100 text-green-700"
                              variant="secondary"
                            >
                              Transcription
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        {session.meta?.keywords?.length ? (
                          <div className="flex flex-wrap gap-2">
                            {session.meta.keywords.map((k) => (
                              <Badge key={k} variant="outline">
                                {k}
                              </Badge>
                            ))}
                          </div>
                        ) : (
                          <span>Keywords not available</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="mr-1"
                          >
                            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                          View
                        </Button>
                        <Button size="sm">
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="mr-1"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <polygon points="10,8 16,12 10,16 10,8" />
                          </svg>
                          Start Recording
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
