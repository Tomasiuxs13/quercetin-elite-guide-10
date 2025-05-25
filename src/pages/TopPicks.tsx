
import React, { useState } from 'react';
import { useProducts } from '@/hooks/useProducts';
import ProductCard from '@/components/ProductCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Award, Filter, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const TopPicks = () => {
  const { topProducts, isLoading } = useProducts();
  
  // Get only the top 5 products
  const topFiveProducts = topProducts.slice(0, 5);
  
  // State for criteria section visibility
  const [showCriteria, setShowCriteria] = useState(false);

  return (
    <div className="py-12 animate-fade-in">
      <div className="container mx-auto px-4">
        {/* Enhanced Hero Section */}
        <div className="mb-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-50/80 via-blue-50/50 to-teal-50/30 rounded-3xl"></div>
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-teal-100 rounded-full opacity-30 blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-brand-100 rounded-full opacity-30 blur-3xl"></div>
          
          <div className="relative px-6 py-12 md:py-16 rounded-3xl border border-gray-100 bg-white/80 backdrop-blur-sm shadow-sm">
            <Badge className="bg-brand-600 hover:bg-brand-700 mb-4 py-1 px-3">
              Expert-Reviewed
            </Badge>
            
            <h1 className="text-4xl font-bold mb-5 text-center md:text-left md:text-5xl">Our Top <span className="text-brand-600">Spermidine</span> Picks</h1>
            
            <p className="text-xl text-gray-600 md:max-w-2xl mb-8">
              Based on comprehensive research and testing, these are our highest-rated spermidine supplements for optimal longevity and cellular health benefits.
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <p className="text-gray-600 md:max-w-xl">
                Our experts have analyzed dozens of spermidine supplements for quality, purity, bioavailability, 
                and value to bring you these top recommendations.
              </p>
              
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => setShowCriteria(!showCriteria)} 
                className="whitespace-nowrap"
              >
                Our Ranking Criteria {showCriteria ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Criteria Section - Collapsible */}
        <div className={`max-w-3xl mx-auto mb-12 transition-all duration-300 overflow-hidden ${showCriteria ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <Card className="border border-gray-200">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-6 text-center">Our Ranking Criteria</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-lg mb-3 flex items-center text-brand-700">
                    <Award className="h-5 w-5 mr-2" /> What We Look For:
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    {[
                      "Spermidine purity and concentration",
                      "Natural source quality (wheat germ)",
                      "Third-party testing verification",
                      "Manufacturing standards (GMP)",
                      "Value for money"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="h-4 w-4 text-green-500 mr-1.5 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-lg mb-3 flex items-center text-red-700">
                    <Filter className="h-5 w-5 mr-2" /> What We Avoid:
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    {[
                      "Synthetic or low-quality sources",
                      "Unnecessary fillers and additives",
                      "Artificial colors or preservatives",
                      "Products without testing verification",
                      "Misleading longevity claims"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-red-500 mr-1.5 font-medium text-lg leading-none mt-0">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Products Listing with Enhanced Visual Design */}
        <div className="space-y-8 mb-12">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold">Top Rated Supplements</h2>
            
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-white">
                <Filter className="h-3.5 w-3.5 mr-1" /> Sorted by Rating
              </Badge>
            </div>
          </div>
          
          {isLoading ? (
            // Enhanced skeleton loading state
            [...Array(5)].map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 animate-pulse">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="md:w-36 flex-shrink-0">
                    <Skeleton className="w-full h-36 rounded-md" />
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
              <div key={product.id} className={`transition-all duration-300 ${index === 0 ? 'scale-[1.02]' : ''}`}>
                <ProductCard product={product} showRank={true} />
              </div>
            ))
          )}
        </div>

        {/* Trust Elements Section */}
        <div className="mb-16">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h2 className="text-2xl font-bold mb-4 text-center">Our Research Methodology</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 text-center">
                <div className="bg-brand-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="h-6 w-6 text-brand-600" />
                </div>
                <h3 className="font-semibold mb-2">Expert Analysis</h3>
                <p className="text-sm text-gray-600">Evaluated by longevity experts and researchers</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 text-center">
                <div className="bg-brand-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Filter className="h-6 w-6 text-brand-600" />
                </div>
                <h3 className="font-semibold mb-2">Rigorous Testing</h3>
                <p className="text-sm text-gray-600">Tested for purity, potency, and source quality</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 text-center">
                <div className="bg-brand-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Check className="h-6 w-6 text-brand-600" />
                </div>
                <h3 className="font-semibold mb-2">Verified Reviews</h3>
                <p className="text-sm text-gray-600">Includes feedback from verified customers</p>
              </div>
            </div>
            
            <p className="text-center text-gray-600 text-sm">
              Our rankings are updated quarterly to ensure you always have access to the latest and best products.
            </p>
          </div>
        </div>

        {/* CTA Section with Enhanced Design */}
        <div className="bg-gradient-to-br from-brand-600 to-brand-700 p-8 rounded-xl max-w-4xl mx-auto text-center shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-white">Looking for more options?</h2>
          <p className="mb-6 text-brand-100">
            View our complete selection of spermidine supplements to find the perfect match for your longevity goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="hover:bg-white transition-colors">
              <Link to="/products" className="font-medium">
                View All Supplements
              </Link>
            </Button>
            
            <Button variant="outline" asChild size="lg" className="border-brand-300 text-white hover:bg-brand-500 hover:text-white">
              <Link to="/benefits" className="font-medium">
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
