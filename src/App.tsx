import React, { useState } from 'react';
import Navbar from './components/layout/Navbar';
import ImageUploader from './components/ui/ImageUploader';
import Button from './components/ui/Button';
import { UploadedImage } from './types';
import knicksImage from './assets/knicks.png';
import { RefreshCw } from 'lucide-react';

function App() {
  const [transformedImage, setTransformedImage] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<UploadedImage | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelect = (image: UploadedImage) => {
    setSelectedImage(image);
    setTransformedImage(null);
    setError(null);
  };

  const handleTransform = async () => {
    if (!selectedImage?.file) return;

    setIsLoading(true);
    setError(null);

    try {
      // Create a new File object with the correct MIME type
      const imageFile = new File(
        [selectedImage.file],
        selectedImage.file.name,
        { type: 'image/jpeg' }  // Force JPEG MIME type
      );

      const formData = new FormData();
      formData.append('room', imageFile);

      const response = await fetch('http://localhost:8000/api/transform', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to transform image. Please try again.');
      }

      const data = await response.json();
      setTransformedImage(`data:image/png;base64,${data.b64}`);
    } catch (error) {
      console.error('Error transforming image:', error);
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy-900">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-cream-100 leading-tight mb-6">
                TURN ANY ROOM<br/>IN YOUR HOUSE<br/>INTO A MANCAVE
              </h1>
              <p className="font-display text-cream-200 text-xl mb-8 tracking-wide">
                UPLOAD A PHOTO AND TRANSFORM YOUR SPACE WITH AI.
              </p>
              <ImageUploader onImageSelect={handleImageSelect} />
              <Button 
                className="w-full mt-4 font-display text-xl tracking-wide" 
                size="lg"
                onClick={handleTransform}
                disabled={!selectedImage || isLoading}
                isLoading={isLoading}
              >
                {isLoading ? 'TRANSFORMING ROOM...' : 'TRANSFORM ROOM'}
              </Button>
              
              {error && (
                <div className="mt-4 p-4 bg-red-500/10 border border-red-500 rounded-lg">
                  <p className="text-red-500 text-center">{error}</p>
                </div>
              )}

              {isLoading && (
                <div className="mt-8 text-center">
                  <div className="relative w-20 h-20 mx-auto mb-4">
                    <div className="absolute inset-0 border-4 border-orange-500/20 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-orange-500 rounded-full animate-spin border-t-transparent"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <RefreshCw size={24} className="text-orange-500 animate-pulse" />
                    </div>
                  </div>
                  <p className="text-cream-200">AI is transforming your room...</p>
                </div>
              )}

              {transformedImage && !isLoading && (
                <div className="mt-8">
                  <h2 className="text-cream-100 text-2xl mb-4">Transformed Room</h2>
                  <img 
                    src={transformedImage} 
                    alt="Transformed Room" 
                    className="rounded-lg shadow-xl w-full"
                  />
                </div>
              )}
            </div>
            <div className="relative">
              <img 
                src={knicksImage}
                alt="Mancave Example"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-transparent pointer-events-none rounded-lg"></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;