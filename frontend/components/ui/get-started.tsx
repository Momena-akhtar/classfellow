import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function GetStarted() {
    return (
            <Button
                size="lg"
                className="w-full sm:w-[200px] text-base sm:text-lg pl-6 sm:pl-8 pr-3 sm:pr-4 py-4 sm:py-6 bg-gradient-to-r rounded-full from-primary to-primary/80 text-primary-foreground border border-primary/30 shadow-sm hover:shadow-md hover:brightness-105 focus-visible:ring-2 focus-visible:ring-primary/30 transition-all group"
                asChild
              >
                <Link href="/register" className="flex items-center justify-between gap-3">
                  <span>Start Learning</span>
                  <span className="flex items-center justify-center w-8 h-8 px-4 sm:w-9 sm:h-9 rounded-full bg-white transition-transform">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="black" 
                      strokeWidth="2.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14"/>
                      <path d="m12 5 7 7-7 7"/>
                    </svg>
                  </span>
                </Link>
            </Button>
    )
}