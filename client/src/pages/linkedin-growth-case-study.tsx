import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu } from "lucide-react";
import logoImage from "@assets/Stratagentic_White_1762185093889.png";
import { Header } from "@/components/header";

export default function LinkedInGrowthCaseStudy() {
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
          setLocation('/case-studies/outreach-engine');
        } else {
          // Swiped right - go to previous
          setLocation('/case-studies/sales-collateral');
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
                Executives struggled to keep up with LinkedIn content demands.
              </p>
            </div>
            <div className="text-base leading-relaxed space-y-4">
              <p>
                Despite knowing the value of thought leadership and visibility, sustaining a steady posting rhythm was challenging. Creating quality posts took hours, often leading to long gaps in activity and inconsistent messaging.
              </p>
              <blockquote className="pl-4 italic text-[#2563EB]">
                "We knew LinkedIn mattered, but planning and writing posts every week just didn't fit into our schedules."
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
                LinkedIn Content Idea
              </p>
            </div>
            <div className="text-base leading-relaxed space-y-4">
              <p>
                A content automation solution that turns short updates and insights into a steady stream of professional posts. Automatically, or with a few quick prompts – recent wins, client updates, or personal insights – the system drafts multiple post variations ready for review and publishing.
              </p>
              <p className="font-bold">The system can:</p>
              <ul className="space-y-2">
                <li>• Suggest and write posts in storytelling, thought leadership, educational, or conversational formats</li>
                <li>• Auto-generate weekly or monthly post calendars</li>
                <li>• Allow human edits or personalization before approval (encouraged for authenticity)</li>
                <li>• Export directly to scheduling tools</li>
              </ul>
              <p>
                This enables users to maintain an active, high-quality LinkedIn presence without the time burden.
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
              <p className="text-5xl font-bold mb-4 text-[#2563EB]">10-15 hrs</p>
              <p className="text-base font-bold mb-2">Saved per month per user</p>
            </div>
            <div className="border border-black p-8" data-testid="card-metric-2">
              <p className="text-5xl font-bold mb-4 text-[#2563EB]">3x</p>
              <p className="text-base font-bold mb-2">Increase in posting consistency</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <ul className="space-y-3 text-base">
                <li>• Stronger brand visibility and engagement</li>
                <li>• Clearer, more authentic tone across leadership profiles</li>
                <li>• System supports multiple executives simultaneously</li>
              </ul>
            </div>
            <div>
              <blockquote className="pl-4 italic text-base text-[#2563EB]">
                "It feels like having a content strategist on call – only faster and always on brand."
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
            The <strong>LinkedIn Content Idea</strong> uses short text inputs as context, or scrapes current news, then combines brand voice models, approved message libraries, and adaptive tone logic to create ready-to-publish drafts.
          </p>
          
          {/* Workflow Diagram */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 py-8" data-testid="workflow-diagram">
            <div className="border border-black px-6 py-4 text-center min-w-[120px]">
              <p className="font-bold">User Input</p>
            </div>
            <span className="text-2xl text-[#2563EB] md:hidden">↓</span>
            <span className="text-2xl text-[#2563EB] hidden md:inline">→</span>
            <div className="border border-black px-6 py-4 text-center min-w-[120px]">
              <p className="font-bold">Scrape News</p>
            </div>
            <span className="text-2xl text-[#2563EB] md:hidden">↓</span>
            <span className="text-2xl text-[#2563EB] hidden md:inline">→</span>
            <div className="border border-black px-6 py-4 text-center min-w-[120px] bg-[#2563EB] text-white">
              <p className="font-bold">AI Engine</p>
            </div>
            <span className="text-2xl text-[#2563EB] md:hidden">↓</span>
            <span className="text-2xl text-[#2563EB] hidden md:inline">→</span>
            <div className="border border-black px-6 py-4 text-center min-w-[120px]">
              <p className="font-bold">Guidelines</p>
            </div>
            <span className="text-2xl text-[#2563EB] md:hidden">↓</span>
            <span className="text-2xl text-[#2563EB] hidden md:inline">→</span>
            <div className="border border-black px-6 py-4 text-center min-w-[120px]">
              <p className="font-bold">Draft Calendar</p>
            </div>
            <span className="text-2xl text-[#2563EB] md:hidden">↓</span>
            <span className="text-2xl text-[#2563EB] hidden md:inline">→</span>
            <div className="border border-black px-6 py-4 text-center min-w-[120px]">
              <p className="font-bold">Scheduler Export</p>
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
            Stay visible. Stay consistent. Effortlessly.
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Let Stratagentic show you how to keep your brand and leadership voice active on LinkedIn – without the weekly grind.
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
