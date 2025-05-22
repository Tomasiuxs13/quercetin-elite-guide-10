
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
  ThumbsUp,
  Medal
} from 'lucide-react';
import { trackProductClick } from '@/integrations/supabase/client';
import { ProductType } from '@/hooks/useProducts';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface ProductCardProps {
  product: ProductType;
  showRank?: boolean;
  variant?: 'default' | 'compact';
  source?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  showRank = false,
  variant = 'default',
  source = 'product_card'
}) => {
  const handleClick = () => {
    trackProductClick(product.id, source);
  };

  // Display first 2 pros and cons if they exist
  const displayPros = product.pros && Array.isArray(product.pros) ? product.pros.slice(0, 2) : [];
  const displayCons = product.cons && Array.isArray(product.cons) ? product.cons.slice(0, 2) : [];

  // Get appropriate rank badge styling
  const getRankBadgeStyle = (rank: number | null) => {
    if (!rank) return {};
    
    if (rank === 1) return { 
      className: "absolute -top-6 -left-6 bg-amber-500 text-white w-14 h-14 rounded-full flex flex-col items-center justify-center font-bold shadow-lg z-10 border-2 border-white transform translate-x-2 translate-y-2",
      icon: <Medal className="h-5 w-5 text-white mb-0.5" />,
      label: "Best Pick"
    };
    if (rank === 2) return { 
      className: "absolute -top-6 -left-6 bg-gray-400 text-white w-14 h-14 rounded-full flex flex-col items-center justify-center font-bold shadow-lg z-10 border-2 border-white transform translate-x-2 translate-y-2",
      icon: <Medal className="h-5 w-5 text-white mb-0.5" />,
      label: "Runner Up"
    };
    if (rank === 3) return { 
      className: "absolute -top-6 -left-6 bg-amber-700 text-white w-14 h-14 rounded-full flex flex-col items-center justify-center font-bold shadow-lg z-10 border-2 border-white transform translate-x-2 translate-y-2",
      icon: <Medal className="h-5 w-5 text-white mb-0.5" />,
      label: "3rd Place"
    };

    return { 
      className: "absolute -top-6 -left-6 bg-brand-600 text-white w-14 h-14 rounded-full flex items-center justify-center font-bold shadow-lg z-10 border-2 border-white transform translate-x-2 translate-y-2"
    };
  };

  // Get rank styling
  const rankStyle = getRankBadgeStyle(product.rank);

  return (
    <Card className="overflow-visible transition-all duration-300 hover:shadow-xl relative group border border-gray-200 hover:border-brand-300 rounded-xl pt-2 pl-2 mt-8 ml-2">
      {showRank && product.rank && (
        <div className={rankStyle.className}>
          {rankStyle.icon}
          <span className="text-xs">{rankStyle.label || `#${product.rank}`}</span>
        </div>
      )}
      
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row md:items-start">
          <div className="md:w-36 lg:w-44 flex-shrink-0 bg-gray-50 p-4 flex items-center justify-center relative">
            <img 
              src={product.image || "https://placehold.co/300x400/f5f5f5/cccccc?text=No+Image"} 
              alt={product.name} 
              className="w-full object-contain h-44 md:h-36 transition-all duration-300 group-hover:scale-105"
            />
            {product.price < 25 && (
              <Badge className="absolute top-2 right-2 bg-green-500 hover:bg-green-600 z-10">
                Best Value
              </Badge>
            )}
          </div>
          
          <div className="flex-grow p-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 border-b pb-3 mb-4">
              <div>
                <h3 className="text-xl font-semibold mb-1 group-hover:text-brand-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-2">By {product.brand}</p>
              </div>
              
              <div className="flex flex-col items-start md:items-end">
                <div className="text-lg font-semibold text-gray-900 mb-1">
                  ${product.price.toFixed(2)}
                </div>
                <div className="flex items-center gap-1">
                  {product.price < 25 && <Badge className="bg-green-500 hover:bg-green-600 z-10">Great Value</Badge>}
                  {product.rating >= 4.8 && (
                    <Badge className="bg-brand-600 hover:bg-brand-700 flex items-center gap-1 z-10">
                      <Shield className="h-3 w-3" />
                      Top Rated
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex items-center mb-4">
              <StarRating rating={product.rating} className="mr-2" />
              <span className="text-sm text-gray-600">{product.rating.toFixed(1)} 
                <span className="text-gray-400">({product.review_count || 0} reviews)</span>
              </span>
            </div>
            
            {variant !== 'compact' && product.description && (
              <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                {product.description}
              </p>
            )}
            
            {variant !== 'compact' && (displayPros.length > 0 || displayCons.length > 0) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5 bg-gray-50 rounded-md p-4">
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
              <Button asChild className="bg-teal-600 hover:bg-teal-700 gap-1 transition-all shadow-sm hover:shadow-md" onClick={handleClick}>
                <a href={product.link} target="_blank" rel="noopener noreferrer" className="flex items-center">
                  View Best Price <ExternalLink className="h-4 w-4 ml-1" />
                </a>
              </Button>
              
              <Button variant="outline" asChild className="border-gray-300 hover:bg-gray-50 transition-all group">
                <Link to={`/products/${product.id}`} className="gap-1 flex items-center">
                  Read Full Review <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
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
