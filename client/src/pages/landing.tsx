import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { ContactForm } from "@/components/contact-form";
import { Globe } from "@/components/globe";
import logisticsImage from "@assets/20251106_2128_Relaxed Productivity Growth_remix_01k9ddkydze5fbb85envg8ewet_1762463943885.png";
import promptImage from "@assets/20251106_2128_Relaxed Productivity Growth_remix_01k9ddkydze5fbb85envg8ewet_1762463943885.png";
import prospectResearchImage from "@assets/20251106_2144_Yoga with Documents_remix_01k9degg35fj9vbrjbgdcgnxm6_1762463943885.png";
import salesCollateralImage from "@assets/20251106_2132_Reading in the Park_remix_01k9ddv12rfqvrpzqte4g8r9yy_1762463943885.png";
import linkedInGrowthImage from "@assets/20251106_2052_Chatting with AI_simple_compose_01k9dbhq30f8m9968761vrqywq_1762463943885.png";
import outreachEngineImage from "@assets/20251106_2058_Automated Workflow Bliss_remix_01k9dbsp5qejw8148yk03b5qve_1762463943885.png";
import { Header } from "@/components/header";
import { PROCESSED_MANIFESTO, WORD_INDICES } from "@/components/manifesto-utils";

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
  const [expandedUseCases, setExpandedUseCases] = useState<{
    revenue: boolean;
    expansion: boolean;
    operations: boolean;
  }>({
    revenue: false,
    expansion: false,
    operations: false,
  });

  const [expandedServices, setExpandedServices] = useState<{
    intelligence: boolean;
    automation: boolean;
    experience: boolean;
    growth: boolean;
  }>({
    intelligence: false,
    automation: false,
    experience: false,
    growth: false,
  });
  const [highlightedWordIndex, setHighlightedWordIndex] = useState(-1);
// REMOVED: const [manifestoParagraphs, setManifestoParagraphs] = useState<Array<Array<{ text: string; isSpace: boolean }>>>([]);

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

// REMOVED: Manifesto content definition and paragraph splitting useEffect
/*
  useEffect(() => {
    const manifestoTexts = [
      "Built for those who imagine better.",
      "No endless decks. No recommendations that gather dust. No six-month roadmaps that never see execution. Just working systems. Real implementations. Actions that run quietly in the background while you move forward.",
      "What took ten hours now takes one. Ideas become prototypes, prototypes become results - fast, because the world won't wait. Each project is an exploration: how to make work lighter, decisions sharper, growth inevitable.",
      "It's not about being big. It's about adapting to progress."
    ];

    const paragraphs = manifestoTexts.map(text => 
      text.split(/(\s+)/).map(segment => ({
        text: segment,
        isSpace: /^\s+$/.test(segment)
      }))
    );
    
    setManifestoParagraphs(paragraphs);
  }, []);
*/


// UPDATED: Manifesto highlighting logic to use imported constants
  useEffect(() => {
    if (WORD_INDICES.length === 0) return;

    let currentIndex = 0;
    const interval = setInterval(() => {
      setHighlightedWordIndex(WORD_INDICES[currentIndex]);
      currentIndex = (currentIndex + 1) % WORD_INDICES.length;
    }, 200);

    return () => clearInterval(interval);
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
    <Header />

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

      <section
        className="bg-white"
        style={{ padding: "var(--space-7) var(--space-3)" }}
        data-testid="section-services"
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="space-y-0">
            <div 
              className="border-b border-black cursor-pointer group"
              onClick={() => setExpandedServices(prev => ({ ...prev, intelligence: !prev.intelligence }))}
              data-testid="accordion-service-intelligence"
            >
              <div className="py-8 flex items-center justify-between">
                <h3 className="text-2xl font-bold tracking-tight transition-colors group-hover:text-[#2563EB] flex items-center">
                  <span className="text-[#2563EB] mr-4">+</span>
                  Intelligence & Strategy
                </h3>
              </div>
              
              {expandedServices.intelligence && (
                <div className="pb-8 border-t border-black pt-8">
                  <div className="grid md:grid-cols-3 gap-12 items-start">
                    <div>
                      <p className="text-sm leading-relaxed">
                        Define clear objectives. Align systems with business goals. Let's workshop with your team to map workflows, identify bottlenecks, and prioritize what to automate first. No theoretical frameworks - just practical roadmaps that guide adoption and ensure team-wide buy-in.
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-bold mb-2">What You Get:</p>
                      <ul className="text-sm space-y-1 list-none">
                        <li className="flex gap-2">
                          <span className="flex-shrink-0">+</span>
                          <span>Complete workflow audit identifying time-wasters and automation opportunities</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="flex-shrink-0">+</span>
                          <span>Prioritized roadmap showing which processes to automate first for maximum impact</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="flex-shrink-0">+</span>
                          <span>Implementation timeline with realistic milestones and resource requirements</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="flex-shrink-0">+</span>
                          <span>Team alignment workshops ensuring everyone understands the changes</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="space-y-4">
                      <p className="text-sm text-[#2563EB]">
                        <span className="font-bold">Best For:</span> Businesses that know they need automation but don't know where to start. Teams spending more time on repetitive tasks than strategic work.
                      </p>
                      
                      <div className="text-sm">
                        <span className="inline-block bg-black text-white px-2 py-1">1-2 weeks</span>
                        <span className="ml-2">from kickoff to delivery</span>
                      </div>
                    </div>
                </div>
                </div>
              )}
            </div>

            <div 
              className="border-b border-black cursor-pointer group"
              onClick={() => setExpandedServices(prev => ({ ...prev, automation: !prev.automation }))}
              data-testid="accordion-service-automation"
            >
              <div className="py-8 flex items-center justify-between">
                <h3 className="text-2xl font-bold tracking-tight transition-colors group-hover:text-[#2563EB] flex items-center">
                  <span className="text-[#2563EB] mr-4">+</span>
                  Automation & Integration
                </h3>
              </div>
              
              {expandedServices.automation && (
                <div className="pb-8 border-t border-black pt-8">
                  <div className="grid md:grid-cols-3 gap-12 items-start">
                    <div>
                      <p className="text-sm leading-relaxed">
                        Bespoke systems that eliminate repetitive work. Not off-the-shelf tools with monthly fees — tailored automation that fits exactly how your business operates. We integrate with what you already use, so nothing breaks and adoption is immediate without retraining your entire team.
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-bold mb-2">What You Get:</p>
                      <ul className="text-sm space-y-1 list-none">
                        <li className="flex gap-2">
                          <span className="flex-shrink-0">+</span>
                          <span>Custom automation tools built specifically for your unique workflows</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="flex-shrink-0">+</span>
                          <span>Integration with existing systems like CRM, email, spreadsheets, and databases</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="flex-shrink-0">+</span>
                          <span>AI agents that handle customer inquiries, data entry, and routine decisions</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="flex-shrink-0">+</span>
                          <span>Complete handoff documentation so your team owns what we build</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="space-y-4">
                      <p className="text-sm text-[#2563EB]">
                        <span className="font-bold">Best For:</span> Companies with unique processes that generic software cannot handle. Teams tired of manual work that &quot;someone should really automate.&quot;
                      </p>
                      
                      <div className="text-sm">
                        <span className="inline-block bg-black text-white px-2 py-1">2-6 weeks</span>
                        <span className="ml-2">depending on complexity</span>
                      </div>
                    </div>
                </div>
                </div>
              )}
            </div>

            <div 
              className="border-b border-black cursor-pointer group"
              onClick={() => setExpandedServices(prev => ({ ...prev, experience: !prev.experience }))}
              data-testid="accordion-service-experience"
            >
              <div className="py-8 flex items-center justify-between">
                <h3 className="text-2xl font-bold tracking-tight transition-colors group-hover:text-[#2563EB] flex items-center">
                  <span className="text-[#2563EB] mr-4">+</span>
                  Experience & Interaction
                </h3>
              </div>
              
              {expandedServices.experience && (
                <div className="pb-8 border-t border-black pt-8">
                  <div className="grid md:grid-cols-3 gap-12 items-start">
                    <div>
                      <p className="text-sm leading-relaxed">
                        Transform how your team and customers interact with your systems. We design interfaces and workflows that feel natural, not technical. The goal is adoption without training - systems that work the way people think, removing friction from every interaction point your business has.
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-bold mb-2">What You Get:</p>
                      <ul className="text-sm space-y-1 list-none">
                        <li className="flex gap-2">
                          <span className="flex-shrink-0">+</span>
                          <span>User interface design for internal tools and customer-facing applications</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="flex-shrink-0">+</span>
                          <span>Conversational AI that handles support inquiries in your brand voice</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="flex-shrink-0">+</span>
                          <span>Self-service portals that reduce your support workload by 60-80%</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="flex-shrink-0">+</span>
                          <span>Interaction patterns tested with real users, not assumptions or theory</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="space-y-4">
                      <p className="text-sm text-[#2563EB]">
                        <span className="font-bold">Best For:</span> Businesses where adoption is the bottleneck. Teams with powerful systems that nobody actually uses because they're too complicated.
                      </p>
                      
                      <div className="text-sm">
                        <span className="inline-block bg-black text-white px-2 py-1">3-8 weeks</span>
                        <span className="ml-2">for design and implementation</span>
                      </div>
                    </div>
                </div>
                </div>
              )}
            </div>

            <div 
              className="border-b border-black cursor-pointer group"
              onClick={() => setExpandedServices(prev => ({ ...prev, growth: !prev.growth }))}
              data-testid="accordion-service-growth"
            >
              <div className="py-8 flex items-center justify-between">
                <h3 className="text-2xl font-bold tracking-tight transition-colors group-hover:text-[#2563EB] flex items-center">
                  <span className="text-[#2563EB] mr-4">+</span>
                  Growth & Momentum
                </h3>
              </div>
              
              {expandedServices.growth && (
                <div className="pb-8 border-t border-black pt-8">
                  <div className="grid md:grid-cols-3 gap-12 items-start">
                    <div>
                      <p className="text-sm leading-relaxed">
                        Scale revenue without scaling headcount. Automate your go-to-market engine—lead generation, qualification, outreach, and follow-up. Your team focuses on closing deals and serving customers, not chasing prospects or updating spreadsheets with information that should flow automatically.
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-bold mb-2">What You Get:</p>
                      <ul className="text-sm space-y-1 list-none">
                        <li className="flex gap-2">
                          <span className="flex-shrink-0">+</span>
                          <span>Lead scoring and qualification systems that run automatically</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="flex-shrink-0">+</span>
                          <span>Outreach sequences that adapt based on prospect behavior and engagement</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="flex-shrink-0">+</span>
                          <span>Pipeline management that updates itself as deals progress through stages</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="flex-shrink-0">+</span>
                          <span>Performance dashboards showing what's working and what's not in real-time</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="space-y-4">
                      <p className="text-sm text-[#2563EB]">
                        <span className="font-bold">Best For:</span> Sales and marketing teams drowning in manual follow-up. Companies that need to grow revenue faster than they can hire.
                      </p>
                      
                      <div className="text-sm">
                        <span className="inline-block bg-black text-white px-2 py-1">2-4 weeks</span>
                        <span className="ml-2">to first automation live</span>
                      </div>
                    </div>
                </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section
        ref={(el) => (sectionsRef.current[0] = el)}
        className="fade-in-section"
        style={{ padding: "var(--space-7) var(--space-3)" }}
        data-testid="section-use-cases"
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            <div 
              data-testid="card-use-case-revenue" 
              className="group cursor-pointer"
              onClick={() => setExpandedUseCases(prev => ({ ...prev, revenue: !prev.revenue }))}
            >
              <h3 className="text-2xl font-bold mb-3 tracking-tight transition-colors group-hover:text-[#2563EB]">
                Revenue Engine
              </h3>
              <p className="text-sm font-bold mb-3">
                Automate your entire go-to-market system
              </p>
              <p className="text-base leading-relaxed mb-4">
                Transform sales, marketing, and customer success with intelligent automation. Stop losing deals to slow follow-up. Stop burning hours on data entry and status updates.
              </p>
              
              {expandedUseCases.revenue && (
                <div className="mt-4 space-y-4">
                  <div>
                    <p className="text-sm text-[#2563EB] mb-2">What We Automate</p>
                    <ul className="text-sm space-y-1 list-none">
                      <li className="pl-6 -indent-6">
                        <span className="mr-2">+</span>
                        <span>Lead generation and qualification using AI scoring</span>
                      </li>
                      <li className="pl-6 -indent-6">
                        <span className="mr-2">+</span>
                        <span>Sales outreach and follow-ups that never miss an opportunity</span>
                      </li>
                      <li className="pl-6 -indent-6">
                        <span className="mr-2">+</span>
                        <span>Customer support handling 80% of inquiries automatically</span>
                      </li>
                      <li className="pl-6 -indent-6">
                        <span className="mr-2">+</span>
                        <span>Pipeline tracking and reporting that updates in real-time</span>
                      </li>
                    </ul>
                  </div>
                  
                  <p className="text-sm leading-relaxed">
                    <span className="text-[#2563EB]">Real Impact</span> A Nordic B2B company reduced sales admin from 15 hours to 2 hours weekly. Their team closed 40% more deals in the same timeframe.
                  </p>
                  
                  <p className="text-sm leading-relaxed">
                    <span className="text-[#2563EB]">Tech Stack</span> We work with your existing CRM, email platforms, and data systems. No proprietary lock-in.
                  </p>
                  
                  <p className="text-sm leading-relaxed">
                    <span className="text-[#2563EB]">Best For</span> Businesses spending too much time on sales tasks instead of selling. Teams where manual follow-up means lost revenue.
                  </p>
                  
                  <p className="text-sm leading-relaxed">
                    <span className="text-[#2563EB]">Start Here</span> Revenue audit (free) → Custom automation strategy → Implementation in 4-6 weeks
                  </p>
                </div>
              )}
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setExpandedUseCases(prev => ({ ...prev, revenue: !prev.revenue }));
                }}
                className="text-sm text-[#2563EB] hover:text-[#1d4ed8] transition-colors underline mt-2"
                data-testid="button-toggle-revenue"
              >
                {expandedUseCases.revenue ? 'show less' : 'read more'}
              </button>
            </div>
            
            <div 
              data-testid="card-use-case-expansion" 
              className="group cursor-pointer"
              onClick={() => setExpandedUseCases(prev => ({ ...prev, expansion: !prev.expansion }))}
            >
              <h3 className="text-2xl font-bold mb-3 tracking-tight transition-colors group-hover:text-[#2563EB]">
                International Expansion
              </h3>
              <p className="text-sm font-bold mb-3">
                Scale globally without operational overhead
              </p>
              <p className="text-base leading-relaxed mb-4">
                Break language barriers and enter new markets without hiring international teams. AI delivered translation, localization, and cultural adaptation to let you serve customers worldwide.
              </p>
              
              {expandedUseCases.expansion && (
                <div className="mt-4 space-y-4">
                  <div>
                    <p className="text-sm text-[#2563EB] mb-2">What We Automate</p>
                    <ul className="text-sm space-y-1 list-none">
                      <li className="pl-6 -indent-6">
                        <span className="mr-2">+</span>
                        <span>Real-time translation for customer support in 50+ languages</span>
                      </li>
                      <li className="pl-6 -indent-6">
                        <span className="mr-2">+</span>
                        <span>Content localization for websites, marketing, and documentation</span>
                      </li>
                      <li className="pl-6 -indent-6">
                        <span className="mr-2">+</span>
                        <span>Multi-currency pricing and regional compliance handling</span>
                      </li>
                      <li className="pl-6 -indent-6">
                        <span className="mr-2">+</span>
                        <span>Cultural adaptation ensuring your messaging works in each market</span>
                      </li>
                    </ul>
                  </div>
                  
                  <p className="text-sm leading-relaxed">
                    <span className="text-[#2563EB]">Real Impact</span> A Norwegian software company entered three new markets in four months. Zero international hires. Support response time stayed under 2 hours across all time zones.
                  </p>
                  
                  <p className="text-sm leading-relaxed">
                    <span className="text-[#2563EB]">Tech Stack</span> Custom language models trained on your terminology, integrated with your existing systems.
                  </p>
                  
                  <p className="text-sm leading-relaxed">
                    <span className="text-[#2563EB]">Best For</span> Businesses looking to expand internationally without the traditional costs of translation services, international teams, and complex operations management.
                  </p>
                  
                  <p className="text-sm leading-relaxed">
                    <span className="text-[#2563EB]">Start Here</span> Market entry assessment → Localization strategy → Phased rollout over 6-8 weeks
                  </p>
                </div>
              )}
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setExpandedUseCases(prev => ({ ...prev, expansion: !prev.expansion }));
                }}
                className="text-sm text-[#2563EB] hover:text-[#1d4ed8] transition-colors underline mt-2"
                data-testid="button-toggle-expansion"
              >
                {expandedUseCases.expansion ? 'show less' : 'read more'}
              </button>
            </div>
            
            <div 
              data-testid="card-use-case-operations" 
              className="group cursor-pointer"
              onClick={() => setExpandedUseCases(prev => ({ ...prev, operations: !prev.operations }))}
            >
              <h3 className="text-2xl font-bold mb-3 tracking-tight transition-colors group-hover:text-[#2563EB]">
                Operations & Back-Office
              </h3>
              <p className="text-sm font-bold mb-3">
                Eliminate the busywork strangling your business
              </p>
              <p className="text-base leading-relaxed mb-4">
                Automate HR, finance, data processing, and administrative tasks that drain your team's energy. Free employees from repetitive work so they focus on strategic initiatives.
              </p>
              
              {expandedUseCases.operations && (
                <div className="mt-4 space-y-4">
                  <div>
                    <p className="text-sm text-[#2563EB] mb-2">What We Automate</p>
                    <ul className="text-sm space-y-1 list-none">
                      <li className="pl-6 -indent-6">
                        <span className="mr-2">+</span>
                        <span>Invoice processing and expense management running on autopilot</span>
                      </li>
                      <li className="pl-6 -indent-6">
                        <span className="mr-2">+</span>
                        <span>HR onboarding and document processing with zero manual data entry</span>
                      </li>
                      <li className="pl-6 -indent-6">
                        <span className="mr-2">+</span>
                        <span>Data analysis and reporting that takes minutes, not days</span>
                      </li>
                      <li className="pl-6 -indent-6">
                        <span className="mr-2">+</span>
                        <span>Administrative workflows that currently waste 20+ hours weekly</span>
                      </li>
                    </ul>
                  </div>
                  
                  <p className="text-sm leading-relaxed">
                    <span className="text-[#2563EB]">Real Impact</span> A professional services firm cut month-end reporting from 3 days to 45 minutes. Their finance team now spends time on analysis instead of spreadsheet babysitting.
                  </p>
                  
                  <p className="text-sm leading-relaxed">
                    <span className="text-[#2563EB]">Tech Stack</span> Connects to your ERP, HRIS, and existing databases. Works with Excel, Google Sheets, or whatever you already use.
                  </p>
                  
                  <p className="text-sm leading-relaxed">
                    <span className="text-[#2563EB]">Best For</span> Businesses drowning in paperwork and manual data entry. Teams prevented from strategic work because they're stuck on administrative tasks.
                  </p>
                  
                  <p className="text-sm leading-relaxed">
                    <span className="text-[#2563EB]">Start Here</span> Operations audit → Priority workflow automation → Deployment in 3-5 weeks
                  </p>
                </div>
              )}
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setExpandedUseCases(prev => ({ ...prev, operations: !prev.operations }));
                }}
                className="text-sm text-[#2563EB] hover:text-[#1d4ed8] transition-colors underline mt-2"
                data-testid="button-toggle-operations"
              >
                {expandedUseCases.operations ? 'show less' : 'read more'}
              </button>
            </div>
          </div>
        </div>
      </section>

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
              {PROCESSED_MANIFESTO.map((paragraph, pIndex) => {
                let globalIndex = 0;
                for (let i = 0; i < pIndex; i++) {
                  globalIndex += PROCESSED_MANIFESTO[i].length;
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
            <div className="border border-black p-8 flex flex-col" data-testid="card-offering-single">
              <h3 className="text-xl font-bold mb-4 tracking-tight">
                Single Automation
              </h3>
              <p className="text-sm mb-4 leading-relaxed text-[#2563EB]">
                Start with one focused workflow
              </p>
              <p className="text-sm mb-6 leading-relaxed">
                Best for companies wanting to trial automation with a specific pain point before committing to larger transformation.
              </p>
              
              <div className="mb-6">
                <p className="text-sm font-bold mb-2">You Get:</p>
                <ul className="text-sm space-y-1 list-none">
                  <li className="flex gap-2">
                    <span className="flex-shrink-0">+</span>
                    <span>One workflow fully automated</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="flex-shrink-0">+</span>
                    <span>2-week implementation</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="flex-shrink-0">+</span>
                    <span>Handoff training for your team</span>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-2 mt-auto">
                <p className="text-sm">
                  <span className="inline-block bg-black text-white px-2 py-1">Investment: Fixed project fee</span>
                </p>
                <p className="text-sm">
                  <span className="inline-block bg-black text-white px-2 py-1">Timeline: 2-3 weeks start to finish</span>
                </p>
              </div>
            </div>
            
            <div className="border border-black p-8 flex flex-col" data-testid="card-offering-scaled">
              <h3 className="text-xl font-bold mb-4 tracking-tight">
                Scaled AI System
              </h3>
              <p className="text-sm mb-4 leading-relaxed text-[#2563EB]">
                Deploy comprehensive intelligence
              </p>
              <p className="text-sm mb-6 leading-relaxed">
                Best for businesses ready to automate multiple connected workflows and build an integrated automation layer.
              </p>
              
              <div className="mb-6">
                <p className="text-sm font-bold mb-2">You Get:</p>
                <ul className="text-sm space-y-1 list-none">
                  <li className="flex gap-2">
                    <span className="flex-shrink-0">+</span>
                    <span>3-5 automated workflows</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="flex-shrink-0">+</span>
                    <span>Custom AI agents for your needs</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="flex-shrink-0">+</span>
                    <span>6 weeks implementation</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="flex-shrink-0">+</span>
                    <span>3 months optimization support</span>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-2 mt-auto">
                <p className="text-sm">
                  <span className="inline-block bg-black text-white px-2 py-1">Investment: Monthly engagement</span>
                </p>
                <p className="text-sm">
                  <span className="inline-block bg-black text-white px-2 py-1">Timeline: 6-8 weeks to full deployment</span>
                </p>
              </div>
            </div>
            
            <div className="border border-black p-8 flex flex-col" data-testid="card-offering-enterprise">
              <h3 className="text-xl font-bold mb-4 tracking-tight">
                Strategic Transformation
              </h3>
              <p className="text-sm mb-4 leading-relaxed text-[#2563EB]">
                Build a custom automation roadmap
              </p>
              <p className="text-sm mb-6 leading-relaxed">
                Best for complete operational transformation with multiple departments and complex integration requirements.
              </p>
              
              <div className="mb-6">
                <p className="text-sm font-bold mb-2">You Get:</p>
                <ul className="text-sm space-y-1 list-none">
                  <li className="flex gap-2">
                    <span className="flex-shrink-0">+</span>
                    <span>Full automation strategy</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="flex-shrink-0">+</span>
                    <span>Phased implementation across departments</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="flex-shrink-0">+</span>
                    <span>Dedicated team for 6+ months</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="flex-shrink-0">+</span>
                    <span>Continuous optimization and scaling</span>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-2 mt-auto">
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
              <Link href="/case-studies/logistics" className="flex-shrink-0 w-[320px] md:w-[500px] mx-4">
                <div className="relative border border-black overflow-hidden cursor-pointer" data-testid="card-case-study-2">
                  <div className="relative aspect-square">
                    <img 
                      src={logisticsImage} 
                      alt="Relaxed productivity and growth illustration" 
                      className="absolute inset-0 w-full h-full pt-8 object-contain object-top transition-none"
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
               <Link href="/case-studies/prompt-engine" className="flex-shrink-0 w-[320px] md:w-[500px] mx-4">
                <div className="relative border border-black overflow-hidden cursor-pointer" data-testid="card-case-study-2">
                  <div className="relative aspect-square">
                    <img 
                      src={promptImage} 
                      alt="Relaxin gardening while AI works illustration" 
                      className="absolute inset-0 w-full h-full pt-8 object-contain object-top transition-none"
                      data-testid="img-case-study-2"
                    />
                    <div className="absolute top-8 left-8 right-8 text-black z-10">
                      <p className="text-xs uppercase tracking-wider opacity-80">Logistics</p>
                    </div>
                    <div className="absolute bottom-8 left-8 right-8 text-black z-10">
                      <p className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
                        70% less reprompting
                      </p>
                      <p className="text-sm opacity-90 leading-relaxed">
                        A refined, multi-stage pipeline turns rough ideas into customized, high-performance prompts.
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
                      className="absolute inset-0 w-full h-full pt-8 object-contain object-top transition-none"
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
                      className="absolute inset-0 w-full h-full pt-8 object-contain object-top transition-none"
                      data-testid="img-case-study-4"
                    />
                    <div className="absolute top-8 left-8 right-8 text-black z-10">
                      <p className="text-xs uppercase tracking-wider opacity-80">Collateral automation</p>
                    </div>
                    <div className="absolute bottom-8 left-8 right-8 text-black z-10">
                      <p className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
                        Same-day turnaround
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
                      className="absolute inset-0 w-full h-full pt-8 object-contain object-top transition-none"
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
                      className="absolute inset-0 w-full h-full pt-8 object-contain object-top transition-none"
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
            </div>
          </div>
        </div>
      </section>

      <section
        id="contact-section"
        ref={(el) => (sectionsRef.current[4] = el)}
        className="fade-in-section bg-white text-black border-t border-black"
        style={{ padding: "var(--space-8) var(--space-3)" }}
        data-testid="section-contact"
      >
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight leading-tight" data-testid="text-contact-heading">
            Scale faster than ever - guaranteed results or it&apos;s free.
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
