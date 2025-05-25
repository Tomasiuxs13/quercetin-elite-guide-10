
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight, ArrowRight, Info, ExternalLink } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const WhatIsSpermidine = () => {
  // Get top products to recommend at the bottom
  const { topProducts } = useProducts();

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-50 to-blue-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center p-2 bg-white rounded-full shadow-sm mb-4">
              <Info className="h-6 w-6 text-brand-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">What is Spermidine?</h1>
            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
              A comprehensive guide to understanding this powerful natural polyamine and its benefits for longevity and cellular health
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Badge className="bg-green-500 hover:bg-green-600 py-1 px-3 text-sm">Autophagy Enhancer</Badge>
              <Badge className="bg-blue-500 hover:bg-blue-600 py-1 px-3 text-sm">Longevity Support</Badge>
              <Badge className="bg-purple-500 hover:bg-purple-600 py-1 px-3 text-sm">Cellular Health</Badge>
              <Badge className="bg-amber-500 hover:bg-amber-600 py-1 px-3 text-sm">Anti-Aging</Badge>
            </div>
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="section bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="mb-10 overflow-hidden">
              <CardContent className="p-6 md:p-8">
                <div className="prose prose-lg max-w-none">
                  <h2 className="text-2xl font-semibold mb-4 text-brand-700">Introduction to Spermidine</h2>
                  <p>
                    Spermidine is a naturally occurring polyamine found in all living cells. It plays essential roles in 
                    cellular growth, development, and maintenance throughout our lives. This remarkable compound has gained 
                    significant attention in recent years due to its potential role in promoting longevity and supporting 
                    healthy aging processes.
                  </p>
                  
                  <div className="my-8 bg-blue-50 border-l-4 border-brand-500 p-4 rounded-r">
                    <p className="font-medium text-gray-800 mb-0">
                      Spermidine was first discovered in 1678 by Dutch scientist Antonie van Leeuwenhoek in human seminal 
                      fluid, which is how it got its name. However, it is now known to be present in all living organisms.
                    </p>
                  </div>
                  
                  <h2 className="text-2xl font-semibold mb-4 text-brand-700">Where Spermidine is Found in Nature</h2>
                  <p>
                    Spermidine is widely distributed in nature and can be found in various foods, with concentrations 
                    varying significantly between different sources:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                    <div className="bg-gray-50 p-5 rounded-lg border border-gray-100">
                      <h4 className="font-medium mb-3 text-gray-900">Foods Rich in Spermidine</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start">
                          <span className="text-brand-600 mr-2 font-medium">•</span>
                          <span><strong>Wheat germ:</strong> The richest dietary source (up to 15mg per 100g)</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-brand-600 mr-2 font-medium">•</span>
                          <span><strong>Aged cheese:</strong> Particularly aged cheddar and gouda</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-brand-600 mr-2 font-medium">•</span>
                          <span><strong>Legumes:</strong> Soybeans, chickpeas, and lentils</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-brand-600 mr-2 font-medium">•</span>
                          <span><strong>Mushrooms:</strong> Various varieties contain moderate amounts</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-gray-50 p-5 rounded-lg border border-gray-100">
                      <h4 className="font-medium mb-3 text-gray-900">Why Supplementation?</h4>
                      <p className="text-gray-700">Spermidine levels naturally decline with age, and achieving therapeutic doses through diet alone can be challenging.</p>
                      <p className="text-gray-700 mt-3">Most longevity studies use doses of 5-15mg daily, which would require consuming large amounts of spermidine-rich foods.</p>
                    </div>
                  </div>
                  
                  <h2 className="text-2xl font-semibold mb-4 text-brand-700">Molecular Structure and Properties</h2>
                  <p>
                    Chemically, spermidine is a polyamine with the molecular formula C<sub>7</sub>H<sub>19</sub>N<sub>3</sub>. 
                    It contains three amino groups and plays crucial roles in stabilizing DNA structure, supporting protein 
                    synthesis, and maintaining cellular membrane integrity.
                  </p>
                  
                  <p>
                    What makes spermidine particularly interesting is its ability to cross the blood-brain barrier and its 
                    role in promoting autophagy - the cellular cleanup process that naturally declines with age.
                  </p>
                  
                  <h2 className="text-2xl font-semibold mb-4 text-brand-700">The Autophagy Connection</h2>
                  <p>
                    One of spermidine's most remarkable properties is its ability to promote autophagy - the cellular process 
                    by which cells clean up damaged proteins and organelles. This process is essential for maintaining cellular 
                    health and naturally declines as we age.
                  </p>
                  
                  <div className="bg-teal-50 p-5 rounded-lg border border-teal-100 my-6">
                    <h4 className="font-medium mb-3 text-teal-800">Why Autophagy Matters for Longevity</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-teal-600 mr-2 font-medium">✓</span>
                        <span>Removes damaged cellular components that accumulate with age</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-teal-600 mr-2 font-medium">✓</span>
                        <span>Supports cellular energy production and efficiency</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-teal-600 mr-2 font-medium">✓</span>
                        <span>May help prevent age-related diseases and dysfunction</span>
                      </li>
                    </ul>
                  </div>
                  
                  <h2 className="text-2xl font-semibold mb-4 text-brand-700">Health Benefits of Spermidine</h2>
                  
                  <h3 className="text-xl font-medium mb-3 text-brand-600">Longevity and Aging Support</h3>
                  <p>
                    Research in various organisms has shown that spermidine supplementation can extend lifespan and improve 
                    healthspan. These effects are primarily attributed to its autophagy-enhancing properties.
                  </p>
                  
                  <h3 className="text-xl font-medium mb-3 text-brand-600">Cardiovascular Health</h3>
                  <p>
                    Studies suggest that spermidine may support heart health by improving cardiac function and reducing 
                    age-related cardiovascular decline. It may help maintain healthy blood pressure and support overall 
                    cardiovascular wellness.
                  </p>
                  
                  <h3 className="text-xl font-medium mb-3 text-brand-600">Cognitive Function</h3>
                  <p>
                    Spermidine may help protect brain health and cognitive function as we age. Research suggests it can 
                    support memory, learning, and overall brain performance by promoting cellular health in neural tissues.
                  </p>
                  
                  <h3 className="text-xl font-medium mb-3 text-brand-600">Metabolic Health</h3>
                  <p>
                    Research indicates that spermidine may support healthy metabolism, including glucose tolerance and 
                    energy production, which are important factors in healthy aging.
                  </p>
                  
                  <h3 className="text-xl font-medium mb-3 text-brand-600">Hair and Skin Health</h3>
                  <p>
                    Some studies suggest that spermidine may support hair growth and skin health by promoting cellular 
                    renewal and maintaining the health of hair follicles and skin cells.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <div className="bg-gradient-to-br from-brand-50 to-teal-50 p-8 rounded-xl border border-brand-100 shadow-sm">
              <h3 className="text-2xl font-bold mb-4 text-center text-gray-800">Why Consider Spermidine Supplements?</h3>
              <p className="text-gray-700 mb-5">
                While spermidine is present in many foods, achieving the doses used in longevity research through diet alone 
                is challenging. Supplements can provide concentrated, standardized amounts that would be difficult to obtain 
                from food sources. Most research showing significant health and longevity benefits has used doses ranging 
                from 5-15 mg daily.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                <Button asChild size="lg" className="bg-brand-600 hover:bg-brand-700">
                  <Link to="/products/top-picks" className="flex items-center">
                    View Top Picks <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                
                <Button variant="outline" asChild size="lg">
                  <Link to="/benefits" className="flex items-center">
                    Learn More About Benefits <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            
            {topProducts.length > 0 && (
              <div className="mt-16">
                <h2 className="text-2xl font-bold mb-6 text-center">Top-Rated Spermidine Supplements</h2>
                <div className="flex justify-center">
                  <Button asChild size="lg" className="bg-teal-600 hover:bg-teal-700 flex items-center gap-2">
                    <Link to="/products/top-picks">
                      Compare Top Products <ExternalLink className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhatIsSpermidine;
