import { useState, useEffect } from "react";
import { Link } from "wouter";
import logisticsImage from "@assets/stock_images/logistics_warehouse__536d983c.jpg";

export default function LogisticsCaseStudy() {
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
                src="https://stratagentic.ai/assets/stratagenticwhite-DDEPFJWf.png"
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

      {/* Hero Image */}
      <section className="relative h-[60vh] min-h-[400px]" data-testid="section-hero">
        <img 
          src={logisticsImage} 
          alt="Automated logistics warehouse" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0" style={{ padding: "var(--space-7) var(--space-3)" }}>
          <div className="max-w-[1400px] mx-auto text-white">
            <p className="text-xs mb-4 uppercase tracking-wider opacity-80" data-testid="text-category">Logistics</p>
            <h1 
              className="font-bold mb-6"
              style={{ 
                fontSize: "clamp(2rem, 6vw + 0.5rem, 6rem)",
                lineHeight: "0.92",
                letterSpacing: "-0.04em"
              }}
              data-testid="text-hero-heading"
            >
              40% cost reduction
            </h1>
            <p className="text-lg max-w-3xl opacity-90 leading-relaxed" data-testid="text-hero-description">
              Smart routing algorithms and inventory optimization cut operational costs while improving delivery times
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
                Rising fuel costs and inefficient routes eroded margins
              </p>
            </div>
            <div className="text-base leading-relaxed space-y-4">
              <p>
                A logistics provider faced mounting pressure from rising fuel costs, complex delivery networks, and unpredictable demand patterns. Traditional route planning couldn't adapt quickly enough to real-time conditions.
              </p>
              <p>
                Warehouse inventory was either overstocked (tying up capital) or understocked (causing delays). Manual planning processes couldn't keep pace with business growth.
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
                AI-powered routing and demand forecasting
              </p>
            </div>
            <div className="text-base leading-relaxed space-y-4">
              <p>
                We deployed machine learning models that optimized delivery routes in real-time, factoring in traffic, weather, delivery windows, and vehicle capacity. Routes adjusted dynamically throughout the day.
              </p>
              <p>
                Demand forecasting algorithms analyzed historical patterns and external signals to predict inventory needs. The system automatically rebalanced stock across warehouses to minimize holding costs while ensuring availability.
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
              <p className="text-5xl font-bold mb-4 text-[#2563EB]">40%</p>
              <p className="text-base font-bold mb-2">Cost reduction</p>
              <p className="text-sm leading-relaxed opacity-70">Optimized routes and inventory management lowered operational expenses</p>
            </div>
            <div className="border border-black p-8" data-testid="card-metric-2">
              <p className="text-5xl font-bold mb-4 text-[#2563EB]">25%</p>
              <p className="text-base font-bold mb-2">Faster deliveries</p>
              <p className="text-sm leading-relaxed opacity-70">Smart routing reduced average delivery time significantly</p>
            </div>
            <div className="border border-black p-8" data-testid="card-metric-3">
              <p className="text-5xl font-bold mb-4 text-[#2563EB]">30%</p>
              <p className="text-base font-bold mb-2">Inventory reduction</p>
              <p className="text-sm leading-relaxed opacity-70">Better forecasting freed up capital while maintaining service levels</p>
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
            Ready to optimize your logistics?
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
