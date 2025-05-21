
import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  max?: number;
  size?: number;
  className?: string;
}

const StarRating: React.FC<StarRatingProps> = ({ 
  rating, 
  max = 5, 
  size = 16,
  className = ''
}) => {
  return (
    <div className={`flex items-center ${className}`}>
      {[...Array(max)].map((_, i) => {
        const starValue = i + 1;
        const filled = rating >= starValue;
        const halfFilled = !filled && rating > i && rating < starValue;
        
        return (
          <div key={i} className="relative">
            <Star
              size={size}
              className={filled ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}
            />
            
            {halfFilled && (
              <div className="absolute inset-0 overflow-hidden" style={{ width: '50%' }}>
                <Star
                  size={size}
                  className="text-amber-400 fill-amber-400"
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StarRating;
