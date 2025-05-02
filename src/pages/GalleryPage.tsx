import React, { useState } from 'react';
import { galleryItems } from '../data/gallery';
import GalleryCard from '../components/ui/GalleryCard';
import { Search } from 'lucide-react';

const GalleryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const themes = ['All', ...new Set(galleryItems.map(item => item.theme))];
  
  const filteredItems = galleryItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'All' || item.theme === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen page-transition pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl mb-4">INSPIRATION GALLERY</h1>
          <p className="text-cream-200 text-lg max-w-2xl mx-auto">
            Browse our gallery of transformations to see what's possible and get inspired for your own mancave makeover.
          </p>
        </div>

        <div className="mb-10">
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
            <div className="relative max-w-md w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cream-200" size={20} />
              <input
                type="text"
                placeholder="Search transformations..."
                className="w-full bg-navy-800 border border-navy-700 text-cream-100 pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {themes.map(theme => (
                <button
                  key={theme}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    activeFilter === theme
                      ? 'bg-orange-500 text-white'
                      : 'bg-navy-800 text-cream-200 hover:bg-navy-700'
                  }`}
                  onClick={() => setActiveFilter(theme)}
                >
                  {theme}
                </button>
              ))}
            </div>
          </div>
        </div>

        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map(item => (
              <GalleryCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-navy-800 rounded-lg">
            <h3 className="font-display text-2xl mb-2">No results found</h3>
            <p className="text-cream-200">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryPage;