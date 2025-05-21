
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, ExternalLink, Check, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useProducts } from '@/hooks/useProducts';
import { Skeleton } from '@/components/ui/skeleton';
import StarRating from '@/components/StarRating';
import { Separator } from '@/components/ui/separator';
import TrackedLink from '@/components/TrackedLink';
import { toast } from '@/components/ui/sonner';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProduct, logProductClick } = useProducts();
  
  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProduct(id || ''),
    enabled: !!id,
  });

  useEffect(() => {
    if (error) {
      toast.error("Error loading product details");
      console.error(error);
    }
  }, [error]);

  if (isLoading) {
    return (
      <div className="py-12">
        <div className="container mx-auto px-4">
          <Skeleton className="h-8 w-60 mb-4" />
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3 lg:w-1/4">
              <Skeleton className="h-80 w-full" />
            </div>
            <div className="md:w-2/3 lg:w-3/4">
              <Skeleton className="h-10 w-full mb-4" />
              <Skeleton className="h-6 w-40 mb-4" />
              <Skeleton className="h-6 w-full mb-2" />
              <Skeleton className="h-6 w-full mb-2" />
              <Skeleton className="h-6 w-3/4 mb-4" />
              <div className="flex gap-4 mb-6">
                <Skeleton className="h-10 w-40" />
                <Skeleton className="h-10 w-40" />
              </div>
              <Skeleton className="h-40 w-full mb-4" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="mb-6">Sorry, we couldn't find the product you're looking for.</p>
          <Button asChild>
            <Link to="/products">View All Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleBuyClick = () => {
    logProductClick(product.id);
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <Button variant="ghost" className="mb-6" asChild>
          <Link to="/products" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
          </Link>
        </Button>

        <div className="flex flex-col md:flex-row gap-8 mb-12">
          {/* Product Image */}
          <div className="md:w-1/3 lg:w-1/4 flex-shrink-0">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center justify-center">
              <img 
                src={product.image || "https://placehold.co/300x400/f5f5f5/cccccc?text=No+Image"} 
                alt={product.name} 
                className="max-h-80 w-auto object-contain"
              />
            </div>
          </div>

          {/* Product Information */}
          <div className="md:w-2/3 lg:w-3/4">
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-gray-600 text-lg mb-4">By {product.brand}</p>

            <div className="flex items-center mb-4">
              <StarRating rating={product.rating} size={20} className="mr-3" />
              <span className="text-lg text-gray-600">({product.review_count || 0} reviews)</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
              <div className="text-3xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </div>
              <div className="flex gap-3">
                <Button 
                  size="lg" 
                  className="bg-teal-600 hover:bg-teal-700 gap-1" 
                  onClick={handleBuyClick} 
                  asChild
                >
                  <a href={product.link} target="_blank" rel="noopener noreferrer">
                    View Best Price <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>

            {product.description && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Description</h2>
                <p className="text-gray-700">{product.description}</p>
              </div>
            )}
          </div>
        </div>

        <Separator className="my-8" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Pros Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4">What We Like</h2>
            {product.pros && Array.isArray(product.pros) && product.pros.length > 0 ? (
              <ul className="space-y-3">
                {product.pros.map((pro, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 mr-3">
                      <Check className="h-5 w-5 text-green-500" />
                    </div>
                    <p className="text-gray-700">{pro}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">No specific benefits listed.</p>
            )}
          </div>

          {/* Cons Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Things to Consider</h2>
            {product.cons && Array.isArray(product.cons) && product.cons.length > 0 ? (
              <ul className="space-y-3">
                {product.cons.map((con, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 mr-3">
                      <AlertTriangle className="h-5 w-5 text-amber-500" />
                    </div>
                    <p className="text-gray-700">{con}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">No specific drawbacks listed.</p>
            )}
          </div>
        </div>

        {/* Features Section */}
        {product.features && Array.isArray(product.features) && product.features.length > 0 && (
          <>
            <Separator className="my-8" />
            
            <div className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.features.map((feature, index) => (
                  <li key={index} className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-800">{feature}</p>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}

        {/* Related Products Section */}
        <div className="bg-gray-50 p-8 rounded-xl text-center">
          <h2 className="text-2xl font-semibold mb-4">Looking for alternatives?</h2>
          <p className="text-gray-700 mb-6">
            Check out our top picks of quercetin supplements to find the best option for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link to="/products/top-picks">
                View Top Picks
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/products/comparison">
                Compare All Products
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
