import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, RefreshCw, AlertCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import ImageUploader from '../components/ui/ImageUploader';
import ThemeCard from '../components/ui/ThemeCard';
import { themes } from '../data/themes';
import { Theme, UploadedImage } from '../types';

const TransformPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [uploadedImage, setUploadedImage] = useState<UploadedImage>({ file: null, preview: null });
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelect = (image: UploadedImage) => {
    setUploadedImage(image);
  };

  const handleThemeSelect = (id: string) => {
    setSelectedTheme(id);
  };

  const handleNextStep = async () => {
    if (step === 1 && !uploadedImage.preview) {
      return;
    }
    if (step === 2 && !selectedTheme) {
      return;
    }
    
    if (step === 3) {
      // Reset to beginning
      setStep(1);
      setUploadedImage({ file: null, preview: null });
      setSelectedTheme(null);
      setGeneratedImage(null);
      setError(null);
      return;
    }
    
    if (step === 2 && uploadedImage.file) {
      setIsGenerating(true);
      setError(null);
      
      try {
        // Create form data
        const formData = new FormData();
        formData.append('room', uploadedImage.file);

        // Make API call
        const response = await fetch('http://localhost:8000/api/transform', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to transform image. Please try again.');
        }

        const data = await response.json();
        setGeneratedImage(`data:image/png;base64,${data.b64}`);
        setStep(step + 1);
      } catch (error) {
        console.error('Error transforming image:', error);
        setError(error instanceof Error ? error.message : 'An unexpected error occurred');
      } finally {
        setIsGenerating(false);
      }
    } else {
      setStep(step + 1);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const getCurrentTheme = (): Theme | undefined => {
    return themes.find(theme => theme.id === selectedTheme);
  };

  return (
    <div className="min-h-screen page-transition pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl mb-4">TRANSFORM YOUR ROOM</h1>
          <p className="text-cream-200 text-lg max-w-2xl mx-auto">
            Upload a photo, choose a theme, and watch as we transform your space into the perfect mancave.
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="flex items-center">
            <div className={`flex flex-col items-center ${step >= 1 ? 'text-orange-500' : 'text-cream-200'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${step >= 1 ? 'bg-orange-500 text-white' : 'bg-navy-800 text-cream-200'}`}>
                1
              </div>
              <span className="text-sm">Upload</span>
            </div>
            <div className={`w-16 h-0.5 mx-1 ${step >= 2 ? 'bg-orange-500' : 'bg-navy-800'}`}></div>
            <div className={`flex flex-col items-center ${step >= 2 ? 'text-orange-500' : 'text-cream-200'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${step >= 2 ? 'bg-orange-500 text-white' : 'bg-navy-800 text-cream-200'}`}>
                2
              </div>
              <span className="text-sm">Theme</span>
            </div>
            <div className={`w-16 h-0.5 mx-1 ${step >= 3 ? 'bg-orange-500' : 'bg-navy-800'}`}></div>
            <div className={`flex flex-col items-center ${step >= 3 ? 'text-orange-500' : 'text-cream-200'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${step >= 3 ? 'bg-orange-500 text-white' : 'bg-navy-800 text-cream-200'}`}>
                3
              </div>
              <span className="text-sm">Result</span>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Step 1: Upload Image */}
          {step === 1 && (
            <div className="card p-8 md:p-12 page-transition">
              <h2 className="font-display text-3xl mb-6 text-center">UPLOAD YOUR ROOM PHOTO</h2>
              <ImageUploader onImageSelect={handleImageSelect} className="max-w-lg mx-auto mb-8" />
              <div className="flex justify-between">
                <div></div>
                <Button 
                  onClick={handleNextStep}
                  disabled={!uploadedImage.preview}
                >
                  Next
                  <ArrowRight className="ml-2" size={18} />
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Choose Theme */}
          {step === 2 && (
            <div className="card p-8 md:p-12 page-transition">
              <h2 className="font-display text-3xl mb-6 text-center">CHOOSE A THEME</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {themes.map(theme => (
                  <ThemeCard 
                    key={theme.id} 
                    theme={theme} 
                    selected={selectedTheme === theme.id}
                    onSelect={handleThemeSelect}
                  />
                ))}
              </div>
              <div className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={handlePrevStep}
                >
                  <ArrowLeft className="mr-2" size={18} />
                  Back
                </Button>
                <Button 
                  onClick={handleNextStep}
                  disabled={!selectedTheme}
                  isLoading={isGenerating}
                >
                  {isGenerating ? 'Generating...' : 'Generate'}
                  <ArrowRight className="ml-2" size={18} />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Results */}
          {step === 3 && (
            <div className="card p-8 md:p-12 page-transition">
              <h2 className="font-display text-3xl mb-6 text-center">YOUR TRANSFORMED MANCAVE</h2>
              
              {isGenerating ? (
                <div className="py-12 text-center">
                  <div className="relative w-24 h-24 mx-auto mb-6">
                    <div className="absolute inset-0 border-4 border-orange-500/20 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-orange-500 rounded-full animate-spin border-t-transparent"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <RefreshCw size={32} className="text-orange-500" />
                    </div>
                  </div>
                  <h3 className="text-xl font-display text-cream-100 mb-2">Transforming Your Room</h3>
                  <p className="text-cream-200">Our AI is working its magic to create your perfect mancave...</p>
                  <div className="mt-4 flex justify-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              ) : error ? (
                <div className="py-12 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 text-red-500">
                    <AlertCircle size={64} />
                  </div>
                  <h3 className="text-xl font-display text-red-500 mb-2">Oops! Something went wrong</h3>
                  <p className="text-cream-200 mb-6">{error}</p>
                  <Button onClick={() => setStep(2)} variant="outline">
                    Try Again
                  </Button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                      <p className="text-cream-200 mb-2 text-sm">BEFORE</p>
                      <div className="aspect-video bg-navy-700 rounded-lg overflow-hidden">
                        {uploadedImage.preview && (
                          <img 
                            src={uploadedImage.preview} 
                            alt="Original room" 
                            className="w-full h-full object-cover" 
                          />
                        )}
                      </div>
                    </div>
                    <div>
                      <p className="text-cream-200 mb-2 text-sm">AFTER</p>
                      <div className="aspect-video bg-navy-700 rounded-lg overflow-hidden">
                        {generatedImage && (
                          <img 
                            src={generatedImage} 
                            alt="Transformed room" 
                            className="w-full h-full object-cover" 
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-navy-700 p-4 rounded-lg mb-8">
                    <div className="flex items-start">
                      <div 
                        className="w-3 h-3 rounded-full mt-1.5 mr-2"
                        style={{ backgroundColor: getCurrentTheme()?.color }}
                      ></div>
                      <div>
                        <h3 className="font-display text-xl mb-1">
                          {getCurrentTheme()?.name} Theme
                        </h3>
                        <p className="text-cream-200 text-sm">
                          {getCurrentTheme()?.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}
              
              <div className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={handlePrevStep}
                  disabled={isGenerating}
                >
                  <ArrowLeft className="mr-2" size={18} />
                  Back
                </Button>
                <Button 
                  onClick={handleNextStep}
                  disabled={isGenerating}
                >
                  Start Over
                  <RefreshCw className="ml-2" size={18} />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransformPage;