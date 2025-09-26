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
      <section id="home" className="relative min-h-screen flex items-center pt-24 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-grid-white/10 bg-[size:18px_18px] opacity-40 [mask-image:radial-gradient(ellipse_at_center,white,transparent_68%)]"></div>
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
    )
}