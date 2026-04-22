import React, { useCallback, useState, useRef } from 'react';
import { UploadCloud } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface DropzoneProps {
  onFileSelect: (file: File) => void;
}

const Dropzone: React.FC<DropzoneProps> = ({ onFileSelect }) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Pulse animation for the icon
    gsap.to(iconRef.current, {
      y: -5,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });
  }, { scope: containerRef });

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  }, [onFileSelect]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="w-full max-w-2xl mx-auto mt-12 px-4"
    >
      <div 
        className={`relative group rounded-3xl border-2 border-dashed transition-all duration-300 ease-out
          ${isDragActive 
            ? 'border-teal-400 bg-teal-400/10 scale-[1.02]' 
            : 'border-teal-800/50 bg-teal-900/30 hover:border-teal-600 hover:bg-teal-900/50'}
          backdrop-blur-sm h-80 flex flex-col items-center justify-center text-center cursor-pointer overflow-hidden`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input 
          type="file" 
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          onChange={handleChange}
          accept="image/*"
        />
        
        <div ref={iconRef} className="p-4 rounded-full bg-teal-900/50 mb-4 ring-1 ring-teal-700/50 shadow-xl group-hover:scale-110 transition-transform duration-300">
          <UploadCloud className={`w-10 h-10 ${isDragActive ? 'text-teal-400' : 'text-teal-300'}`} />
        </div>

        <h3 className="text-xl font-semibold text-teal-100 mb-2">
          {isDragActive ? "Drop it like it's hot!" : "Upload Gemini Image"}
        </h3>
        <p className="text-teal-400/60 max-w-xs mx-auto text-sm">
          Drag & drop your AI-generated image here, or click to browse.
          <br/>
          <span className="text-xs opacity-70 mt-2 block">Works best with original Gemini output resolutions.</span>
        </p>

        {/* Decorative elements */}
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-teal-400/10 rounded-full blur-3xl" />
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-400/10 rounded-full blur-3xl" />
      </div>
    </div>
  );
};

export default Dropzone;