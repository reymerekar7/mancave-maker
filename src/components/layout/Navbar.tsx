import React from 'react';
import Logo from './Logo';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-navy-900/90 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-16">
          <div className="flex items-center space-x-2">
            <Logo className="h-12 w-12 object-contain" />
            <span className="text-2xl font-display text-cream-100">MANCAVE MAKER</span>
          </div>
          <div className="flex-grow"></div>
          <div className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-cream-200 hover:text-cream-100 transition-colors font-display text-lg">HOME</a>
            <a href="#" className="text-cream-200 hover:text-cream-100 transition-colors font-display text-lg">ABOUT</a>
            <a href="#" className="text-cream-200 hover:text-cream-100 transition-colors font-display text-lg">CONTACT</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;