
import React from 'react';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check, ExternalLink } from 'lucide-react';
import { trackProductClick } from '@/integrations/supabase/client';
import { ProductType } from '@/hooks/useProducts';
import { Badge } from '@/components/ui/badge';
import { Separator } from './ui/separator';

interface ProductCardProps {
  product: ProductType;
  showRank?: boolean;
  variant?: 'default' | 'compact';
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  showRank = false,
  variant = 'default'
}) => {
  const handleClick = () => {
    trackProductClick(product.id);
  };

  // Display first 2 pros and cons if they exist
  const displayPros = product.pros && Array.isArray(product.pros) ? product.pros.slice(0, 2) : [];
  const displayCons = product.cons && Array.isArray(product.cons) ? product.cons.slice(0, 2) : [];

  return (
    <div className="product-card relative bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      {showRank && product.rank && (
        <div className="absolute -top-4 -left-4 bg-brand-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-md z-10">
          #{product.rank}
        </div>
      )}
      
      <div className="flex flex-col md:flex-row md:items-start gap-4">
        <div className="md:w-28 lg:w-36 flex-shrink-0 mx-auto md:mx-0">
          <img 
            src={product.image || "https://placehold.co/300x400/f5f5f5/cccccc?text=No+Image"} 
            alt={product.name} 
            className="w-full object-contain h-40 md:h-32"
          />
        </div>
        
        <div className="flex-grow">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
            <div>
              <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-2">By {product.brand}</p>
            </div>
            <div className="flex items-center text-lg font-semibold text-gray-900 mb-3">
              ${product.price.toFixed(2)}
              {product.price < 25 && <Badge className="ml-2 bg-green-500">Great Value</Badge>}
            </div>
          </div>
          
          <div className="flex items-center mb-3">
            <StarRating rating={product.rating} className="mr-2" />
            <span className="text-sm text-gray-600">({product.review_count || 0} reviews)</span>
          </div>
          
          {variant !== 'compact' && product.description && (
            <p className="text-gray-700 text-sm mb-4 line-clamp-2">
              {product.description}
            </p>
          )}
          
          {variant !== 'compact' && (displayPros.length > 0 || displayCons.length > 0) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {displayPros.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Highlights:</h4>
                  <ul className="text-sm">
                    {displayPros.map((pro, index) => (
                      <li key={index} className="flex items-start mb-1">
                        <Check className="h-4 w-4 text-green-500 mr-1 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {displayCons.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Considerations:</h4>
                  <ul className="text-sm">
                    {displayCons.map((con, index) => (
                      <li key={index} className="flex items-start mb-1">
                        <span className="text-red-500 mr-1 font-medium">•</span>
                        <span className="text-gray-700">{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild className="bg-teal-600 hover:bg-teal-700 gap-1" onClick={handleClick}>
              <a href={product.link} target="_blank" rel="noopener noreferrer">
                View Best Price <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
            
            <Button variant="outline" asChild>
              <Link to={`/products/${product.id}`} className="gap-1">
                Read Full Review <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
