import React, { useState } from 'react';
import { engine, loadImage } from './services/watermarkService';
import { ProcessingState } from './types';
import Header from './components/Header';
import Dropzone from './components/Dropzone';
import ComparisonView from './components/ComparisonView';
import { Loader2, Heart } from 'lucide-react';

const App: React.FC = () => {
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

  return (
    <div className="min-h-screen w-full bg-[#0a1f1c] selection:bg-teal-400/30 text-teal-50 flex flex-col">
      <Header />

      <main className="flex-grow relative z-10 pb-20">
        
        {processingState.status === 'idle' && (
          <Dropzone onFileSelect={processImage} />
        )}

        {processingState.status === 'processing' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a1f1c]/80 backdrop-blur-sm z-50">
            <div className="relative">
              <div className="absolute inset-0 bg-teal-400 blur-xl opacity-20 animate-pulse rounded-full"></div>
              <Loader2 className="w-16 h-16 text-teal-400 animate-spin relative z-10" />
            </div>
            <p className="mt-6 text-lg font-medium text-teal-200 animate-pulse">
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
           <div className="max-w-md mx-auto mt-12 p-6 bg-red-500/10 border border-red-500/20 rounded-2xl text-center">
             <p className="text-red-400 font-medium mb-4">{processingState.message}</p>
             <button 
               onClick={handleReset}
               className="bg-red-500/20 hover:bg-red-500/30 text-red-300 px-4 py-2 rounded-lg transition-colors text-sm"
             >
               Try Again
             </button>
           </div>
        )}
      </main>

      <footer className="py-6 text-center text-teal-700 text-sm flex items-center justify-center">
        <p className="flex items-center gap-1.5 hover:text-teal-400 transition-colors">
          Made with <Heart className="w-4 h-4 text-rose-500 fill-rose-500 inline-block animate-pulse" /> by <span className="text-teal-100 font-medium">@XD_UNITED (Telegram)</span>
        </p>
      </footer>
    </div>
  );
};

export default App;