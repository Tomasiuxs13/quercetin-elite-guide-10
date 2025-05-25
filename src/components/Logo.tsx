
import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <Link 
      to="/" 
      className={`inline-flex items-center font-heading font-bold text-xl md:text-2xl ${className}`}
    >
      <span className="text-brand-600 mr-1">S</span>
      <span className="text-gray-800">Best</span>
      <span className="text-brand-600">Supplements</span>
    </Link>
  );
};

export default Logo;
