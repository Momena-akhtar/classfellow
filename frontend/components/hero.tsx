import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Users,
  Zap,
  Play,
} from "lucide-react";

export default function Hero(){
    return(
      <section id="home" className="relative min-h-screen flex items-center pt-20 sm:pt-24 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">          
          {/* Left grid lines */}
          <div className="hidden sm:block absolute left-0 top-0 bottom-0 w-[300px] md:w-[380px] lg:w-[440px] opacity-60 [mask-image:linear-gradient(to_right,white,transparent)]" style={{
            backgroundImage: 'linear-gradient(to right, rgba(128, 128, 128, 0.2) 2px, transparent 2px), linear-gradient(to bottom, rgba(128, 128, 128, 0.2) 2px, transparent 2px)',
            backgroundSize: '100px 100px'
          }}>
          </div>

          {/* Right grid lines */}
          <div className="hidden sm:block absolute right-0 top-0 bottom-0 w-[300px] md:w-[380px] lg:w-[440px] opacity-60 [mask-image:linear-gradient(to_left,white,transparent)]" style={{
            backgroundImage: 'linear-gradient(to right, rgba(128, 128, 128, 0.2) 2px, transparent 2px), linear-gradient(to bottom, rgba(128, 128, 128, 0.2) 2px, transparent 2px)',
            backgroundSize: '100px 100px'
          }}>
          </div>
          <div className="absolute inset-0 [background:radial-gradient(60%_38%_at_50%_42%,rgba(255,255,255,0.22),transparent_62%)] dark:[background:radial-gradient(60%_38%_at_50%_42%,rgba(255,255,255,0.09),transparent_62%)]"></div>
        </div>

        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6 sm:space-y-8">
            <div className="space-y-4 sm:space-y-6">
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-semibold leading-tight">
               Like a
                <span className="mx-2 bg-gradient-to-r from-primary via-primary/70 to-primary/80 bg-clip-text text-transparent">
                  genius friend {" "}
                </span>
                who never stops paying attention.
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Real-time AI that catches everything while you zone out.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <Button
                size="lg"
                className="w-full sm:w-[200px] text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 rounded-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground border border-primary/30 shadow-sm hover:shadow-md hover:brightness-105 focus-visible:ring-2 focus-visible:ring-primary/30 transition-all"
                asChild
              >
                <Link href="/register">Start Learning</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-[200px] text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 hidden sm:flex rounded-full"
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-2 sm:gap-3 pt-3 sm:pt-4 justify-center">
              <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-primary/10 rounded-full">
                <FileText className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">AI Summaries</span>
              </div>
              <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-primary/10 rounded-full">
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">References</span>
              </div>
              <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-primary/10 rounded-full">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Recordings</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
}