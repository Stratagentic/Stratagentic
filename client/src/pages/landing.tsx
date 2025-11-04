import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { ContactForm } from "@/components/contact-form";
import { Globe } from "@/components/globe";
import { Search, Ruler, FlaskConical, Menu } from "lucide-react";
import manufacturingImage from "@assets/stock_images/modern_manufacturing_76235c89.jpg";
import logisticsImage from "@assets/Gemini_Generated_Image_jo42yfjo42yfjo42_1762285011101.png";
import prospectResearchImage from "@assets/Gemini_Generated_Image_30j2pr30j2pr30j2_1762258609368.png";
import salesCollateralImage from "@assets/Gemini_Generated_Image_fhapg0fhapg0fhap_1762258437763.png";
import linkedInGrowthImage from "@assets/Gemini_Generated_Image_shucw7shucw7shuc_1762259541274.png";
import outreachEngineImage from "@assets/Gemini_Generated_Image_7bxgiv7bxgiv7bxg_1762260457028.png";
import growthMomentumImage from "@assets/Relaxing2_1762267740236.png";
import experienceInteractionImage from "@assets/Gemini_Generated_Image_te47eete47eete47_1762272190441.png";
import automationIntegrationImage from "@assets/Gemini_Generated_Image_xcxx34xcxx34xcxx_1762283665043.png";
import logoImage from "@assets/Stratagentic_White_1762185093889.png";

const getSessionId = () => {
  let sessionId = sessionStorage.getItem('analytics_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('analytics_session_id', sessionId);
  }
  return sessionId;
};

const trackEvent = async (eventType: string, eventData?: any) => {
  try {
    await fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventType,
        eventData,
        sessionId: getSessionId(),
      }),
    });
  } catch (error) {
    console.error('Analytics tracking error:', error);
  }
};

export default function Landing() {
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);
  const [time, setTime] = useState(new Date());
  const [maxScrollDepth, setMaxScrollDepth] = useState(0);
  const [nextMilestone, setNextMilestone] = useState(25);
  const pageLoadTime = useRef(Date.now());
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  
  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    trackEvent('page_view', { 
      page: 'landing',
      timestamp: new Date().toISOString() 
    });

    const handleBeforeUnload = () => {
      const timeOnPage = Math.floor((Date.now() - pageLoadTime.current) / 1000);
      navigator.sendBeacon('/api/analytics', JSON.stringify({
        eventType: 'time_on_page',
        eventData: { duration: timeOnPage, maxScrollDepth },
        sessionId: getSessionId(),
      }));
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [maxScrollDepth]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercentage = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      
      if (scrollPercentage > maxScrollDepth) {
        setMaxScrollDepth(scrollPercentage);
      }
      
      if (scrollPercentage >= nextMilestone && nextMilestone <= 100) {
        trackEvent('scroll_depth', { depth: nextMilestone });
        setNextMilestone(prev => prev + 25);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [maxScrollDepth, nextMilestone]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionsRef.current.forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      sectionsRef.current.forEach((section) => {
        if (section) {
          observer.unobserve(section);
        }
      });
    };
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
            <img 
              src={logoImage}
              alt="Stratagentic" 
              className="h-10"
              style={{ filter: 'invert(1)' }}
              data-testid="img-logo"
            />
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

      {/* Hero */}
      <section className="h-screen flex items-center justify-center bg-white" style={{ padding: "var(--space-3)" }}>
        <div className="max-w-4xl mx-auto w-full text-center" style={{ padding: "var(--space-7) var(--space-3)" }}>
          {/* Focal Animation */}
          <div className="mb-12 flex justify-center">
            <Globe maxWidth={512} maxHeight={512} />
          </div>
          
          {/* Headline */}
          <h1
            className="font-bold mb-8"
            style={{ 
              fontSize: "clamp(1.4rem, 5.5vw + 0.5rem, 5.5rem)",
              lineHeight: "0.92",
              letterSpacing: "-0.04em"
            }}
            data-testid="text-hero-heading"
          >
            <span style={{ display: "block", whiteSpace: "nowrap" }}>Let's make work</span>
            <span style={{ display: "block", whiteSpace: "nowrap" }}>feel like less work.</span>
          </h1>
          
          {/* Description */}
          <p className="text-sm mb-8 max-w-3xl mx-auto leading-relaxed" data-testid="text-hero-description">
            Stratagentic is an independent strategy and AI & automation studio based in Norway. We move fast and combine strategy, design, and intelligent automation to make growth measurable and sustainable.
          </p>
          
          {/* CTA Button */}
          <button 
            className="inline-flex items-center justify-center bg-black text-white px-6 py-3 text-sm hover-elevate active-elevate-2 transition-all"
            data-testid="button-hero-cta"
          >
            <span className="mr-2">→</span>
            Get started
          </button>
        </div>
      </section>

      {/* Accordion Grid */}
      <section
        className="bg-white"
        data-testid="section-accordion"
      >
        <div className="max-w-[1400px] mx-auto">
          {/* Intelligence & Strategy */}
          <div 
            className={`cursor-pointer transition-all border-b border-gray-300 ${openAccordion === 'intelligence' ? 'py-6 md:py-12' : 'py-4 md:py-6'}`}
            style={{ paddingLeft: "var(--space-3)", paddingRight: "var(--space-3)" }}
            data-testid="accordion-intelligence"
            onClick={() => toggleAccordion('intelligence')}
          >
            {/* Mobile Layout */}
            <div className="md:hidden">
              <div className="flex gap-2 justify-center mb-4">
                <div className="w-32 h-24 bg-[#2563EB]"></div>
                <div className="w-32 h-24 bg-[#2563EB]"></div>
                <div className="w-32 h-24 bg-[#2563EB]"></div>
              </div>
              <h2 className="text-3xl font-bold tracking-tight">
                Intelligence &<br />Strategy
              </h2>
              {openAccordion === 'intelligence' && (
                <div className="mt-6 text-base leading-relaxed animate-in fade-in slide-in-from-top-4 duration-300">
                  <p className="mb-4">Clarity begins here. Objectives become measurable, systems align with business goals, and decisions start making sense together.</p>
                  <p>Forward-thinking companies unlock growth and efficiency when intelligence works across strategy, data, and delivery.</p>
                </div>
              )}
            </div>

            {/* Desktop Layout */}
            <div className={`hidden md:flex items-center justify-between gap-6 ${openAccordion === 'intelligence' ? 'mb-6' : ''}`}>
              <div className="flex items-center gap-6">
                <span className={`text-4xl md:text-5xl font-bold text-[#2563EB] transition-transform ${openAccordion === 'intelligence' ? 'rotate-45' : 'hover:rotate-90'}`}>+</span>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Intelligence & Strategy</h2>
              </div>
              {openAccordion !== 'intelligence' && (
                <div className="flex gap-2">
                  <div className="w-32 h-24 bg-[#2563EB]"></div>
                  <div className="w-32 h-24 bg-[#2563EB]"></div>
                  <div className="w-32 h-24 bg-[#2563EB]"></div>
                </div>
              )}
            </div>

            {openAccordion === 'intelligence' && (
              <div className="hidden md:grid md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-top-4 duration-300">
                <div className="text-base leading-relaxed">
                  <p className="mb-4">Clarity begins here. Objectives become measurable, systems align with business goals, and decisions start making sense together.</p>
                  <p>Forward-thinking companies unlock growth and efficiency when intelligence works across strategy, data, and delivery.</p>
                </div>
                <div className="flex gap-2 justify-end">
                  <div className="w-32 h-24 bg-[#2563EB]"></div>
                  <div className="w-32 h-24 bg-[#2563EB]"></div>
                  <div className="w-32 h-24 bg-[#2563EB]"></div>
                </div>
              </div>
            )}
          </div>

          {/* Automation & Integration */}
          <div 
            className={`cursor-pointer transition-all border-b border-gray-300 ${openAccordion === 'automation' ? 'py-6 md:py-12' : 'py-4 md:py-6'}`}
            style={{ paddingLeft: "var(--space-3)", paddingRight: "var(--space-3)" }}
            data-testid="accordion-automation"
            onClick={() => toggleAccordion('automation')}
          >
            {/* Mobile Layout */}
            <div className="md:hidden">
              <div className="mb-4 overflow-hidden">
                <img src={automationIntegrationImage} alt="" className="w-full h-auto object-cover" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight">
                Automation &<br />Integration
              </h2>
              {openAccordion === 'automation' && (
                <div className="mt-6 text-base leading-relaxed animate-in fade-in slide-in-from-top-4 duration-300">
                  <p className="mb-4">Friction ends here. Tools connect, workflows run on autopilot, and what once slowed things down starts to accelerate progress.</p>
                  <p>Technology begins taking on work so people can focus on what matters.</p>
                </div>
              )}
            </div>

            {/* Desktop Layout */}
            <div className={`hidden md:flex items-center justify-between gap-6 ${openAccordion === 'automation' ? 'mb-6' : ''}`}>
              <div className="flex items-center gap-6">
                <span className={`text-4xl md:text-5xl font-bold text-[#2563EB] transition-transform ${openAccordion === 'automation' ? 'rotate-45' : 'hover:rotate-90'}`}>+</span>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Automation & Integration</h2>
              </div>
              {openAccordion !== 'automation' && (
                <div className="w-[480px] h-24 overflow-hidden">
                  <img src={automationIntegrationImage} alt="" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            {openAccordion === 'automation' && (
              <div className="hidden md:grid md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-top-4 duration-300">
                <div className="text-base leading-relaxed">
                  <p className="mb-4">Friction ends here. Tools connect, workflows run on autopilot, and what once slowed things down starts to accelerate progress.</p>
                  <p>Technology begins taking on work so people can focus on what matters.</p>
                </div>
                <div className="flex justify-end">
                  <div className="w-[480px] h-24 overflow-hidden">
                    <img src={automationIntegrationImage} alt="" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Experience & Interaction */}
          <div 
            className={`cursor-pointer transition-all border-b border-gray-300 ${openAccordion === 'experience' ? 'py-6 md:py-12' : 'py-4 md:py-6'}`}
            style={{ paddingLeft: "var(--space-3)", paddingRight: "var(--space-3)" }}
            data-testid="accordion-experience"
            onClick={() => toggleAccordion('experience')}
          >
            {/* Mobile Layout */}
            <div className="md:hidden">
              <div className="mb-4 overflow-hidden">
                <img src={experienceInteractionImage} alt="" className="w-full h-auto object-cover brightness-110" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight">
                Experience &<br />Interaction
              </h2>
              {openAccordion === 'experience' && (
                <div className="mt-6 text-base leading-relaxed animate-in fade-in slide-in-from-top-4 duration-300">
                  <p className="mb-4">Every touchpoint counts. When systems feel intuitive, teams work faster and customers stay longer.</p>
                  <p>Design, usability, and data combine to create human-centric experiences that drive growth.</p>
                </div>
              )}
            </div>

            {/* Desktop Layout */}
            <div className={`hidden md:flex items-center justify-between gap-6 ${openAccordion === 'experience' ? 'mb-6' : ''}`}>
              <div className="flex items-center gap-6">
                <span className={`text-4xl md:text-5xl font-bold text-[#2563EB] transition-transform ${openAccordion === 'experience' ? 'rotate-45' : 'hover:rotate-90'}`}>+</span>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Experience & Interaction</h2>
              </div>
              {openAccordion !== 'experience' && (
                <div className="w-[480px] h-24 overflow-hidden">
                  <img src={experienceInteractionImage} alt="" className="w-full h-full object-cover brightness-110" />
                </div>
              )}
            </div>

            {openAccordion === 'experience' && (
              <div className="hidden md:grid md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-top-4 duration-300">
                <div className="text-base leading-relaxed">
                  <p className="mb-4">Every touchpoint counts. When systems feel intuitive, teams work faster and customers stay longer.</p>
                  <p>Design, usability, and data combine to create human-centric experiences that drive growth.</p>
                </div>
                <div className="flex justify-end">
                  <div className="w-[480px] h-24 overflow-hidden">
                    <img src={experienceInteractionImage} alt="" className="w-full h-full object-cover brightness-110" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Growth & Momentum */}
          <div 
            className={`cursor-pointer transition-all border-b border-gray-300 ${openAccordion === 'growth' ? 'py-6 md:py-12' : 'py-4 md:py-6'}`}
            style={{ paddingLeft: "var(--space-3)", paddingRight: "var(--space-3)" }}
            data-testid="accordion-growth"
            onClick={() => toggleAccordion('growth')}
          >
            {/* Mobile Layout */}
            <div className="md:hidden">
              <div className="mb-4 overflow-hidden">
                <img src={growthMomentumImage} alt="" className="w-full h-auto object-cover" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight">
                Growth &<br />Momentum
              </h2>
              {openAccordion === 'growth' && (
                <div className="mt-6 text-base leading-relaxed animate-in fade-in slide-in-from-top-4 duration-300">
                  <p className="mb-4">Early wins are only the start. Systems keep improving, operations gain speed, and performance compounds over time.</p>
                  <p>Growth stops being an event and becomes the natural state of your business.</p>
                </div>
              )}
            </div>

            {/* Desktop Layout */}
            <div className={`hidden md:flex items-center justify-between gap-6 ${openAccordion === 'growth' ? 'mb-6' : ''}`}>
              <div className="flex items-center gap-6">
                <span className={`text-4xl md:text-5xl font-bold text-[#2563EB] transition-transform ${openAccordion === 'growth' ? 'rotate-45' : 'hover:rotate-90'}`}>+</span>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Growth & Momentum</h2>
              </div>
              {openAccordion !== 'growth' && (
                <div className="w-[480px] h-24 overflow-hidden">
                  <img src={growthMomentumImage} alt="" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            {openAccordion === 'growth' && (
              <div className="hidden md:grid md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-top-4 duration-300">
                <div className="text-base leading-relaxed">
                  <p className="mb-4">Early wins are only the start. Systems keep improving, operations gain speed, and performance compounds over time.</p>
                  <p>Growth stops being an event and becomes the natural state of your business.</p>
                </div>
                <div className="flex justify-end">
                  <div className="w-[480px] h-24 overflow-hidden">
                    <img src={growthMomentumImage} alt="" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Services */}
      <section
        ref={(el) => (sectionsRef.current[0] = el)}
        className="fade-in-section"
        style={{ padding: "var(--space-7) var(--space-3)" }}
        data-testid="section-value-proposition"
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            <div data-testid="card-value-strategy" className="group">
              <div className="mb-4 transition-all duration-300 origin-left group-hover:scale-110">
                <Search className="w-[60px] h-[60px] text-[#2563EB]" strokeWidth={2.5} />
              </div>
              <h3 className="text-2xl font-bold mb-3 tracking-tight transition-colors group-hover:text-[#2563EB]">
                Targeted Strategy
              </h3>
              <p className="text-base leading-relaxed">
                Define clear objectives. Align systems with business goals. Workshops, user cases and best practice to inform and to guide towards team-wide adoption.
              </p>
            </div>
            <div data-testid="card-value-build" className="group">
              <div className="mb-4 transition-all duration-300 origin-left group-hover:scale-110">
                <Ruler className="w-[60px] h-[60px] text-[#2563EB]" strokeWidth={2.5} />
              </div>
              <h3 className="text-2xl font-bold mb-3 tracking-tight transition-colors group-hover:text-[#2563EB]">
                Custom System Build
              </h3>
              <p className="text-base leading-relaxed">
                Unique cases needs tailored solutions. Scale  with precision with made-to-measure agentic tooling that improves/removes current and future barriers.
              </p>
            </div>
            <div data-testid="card-value-execution" className="group">
              <div className="mb-4 transition-all duration-300 origin-left group-hover:scale-110">
                <FlaskConical className="w-[60px] h-[60px] text-[#2563EB]" strokeWidth={2.5} />
              </div>
              <h3 className="text-2xl font-bold mb-3 tracking-tight transition-colors group-hover:text-[#2563EB]">
                Scaled Execution
              </h3>
              <p className="text-base leading-relaxed">
                Deploy with confidence with proof-of-concept, MVPs or pilot programmes. Accelerate operations continuously as benefits accumulate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Manifesto */}
      <section
        ref={(el) => (sectionsRef.current[1] = el)}
        className="fade-in-section bg-white text-black"
        data-testid="section-better-world"
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="py-12 text-left" style={{ paddingLeft: "var(--space-3)", paddingRight: "var(--space-3)" }}>
            <div className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight space-y-8" data-testid="text-better-world-content">
            <p>Built for those who imagine better.</p>
            <p>No endless decks. No recommendations that gather dust. No six-month roadmaps that never see execution. Just working systems. Real implementations. Actions that run quietly  in the background while you move forward.</p>
            <p>What took ten hours now takes one. Ideas become prototypes, prototypes become results - fast, because the world won't wait. Each project is an exploration: how to make work lighter, decisions sharper, growth inevitable.</p>
            <p>It's not about being big. It's about adapting to progress.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Offerings */}
      <section
        ref={(el) => (sectionsRef.current[2] = el)}
        className="fade-in-section bg-white text-black"
        style={{ padding: "var(--space-7) var(--space-3)" }}
        data-testid="section-offerings"
      >
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-sm font-bold mb-8 tracking-tight" data-testid="text-offerings-heading">
            Ready to start?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="border border-black p-8 hover:border-[#2563EB] transition-all duration-300 group" data-testid="card-offering-single">
              <h3 className="text-xl font-bold mb-4 tracking-tight group-hover:text-[#2563EB] transition-colors">
                Single automation
              </h3>
              <p className="text-sm mb-6 leading-relaxed">
                Start with one focused solution
              </p>
            </div>
            <div className="border border-black p-8 hover:border-[#2563EB] transition-all duration-300 group" data-testid="card-offering-scaled">
              <h3 className="text-xl font-bold mb-4 tracking-tight group-hover:text-[#2563EB] transition-colors">
                Scaled AI system
              </h3>
              <p className="text-sm mb-6 leading-relaxed">
                Implement comprehensive intelligence
              </p>
            </div>
            <div className="border border-black p-8 hover:border-[#2563EB] transition-all duration-300 group" data-testid="card-offering-enterprise">
              <h3 className="text-xl font-bold mb-4 tracking-tight group-hover:text-[#2563EB] transition-colors">
                Enterprise bespoke
              </h3>
              <p className="text-sm mb-6 leading-relaxed">
                Build a custom roadmap
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section
        ref={(el) => (sectionsRef.current[3] = el)}
        className="fade-in-section bg-white text-black border-t border-black overflow-hidden"
        style={{ padding: "var(--space-7) 0" }}
        data-testid="section-case-studies"
      >
        <div className="max-w-[1400px] mx-auto" style={{ paddingLeft: "var(--space-3)", paddingRight: "var(--space-3)" }}>
          <h2 className="text-sm font-bold mb-8 tracking-tight" data-testid="text-case-studies-heading">
            Selected work
          </h2>
        </div>
        <div className="relative">
          <div className="overflow-x-auto overflow-y-hidden scrollbar-hide">
            <div className="flex">
              {/* Manufacturing card hidden for now */}
              {/* <Link href="/case-studies/manufacturing" className="flex-shrink-0 w-[400px] md:w-[500px] mx-4">
                <div className="relative border border-black overflow-hidden group cursor-pointer transition-all duration-300" data-testid="card-case-study-1">
                  <div className="relative aspect-square">
                    <img 
                      src={manufacturingImage} 
                      alt="Modern manufacturing facility with automation" 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      data-testid="img-case-study-1"
                    />
                    <div className="absolute top-8 left-8 right-8 text-black z-10">
                      <p className="text-xs uppercase tracking-wider opacity-80">Manufacturing</p>
                    </div>
                    <div className="absolute bottom-8 left-8 right-8 text-black z-10">
                      <p className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
                        60% efficiency
                        <br />
                        increase
                      </p>
                      <p className="text-sm opacity-90 leading-relaxed">
                        Automated quality control and production scheduling reduced downtime and increased throughput
                      </p>
                    </div>
                  </div>
                </div>
              </Link> */}
              <Link href="/case-studies/logistics" className="flex-shrink-0 w-[400px] md:w-[500px] mx-4">
                <div className="relative border border-black overflow-hidden group cursor-pointer transition-all duration-300" data-testid="card-case-study-2">
                  <div className="relative aspect-square">
                    <img 
                      src={logisticsImage} 
                      alt="Automated logistics warehouse" 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      data-testid="img-case-study-2"
                    />
                    <div className="absolute top-8 left-8 right-8 text-black z-10">
                      <p className="text-xs uppercase tracking-wider opacity-80">Logistics</p>
                    </div>
                    <div className="absolute bottom-8 left-8 right-8 text-black z-10">
                      <p className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
                        40% cost
                        <br />
                        reduction
                      </p>
                      <p className="text-sm opacity-90 leading-relaxed">
                        Smart routing algorithms and inventory optimization cut operational costs while improving delivery times
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
              <Link href="/case-studies/prospect-research" className="flex-shrink-0 w-[400px] md:w-[500px] mx-4">
                <div className="relative border border-black overflow-hidden group cursor-pointer transition-all duration-300" data-testid="card-case-study-3">
                  <div className="relative aspect-square">
                    <img 
                      src={prospectResearchImage} 
                      alt="AI-powered prospect research automation" 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      data-testid="img-case-study-3"
                    />
                    <div className="absolute top-8 left-8 right-8 text-black z-10">
                      <p className="text-xs uppercase tracking-wider opacity-80">Sales Intelligence</p>
                    </div>
                    <div className="absolute bottom-8 left-8 right-8 text-black z-10">
                      <p className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
                        80% time
                        <br />
                        savings
                      </p>
                      <p className="text-sm opacity-90 leading-relaxed">
                        AI agent replaced manual prospecting with personalized, ready-to-use sales insights
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
              <Link href="/case-studies/sales-collateral" className="flex-shrink-0 w-[400px] md:w-[500px] mx-4">
                <div className="relative border border-black overflow-hidden group cursor-pointer transition-all duration-300" data-testid="card-case-study-4">
                  <div className="relative aspect-square">
                    <img 
                      src={salesCollateralImage} 
                      alt="Sales collateral and marketing materials" 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      data-testid="img-case-study-4"
                    />
                    <div className="absolute top-8 left-8 right-8 text-black z-10">
                      <p className="text-xs uppercase tracking-wider opacity-80">Collateral automation</p>
                    </div>
                    <div className="absolute bottom-8 left-8 right-8 text-black z-10">
                      <p className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
                        75% time
                        <br />
                        reduction
                      </p>
                      <p className="text-sm opacity-90 leading-relaxed">
                        Automated creation of branded, context-aware sales materials that match opportunity stage
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
              <Link href="/case-studies/linkedin-growth" className="flex-shrink-0 w-[400px] md:w-[500px] mx-4">
                <div className="relative border border-black overflow-hidden group cursor-pointer transition-all duration-300" data-testid="card-case-study-5">
                  <div className="relative aspect-square">
                    <img 
                      src={linkedInGrowthImage} 
                      alt="LinkedIn content creation automation" 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      data-testid="img-case-study-5"
                    />
                    <div className="absolute top-8 left-8 right-8 text-black z-10">
                      <p className="text-xs uppercase tracking-wider opacity-80">LinkedIn Growth</p>
                    </div>
                    <div className="absolute bottom-8 left-8 right-8 text-black z-10">
                      <p className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
                        10-15 hours
                        <br />
                        saved/month
                      </p>
                      <p className="text-sm opacity-90 leading-relaxed">
                        AI-driven system maintains strong, authentic LinkedIn presence in minutes per week
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
              <Link href="/case-studies/outreach-engine" className="flex-shrink-0 w-[400px] md:w-[500px] mx-4">
                <div className="relative border border-black overflow-hidden group cursor-pointer transition-all duration-300" data-testid="card-case-study-6">
                  <div className="relative aspect-square">
                    <img 
                      src={outreachEngineImage} 
                      alt="Automated outreach and email marketing" 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      data-testid="img-case-study-6"
                    />
                    <div className="absolute top-8 left-8 right-8 text-black z-10">
                      <p className="text-xs uppercase tracking-wider opacity-80">Outreach Engine</p>
                    </div>
                    <div className="absolute bottom-8 left-8 right-8 text-black z-10">
                      <p className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
                        4x outbound
                        <br />
                        volume
                      </p>
                      <p className="text-sm opacity-90 leading-relaxed">
                        AI-powered multi-channel engine personalizes and automates entire outbound workflow
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
              {/* Duplicate set for seamless infinite scroll */}
              <Link href="/case-studies/manufacturing" className="flex-shrink-0 w-[400px] md:w-[500px] mx-4">
                <div className="relative border border-black overflow-hidden group cursor-pointer transition-all duration-300">
                  <div className="relative aspect-square">
                    <img 
                      src={manufacturingImage} 
                      alt="Modern manufacturing facility with automation" 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-8 left-8 right-8 text-black z-10">
                      <p className="text-xs uppercase tracking-wider opacity-80">Manufacturing</p>
                    </div>
                    <div className="absolute bottom-8 left-8 right-8 text-black z-10">
                      <p className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
                        60% efficiency
                        <br />
                        increase
                      </p>
                      <p className="text-sm opacity-90 leading-relaxed">
                        Automated quality control and production scheduling reduced downtime and increased throughput
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
              <Link href="/case-studies/logistics" className="flex-shrink-0 w-[400px] md:w-[500px] mx-4">
                <div className="relative border border-black overflow-hidden group cursor-pointer transition-all duration-300">
                  <div className="relative aspect-square">
                    <img 
                      src={logisticsImage} 
                      alt="Automated logistics warehouse" 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-8 left-8 right-8 text-black z-10">
                      <p className="text-xs uppercase tracking-wider opacity-80">Logistics</p>
                    </div>
                    <div className="absolute bottom-8 left-8 right-8 text-black z-10">
                      <p className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
                        40% cost
                        <br />
                        reduction
                      </p>
                      <p className="text-sm opacity-90 leading-relaxed">
                        Smart routing algorithms and inventory optimization cut operational costs while improving delivery times
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
              <Link href="/case-studies/prospect-research" className="flex-shrink-0 w-[400px] md:w-[500px] mx-4">
                <div className="relative border border-black overflow-hidden group cursor-pointer transition-all duration-300">
                  <div className="relative aspect-square">
                    <img 
                      src={prospectResearchImage} 
                      alt="AI-powered prospect research automation" 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-8 left-8 right-8 text-black z-10">
                      <p className="text-xs uppercase tracking-wider opacity-80">Sales Intelligence</p>
                    </div>
                    <div className="absolute bottom-8 left-8 right-8 text-black z-10">
                      <p className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
                        80% time
                        <br />
                        savings
                      </p>
                      <p className="text-sm opacity-90 leading-relaxed">
                        AI agent replaced manual prospecting with personalized, ready-to-use sales insights
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
              <Link href="/case-studies/sales-collateral" className="flex-shrink-0 w-[400px] md:w-[500px] mx-4">
                <div className="relative border border-black overflow-hidden group cursor-pointer transition-all duration-300">
                  <div className="relative aspect-square">
                    <img 
                      src={salesCollateralImage} 
                      alt="Sales collateral and marketing materials" 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-8 left-8 right-8 text-black z-10">
                      <p className="text-xs uppercase tracking-wider opacity-80">Collateral automation</p>
                    </div>
                    <div className="absolute bottom-8 left-8 right-8 text-black z-10">
                      <p className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
                        75% time
                        <br />
                        reduction
                      </p>
                      <p className="text-sm opacity-90 leading-relaxed">
                        Automated creation of branded, context-aware sales materials that match opportunity stage
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
              <Link href="/case-studies/linkedin-growth" className="flex-shrink-0 w-[400px] md:w-[500px] mx-4">
                <div className="relative border border-black overflow-hidden group cursor-pointer transition-all duration-300">
                  <div className="relative aspect-square">
                    <img 
                      src={linkedInGrowthImage} 
                      alt="LinkedIn content creation automation" 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-8 left-8 right-8 text-black z-10">
                      <p className="text-xs uppercase tracking-wider opacity-80">LinkedIn Growth</p>
                    </div>
                    <div className="absolute bottom-8 left-8 right-8 text-black z-10">
                      <p className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
                        10-15 hours
                        <br />
                        saved/month
                      </p>
                      <p className="text-sm opacity-90 leading-relaxed">
                        AI-driven system maintains strong, authentic LinkedIn presence in minutes per week
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
              <Link href="/case-studies/outreach-engine" className="flex-shrink-0 w-[400px] md:w-[500px] mx-4">
                <div className="relative border border-black overflow-hidden group cursor-pointer transition-all duration-300">
                  <div className="relative aspect-square">
                    <img 
                      src={outreachEngineImage} 
                      alt="Automated outreach and email marketing" 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-8 left-8 right-8 text-black z-10">
                      <p className="text-xs uppercase tracking-wider opacity-80">Outreach Engine</p>
                    </div>
                    <div className="absolute bottom-8 left-8 right-8 text-black z-10">
                      <p className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
                        4x outbound
                        <br />
                        volume
                      </p>
                      <p className="text-sm opacity-90 leading-relaxed">
                        AI-powered multi-channel engine personalizes and automates entire outbound workflow
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact-section"
        ref={(el) => (sectionsRef.current[4] = el)}
        className="fade-in-section bg-white text-black border-t border-black"
        style={{ padding: "var(--space-8) var(--space-3)" }}
        data-testid="section-contact"
      >
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold mb-12 tracking-tight leading-tight" data-testid="text-contact-heading">
            Scale faster than ever – guaranteed results or it's free
          </h2>
          <ContactForm />
          <div className="mt-12 pt-12 border-t border-black">
            <p className="text-lg">
              Or email us directly at{" "}
              <a
                href="mailto:hello@stratagentic.ai"
                className="font-bold hover:text-[#2563EB] transition-colors"
                data-testid="link-email"
              >
                hello@stratagentic.ai↗
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="bg-white text-black border-t border-black"
        style={{ padding: "var(--space-5) var(--space-3)" }}
        data-testid="footer"
      >
        <div className="max-w-[1400px] mx-auto text-sm">
          <p data-testid="text-footer">
            © 2025 Stratagentic – All rights reserved. AI-assisted, human-approved
          </p>
        </div>
      </footer>
    </div>
  );
}
