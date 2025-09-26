'use client';

import { 
  Upload,
  Brain,
  FileText,
  Share2,
  ArrowRight,
  Clock,
  Users,
  TrendingUp,
  Play
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const steps = [
  {
    id: 1,
    icon: Upload,
    title: 'Upload Content',
    description: 'Upload documents, record lectures, or import your existing notes.'
  },
  {
    id: 2,
    icon: Brain,
    title: 'AI Processing',
    description: 'Our AI transcribes, analyzes, and structures your content automatically.'
  },
  {
    id: 3,
    icon: FileText,
    title: 'Get Organized Notes',
    description: 'Receive perfectly formatted summaries, references, and searchable notes.'
  },
  {
    id: 4,
    icon: Share2,
    title: 'Study & Collaborate',
    description: 'Access anywhere, create study materials, and share with classmates.'
  }
];

const stats = [
  { icon: Clock, value: '<2min', label: 'Processing time' },
  { icon: Users, value: '15k+', label: 'Active students' },
  { icon: TrendingUp, value: '4.9/5', label: 'User rating' }
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 bg-muted/20 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-semibold text-foreground mb-4">
            Your study workflow,
                <span className="mx-2 bg-gradient-to-r from-primary via-secondary to-primary/70 bg-clip-text text-transparent">
                  perfected.
                </span>
          </h2>
          <p className="text-xl text-muted-foreground">
            The fastest way from content to comprehension
          </p>
        </div>

        {/* Steps */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              
              return (
                <div key={step.id} className="relative flex flex-col">
                  {/* Card */}
                  <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:border-primary/30 flex-1">
                    {/* Step number */}
                    <div className="text-sm text-primary font-semibold mb-4">
                      Step {step.id}
                    </div>
                    
                    {/* Icon */}
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <StepIcon className="w-6 h-6 text-primary" />
                    </div>
                    
                    {/* Content */}
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-foreground">
                        {step.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Arrow between cards */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:flex absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                      <div className="w-8 h-8 bg-background border border-border rounded-full flex items-center justify-center shadow-sm">
                        <ArrowRight className="w-4 h-4 text-primary" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
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

      </div>
    </section>
  );
}