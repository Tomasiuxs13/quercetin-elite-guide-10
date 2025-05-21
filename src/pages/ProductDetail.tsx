
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Check, X, ExternalLink, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import StarRating from '@/components/StarRating';
import { Skeleton } from '@/components/ui/skeleton';
import { trackProductClick } from '@/integrations/supabase/client';
import { useProducts } from '@/hooks/useProducts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { useProductDetail, products, logProductClick } = useProducts();
  const { data: product, isLoading, error } = useProductDetail(id);
  
  // Get similar products (same brand or similar rating)
  const similarProducts = products
    .filter(p => p.id !== id && (p.brand === product?.brand || Math.abs(p.rating - (product?.rating || 0)) < 0.5))
    .slice(0, 3);

  if (error) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
          <h2 className="text-xl font-semibold mb-2">Error Loading Product</h2>
          <p>We couldn't load this product. It may have been removed or there was a connection issue.</p>
          <Button asChild variant="outline" className="mt-4">
            <Link to="/products">Back to All Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleBuyClick = () => {
    if (product) {
      logProductClick(product.id);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link to="/products" className="text-brand-600 hover:text-brand-700 flex items-center">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to All Products
        </Link>
      </div>

      {isLoading || !product ? (
        <div className="space-y-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/3">
              <Skeleton className="w-full h-80 rounded-lg" />
            </div>
            <div className="lg:w-2/3">
              <Skeleton className="h-10 w-3/4 mb-2" />
              <Skeleton className="h-6 w-1/2 mb-4" />
              <Skeleton className="h-5 w-40 mb-6" />
              <Skeleton className="h-8 w-24 mb-4" />
              <Skeleton className="h-20 w-full mb-6" />
              <div className="flex gap-3">
                <Skeleton className="h-12 w-40" />
                <Skeleton className="h-12 w-40" />
              </div>
            </div>
          </div>

          <div>
            <Skeleton className="h-8 w-40 mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Product Header */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Product Image */}
            <div className="lg:w-1/3">
              <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                <img
                  src={product.image || "https://placehold.co/300x400/f5f5f5/cccccc?text=No+Image"}
                  alt={product.name}
                  className="w-full h-auto object-contain mx-auto"
                  style={{ maxHeight: '400px' }}
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="lg:w-2/3">
              {product.rank && (
                <Badge className="mb-3 bg-brand-600"># {product.rank} Top Rated</Badge>
              )}
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <p className="text-lg text-gray-700 mb-4">by {product.brand}</p>
              
              <div className="flex items-center mb-6">
                <StarRating rating={product.rating} size={20} className="mr-3" />
                <span className="text-gray-700">
                  {product.rating} out of 5 ({product.review_count || 0} reviews)
                </span>
              </div>

              <div className="text-3xl font-bold text-gray-900 mb-6">
                ${product.price.toFixed(2)}
                {product.price < 25 && 
                  <Badge className="ml-3 bg-green-500">Great Value</Badge>
                }
              </div>

              <p className="text-gray-700 mb-6">{product.description}</p>

              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <Button 
                  size="lg" 
                  className="bg-teal-600 hover:bg-teal-700 gap-2"
                  onClick={handleBuyClick}
                  asChild
                >
                  <a href={product.link} target="_blank" rel="noopener noreferrer">
                    View Best Price <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
                
                <Button size="lg" variant="outline">
                  Add to Comparison
                </Button>
              </div>
            </div>
          </div>

          <Separator className="my-10" />

          {/* Tabs for Features/Pros/Cons */}
          <Tabs defaultValue="features" className="mb-10">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="pros">Pros</TabsTrigger>
              <TabsTrigger value="cons">Cons</TabsTrigger>
            </TabsList>
            
            <TabsContent value="features" className="mt-6">
              <h2 className="text-xl font-semibold mb-4">Key Features</h2>
              {product.features && product.features.length > 0 ? (
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className="bg-brand-100 p-1 rounded-full mr-3 mt-1">
                        <Star className="h-4 w-4 text-brand-600" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No specific features listed for this product.</p>
              )}
            </TabsContent>
            
            <TabsContent value="pros" className="mt-6">
              <h2 className="text-xl font-semibold mb-4">Pros</h2>
              {product.pros && product.pros.length > 0 ? (
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.pros.map((pro, index) => (
                    <li key={index} className="flex items-start">
                      <div className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No pros have been listed for this product.</p>
              )}
            </TabsContent>
            
            <TabsContent value="cons" className="mt-6">
              <h2 className="text-xl font-semibold mb-4">Cons</h2>
              {product.cons && product.cons.length > 0 ? (
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.cons.map((con, index) => (
                    <li key={index} className="flex items-start">
                      <div className="bg-red-100 p-1 rounded-full mr-3 mt-1">
                        <X className="h-4 w-4 text-red-600" />
                      </div>
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No cons have been listed for this product.</p>
              )}
            </TabsContent>
          </Tabs>

          {/* Similar Products */}
          {similarProducts.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-semibold mb-6">Similar Products You Might Like</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {similarProducts.map(similar => (
                  <Link 
                    key={similar.id} 
                    to={`/products/${similar.id}`}
                    className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="h-40 flex items-center justify-center mb-4">
                      <img
                        src={similar.image || "https://placehold.co/300x400/f5f5f5/cccccc?text=No+Image"}
                        alt={similar.name}
                        className="max-h-full w-auto object-contain"
                      />
                    </div>
                    <h3 className="font-medium mb-2">{similar.name}</h3>
                    <div className="flex items-center justify-between">
                      <StarRating rating={similar.rating} size={14} />
                      <span className="font-semibold">${similar.price.toFixed(2)}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductDetail;
