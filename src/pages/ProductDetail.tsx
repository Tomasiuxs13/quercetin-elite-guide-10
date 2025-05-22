
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Check, X, ExternalLink, Star, ShoppingCart, Heart, Award, ThumbsUp, Shield, BadgeCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import StarRating from '@/components/StarRating';
import { Skeleton } from '@/components/ui/skeleton';
import { trackProductClick } from '@/integrations/supabase/client';
import { useProducts } from '@/hooks/useProducts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductCard from '@/components/ProductCard';
import { Alert, AlertDescription } from "@/components/ui/alert";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { useProductDetail, products, logProductClick } = useProducts();
  const { data: product, isLoading, error } = useProductDetail(id);
  const [showSticky, setShowSticky] = useState(false);
  
  // Get similar products (same brand or similar rating)
  const similarProducts = products
    .filter(p => p.id !== id && (p.brand === product?.brand || Math.abs(p.rating - (product?.rating || 0)) < 0.5))
    .slice(0, 3);

  // Get alternative products (different brand but similar rating)
  const alternativeProducts = products
    .filter(p => p.id !== id && p.brand !== product?.brand && Math.abs(p.rating - (product?.rating || 0)) < 0.8)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowSticky(true);
      } else {
        setShowSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBuyClick = () => {
    if (product) {
      logProductClick(product.id);
    }
  };

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
          {/* Sticky CTA that appears when scrolling */}
          {showSticky && (
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40 py-3 px-4 md:py-0 transform transition-transform duration-300">
              <div className="container mx-auto">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="h-12 w-12 object-contain hidden sm:block" 
                    />
                    <div>
                      <h3 className="font-medium text-sm md:text-base line-clamp-1">{product.name}</h3>
                      <div className="flex items-center">
                        <StarRating rating={product.rating} size={12} className="mr-2" />
                        <span className="text-xs">${product.price.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className="bg-teal-600 hover:bg-teal-700 gap-1 md:px-6"
                      onClick={handleBuyClick}
                      asChild
                    >
                      <a href={product.link} target="_blank" rel="noopener noreferrer">
                        <ShoppingCart className="h-4 w-4 md:mr-1" />
                        <span className="hidden md:inline">Buy Now</span>
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Product Header */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Product Image */}
            <div className="lg:w-1/3">
              <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm relative">
                {product.rank && (
                  <div className="absolute -top-4 -left-4 z-10">
                    {product.rank === 1 ? (
                      <div className="bg-amber-500 text-white w-16 h-16 rounded-full flex flex-col items-center justify-center font-bold border-2 border-white shadow-lg">
                        <Award className="h-6 w-6" />
                        <span className="text-xs font-medium">Best Pick</span>
                      </div>
                    ) : product.rank === 2 ? (
                      <div className="bg-gray-400 text-white w-16 h-16 rounded-full flex flex-col items-center justify-center font-bold border-2 border-white shadow-lg">
                        <Award className="h-6 w-6" />
                        <span className="text-xs font-medium">Runner Up</span>
                      </div>
                    ) : (
                      <div className="bg-amber-700 text-white w-16 h-16 rounded-full flex flex-col items-center justify-center font-bold border-2 border-white shadow-lg">
                        <Badge className="h-6 w-6" />
                        <span className="text-xs font-medium">#{product.rank}</span>
                      </div>
                    )}
                  </div>
                )}
                <img
                  src={product.image || "https://placehold.co/300x400/f5f5f5/cccccc?text=No+Image"}
                  alt={product.name}
                  className="w-full h-auto object-contain mx-auto"
                  style={{ maxHeight: '400px' }}
                />
              </div>

              {/* Trust Signals */}
              <div className="bg-gray-50 p-4 rounded-lg mt-4 border border-gray-100">
                <h3 className="text-sm font-semibold mb-3 flex items-center">
                  <Shield className="h-4 w-4 text-brand-600 mr-2" />
                  Why Trust Our Review
                </h3>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start">
                    <BadgeCheck className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                    <span>Independently tested for quality</span>
                  </li>
                  <li className="flex items-start">
                    <BadgeCheck className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                    <span>No sponsored content or paid placement</span>
                  </li>
                  <li className="flex items-start">
                    <BadgeCheck className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                    <span>Updated {new Date().toLocaleDateString('en-US', {year: 'numeric', month: 'long'})}</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Product Info */}
            <div className="lg:w-2/3">
              <div className="flex flex-wrap gap-2 mb-3">
                {product.rank && (
                  <Badge className="bg-brand-600"># {product.rank} Top Rated</Badge>
                )}
                {product.price < 25 && 
                  <Badge className="bg-green-500">Great Value</Badge>
                }
                {product.rating >= 4.8 && (
                  <Badge className="bg-amber-600">Top Rated</Badge>
                )}
              </div>

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
              </div>

              {/* Alert for special offers */}
              {product.price < 30 && (
                <Alert className="mb-6 bg-green-50 border-green-200">
                  <ThumbsUp className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    <span className="font-semibold">Limited Time Offer:</span> Free shipping available with this product!
                  </AlertDescription>
                </Alert>
              )}

              <p className="text-gray-700 mb-6">{product.description}</p>

              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <Button 
                  size="lg" 
                  className="bg-teal-600 hover:bg-teal-700 gap-2"
                  onClick={handleBuyClick}
                  asChild
                >
                  <a href={product.link} target="_blank" rel="noopener noreferrer">
                    <ShoppingCart className="h-5 w-5" /> View Best Price
                  </a>
                </Button>
                
                <Button size="lg" variant="outline" className="group">
                  <Heart className="h-5 w-5 mr-2 group-hover:text-red-500 transition-colors" />
                  Add to Comparison
                </Button>
              </div>

              {/* Key Benefits Summary */}
              {product.pros && product.pros.length > 0 && (
                <div className="bg-green-50 rounded-lg p-4 mb-6 border border-green-100">
                  <h3 className="font-semibold text-green-800 mb-2 flex items-center">
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    Key Benefits
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {product.pros.slice(0, 4).map((pro, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                        <span className="text-sm">{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
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

          {/* Comparison Section */}
          <div className="mb-12 bg-gray-50 rounded-lg p-6 border border-gray-100">
            <h2 className="text-2xl font-semibold mb-6">How It Compares</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg">
                <thead>
                  <tr className="bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    <th className="py-3 px-4 border-b">Product</th>
                    <th className="py-3 px-4 border-b">Rating</th>
                    <th className="py-3 px-4 border-b">Price</th>
                    <th className="py-3 px-4 border-b">Key Benefit</th>
                    <th className="py-3 px-4 border-b">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Current Product */}
                  <tr className="bg-green-50 border-l-4 border-green-400">
                    <td className="py-3 px-4 border-b flex items-center">
                      <img src={product.image} alt={product.name} className="h-10 w-10 object-contain mr-2" />
                      <span className="font-medium">{product.name}</span>
                    </td>
                    <td className="py-3 px-4 border-b">
                      <StarRating rating={product.rating} size={14} />
                    </td>
                    <td className="py-3 px-4 border-b font-medium">${product.price.toFixed(2)}</td>
                    <td className="py-3 px-4 border-b">
                      {product.pros && product.pros.length > 0 ? product.pros[0] : "N/A"}
                    </td>
                    <td className="py-3 px-4 border-b">
                      <Button size="sm" asChild>
                        <a href={product.link} target="_blank" rel="noopener noreferrer">
                          Current Pick
                        </a>
                      </Button>
                    </td>
                  </tr>

                  {/* Alternative Products */}
                  {alternativeProducts.map(alt => (
                    <tr key={alt.id}>
                      <td className="py-3 px-4 border-b flex items-center">
                        <img src={alt.image} alt={alt.name} className="h-10 w-10 object-contain mr-2" />
                        <Link to={`/products/${alt.id}`} className="hover:text-brand-600 transition-colors">
                          {alt.name}
                        </Link>
                      </td>
                      <td className="py-3 px-4 border-b">
                        <StarRating rating={alt.rating} size={14} />
                      </td>
                      <td className="py-3 px-4 border-b">${alt.price.toFixed(2)}</td>
                      <td className="py-3 px-4 border-b">
                        {alt.pros && alt.pros.length > 0 ? alt.pros[0] : "N/A"}
                      </td>
                      <td className="py-3 px-4 border-b">
                        <Button size="sm" variant="outline" asChild>
                          <Link to={`/products/${alt.id}`}>
                            Compare
                          </Link>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Similar Products */}
          {similarProducts.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-semibold mb-6">Similar Products You Might Like</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {similarProducts.map(similar => (
                  <ProductCard key={similar.id} product={similar} variant="compact" />
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
