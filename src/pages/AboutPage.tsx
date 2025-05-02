import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Star, Users, Zap } from 'lucide-react';
import Button from '../components/ui/Button';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen page-transition pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl mb-4">ABOUT US</h1>
          <p className="text-cream-200 text-lg max-w-2xl mx-auto">
            We're on a mission to help everyone create their perfect personal space.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div>
            <div className="relative">
              <div className="relative z-10 rounded-lg overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/7931/pexels-photo-large.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Our team" 
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-2/3 h-2/3 bg-orange-500/20 rounded-lg -z-10"></div>
            </div>
          </div>
          
          <div>
            <h2 className="font-display text-3xl md:text-4xl mb-6">OUR STORY</h2>
            <p className="text-cream-200 mb-6">
              Mancave Maker was born from a simple idea: everyone deserves a space that truly feels like their own. Our founder, a design enthusiast and tech innovator, was helping a friend transform his spare room into a sports-themed retreat when they realized how challenging it was to visualize the end result.
            </p>
            <p className="text-cream-200 mb-6">
              That's when the lightbulb moment happened. By combining cutting-edge AI technology with professional design principles, we could help anyone visualize their dream space before making a single change to their room.
            </p>
            <p className="text-cream-200 mb-6">
              Since our launch in 2023, we've helped thousands of customers transform ordinary rooms into extraordinary personal retreats that reflect their passions and personalities.
            </p>
          </div>
        </div>

        <div className="bg-navy-800 rounded-lg p-8 md:p-12 mb-20">
          <h2 className="font-display text-3xl md:text-4xl mb-8 text-center">OUR VALUES</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex">
              <div className="mr-4 text-orange-500">
                <Star size={32} />
              </div>
              <div>
                <h3 className="font-display text-xl mb-2">Quality First</h3>
                <p className="text-cream-200">
                  We never compromise on quality. Our AI models are trained on professional interior designs to ensure stunning results every time.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="mr-4 text-orange-500">
                <Zap size={32} />
              </div>
              <div>
                <h3 className="font-display text-xl mb-2">Innovation</h3>
                <p className="text-cream-200">
                  We continuously push the boundaries of what's possible with AI design technology.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="mr-4 text-orange-500">
                <Users size={32} />
              </div>
              <div>
                <h3 className="font-display text-xl mb-2">Customer Focus</h3>
                <p className="text-cream-200">
                  Your satisfaction drives everything we do. We're committed to providing an exceptional experience from start to finish.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="mr-4 text-orange-500">
                <Award size={32} />
              </div>
              <div>
                <h3 className="font-display text-xl mb-2">Accessibility</h3>
                <p className="text-cream-200">
                  We believe great design should be accessible to everyone, not just those who can afford professional designers.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl mb-6">JOIN OUR COMMUNITY</h2>
          <p className="text-cream-200 text-lg max-w-2xl mx-auto mb-8">
            Ready to transform your space? Join thousands of others who have already created their perfect mancave.
          </p>
          <Link to="/transform">
            <Button size="lg">
              Start Creating Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;