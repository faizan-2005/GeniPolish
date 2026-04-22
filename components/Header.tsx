import React, { useRef } from 'react';
import { Eraser, ScrollText } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Header: React.FC = () => {
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
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-teal-600/20 rounded-[100%] blur-[100px] -z-10" />

      {/* UserScript Install Button */}
      <div className="absolute top-4 right-4 md:top-6 md:right-6 z-20">
        <a 
          href="/userscript.user.js" 
          target="_blank"
          className="flex items-center gap-2 bg-teal-900/50 hover:bg-teal-800/50 border border-teal-700/50 hover:border-teal-400/30 text-teal-300 hover:text-teal-200 px-4 py-2 rounded-xl transition-all duration-300 backdrop-blur-sm text-sm font-medium shadow-lg hover:shadow-teal-400/5 group"
        >
          <ScrollText size={16} className="group-hover:text-teal-300 transition-colors" />
          <span className="hidden md:inline">Install UserScript</span>
          <span className="md:hidden">Script</span>
        </a>
      </div>
      
      <div className="inline-flex items-center justify-center gap-3 mb-6 relative">
        <div ref={logoRef} className="w-14 h-14 bg-gradient-to-tr from-teal-400 to-emerald-300 rounded-2xl flex items-center justify-center shadow-lg shadow-teal-400/20 text-slate-900">
          <Eraser size={28} strokeWidth={2.5} />
        </div>
      </div>
      
      <h1 className="header-text text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-teal-300 mb-4 tracking-tight">
        GeniPolish
      </h1>
      <p className="header-text text-lg text-teal-300/80 max-w-lg mx-auto leading-relaxed">
        Intelligent watermark removal for <span className="text-teal-400 font-medium">Gemini</span> generated images. 
        Free, private, and runs entirely in your browser.
      </p>
    </header>
  );
};

export default Header;