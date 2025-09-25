import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import LandingHeader from "@/components/landing-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import {
  FileText,
  Users,
  Zap,
  Play,
  Mail,
  Phone,
  MapPin,
  Twitter,
  Github,
  Linkedin,
  Facebook,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <LandingHeader />

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center pt-24 overflow-hidden">
        {/* Abstract outlined side squares with central spotlight */}
        <div className="pointer-events-none absolute inset-0">
          {/* global grid pattern */}
          <div className="absolute inset-0 bg-grid-white/10 bg-[size:18px_18px] opacity-40 [mask-image:radial-gradient(ellipse_at_center,white,transparent_68%)]"></div>

          {/* left outlined squares cluster fading into center */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[300px] md:w-[380px] lg:w-[440px] opacity-80 [mask-image:linear-gradient(to_right,white,transparent)]">
            <div className="grid grid-cols-6 gap-5 rotate-[-6deg]">
              {Array.from({ length: 54 }).map((_, i) => (
                <div
                  key={`l-${i}`}
                  className={`w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 rounded-sm border-2 bg-transparent border-primary/80 shadow-[0_0_10px_0_rgba(0,0,0,0.05)] ${
                    i % 5 === 0
                      ? "translate-y-2 rotate-3"
                      : i % 5 === 1
                      ? "-translate-y-3 -rotate-2"
                      : i % 5 === 2
                      ? "translate-x-2 rotate-1"
                      : i % 5 === 3
                      ? "-translate-x-2 -rotate-1"
                      : "translate-y-1"
                  } ${i % 7 === 0 ? "border-primary" : ""}`}
                ></div>
              ))}
            </div>
          </div>

          {/* right outlined squares cluster fading into center */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[300px] md:w-[380px] lg:w-[440px] opacity-80 [mask-image:linear-gradient(to_left,white,transparent)]">
            <div className="grid grid-cols-6 gap-5 rotate-[6deg] justify-items-end">
              {Array.from({ length: 54 }).map((_, i) => (
                <div
                  key={`r-${i}`}
                  className={`w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 rounded-sm border-2 bg-transparent border-primary/80 shadow-[0_0_10px_0_rgba(0,0,0,0.05)] ${
                    i % 5 === 0
                      ? "translate-y-2 -rotate-2"
                      : i % 5 === 1
                      ? "-translate-y-3 rotate-2"
                      : i % 5 === 2
                      ? "-translate-x-2 rotate-1"
                      : i % 5 === 3
                      ? "translate-x-2 -rotate-1"
                      : "translate-y-1"
                  } ${i % 7 === 0 ? "border-primary" : ""}`}
                ></div>
              ))}
            </div>
          </div>

          {/* soft center glow to focus text */}
          <div className="absolute inset-0 [background:radial-gradient(60%_38%_at_50%_42%,rgba(255,255,255,0.22),transparent_62%)] dark:[background:radial-gradient(60%_38%_at_50%_42%,rgba(255,255,255,0.09),transparent_62%)]"></div>
        </div>

        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-semibold leading-tight">
                It's like a
                <span className="mx-2 bg-gradient-to-r from-primary via-secondary to-primary/70 bg-clip-text text-transparent">
                  genius friend
                </span>
                who never stops paying attention.
              </h1>
              <p className="text-lg lg:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Real-time AI that catches everything while you zone out.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="w-[200px] text-lg px-8 py-6 rounded-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground border border-primary/30 shadow-sm hover:shadow-md hover:brightness-105 focus-visible:ring-2 focus-visible:ring-primary/30 transition-all"
                asChild
              >
                <Link href="/register">Start Learning</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-[200px] text-lg px-8 py-6 hidden sm:flex rounded-full"
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3 pt-4 justify-center">
              <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                <FileText className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">AI Summaries</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">References</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Recordings</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 bg-primary relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px] [mask-image:radial-gradient(white,transparent_70%)]"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
              Everything you need for academic success
            </h2>
            <p className="text-xl lg:text-2xl text-primary-foreground/80 max-w-4xl mx-auto leading-relaxed">
              Streamline your study process with our comprehensive suite of
              AI-powered tools designed to transform your learning experience
            </p>
          </div>

          {/* Horizontal Cards Layout */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="border-2 border-primary-foreground/20 bg-primary-foreground/5 backdrop-blur-sm hover:bg-primary-foreground/10 transition-all duration-300 h-full">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary-foreground rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <FileText className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-2xl lg:text-3xl text-primary-foreground mb-4">
                  Smart Recording
                </CardTitle>
                <CardDescription className="text-lg text-primary-foreground/70 leading-relaxed">
                  Record lectures with AI-powered transcription and automatic
                  note generation for effortless learning
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary-foreground/20 bg-primary-foreground/5 backdrop-blur-sm hover:bg-primary-foreground/10 transition-all duration-300 h-full">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary-foreground rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <Zap className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-2xl lg:text-3xl text-primary-foreground mb-4">
                  Quick Summaries
                </CardTitle>
                <CardDescription className="text-lg text-primary-foreground/70 leading-relaxed">
                  Generate concise, structured summaries from lengthy academic
                  content in seconds using advanced AI
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary-foreground/20 bg-primary-foreground/5 backdrop-blur-sm hover:bg-primary-foreground/10 transition-all duration-300 h-full">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary-foreground rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-2xl lg:text-3xl text-primary-foreground mb-4">
                  Reference Tracking
                </CardTitle>
                <CardDescription className="text-lg text-primary-foreground/70 leading-relaxed">
                  Organize and catalog all your academic references in one
                  centralized, searchable location
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section id="how-it-works" className="py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-4xl lg:text-6xl font-bold text-foreground">
              Ready to transform your
              <span className="text-primary block lg:inline">
                {" "}
                study experience?
              </span>
            </h2>
            <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Join thousands of students who are already using ClassFellow to
              excel in their academic journey and achieve better results.
            </p>
            <div className="pt-8">
              <Button size="lg" className="text-xl px-12 py-8 rounded-full" asChild>
                <Link href="/register">Get Started Free</Link>
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">10k+</div>
                <div className="text-muted-foreground">Active Students</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">50k+</div>
                <div className="text-muted-foreground">Notes Generated</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">99%</div>
                <div className="text-muted-foreground">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section (footer) */}
      <footer id="contact" className="border-t bg-muted/30">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Image
                  src="/images/logo.svg"
                  alt="ClassFellow Logo"
                  width={32}
                  height={32}
                  className="w-8 h-8"
                />
                <span className="text-xl font-bold text-foreground">
                  ClassFellow
                </span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Empowering students with AI-driven tools to transform their
                academic journey through smart note-taking and efficient
                learning.
              </p>
              <div className="flex space-x-4">
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Github className="w-5 h-5" />
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </Link>
              </div>
            </div>

            {/* Product Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Product</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    API Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Integrations
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Updates
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Support</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Getting Started
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Community
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Status
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Contact</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span>hello@classfellow.com</span>
                </div>
                <div className="flex items-center space-x-3 text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>San Francisco, CA</span>
                </div>
              </div>
              <div className="pt-4">
                <h4 className="text-sm font-medium text-foreground mb-2">
                  Subscribe to our newsletter
                </h4>
                <div className="flex space-x-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-3 py-2 text-sm border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <Button size="sm" className="h-[38px] rounded-full">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-muted-foreground text-sm">
                &copy; 2025 ClassFellow. All rights reserved.
              </p>
              <div className="flex space-x-6 text-sm">
                <Link
                  href="/privacy"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/faqs"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  FAQs
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Terms of Service
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
