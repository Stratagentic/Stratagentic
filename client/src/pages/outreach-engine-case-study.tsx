import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu } from "lucide-react";
import { Header } from "@/components/header";
import logoImage from "@assets/Stratagentic_White_1762185093889.png";

export default function OutreachEngineCaseStudy() {
  const [time, setTime] = useState(new Date());
  const [, setLocation] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Swipe navigation
  useEffect(() => {
    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    };

    const handleSwipe = () => {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          // Swiped left - go to next (wrap to first)
          setLocation('/case-studies/manufacturing');
        } else {
          // Swiped right - go to previous
          setLocation('/case-studies/prompt-engine');
        }
      }
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [setLocation]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

return (
  <div className="min-h-screen bg-white text-black">
    <Header />
     
      {/* Hero */}
      <section className="bg-white text-black border-t border-black" style={{ padding: "var(--space-8) var(--space-3)" }}>
        <div className="max-w-[1400px] mx-auto">
          <p className="text-xs mb-4 uppercase tracking-wider opacity-60" data-testid="text-category">Case Study</p>
          <h1 
            className="font-bold mb-6"
            style={{ 
              fontSize: "clamp(2rem, 6vw + 0.5rem, 6rem)",
              lineHeight: "0.92",
              letterSpacing: "-0.04em"
            }}
            data-testid="text-hero-heading"
          >
            Scale outreach without adding headcount
          </h1>
          <p className="text-lg max-w-5xl leading-relaxed" data-testid="text-hero-description">
            An AI-powered multi-channel engine that personalizes, optimizes, and automates your entire outbound workflow.
          </p>
        </div>
      </section>

      {/* Challenge */}
      <section 
        className="bg-white text-black border-t border-gray-300"
        style={{ padding: "var(--space-7) var(--space-3)" }}
        data-testid="section-challenge"
      >
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-sm font-bold mb-8 tracking-tight" data-testid="text-section-heading">
            THE CHALLENGE
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="text-3xl md:text-4xl font-bold leading-tight tracking-tight mb-6">
                Scale outreach or maintain personalization?
              </p>
            </div>
            <div className="text-base leading-relaxed space-y-4">
              <p>
                Sales and marketing teams often face the same trade-off – scale outreach or maintain personalization. Manual prospecting, fragmented tools, and poor CRM syncs made it difficult to reach more people without losing quality or context. Leadership lacked visibility into what worked, while reps juggled too many disconnected systems.
              </p>
              <blockquote className="pl-4 italic text-[#2563EB]">
                "We were spending more time managing tools than actually reaching prospects. Scaling personalization felt impossible."
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section 
        className="bg-white text-black"
        style={{ padding: "var(--space-7) var(--space-3)" }}
        data-testid="section-solution"
      >
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-sm font-bold mb-8 tracking-tight" data-testid="text-section-heading-solution">
            THE SOLUTION
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="text-3xl md:text-4xl font-bold leading-tight tracking-tight mb-6">
                Automated Outreach Engine
              </p>
            </div>
            <div className="text-base leading-relaxed space-y-4">
              <p>
                A unified system connecting multi-channel outreach platforms like Lemlist with workflow integrators (n8n, Make, Zapier) and CRM systems such as Attio.
              </p>
              <p className="font-bold">This integration enables seamless, intelligent outreach at scale:</p>
              <ul className="space-y-2">
                <li>• Outreach to hundreds of qualified prospects daily across LinkedIn and email</li>
                <li>• Use AI-driven personalization powered by buying signals, engagement triggers, and intent data</li>
                <li>• A/B test messages, channels, and sequences to continuously improve performance</li>
                <li>• Auto-sync all interactions to your CRM – keeping contacts, deal stages, and notes up to date in real time</li>
                <li>• Dynamically enrich and route leads to the right sales reps based on role, industry, or engagement level</li>
                <li>• Track and analyze campaign results for higher reply and conversion rates</li>
              </ul>
              <p>
                The result is a self-sustaining outreach engine that grows your pipeline while giving leadership complete visibility into performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section 
        className="bg-white text-black border-t border-gray-300"
        style={{ padding: "var(--space-7) var(--space-3)" }}
        data-testid="section-results"
      >
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-sm font-bold mb-8 tracking-tight" data-testid="text-section-heading-results">
            THE RESULTS
          </h2>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="border border-black p-8" data-testid="card-metric-1">
              <p className="text-5xl font-bold mb-4 text-[#2563EB]">4x</p>
              <p className="text-base font-bold mb-2">Increase in qualified outbound volume without additional staff</p>
            </div>
            <div className="border border-black p-8" data-testid="card-metric-2">
              <p className="text-5xl font-bold mb-4 text-[#2563EB]">2.5x</p>
              <p className="text-base font-bold mb-2">Higher reply rate from personalized sequences</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <ul className="space-y-3 text-base">
                <li>• Real-time CRM visibility for management and operations</li>
                <li>• Continuous optimization through A/B testing and data feedback</li>
              </ul>
            </div>
            <div>
              <blockquote className="pl-4 italic text-base text-[#2563EB]">
                "We finally have a scalable system that personalizes every touchpoint and keeps our CRM perfectly clean."
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Inside the System */}
      <section 
        className="bg-white text-black border-t border-gray-300"
        style={{ padding: "var(--space-7) var(--space-3)" }}
        data-testid="section-system"
      >
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-sm font-bold mb-8 tracking-tight" data-testid="text-section-heading-system">
            INSIDE THE SYSTEM
          </h2>
          <p className="text-base leading-relaxed mb-8">
            The Automated Outreach Engine links your CRM, outreach tools, and AI layers into one synchronized workflow. Each prospect interaction is tracked, enriched, and logged automatically, ensuring every message feels personal while keeping operations fully measurable.
          </p>
          
          {/* Workflow Diagram */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 py-8" data-testid="workflow-diagram">
            <div className="border border-black px-6 py-4 text-center min-w-[120px]">
              <p className="font-bold">CRM</p>
            </div>
            <span className="text-2xl text-[#2563EB] md:hidden">↕</span>
            <span className="text-2xl text-[#2563EB] hidden md:inline">↔</span>
            <div className="border border-black px-6 py-4 text-center min-w-[120px]">
              <p className="font-bold">Outreach Platform</p>
            </div>
            <span className="text-2xl text-[#2563EB] md:hidden">↕</span>
            <span className="text-2xl text-[#2563EB] hidden md:inline">↔</span>
            <div className="border border-black px-6 py-4 text-center min-w-[120px] bg-[#2563EB] text-white">
              <p className="font-bold">AI Engine</p>
            </div>
            <span className="text-2xl text-[#2563EB] md:hidden">↕</span>
            <span className="text-2xl text-[#2563EB] hidden md:inline">↔</span>
            <div className="border border-black px-6 py-4 text-center min-w-[120px]">
              <p className="font-bold">Reporting Dashboard</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section 
        className="bg-white text-black border-t border-black"
        style={{ padding: "var(--space-8) var(--space-3)" }}
        data-testid="section-cta"
      >
        <div className="max-w-[1400px] mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight leading-tight">
            Build a self-sustaining outreach engine. Voila!
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Let Stratagentic show you how automation can expand your outbound reach and improve every sales interaction.
          </p>
          <Link href="/#contact-section">
            <button 
              className="inline-flex items-center justify-center bg-black text-white px-6 py-3 text-sm hover-elevate active-elevate-2 transition-all"
              data-testid="button-cta"
            >
              <span className="mr-2">→</span>
              Book a discovery call
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white text-black border-t border-gray-300 py-6" style={{ padding: "var(--space-4) var(--space-3)" }}>
        <div className="max-w-[1400px] mx-auto text-center text-sm opacity-60">
          © 2025 Stratagentic. Built in Norway.
        </div>
      </footer>
    </div>
  );
}
