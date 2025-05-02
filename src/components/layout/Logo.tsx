import React from 'react';
import logo from '../../assets/mancave_maker-removebg-preview.png';


interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = 'h-12 w-12' }) => {
  return (
    <img 
      src={logo}
      alt="Mancave Maker"
      className={className}
    />
  );
};

export default Logo;