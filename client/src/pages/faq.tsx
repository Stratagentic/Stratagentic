import { useState, useEffect } from "react";
import { Link } from "wouter";
import logoImage from "@assets/Stratagentic_White_1762185093889.png";

export default function FAQ() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
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
                src={logoImage}
                alt="Stratagentic" 
                className="h-10 cursor-pointer"
                style={{ filter: 'invert(1)' }}
                data-testid="img-logo"
              />
            </Link>
          </div>
          <div className="text-right">
            <div className="text-sm" data-testid="text-time">{formatTime(time)}</div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-white text-black border-t border-black" style={{ padding: "var(--space-8) var(--space-3)" }}>
        <div className="max-w-[1400px] mx-auto">
          <h1 
            className="font-bold mb-6"
            style={{ 
              fontSize: "clamp(2rem, 6vw + 0.5rem, 6rem)",
              lineHeight: "0.92",
              letterSpacing: "-0.04em"
            }}
            data-testid="text-hero-heading"
          >
            Frequently Asked Questions
          </h1>
          <p className="text-lg max-w-5xl leading-relaxed" data-testid="text-hero-description">
            Your operations run smoother, your team achieves more, and progress feels effortless.
          </p>
        </div>
      </section>

      {/* Strategy Section */}
      <section 
        className="bg-white text-black border-t border-gray-300"
        style={{ padding: "var(--space-7) var(--space-3)" }}
        data-testid="section-strategy"
      >
        <div className="max-w-[900px] mx-auto">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-8" data-testid="text-strategy-heading">Strategy</h2>
          
          <div className="space-y-8">
            <div data-testid="faq-strategy-1">
              <h3 className="text-xl font-bold mb-3">What if I don't have a clear strategy yet?</h3>
              <p className="text-base leading-relaxed">
                No problem. Our free Strategy Agent helps you clarify goals, uncover growth opportunities, and define an actionable direction. It guides you through key questions so your AI Opportunity Report is grounded in real business objectives, even if you are starting from scratch.
              </p>
            </div>

            <div data-testid="faq-strategy-2">
              <h3 className="text-xl font-bold mb-3">What if we already have a strategy?</h3>
              <p className="text-base leading-relaxed">
                Perfect. We align your AI roadmap to existing goals and help refine your priorities beyond AI, including growth, process design, and execution.
              </p>
            </div>

            <div data-testid="faq-strategy-3">
              <h3 className="text-xl font-bold mb-3">How do you identify which parts of our business can benefit most from AI?</h3>
              <p className="text-base leading-relaxed">
                We start with an AI Audit to map your workflows, data, and goals. From there, we identify quick wins, bottlenecks, and long-term efficiency gains, ensuring every recommendation has a measurable outcome.
              </p>
            </div>

            <div data-testid="faq-strategy-4">
              <h3 className="text-xl font-bold mb-3">Do we need to change how we work before implementing AI?</h3>
              <p className="text-base leading-relaxed">
                Not necessarily. Most improvements build around your existing systems. When process changes are recommended, they are designed to make operations simpler, not more complex.
              </p>
            </div>

            <div data-testid="faq-strategy-5">
              <h3 className="text-xl font-bold mb-3">Can you still build useful systems if our data isn't perfect?</h3>
              <p className="text-base leading-relaxed">
                Yes. Many clients begin with fragmented or incomplete data. We design systems that improve data quality over time through structured collection and integration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Solutions Section */}
      <section 
        className="bg-white text-black border-t border-gray-300"
        style={{ padding: "var(--space-7) var(--space-3)" }}
        data-testid="section-solutions"
      >
        <div className="max-w-[900px] mx-auto">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-8" data-testid="text-solutions-heading">AI Solutions</h2>
          
          <div className="space-y-8">
            <div data-testid="faq-solutions-1">
              <h3 className="text-xl font-bold mb-3">What are AI agents, and what can they do?</h3>
              <p className="text-base leading-relaxed">
                AI agents are intelligent systems that perform business tasks autonomously, from prospect research and customer engagement to data reporting and content creation. They handle repetitive work, surface insights, and scale output without extra headcount.
              </p>
            </div>

            <div data-testid="faq-solutions-2">
              <h3 className="text-xl font-bold mb-3">Do you build everything from scratch, or adapt existing tools?</h3>
              <p className="text-base leading-relaxed">
                We combine both approaches. Some systems are built from the ground up using APIs and workflows, while others integrate best-in-class platforms such as n8n, Zapier, Relevance AI, or custom GPTs, always tailored to your stack and goals.
              </p>
            </div>

            <div data-testid="faq-solutions-3">
              <h3 className="text-xl font-bold mb-3">Can your AI systems integrate with our existing tools?</h3>
              <p className="text-base leading-relaxed">
                Yes. Integration is core to every build. We connect CRMs, marketing platforms, databases, and internal tools so your data flows seamlessly between systems.
              </p>
            </div>

            <div data-testid="faq-solutions-4">
              <h3 className="text-xl font-bold mb-3">How do you handle data security and privacy?</h3>
              <p className="text-base leading-relaxed">
                We follow strict data governance and GDPR compliance standards. Where possible, we use secure EU-based hosting and local processing. Client data remains confidential and under your control at all times.
              </p>
            </div>

            <div data-testid="faq-solutions-5">
              <h3 className="text-xl font-bold mb-3">Does AI replace people, or make their work easier?</h3>
              <p className="text-base leading-relaxed">
                AI supports, not replaces. Our goal is to remove manual friction so your team can focus on higher-value work such as strategy, relationships, and creativity.
              </p>
            </div>

            <div data-testid="faq-solutions-6">
              <h3 className="text-xl font-bold mb-3">What happens if an automation or AI agent fails or produces errors?</h3>
              <p className="text-base leading-relaxed">
                Every system includes error handling, human oversight, and continuous monitoring. If something fails, we identify the cause, adjust logic, and deploy fixes to prevent repeat issues.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process and Support Section */}
      <section 
        className="bg-white text-black border-t border-gray-300"
        style={{ padding: "var(--space-7) var(--space-3)" }}
        data-testid="section-process"
      >
        <div className="max-w-[900px] mx-auto">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-8" data-testid="text-process-heading">Process and Support</h2>
          
          <div className="space-y-8">
            <div data-testid="faq-process-1">
              <h3 className="text-xl font-bold mb-3">What are the stages of your implementation process?</h3>
              <p className="text-base leading-relaxed">
                We begin with a short discovery and audit, followed by design, system build, testing, and live rollout. Each stage includes clear milestones, reviews, and client input.
              </p>
            </div>

            <div data-testid="faq-process-2">
              <h3 className="text-xl font-bold mb-3">How much effort is required from our team during implementation?</h3>
              <p className="text-base leading-relaxed">
                Minimal. We do the heavy lifting. Your role is to validate goals, provide access to systems, and review progress at key checkpoints.
              </p>
            </div>

            <div data-testid="faq-process-3">
              <h3 className="text-xl font-bold mb-3">How long does implementation take?</h3>
              <p className="text-base leading-relaxed">
                Most client systems go live within 2 to 6 weeks, depending on complexity and integrations.
              </p>
            </div>

            <div data-testid="faq-process-4">
              <h3 className="text-xl font-bold mb-3">What happens after the system is live?</h3>
              <p className="text-base leading-relaxed">
                We provide post-launch optimization, monitoring, and regular performance reviews. As your needs evolve, we adjust automations and introduce new capabilities.
              </p>
            </div>

            <div data-testid="faq-process-5">
              <h3 className="text-xl font-bold mb-3">Do you offer training for internal teams?</h3>
              <p className="text-base leading-relaxed">
                Yes. We provide tailored onboarding, process documentation, and optional AI literacy sessions to ensure your team understands how to manage and extend the system independently.
              </p>
            </div>

            <div data-testid="faq-process-6">
              <h3 className="text-xl font-bold mb-3">Can you collaborate with our existing consultants or IT providers?</h3>
              <p className="text-base leading-relaxed">
                Absolutely. We often work alongside internal teams, marketing agencies, and technology vendors to ensure smooth integration and shared success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Results and Confidence Section */}
      <section 
        className="bg-white text-black border-t border-gray-300"
        style={{ padding: "var(--space-7) var(--space-3)" }}
        data-testid="section-results"
      >
        <div className="max-w-[900px] mx-auto">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-8" data-testid="text-results-heading">Results and Confidence</h2>
          
          <div className="space-y-8">
            <div data-testid="faq-results-1">
              <h3 className="text-xl font-bold mb-3">What kind of impact can we expect from your AI systems?</h3>
              <p className="text-base leading-relaxed">
                Results vary by scope, but most clients experience significant gains in efficiency, output, and speed of execution. We focus on measurable outcomes that directly support growth or reduce cost.
              </p>
            </div>

            <div data-testid="faq-results-2">
              <h3 className="text-xl font-bold mb-3">Can we start small, or do you require a full-scale engagement?</h3>
              <p className="text-base leading-relaxed">
                You can start small. Many clients begin with a pilot project or focused automation to validate value before scaling further.
              </p>
            </div>

            <div data-testid="faq-results-3">
              <h3 className="text-xl font-bold mb-3">What happens if the implementation doesn't deliver results?</h3>
              <p className="text-base leading-relaxed">
                We treat every system as a partnership. If performance falls short, we work iteratively to resolve it. Your success defines our success.
              </p>
            </div>

            <div data-testid="faq-results-4">
              <h3 className="text-xl font-bold mb-3">Do you offer pilot projects or proofs of concept?</h3>
              <p className="text-base leading-relaxed">
                Yes. Pilot builds are an excellent way to test automation value quickly before rolling out larger systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Closing Section */}
      <section 
        className="bg-white text-black border-t border-gray-300"
        style={{ padding: "var(--space-7) var(--space-3)" }}
        data-testid="section-closing"
      >
        <div className="max-w-[900px] mx-auto text-center">
          <p className="text-lg leading-relaxed mb-4">
            If your question isn't covered here, we will address it during your free AI Automation Audit, where we map your systems, identify growth barriers, and uncover new efficiencies.
          </p>
          <p className="text-lg font-bold">
            Our goal is simple: your operations run smoother, your team achieves more, and progress feels effortless.
          </p>
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
