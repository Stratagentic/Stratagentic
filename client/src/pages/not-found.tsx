import { Link } from "wouter";
import { Header } from "@/components/header";
import { GlobeError } from "@/components/globe-error";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white text-black">
      <Header />
      
      <div className="max-w-[1400px] mx-auto" style={{ padding: "var(--space-7) var(--space-3)" }}>
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
          {/* Error Globe with Plus Signs */}
          <div className="mb-8">
            <GlobeError maxWidth={512} maxHeight={512} />
          </div>
          
          {/* Fun 404 Message */}
          <h1 className="text-6xl md:text-8xl font-bold mb-4 tracking-tight">404</h1>
          <h2 className="text-2xl md:text-4xl font-bold mb-6 tracking-tight">
            This is it. You reached the end of the line. Its all over
          </h2>
          <p className="text-lg mb-8 max-w-2xl leading-relaxed">
            Or not. Just a misdirected link. It happens. 
            <br />
            <span className="text-[#2563EB] font-bold">
              Let's get you back on track.
            </span>
          </p>
          
          {/* Fun Stats */}
          <div className="grid grid-cols-3 gap-8 mb-12 max-w-2xl">
            <div className="border border-black p-4">
              <p className="text-3xl font-bold text-[#2563EB]">0%</p>
              <p className="text-sm">Page found</p>
            </div>
            <div className="border border-black p-4">
              <p className="text-3xl font-bold text-[#2563EB]">404%</p>
              <p className="text-sm">Lost</p>
            </div>
            <div className="border border-black p-4">
              <p className="text-3xl font-bold text-[#2563EB]">10x</p>
              <p className="text-sm">Less value</p>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex gap-4 flex-wrap justify-center">
            <Link href="/">
              <button className="inline-flex items-center justify-center bg-black text-white px-6 py-3 text-sm hover-elevate active-elevate-2 transition-all">
                <span className="mr-2">←</span>
                Back to Home
              </button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer
        className="bg-white text-black border-t border-black"
        style={{ padding: "var(--space-5) var(--space-3)" }}
      >
        <div className="max-w-[1400px] mx-auto text-sm text-center">
          <p>© 2025 Stratagentic – All rights reserved. AI-assisted, human-approved</p>
        </div>
      </footer>
    </div>
  );
}
   
