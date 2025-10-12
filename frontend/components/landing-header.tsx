"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

type SectionKey = "home" | "features" | "how-it-works" | "contact";

const SECTION_IDS: Record<SectionKey, string> = {
  home: "home",
  features: "features",
  "how-it-works": "how-it-works",
  contact: "contact",
};

export default function LandingHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [active, setActive] = useState<SectionKey>("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = Object.values(SECTION_IDS);
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const id = visible.target.id as SectionKey;
        const key = (Object.keys(SECTION_IDS) as SectionKey[]).find(
          (k) => SECTION_IDS[k] === id
        );
        if (key && key !== active) setActive(key);
      },
      {
        rootMargin: "-40% 0px -55% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [active]);

  const scrollTo = (key: SectionKey) => (event: React.MouseEvent) => {
    event.preventDefault();
    const id = SECTION_IDS[key];
    const target = document.getElementById(id);
    if (!target) return;
    const header = document.getElementById("landing-header-root");
    const headerHeight = header ? header.offsetHeight : 72;
    const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 8;
    window.scrollTo({ top, behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  const NavPill = ({ label, keyName }: { label: string; keyName: SectionKey }) => {
    const isActive = active === keyName;
    return (
      <button
        onClick={scrollTo(keyName)}
        className={`relative px-4 py-2 text-[15px] font-medium transition-colors cursor-pointer ${
          isActive
            ? "text-foreground"
            : "text-foreground/60 hover:text-foreground/80"
        }`}
        aria-current={isActive ? "page" : undefined}
      >
        {label}
        {isActive && (
          <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary rounded-full" />
        )}
      </button>
    );
  };

  return (
    <>
      <header 
        id="landing-header-root" 
        className={`fixed top-0 left-0 right-0 z-[90] transition-all duration-200 ${
          isScrolled ? 'py-0' : 'py-4 sm:py-5'
        }`}
      >
        <div 
          className={`transition-all duration-200 ${
            isScrolled 
              ? 'mx-0 rounded-none bg-background/80 backdrop-blur-md border-b border-border/40' 
              : 'mx-8 sm:mx-16 lg:mx-24 rounded-xl bg-background/95 backdrop-blur-sm border border-border/50'
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-[auto_1fr_auto] lg:grid-cols-[1fr_auto_1fr] items-center h-16 gap-4">
              {/* Left: Brand */}
              <div className="flex items-center">
                <Image 
                  src="/images/classfellow.svg" 
                  alt="ClassFellow Logo" 
                  width={32} 
                  height={32} 
                  className="w-8 h-8" 
                />
              </div>

              {/* Center: Pills - Hidden on mobile */}
              <nav className="hidden lg:flex items-center gap-1 justify-center">
                <NavPill label="Home" keyName="home" />
                <NavPill label="Features" keyName="features" />
                <NavPill label="How it works" keyName="how-it-works" />
                <NavPill label="Contact" keyName="contact" />
              </nav>

              {/* Right: Auth buttons + Hamburger */}
              <div className="flex items-center gap-2 justify-end">
                <Link 
                  href="/login"
                  className="hidden sm:block px-4 py-2 text-[15px] font-medium text-foreground/70 hover:text-foreground transition-colors"
                >
                  Log In
                </Link>
                <Button asChild size="default" className="text-[15px] font-medium">
                  <Link href="/register">Get Started</Link>
                </Button>

                {/* Mobile Hamburger */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="lg:hidden p-2 rounded-lg hover:bg-accent transition-colors"
                  aria-label="Toggle menu"
                >
                  {isMobileMenuOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm" 
            onClick={() => setIsMobileMenuOpen(false)} 
          />
          <div className="fixed top-[88px] left-4 right-4 bg-background border border-border/50 rounded-xl">
            <div className="p-4">
              <nav className="flex flex-col gap-1">
                <button
                  onClick={scrollTo("home")}
                  className={`text-left px-4 py-3 text-[15px] font-medium rounded-lg transition-colors ${
                    active === "home" 
                      ? "bg-accent text-foreground" 
                      : "text-foreground/60 hover:text-foreground hover:bg-accent/50"
                  }`}
                >
                  Home
                </button>
                <button
                  onClick={scrollTo("features")}
                  className={`text-left px-4 py-3 text-[15px] font-medium rounded-lg transition-colors ${
                    active === "features" 
                      ? "bg-accent text-foreground" 
                      : "text-foreground/60 hover:text-foreground hover:bg-accent/50"
                  }`}
                >
                  Features
                </button>
                <button
                  onClick={scrollTo("how-it-works")}
                  className={`text-left px-4 py-3 text-[15px] font-medium rounded-lg transition-colors ${
                    active === "how-it-works" 
                      ? "bg-accent text-foreground" 
                      : "text-foreground/60 hover:text-foreground hover:bg-accent/50"
                  }`}
                >
                  How it works
                </button>
                <button
                  onClick={scrollTo("contact")}
                  className={`text-left px-4 py-3 text-[15px] font-medium rounded-lg transition-colors ${
                    active === "contact" 
                      ? "bg-accent text-foreground" 
                      : "text-foreground/60 hover:text-foreground hover:bg-accent/50"
                  }`}
                >
                  Contact
                </button>
                <Link 
                  href="/login"
                  className="sm:hidden text-left px-4 py-3 text-[15px] font-medium text-foreground/70 hover:text-foreground hover:bg-accent/50 rounded-lg transition-colors"
                >
                  Log In
                </Link>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
}