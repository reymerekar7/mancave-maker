import React from 'react';
import { Theme } from '../../types';

interface ThemeCardProps {
  theme: Theme;
  selected?: boolean;
  onSelect?: (id: string) => void;
}

const ThemeCard: React.FC<ThemeCardProps> = ({ theme, selected = false, onSelect }) => {
  const handleClick = () => {
    if (onSelect) {
      onSelect(theme.id);
    }
  };

  return (
    <div 
      className={`card cursor-pointer transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
        selected ? 'ring-2 ring-orange-500 shadow-lg' : ''
      }`}
      onClick={handleClick}
    >
      <div className="h-48 overflow-hidden">
        <img 
          src={theme.image} 
          alt={theme.name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center mb-2">
          <div 
            className="w-3 h-3 rounded-full mr-2" 
            style={{ backgroundColor: theme.color }}
          ></div>
          <h3 className="font-display text-xl">{theme.name}</h3>
        </div>
        <p className="text-cream-200 text-sm">{theme.description}</p>
      </div>
    </div>
  );
};

export default ThemeCard;