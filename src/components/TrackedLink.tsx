
import React from 'react';
import { trackProductClick } from '@/integrations/supabase/client';

interface TrackedLinkProps {
  productId: string;
  href: string;
  className?: string;
  source?: string;
  children: React.ReactNode;
}

const TrackedLink: React.FC<TrackedLinkProps> = ({ productId, href, className, source = 'product_link', children }) => {
  const trackClick = async () => {
    try {
      // Log click in Supabase with source information
      await trackProductClick(productId, source);
    } catch (error) {
      console.error('Error tracking click:', error);
    }
  };

  return (
    <a 
      href={href} 
      className={className}
      onClick={trackClick}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
};

export default TrackedLink;
