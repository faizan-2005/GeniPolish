import React, { useRef } from 'react';
import { Eraser, Sparkles, Shield, ArrowRight, Github, Zap } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface LandingPageProps {
  onEnter: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnter }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from(".hero-char", {
      opacity: 0,
      y: 100,
      rotateX: -90,
      duration: 0.8,
      stagger: 0.05,
      ease: "back.out(1.7)"
    })
    .from(".hero-sub", {
      opacity: 0,
      y: 30,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.3")
    .from(".hero-cta", {
      opacity: 0,
      scale: 0.8,
      duration: 0.5,
      ease: "back.out(1.7)"
    }, "-=0.2")
    .from(".nav-item", {
      opacity: 0,
      y: -20,
      duration: 0.4,
      stagger: 0.1,
      ease: "power2.out"
    }, "-=0.5")
    .from(".feature-card", {
      opacity: 0,
      y: 60,
      duration: 0.6,
      stagger: 0.15,
      ease: "power3.out"
    }, "-=0.3");

  }, { scope: containerRef });

  const title = "GENIPOLISH";

  return (
    <div ref={containerRef} className="min-h-screen w-full bg-[#0A0A0A] text-white overflow-x-hidden">
      {/* Top Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-sm border-b border-[#222]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-sm flex items-center justify-center">
              <Eraser size={20} className="text-black" />
            </div>
            <span className="text-xl font-bold tracking-tight">GENIPOLISH</span>
          </div>

          <div className="flex items-center gap-8">
            <a href="#features" className="nav-item text-sm text-gray-400 hover:text-white transition-colors uppercase tracking-widest">Features</a>
            <a href="#how-it-works" className="nav-item text-sm text-gray-400 hover:text-white transition-colors uppercase tracking-widest">How it Works</a>
            <a href="https://github.com/faizan-2005/GeniPolish" target="_blank" rel="noopener" className="nav-item flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <Github size={20} />
              <span className="text-sm">Star</span>
            </a>
            <button
              onClick={onEnter}
              className="nav-item bg-white text-black px-4 py-1.5 text-sm font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors"
            >
              Start
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center pt-20 px-6 relative">
        {/* Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

        <div className="text-center relative z-10">
          {/* Main Title with character-level animation */}
          <h1 className="text-[12vw] leading-[0.85] font-bold tracking-tighter mb-6">
            {title.split('').map((char, i) => (
              <span key={i} className="hero-char inline-block bg-clip-text text-transparent bg-gradient-to-b from-white via-gray-200 to-gray-500">
                {char}
              </span>
            ))}
          </h1>

          <p className="hero-sub text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-12 font-light">
            Intelligent watermark removal for <span className="text-white font-medium">AI-generated images</span>.
            <br />
            <span className="text-gray-500">Private. Fast. Free.</span>
          </p>

          <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onEnter}
              className="group relative bg-white text-black px-8 py-4 text-lg font-bold uppercase tracking-widest transition-all hover:bg-gray-200"
            >
              <span className="flex items-center gap-3">
                Start Removing
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-gray-500 to-transparent" />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 px-6 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-6xl md:text-8xl font-bold tracking-tighter mb-16 text-white">
            FEATURES
          </h2>

          <div className="grid md:grid-cols-3 gap-px bg-[#222] border border-[#222]">
            <div className="feature-card bg-[#0A0A0A] p-8 md:p-12 hover:bg-[#111] transition-colors group">
              <div className="w-12 h-12 mb-6 bg-white/10 rounded-sm flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                <Sparkles size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-3 uppercase tracking-wide">AI-Powered</h3>
              <p className="text-gray-400 leading-relaxed">
                Advanced AI analysis detects and removes watermarks while preserving image quality and details.
              </p>
            </div>

            <div className="feature-card bg-[#0A0A0A] p-8 md:p-12 hover:bg-[#111] transition-colors group">
              <div className="w-12 h-12 mb-6 bg-white/10 rounded-sm flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                <Shield size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-3 uppercase tracking-wide">Private</h3>
              <p className="text-gray-400 leading-relaxed">
                All processing happens locally in your browser. Your images never leave your device.
              </p>
            </div>

            <div className="feature-card bg-[#0A0A0A] p-8 md:p-12 hover:bg-[#111] transition-colors group">
              <div className="w-12 h-12 mb-6 bg-white/10 rounded-sm flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                <Zap size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-3 uppercase tracking-wide">Fast</h3>
              <p className="text-gray-400 leading-relaxed">
                Optimized processing pipeline delivers results in seconds, not minutes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-32 px-6 bg-[#080808] border-t border-[#111]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-6xl md:text-8xl font-bold tracking-tighter mb-16 text-white">
            PROCESS
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { num: "01", title: "Upload", desc: "Drop your AI-generated image" },
              { num: "02", title: "Analyze", desc: "AI detects watermark patterns" },
              { num: "03", title: "Remove", desc: "Smart inpainting removes watermarks" },
              { num: "04", title: "Download", desc: "Get clean, watermark-free image" }
            ].map((step, i) => (
              <div key={i} className="feature-card relative">
                <span className="text-[8rem] font-bold text-[#111] leading-none absolute -top-8 -left-2">{step.num}</span>
                <div className="relative pt-20">
                  <h3 className="text-2xl font-bold mb-3 uppercase tracking-wide text-white">{step.title}</h3>
                  <p className="text-gray-400">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 bg-[#0A0A0A] border-t border-[#111]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 text-white">
            READY?
          </h2>
          <p className="text-xl text-gray-400 mb-12 max-w-xl mx-auto">
            Start removing watermarks from your AI-generated images for free.
          </p>
          <button
            onClick={onEnter}
            className="bg-white text-black px-12 py-5 text-xl font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors"
          >
            Launch App
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-[#050505] border-t border-[#111]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
              <Eraser size={12} className="text-black" />
            </div>
            <span className="text-sm text-gray-500">GENIPOLISH</span>
          </div>
          <p className="text-sm text-gray-600">
            Open source by <a href="https://github.com/faizan-2005" target="_blank" rel="noopener" className="text-gray-400 hover:text-white transition-colors">@faizan-2005</a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;