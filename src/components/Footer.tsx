
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Logo className="mb-4" />
            <p className="text-gray-600 text-sm mb-4">
              Your trusted source for evidence-based Quercetin supplement comparisons and reviews.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-4">Products</h4>
            <ul className="space-y-2">
              <li><Link to="/products" className="text-gray-600 hover:text-brand-600 transition-colors text-sm">All Supplements</Link></li>
              <li><Link to="/products/comparison" className="text-gray-600 hover:text-brand-600 transition-colors text-sm">Comparison</Link></li>
              <li><Link to="/products/top-picks" className="text-gray-600 hover:text-brand-600 transition-colors text-sm">Top Picks</Link></li>
              <li><Link to="/products/new-releases" className="text-gray-600 hover:text-brand-600 transition-colors text-sm">New Releases</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-4">Learn</h4>
            <ul className="space-y-2">
              <li><Link to="/benefits" className="text-gray-600 hover:text-brand-600 transition-colors text-sm">Benefits</Link></li>
              <li><Link to="/what-is-quercetin" className="text-gray-600 hover:text-brand-600 transition-colors text-sm">What is Quercetin</Link></li>
              <li><Link to="/faq" className="text-gray-600 hover:text-brand-600 transition-colors text-sm">FAQ</Link></li>
              <li><Link to="/blog" className="text-gray-600 hover:text-brand-600 transition-colors text-sm">Blog</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-600 hover:text-brand-600 transition-colors text-sm">About Us</Link></li>
              <li><Link to="/privacy-policy" className="text-gray-600 hover:text-brand-600 transition-colors text-sm">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="text-gray-600 hover:text-brand-600 transition-colors text-sm">Terms of Service</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-brand-600 transition-colors text-sm">Contact Us</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="text-gray-600 text-xs">
            <p className="mb-6 max-w-4xl">
              <strong>Disclaimer:</strong> This website contains affiliate links. If you click and purchase, we may receive a commission at no additional cost to you. These commissions help support our work in researching and reviewing products. All opinions expressed are our own and are not influenced by affiliate relationships. Information on this website is for educational purposes only and is not intended to diagnose, treat, cure, or prevent any disease. Always consult with a healthcare professional before starting any supplement.
            </p>
            <p>© {new Date().getFullYear()} QBestSupplements. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
