
import React from 'react';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    brand: string;
    image: string;
    rating: number;
    reviewCount: number;
    price: number;
    link: string;
    rank?: number;
  };
  showRank?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, showRank = false }) => {
  return (
    <div className="product-card relative">
      {showRank && product.rank && (
        <div className="absolute -top-4 -left-4 bg-brand-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-md z-10">
          #{product.rank}
        </div>
      )}
      
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="md:w-28 lg:w-36 flex-shrink-0 mx-auto md:mx-0">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full object-contain h-40 md:h-32"
          />
        </div>
        
        <div className="flex-grow">
          <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
          <p className="text-gray-600 text-sm mb-2">By {product.brand}</p>
          
          <div className="flex items-center mb-3">
            <StarRating rating={product.rating} className="mr-2" />
            <span className="text-sm text-gray-600">({product.reviewCount} reviews)</span>
          </div>
          
          <div className="flex items-center text-lg font-semibold text-gray-900 mb-3">
            ${product.price.toFixed(2)}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild className="bg-teal-600 hover:bg-teal-700">
              <a href={product.link} target="_blank" rel="noopener noreferrer">
                View Best Price
              </a>
            </Button>
            
            <Button variant="outline" asChild>
              <Link to={`/products/${product.id}`}>
                Read Review <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
