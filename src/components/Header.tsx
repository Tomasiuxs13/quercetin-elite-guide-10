
import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import Logo from './Logo';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
    setIsProductsOpen(false);
  };

  const toggleProductsMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsProductsOpen(!isProductsOpen);
  };

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 text-gray-700 hover:text-brand-600 transition-colors ${isActive ? 'text-brand-600 font-medium' : ''}`;

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur border-b">
      <div className="container mx-auto flex items-center justify-between h-16">
        <Logo />

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-1">
          <NavLink to="/" className={navLinkClasses} end>Home</NavLink>
          
          <div className="relative group">
            <button
              onClick={toggleProductsMenu}
              className="px-3 py-2 text-gray-700 hover:text-brand-600 transition-colors flex items-center"
            >
              Products
              <ChevronDown className="h-4 w-4 ml-1" />
            </button>
            
            <div className={`absolute left-0 mt-1 bg-white rounded-md shadow-lg p-2 w-48 z-50 transform transition-all origin-top-left ${isProductsOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}>
              <Link to="/products" className="block px-4 py-2 text-sm hover:bg-gray-100 rounded-md" onClick={closeMenu}>All Supplements</Link>
              <Link to="/products/comparison" className="block px-4 py-2 text-sm hover:bg-gray-100 rounded-md" onClick={closeMenu}>Comparison</Link>
              <Link to="/products/top-picks" className="block px-4 py-2 text-sm hover:bg-gray-100 rounded-md" onClick={closeMenu}>Top Picks</Link>
            </div>
          </div>
          
          <NavLink to="/benefits" className={navLinkClasses}>Benefits</NavLink>
          <NavLink to="/faq" className={navLinkClasses}>FAQ</NavLink>
          <NavLink to="/what-is-quercetin" className={navLinkClasses}>What is Quercetin</NavLink>
          <NavLink to="/blog" className={navLinkClasses}>Blog</NavLink>
          <NavLink to="/about" className={navLinkClasses}>About Us</NavLink>
        </nav>

        <div className="hidden md:flex items-center space-x-3">
          <Button variant="outline" asChild>
            <Link to="/products/comparison">Compare All</Link>
          </Button>
          <Button asChild>
            <Link to="/products/top-picks">#1 Top Pick</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-500" onClick={toggleMenu}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="container mx-auto px-4 py-3 bg-white">
          <div className="flex flex-col space-y-2">
            <NavLink to="/" className="py-2 px-3 hover:bg-gray-100 rounded-md" onClick={closeMenu} end>Home</NavLink>
            
            <button 
              className="text-left py-2 px-3 flex justify-between items-center hover:bg-gray-100 rounded-md"
              onClick={toggleProductsMenu}
            >
              <span>Products</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${isProductsOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isProductsOpen && (
              <div className="ml-4 border-l-2 border-gray-200 pl-4 flex flex-col space-y-2">
                <Link to="/products" className="py-2 px-3 hover:bg-gray-100 rounded-md" onClick={closeMenu}>All Supplements</Link>
                <Link to="/products/comparison" className="py-2 px-3 hover:bg-gray-100 rounded-md" onClick={closeMenu}>Comparison</Link>
                <Link to="/products/top-picks" className="py-2 px-3 hover:bg-gray-100 rounded-md" onClick={closeMenu}>Top Picks</Link>
              </div>
            )}
            
            <NavLink to="/benefits" className="py-2 px-3 hover:bg-gray-100 rounded-md" onClick={closeMenu}>Benefits</NavLink>
            <NavLink to="/faq" className="py-2 px-3 hover:bg-gray-100 rounded-md" onClick={closeMenu}>FAQ</NavLink>
            <NavLink to="/what-is-quercetin" className="py-2 px-3 hover:bg-gray-100 rounded-md" onClick={closeMenu}>What is Quercetin</NavLink>
            <NavLink to="/blog" className="py-2 px-3 hover:bg-gray-100 rounded-md" onClick={closeMenu}>Blog</NavLink>
            <NavLink to="/about" className="py-2 px-3 hover:bg-gray-100 rounded-md" onClick={closeMenu}>About Us</NavLink>
            
            <div className="pt-2 grid grid-cols-2 gap-3">
              <Button variant="outline" asChild className="w-full">
                <Link to="/products/comparison" onClick={closeMenu}>Compare All</Link>
              </Button>
              <Button asChild className="w-full">
                <Link to="/products/top-picks" onClick={closeMenu}>#1 Top Pick</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
