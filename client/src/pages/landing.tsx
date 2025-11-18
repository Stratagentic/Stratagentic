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
import logoImage from "@assets/Stratagentic_White_1762185093889.png";

// Types
type ExpandedState = {
  revenue: boolean;
  expansion: boolean;
  operations: boolean;
};

type ServiceExpandedState = {
  intelligence: boolean;
  automation: boolean;
  experience: boolean;
  growth: boolean;
};

type WordSegment = {
  text: string;
  isSpace: boolean;
};

// Analytics utilities
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

// Constants
const MANIFESTO_TEXTS = [
  "Built for those who imagine better.",
  "No endless decks. No recommendations that gather dust. No six-month roadmaps that never see execution. Just working systems. Real implementations. Actions that run quietly in the background while you move forward.",
  "What took ten hours now takes one. Ideas become prototypes, prototypes become results - fast, because the world won't wait. Each project is an exploration: how to make work lighter, decisions sharper, growth inevitable.",
  "It's not about being big. It's about adapting to progress."
];

export default function Landing() {
  // Refs
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);
  const pageLoadTime = useRef(Date.now());

  // State
  const [time, setTime] = useState(new Date());
  const [maxScrollDepth, setMaxScrollDepth] = useState(0);
  const [nextMilestone, setNextMilestone] = useState(25);
  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedUseCases, setExpandedUseCases] = useState<ExpandedState>({
    revenue: false,
    expansion: false,
    operations: false,
  });
  const [expandedServices, setExpandedServices] = useState<ServiceExpandedState>({
    intelligence: false,
    automation: false,
    experience: false,
    growth: false,
  });
  const [highlightedWordIndex, setHighlightedWordIndex] = useState(-1);
  const [manifestoParagraphs, setManifestoParagraphs] = useState<WordSegment[][]>([]);

  // Clock effect
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Page view tracking
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
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [maxScrollDepth]);

  // Scroll tracking
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

  // Intersection observer for fade-in sections
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
      if (section) observer.observe(section);
    });

    return () => {
      sectionsRef.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  // Parse manifesto text
  useEffect(() => {
    const paragraphs = MANIFESTO_TEXTS.map(text => 
      text.split(/(\s+)/).map(segment => ({
        text: segment,
        isSpace: /^\s+$/.test(segment)
      }))
    );
    setManifestoParagraphs(paragraphs);
  }, []);

  // Animate word highlighting
  useEffect(() => {
    if (manifestoParagraphs.length === 0) return;

    let globalIndex = 0;
    const wordIndices: number[] = [];
    
    manifestoParagraphs.forEach(paragraph => {
      paragraph.forEach(word => {
        if (!word.isSpace) {
          wordIndices.push(globalIndex);
        }
        globalIndex++;
      });
    });

    if (wordIndices.length === 0) return;

    let currentIndex = 0;
    const interval = setInterval(() => {
      setHighlightedWordIndex(wordIndices[currentIndex]);
      currentIndex = (currentIndex + 1) % wordIndices.length;
    }, 200);

    return () => clearInterval(interval);
  }, [manifestoParagraphs]);

  const toggleUseCase = (key: keyof ExpandedState) => {
    setExpandedUseCases(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleService = (key: keyof ServiceExpandedState) => {
    setExpandedServices(prev => ({ ...prev, [key]: !prev[key] }));
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
                className="text-sm hover:text-[#2563EB] transition-colors whitespace-nowrap"
                data-testid="link-menu-faqs"
              >
                FAQs
              </Link>
              <a 
                href="#team" 
                className="text-sm hover:text-[#2563EB] transition-colors whitespace-nowrap"
                data-testid="link-menu-team"
              >
                Team
              </a>
              <a 
                href="#resources" 
                className="text-sm hover:text-[#2563EB] transition-colors whitespace-nowrap"
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
          <div className="mb-12 flex justify-center">
            <Globe maxWidth={512} maxHeight={512} />
          </div>
          
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
          
          <p className="text-sm mb-8 max-w-3xl mx-auto leading-relaxed" data-testid="text-hero-description">
            Independent strategy and AI automation studio in Norway. 
            We move fast and combine strategy, design, and intelligent 
            automation to make growth measurable and sustainable.
          </p>
          
          <button 
            className="inline-flex items-center justify-center bg-black text-white px-6 py-3 text-sm hover-elevate active-elevate-2 transition-all"
            data-testid="button-hero-cta"
          >
            <span className="mr-2">→</span>
            Get started
          </button>
        </div>
      </section>

      {/* Services Accordion */}
      <section
        className="bg-white"
        style={{ padding: "var(--space-7) var(--space-3)" }}
        data-testid="section-services"
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="space-y-0">
            {/* Intelligence & Strategy */}
            <ServiceAccordion
              title="Intelligence & Strategy"
              isExpanded={expandedServices.intelligence}
              onToggle={() => toggleService('intelligence')}
              testId="intelligence"
            >
              <ServiceContent
                description="Define clear objectives. Align systems with business goals. Let's workshop with your team to map workflows, identify bottlenecks, and prioritize what to automate first. No theoretical frameworks - just practical roadmaps that guide adoption and ensure team-wide buy-in."
                benefits={[
                  "Complete workflow audit identifying time-wasters and automation opportunities",
                  "Prioritized roadmap showing which processes to automate first for maximum impact",
                  "Implementation timeline with realistic milestones and resource requirements",
                  "Team alignment workshops ensuring everyone understands the changes"
                ]}
                bestFor="Businesses that know they need automation but don't know where to start. Teams spending more time on repetitive tasks than strategic work."
                timeline="1-2 weeks"
                timelineDetail="from kickoff to delivery"
              />
            </ServiceAccordion>

            {/* Automation & Integration */}
            <ServiceAccordion
              title="Automation & Integration"
              isExpanded={expandedServices.automation}
              onToggle={() => toggleService('automation')}
              testId="automation"
            >
              <ServiceContent
                description="Bespoke systems that eliminate repetitive work. Not off-the-shelf tools with monthly fees — tailored automation that fits exactly how your business operates. We integrate with what you already use, so nothing breaks and adoption is immediate without retraining your entire team."
                benefits={[
                  "Custom automation tools built specifically for your unique workflows",
                  "Integration with existing systems like CRM, email, spreadsheets, and databases",
                  "AI agents that handle customer inquiries, data entry, and routine decisions",
                  "Complete handoff documentation so your team owns what we build"
                ]}
                bestFor="Companies with unique processes that generic software can't handle. Teams tired of manual work that someone should really automate."
                timeline="2-6 weeks"
                timelineDetail="depending on complexity"
              />
            </ServiceAccordion>

            {/* Experience & Interaction */}
            <ServiceAccordion
              title="Experience & Interaction"
              isExpanded={expandedServices.experience}
              onToggle={() => toggleService('experience')}
              testId="experience"
            >
              <ServiceContent
                description="Transform how your team and customers interact with your systems. We design interfaces and workflows that feel natural, not technical. The goal is adoption without training - systems that work the way people think, removing friction from every interaction point your business has."
                benefits={[
                  "User interface design for internal tools and customer-facing applications",
                  "Conversational AI that handles support inquiries in your brand voice",
                  "Self-service portals that reduce your support workload by 60-80%",
                  "Interaction patterns tested with real users, not assumptions or theory"
                ]}
                bestFor="Businesses where adoption is the bottleneck. Teams with powerful systems that nobody actually uses because they're too complicated."
                timeline="3-8 weeks"
                timelineDetail="for design and implementation"
              />
            </ServiceAccordion>

            {/* Growth & Momentum */}
            <ServiceAccordion
              title="Growth & Momentum"
              isExpanded={expandedServices.growth}
              onToggle={() => toggleService('growth')}
              testId="growth"
            >
              <ServiceContent
                description="Scale revenue without scaling headcount. Automate your go-to-market engine—lead generation, qualification, outreach, and follow-up. Your team focuses on closing deals and serving customers, not chasing prospects or updating spreadsheets with information that should flow automatically."
                benefits={[
                  "Lead scoring and qualification systems that run automatically",
                  "Outreach sequences that adapt based on prospect behavior and engagement",
                  "Pipeline management that updates itself as deals progress through stages",
                  "Performance dashboards showing what's working and what's not in real-time"
                ]}
                bestFor="Sales and marketing teams drowning in manual follow-up. Companies that need to grow revenue faster than they can hire."
                timeline="2-4 weeks"
                timelineDetail="to first automation live"
              />
            </ServiceAccordion>
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
            <UseCaseCard
              title="Revenue Engine"
              subtitle="Automate your entire go-to-market system"
              description="Transform sales, marketing, and customer success with intelligent automation. Stop losing deals to slow follow-up. Stop burning hours on data entry and status updates."
              isExpanded={expandedUseCases.revenue}
              onToggle={() => toggleUseCase('revenue')}
              testId="revenue"
            >
              <UseCaseDetails
                automations={[
                  "Lead generation and qualification using AI scoring",
                  "Sales outreach and follow-ups that never miss an opportunity",
                  "Customer support handling 80% of inquiries automatically",
                  "Pipeline tracking and reporting that updates in real-time"
                ]}
                impact="A Nordic B2B company reduced sales admin from 15 hours to 2 hours weekly. Their team closed 40% more deals in the same timeframe."
                techStack="We work with your existing CRM, email platforms, and data systems. No proprietary lock-in."
                bestFor="Businesses spending too much time on sales tasks instead of selling. Teams where manual follow-up means lost revenue."
                startHere="Revenue audit (free) → Custom automation strategy → Implementation in 4-6 weeks"
              />
            </UseCaseCard>

            <UseCaseCard
              title="International Expansion"
              subtitle="Scale globally without operational overhead"
              description="Break language barriers and enter new markets without hiring international teams. AI delivered translation, localization, and cultural adaptation to let you serve customers worldwide."
              isExpanded={expandedUseCases.expansion}
              onToggle={() => toggleUseCase('expansion')}
              testId="expansion"
            >
              <UseCaseDetails
                automations={[
                  "Real-time translation for customer support in 50+ languages",
                  "Content localization for websites, marketing, and documentation",
                  "Multi-currency pricing and regional compliance handling",
                  "Cultural adaptation ensuring your messaging works in each market"
                ]}
                impact="A Norwegian software company entered three new markets in four months. Zero international hires. Support response time stayed under 2 hours across all time zones."
                techStack="Custom language models trained on your terminology, integrated with your existing systems."
                bestFor="Businesses looking to expand internationally without the traditional costs of translation services, international teams, and complex operations management."
                startHere="Market entry assessment → Localization strategy → Phased rollout over 6-8 weeks"
              />
            </UseCaseCard>

            <UseCaseCard
              title="Operations & Back-Office"
              subtitle="Eliminate the busywork strangling your business"
              description="Automate HR, finance, data processing, and administrative tasks that drain your team's energy. Free employees from repetitive work so they focus on strategic initiatives."
              isExpanded={expandedUseCases.operations}
              onToggle={() => toggleUseCase('operations')}
              testId="operations"
            >
              <UseCaseDetails
                automations={[
                  "Invoice processing and expense management running on autopilot",
                  "HR onboarding and document processing with zero manual data entry",
                  "Data analysis and reporting that takes minutes, not days",
                  "Administrative workflows that currently waste 20+ hours weekly"
                ]}
                impact="A professional services firm cut month-end reporting from 3 days to 45 minutes. Their finance team now spends time on analysis instead of spreadsheet babysitting."
                techStack="Connects to your ERP, HRIS, and existing databases. Works with Excel, Google Sheets, or whatever you already use."
                bestFor="Businesses drowning in paperwork and manual data entry. Teams prevented from strategic work because they're stuck on administrative tasks."
                startHere="Operations audit → Priority workflow automation → Deployment in 3-5 weeks"
              />
            </UseCaseCard>
          </div>
        </div>
      </section>

      {/* Manifesto */}
      <section
        ref={(el) => (sectionsRef.current[1] = el)}
        className="fade-in-section bg-white text-black"
        data-testid="section-better-world"
      >
        <div className="max-w-[1400px] mx-auto px-[var(--space-3)]">
          <div className="py-12 text-left">
            <div 
              className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight space-y-8" 
              data-testid="text-better-world-content"
            >
              {manifestoParagraphs.map((paragraph, pIndex) => {
                let globalIndex = 0;
                for (let i = 0; i < pIndex; i++) {
                  globalIndex += manifestoParagraphs[i].length;
                }
                
                return (
                  <p key={pIndex}>
                    {paragraph.map((word, wIndex) => {
                      const currentGlobalIndex = globalIndex + wIndex;
                      return (
                        <span
                          key={wIndex}
                          className={`inline-block transition-colors duration-300 ${
                            currentGlobalIndex === highlightedWordIndex ? 'text-[#2563EB]' : 'text-black'
                          }`}
                          style={{ whiteSpace: word.isSpace ? 'pre' : 'normal' }}
                        >
                          {word.text}
                        </span>
                      );
                    })}
                  </p>
                );
              })}
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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight tracking-tight" data-testid="text-offerings-heading">
            Ready to start?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <OfferingCard
              title="Single Automation"
              subtitle="Start with one focused workflow"
              description="Best for companies wanting to trial automation with a specific pain point before committing to larger transformation."
              benefits={[
                "One workflow fully automated",
                "2-week implementation",
                "Handoff training for your team"
              ]}
              investment="Fixed project fee"
              timeline="2-3 weeks start to finish"
              testId="single"
            />

            <OfferingCard
              title="Scaled AI System"
              subtitle="Deploy comprehensive intelligence"
              description="Best for businesses ready to automate multiple connected workflows and build an integrated automation layer."
              benefits={[
                "3-5 automated workflows",
                "Custom AI agents for your needs",
                "6 weeks implementation",
                "3 months optimization support"
              ]}
              investment="Monthly engagement"
              timeline="6-8 weeks to full deployment"
              testId="scaled"
            />

            <OfferingCard
              title="Strategic Transformation"
              subtitle="Build a custom automation roadmap"
              description="Best for complete operational transformation with multiple departments and complex integration requirements."
              benefits={[
                "Full automation strategy",
                "Phased implementation across departments",
                "Dedicated team for 6+ months",
                "Continuous optimization and scaling"
              ]}
              investment="Quarterly partnership"
              timeline="Custom per scope"
              testId="enterprise"
            />
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section
        ref={(el) => (sectionsRef.current[3] = el)}
        className="fade-in-section bg-white text-black border-t border-black overflow-hidden"
        style={{ padding: "var(--space-7) 0" }}
        data-testid="section-case-studies"
      >
        <div className="max-w-[1400px] mx-auto" style={{ paddingLeft: "var(--space-3)", paddingRight: "var(--space-3)" }}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight tracking-tight" data-testid="text-case-studies-heading">
            Selected work
          </h2>
        </div>
        <div className="relative">
          <div className="overflow-x-auto overflow-y-hidden scrollbar-hide" style={{ WebkitOverflowScrolling: 'touch' }}>
            <div className="flex">
              <CaseStudyCard
                href="/case-studies/logistics"
                image={logisticsImage}
                category="Logistics"
                title="40% cost reduction"
                description="Smart routing algorithms and inventory optimization cut operational costs while improving delivery times"
                testId="2"
              />
              
              <CaseStudyCard
                href="/case-studies/prospect-research"
                image={prospectResearchImage}
                category="Sales Intelligence"
                title="80% time savings"
                description="AI agent replaced manual prospecting with personalized, ready-to-use sales insights"
                testId="3"
              />
              
              <CaseStudyCard
                href="/case-studies/sales-collateral"
                image={salesCollateralImage}
                category="Collateral automation"
                title="Same-day turnaround"
                description="Automated creation of branded, context-aware sales materials that match opportunity stage"
                testId="4"
              />
              
              <CaseStudyCard
                href="/case-studies/linkedin-growth"
                image={linkedInGrowthImage}
                category="LinkedIn Growth"
                title="10-15 hours saved/month"
                description="AI-driven system maintains strong, authentic LinkedIn presence in minutes per week"
                testId="5"
              />
              
              <CaseStudyCard
                href="/case-studies/outreach-engine"
                image={outreachEngineImage}
                category="Outreach Engine"
                title="4x outbound volume"
                description="AI-powered multi-channel engine personalizes and automates entire outbound workflow"
                testId="6"
              />
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
          <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight leading-tight" data-testid="text-contact-heading">
            Scale faster than ever - guaranteed results or it's free.
          </h2>
          
          <div className="mb-12 max-w-3xl">
            <p className="text-lg mb-6 leading-relaxed">
              Get your free bespoke AI Opportunity audit. We identify your biggest time-wasters and automation opportunities, identifying 10+ hours of weekly savings.
            </p>
            <ul className="space-y-3 text-base">
              <li className="flex items-start">
                <span className="font-bold mr-2">ROI guarantee:</span>
                <span>Save more than you spend or we work until you do</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-2">Quick implementation:</span>
                <span>First automation live within 30 days</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-2">No lock-in:</span>
                <span>You own everything we build</span>
              </li>
            </ul>
          </div>
          
          <ContactForm />
          
          <p className="text-xs mt-6 text-gray-600">
            Limited spots available this month. By submitting, you agree to our Privacy Policy and Terms of Service.
          </p>
          
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

// Sub-components
type ServiceAccordionProps = {
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  testId: string;
  children: React.ReactNode;
};

function ServiceAccordion({ title, isExpanded, onToggle, testId, children }: ServiceAccordionProps) {
  return (
    <div 
      className="border-b border-black cursor-pointer group"
      onClick={onToggle}
      data-testid={`accordion-service-${testId}`}
    >
      <div className="py-8 flex items-center justify-between">
        <h3 className="text-2xl font-bold tracking-tight transition-colors group-hover:text-[#2563EB] flex items-center">
          <span className="text-[#2563EB] mr-4">+</span>
          {title}
        </h3>
      </div>
      
      {isExpanded && (
        <div className="pb-8 border-t border-black pt-8">
          {children}
        </div>
      )}
    </div>
  );
}

type ServiceContentProps = {
  description: string;
  benefits: string[];
  bestFor: string;
  timeline: string;
  timelineDetail: string;
