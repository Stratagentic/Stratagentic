import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu } from "lucide-react";
import { Header } from "@/components/header";
import logoImage from "@assets/Stratagentic_White_1762185093889.png";

export default function LogisticsCaseStudy() {
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
          setLocation('/case-studies/prospect-research');
        } else {
          // Swiped right - go to previous
          setLocation('/case-studies/manufacturing');
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
            How an automated AI agent reduced delivery coordination time by 60%
          </h1>
          <p className="text-lg max-w-5xl leading-relaxed" data-testid="text-hero-description">
            Streamlined communication, tracking, and task management across multiple carriers with one integrated agent.
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
                Coordination was a constant bottleneck
              </p>
            </div>
            <div className="text-base leading-relaxed space-y-4">
              <p>
                Coordinating shipments across multiple carriers, suppliers, and clients was a constant bottleneck. Operations staff spent hours every day checking transport portals, emailing confirmations, and updating spreadsheets manually. With increasing shipment volume, errors and delays started to multiply.
              </p>
              <blockquote className="pl-4 italic text-[#2563EB]">
                "Every hour saved in coordination means an hour gained in actual delivery."
                <footer className="text-sm mt-2 not-italic opacity-70">– Operations Manager, National Logistics Company</footer>
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
                Logistics Coordination Agent
              </p>
            </div>
            <div className="text-base leading-relaxed space-y-4">
              <p>
                Implementation – a Logistics Coordination Agent – a system that connects order data, transport APIs, and internal communication tools.
              </p>
              <p>
                The agent automatically tracks shipments, verifies carrier updates, and synchronizes order statuses across various platforms. When discrepancies occur, it flags them instantly and suggests the next best action.
              </p>
              <p>
                Team members now receive daily summaries and exception alerts – eliminating constant manual follow-up.
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
          <div className="grid md:grid-cols-3 gap-8">
            <div className="border border-black p-8" data-testid="card-metric-1">
              <p className="text-5xl font-bold mb-4 text-[#2563EB]">63%</p>
              <p className="text-base font-bold mb-2">Reduction in manual coordination time</p>
              <p className="text-sm leading-relaxed opacity-70">Staff redeployed from admin work to customer service and planning</p>
            </div>
            <div className="border border-black p-8" data-testid="card-metric-2">
              <p className="text-5xl font-bold mb-4 text-[#2563EB]">90%</p>
              <p className="text-base font-bold mb-2">Fewer missed or delayed shipment updates</p>
              <p className="text-sm leading-relaxed opacity-70">Real-time visibility across all carriers and routes</p>
            </div>
            <div className="border border-black p-8" data-testid="card-metric-3">
              <p className="text-5xl font-bold mb-4 text-[#2563EB]">100%</p>
              <p className="text-base font-bold mb-2">Real-time visibility</p>
              <p className="text-sm leading-relaxed opacity-70">Complete transparency across all carriers and delivery routes</p>
            </div>
          </div>
          <blockquote className="pl-6 py-4 italic text-xl mt-12 text-[#2563EB]">
            "The agent feels like an extra team member who keeps every order on track."
            <footer className="text-sm mt-2 not-italic opacity-70">– Logistics Coordinator</footer>
          </blockquote>
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
            The Logistics Coordination Agent connects order data, transport APIs, and internal communication tools. It automatically tracks shipments, verifies carrier updates, and synchronizes order statuses across various platforms.
          </p>
          
          {/* Workflow Diagram */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 py-8" data-testid="workflow-diagram">
            <div className="border border-black px-6 py-4 text-center min-w-[120px]">
              <p className="font-bold">Orders</p>
            </div>
            <span className="text-2xl text-[#2563EB] md:hidden">↓</span>
            <span className="text-2xl text-[#2563EB] hidden md:inline">→</span>
            <div className="border border-black px-6 py-4 text-center min-w-[120px]">
              <p className="font-bold">ERP System</p>
            </div>
            <span className="text-2xl text-[#2563EB] md:hidden">↓</span>
            <span className="text-2xl text-[#2563EB] hidden md:inline">→</span>
            <div className="border border-black px-6 py-4 text-center min-w-[120px] bg-[#2563EB] text-white">
              <p className="font-bold">Agent</p>
            </div>
            <span className="text-2xl text-[#2563EB] md:hidden">↓</span>
            <span className="text-2xl text-[#2563EB] hidden md:inline">→</span>
            <div className="border border-black px-6 py-4 text-center min-w-[120px]">
              <p className="font-bold">Carrier APIs</p>
            </div>
            <span className="text-2xl text-[#2563EB] md:hidden">↓</span>
            <span className="text-2xl text-[#2563EB] hidden md:inline">→</span>
            <div className="border border-black px-6 py-4 text-center min-w-[120px]">
              <p className="font-bold">Dashboard</p>
            </div>
            <span className="text-2xl text-[#2563EB] md:hidden">↓</span>
            <span className="text-2xl text-[#2563EB] hidden md:inline">→</span>
            <div className="border border-black px-6 py-4 text-center min-w-[120px]">
              <p className="font-bold">Notifications</p>
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
            Want to make logistics move smoother?
          </h2>
          <p className="text-lg max-w-3xl mx-auto mb-8 leading-relaxed">
            Let's explore how Stratagentic's AI agents can optimize coordination, tracking, and communication in your supply chain.
          </p>
          <Link href="/#contact-section">
            <button 
              className="inline-flex items-center justify-center bg-black text-white px-6 py-3 text-sm hover-elevate active-elevate-2 transition-all"
              data-testid="button-cta"
            >
              <span className="mr-2">→</span>
              Book a Discovery Call
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
