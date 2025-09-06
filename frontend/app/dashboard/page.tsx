import { DashboardLayout } from "@/components/dashboard-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Welcome back!</h2>
          <p className="text-muted-foreground">
            Here's what's happening with your studies today.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Courses
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                +2 from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Sessions
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M8 2v4" />
                <path d="M16 2v4" />
                <rect width="18" height="18" x="3" y="4" rx="2" />
                <path d="M3 10h18" />
                <path d="M8 14h.01" />
                <path d="M12 14h.01" />
                <path d="M16 14h.01" />
                <path d="M8 18h.01" />
                <path d="M12 18h.01" />
                <path d="M16 18h.01" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">2 scheduled today</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Study Hours</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12,6 12,12 16,14" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24.5</div>
              <p className="text-xs text-muted-foreground">
                +4.2 from last week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Completion Rate
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87%</div>
              <p className="text-xs text-muted-foreground">
                +5% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activities and Progress */}
        <div className="grid gap-4 lg:grid-cols-2">
          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>
                Your latest study sessions and course progress
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                  </svg>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">
                    Completed Mathematics Lecture 5
                  </p>
                  <p className="text-sm text-muted-foreground">2 hours ago</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">
                    Finished Physics Assignment
                  </p>
                  <p className="text-sm text-muted-foreground">5 hours ago</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12,6 12,12 16,14" />
                  </svg>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">
                    Study Session: Chemistry
                  </p>
                  <p className="text-sm text-muted-foreground">1 day ago</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Course Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Course Progress</CardTitle>
              <CardDescription>
                Track your progress across all courses
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Advanced Mathematics</p>
                  <Badge variant="secondary">85%</Badge>
                </div>
                <Progress value={85} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Physics Fundamentals</p>
                  <Badge variant="secondary">72%</Badge>
                </div>
                <Progress value={72} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Organic Chemistry</p>
                  <Badge variant="secondary">91%</Badge>
                </div>
                <Progress value={91} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Computer Science</p>
                  <Badge variant="secondary">64%</Badge>
                </div>
                <Progress value={64} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Frequently used actions to help you get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col items-center p-4 border rounded-lg cursor-pointer hover:bg-accent transition-colors">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600 mb-3">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polygon points="10,8 16,12 10,16 10,8" />
                  </svg>
                </div>
                <p className="text-sm font-medium">Start Recording</p>
                <p className="text-xs text-muted-foreground text-center">
                  Record a new lecture
                </p>
              </div>

              <div className="flex flex-col items-center p-4 border rounded-lg cursor-pointer hover:bg-accent transition-colors">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-600 mb-3">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                    <circle cx="12" cy="13" r="3" />
                  </svg>
                </div>
                <p className="text-sm font-medium">Upload Notes</p>
                <p className="text-xs text-muted-foreground text-center">
                  Add study materials
                </p>
              </div>

              <div className="flex flex-col items-center p-4 border rounded-lg cursor-pointer hover:bg-accent transition-colors">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 text-purple-600 mb-3">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M8 2v4" />
                    <path d="M16 2v4" />
                    <rect width="18" height="18" x="3" y="4" rx="2" />
                    <path d="M3 10h18" />
                    <path d="M8 14h.01" />
                    <path d="M12 14h.01" />
                    <path d="M16 14h.01" />
                  </svg>
                </div>
                <p className="text-sm font-medium">Schedule Session</p>
                <p className="text-xs text-muted-foreground text-center">
                  Plan your study time
                </p>
              </div>

              <div className="flex flex-col items-center p-4 border rounded-lg cursor-pointer hover:bg-accent transition-colors">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 text-orange-600 mb-3">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14,2 14,8 20,8" />
                    <line x1="16" x2="8" y1="13" y2="13" />
                    <line x1="16" x2="8" y1="17" y2="17" />
                    <polyline points="10,9 9,9 8,9" />
                  </svg>
                </div>
                <p className="text-sm font-medium">View Reports</p>
                <p className="text-xs text-muted-foreground text-center">
                  Check your progress
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
