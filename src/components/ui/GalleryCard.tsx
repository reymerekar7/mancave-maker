import React, { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { GalleryItem } from '../../types';

interface GalleryCardProps {
  item: GalleryItem;
}

const GalleryCard: React.FC<GalleryCardProps> = ({ item }) => {
  const [showAfter, setShowAfter] = useState(false);

  const toggleView = () => {
    setShowAfter(!showAfter);
  };

  return (
    <div className="card overflow-hidden group">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={showAfter ? item.after : item.before} 
          alt={item.title} 
          className="w-full h-full object-cover transition-all duration-700" 
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-transparent to-transparent flex flex-col justify-end p-4">
          <div className="flex justify-between items-center">
            <h3 className="font-display text-xl text-white">{item.title}</h3>
            <button 
              onClick={toggleView}
              className="bg-navy-800/80 text-cream-100 rounded-full p-2 hover:bg-orange-500 transition-colors"
            >
              {showAfter ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
            </button>
          </div>
          <div className="flex items-center mt-1">
            <span className="text-xs text-cream-200">{showAfter ? 'After' : 'Before'}</span>
            <div className="flex-grow mx-2 h-0.5 bg-cream-200/20 relative">
              <div 
                className="absolute h-0.5 bg-orange-500 transition-all duration-300" 
                style={{ width: showAfter ? '100%' : '0%' }}
              ></div>
            </div>
            <span className="text-xs text-cream-200">{showAfter ? '' : 'After'}</span>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-center">
          <span className="inline-block px-2 py-1 bg-navy-700 text-xs text-cream-100 rounded-md">
            {item.theme}
          </span>
        </div>
      </div>
    </div>
  );
};

export default GalleryCard;