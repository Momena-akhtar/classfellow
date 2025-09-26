"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
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
      setIsScrolled(window.scrollY > 8);
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
        // Pick the section with the largest intersection ratio
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const id = visible.target.id as SectionKey;
        // Map actual ids back to keys if needed
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

  const headerClasses = useMemo(
    () =>
      `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b"
          : "bg-transparent border-b border-transparent"
      }`,
    [isScrolled]
  );

  const scrollTo = (key: SectionKey) => (event: React.MouseEvent) => {
    event.preventDefault();
    const id = SECTION_IDS[key];
    const target = document.getElementById(id);
    if (!target) return;
    const header = document.getElementById("landing-header-root");
    const headerHeight = header ? header.offsetHeight : 72;
    const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 8;
    window.scrollTo({ top, behavior: "smooth" });
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
  };

  const NavPill = ({ label, keyName }: { label: string; keyName: SectionKey }) => {
    const isActive = active === keyName;
    return (
      <button
        onClick={scrollTo(keyName)}
        className={`px-2 sm:px-3.5 py-1.5 text-sm sm:text-base rounded-full transition-colors cursor-pointer ${
          isActive
            ? "bg-primary text-primary-foreground border-primary"
            : "bg-transparent text-foreground/80 hover:text-foreground "
        }`}
        aria-current={isActive ? "page" : undefined}
      >
        {label}
      </button>
    );
  };

  return (
    <>
      <header id="landing-header-root" className={headerClasses}>
        <div className="container mx-auto px-2 sm:px-4 py-3 sm:py-4">
          <div className="grid grid-cols-[1fr_auto_1fr] lg:grid-cols-[1fr_auto_1fr] grid-cols-[auto_1fr] items-center">
            {/* Left: Brand */}
            <div className="flex items-center gap-3">
              <Image src="/images/logo.svg" alt="ClassFellow Logo" width={32} height={32} className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>

            {/* Center: Pills - Hidden on mobile */}
            <nav className="hidden lg:flex justify-center">
              <div className="flex items-center gap-3 rounded-full border bg-background/60 backdrop-blur px-4 py-2 whitespace-nowrap">
                <NavPill label="Home" keyName="home" />
                <NavPill label="Features" keyName="features" />
                <NavPill label="How it works" keyName="how-it-works" />
                <NavPill label="Contact" keyName="contact" />
              </div>
            </nav>

            {/* Right: Auth buttons + Hamburger */}
            <div className="flex justify-end items-center gap-1 sm:gap-2">
              <Button variant="outline" className="rounded-full cursor-pointer text-sm sm:text-base px-3 sm:px-4" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button
                className="rounded-full cursor-pointer text-sm sm:text-base px-3 sm:px-4 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground border border-primary/30 shadow-sm hover:shadow-md hover:brightness-105 transition-all"
                asChild
              >
                <Link href="/register">Sign Up</Link>
              </Button>

              {/* Mobile Hamburger Menu - Only visible on mobile */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-md hover:bg-background/80 transition-colors ml-1"
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
      </header>

      {/* Mobile Menu Overlay - Only shows on mobile */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="fixed top-[72px] left-0 right-0 bg-background border-b shadow-lg">
            <div className="container mx-auto px-4 py-6">
              <nav className="space-y-4">
                <button
                  onClick={scrollTo("home")}
                  className={`block w-full text-left px-4 py-3 text-base rounded-md transition-colors ${
                    active === "home" 
                      ? "bg-primary text-primary-foreground" 
                      : "text-foreground/80 hover:text-foreground hover:bg-background/50"
                  }`}
                >
                  Home
                </button>
                <button
                  onClick={scrollTo("features")}
                  className={`block w-full text-left px-4 py-3 text-base rounded-md transition-colors ${
                    active === "features" 
                      ? "bg-primary text-primary-foreground" 
                      : "text-foreground/80 hover:text-foreground hover:bg-background/50"
                  }`}
                >
                  Features
                </button>
                <button
                  onClick={scrollTo("how-it-works")}
                  className={`block w-full text-left px-4 py-3 text-base rounded-md transition-colors ${
                    active === "how-it-works" 
                      ? "bg-primary text-primary-foreground" 
                      : "text-foreground/80 hover:text-foreground hover:bg-background/50"
                  }`}
                >
                  How it works
                </button>
                <button
                  onClick={scrollTo("contact")}
                  className={`block w-full text-left px-4 py-3 text-base rounded-md transition-colors ${
                    active === "contact" 
                      ? "bg-primary text-primary-foreground" 
                      : "text-foreground/80 hover:text-foreground hover:bg-background/50"
                  }`}
                >
                  Contact
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
}