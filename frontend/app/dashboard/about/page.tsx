import { DashboardLayout } from "@/components/dashboard-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function AboutPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            About ClassFellow
          </h2>
          <p className="text-muted-foreground">
            Your AI-powered study companion for recording, summarizing, and
            organizing lectures and references.
          </p>
        </div>

        {/* Main About Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                </svg>
              </div>
              What is ClassFellow?
            </CardTitle>
            <CardDescription>
              Discover how ClassFellow revolutionizes your learning experience
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              ClassFellow is an innovative AI-powered platform designed to
              enhance your academic journey. We understand that effective
              learning requires more than just attending lectures - it demands
              smart organization, insightful analysis, and personalized study
              strategies.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Our platform leverages cutting-edge artificial intelligence to
              transform how you interact with educational content, making
              studying more efficient, engaging, and effective than ever before.
            </p>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600 mb-2">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 1v6m0 6v6" />
                  <path d="m21 12-6-3-6 3-6-3" />
                </svg>
              </div>
              <CardTitle className="text-lg">Smart Recording</CardTitle>
              <CardDescription>
                Capture lectures with AI-enhanced audio processing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Record your lectures with crystal-clear quality and automatic
                noise reduction. Our AI identifies key concepts and important
                moments in real-time.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-600 mb-2">
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
                </svg>
              </div>
              <CardTitle className="text-lg">AI Summarization</CardTitle>
              <CardDescription>
                Get intelligent summaries of your lectures and notes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Transform hours of recordings into concise, structured
                summaries. Extract key points, formulas, and important concepts
                automatically.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 text-purple-600 mb-2">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
              </div>
              <CardTitle className="text-lg">Smart Organization</CardTitle>
              <CardDescription>
                Keep your study materials perfectly organized
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Automatically categorize and tag your content. Create custom
                study paths and connect related materials across different
                subjects.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 text-orange-600 mb-2">
                <svg
                  width="20"
                  height="20"
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
              <CardTitle className="text-lg">Progress Tracking</CardTitle>
              <CardDescription>
                Monitor your learning progress and achievements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Track your study habits, completion rates, and learning
                milestones. Get insights into your most productive study
                patterns.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100 text-red-600 mb-2">
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
              <CardTitle className="text-lg">Session Management</CardTitle>
              <CardDescription>
                Schedule and manage your study sessions effectively
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Plan your study time with intelligent scheduling. Set reminders,
                track session duration, and optimize your learning schedule.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 mb-2">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <CardTitle className="text-lg">Multi-Platform Sync</CardTitle>
              <CardDescription>
                Access your content anywhere, anytime
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Seamlessly sync your data across all devices. Study on your
                phone, tablet, or computer with real-time synchronization.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Mission & Vision */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                To democratize quality education by providing students with
                intelligent tools that enhance their learning experience. We
                believe every student deserves access to personalized,
                AI-powered study assistance that adapts to their unique learning
                style.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                Our Vision
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                To create a world where learning is limitless, efficient, and
                accessible to all. We envision a future where AI and human
                intelligence work together seamlessly to unlock every student's
                full potential.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Technology Stack */}
        <Card>
          <CardHeader>
            <CardTitle>Built with Cutting-Edge Technology</CardTitle>
            <CardDescription>
              The technologies that power ClassFellow's intelligent features
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Artificial Intelligence</Badge>
              <Badge variant="secondary">Machine Learning</Badge>
              <Badge variant="secondary">Natural Language Processing</Badge>
              <Badge variant="secondary">Speech Recognition</Badge>
              <Badge variant="secondary">Cloud Computing</Badge>
              <Badge variant="secondary">Real-time Sync</Badge>
              <Badge variant="secondary">Advanced Analytics</Badge>
              <Badge variant="secondary">Secure Storage</Badge>
            </div>
            <Separator className="my-4" />
            <p className="text-sm text-muted-foreground">
              Our platform is built on a robust, scalable architecture that
              ensures reliability, security, and performance. We continuously
              update our technology stack to provide you with the best possible
              learning experience.
            </p>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Get in Touch</CardTitle>
            <CardDescription>
              Have questions or feedback? We'd love to hear from you.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium">Email Support</p>
                  <p className="text-sm text-muted-foreground">
                    support@classfellow.com
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium">Live Chat</p>
                  <p className="text-sm text-muted-foreground">
                    Available 24/7
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
                  <svg
                    width="16"
                    height="16"
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
                <div>
                  <p className="text-sm font-medium">Documentation</p>
                  <p className="text-sm text-muted-foreground">
                    help.classfellow.com
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
