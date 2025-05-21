
import React, { useState } from 'react';
import { useProducts } from '@/hooks/useProducts';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4 text-center">Compare Quercetin Supplements</h1>
          <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-6">
            Detailed side-by-side comparison of top quercetin supplements to help you make an informed decision.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto mb-12">
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-64 w-full" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Product</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="hidden md:table-cell">Key Features</TableHead>
                  <TableHead className="hidden lg:table-cell">Pros</TableHead>
                  <TableHead className="hidden lg:table-cell">Cons</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">
                      <div className="flex flex-col items-start gap-2">
                        {product.image && (
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-16 h-16 object-contain mb-2"
                          />
                        )}
                        <span>{product.name}</span>
                        <span className="text-xs text-gray-500">{product.brand}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <StarRating rating={product.rating} />
                        <span className="text-sm">({product.review_count})</span>
                      </div>
                    </TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {product.features && Array.isArray(product.features) && (
                        <div>
                          <ul className="list-disc list-inside text-sm">
                            {(showAllFeatures[product.id] 
                              ? product.features 
                              : product.features.slice(0, 3)
                            ).map((feature, idx) => (
                              <li key={idx}>{feature}</li>
                            ))}
                          </ul>
                          {product.features.length > 3 && (
                            <Button 
                              variant="link" 
                              className="text-xs p-0 h-auto"
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
                        <ul className="list-disc list-inside text-sm">
                          {product.pros.slice(0, 2).map((pro, idx) => (
                            <li key={idx} className="text-green-600">{pro}</li>
                          ))}
                        </ul>
                      )}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {product.cons && Array.isArray(product.cons) && (
                        <ul className="list-disc list-inside text-sm">
                          {product.cons.slice(0, 2).map((con, idx) => (
                            <li key={idx} className="text-red-600">{con}</li>
                          ))}
                        </ul>
                      )}
                    </TableCell>
                    <TableCell>
                      <TrackedLink 
                        href={product.link} 
                        productId={product.id} 
                        className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800"
                      >
                        View Deal
                        <ExternalLink className="h-3 w-3" />
                      </TrackedLink>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>

        {/* Call to Action */}
        <div className="bg-brand-50 p-8 rounded-xl max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Need help deciding?</h2>
          <p className="mb-6">
            Check out our top picks with detailed reviews to find the perfect quercetin supplement for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link to="/products/top-picks">
                View Top Picks
              </Link>
            </Button>
            
            <Button variant="outline" asChild>
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
