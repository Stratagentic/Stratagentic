import { useEffect, useRef, useState } from "react";

export default function Landing() {
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
      second: '2-digit',
      hour12: false 
    });
  };

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="border-b border-black" style={{ padding: "var(--space-3)" }}>
        <div className="max-w-[1400px] mx-auto flex justify-between items-start">
          <div>
            <h1 className="font-bold text-xl tracking-tight" data-testid="text-logo">
              STRATAGENTIC.AI
            </h1>
          </div>
          <div className="text-right">
            <div className="text-sm" data-testid="text-time">{formatTime(time)}</div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center bg-black text-white overflow-hidden">
        <video
          className="hero-video-bg"
          autoPlay
          loop
          muted
          playsInline
          data-testid="video-hero-background"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-gradient-abstract-background-loop-26104-large.mp4"
            type="video/mp4"
          />
        </video>
        <div className="hero-overlay" />
        <div className="relative z-10 text-center max-w-5xl mx-auto" style={{ padding: "var(--space-7) var(--space-3)" }}>
          <h1
            className="font-bold leading-none tracking-tighter mb-8"
            style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)" }}
            data-testid="text-hero-heading"
          >
            Your business becomes
            <br />
            faster, smarter, lighter.
          </h1>
          <p
            className="text-lg md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed text-gray-200"
            data-testid="text-hero-subheading"
          >
            You unlock efficiency and scale with intelligent systems designed for progress.
          </p>
          <a
            href="mailto:hello@stratagentic.ai"
            className="inline-block bg-[#00FF85] text-black font-bold px-12 py-4 hover:bg-[#00e673] transition-colors"
            data-testid="button-hero-cta"
          >
            Start your transformation
          </a>
        </div>
      </section>

      {/* Intro */}
      <section style={{ padding: "var(--space-7) var(--space-3)" }}>
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 gap-8">
          <div>
            <p className="text-5xl font-bold leading-tight tracking-tight" data-testid="text-intro-heading">
              Transformation built for progress.
            </p>
          </div>
          <div>
            <p className="text-lg leading-relaxed" data-testid="text-intro-description">
              STRATAGENTIC.AI is your partner in intelligent automation. You explore the intersection of strategy, technology, and execution.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section
        ref={(el) => (sectionsRef.current[0] = el)}
        className="fade-in-section border-t border-black"
        style={{ padding: "var(--space-7) var(--space-3)" }}
        data-testid="section-value-proposition"
      >
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-sm font-bold mb-8 tracking-tight" data-testid="text-value-heading">
            YOURSERVICES(03)
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div data-testid="card-value-strategy">
              <div className="mb-4">
                <span className="text-6xl font-bold">+</span>
              </div>
              <h3 className="text-2xl font-bold mb-3 tracking-tight">
                Targetedstrategy
              </h3>
              <p className="text-base leading-relaxed">
                You define clear objectives. Your systems align with business goals.
              </p>
            </div>
            <div data-testid="card-value-build">
              <div className="mb-4">
                <span className="text-6xl font-bold">+</span>
              </div>
              <h3 className="text-2xl font-bold mb-3 tracking-tight">
                Customsystembuild
              </h3>
              <p className="text-base leading-relaxed">
                You receive tailored solutions. Your infrastructure scales with precision.
              </p>
            </div>
            <div data-testid="card-value-execution">
              <div className="mb-4">
                <span className="text-6xl font-bold">+</span>
              </div>
              <h3 className="text-2xl font-bold mb-3 tracking-tight">
                Scaledexecution
              </h3>
              <p className="text-base leading-relaxed">
                You deploy with confidence. Your operations accelerate continuously.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Manifesto */}
      <section
        ref={(el) => (sectionsRef.current[1] = el)}
        className="fade-in-section bg-black text-white border-t border-white"
        style={{ padding: "var(--space-8) var(--space-3)" }}
        data-testid="section-better-world"
      >
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-sm font-bold mb-8 tracking-tight" data-testid="text-better-world-heading">
            STRATAGENTIC.AI
          </h2>
          <p className="text-4xl md:text-5xl font-bold leading-tight tracking-tight" style={{ wordSpacing: '-0.3em' }} data-testid="text-better-world-content">
            Abetterworldstartswithin yourbusiness. Nolongmeetings. Nocomplexprocesses. Nowaitinggames. Justasystemthatmovesfast,executessmart,andisn'tafraidtoevolve. Everydecisionisclosertoimpact. Everyactionpullsmorethanitspayload. That'showtransformationstayslean,alive,andmovingforward. Progressoverprocess.Always.
          </p>
        </div>
      </section>

      {/* Offerings */}
      <section
        ref={(el) => (sectionsRef.current[2] = el)}
        className="fade-in-section bg-white text-black border-t border-black"
        style={{ padding: "var(--space-7) var(--space-3)" }}
        data-testid="section-offerings"
      >
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-sm font-bold mb-8 tracking-tight" data-testid="text-offerings-heading">
            YOUROFFERINGS(03)
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="border border-black p-8" data-testid="card-offering-single">
              <h3 className="text-xl font-bold mb-4 tracking-tight">
                Singleautomation
              </h3>
              <p className="text-sm mb-6 leading-relaxed">
                You start with one focused solution.
              </p>
              <p className="font-bold text-lg" data-testid="text-price-single">
                From30,000NOK/month
              </p>
            </div>
            <div className="border border-black p-8" data-testid="card-offering-scaled">
              <h3 className="text-xl font-bold mb-4 tracking-tight">
                ScaledAIsystem
              </h3>
              <p className="text-sm mb-6 leading-relaxed">
                You implement comprehensive intelligence.
              </p>
              <p className="font-bold text-lg" data-testid="text-price-scaled">
                From60,000–120,000NOK/month
              </p>
            </div>
            <div className="border border-black p-8" data-testid="card-offering-enterprise">
              <h3 className="text-xl font-bold mb-4 tracking-tight">
                Enterprisebespoke
              </h3>
              <p className="text-sm mb-6 leading-relaxed">
                You build a custom roadmap.
              </p>
              <p className="font-bold text-lg" data-testid="text-price-enterprise">
                Customengagement
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section
        ref={(el) => (sectionsRef.current[3] = el)}
        className="fade-in-section bg-white text-black border-t border-black"
        style={{ padding: "var(--space-7) var(--space-3)" }}
        data-testid="section-case-studies"
      >
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-sm font-bold mb-8 tracking-tight" data-testid="text-case-studies-heading">
            YOURRESULTS(02)
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border border-black aspect-[4/3] flex flex-col justify-end p-8" data-testid="card-case-study-1">
              <div>
                <p className="text-sm mb-2">Manufacturing</p>
                <p className="text-3xl font-bold tracking-tight">
                  60%efficiencyincrease
                </p>
              </div>
            </div>
            <div className="border border-black aspect-[4/3] flex flex-col justify-end p-8" data-testid="card-case-study-2">
              <div>
                <p className="text-sm mb-2">Logistics</p>
                <p className="text-3xl font-bold tracking-tight">
                  40%costreduction
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section
        ref={(el) => (sectionsRef.current[4] = el)}
        className="fade-in-section bg-white text-black border-t border-black"
        style={{ padding: "var(--space-8) var(--space-3)" }}
        data-testid="section-contact"
      >
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight leading-tight" data-testid="text-contact-heading">
            Readytobegin
            <br />
            yourtransformation?
          </h2>
          <a
            href="mailto:hello@stratagentic.ai"
            className="inline-block text-4xl md:text-5xl font-bold hover:text-[#00FF85] transition-colors tracking-tight"
            data-testid="button-contact-cta"
          >
            hello@stratagentic.ai↗
          </a>
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
            ©2025Stratagentic.Youcreatebettersystemsforabetterworld.
          </p>
        </div>
      </footer>
    </div>
  );
}
