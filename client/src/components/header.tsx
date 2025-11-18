import { useState } from "react";
import { Link } from "wouter";
import { Menu } from "lucide-react";
import logoImage from "@assets/Stratagentic_White_1762185093889.png";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
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
            <Link 
              href="/team"
              className="text-sm hover:text-[#2563EB] transition-colors whitespace-nowrap"
              data-testid="link-menu-team"
            >
              Team
            </Link>
            <Link 
              href="/resources" 
              className="text-sm hover:text-[#2563EB] transition-colors whitespace-nowrap"
              data-testid="link-menu-resources"
            >
              Resources
            </Link>
          </div>
          <button 
            className={`p-2 absolute right-0 transition-all duration-300 ease-out cursor-pointer ${menuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            data-testid="button-menu"
            aria-label="Menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
}
