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

interface SessionMeta{
  additionalLinks: string[];
  referenceMaterials: string[];
  aiSummary: string;
  transcription: string;
  keywords: string[];
  duration: number;
}
interface Session {
  _id: string;
  course: string;
  student: string;
  started: string;
  ended: string;
  isActive: boolean;
  meta: SessionMeta;
  duration: number;
  createdAt: string;
  updatedAt: string;
}

interface Course {
  _id: string;
  name: string;
}

export default function SessionsPage() {
  const { student } = useAuth();
  const router = useRouter();
  
  const [startOpen, setStartOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [isCreating, setIsCreating] = useState(false);
  const [allSessions, setAllSessions] = useState<Session[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!student?._id) return;

      try {
        // Fetch sessions
        const sessionsResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/sessions/user`,
          {
            credentials: "include",
          }
        );

        const sessionsData = await sessionsResponse.json();

        if (sessionsData.success && sessionsData.sessions) {
          setAllSessions(sessionsData.sessions);
        }

        // Fetch courses
        if (student.courses && student.courses.length > 0) {
          const coursesResponse = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/courses`,
            {
              credentials: "include",
            }
          );

          const coursesData = await coursesResponse.json();

          if (coursesData.success && coursesData.courses) {
            // Filter courses to only show the ones the student is enrolled in
            const enrolledCourses = coursesData.courses.filter(
              (course: Course) => student.courses.includes(course._id)
            );
            setCourses(enrolledCourses);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [student?._id, student?.courses]);

  const handleStartSession = async () => {
    if (!selectedCourse || !student?._id) return;

    setIsCreating(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/sessions/start`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            courseId: selectedCourse,
            studentId: student._id,
          }),
        }
      );

      const data = await response.json();

      if (data.success && data.sessionId) {
        setStartOpen(false);
        setSelectedCourse("");
        router.push(`/dashboard/sessions/record?id=${data.sessionId}`);
      } else {
        console.error("Failed to create session:", data.message);
      }
    } catch (error) {
      console.error("Error creating session:", error);
    } finally {
      setIsCreating(false);
    }
  };

  const recentSessions = useMemo(() => {
    return allSessions.sort((a, b) => (new Date(a.started) < new Date(b.started) ? 1 : -1)).slice(0, 5);
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
        (s.meta?.transcription || "").toLowerCase().includes(q) ||
        (s.course || "").toLowerCase().includes(q);
      return matchesCourse && matchesQuery;
    });
  }, [allSessions, filterCourse, filterQuery]);

  const formatDuration = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m ${seconds}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    }
    return `${seconds}s`;
  };

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
                  <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                    <SelectTrigger id="select-type" className="w-full">
                      <SelectValue placeholder="Select a Course" />
                    </SelectTrigger>
                    <SelectContent>
                      {courses && courses.length > 0 ? (
                        courses.map((course) => (
                          <SelectItem key={course._id} value={course._id}>
                            {course.name}
                          </SelectItem>
                        ))
                      ) : (
                        <div className="p-2 text-sm text-muted-foreground">
                          No courses available
                        </div>
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <DialogFooter>
                  <Button
                    onClick={handleStartSession}
                    disabled={!selectedCourse || isCreating}
                  >
                    {isCreating ? "Creating..." : "Start"}
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
                  const sessionDate = new Date(s.started);
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
                  const durationMs = s.duration || 0;
                  const hours = durationMs / (1000 * 60 * 60);
                  return total + hours;
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
          <TabsContent value="recent" className="space-y-4">
            {loading ? (
              <div className="text-center py-8">Loading sessions...</div>
            ) : allSessions.length === 0 ? (
              <div className="text-center py-8">No sessions found</div>
            ) : (
              <div className="grid gap-4">
                {recentSessions.map((session) => {
                  const startDate = new Date(session.started);
                  const endDate = new Date(session.ended);
                  const courseName = typeof session.course === 'string' ? session.course : (session.course as any)?.name || 'Unknown Course';
                  const durationMinutes = Math.floor((session.duration || 0) / 1000 / 60);
                  const durationHours = Math.floor(durationMinutes / 60);
                  const remainingMinutes = durationMinutes % 60;
                  const durationText = durationHours > 0 
                    ? `${durationHours}h ${remainingMinutes}m`
                    : `${remainingMinutes}m`;

                  return (
                    <Card
                      key={session._id}
                      className="hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => router.push(`/dashboard/sessions?id=${session._id}`)}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">
                                {startDate.toLocaleDateString('en-US', { 
                                  month: 'short', 
                                  day: 'numeric', 
                                  year: 'numeric'
                                })}
                              </Badge>
                              {!session.isActive && (
                                <Badge
                                  variant="secondary"
                                  className="bg-green-100 text-green-700"
                                >
                                  Completed
                                </Badge>
                              )}
                            </div>
                            <CardTitle className="text-lg">
                              {courseName}
                            </CardTitle>
                            {session.meta?.transcription && (
                              <CardDescription>
                                <span className="text-green-600 ">Transcription: </span>{session.meta.transcription}
                              </CardDescription>
                            )}
                            {session.meta?.aiSummary && (
                              <CardDescription className="mt-1 border-t pt-1 ">
                                <span className="text-green-600">AI Summary: </span>{session.meta.aiSummary}
                              </CardDescription>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
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
                              <span>{formatDuration(session.meta.duration || 0)}</span>
                            </div>
                            {session.meta?.keywords && session.meta.keywords.length > 0 && (
                              <div className="flex items-center gap-1">
                                <svg
                                  width="14"
                                  height="14"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                >
                                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                </svg>
                                <span>{session.meta.keywords.length} keywords</span>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedSession(session);
                                setDetailsOpen(true);
                              }}
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
                                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                <circle cx="12" cy="12" r="3" />
                              </svg>
                              View Details
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
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
                {filteredAll.map((session) => {
                  const startDate = new Date(session.started);
                  const courseName = typeof session.course === 'string' ? session.course : (session.course as any)?.name || 'Unknown Course';
                  const durationMinutes = Math.floor((session.meta.duration || 0) / 1000 / 60);
                  const durationHours = Math.floor(durationMinutes / 60);
                  const remainingMinutes = durationMinutes % 60;
                  const durationText = durationHours > 0 
                    ? `${durationHours}h ${remainingMinutes}m`
                    : `${remainingMinutes}m`;

                  return (
                    <Card
                      key={session._id}
                      className="hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => router.push(`/dashboard/sessions?id=${session._id}`)}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">
                                {startDate.toLocaleDateString('en-US', { 
                                  month: 'short', 
                                  day: 'numeric', 
                                  year: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </Badge>
                              {!session.isActive && (
                                <Badge
                                  variant="secondary"
                                  className="bg-green-100 text-green-700"
                                >
                                  Completed
                                </Badge>
                              )}
                            </div>
                            <CardTitle className="text-lg">
                              {courseName}
                            </CardTitle>
                            {session.meta?.transcription && (
                              <CardDescription>
                                {session.meta.transcription}
                              </CardDescription>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
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
                              <span>{formatDuration(session.meta.duration || 0)}</span>
                            </div>
                            {session.meta?.keywords && session.meta.keywords.length > 0 && (
                              <div className="flex items-center gap-1">
                                <svg
                                  width="14"
                                  height="14"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                >
                                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                </svg>
                                <span>{session.meta.keywords.length} keywords</span>
                              </div>
                            )}
                            {session.meta?.referenceMaterials && session.meta.referenceMaterials.length > 0 && (
                              <div className="flex items-center gap-1">
                                <svg
                                  width="14"
                                  height="14"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                >
                                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                                </svg>
                                <span>{session.meta.referenceMaterials.length} materials</span>
                              </div>
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
                              View Details
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Session Details Dialog */}
        <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto scrollbar-hide">
            <style>{`
              .scrollbar-hide::-webkit-scrollbar {
                display: none;
              }
              .scrollbar-hide {
                -ms-overflow-style: none;
                scrollbar-width: none;
              }
            `}</style>
            <DialogHeader>
              <DialogTitle>Session Details</DialogTitle>
              <DialogDescription>
                Complete information about this session
              </DialogDescription>
            </DialogHeader>
            {selectedSession && (
              <div className="space-y-4">
                {/* Course Info */}
                <div className="border-b pb-4">
                  <h3 className="font-semibold mb-2">Course</h3>
                  <p className="text-sm">
                    {typeof selectedSession.course === 'string' 
                      ? selectedSession.course 
                      : (selectedSession.course as any)?.name || 'Unknown Course'}
                  </p>
                </div>

                {/* Time Info */}
                <div className="border-b pb-4">
                  <h3 className="font-semibold mb-2">Session Time</h3>
                  <div className="text-sm space-y-1">
                    <p><span className="text-muted-foreground">Started:</span> {new Date(selectedSession.started).toLocaleString()}</p>
                    <p><span className="text-muted-foreground">Ended:</span> {new Date(selectedSession.ended).toLocaleString()}</p>
                    <p><span className="text-muted-foreground">Duration:</span> {formatDuration(selectedSession.meta.duration || 0)}</p>
                  </div>
                </div>

                {/* Transcription */}
                <div className="border-b pb-4">
                  <h3 className="font-semibold mb-2">Transcription</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedSession.meta?.transcription || 'No transcription available'}
                  </p>
                </div>

                {/* AI Summary */}
                <div className="border-b pb-4">
                  <h3 className="font-semibold mb-2">AI Summary</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedSession.meta?.aiSummary ? (
                      typeof selectedSession.meta.aiSummary === 'string' && selectedSession.meta.aiSummary !== '{}' 
                        ? selectedSession.meta.aiSummary 
                        : 'No summary generated yet'
                    ) : 'No summary available'}
                  </p>
                </div>

                {/* Keywords */}
                {selectedSession.meta?.keywords && selectedSession.meta.keywords.length > 0 && (
                  <div className="border-b pb-4">
                    <h3 className="font-semibold mb-2">Keywords</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedSession.meta.keywords.map((keyword, idx) => (
                        <Badge key={idx} variant="secondary">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Reference Materials */}
                {selectedSession.meta?.referenceMaterials && selectedSession.meta.referenceMaterials.length > 0 && (
                  <div className="border-b pb-4">
                    <h3 className="font-semibold mb-2">Reference Materials</h3>
                    <ul className="text-sm space-y-1">
                      {selectedSession.meta.referenceMaterials.map((material, idx) => (
                        <li key={idx} className="text-muted-foreground">• {material}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Additional Links */}
                {selectedSession.meta?.additionalLinks && selectedSession.meta.additionalLinks.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2">Additional Links</h3>
                    <ul className="text-sm space-y-1">
                      {selectedSession.meta.additionalLinks.map((link, idx) => (
                        <li key={idx}>
                          <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            {link}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setDetailsOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
