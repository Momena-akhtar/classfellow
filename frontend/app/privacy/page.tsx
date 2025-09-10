import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Shield, Lock, Eye, FileText, Users, Globe, Zap } from "lucide-react";

const privacySections = [
  {
    title: "Information We Collect",
    icon: <FileText className="w-5 h-5" />,
    content: [
      {
        subtitle: "Account Information",
        description:
          "When you create an account, we collect your name, email address, educational institution, and other profile information you provide.",
      },
      {
        subtitle: "Academic Content",
        description:
          "We store your lecture recordings, notes, summaries, and other study materials that you create or upload to our platform.",
      },
      {
        subtitle: "Usage Data",
        description:
          "We collect information about how you use our services, including features accessed, time spent, and interaction patterns to improve our platform.",
      },
      {
        subtitle: "Technical Information",
        description:
          "We automatically collect device information, IP addresses, browser type, and technical data necessary for platform functionality and security.",
      },
    ],
  },
  {
    title: "How We Use Your Information",
    icon: <Zap className="w-5 h-5" />,
    content: [
      {
        subtitle: "Service Provision",
        description:
          "We use your information to provide, maintain, and improve ClassFellow's features, including AI transcription, note generation, and study organization tools.",
      },
      {
        subtitle: "Personalization",
        description:
          "Your data helps us customize your experience, recommend relevant content, and provide personalized study insights and suggestions.",
      },
      {
        subtitle: "Communication",
        description:
          "We may use your contact information to send important service updates, educational content, and respond to your support requests.",
      },
      {
        subtitle: "Analytics & Improvement",
        description:
          "Aggregated and anonymized data helps us understand usage patterns and improve our platform's performance and features.",
      },
    ],
  },
  {
    title: "Information Sharing",
    icon: <Users className="w-5 h-5" />,
    content: [
      {
        subtitle: "No Sale of Personal Data",
        description:
          "We do not sell, rent, or trade your personal information or academic content to third parties for monetary gain or marketing purposes.",
      },
      {
        subtitle: "Service Providers",
        description:
          "We may share information with trusted service providers who help us operate our platform, such as cloud storage providers and AI processing services.",
      },
      {
        subtitle: "Legal Requirements",
        description:
          "We may disclose information if required by law, to protect our rights, or to ensure the safety and security of our users and platform.",
      },
      {
        subtitle: "User-Initiated Sharing",
        description:
          "When you choose to share notes or collaborate with classmates, we facilitate this sharing according to your privacy settings and preferences.",
      },
    ],
  },
  {
    title: "Data Security",
    icon: <Lock className="w-5 h-5" />,
    content: [
      {
        subtitle: "Encryption",
        description:
          "All data is encrypted in transit using TLS encryption and at rest using AES-256 encryption to protect your information from unauthorized access.",
      },
      {
        subtitle: "Access Controls",
        description:
          "We implement strict access controls and authentication measures to ensure only authorized personnel can access your data when necessary for service provision.",
      },
      {
        subtitle: "Regular Security Audits",
        description:
          "Our systems undergo regular security assessments and updates to protect against emerging threats and maintain the highest security standards.",
      },
      {
        subtitle: "Data Backup & Recovery",
        description:
          "We maintain secure backups of your data to prevent loss and ensure service continuity, while maintaining the same security standards for backup data.",
      },
    ],
  },
  {
    title: "Your Privacy Rights",
    icon: <Eye className="w-5 h-5" />,
    content: [
      {
        subtitle: "Access & Portability",
        description:
          "You can access, download, and export your data at any time through your account settings or by contacting our support team.",
      },
      {
        subtitle: "Correction & Updates",
        description:
          "You can update or correct your personal information and account details directly through your profile settings.",
      },
      {
        subtitle: "Deletion Rights",
        description:
          "You can delete specific content or your entire account. When you delete your account, we remove all personal data within 30 days, except where required by law.",
      },
      {
        subtitle: "Privacy Controls",
        description:
          "You control who can see your shared content and can adjust privacy settings for individual notes, recordings, and collaborative materials.",
      },
    ],
  },
  {
    title: "International Data Transfers",
    icon: <Globe className="w-5 h-5" />,
    content: [
      {
        subtitle: "Global Infrastructure",
        description:
          "ClassFellow uses cloud infrastructure that may store and process data in multiple countries to provide optimal performance and reliability.",
      },
      {
        subtitle: "Data Protection Standards",
        description:
          "We ensure that all international data transfers comply with applicable privacy laws and maintain equivalent protection standards.",
      },
      {
        subtitle: "Regional Compliance",
        description:
          "We comply with regional privacy regulations including GDPR, CCPA, and other applicable data protection laws in jurisdictions where we operate.",
      },
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background py-5">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
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
          <div className="space-x-2">
            <Button variant="outline" asChild>
              <Link href="/">Back to Home</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-primary/5">
        <h1 className="text-3xl lg:text-5xl font-bold mb-6 text-black text-center">
          Privacy Policy
        </h1>
        <p className="text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-6 text-center">
          Your privacy and data security are fundamental to how we build and
          operate ClassFellow. This policy explains how we collect, use, and
          protect your information.
        </p>
        <p className="text-sm text-muted-foreground text-center">
          Last updated: September 10, 2025
        </p>
      </section>

      {/* Privacy Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Introduction */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-2xl">
                Our Commitment to Privacy
              </CardTitle>
              <CardDescription className="text-base">
                At ClassFellow, we believe that privacy is a fundamental right.
                We've designed our platform with privacy by design principles,
                ensuring that your academic data remains secure and under your
                control.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                This Privacy Policy applies to all information collected through
                ClassFellow's web platform, mobile applications, and related
                services. By using ClassFellow, you agree to the collection and
                use of information in accordance with this policy.
              </p>
            </CardContent>
          </Card>

          {/* Privacy Sections */}
          {privacySections.map((section, sectionIndex) => (
            <Card key={sectionIndex} className="mb-8">
              <CardHeader>
                <div className="flex items-center mb-2">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                    {section.icon}
                  </div>
                  <CardTitle className="text-xl">{section.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {section.content.map((item, itemIndex) => (
                    <div key={itemIndex}>
                      <h4 className="font-semibold mb-2">{item.subtitle}</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Contact Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">
                Questions About This Policy
              </CardTitle>
              <CardDescription>
                If you have questions about this Privacy Policy or our data
                practices, we're here to help.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Contact Information</h4>
                  <p className="text-muted-foreground mb-1">
                    Email: privacy@classfellow.com
                  </p>
                  <p className="text-muted-foreground mb-1">
                    Support: support@classfellow.com
                  </p>
                  <p className="text-muted-foreground">
                    Response time: Within 48 hours
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">
                    Data Protection Officer
                  </h4>
                  <p className="text-muted-foreground mb-1">
                    For GDPR-related inquiries
                  </p>
                  <p className="text-muted-foreground mb-1">
                    Email: dpo@classfellow.com
                  </p>
                  <p className="text-muted-foreground">
                    Available for EU/UK residents
                  </p>
                </div>
              </div>
              <div className="mt-6 p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  We will notify users of any material changes to this Privacy
                  Policy through email and platform notifications at least 30
                  days before the changes take effect.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Action Section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to start learning securely?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Join thousands of students who trust ClassFellow with their
              academic journey while keeping their data private and secure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/register">Create Free Account</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/faqs">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Image
                src="/images/logo.svg"
                alt="ClassFellow Logo"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="text-xl font-bold">ClassFellow</span>
            </div>
            <p className="text-muted-foreground mb-8">
              Your AI study partner for academic success
            </p>
            <div className="flex justify-center space-x-6 text-sm">
              <Link href="/privacy" className="text-foreground font-medium">
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
            <p className="text-muted-foreground text-sm mt-8">
              &copy; 2025 ClassFellow. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
