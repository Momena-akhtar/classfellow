"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { DashboardLayout } from "@/components/dashboard-layout";
import { useAuth } from "@/lib/auth-context";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

interface Session {
  id: string;
  title: string;
  course: string;
  date: string;
  duration: string;
  description: string;
  status: string;
}

export default function SessionsPage() {
  const { student } = useAuth();
  const router = useRouter();
  
  const [startOpen, setStartOpen] = useState(false);
  const [startCourse] = useState<string>("");
  const [allSessions, setAllSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      if (!student?._id) return;

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/sessions/user`,
          {
            credentials: "include",
          }
        );

        const data = await response.json();

        if (data.success && data.sessions) {
          setAllSessions(data.sessions);
        }
      } catch (error) {
        console.error("Error fetching sessions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, [student?._id]);

  const recentSessions = useMemo(() => {
    return allSessions.sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 5);
  }, [allSessions]);

  const allCourses = useMemo(() => {
    const courses = Array.from(
      new Set(allSessions.map((s) => s.course).filter(Boolean))
    ) as string[];
    courses.sort();
    return courses;
  }, [allSessions]);

  const [filterCourse, setFilterCourse] = useState<string>("all");
  const [filterQuery, setFilterQuery] = useState<string>("");
  const filteredAll = useMemo(() => {
    return allSessions.filter((s) => {
      const matchesCourse = filterCourse === "all" || s.course === filterCourse;
      const q = filterQuery.trim().toLowerCase();
      const matchesQuery =
        !q ||
        s.title.toLowerCase().includes(q) ||
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
                  <DialogDescription>
                    Select a course to begin your session.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-2 py-2">
                  <label className="text-sm">Course</label>
                  <Select>
                    <SelectTrigger id="select-type" className="w-full">
                      <SelectValue placeholder="Select Session Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        "Lecture",
                        "Lab",
                        "Study Group",
                        "Workshop",
                        "Discussion",
                        "Review",
                      ].map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <DialogFooter>
                  <Button
                    onClick={() => setStartOpen(false)}
                    disabled={!startCourse}
                  >
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
                Total Sessions
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
              <div className="text-2xl font-bold">{allSessions.length}</div>
              <p className="text-xs text-muted-foreground">Sessions completed</p>
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
              <div className="text-2xl font-bold">
                {allSessions.filter((s) => {
                  const sessionDate = new Date(s.date);
                  const now = new Date();
                  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                  return sessionDate >= weekAgo;
                }).length}
              </div>
              <p className="text-xs text-muted-foreground">
                Sessions this week
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
              <div className="text-2xl font-bold">
                {allSessions.reduce((total, s) => {
                  const durationStr = s.duration;
                  if (!durationStr) return total;
                  const hours = parseInt(durationStr.match(/\d+(?=h)/)?.[0] || "0");
                  const minutes = parseInt(durationStr.match(/\d+(?=m)/)?.[0] || "0");
                  return total + hours + minutes / 60;
                }, 0).toFixed(1)}
              </div>
              <p className="text-xs text-muted-foreground">Total duration</p>
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
              <div className="text-2xl font-bold">{allSessions.length}</div>
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
            {loading ? (
              <div className="text-center py-8">Loading sessions...</div>
            ) : allSessions.length === 0 ? (
              <div className="text-center py-8">No sessions found</div>
            ) : (
              <div className="grid gap-4">
                {recentSessions.map((session) => (
                  <Card
                    key={session.id}
                    className="hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => router.push(`/dashboard/sessions?id=${session.id}`)}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{session.course}</Badge>
                          </div>
                          <CardTitle className="text-lg">
                            {session.title}
                          </CardTitle>
                          {session.description ? (
                            <CardDescription>
                              {session.description}
                            </CardDescription>
                          ) : null}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          {session.duration ? (
                            <div className="flex items-center gap-1">
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
                              <span>{session.duration}</span>
                            </div>
                          ) : null}
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
                            View Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="all" className="space-y-4">
            <div className="flex flex-col gap-3 md:flex-row">
              <div className="flex items-center gap-2">
                <Input
                  className="border rounded-md h-9 px-3 text-sm bg-background w-full md:w-72"
                  placeholder="Search by keyword"
                  value={filterQuery}
                  onChange={(e) => setFilterQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Select value={filterCourse} onValueChange={setFilterCourse}>
                  <SelectTrigger id="filter-course" className="w-48">
                    <SelectValue placeholder="Filter by Course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Courses</SelectItem>
                    {allCourses.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-8">Loading sessions...</div>
            ) : filteredAll.length === 0 ? (
              <div className="text-center py-8">No sessions found</div>
            ) : (
              <div className="grid gap-4">
                {filteredAll.map((session) => (
                  <Card
                    key={session.id}
                    className="hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => router.push(`/dashboard/sessions?id=${session.id}`)}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            {session.course ? (
                              <Badge variant="outline">{session.course}</Badge>
                            ) : null}
                            {session.status === "completed" && (
                              <Badge
                                variant="secondary"
                                className="bg-green-100 text-green-700"
                              >
                                Completed
                              </Badge>
                            )}
                          </div>
                          <CardTitle className="text-lg">
                            {session.title}
                          </CardTitle>
                          <CardDescription className="flex items-center gap-4">
                            {session.description}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          {session.duration ? (
                            <div className="flex items-center gap-1">
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
                              <span>{session.duration}</span>
                            </div>
                          ) : null}
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
                            View Details
                          </Button>
                        </div>
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
