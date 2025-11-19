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
          setLocation('/case-studies/sales-collateral-case-study');
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
        <Header /> {/* ADDED: Header component */}
    
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
            How a growing team cut content creation time by 70%
          </h1>
          <p className="text-lg max-w-5xl leading-relaxed" data-testid="text-hero-description">
            See how a custom prompt optimizer transformed inconsistent outputs into fast, reliable, high quality content on demand.
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
                Teams were wasting hours trial-and-erroring prompts.
              </p>
            </div>
            <div className="text-base leading-relaxed space-y-4">
              <p>
                Marketing, sales, and customer success all relied on AI tools, but every user wrote prompts differently. Outputs were inconsistent, off-brand, and required heavy manual editing. Staff often spent more time fixing AI outputs than creating content themselves. The result was a bottleneck that slowed campaigns, delayed product launches, and created brand drift.
              </p>
              <blockquote className="pl-4 italic text-[#2563EB]">
                "We had AI tools everywhere, but no way to get consistent quality. It felt like we were reinventing the wheel every single time."
                <footer className="text-sm mt-2 not-italic opacity-70">– Marketing Lead, SaaS Company</footer>
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
                Custom Prompt Optimizer Engine
              </p>
            </div>
            <div className="text-base leading-relaxed space-y-4">
              <p>
                A dedicated AI system embedded into the company’s workflow that standardizes and improves every prompt before it reaches the model.
              </p>
              <p>
                The system analyzes user intent, applies brand voice and structural rules, adds missing context, optimizes for clarity, and stress-tests the prompt through multiple refinement passes.
              </p>
              <p>
                The features included are: {/* Start of list wrapper */}
                <ul className="list-disc ml-6 mt-2 space-y-1"> {/* CORRECTED: Replaced nested <p> with <ul>/<li> */}
                  <li>Brand-tone alignment</li>
                  <li>Structural improvements</li>
                  <li>Clarity and context enrichment</li>
                  <li>Fail-safe instructions that prevent hallucinations</li>
                  <li>Versioned variants tailored to task type</li>
                </ul>
              </p>
              <p>
                Users simply input their rough idea. The engine produces a final, high quality, copy-paste-ready prompt in seconds.
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
              <p className="text-5xl font-bold mb-4 text-[#2563EB]">70%</p>
              <p className="text-base font-bold mb-2">Reduction in time spent writing or reworking prompts</p>
              <p className="text-sm leading-relaxed opacity-70">SConsistent brand voice across all AI-generated materials</p>
            </div>
            <div className="border border-black p-8" data-testid="card-metric-2">
              <p className="text-5xl font-bold mb-4 text-[#2563EB]">3x</p>
              <p className="text-base font-bold mb-2">Increase in content output across teams</p>
              <p className="text-sm leading-relaxed opacity-70">Teams produce more with less stress and fewer revisions</p>
            </div>
            <div className="border border-black p-8" data-testid="card-metric-3">
              <p className="text-5xl font-bold mb-4 text-[#2563EB]">80%</p>
              <p className="text-base font-bold mb-2">Improvement in LLM reply quality</p>
              <p className="text-sm leading-relaxed opacity-70">Significant reduction in editing time</p>
            </div>
          </div>
          <blockquote className="pl-6 py-4 italic text-xl mt-12 text-[#2563EB]">
            "The optimizer gave everyone superpowers. Even junior staff now produce senior-level output."
            <footer className="text-sm mt-2 not-italic opacity-70">– Head of Content</footer>
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
            A refined, multi-stage pipeline turns rough ideas into high-performance prompts.
          </p>
          
          {/* Workflow Diagram */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 py-8" data-testid="workflow-diagram">
            <div className="border border-black px-6 py-4 text-center min-w-[120px]">
              <p className="font-bold">Idea</p>
            </div>
            <span className="text-2xl text-[#2563EB] md:hidden">↓</span>
            <span className="text-2xl text-[#2563EB] hidden md:inline">→</span>
            <div className="border border-black px-6 py-4 text-center min-w-[120px]">
              <p className="font-bold">User Input</p>
            </div>
            <span className="text-2xl text-[#2563EB] md:hidden">↓</span>
            <span className="text-2xl text-[#2563EB] hidden md:inline">→</span>
            <div className="border border-black px-6 py-4 text-center min-w-[120px] bg-[#2563EB] text-white">
              <p className="font-bold">Intent Parser</p>
            </div>
            <span className="text-2xl text-[#2563EB] md:hidden">↓</span>
            <span className="text-2xl text-[#2563EB] hidden md:inline">→</span>
            <div className="border border-black px-6 py-4 text-center min-w-[120px]">
              <p className="font-bold">Optimization Engine</p>
            </div>
            <span className="text-2xl text-[#2563EB] md:hidden">↓</span>
            <span className="text-2xl text-[#2563EB] hidden md:inline">→</span>
            <div className="border border-black px-6 py-4 text-center min-w-[120px]">
              <p className="font-bold">Variants Generator</p>
            </div>
            <span className="text-2xl text-[#2563EB] md:hidden">↓</span>
            <span className="text-2xl text-[#2563EB] hidden md:inline">→</span>
            <div className="border border-black px-6 py-4 text-center min-w-[120px]">
              <p className="font-bold">Final Prompt</p>
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
            Want to get away from sh.. in , sh.. out?
          </h2>
          <p className="text-lg max-w-3xl mx-auto mb-8 leading-relaxed">
            Let's reprompt how you interact with AI to improve outcomes immediately.
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
