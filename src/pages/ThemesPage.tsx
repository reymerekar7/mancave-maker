import React from 'react';
import { Link } from 'react-router-dom';
import { themes } from '../data/themes';
import ThemeCard from '../components/ui/ThemeCard';
import Button from '../components/ui/Button';

const ThemesPage: React.FC = () => {
  return (
    <div className="min-h-screen page-transition pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl mb-4">MANCAVE THEMES</h1>
          <p className="text-cream-200 text-lg max-w-2xl mx-auto">
            Choose from our collection of professionally designed themes to transform your space into the perfect mancave.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {themes.map(theme => (
            <ThemeCard 
              key={theme.id} 
              theme={theme} 
            />
          ))}
        </div>

        <div className="bg-navy-800 rounded-lg p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="font-display text-3xl mb-4">CUSTOM THEME</h2>
              <p className="text-cream-200 mb-6">
                Don't see what you're looking for? We can create a custom theme based on your specific preferences and interests.
              </p>
              <Link to="/contact">
                <Button>
                  Request Custom Theme
                </Button>
              </Link>
            </div>
            <div className="bg-navy-700 p-4 rounded-lg">
              <div className="grid grid-cols-3 gap-3">
                <div className="aspect-square bg-orange-500/20 rounded-md flex items-center justify-center">
                  <span className="text-orange-500 font-display">?</span>
                </div>
                {Array.from({ length: 8 }).map((_, i) => (
                  <div 
                    key={i} 
                    className="aspect-square bg-navy-600 rounded-md animate-pulse" 
                    style={{ 
                      animationDelay: `${i * 0.1}s`,
                      opacity: 0.3 + (i * 0.1)
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemesPage;