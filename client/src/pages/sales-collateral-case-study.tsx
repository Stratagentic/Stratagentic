import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu } from "lucide-react";
import { Header } from "@/components/header";
import logoImage from "@assets/Stratagentic_White_1762185093889.png";

export default function SalesCollateralCaseStudy() {
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
          // Swiped left - go to next
          setLocation('/case-studies/linkedin-growth');
        } else {
          // Swiped right - go to previous
          setLocation('/case-studies/prospect-research');
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
            Smarter sales materials, faster turnaround
          </h1>
          <p className="text-lg max-w-5xl leading-relaxed" data-testid="text-hero-description">
            Automated creation of branded, context-aware sales assets that match the opportunity stage.
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
                Sales teams were losing time preparing materials for new deals.
              </p>
            </div>
            <div className="text-base leading-relaxed space-y-4">
              <p>
                Relevant case studies, pitch decks, and follow-up documents all required manual customization. Inconsistent messaging and off-brand visuals often slowed down the process, reducing the impact of outreach and proposals.
              </p>
              <blockquote className="pl-4 italic text-[#2563EB]">
                "We spent hours tweaking slides and rewriting case studies just to fit each client. We needed something faster - and consistent."
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
                Enter the Sales Collateral Agent
              </p>
            </div>
            <div className="text-base leading-relaxed space-y-4">
              <p>
                An AI-driven content system that instantly produces on-brand sales materials based on opportunity data. It connects to CRM and content libraries, understands deal context, and assembles tailored outputs using approved templates and brand assets.
              </p>
              <p className="font-bold">The agent generates:</p>
              <ul className="space-y-2">
                <li>• Case studies aligned to the client's industry or challenge</li>
                <li>• Pitch decks and demo outlines adapted to buyer personas</li>
                <li>• Follow-up materials like one-pagers and comparison sheets</li>
              </ul>
              <p>
                All documents maintain the company's tone, structure, and design standards - with limited human editing required.
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
              <p className="text-5xl font-bold mb-4 text-[#2563EB]">75%</p>
              <p className="text-base font-bold mb-2">Reduction in time spent preparing sales materials</p>
            </div>
            <div className="border border-black p-8" data-testid="card-metric-2">
              <p className="text-5xl font-bold mb-4 text-[#2563EB]">5x</p>
              <p className="text-base font-bold mb-2">Faster turnaround from lead to proposal</p>
              <p className="text-sm opacity-60">5 days to next-day</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <ul className="space-y-3 text-base">
                <li>• Brand consistency across all outbound assets</li>
                <li>• Improved win rates from more relevant, personalized content</li>
              </ul>
            </div>
            <div>
              <blockquote className="pl-4 italic text-base text-[#2563EB]">
                "The automation feels invisible - it just gives our team exactly what they need at each stage of the deal."
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
            The agent draws context from CRM data, approved content blocks, and visual templates. It matches deal stage, industry, and persona data to pre-built logic that selects and assembles the right content format automatically.
          </p>
          
          {/* Workflow Diagram */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 py-8" data-testid="workflow-diagram">
            <div className="border border-black px-6 py-4 text-center min-w-[120px]">
              <p className="font-bold">Opportunity</p>
            </div>
            <span className="text-2xl text-[#2563EB] md:hidden">↓</span>
            <span className="text-2xl text-[#2563EB] hidden md:inline">→</span>
            <div className="border border-black px-6 py-4 text-center min-w-[120px]">
              <p className="font-bold">CRM</p>
            </div>
            <span className="text-2xl text-[#2563EB] md:hidden">↓</span>
            <span className="text-2xl text-[#2563EB] hidden md:inline">→</span>
            <div className="border border-black px-6 py-4 text-center min-w-[120px] bg-[#2563EB] text-white">
              <p className="font-bold">AI Engine</p>
            </div>
            <span className="text-2xl text-[#2563EB] md:hidden">↓</span>
            <span className="text-2xl text-[#2563EB] hidden md:inline">→</span>
            <div className="border border-black px-6 py-4 text-center min-w-[120px]">
              <p className="font-bold">Brand Assets</p>
            </div>
            <span className="text-2xl text-[#2563EB] md:hidden">↓</span>
            <span className="text-2xl text-[#2563EB] hidden md:inline">→</span>
            <div className="border border-black px-6 py-4 text-center min-w-[120px]">
              <p className="font-bold">Templates</p>
            </div>
            <span className="text-2xl text-[#2563EB] md:hidden">↓</span>
            <span className="text-2xl text-[#2563EB] hidden md:inline">→</span>
            <div className="border border-black px-6 py-4 text-center min-w-[120px]">
              <p className="font-bold">Collate</p>
            </div>
            <span className="text-2xl text-[#2563EB] md:hidden">↓</span>
            <span className="text-2xl text-[#2563EB] hidden md:inline">→</span>
            <div className="border border-black px-6 py-4 text-center min-w-[120px]">
              <p className="font-bold">Branded Output</p>
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
            See how your sales team can create materials in minutes, not hours
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Let Stratagentic show you how automation can simplify your pre-sales process and elevate every client interaction.
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
