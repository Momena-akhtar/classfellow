'use client';

import { useState, useEffect } from 'react';
import { 
  FileText, 
  Zap, 
  Users, 
  Brain,
  Search,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause
} from 'lucide-react';

// Features data with extended content
const features = [
  {
    id: 'recording',
    icon: FileText,
    title: 'Smart Recording',
    subtitle: 'AI-Powered Transcription',
    description: 'Capture every word with intelligent audio processing that transforms lectures into searchable, organized notes automatically.',
    benefits: ['Real-time transcription', 'Speaker identification', 'Auto-formatting', 'Cloud sync'],
    color: 'from-emerald-500 to-teal-600'
  },
  {
    id: 'summaries',
    icon: Zap,
    title: 'Quick Summaries',
    subtitle: 'Instant Insights',
    description: 'Generate comprehensive summaries from hours of content in seconds, highlighting key concepts and actionable takeaways.',
    benefits: ['Key point extraction', 'Topic categorization', 'Custom length', 'Multiple formats'],
    color: 'from-blue-500 to-indigo-600'
  },
  {
    id: 'references',
    icon: Users,
    title: 'Reference Tracking',
    subtitle: 'Organized Knowledge',
    description: 'Build a comprehensive library of academic references with intelligent tagging and cross-referencing capabilities.',
    benefits: ['Auto-citation', 'Source verification', 'Topic linking', 'Export options'],
    color: 'from-purple-500 to-pink-600'
  },
  {
    id: 'ai-insights',
    icon: Brain,
    title: 'AI Insights',
    subtitle: 'Deep Understanding',
    description: 'Discover hidden patterns and connections in your notes with advanced AI analysis and personalized recommendations.',
    benefits: ['Pattern recognition', 'Concept mapping', 'Study suggestions', 'Progress tracking'],
    color: 'from-orange-500 to-red-600'
  },
  {
    id: 'search',
    icon: Search,
    title: 'Smart Search',
    subtitle: 'Find Anything Instantly',
    description: 'Powerful semantic search across all your content, finding relevant information even when you don\'t remember exact keywords.',
    benefits: ['Semantic understanding', 'Cross-document search', 'Filter options', 'Recent activity'],
    color: 'from-cyan-500 to-blue-600'
  },
  {
    id: 'collaboration',
    icon: Sparkles,
    title: 'Team Collaboration',
    subtitle: 'Learn Together',
    description: 'Share notes, collaborate on projects, and learn from peers with secure, real-time collaborative features.',
    benefits: ['Real-time editing', 'Comment system', 'Version control', 'Access permissions'],
    color: 'from-green-500 to-emerald-600'
  }
];

export default function FeaturesSection() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Auto-rotate features
  useEffect(() => {
    if (!isAutoPlay) return;
    
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const nextFeature = () => {
    setActiveFeature((prev) => (prev + 1) % features.length);
    setIsAutoPlay(false);
  };

  const prevFeature = () => {
    setActiveFeature((prev) => (prev - 1 + features.length) % features.length);
    setIsAutoPlay(false);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlay(!isAutoPlay);
  };

  const currentFeature = features[activeFeature];
  const CurrentIcon = currentFeature.icon;

  return (
    <section id="features" className="py-24 relative overflow-hidden">
   
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Powerful Features</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground mb-4">
            Everything you need for
            <span className="bg-gradient-to-r from-primary via-primary/70 to-primary/80 bg-clip-text text-transparent block lg:inline">
              {" "}academic success
            </span>
          </h2>
          <p className="text-lg text-foreground leading-relaxed">
            Because scattered thoughts shouldn't mean scattered grades
          </p>
        </div>

        {/* Main Content Area */}
        <div className="max-w-7xl mx-auto">
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-3xl p-8 lg:p-12 shadow-xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              
              {/* Left Side - Feature Details */}
              <div className="space-y-8">
                <div className="space-y-6">
                  {/* Feature Icon & Title */}
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${currentFeature.color} flex items-center justify-center shadow-lg`}>
                      <CurrentIcon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-foreground">{currentFeature.title}</h3>
                      <p className="text-lg text-muted-foreground">{currentFeature.subtitle}</p>
                    </div>
                  </div>

                  {/* Feature Description */}
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {currentFeature.description}
                  </p>

                  {/* Benefits List */}
                  <div className="grid grid-cols-2 gap-3">
                    {currentFeature.benefits.map((benefit, index) => (
                      <div 
                        key={index} 
                        className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl border border-border/50 hover:bg-muted/70 transition-colors"
                      >
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${currentFeature.color}`}></div>
                        <span className="text-sm font-medium text-foreground">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between pt-6 border-t border-border/50">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={prevFeature}
                      className="w-10 h-10 rounded-full bg-muted hover:bg-muted/80 border border-border/50 flex items-center justify-center transition-all hover:shadow-md"
                    >
                      <ChevronLeft className="w-5 h-5 text-foreground" />
                    </button>
                    <button
                      onClick={nextFeature}
                      className="w-10 h-10 rounded-full bg-muted hover:bg-muted/80 border border-border/50 flex items-center justify-center transition-all hover:shadow-md"
                    >
                      <ChevronRight className="w-5 h-5 text-foreground" />
                    </button>
                    <button
                      onClick={toggleAutoPlay}
                      className="w-10 h-10 rounded-full bg-primary hover:bg-primary/90 flex items-center justify-center transition-all hover:shadow-md"
                    >
                      {isAutoPlay ? (
                        <Pause className="w-4 h-4 text-primary-foreground" />
                      ) : (
                        <Play className="w-4 h-4 text-primary-foreground ml-0.5" />
                      )}
                    </button>
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    {activeFeature + 1} of {features.length}
                  </div>
                </div>
              </div>

              {/* Right Side - Feature Carousel */}
              <div className="relative">
                <div className="space-y-4">
                  {/* Progress Bar */}
                  <div className="flex gap-2 mb-8">
                    {features.map((_, index) => (
                      <div
                        key={index}
                        className={`h-1 rounded-full transition-all duration-500 ${
                          index === activeFeature 
                            ? 'bg-primary flex-1' 
                            : 'bg-muted/50 w-8'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Feature Cards Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    {features.map((feature, index) => {
                      const FeatureIcon = feature.icon;
                      const isActive = index === activeFeature;
                      
                      return (
                        <button
                          key={feature.id}
                          onClick={() => {
                            setActiveFeature(index);
                            setIsAutoPlay(false);
                          }}
                          className={`p-6 rounded-2xl border transition-all duration-300 text-left ${
                            isActive
                              ? 'bg-card border-primary/50 shadow-lg scale-105 ring-2 ring-primary/20'
                              : 'bg-muted/30 border-border/50 hover:bg-muted/50 hover:border-border hover:shadow-md'
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-xl mb-4 flex items-center justify-center ${
                            isActive 
                              ? `bg-gradient-to-br ${feature.color}` 
                              : 'bg-muted'
                          }`}>
                            <FeatureIcon className={`w-5 h-5 ${
                              isActive ? 'text-white' : 'text-muted-foreground'
                            }`} />
                          </div>
                          <h4 className={`font-semibold mb-1 ${
                            isActive ? 'text-foreground' : 'text-muted-foreground'
                          }`}>
                            {feature.title}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {feature.subtitle}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}