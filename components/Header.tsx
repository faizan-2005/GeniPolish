import React, { useRef } from 'react';
import { Eraser, Home, Github } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface HeaderProps {
  onBackToLanding?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onBackToLanding }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from(logoRef.current, {
      scale: 0,
      rotation: -180,
      opacity: 0,
      duration: 0.8,
      ease: "back.out(1.7)"
    })
    .from(".header-text", {
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out"
    }, "-=0.4");

  }, { scope: containerRef });

  return (
    <header ref={containerRef} className="pt-16 pb-8 text-center px-4 relative overflow-hidden">
      {/* Top Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-sm border-b border-[#222] -mx-4 px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {onBackToLanding && (
            <button
              onClick={onBackToLanding}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm uppercase tracking-widest"
            >
              <Home size={16} />
              <span>Home</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/faizan-2005/GeniPolish"
            target="_blank"
            rel="noopener"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium"
          >
            <Github size={16} />
            <span>Star</span>
          </a>
        </div>
      </nav>

      <div className="mt-12" />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gray-800/20 rounded-[100%] blur-[100px] -z-10" />

      <div className="inline-flex items-center justify-center gap-3 mb-6 relative">
        <div ref={logoRef} className="w-14 h-14 bg-white rounded-sm flex items-center justify-center text-black">
          <Eraser size={28} strokeWidth={2.5} />
        </div>
      </div>

      <h1 className="header-text text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
        GENIPOLISH
      </h1>
      <p className="header-text text-lg text-gray-400 max-w-lg mx-auto leading-relaxed">
        Intelligent watermark removal for <span className="text-white font-medium">AI-generated images</span>.
        Free, private, and runs entirely in your browser.
      </p>
    </header>
  );
};

export default Header;