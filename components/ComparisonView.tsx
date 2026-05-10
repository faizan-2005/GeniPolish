import React, { useState, useRef, useEffect, useLayoutEffect, useCallback } from 'react';
import { Download, RefreshCw, AlertCircle } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface ComparisonViewProps {
  originalSrc: string;
  processedSrc: string;
  onReset: () => void;
}

const ComparisonView: React.FC<ComparisonViewProps> = ({ originalSrc, processedSrc, onReset }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isResizing, setIsResizing] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const syncComparisonDimensions = useCallback(() => {
    if (!imageRef.current) return;
    const width = Math.round(imageRef.current.getBoundingClientRect().width);
    if (width > 0) {
      setContainerWidth((prev) => (prev === width ? prev : width));
    }
  }, []);

  useLayoutEffect(() => {
    syncComparisonDimensions();

    const resizeObserver = new ResizeObserver(syncComparisonDimensions);
    if (imageRef.current) {
      resizeObserver.observe(imageRef.current);
    }

    window.addEventListener('resize', syncComparisonDimensions);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', syncComparisonDimensions);
    };
  }, [originalSrc, processedSrc, syncComparisonDimensions]);

  useGSAP(() => {
    gsap.from(containerRef.current, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: "power3.out"
    });
  }, { scope: containerRef });

  const handleMouseDown = () => setIsResizing(true);
  const handleMouseUp = () => setIsResizing(false);
  
  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isResizing || !imageRef.current) return;
    
    const rect = imageRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    
    setSliderPosition(percent);
  };

  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchend', handleMouseUp);
    } else {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isResizing]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = processedSrc;
    link.download = `GeniPolish_output_${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div ref={containerRef} className="w-full max-w-4xl mx-auto px-4 mt-8 pb-12">
      <div className="bg-[#0A0A0A] border border-[#222] rounded-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <span className="bg-white text-black px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-widest">
              Done
            </span>
          </div>
          <div className="flex space-x-3">
<button
               onClick={onReset}
               className="px-4 py-2 rounded-sm border border-[#333] text-gray-400 hover:text-white hover:border-white transition-colors text-sm font-medium flex items-center gap-2 uppercase tracking-widest"
             >
               <RefreshCw size={16} />
               New
             </button>
             <button
               onClick={handleDownload}
               className="bg-white text-black px-6 py-2 rounded-sm font-bold text-sm hover:bg-gray-200 transition-colors flex items-center gap-2 uppercase tracking-widest"
             >
              <Download size={16} />
              Download
            </button>
          </div>
        </div>

        <div
          ref={imageRef}
          className="relative w-full aspect-auto min-h-[400px] select-none rounded-sm overflow-hidden cursor-col-resize touch-none ring-1 ring-[#222] bg-[#080808]"
          onMouseMove={handleMouseMove}
          onTouchMove={handleMouseMove}
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
        >
          {/* Background Image (Original - Shown on Right side of slider) */}
          <img
            src={originalSrc}
            alt="Original"
            onLoad={syncComparisonDimensions}
            className="absolute top-0 left-0 w-full h-full object-contain pointer-events-none"
          />
          <div className="absolute top-4 right-4 bg-black/80 text-white px-2 py-1 rounded text-xs font-medium">Original</div>

          {/* Foreground Image (Processed - Clipped by slider) */}
          <div
            className="absolute top-0 left-0 h-full overflow-hidden pointer-events-none border-r-2 border-white bg-[#080808]"
            style={{ width: `${sliderPosition}%` }}
          >
            <img
              src={processedSrc}
              alt="Processed"
              onLoad={syncComparisonDimensions}
              className="absolute top-0 left-0 h-full max-w-none object-contain"
              style={{ width: containerWidth > 0 ? `${containerWidth}px` : '100%' }}
             />
             <div className="absolute top-4 left-4 bg-white text-black font-bold px-2 py-1 rounded text-xs">Clean</div>
          </div>

          {/* Slider Handle */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-sm flex items-center justify-center z-20 pointer-events-none shadow-lg"
            style={{ left: `calc(${sliderPosition}% - 20px)` }}
          >
            <div className="flex gap-0.5">
              <div className="w-0.5 h-4 bg-black rounded-full"></div>
              <div className="w-0.5 h-4 bg-black rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="mt-4 text-center text-gray-500 text-sm flex items-center justify-center gap-2 uppercase tracking-widest">
           <AlertCircle size={14} /> Drag to compare
        </div>
      </div>
    </div>
  );
};

export default ComparisonView;
