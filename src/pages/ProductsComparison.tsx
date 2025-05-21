
import React, { useState } from 'react';
import { useProducts } from '@/hooks/useProducts';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ExternalLink, Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from '@/components/ui/card';
import StarRating from '@/components/StarRating';
import TrackedLink from '@/components/TrackedLink';

const ProductsComparison = () => {
  const { products, isLoading } = useProducts();
  const [showAllFeatures, setShowAllFeatures] = useState<Record<string, boolean>>({});

  // Toggle feature visibility for a product
  const toggleFeatures = (productId: string) => {
    setShowAllFeatures(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="mb-10 max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-4 text-center">Compare Quercetin Supplements</h1>
          <p className="text-xl text-gray-600 text-center mb-6">
            Detailed side-by-side comparison of top quercetin supplements to help you make an informed decision.
          </p>
          <div className="bg-brand-50 p-6 rounded-xl border border-brand-100">
            <h2 className="text-xl font-semibold mb-3 text-brand-800">How to Use This Comparison</h2>
            <p className="text-gray-700 mb-4">
              We've analyzed the top quercetin supplements on the market based on quality, potency, 
              value, and user satisfaction. Compare across key criteria to find the perfect supplement for your needs.
            </p>
            <div className="flex flex-wrap gap-3 items-center justify-center">
              <span className="inline-flex items-center bg-white px-3 py-1 rounded-full border text-sm font-medium">
                <Check className="h-4 w-4 text-green-500 mr-1" /> Scroll horizontally to see more details
              </span>
              <span className="inline-flex items-center bg-white px-3 py-1 rounded-full border text-sm font-medium">
                <Check className="h-4 w-4 text-green-500 mr-1" /> Click "View Deal" for best prices
              </span>
              <span className="inline-flex items-center bg-white px-3 py-1 rounded-full border text-sm font-medium">
                <Check className="h-4 w-4 text-green-500 mr-1" /> Read full reviews for complete analysis
              </span>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <Card className="mb-12 shadow-md border-gray-200">
          <CardContent className="p-0">
            {isLoading ? (
              <div className="space-y-4 p-6">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-64 w-full" />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-gray-50 sticky top-0">
                    <TableRow className="hover:bg-gray-50">
                      <TableHead className="w-[200px] font-semibold text-gray-800">Product</TableHead>
                      <TableHead className="font-semibold text-gray-800">Rating</TableHead>
                      <TableHead className="font-semibold text-gray-800">Price</TableHead>
                      <TableHead className="hidden md:table-cell font-semibold text-gray-800">Key Features</TableHead>
                      <TableHead className="hidden lg:table-cell font-semibold text-gray-800">Pros</TableHead>
                      <TableHead className="hidden lg:table-cell font-semibold text-gray-800">Cons</TableHead>
                      <TableHead className="font-semibold text-gray-800"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id} className="hover:bg-gray-50 border-t transition-colors">
                        <TableCell className="font-medium">
                          <div className="flex flex-col items-start gap-2">
                            <div className="relative bg-gray-50 p-2 rounded-md w-20 h-20 flex items-center justify-center">
                              {product.rank && (
                                <span className="absolute -top-2 -right-2 bg-brand-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                                  #{product.rank}
                                </span>
                              )}
                              {product.image && (
                                <img 
                                  src={product.image} 
                                  alt={product.name} 
                                  className="max-w-full max-h-full object-contain"
                                />
                              )}
                            </div>
                            <div>
                              <Link to={`/products/${product.id}`} className="text-brand-700 hover:text-brand-800 hover:underline font-medium">
                                {product.name}
                              </Link>
                              <div className="text-xs text-gray-500">{product.brand}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <StarRating rating={product.rating} size={16} />
                            <span className="text-sm font-medium">{product.rating.toFixed(1)}</span>
                            <span className="text-xs text-gray-500">({product.review_count})</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-semibold text-gray-900">${product.price.toFixed(2)}</div>
                          {product.price < 25 && <div className="text-xs text-green-600 mt-1 font-medium">Great Value</div>}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {product.features && Array.isArray(product.features) && (
                            <div>
                              <ul className="list-none text-sm space-y-1">
                                {(showAllFeatures[product.id] 
                                  ? product.features 
                                  : product.features.slice(0, 3)
                                ).map((feature, idx) => (
                                  <li key={idx} className="flex items-start">
                                    <Check className="h-4 w-4 text-green-500 mr-1.5 mt-0.5 flex-shrink-0" />
                                    <span>{feature}</span>
                                  </li>
                                ))}
                              </ul>
                              {product.features.length > 3 && (
                                <Button 
                                  variant="link" 
                                  className="text-xs p-0 h-auto mt-1 text-brand-600"
                                  onClick={() => toggleFeatures(product.id)}
                                >
                                  {showAllFeatures[product.id] ? 'Show less' : 'Show more'}
                                </Button>
                              )}
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          {product.pros && Array.isArray(product.pros) && (
                            <ul className="list-none text-sm space-y-1">
                              {product.pros.slice(0, 2).map((pro, idx) => (
                                <li key={idx} className="flex items-start">
                                  <Check className="h-4 w-4 text-green-500 mr-1.5 mt-0.5 flex-shrink-0" />
                                  <span className="text-gray-700">{pro}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          {product.cons && Array.isArray(product.cons) && (
                            <ul className="list-none text-sm space-y-1">
                              {product.cons.slice(0, 2).map((con, idx) => (
                                <li key={idx} className="flex items-start">
                                  <span className="text-red-500 mr-1.5 font-medium text-lg leading-none">•</span>
                                  <span className="text-gray-700">{con}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-2">
                            <TrackedLink 
                              href={product.link} 
                              productId={product.id} 
                              className="inline-flex items-center gap-1 px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-md text-sm font-medium transition-colors"
                            >
                              View Deal
                              <ExternalLink className="h-3.5 w-3.5" />
                            </TrackedLink>
                            
                            <Link 
                              to={`/products/${product.id}`}
                              className="inline-flex items-center gap-1 px-3 py-1.5 border border-gray-300 hover:bg-gray-50 rounded-md text-sm font-medium text-gray-700 transition-colors"
                            >
                              Details
                              <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="bg-gradient-to-br from-brand-50 to-brand-100 p-8 rounded-xl max-w-4xl mx-auto text-center border border-brand-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-brand-800">Need help deciding?</h2>
          <p className="mb-6 text-gray-700">
            Check out our top picks with detailed reviews to find the perfect quercetin supplement for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-brand-600 hover:bg-brand-700">
              <Link to="/products/top-picks">
                View Top Picks
              </Link>
            </Button>
            
            <Button variant="outline" asChild size="lg">
              <Link to="/what-is-quercetin">
                Learn About Quercetin
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsComparison;
