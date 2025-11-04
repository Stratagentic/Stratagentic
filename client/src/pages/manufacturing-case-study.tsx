import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu } from "lucide-react";
import manufacturingImage from "@assets/stock_images/modern_manufacturing_76235c89.jpg";

export default function ManufacturingCaseStudy() {
  const [time, setTime] = useState(new Date());
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header style={{ padding: "var(--space-3)" }}>
        <div className="max-w-[1400px] mx-auto flex justify-between items-start">
          <div>
            <Link href="/">
              <img 
                src="https://stratagentic.ai/assets/stratagenticwhite-DDEPFJWf.png"
                alt="Stratagentic" 
                className="h-10 cursor-pointer"
                style={{ filter: 'invert(1)' }}
                data-testid="img-logo"
              />
            </Link>
          </div>
          <div 
            className="relative flex items-center overflow-hidden"
            onMouseEnter={() => setMenuOpen(true)}
            onMouseLeave={() => setMenuOpen(false)}
          >
            <div className={`flex items-center gap-6 transition-all duration-300 ease-out ${menuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8 pointer-events-none'}`}>
              <Link 
                href="/faq" 
                className="text-sm hover:text-[#2563EB] transition-colors whitespace-nowrap hover:transform-none"
                style={{ transform: 'none' }}
                data-testid="link-menu-faqs"
              >
                FAQs
              </Link>
              <a 
                href="#team" 
                className="text-sm hover:text-[#2563EB] transition-colors whitespace-nowrap hover:transform-none"
                style={{ transform: 'none' }}
                data-testid="link-menu-team"
              >
                Team
              </a>
              <a 
                href="#resources" 
                className="text-sm hover:text-[#2563EB] transition-colors whitespace-nowrap hover:transform-none"
                style={{ transform: 'none' }}
                data-testid="link-menu-resources"
              >
                Resources
              </a>
            </div>
            <button 
              className={`p-2 absolute right-0 transition-all duration-300 ease-out ${menuOpen ? 'opacity-0 translate-x-8 pointer-events-none' : 'opacity-100 translate-x-0'}`}
              data-testid="button-menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Image */}
      <section className="relative h-[60vh] min-h-[400px]" data-testid="section-hero">
        <img 
          src={manufacturingImage} 
          alt="Modern manufacturing facility with automation" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0" style={{ padding: "var(--space-7) var(--space-3)" }}>
          <div className="max-w-[1400px] mx-auto text-white">
            <p className="text-xs mb-4 uppercase tracking-wider opacity-80" data-testid="text-category">Manufacturing</p>
            <h1 
              className="font-bold mb-6"
              style={{ 
                fontSize: "clamp(2rem, 6vw + 0.5rem, 6rem)",
                lineHeight: "0.92",
                letterSpacing: "-0.04em"
              }}
              data-testid="text-hero-heading"
            >
              60% efficiency increase
            </h1>
            <p className="text-lg max-w-3xl opacity-90 leading-relaxed" data-testid="text-hero-description">
              Automated quality control and production scheduling reduced downtime and increased throughput
            </p>
          </div>
        </div>
      </section>

      {/* Challenge */}
      <section 
        className="bg-white text-black border-t border-black"
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
                Manual processes created bottlenecks and inconsistent quality
              </p>
            </div>
            <div className="text-base leading-relaxed space-y-4">
              <p>
                A mid-sized manufacturing company struggled with production inefficiencies. Quality control relied on manual inspections, production scheduling was reactive rather than predictive, and machine downtime often went undetected until it caused delays.
              </p>
              <p>
                The result: inconsistent product quality, frequent production delays, and operational costs that eroded profit margins.
              </p>
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
                Intelligent automation across quality control and scheduling
              </p>
            </div>
            <div className="text-base leading-relaxed space-y-4">
              <p>
                We implemented computer vision for automated quality inspection, catching defects in real-time with 99.2% accuracy. Predictive maintenance algorithms analyzed machine data to forecast failures before they happened.
              </p>
              <p>
                Production scheduling became dynamic, automatically adjusting to demand fluctuations, material availability, and machine capacity. The entire system learned and improved continuously.
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
              <p className="text-5xl font-bold mb-4 text-[#2563EB]">60%</p>
              <p className="text-base font-bold mb-2">Efficiency increase</p>
              <p className="text-sm leading-relaxed opacity-70">Production throughput improved significantly through optimized scheduling</p>
            </div>
            <div className="border border-black p-8" data-testid="card-metric-2">
              <p className="text-5xl font-bold mb-4 text-[#2563EB]">85%</p>
              <p className="text-base font-bold mb-2">Defect reduction</p>
              <p className="text-sm leading-relaxed opacity-70">Automated quality control caught issues before they reached customers</p>
            </div>
            <div className="border border-black p-8" data-testid="card-metric-3">
              <p className="text-5xl font-bold mb-4 text-[#2563EB]">40%</p>
              <p className="text-base font-bold mb-2">Downtime reduction</p>
              <p className="text-sm leading-relaxed opacity-70">Predictive maintenance prevented unexpected machine failures</p>
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
            Ready to transform your operations?
          </h2>
          <Link href="/#contact-section">
            <button 
              className="inline-flex items-center justify-center bg-black text-white px-6 py-3 text-sm hover-elevate active-elevate-2 transition-all"
              data-testid="button-cta"
            >
              <span className="mr-2">→</span>
              Get in touch
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
