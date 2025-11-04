import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import logisticsImage from "@assets/stock_images/logistics_warehouse__536d983c.jpg";
import logoImage from "@assets/Stratagentic_White_1762185093889.png";

export default function LogisticsCaseStudy() {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="border-b border-black py-4 px-6">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <Link href="/">
            <a className="flex items-center">
              <img 
                src={logoImage}
                alt="Stratagentic" 
                className="h-10"
                style={{ filter: 'invert(1)' }}
                data-testid="img-logo"
              />
            </a>
          </Link>
          <Link href="/">
            <a className="flex items-center gap-2 text-sm hover:text-[#2563EB] transition-colors" style={{ transform: 'none' }} data-testid="link-back">
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </a>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-6 border-b border-black" data-testid="section-hero">
        <div className="max-w-[1400px] mx-auto">
          <p className="text-xs uppercase tracking-wider mb-6 opacity-60" data-testid="text-case-study-label">Case Study – Logistics Coordination Agent | Stratagentic</p>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight tracking-tight" data-testid="text-hero-title">
            How an automated AI agent reduced delivery coordination time by 60%
          </h1>
          <p className="text-xl md:text-2xl opacity-80 max-w-3xl leading-relaxed" data-testid="text-hero-subtitle">
            Streamlined communication, tracking, and task management across multiple carriers with one integrated agent.
          </p>
        </div>
      </section>

      {/* Hero Image */}
      <section className="border-b border-black">
        <div className="max-w-[1400px] mx-auto">
          <img 
            src={logisticsImage} 
            alt="Automated logistics warehouse" 
            className="w-full h-[400px] md:h-[600px] object-cover"
            data-testid="img-hero"
          />
        </div>
      </section>

      {/* Challenge Section */}
      <section className="py-16 px-6 border-b border-black" data-testid="section-challenge">
        <div className="max-w-[900px] mx-auto">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-8" data-testid="text-challenge-heading">Challenge</h2>
          <div className="space-y-6 text-lg leading-relaxed">
            <p data-testid="text-challenge-1">
              Coordinating shipments across multiple carriers, suppliers, and clients was a constant bottleneck. Operations staff spent hours every day checking transport portals, emailing confirmations, and updating spreadsheets manually. With increasing shipment volume, errors and delays started to multiply.
            </p>
            <blockquote className="border-l-4 border-[#2563EB] pl-6 py-4 italic text-xl" data-testid="text-challenge-quote">
              "Every hour saved in coordination means an hour gained in actual delivery."
              <footer className="text-sm mt-2 not-italic opacity-70">– Operations Manager, National Logistics Company</footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 px-6 border-b border-black bg-[#f5f5f5]" data-testid="section-solution">
        <div className="max-w-[900px] mx-auto">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-8" data-testid="text-solution-heading">Solution</h2>
          <div className="space-y-6 text-lg leading-relaxed">
            <p data-testid="text-solution-1">
              <strong>Implementation</strong> – a Logistics Coordination Agent – a system that connects order data, transport APIs, and internal communication tools.
            </p>
            <p data-testid="text-solution-2">
              The agent automatically tracks shipments, verifies carrier updates, and synchronizes order statuses across various platforms. When discrepancies occur, it flags them instantly and suggests the next best action.
            </p>
            <p data-testid="text-solution-3">
              Team members now receive daily summaries and exception alerts – eliminating constant manual follow-up.
            </p>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-16 px-6 border-b border-black" data-testid="section-results">
        <div className="max-w-[900px] mx-auto">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-8" data-testid="text-results-heading">Results</h2>
          <div className="mb-8">
            <p className="text-sm font-bold uppercase tracking-wider mb-6 opacity-60">Highlights:</p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-black p-6" data-testid="result-1">
                <p className="text-4xl font-bold text-[#2563EB] mb-2">63%</p>
                <p className="text-base">reduction in manual coordination time</p>
              </div>
              <div className="border border-black p-6" data-testid="result-2">
                <p className="text-4xl font-bold text-[#2563EB] mb-2">90%</p>
                <p className="text-base">fewer missed or delayed shipment updates</p>
              </div>
              <div className="border border-black p-6" data-testid="result-3">
                <p className="text-lg font-bold mb-2">Real-time visibility</p>
                <p className="text-base">across all carriers and routes</p>
              </div>
              <div className="border border-black p-6" data-testid="result-4">
                <p className="text-lg font-bold mb-2">Staff redeployed</p>
                <p className="text-base">from admin work to customer service and planning</p>
              </div>
            </div>
          </div>
          <blockquote className="border-l-4 border-[#14B8AB] pl-6 py-4 italic text-xl mt-8" data-testid="text-results-quote">
            "The agent feels like an extra team member who keeps every order on track."
            <footer className="text-sm mt-2 not-italic opacity-70">– Logistics Coordinator</footer>
          </blockquote>
        </div>
      </section>

      {/* Inside the System Section */}
      <section className="py-16 px-6 border-b border-black bg-[#f5f5f5]" data-testid="section-system">
        <div className="max-w-[900px] mx-auto">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-8" data-testid="text-system-heading">Inside the System</h2>
          <div className="space-y-6 text-lg leading-relaxed mb-8">
            <p data-testid="text-system-1">
              Data flows seamlessly through the agent's logic:
            </p>
            <div className="bg-white border border-black p-8 text-center font-mono text-sm" data-testid="text-system-flow">
              Orders → ERP System → Agent → Carrier APIs → Internal Dashboard → Notifications & Reports
            </div>
            <p className="text-sm opacity-70 italic" data-testid="text-system-caption">
              Workflow diagram showing integration points between ERP, carrier systems, and internal dashboards.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-black text-white" data-testid="section-cta">
        <div className="max-w-[900px] mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="text-cta-heading">
            Want to make logistics move smoother?
          </h2>
          <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto" data-testid="text-cta-body">
            Let's explore how Stratagentic's AI agents can optimize coordination, tracking, and communication in your supply chain.
          </p>
          <Link href="/#contact-section">
            <a 
              className="inline-block bg-[#2563EB] text-white px-8 py-4 text-lg font-bold hover:bg-[#1d4ed8] transition-colors"
              data-testid="button-cta"
            >
              Book a Discovery Call
            </a>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-black">
        <div className="max-w-[1400px] mx-auto text-center">
          <p className="text-sm opacity-60">© 2024 Stratagentic.ai – All rights reserved</p>
        </div>
      </footer>
    </div>
  );
}
