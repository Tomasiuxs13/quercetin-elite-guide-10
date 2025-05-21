
import React from 'react';
import { supabase } from '@/integrations/supabase/client';

interface TrackedLinkProps {
  productId: string;
  href: string;
  className?: string;
  children: React.ReactNode;
}

const TrackedLink: React.FC<TrackedLinkProps> = ({ productId, href, className, children }) => {
  const trackClick = async () => {
    try {
      // Log click in Supabase
      await supabase.from('product_clicks').insert({
        product_id: productId,
        referrer: document.referrer,
        user_agent: navigator.userAgent,
      });
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
