"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import {
  ChevronDown,
  ChevronUp,
  HelpCircle,
  BookOpen,
  Users,
  Zap,
} from "lucide-react";

const faqData = [
  {
    category: "Getting Started",
    icon: <BookOpen className="w-5 h-5" />,
    questions: [
      {
        question: "What is ClassFellow?",
        answer:
          "ClassFellow is an AI-powered study companion that helps students record lectures, generate summaries, and organize their study materials. It transforms the way you learn by providing intelligent note-taking, automatic transcription, and personalized study resources.",
      },
      {
        question: "How do I get started with ClassFellow?",
        answer:
          "Getting started is easy! Simply sign up for a free account, verify your email, and you'll be taken to your dashboard. From there, you can start recording your first lecture or upload existing study materials to begin organizing your academic content.",
      },
      {
        question: "Is ClassFellow free to use?",
        answer:
          "ClassFellow offers a free tier with basic features including limited recording time and storage. We also offer premium plans with advanced features like unlimited recordings, AI-powered summaries, and collaboration tools.",
      },
      {
        question: "What devices does ClassFellow support?",
        answer:
          "ClassFellow works on all modern web browsers including Chrome, Firefox, Safari, and Edge. We also have mobile-optimized interfaces for iOS and Android devices, so you can access your notes anywhere.",
      },
    ],
  },
  {
    category: "Features & Functionality",
    icon: <Zap className="w-5 h-5" />,
    questions: [
      {
        question: "How does the AI lecture recording work?",
        answer:
          "Our AI-powered recording system captures audio from your lectures and automatically transcribes the content in real-time. It identifies key topics, generates structured notes, and creates searchable summaries that make studying more efficient.",
      },
      {
        question: "Can I share my notes with classmates?",
        answer:
          "Yes! ClassFellow includes collaboration features that allow you to share notes, summaries, and study materials with your classmates. You can create study groups and work together on shared projects while maintaining control over your privacy settings.",
      },
      {
        question: "How accurate is the AI transcription?",
        answer:
          "Our AI transcription is highly accurate, typically achieving 95%+ accuracy for clear audio. The system continuously learns and improves, and you can always edit transcriptions manually if needed. We recommend using good audio quality for best results.",
      },
      {
        question: "Can I organize my notes by subject or course?",
        answer:
          "Absolutely! ClassFellow allows you to organize your content by courses, subjects, and custom tags. You can create folders, set up automatic categorization rules, and use our search functionality to quickly find specific notes or topics.",
      },
    ],
  },
  {
    category: "Account & Privacy",
    icon: <Users className="w-5 h-5" />,
    questions: [
      {
        question: "How is my data protected?",
        answer:
          "We take data security seriously. All your recordings and notes are encrypted both in transit and at rest. We comply with GDPR and other privacy regulations, and we never share your personal academic content with third parties without your explicit consent.",
      },
      {
        question: "Can I delete my account and data?",
        answer:
          "Yes, you have full control over your data. You can delete individual recordings, notes, or your entire account at any time from your settings page. When you delete your account, all associated data is permanently removed from our servers.",
      },
      {
        question: "How do I change my password?",
        answer:
          "You can change your password by going to Settings > Account Security in your dashboard. We recommend using a strong, unique password and enabling two-factor authentication for additional security.",
      },
      {
        question: "What happens to my data if I cancel my subscription?",
        answer:
          "If you cancel your premium subscription, your account will revert to the free tier. Your existing data remains accessible, but you'll have the storage and feature limitations of the free plan. You can always upgrade again or export your data.",
      },
    ],
  },
];

export default function FAQsPage() {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-background py-8">
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

      <section className="pt-24 pb-12 bg-primary/5">
        <h1 className="text-3xl lg:text-5xl font-bold mb-6 text-black text-center">
          FAQS
        </h1>
        <p className="text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-6 text-center">
          Find answers to common questions about ClassFellow. If you don&apos;t
          see your question here, feel free to contact our support team.
        </p>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {faqData.map((category, categoryIndex) => (
            <div key={category.category} className="mb-12">
              {/* Category Header */}
              <div className="flex items-center mb-8">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                  {category.icon}
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold">
                  {category.category}
                </h2>
              </div>

              {/* Questions */}
              <div className="space-y-4">
                {category.questions.map((faq, faqIndex) => {
                  const itemId = `${categoryIndex}-${faqIndex}`;
                  const isOpen = openItems.includes(itemId);

                  return (
                    <Card key={itemId} className="overflow-hidden">
                      <button
                        onClick={() => toggleItem(itemId)}
                        className="cursor-pointer w-full text-left p-6 flex items-center justify-between hover:bg-muted/50 transition-colors"
                      >
                        <h3 className="text-lg font-semibold pr-4">
                          {faq.question}
                        </h3>
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-6">
                          <p className="text-muted-foreground leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Support Section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Still have questions?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Our support team is here to help. Get in touch and we&apos;ll get
              back to you as soon as possible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="mailto:support@classfellow.com">
                  Contact Support
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/dashboard">Go to Dashboard</Link>
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
              <Link
                href="/privacy"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy Policy
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
