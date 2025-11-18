
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu } from "lucide-react";
import { Header } from "@/components/header";
import logoImage from "@assets/Stratagentic_White_1762185093889.png";

export default function SalesDeckCaseStudy() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
            How a SaaS company turned around 2-day proposals in under 30 minutes
          </h1>
          <p className="text-lg max-w-5xl leading-relaxed" data-testid="text-hero-description">
            See how an intelligent automation transforms meeting notes into bespoke sales presentations - automatically.
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
                Custom sales decks took 2 days to produce, bottlenecking deal velocity.
              </p>
            </div>
            <div className="text-base leading-relaxed space-y-4">
              <p>
                The CMO spent two full days per prospect creating tailored sales presentations. Each deck required extracting context from sales calls, reformatting notes into structured briefs, crafting messaging that matched prospect pain points, and manually building slides in the company template. High-value deals waited while decks were in production.
              </p>
              <blockquote className="pl-4 italic text-[#2563EB]">
                "We were losing momentum between discovery calls and proposals. Two days felt like two weeks to eager prospects."
                <br />
                <span className="text-black opacity-60">- CMO, B2B SaaS Company</span>
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
                Stratagentic built an AI-Powered Presentation Pipeline
              </p>
            </div>
            <div className="text-base leading-relaxed space-y-4">
              <p>
                An automated system that transforms meeting transcripts into ready-to-present sales decks.
              </p>
              <p className="font-bold">The system:</p>
              <ul className="space-y-2">
                <li>• Ingests meeting transcripts and extracts key context automatically</li>
                <li>• Reformats raw notes into approved messaging guidelines and structure</li>
                <li>• Generates tailored solutions based on prospect-specific pain points</li>
                <li>• Builds complete presentations using company templates with brand-compliant design</li>
              </ul>
              <p>
                Sales reps receive finished, personalized decks within 30 minutes of call completion.
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
              <p className="text-5xl font-bold mb-4 text-[#2563EB]">2 days → 30 min</p>
              <p className="text-base font-bold mb-2">Deck production time reduced by 95%</p>
            </div>
            <div className="border border-black p-8" data-testid="card-metric-2">
              <p className="text-5xl font-bold mb-4 text-[#2563EB]">Same-day</p>
              <p className="text-base font-bold mb-2">Turnaround time</p>
              <p className="text-sm opacity-60">Prospects receive proposals while still engaged</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <ul className="space-y-3 text-base">
                <li>• CMO freed from production work to focus on strategy</li>
                <li>• Consistent messaging and branding across all sales materials</li>
                <li>• Sales velocity increased - no more waiting on marketing bottleneck</li>
                <li>• Deck quality maintained with human review before send</li>
              </ul>
            </div>
            <div>
              <blockquote className="pl-4 italic text-base text-[#2563EB]">
                "It's like having a full creative team on standby. The decks are more consistent and on-brand than what I built manually - and they're ready before I finish my coffee."
                <br />
                <span className="text-black opacity-60">— CMO</span>
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
            Context flows through an intelligent pipeline—from transcript to presentation in minutes.
          </p>
          
          {/* Workflow Diagram */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 py-8 flex-wrap" data-testid="workflow-diagram">
            <div className="border border-black px-6 py-4 text-center min-w-[140px]">
              <p className="font-bold text-sm">Meeting Transcript</p>
            </div>
            <span className="text-2xl text-[#2563EB] md:hidden">↓</span>
            <span className="text-2xl text-[#2563EB] hidden md:inline">→</span>
            <div className="border border-black px-6 py-4 text-center min-w-[140px]">
              <p className="font-bold text-sm">Context Extraction</p>
            </div>
            <span className="text-2xl text-[#2563EB] md:hidden">↓</span>
            <span className="text-2xl text-[#2563EB] hidden md:inline">→</span>
            <div className="border border-black px-6 py-4 text-center min-w-[140px]">
              <p className="font-bold text-sm">Guideline Formatter</p>
            </div>
            <span className="text-2xl text-[#2563EB] md:hidden">↓</span>
            <span className="text-2xl text-[#2563EB] hidden md:inline">→</span>
            <div className="border border-black px-6 py-4 text-center min-w-[140px]">
              <p className="font-bold text-sm">Solution Generator</p>
            </div>
            <span className="text-2xl text-[#2563EB] md:hidden">↓</span>
            <span className="text-2xl text-[#2563EB] hidden md:inline">→</span>
            <div className="border border-black px-6 py-4 text-center min-w-[140px]">
              <p className="font-bold text-sm">Copy Writer</p>
            </div>
            <span className="text-2xl text-[#2563EB] md:hidden">↓</span>
            <span className="text-2xl text-[#2563EB] hidden md:inline">→</span>
            <div className="border border-black px-6 py-4 text-center min-w-[140px]">
              <p className="font-bold text-sm">Template Selector</p>
            </div>
            <span className="text-2xl text-[#2563EB] md:hidden">↓</span>
            <span className="text-2xl text-[#2563EB] hidden md:inline">→</span>
            <div className="border border-black px-6 py-4 text-center min-w-[140px]">
              <p className="font-bold text-sm">Slide Builder</p>
            </div>
            <span className="text-2xl text-[#2563EB] md:hidden">↓</span>
            <span className="text-2xl text-[#2563EB] hidden md:inline">→</span>
            <div className="border border-black px-6 py-4 text-center min-w-[140px] bg-[#2563EB] text-white">
              <p className="font-bold text-sm">Final Presentation</p>
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
            Sales team ready to delight your customers?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Let's explore how automation can remove bottlenecks in your workflow and accelerate deal velocity.
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


      
