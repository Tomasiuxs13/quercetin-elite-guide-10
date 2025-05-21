
import React from 'react';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  Check, 
  ExternalLink,
  Shield,
  Award,
  ThumbsUp
} from 'lucide-react';
import { trackProductClick } from '@/integrations/supabase/client';
import { ProductType } from '@/hooks/useProducts';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

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
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg">
      {showRank && product.rank && (
        <div className="absolute -top-3 -left-3 bg-brand-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-md z-10">
          #{product.rank}
        </div>
      )}
      
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row md:items-start">
          <div className="md:w-32 lg:w-40 flex-shrink-0 bg-gray-50 p-4 flex items-center justify-center">
            <img 
              src={product.image || "https://placehold.co/300x400/f5f5f5/cccccc?text=No+Image"} 
              alt={product.name} 
              className="w-full object-contain h-40 md:h-32 transition-transform hover:scale-105"
            />
          </div>
          
          <div className="flex-grow p-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 border-b pb-3 mb-3">
              <div>
                <h3 className="text-xl font-semibold mb-1">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-2">By {product.brand}</p>
              </div>
              
              <div className="flex flex-col items-start md:items-end">
                <div className="text-lg font-semibold text-gray-900 mb-1">
                  ${product.price.toFixed(2)}
                </div>
                <div className="flex items-center gap-1">
                  {product.price < 25 && <Badge className="bg-green-500 hover:bg-green-600">Great Value</Badge>}
                  {product.rating >= 4.8 && <Badge className="bg-brand-600 hover:bg-brand-700">Top Rated</Badge>}
                </div>
              </div>
            </div>
            
            <div className="flex items-center mb-4">
              <StarRating rating={product.rating} className="mr-2" />
              <span className="text-sm text-gray-600">{product.rating.toFixed(1)} ({product.review_count || 0} reviews)</span>
            </div>
            
            {variant !== 'compact' && product.description && (
              <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                {product.description}
              </p>
            )}
            
            {variant !== 'compact' && (displayPros.length > 0 || displayCons.length > 0) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5 bg-gray-50 rounded-md p-3">
                {displayPros.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <ThumbsUp className="h-4 w-4 text-green-500 mr-1.5" /> Highlights:
                    </h4>
                    <ul className="text-sm">
                      {displayPros.map((pro, index) => (
                        <li key={index} className="flex items-start mb-1.5">
                          <Check className="h-4 w-4 text-green-500 mr-1.5 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {displayCons.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Considerations:</h4>
                    <ul className="text-sm">
                      {displayCons.map((con, index) => (
                        <li key={index} className="flex items-start mb-1.5">
                          <span className="text-red-500 mr-1.5 font-medium text-lg leading-none mt-0">•</span>
                          <span className="text-gray-700">{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-3 mt-auto">
              <Button asChild className="bg-teal-600 hover:bg-teal-700 gap-1 transition-colors" onClick={handleClick}>
                <a href={product.link} target="_blank" rel="noopener noreferrer">
                  View Best Price <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
              
              <Button variant="outline" asChild className="border-gray-300 hover:bg-gray-50 transition-colors">
                <Link to={`/products/${product.id}`} className="gap-1">
                  Read Full Review <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
