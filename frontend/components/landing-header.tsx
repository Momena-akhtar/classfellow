"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

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
  };

  const NavPill = ({ label, keyName }: { label: string; keyName: SectionKey }) => {
    const isActive = active === keyName;
    return (
      <button
        onClick={scrollTo(keyName)}
        className={`px-3.5 py-1.5 text-base rounded-full transition-colors cursor-pointer ${
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
    <header id="landing-header-root" className={headerClasses}>
      <div className="container mx-auto px-4 py-4">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center">
          {/* Left: Brand */}
          <div className="flex items-center gap-3">
            <Image src="/images/logo.svg" alt="ClassFellow Logo" width={32} height={32} className="w-8 h-8" />
          </div>

          {/* Center: Pills */}
          <nav className="flex justify-center">
            <div className="flex items-center gap-3 rounded-full border bg-background/60 backdrop-blur px-4 py-2 whitespace-nowrap">
              <NavPill label="Home" keyName="home" />
              <NavPill label="Features" keyName="features" />
              <NavPill label="How it works" keyName="how-it-works" />
              <NavPill label="Contact" keyName="contact" />
            </div>
          </nav>

          {/* Right: Auth buttons */}
          <div className="flex justify-end gap-2 text-base">
            <Button variant="outline" className="rounded-full cursor-pointer text-base" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button
              className="rounded-full cursor-pointer text-base bg-gradient-to-r from-primary to-primary/80 text-primary-foreground border border-primary/30 shadow-sm hover:shadow-md hover:brightness-105 transition-all"
              asChild
            >
              <Link href="/register">Sign Up</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}


