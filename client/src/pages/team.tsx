import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu } from "lucide-react";
import logoImage from "@assets/Stratagentic_White_1762185093889.png";
import { Header } from "@/components/header";
import franciscoDefault from "@assets/1523195690482_1762463807189.jpg";
import johannesDefault from "@assets/JohannesStruweg_1762463512984.jpg";
import johannesMotoX from "@assets/JanesMotoX_1762463229813.png";
import johannesAgassi from "@assets/JanesAgassi_1762463229813.png";
import johannesTeen from "@assets/JanesTeen_1762463229813.png";
import johannesViking from "@assets/JanesViking_1762463229813.png";
import johannesJoker from "@assets/JanesJoker_1762463229813.png";

export default function Team() {
  const [, setLocation] = useLocation();
  
  // Track which photo variant is shown for each team member (0-4 for 5 photos)
  const [franciscoPhotoIndex, setFranciscoPhotoIndex] = useState(0);
  const [johannesPhotoIndex, setJohannesPhotoIndex] = useState(0);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const navigateToResources = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.assign("/#resources");
  };

  // Windows XP-style error sound
  const playErrorSound = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Windows XP error sound is approximately 800Hz
      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      
      // Volume envelope
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (error) {
      console.log('Audio playback not supported');
    }
  };

  const franciscoPhotos = [
    franciscoDefault,
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
  ];

  const johannesPhotos = [
    johannesDefault,
    johannesMotoX,
    johannesAgassi,
    johannesTeen,
    johannesViking,
    johannesJoker
  ];

  const cycleFranciscoPhoto = () => {
    setFranciscoPhotoIndex((prev) => (prev + 1) % 5);
  };

  const cycleJohannesPhoto = () => {
    playErrorSound();
    setJohannesPhotoIndex((prev) => (prev + 1) % 6);
  };

 return (
  <div className="min-h-screen bg-white text-black">
    <Header />
     
      {/* Ethos Section */}
      <section
        className="bg-white text-black border-b border-gray-300"
        data-testid="section-ethos"
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="py-12 text-left" style={{ paddingLeft: "var(--space-3)", paddingRight: "var(--space-3)" }}>
            <div className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight space-y-8" data-testid="text-ethos-content">
              <p>We believe great systems start with great thinking.</p>
              <p>Every solution we build begins with clarity - about purpose, process, and people. Strategy sets the direction, automation scales it, and design keeps it human. That's how we help ambitious teams work smarter, move faster, and grow with intent.</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Founders Section */}
      <section
        className="bg-white text-black"
        style={{ padding: "var(--space-8) var(--space-3)" }}
        data-testid="section-founders"
      >
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-sm font-bold mb-12 tracking-tight" data-testid="text-founders-heading">
            The Founders
          </h2>
          
          <div className="space-y-16">
            {/* Francisco Acasuso */}
            <div className="grid md:grid-cols-[300px_1fr] gap-8 md:gap-12" data-testid="card-founder-francisco">
              <div className="flex flex-col items-start">
                <button 
                  className="w-full aspect-square border border-black overflow-hidden cursor-pointer hover:border-[#2563EB] transition-all duration-300 p-0 bg-transparent"
                  onClick={cycleFranciscoPhoto}
                  aria-label="Cycle through Francisco's photos"
                  data-testid="button-francisco-headshot"
                >
                  <img 
                    src={franciscoPhotos[franciscoPhotoIndex]}
                    alt="Francisco Acasuso"
                    className="w-full h-full object-cover"
                  />
                </button>
                <div className="mt-4">
                  <h3 className="text-xl font-bold mb-1" data-testid="text-francisco-name">Francisco Acasuso</h3>
                  <p className="text-sm text-gray-600" data-testid="text-francisco-title">Co-founder & CEO</p>
                </div>
              </div>
              
              <div className="flex flex-col justify-start">
                <p className="text-base leading-relaxed mb-6" data-testid="text-francisco-bio">
                  Francisco has spent over 15 years helping companies grow by pairing strong strategy with real operational results. He specializes in using AI and agentic automation to build scalable revenue systems that give businesses a competitive edge.
                  <br /><br />
                  He's led innovation initiatives across industries and knows how to turn bold ideas into measurable outcomes.
                </p>
                
                <div>
                  <h4 className="text-sm font-bold mb-3" data-testid="text-francisco-focus-heading">Areas of Focus:</h4>
                  <ul className="space-y-2 text-sm" data-testid="list-francisco-focus">
                    <li className="flex items-start">
                      <span className="mr-2 text-[#2563EB]">→</span>
                      <span>Scaling businesses through revenue-growth strategy and automation</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-[#2563EB]">→</span>
                      <span>Designing AI systems that drive sustainable performance</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-[#2563EB]">→</span>
                      <span>Leading high-impact innovation and transformation projects</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Johannes Struweg */}
            <div className="grid md:grid-cols-[300px_1fr] gap-8 md:gap-12" data-testid="card-founder-johannes">
              <div className="flex flex-col items-start">
                <button 
                  className="w-full aspect-square border border-black overflow-hidden cursor-pointer hover:border-[#2563EB] transition-all duration-300 p-0 bg-transparent"
                  onClick={cycleJohannesPhoto}
                  aria-label="Cycle through Johannes's photos"
                  data-testid="button-johannes-headshot"
                >
                  <img 
                    src={johannesPhotos[johannesPhotoIndex]}
                    alt="Johannes Struweg"
                    className="w-full h-full object-cover"
                  />
                </button>
                <div className="mt-4">
                  <h3 className="text-xl font-bold mb-1" data-testid="text-johannes-name">Johannes Struweg</h3>
                  <p className="text-sm text-gray-600" data-testid="text-johannes-title">Co-founder & COO</p>
                </div>
              </div>
              
              <div className="flex flex-col justify-start">
                <p className="text-base leading-relaxed mb-6" data-testid="text-johannes-bio">
                  Johannes is a serial entrepreneur who's built and led four successful companies. With a background in growth strategy and operations, he focuses on identifying performance gaps and implementing AI solutions that make teams more effective and growth measurable.
                  <br /><br />
                  He helps leadership teams navigate the evolving landscape of AI with clarity and confidence.
                </p>
                
                <div>
                  <h4 className="text-sm font-bold mb-3" data-testid="text-johannes-focus-heading">Areas of Focus:</h4>
                  <ul className="space-y-2 text-sm" data-testid="list-johannes-focus">
                    <li className="flex items-start">
                      <span className="mr-2 text-[#2563EB]">→</span>
                      <span>Growth strategy and operational optimization</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-[#2563EB]">→</span>
                      <span>AI agents and generative AI applications for business growth</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-[#2563EB]">→</span>
                      <span>Advisory to leadership teams integrating intelligent automation</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white text-black border-t border-gray-300" style={{ padding: "var(--space-5) var(--space-3)" }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="text-xs text-gray-600">
            © 2025 Stratagentic. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
