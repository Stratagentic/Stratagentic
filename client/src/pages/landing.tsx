import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { ContactForm } from "@/components/contact-form";
import { Globe } from "@/components/globe";
import { Menu } from "lucide-react";
import logisticsImage from "@assets/20251106_2128_Relaxed Productivity Growth_remix_01k9ddkydze5fbb85envg8ewet_1762463943885.png";
import prospectResearchImage from "@assets/20251106_2144_Yoga with Documents_remix_01k9degg35fj9vbrjbgdcgnxm6_1762463943885.png";
import salesCollateralImage from "@assets/20251106_2132_Reading in the Park_remix_01k9ddv12rfqvrpzqte4g8r9yy_1762463943885.png";
import linkedInGrowthImage from "@assets/20251106_2052_Chatting with AI_simple_compose_01k9dbhq30f8m9968761vrqywq_1762463943885.png";
import outreachEngineImage from "@assets/20251106_2058_Automated Workflow Bliss_remix_01k9dbsp5qejw8148yk03b5qve_1762463943885.png";
import growthMomentumImage from "@assets/Screenshot 2025-11-04 at 22.32.37_1762292437388.jpg";
import experienceInteractionImage from "@assets/Screenshot 2025-11-04 at 22.27.30_1762292416859.jpg";
import automationIntegrationImage from "@assets/Screenshot 2025-11-04 at 22.49.31_1762292999371.jpg";
import intelligenceStrategyImage from "@assets/Screenshot 2025-11-04 at 23.01.10_1762293691773.jpg";
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
  const [menuOpen, setMenuOpen] = useState(false);

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
            Independent strategy and AI automation studio in Norway. 
            We move fast and combine strategy, design, and intelligent 
            automation to make growth measurable and sustainable.
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

      {/* Services Grid */}
      <section
        className="bg-white"
        style={{ padding: "var(--space-7) var(--space-3)" }}
        data-testid="section-services"
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Intelligence & Strategy */}
            <div className="border border-black p-8" data-testid="card-service-intelligence">
              <h3 className="text-2xl font-bold mb-4 tracking-tight">Intelligence & Strategy</h3>
              
              <p className="text-sm mb-6 leading-relaxed">
                Define clear objectives. Align systems with business goals. We run workshops with your team to map workflows, identify bottlenecks, and prioritize what to automate first. No theoretical frameworks—just practical roadmaps that guide adoption.
              </p>
              
              <div className="mb-6">
                <p className="text-sm font-bold mb-2">What You Get:</p>
                <ul className="text-sm space-y-1 list-disc list-inside">
                  <li>Complete workflow audit identifying time-wasters and automation opportunities</li>
                  <li>Prioritized roadmap showing which processes to automate first for maximum impact</li>
                  <li>Implementation timeline with realistic milestones and resource requirements</li>
                  <li>Team alignment workshops ensuring everyone understands the changes</li>
                </ul>
              </div>
              
              <p className="text-sm mb-4 text-[#2563EB]">
                <span className="font-bold">Best For:</span> Businesses that know they need automation but don't know where to start. Teams spending more time on repetitive tasks than strategic work.
              </p>
              
              <div className="text-sm">
                <span className="inline-block bg-black text-white px-2 py-1">1-2 weeks</span>
                <span className="ml-2">from kickoff to delivery</span>
              </div>
            </div>

            {/* Automation & Integration */}
            <div className="border border-black p-8" data-testid="card-service-automation">
              <h3 className="text-2xl font-bold mb-4 tracking-tight">Automation & Integration</h3>
              
              <p className="text-sm mb-6 leading-relaxed">
                We build custom systems that eliminate repetitive work. Not off-the-shelf tools with monthly fees—tailored automation that fits exactly how your business operates. We integrate with what you already use, so nothing breaks and adoption is immediate.
              </p>
              
              <div className="mb-6">
                <p className="text-sm font-bold mb-2">What You Get:</p>
                <ul className="text-sm space-y-1 list-disc list-inside">
                  <li>Custom automation tools built for your specific workflows</li>
                  <li>Integration with existing systems (CRM, email, spreadsheets, databases)</li>
                  <li>AI agents that handle customer inquiries, data entry, and routine decisions</li>
                  <li>Handoff documentation so your team owns what we build</li>
                </ul>
              </div>
              
              <p className="text-sm mb-4 text-[#2563EB]">
                <span className="font-bold">Best For:</span> Companies with unique processes that generic software can't handle. Teams tired of manual work that "someone should really automate."
              </p>
              
              <div className="text-sm">
                <span className="inline-block bg-black text-white px-2 py-1">2-6 weeks</span>
                <span className="ml-2">depending on complexity</span>
              </div>
            </div>

            {/* Experience & Interaction */}
            <div className="border border-black p-8" data-testid="card-service-experience">
              <h3 className="text-2xl font-bold mb-4 tracking-tight">Experience & Interaction</h3>
              
              <p className="text-sm mb-6 leading-relaxed">
                Transform how your team and customers interact with your systems. We design interfaces and workflows that feel natural, not technical. The goal is adoption without training—systems that work the way people think.
              </p>
              
              <div className="mb-6">
                <p className="text-sm font-bold mb-2">What You Get:</p>
                <ul className="text-sm space-y-1 list-disc list-inside">
                  <li>User interface design for internal tools and customer-facing applications</li>
                  <li>Conversational AI that handles support inquiries in your brand voice</li>
                  <li>Self-service portals that reduce support workload by 60-80%</li>
                  <li>Interaction patterns tested with real users, not assumptions</li>
                </ul>
              </div>
              
              <p className="text-sm mb-4 text-[#2563EB]">
                <span className="font-bold">Best For:</span> Businesses where adoption is the bottleneck. Teams with powerful systems that nobody actually uses because they're too complicated.
              </p>
              
              <div className="text-sm">
                <span className="inline-block bg-black text-white px-2 py-1">3-8 weeks</span>
                <span className="ml-2">for design and implementation</span>
              </div>
            </div>

            {/* Growth & Momentum */}
            <div className="border border-black p-8" data-testid="card-service-growth">
              <h3 className="text-2xl font-bold mb-4 tracking-tight">Growth & Momentum</h3>
              
              <p className="text-sm mb-6 leading-relaxed">
                Scale revenue without scaling headcount. We automate your go-to-market engine—lead generation, qualification, outreach, and follow-up. Your team focuses on closing deals and serving customers, not chasing prospects.
              </p>
              
              <div className="mb-6">
                <p className="text-sm font-bold mb-2">What You Get:</p>
                <ul className="text-sm space-y-1 list-disc list-inside">
                  <li>Lead scoring and qualification that runs automatically</li>
                  <li>Outreach sequences that adapt based on prospect behavior</li>
                  <li>Pipeline management that updates itself as deals progress</li>
                  <li>Performance dashboards showing what's working and what's not</li>
                </ul>
              </div>
              
              <p className="text-sm mb-4 text-[#2563EB]">
                <span className="font-bold">Best For:</span> Sales and marketing teams drowning in manual follow-up. Companies that need to grow revenue faster than they can hire.
              </p>
              
              <div className="text-sm">
                <span className="inline-block bg-black text-white px-2 py-1">2-4 weeks</span>
                <span className="ml-2">to first automation, continuous optimization after</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section
        ref={(el) => (sectionsRef.current[0] = el)}
        className="fade-in-section"
        style={{ padding: "var(--space-7) var(--space-3)" }}
        data-testid="section-use-cases"
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            <div data-testid="card-use-case-revenue" className="group">
              <h3 className="text-2xl font-bold mb-3 tracking-tight transition-colors group-hover:text-[#2563EB]">
                Revenue Engine
              </h3>
              <p className="text-sm font-bold mb-3">
                Automate your entire go-to-market system
              </p>
              <p className="text-base leading-relaxed mb-4">
                Transform sales, marketing, and customer success with intelligent automation. Stop losing deals to slow follow-up. Stop burning hours on data entry and status updates.
              </p>
              <a href="#" className="text-sm text-black hover:text-[#2563EB] transition-colors underline">
                read more
              </a>
            </div>
            <div data-testid="card-use-case-expansion" className="group">
              <h3 className="text-2xl font-bold mb-3 tracking-tight transition-colors group-hover:text-[#2563EB]">
                International Expansion
              </h3>
              <p className="text-sm font-bold mb-3">
                Scale globally without operational overhead
              </p>
              <p className="text-base leading-relaxed mb-4">
                Break language barriers and enter new markets without hiring international teams. AI-powered translation, localization, and cultural adaptation let you serve customers worldwide.
              </p>
              <a href="#" className="text-sm text-black hover:text-[#2563EB] transition-colors underline">
                read more
              </a>
            </div>
            <div data-testid="card-use-case-operations" className="group">
              <h3 className="text-2xl font-bold mb-3 tracking-tight transition-colors group-hover:text-[#2563EB]">
                Operations & Back-Office
              </h3>
              <p className="text-sm font-bold mb-3">
                Eliminate the busywork strangling your business
              </p>
              <p className="text-base leading-relaxed mb-4">
                Automate HR, finance, data processing, and administrative tasks that drain your team's energy. Free employees from repetitive work so they focus on strategic initiatives that grow your business.
              </p>
              <a href="#" className="text-sm text-black hover:text-[#2563EB] transition-colors underline">
                read more
              </a>
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
                Single Automation
              </h3>
              <p className="text-sm mb-4 leading-relaxed">
                Start with one focused workflow
              </p>
              <p className="text-sm mb-6 leading-relaxed">
                Best for companies wanting to test automation with a specific pain point before committing to larger transformation.
              </p>
              
              <div className="mb-6">
                <p className="text-sm font-bold mb-2">You Get:</p>
                <ul className="text-sm space-y-1 ml-4">
                  <li>One workflow fully automated</li>
                  <li>2-week implementation</li>
                  <li>Handoff training for your team</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="inline-block bg-black text-white px-2 py-1">Investment: Fixed project fee</span>
                </p>
                <p className="text-sm">
                  <span className="inline-block bg-black text-white px-2 py-1">Timeline: 2-3 weeks start to finish</span>
                </p>
              </div>
            </div>
            
            <div className="border border-black p-8 hover:border-[#2563EB] transition-all duration-300 group" data-testid="card-offering-scaled">
              <h3 className="text-xl font-bold mb-4 tracking-tight group-hover:text-[#2563EB] transition-colors">
                Scaled AI System
              </h3>
              <p className="text-sm mb-4 leading-relaxed">
                Deploy comprehensive intelligence
              </p>
              <p className="text-sm mb-6 leading-relaxed">
                Best for businesses ready to automate multiple connected workflows and build an integrated automation layer.
              </p>
              
              <div className="mb-6">
                <p className="text-sm font-bold mb-2">You Get:</p>
                <ul className="text-sm space-y-1 ml-4">
                  <li>3-5 automated workflows</li>
                  <li>Custom AI agents for your needs</li>
                  <li>6 weeks implementation</li>
                  <li>3 months optimization support</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="inline-block bg-black text-white px-2 py-1">Investment: Monthly engagement</span>
                </p>
                <p className="text-sm">
                  <span className="inline-block bg-black text-white px-2 py-1">Timeline: 6-8 weeks to full deployment</span>
                </p>
              </div>
            </div>
            
            <div className="border border-black p-8 hover:border-[#2563EB] transition-all duration-300 group" data-testid="card-offering-enterprise">
              <h3 className="text-xl font-bold mb-4 tracking-tight group-hover:text-[#2563EB] transition-colors">
                Strategic Transformation
              </h3>
              <p className="text-sm mb-4 leading-relaxed">
                Build a custom automation roadmap
              </p>
              <p className="text-sm mb-6 leading-relaxed">
                Best for complete operational transformation with multiple departments and complex integration requirements.
              </p>
              
              <div className="mb-6">
                <p className="text-sm font-bold mb-2">You Get:</p>
                <ul className="text-sm space-y-1 ml-4">
                  <li>Full automation strategy</li>
                  <li>Phased implementation across departments</li>
                  <li>Dedicated team for 6+ months</li>
                  <li>Continuous optimization and scaling</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="inline-block bg-black text-white px-2 py-1">Investment: Quarterly partnership</span>
                </p>
                <p className="text-sm">
                  <span className="inline-block bg-black text-white px-2 py-1">Timeline: Custom per scope</span>
                </p>
              </div>
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
          <div className="overflow-x-auto overflow-y-hidden scrollbar-hide" style={{ WebkitOverflowScrolling: 'touch' }}>
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
              <Link href="/case-studies/logistics" className="flex-shrink-0 w-[320px] md:w-[500px] mx-4">
                <div className="relative border border-black overflow-hidden cursor-pointer" data-testid="card-case-study-2">
                  <div className="relative aspect-square">
                    <img 
                      src={logisticsImage} 
                      alt="Relaxed productivity and growth illustration" 
                      className="absolute inset-0 w-full h-full pt-8 object-contain object-top"
                      data-testid="img-case-study-2"
                    />
                    <div className="absolute top-8 left-8 right-8 text-black z-10">
                      <p className="text-xs uppercase tracking-wider opacity-80">Logistics</p>
                    </div>
                    <div className="absolute bottom-8 left-8 right-8 text-black z-10">
                      <p className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
                        40% cost reduction
                      </p>
                      <p className="text-sm opacity-90 leading-relaxed">
                        Smart routing algorithms and inventory optimization cut operational costs while improving delivery times
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
              <Link href="/case-studies/prospect-research" className="flex-shrink-0 w-[320px] md:w-[500px] mx-4">
                <div className="relative border border-black overflow-hidden cursor-pointer" data-testid="card-case-study-3">
                  <div className="relative aspect-square">
                    <img 
                      src={prospectResearchImage} 
                      alt="Yoga with documents illustration" 
                      className="absolute inset-0 w-full h-full pt-8 object-contain object-top"
                      data-testid="img-case-study-3"
                    />
                    <div className="absolute top-8 left-8 right-8 text-black z-10">
                      <p className="text-xs uppercase tracking-wider opacity-80">Sales Intelligence</p>
                    </div>
                    <div className="absolute bottom-8 left-8 right-8 text-black z-10">
                      <p className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
                        80% time savings
                      </p>
                      <p className="text-sm opacity-90 leading-relaxed">
                        AI agent replaced manual prospecting with personalized, ready-to-use sales insights
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
              <Link href="/case-studies/sales-collateral" className="flex-shrink-0 w-[320px] md:w-[500px] mx-4">
                <div className="relative border border-black overflow-hidden cursor-pointer" data-testid="card-case-study-4">
                  <div className="relative aspect-square">
                    <img 
                      src={salesCollateralImage} 
                      alt="Reading in the park illustration" 
                      className="absolute inset-0 w-full h-full pt-8 object-contain object-top"
                      data-testid="img-case-study-4"
                    />
                    <div className="absolute top-8 left-8 right-8 text-black z-10">
                      <p className="text-xs uppercase tracking-wider opacity-80">Collateral automation</p>
                    </div>
                    <div className="absolute bottom-8 left-8 right-8 text-black z-10">
                      <p className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
                        75% time reduction
                      </p>
                      <p className="text-sm opacity-90 leading-relaxed">
                        Automated creation of branded, context-aware sales materials that match opportunity stage
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
              <Link href="/case-studies/linkedin-growth" className="flex-shrink-0 w-[320px] md:w-[500px] mx-4">
                <div className="relative border border-black overflow-hidden cursor-pointer" data-testid="card-case-study-5">
                  <div className="relative aspect-square">
                    <img 
                      src={linkedInGrowthImage} 
                      alt="Chatting with AI illustration" 
                      className="absolute inset-0 w-full h-full pt-8 object-contain object-top"
                      data-testid="img-case-study-5"
                    />
                    <div className="absolute top-8 left-8 right-8 text-black z-10">
                      <p className="text-xs uppercase tracking-wider opacity-80">LinkedIn Growth</p>
                    </div>
                    <div className="absolute bottom-8 left-8 right-8 text-black z-10">
                      <p className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
                        10-15 hours saved/month
                      </p>
                      <p className="text-sm opacity-90 leading-relaxed">
                        AI-driven system maintains strong, authentic LinkedIn presence in minutes per week
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
              <Link href="/case-studies/outreach-engine" className="flex-shrink-0 w-[320px] md:w-[500px] mx-4">
                <div className="relative border border-black overflow-hidden cursor-pointer" data-testid="card-case-study-6">
                  <div className="relative aspect-square">
                    <img 
                      src={outreachEngineImage} 
                      alt="Automated workflow bliss illustration" 
                      className="absolute inset-0 w-full h-full pt-8 object-contain object-top"
                      data-testid="img-case-study-6"
                    />
                    <div className="absolute top-8 left-8 right-8 text-black z-10">
                      <p className="text-xs uppercase tracking-wider opacity-80">Outreach Engine</p>
                    </div>
                    <div className="absolute bottom-8 left-8 right-8 text-black z-10">
                      <p className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
                        4x outbound volume
                      </p>
                      <p className="text-sm opacity-90 leading-relaxed">
                        AI-powered multi-channel engine personalizes and automates entire outbound workflow
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
              {/* Duplicate set for seamless infinite scroll */}
              {/* <Link href="/case-studies/manufacturing" className="flex-shrink-0 w-[400px] md:w-[500px] mx-4">
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
              </Link> */}
              <Link href="/case-studies/logistics" className="flex-shrink-0 w-[320px] md:w-[500px] mx-4">
                <div className="relative border border-black overflow-hidden cursor-pointer">
                  <div className="relative aspect-square">
                    <img 
                      src={logisticsImage} 
                      alt="Relaxed productivity and growth illustration" 
                      className="absolute inset-0 w-full h-full pt-8 object-contain object-top"
                    />
                    <div className="absolute top-8 left-8 right-8 text-black z-10">
                      <p className="text-xs uppercase tracking-wider opacity-80">Logistics</p>
                    </div>
                    <div className="absolute bottom-8 left-8 right-8 text-black z-10">
                      <p className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
                        40% cost reduction
                      </p>
                      <p className="text-sm opacity-90 leading-relaxed">
                        Smart routing algorithms and inventory optimization cut operational costs while improving delivery times
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
              <Link href="/case-studies/prospect-research" className="flex-shrink-0 w-[320px] md:w-[500px] mx-4">
                <div className="relative border border-black overflow-hidden cursor-pointer">
                  <div className="relative aspect-square">
                    <img 
                      src={prospectResearchImage} 
                      alt="Yoga with documents illustration" 
                      className="absolute inset-0 w-full h-full pt-8 object-contain object-top"
                    />
                    <div className="absolute top-8 left-8 right-8 text-black z-10">
                      <p className="text-xs uppercase tracking-wider opacity-80">Sales Intelligence</p>
                    </div>
                    <div className="absolute bottom-8 left-8 right-8 text-black z-10">
                      <p className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
                        80% time savings
                      </p>
                      <p className="text-sm opacity-90 leading-relaxed">
                        AI agent replaced manual prospecting with personalized, ready-to-use sales insights
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
              <Link href="/case-studies/sales-collateral" className="flex-shrink-0 w-[320px] md:w-[500px] mx-4">
                <div className="relative border border-black overflow-hidden cursor-pointer">
                  <div className="relative aspect-square">
                    <img 
                      src={salesCollateralImage} 
                      alt="Reading in the park illustration" 
                      className="absolute inset-0 w-full h-full pt-8 object-contain object-top"
                    />
                    <div className="absolute top-8 left-8 right-8 text-black z-10">
                      <p className="text-xs uppercase tracking-wider opacity-80">Collateral automation</p>
                    </div>
                    <div className="absolute bottom-8 left-8 right-8 text-black z-10">
                      <p className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
                        75% time reduction
                      </p>
                      <p className="text-sm opacity-90 leading-relaxed">
                        Automated creation of branded, context-aware sales materials that match opportunity stage
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
              <Link href="/case-studies/linkedin-growth" className="flex-shrink-0 w-[320px] md:w-[500px] mx-4">
                <div className="relative border border-black overflow-hidden cursor-pointer">
                  <div className="relative aspect-square">
                    <img 
                      src={linkedInGrowthImage} 
                      alt="Chatting with AI illustration" 
                      className="absolute inset-0 w-full h-full pt-8 object-contain object-top"
                    />
                    <div className="absolute top-8 left-8 right-8 text-black z-10">
                      <p className="text-xs uppercase tracking-wider opacity-80">LinkedIn Growth</p>
                    </div>
                    <div className="absolute bottom-8 left-8 right-8 text-black z-10">
                      <p className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
                        10-15 hours saved/month
                      </p>
                      <p className="text-sm opacity-90 leading-relaxed">
                        AI-driven system maintains strong, authentic LinkedIn presence in minutes per week
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
              <Link href="/case-studies/outreach-engine" className="flex-shrink-0 w-[320px] md:w-[500px] mx-4">
                <div className="relative border border-black overflow-hidden cursor-pointer">
                  <div className="relative aspect-square">
                    <img 
                      src={outreachEngineImage} 
                      alt="Automated workflow bliss illustration" 
                      className="absolute inset-0 w-full h-full pt-8 object-contain object-top"
                    />
                    <div className="absolute top-8 left-8 right-8 text-black z-10">
                      <p className="text-xs uppercase tracking-wider opacity-80">Outreach Engine</p>
                    </div>
                    <div className="absolute bottom-8 left-8 right-8 text-black z-10">
                      <p className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
                        4x outbound volume
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
