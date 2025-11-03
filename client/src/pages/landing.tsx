import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

export default function Landing() {
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
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
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto" style={{ paddingTop: "var(--space-4)", paddingBottom: "var(--space-4)" }}>
          <h1
            className="font-bold leading-tight tracking-tight"
            style={{ 
              fontSize: "var(--fs-h1)",
              marginBottom: "var(--space-5)"
            }}
            data-testid="text-hero-heading"
          >
            Your business becomes faster, smarter, lighter.
          </h1>
          <p
            className="max-w-3xl mx-auto leading-relaxed text-gray-200"
            style={{ 
              fontSize: "var(--fs-h3)",
              marginBottom: "var(--space-6)"
            }}
            data-testid="text-hero-subheading"
          >
            You unlock efficiency and scale with intelligent systems designed
            for progress.
          </p>
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-[#00e673] transition-colors duration-300 font-semibold shadow-lg hover:shadow-xl"
            style={{
              paddingLeft: "var(--space-6)",
              paddingRight: "var(--space-6)",
              paddingTop: "var(--space-4)",
              paddingBottom: "var(--space-4)",
              fontSize: "var(--fs-base)"
            }}
            data-testid="button-hero-cta"
          >
            Start your transformation
          </Button>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section
        ref={(el) => (sectionsRef.current[0] = el)}
        className="fade-in-section bg-[#f8f8f8] text-gray-900"
        style={{ 
          paddingTop: "var(--space-8)",
          paddingBottom: "var(--space-8)",
          paddingLeft: "var(--space-3)",
          paddingRight: "var(--space-3)"
        }}
        data-testid="section-value-proposition"
      >
        <div className="max-w-7xl mx-auto">
          <h2
            className="font-bold text-center tracking-tight"
            style={{ 
              fontSize: "var(--fs-h2)",
              marginBottom: "var(--space-7)"
            }}
            data-testid="text-value-heading"
          >
            Your value-driven automation
          </h2>
          <div
            className="grid"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "var(--space-6)"
            }}
          >
            <div className="text-center" data-testid="card-value-strategy">
              <h3
                className="font-semibold"
                style={{ 
                  fontSize: "var(--fs-h3)",
                  marginBottom: "var(--space-3)"
                }}
              >
                Targeted strategy
              </h3>
              <p style={{ fontSize: "var(--fs-base)" }} className="text-gray-700 leading-relaxed">
                You define clear objectives. Your systems align with business
                goals.
              </p>
            </div>
            <div className="text-center" data-testid="card-value-build">
              <h3
                className="font-semibold"
                style={{ 
                  fontSize: "var(--fs-h3)",
                  marginBottom: "var(--space-3)"
                }}
              >
                Custom system build
              </h3>
              <p style={{ fontSize: "var(--fs-base)" }} className="text-gray-700 leading-relaxed">
                You receive tailored solutions. Your infrastructure scales with
                precision.
              </p>
            </div>
            <div className="text-center" data-testid="card-value-execution">
              <h3
                className="font-semibold"
                style={{ 
                  fontSize: "var(--fs-h3)",
                  marginBottom: "var(--space-3)"
                }}
              >
                Scaled execution
              </h3>
              <p style={{ fontSize: "var(--fs-base)" }} className="text-gray-700 leading-relaxed">
                You deploy with confidence. Your operations accelerate
                continuously.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Better World Section */}
      <section
        ref={(el) => (sectionsRef.current[1] = el)}
        className="fade-in-section bg-black text-white"
        style={{ 
          paddingTop: "var(--space-8)",
          paddingBottom: "var(--space-8)",
          paddingLeft: "var(--space-3)",
          paddingRight: "var(--space-3)"
        }}
        data-testid="section-better-world"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="font-bold tracking-tight"
            style={{ 
              fontSize: "var(--fs-h2)",
              marginBottom: "var(--space-6)"
            }}
            data-testid="text-better-world-heading"
          >
            A better world starts within your business
          </h2>
          <p
            className="leading-relaxed text-gray-300 max-w-2xl mx-auto"
            style={{ fontSize: "var(--fs-base)" }}
            data-testid="text-better-world-content"
          >
            You innovate with purpose. Your transformation creates ripples of
            progress. Systems become lighter, decisions become clearer, and
            every advancement builds a foundation for continuous improvement.
          </p>
        </div>
      </section>

      {/* Offerings Section */}
      <section
        ref={(el) => (sectionsRef.current[2] = el)}
        className="fade-in-section bg-[#f8f8f8] text-gray-900"
        style={{ padding: "var(--space-7) var(--space-3)" }}
        data-testid="section-offerings"
      >
        <div className="max-w-7xl mx-auto">
          <h2
            className="font-bold text-center mb-12"
            style={{ fontSize: "var(--fs-h2)" }}
            data-testid="text-offerings-heading"
          >
            Your offerings
          </h2>
          <div
            className="grid gap-8"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            }}
          >
            <div
              className="bg-white p-8 rounded-md border border-gray-200"
              data-testid="card-offering-single"
            >
              <h3
                className="font-semibold mb-4"
                style={{ fontSize: "var(--fs-h3)" }}
              >
                Single automation
              </h3>
              <p
                className="text-gray-600 mb-4"
                style={{ fontSize: "var(--fs-base)" }}
              >
                You start with one focused solution.
              </p>
              <p className="font-bold text-2xl" data-testid="text-price-single">
                From 30,000 NOK/month
              </p>
            </div>
            <div
              className="bg-white p-8 rounded-md border border-gray-200"
              data-testid="card-offering-scaled"
            >
              <h3
                className="font-semibold mb-4"
                style={{ fontSize: "var(--fs-h3)" }}
              >
                Scaled AI system
              </h3>
              <p
                className="text-gray-600 mb-4"
                style={{ fontSize: "var(--fs-base)" }}
              >
                You implement comprehensive intelligence.
              </p>
              <p className="font-bold text-2xl" data-testid="text-price-scaled">
                From 60,000–120,000 NOK/month
              </p>
            </div>
            <div
              className="bg-white p-8 rounded-md border border-gray-200"
              data-testid="card-offering-enterprise"
            >
              <h3
                className="font-semibold mb-4"
                style={{ fontSize: "var(--fs-h3)" }}
              >
                Enterprise bespoke
              </h3>
              <p
                className="text-gray-600 mb-4"
                style={{ fontSize: "var(--fs-base)" }}
              >
                You build a custom roadmap.
              </p>
              <p
                className="font-bold text-2xl"
                data-testid="text-price-enterprise"
              >
                Custom engagement
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section
        ref={(el) => (sectionsRef.current[3] = el)}
        className="fade-in-section bg-black text-white"
        style={{ padding: "var(--space-7) var(--space-3)" }}
        data-testid="section-case-studies"
      >
        <div className="max-w-7xl mx-auto">
          <h2
            className="font-bold text-center mb-12"
            style={{ fontSize: "var(--fs-h2)" }}
            data-testid="text-case-studies-heading"
          >
            Your results
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div
              className="relative overflow-hidden rounded-md group"
              data-testid="card-case-study-1"
            >
              <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                <div className="text-center p-8">
                  <p
                    className="text-gray-400 mb-2"
                    style={{ fontSize: "var(--fs-base)" }}
                  >
                    Manufacturing
                  </p>
                  <p
                    className="font-semibold"
                    style={{ fontSize: "var(--fs-h3)" }}
                  >
                    60% efficiency increase
                  </p>
                </div>
              </div>
            </div>
            <div
              className="relative overflow-hidden rounded-md group"
              data-testid="card-case-study-2"
            >
              <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                <div className="text-center p-8">
                  <p
                    className="text-gray-400 mb-2"
                    style={{ fontSize: "var(--fs-base)" }}
                  >
                    Logistics
                  </p>
                  <p
                    className="font-semibold"
                    style={{ fontSize: "var(--fs-h3)" }}
                  >
                    40% cost reduction
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        ref={(el) => (sectionsRef.current[4] = el)}
        className="fade-in-section bg-black text-white"
        style={{ padding: "var(--space-7) var(--space-3)" }}
        data-testid="section-contact"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="font-bold mb-8"
            style={{ fontSize: "var(--fs-h2)" }}
            data-testid="text-contact-heading"
          >
            Ready to begin your transformation?
          </h2>
          <a
            href="mailto:hello@stratagentic.ai"
            data-testid="button-contact-cta"
          >
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-[#00e673] font-semibold px-8 py-6 text-lg"
            >
              <Mail className="mr-2 h-5 w-5" />
              hello@stratagentic.ai
            </Button>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="bg-black text-gray-500 text-center border-t border-gray-800"
        style={{ padding: "var(--space-5) var(--space-3)" }}
        data-testid="footer"
      >
        <p style={{ fontSize: "var(--fs-base)" }} data-testid="text-footer">
          © 2025 Stratagentic. You create better systems for a better world.
        </p>
      </footer>
    </div>
  );
}
