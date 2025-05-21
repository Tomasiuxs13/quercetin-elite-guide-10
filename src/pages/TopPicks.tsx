
import React from 'react';
import { useProducts } from '@/hooks/useProducts';
import ProductCard from '@/components/ProductCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const TopPicks = () => {
  const { topProducts, isLoading } = useProducts();
  
  // Get only the top 5 products
  const topFiveProducts = topProducts.slice(0, 5);

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4 text-center">Our Top Picks</h1>
          <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-6">
            Based on comprehensive research and testing, these are our highest-rated quercetin supplements.
          </p>
          <p className="text-gray-600 text-center max-w-2xl mx-auto">
            Our experts have analyzed dozens of quercetin supplements for quality, bioavailability, purity, 
            and value to bring you these top recommendations.
          </p>
        </div>
        
        {/* Criteria Section */}
        <div className="max-w-3xl mx-auto mb-12 bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-center">Our Ranking Criteria</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-lg mb-2">What We Look For:</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Bioavailability and absorption</li>
                <li>Purity and potency</li>
                <li>Additional beneficial ingredients</li>
                <li>Manufacturing standards</li>
                <li>Third-party testing</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-lg mb-2">What We Avoid:</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Unnecessary fillers and additives</li>
                <li>Artificial colors or preservatives</li>
                <li>Low potency formulations</li>
                <li>Products with poor absorption</li>
                <li>Misleading marketing claims</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Products Listing */}
        <div className="space-y-6 mb-10">
          {isLoading ? (
            // Skeleton loading state
            [...Array(5)].map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="md:w-28 flex-shrink-0">
                    <Skeleton className="w-full h-32" />
                  </div>
                  <div className="flex-grow">
                    <Skeleton className="h-6 w-48 mb-3" />
                    <Skeleton className="h-4 w-32 mb-3" />
                    <Skeleton className="h-4 w-40 mb-3" />
                    <Skeleton className="h-6 w-24 mb-3" />
                    <div className="flex gap-3">
                      <Skeleton className="h-10 w-32" />
                      <Skeleton className="h-10 w-32" />
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            topFiveProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} showRank={true} />
            ))
          )}
        </div>

        {/* CTA Section */}
        <div className="bg-brand-50 p-8 rounded-xl max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Looking for more options?</h2>
          <p className="mb-6">
            View our complete selection of quercetin supplements to find the perfect match for your specific needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link to="/products">
                View All Supplements
              </Link>
            </Button>
            
            <Button variant="outline" asChild>
              <Link to="/benefits">
                Learn About Benefits
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopPicks;
