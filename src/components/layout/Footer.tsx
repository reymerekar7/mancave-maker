import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Instagram, Twitter, Facebook } from 'lucide-react';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-800 pt-12 pb-6 relative overflow-hidden">
      <div className="diagonal-stripes absolute inset-0 opacity-10"></div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Logo className="h-10 w-auto" />
              <span className="ml-2 text-2xl font-display text-cream-100">Mancave Maker</span>
            </div>
            <p className="text-cream-200 mb-4 text-sm">
              Transform any room in your house into the ultimate mancave with our AI-powered design platform.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-cream-200 hover:text-orange-500 transition">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-cream-200 hover:text-orange-500 transition">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-cream-200 hover:text-orange-500 transition">
                <Facebook size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-display text-lg mb-4 text-cream-100">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-cream-200 hover:text-orange-500 transition">Home</Link></li>
              <li><Link to="/gallery" className="text-cream-200 hover:text-orange-500 transition">Gallery</Link></li>
              <li><Link to="/themes" className="text-cream-200 hover:text-orange-500 transition">Themes</Link></li>
              <li><Link to="/about" className="text-cream-200 hover:text-orange-500 transition">About Us</Link></li>
              <li><Link to="/contact" className="text-cream-200 hover:text-orange-500 transition">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-display text-lg mb-4 text-cream-100">Themes</h3>
            <ul className="space-y-2">
              <li><Link to="/themes/sports" className="text-cream-200 hover:text-orange-500 transition">Sports</Link></li>
              <li><Link to="/themes/gaming" className="text-cream-200 hover:text-orange-500 transition">Gaming</Link></li>
              <li><Link to="/themes/movies" className="text-cream-200 hover:text-orange-500 transition">Movies & TV</Link></li>
              <li><Link to="/themes/music" className="text-cream-200 hover:text-orange-500 transition">Music</Link></li>
              <li><Link to="/themes/retro" className="text-cream-200 hover:text-orange-500 transition">Retro & Vintage</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-display text-lg mb-4 text-cream-100">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail size={18} className="text-orange-500 mt-1 mr-2" />
                <span className="text-cream-200">support@mancavemaker.com</span>
              </li>
              <li className="flex items-start">
                <Phone size={18} className="text-orange-500 mt-1 mr-2" />
                <span className="text-cream-200">(555) 123-4567</span>
              </li>
            </ul>
            <Link to="/contact" className="btn-secondary mt-4 py-2 inline-block">
              Get in Touch
            </Link>
          </div>
        </div>
        
        <div className="border-t border-navy-700 mt-10 pt-6 text-center">
          <p className="text-cream-200 text-sm">
            © {new Date().getFullYear()} Mancave Maker. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;