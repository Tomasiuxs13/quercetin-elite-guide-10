
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight, ArrowRight, Info, ExternalLink } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const WhatIsQuercetin = () => {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">What is Quercetin?</h1>
            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
              A comprehensive guide to understanding this powerful plant flavonoid and its benefits for your health
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Badge className="bg-green-500 hover:bg-green-600 py-1 px-3 text-sm">Antioxidant</Badge>
              <Badge className="bg-blue-500 hover:bg-blue-600 py-1 px-3 text-sm">Anti-inflammatory</Badge>
              <Badge className="bg-purple-500 hover:bg-purple-600 py-1 px-3 text-sm">Immune Support</Badge>
              <Badge className="bg-amber-500 hover:bg-amber-600 py-1 px-3 text-sm">Allergy Relief</Badge>
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
                  <h2 className="text-2xl font-semibold mb-4 text-brand-700">Introduction to Quercetin</h2>
                  <p>
                    Quercetin is a flavonoid, a type of plant compound with potent antioxidant and anti-inflammatory properties. 
                    It's one of the most abundant antioxidants in the human diet and can be found in many fruits, 
                    vegetables, and other plant-based foods.
                  </p>
                  
                  <div className="my-8 bg-blue-50 border-l-4 border-brand-500 p-4 rounded-r">
                    <p className="font-medium text-gray-800 mb-0">
                      The name "quercetin" is derived from the Latin word "quercetum," which means "oak forest," 
                      as it was originally isolated from oak bark.
                    </p>
                  </div>
                  
                  <h2 className="text-2xl font-semibold mb-4 text-brand-700">Where Quercetin is Found in Nature</h2>
                  <p>
                    Quercetin is widely distributed in the plant kingdom and is found in various foods, including:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                    <div className="bg-gray-50 p-5 rounded-lg border border-gray-100">
                      <h4 className="font-medium mb-3 text-gray-900">Foods Rich in Quercetin</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start">
                          <span className="text-brand-600 mr-2 font-medium">•</span>
                          <span><strong>Fruits:</strong> Apples (especially the skin), berries, citrus fruits, grapes</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-brand-600 mr-2 font-medium">•</span>
                          <span><strong>Vegetables:</strong> Onions, kale, broccoli, tomatoes</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-brand-600 mr-2 font-medium">•</span>
                          <span><strong>Herbs:</strong> Ginkgo biloba, St. John's wort, elder flowers</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-brand-600 mr-2 font-medium">•</span>
                          <span><strong>Beverages:</strong> Green tea, red wine</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-gray-50 p-5 rounded-lg border border-gray-100">
                      <h4 className="font-medium mb-3 text-gray-900">Richest Sources</h4>
                      <p className="text-gray-700">Among these sources, onions (particularly red onions) and apples are considered to be among the richest dietary sources of quercetin.</p>
                      <p className="text-gray-700 mt-3">However, the concentration in foods is relatively low compared to supplement doses used in clinical studies.</p>
                    </div>
                  </div>
                  
                  <h2 className="text-2xl font-semibold mb-4 text-brand-700">Molecular Structure and Properties</h2>
                  <p>
                    Chemically, quercetin belongs to a class of polyphenolic compounds known as flavonols. Its molecular formula 
                    is C<sub>15</sub>H<sub>10</sub>O<sub>7</sub>, and it has a distinctive structure with five hydroxyl groups.
                  </p>
                  
                  <p>
                    This unique chemical structure is what gives quercetin its strong antioxidant properties, allowing it to efficiently 
                    neutralize free radicals and protect cells from oxidative damage.
                  </p>
                  
                  <h2 className="text-2xl font-semibold mb-4 text-brand-700">Bioavailability and Absorption</h2>
                  <p>
                    One challenge with quercetin is its bioavailability—how efficiently it's absorbed and utilized by the body. 
                    In its natural form, quercetin is often bound to sugars (as glycosides), which affects how it's absorbed in the digestive tract.
                  </p>
                  
                  <div className="bg-teal-50 p-5 rounded-lg border border-teal-100 my-6">
                    <h4 className="font-medium mb-3 text-teal-800">Improving Quercetin Absorption</h4>
                    <p className="text-gray-700 mb-3">Supplements often address this issue by:</p>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-teal-600 mr-2 font-medium">✓</span>
                        <span>Combining quercetin with bromelain (an enzyme from pineapple) to enhance absorption</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-teal-600 mr-2 font-medium">✓</span>
                        <span>Using quercetin phytosome complexes that bind to phospholipids for better absorption</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-teal-600 mr-2 font-medium">✓</span>
                        <span>Adding vitamin C, which may help improve quercetin absorption and efficacy</span>
                      </li>
                    </ul>
                  </div>
                  
                  <h2 className="text-2xl font-semibold mb-4 text-brand-700">Health Benefits of Quercetin</h2>
                  
                  <h3 className="text-xl font-medium mb-3 text-brand-600">Antioxidant Activity</h3>
                  <p>
                    Quercetin is a powerful antioxidant that helps neutralize free radicals—unstable molecules that can damage cell 
                    components through oxidation. This antioxidant activity helps protect cells from damage and may slow aging processes.
                  </p>
                  
                  <h3 className="text-xl font-medium mb-3 text-brand-600">Anti-inflammatory Effects</h3>
                  <p>
                    Quercetin has been shown to inhibit various inflammatory pathways in the body. It can help reduce the production 
                    of inflammatory markers and may help alleviate symptoms of inflammatory conditions.
                  </p>
                  
                  <h3 className="text-xl font-medium mb-3 text-brand-600">Immune System Support</h3>
                  <p>
                    Research suggests quercetin may help regulate the immune response, potentially providing benefits for both 
                    autoimmune conditions and strengthening defenses against infections.
                  </p>
                  
                  <h3 className="text-xl font-medium mb-3 text-brand-600">Allergy Relief</h3>
                  <p>
                    Quercetin acts as a natural antihistamine by stabilizing mast cells that release histamine during allergic reactions. 
                    This may help reduce symptoms like sneezing, itching, and watery eyes associated with seasonal allergies.
                  </p>
                  
                  <h3 className="text-xl font-medium mb-3 text-brand-600">Cardiovascular Health</h3>
                  <p>
                    Studies indicate that quercetin may support heart health by helping to reduce inflammation, lower blood pressure, 
                    prevent LDL cholesterol oxidation, and improve endothelial function.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <div className="bg-gradient-to-br from-brand-50 to-teal-50 p-8 rounded-xl border border-brand-100 shadow-sm">
              <h3 className="text-2xl font-bold mb-4 text-center text-gray-800">Why Consider Quercetin Supplements?</h3>
              <p className="text-gray-700 mb-5">
                While quercetin is present in many foods, the concentration is relatively low. For therapeutic benefits, 
                supplements can provide higher doses that would be difficult to achieve through diet alone. Most studies 
                showing significant health benefits have used doses ranging from 500-1,000 mg daily, which would require 
                consuming very large quantities of quercetin-rich foods.
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
                <h2 className="text-2xl font-bold mb-6 text-center">Top-Rated Quercetin Supplements</h2>
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

export default WhatIsQuercetin;
