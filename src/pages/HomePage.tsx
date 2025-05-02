import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Upload, Wand2, Image as ImageIcon } from 'lucide-react';
import Button from '../components/ui/Button';
import { themes } from '../data/themes';
import ThemeCard from '../components/ui/ThemeCard';
import GalleryCard from '../components/ui/GalleryCard';
import { galleryItems } from '../data/gallery';

const HomePage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden diagonal-box">
        <div className="container mx-auto px-4 md:px-6 py-20 lg:py-0 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl leading-tight mb-6">
                TURN ANY ROOM<br/>IN YOUR HOUSE<br/>INTO A MANCAVE
              </h1>
              <p className="text-cream-200 text-lg md:text-xl mb-8 max-w-lg">
                Upload a photo and transform your space with AI. Create the ultimate personalized retreat with just a few clicks.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/transform">
                  <Button size="lg">
                    Transform Room
                    <ChevronRight className="ml-2" size={20} />
                  </Button>
                </Link>
                <Link to="/gallery">
                  <Button variant="outline" size="lg">
                    View Gallery
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
              <div className="relative ml-auto max-w-md">
                <div className="bg-navy-800 p-4 rounded-2xl shadow-2xl overflow-hidden">
                  <img 
                    src="https://images.pexels.com/photos/3209045/pexels-photo-3209045.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                    alt="Transformed Mancave" 
                    className="w-full h-auto rounded-lg"
                  />
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-orange-500/20 to-transparent pointer-events-none"></div>
                </div>
                <div className="absolute -bottom-6 -left-6 bg-navy-800 p-3 rounded-lg shadow-lg">
                  <p className="text-cream-100 text-sm font-bold">Sports Fan Theme</p>
                  <div className="flex mt-1">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mr-1"></div>
                    <div className="w-2 h-2 rounded-full bg-orange-500 mr-1"></div>
                    <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-navy-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl mb-4">HOW IT WORKS</h2>
            <p className="text-cream-200 text-lg max-w-xl mx-auto">
              Transform your space in three simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card p-6 text-center hover:bg-navy-700 transition-colors group">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Upload className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-display text-2xl mb-3">UPLOAD</h3>
              <p className="text-cream-200">
                Upload a photo of the room you want to transform
              </p>
            </div>
            
            <div className="card p-6 text-center hover:bg-navy-700 transition-colors group">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Wand2 className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-display text-2xl mb-3">CHOOSE</h3>
              <p className="text-cream-200">
                Select your favorite theme and customization options
              </p>
            </div>
            
            <div className="card p-6 text-center hover:bg-navy-700 transition-colors group">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <ImageIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-display text-2xl mb-3">TRANSFORM</h3>
              <p className="text-cream-200">
                Get your AI-generated mancave design within seconds
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Themes */}
      <section className="py-20 bg-navy-900 relative overflow-hidden">
        <div className="diagonal-stripes absolute inset-0 opacity-10"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex justify-between items-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl">POPULAR THEMES</h2>
            <Link to="/themes" className="text-orange-500 hover:text-orange-600 transition-colors flex items-center">
              View All
              <ChevronRight size={20} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {themes.slice(0, 3).map((theme) => (
              <ThemeCard key={theme.id} theme={theme} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/transform">
              <Button size="lg">
                Start Creating
                <ChevronRight className="ml-2" size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-20 bg-navy-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl">INSPIRATION GALLERY</h2>
            <Link to="/gallery" className="text-orange-500 hover:text-orange-600 transition-colors flex items-center">
              View All
              <ChevronRight size={20} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryItems.slice(0, 3).map((item) => (
              <GalleryCard key={item.id} item={item} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/gallery">
              <Button variant="outline" size="lg">
                Explore Gallery
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-orange-500 text-navy-900">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="font-display text-4xl md:text-5xl mb-6">READY TO CREATE YOUR DREAM SPACE?</h2>
          <p className="text-navy-900 max-w-2xl mx-auto mb-8 text-lg">
            Join thousands of happy customers who have transformed their ordinary rooms into extraordinary personal retreats.
          </p>
          <Link to="/transform">
            <Button 
              size="lg"
              className="bg-navy-900 hover:bg-navy-800 text-white px-10 py-4"
            >
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;