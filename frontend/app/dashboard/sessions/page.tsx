"use client";

import { useMemo, useState } from "react";
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
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function SessionsPage() {
  const [startOpen, setStartOpen] = useState(false);
  const [startCourse, setStartCourse] = useState<string>("");
  const upcomingSessions = [
    {
      id: 1,
      title: "Advanced Calculus - Derivatives",
      course: "Advanced Mathematics",
      instructor: "Dr. Sarah Johnson",
      date: "2024-09-07",
      time: "2:00 PM - 3:30 PM",
      duration: "1h 30m",
      type: "Lecture",
      status: "scheduled",
      color: "blue",
      location: "Room 201 / Online",
    },
    {
      id: 2,
      title: "Quantum Physics Lab",
      course: "Physics Fundamentals",
      instructor: "Prof. Michael Chen",
      date: "2024-09-08",
      time: "10:00 AM - 12:00 PM",
      duration: "2h",
      type: "Lab",
      status: "scheduled",
      color: "green",
      location: "Physics Lab A",
    },
    {
      id: 3,
      title: "Organic Reactions Study Group",
      course: "Organic Chemistry",
      instructor: "Dr. Emily Rodriguez",
      date: "2024-09-09",
      time: "1:00 PM - 2:30 PM",
      duration: "1h 30m",
      type: "Study Group",
      status: "scheduled",
      color: "purple",
      location: "Library Room 3",
    },
    {
      id: 4,
      title: "Algorithm Analysis Workshop",
      course: "Computer Science Principles",
      instructor: "Prof. David Kim",
      date: "2024-09-10",
      time: "3:00 PM - 4:30 PM",
      duration: "1h 30m",
      type: "Workshop",
      status: "scheduled",
      color: "orange",
      location: "Computer Lab 1",
    },
  ];

  const recentSessions = [
    {
      id: 5,
      title: "Introduction to Integrals",
      course: "Advanced Mathematics",
      instructor: "Dr. Sarah Johnson",
      date: "2024-09-05",
      time: "2:00 PM - 3:30 PM",
      duration: "1h 30m",
      type: "Lecture",
      status: "completed",
      recording: true,
      notes: true,
      summary: true,
    },
    {
      id: 6,
      title: "Wave Mechanics Discussion",
      course: "Physics Fundamentals",
      instructor: "Prof. Michael Chen",
      date: "2024-09-04",
      time: "10:00 AM - 11:30 AM",
      duration: "1h 30m",
      type: "Discussion",
      status: "completed",
      recording: true,
      notes: false,
      summary: true,
    },
    {
      id: 7,
      title: "Chemical Bonding Review",
      course: "Organic Chemistry",
      instructor: "Dr. Emily Rodriguez",
      date: "2024-09-03",
      time: "1:00 PM - 2:00 PM",
      duration: "1h",
      type: "Review",
      status: "completed",
      recording: false,
      notes: true,
      summary: false,
    },
  ];

  const getTypeColor = (type: string) => {
    const typeColors = {
      Lecture: "bg-blue-100 text-blue-700",
      Lab: "bg-green-100 text-green-700",
      "Study Group": "bg-purple-100 text-purple-700",
      Workshop: "bg-orange-100 text-orange-700",
      Discussion: "bg-indigo-100 text-indigo-700",
      Review: "bg-red-100 text-red-700",
    };
    return (
      typeColors[type as keyof typeof typeColors] || "bg-gray-100 text-gray-700"
    );
  };

  const allCourses = useMemo(() => {
    const set = new Set<string>();
    [...upcomingSessions, ...recentSessions].forEach((s) => set.add(s.course));
    return Array.from(set);
  }, []);

  const allSessions = useMemo(() => [...recentSessions, ...upcomingSessions], []);
  const [filterCourse, setFilterCourse] = useState<string>("all");
  const [filterQuery, setFilterQuery] = useState<string>("");
  const filteredAll = useMemo(() => {
    return allSessions.filter((s) => {
      const matchesCourse = filterCourse === "all" || s.course === filterCourse;
      const q = filterQuery.trim().toLowerCase();
      const matchesQuery =
        !q ||
        s.title.toLowerCase().includes(q) ||
        (s.instructor || "").toLowerCase().includes(q) ||
        (s.type || "").toLowerCase().includes(q) ||
        (s.course || "").toLowerCase().includes(q);
      return matchesCourse && matchesQuery;
    });
  }, [allSessions, filterCourse, filterQuery]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Study Sessions
            </h2>
            <p className="text-muted-foreground">
              Manage your scheduled sessions and review past recordings
            </p>
          </div>
          <div className="flex gap-2">
            <Dialog open={startOpen} onOpenChange={setStartOpen}>
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
                    <circle cx="12" cy="12" r="10" />
                    <polygon points="10,8 16,12 10,16 10,8" />
                  </svg>
                  Start Session
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Start a Session</DialogTitle>
                  <DialogDescription>Select a course to begin your session.</DialogDescription>
                </DialogHeader>
                <div className="space-y-2 py-2">
                  <label className="text-sm">Course</label>
                  <select
                    className="w-full border rounded-md h-9 px-3 text-sm bg-background"
                    value={startCourse}
                    onChange={(e) => setStartCourse(e.target.value)}
                  >
                    <option value="" disabled>
                      Select a course
                    </option>
                    {allCourses.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <DialogFooter>
                  <Button onClick={() => setStartOpen(false)} disabled={!startCourse}>
                    Start
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Today&apos;s Sessions
              </CardTitle>
              <div className="h-4 w-4 text-blue-600">
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
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">
                1 completed, 1 upcoming
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Week</CardTitle>
              <div className="h-4 w-4 text-green-600">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M8 2v4" />
                  <path d="M16 2v4" />
                  <rect width="18" height="18" x="3" y="4" rx="2" />
                  <path d="M3 10h18" />
                </svg>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground">
                4 remaining this week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
              <div className="h-4 w-4 text-purple-600">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 2v12l3 3" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24.5</div>
              <p className="text-xs text-muted-foreground">Hours this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recordings</CardTitle>
              <div className="h-4 w-4 text-orange-600">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polygon points="10,8 16,12 10,16 10,8" />
                </svg>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-muted-foreground">
                Available recordings
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Sessions Tabs */}
        <Tabs defaultValue="recent" className="space-y-4">
          <TabsList>
            <TabsTrigger value="recent">Recent Sessions</TabsTrigger>
            <TabsTrigger value="all">All Sessions</TabsTrigger>
          </TabsList>

          {/* Upcoming tab removed */}

          <TabsContent value="recent" className="space-y-4">
            <div className="grid gap-4">
              {recentSessions.map((session) => (
                <Card
                  key={session.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge className={getTypeColor(session.type)}>
                            {session.type}
                          </Badge>
                          <Badge variant="outline">{session.course}</Badge>
                          <Badge variant="secondary" className="bg-green-100 text-green-700">Completed</Badge>
                        </div>
                        <CardTitle className="text-lg">{session.title}</CardTitle>
                        {session.instructor ? (
                          <CardDescription>{session.instructor}</CardDescription>
                        ) : null}
                      </div>
                      
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        {session.duration ? (
                          <div className="flex items-center gap-1">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M12 2v12l3 3" />
                              <circle cx="12" cy="12" r="10" />
                            </svg>
                            <span>{session.duration}</span>
                          </div>
                        ) : null}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 mr-2">
                          {session.recording && (
                            <div className="flex items-center gap-1 text-xs text-green-600">
                              <svg
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                              >
                                <circle cx="12" cy="12" r="10" />
                                <polygon points="10,8 16,12 10,16 10,8" />
                              </svg>
                              Recording
                            </div>
                          )}
                          {session.notes && (
                            <div className="flex items-center gap-1 text-xs text-blue-600">
                              <svg
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                              >
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14,2 14,8 20,8" />
                              </svg>
                              Notes
                            </div>
                          )}
                          {session.summary && (
                            <div className="flex items-center gap-1 text-xs text-purple-600">
                              <svg
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                              >
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14,2 14,8 20,8" />
                                <line x1="16" x2="8" y1="13" y2="13" />
                                <line x1="16" x2="8" y1="17" y2="17" />
                              </svg>
                              Summary
                            </div>
                          )}
                        </div>
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
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="all" className="space-y-4">
            <Card>
              <CardContent className="py-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-2">
                    <label className="text-sm">Course</label>
                    <select
                      className="border rounded-md h-9 px-3 text-sm bg-background"
                      value={filterCourse}
                      onChange={(e) => setFilterCourse(e.target.value)}
                    >
                      <option value="all">All Courses</option>
                      {allCourses.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground">
                      <circle cx="11" cy="11" r="8" />
                      <path d="M21 21l-4.35-4.35" />
                    </svg>
                    <input
                      className="border rounded-md h-9 px-3 text-sm bg-background w-full md:w-72"
                      placeholder="Search by keyword"
                      value={filterQuery}
                      onChange={(e) => setFilterQuery(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4">
              {filteredAll.map((session) => (
                <Card key={session.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          {session.type ? (
                            <Badge className={getTypeColor(session.type)}>{session.type}</Badge>
                          ) : null}
                          {session.course ? <Badge variant="outline">{session.course}</Badge> : null}
                          {session.status === "completed" && (
                            <Badge variant="secondary" className="bg-green-100 text-green-700">Completed</Badge>
                          )}
                        </div>
                        <CardTitle className="text-lg">{session.title}</CardTitle>
                        <CardDescription className="flex items-center gap-4">
                          {session.instructor ? <span>{session.instructor}</span> : null}
                          {session.location ? (<><span>•</span><span>{session.location}</span></>) : null}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        {session.duration ? (
                          <div className="flex items-center gap-1">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M12 2v12l3 3" />
                              <circle cx="12" cy="12" r="10" />
                            </svg>
                            <span>{session.duration}</span>
                          </div>
                        ) : null}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-1">
                            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
