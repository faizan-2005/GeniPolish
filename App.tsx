import React, { useState } from 'react';
import { engine, loadImage } from './services/watermarkService';
import { ProcessingState } from './types';
import Header from './components/Header';
import Dropzone from './components/Dropzone';
import ComparisonView from './components/ComparisonView';
import LandingPage from './components/LandingPage';
import { Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [showLanding, setShowLanding] = useState(true);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [processingState, setProcessingState] = useState<ProcessingState>({ status: 'idle' });

  const processImage = async (file: File) => {
    // cleanup previous URLs
    if (originalImage) URL.revokeObjectURL(originalImage);
    if (processedImage) URL.revokeObjectURL(processedImage);

    try {
      setProcessingState({ status: 'processing', message: 'Analyzing alpha maps...' });
      const objectUrl = URL.createObjectURL(file);
      setOriginalImage(objectUrl);

      // Artificial delay for smooth UX transition so user sees the "Processing" state
      await new Promise(r => setTimeout(r, 600));

      const img = await loadImage(objectUrl);
      
      setProcessingState({ status: 'processing', message: 'Removing watermark...' });
      const resultBlob = await engine.removeWatermark(img);
      const resultUrl = URL.createObjectURL(resultBlob);
      
      setProcessedImage(resultUrl);
      setProcessingState({ status: 'success' });
    } catch (error) {
      console.error(error);
      setProcessingState({ status: 'error', message: 'Failed to process image. Ensure it is a valid PNG/JPG.' });
    }
  };

  const handleReset = () => {
    setOriginalImage(null);
    setProcessedImage(null);
    setProcessingState({ status: 'idle' });
  };

  if (showLanding) {
    return <LandingPage onEnter={() => setShowLanding(false)} />;
  }

  return (
    <div className="min-h-screen w-full bg-[#0A0A0A] selection:bg-gray-300/30 text-white flex flex-col">
      <Header onBackToLanding={() => setShowLanding(true)} />

      <main className="flex-grow relative z-10 pb-20 px-4">

        {processingState.status === 'idle' && (
          <Dropzone onFileSelect={processImage} />
        )}

        {processingState.status === 'processing' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0A0A0A]/80 backdrop-blur-sm z-50">
            <div className="relative">
              <div className="absolute inset-0 bg-white blur-xl opacity-10 animate-pulse rounded-full"></div>
              <Loader2 className="w-16 h-16 text-white animate-spin relative z-10" />
            </div>
            <p className="mt-6 text-lg font-medium text-gray-300 animate-pulse">
              {processingState.message || "Processing..."}
            </p>
          </div>
        )}

        {processingState.status === 'success' && originalImage && processedImage && (
          <ComparisonView
            originalSrc={originalImage}
            processedSrc={processedImage}
            onReset={handleReset}
          />
        )}

        {processingState.status === 'error' && (
           <div className="max-w-md mx-auto mt-12 p-6 bg-red-900/20 border border-red-800/50 rounded-2xl text-center">
             <p className="text-red-400 font-medium mb-4">{processingState.message}</p>
             <button
               onClick={handleReset}
               className="bg-red-900/30 hover:bg-red-900/50 text-red-300 px-4 py-2 rounded-lg transition-colors text-sm"
             >
               Try Again
             </button>
           </div>
        )}
      </main>

      <footer className="py-6 text-center text-gray-600 text-sm flex items-center justify-center border-t border-[#111]">
        <p className="flex items-center gap-1.5 hover:text-gray-400 transition-colors">
          Open source by <a href="https://github.com/faizan-2005" target="_blank" rel="noopener" className="text-gray-400 hover:text-white transition-colors">@faizan-2005</a>
        </p>
      </footer>
    </div>
  );
};

export default App;