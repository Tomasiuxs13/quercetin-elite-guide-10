
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight, ArrowRight } from 'lucide-react';

const WhatIsQuercetin = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-50 to-blue-50 py-16">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">What is Quercetin?</h1>
            <p className="text-xl text-gray-700 mb-8">
              A comprehensive guide to understanding this powerful plant flavonoid and its benefits for your health
            </p>
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="section bg-white">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <h2>Introduction to Quercetin</h2>
              <p>
                Quercetin is a flavonoid, a type of plant compound with potent antioxidant and anti-inflammatory properties. 
                It's one of the most abundant antioxidants in the human diet and can be found in many fruits, 
                vegetables, and other plant-based foods.
              </p>
              
              <div className="my-8 bg-blue-50 border-l-4 border-brand-500 p-4">
                <p className="font-medium text-gray-800">
                  The name "quercetin" is derived from the Latin word "quercetum," which means "oak forest," 
                  as it was originally isolated from oak bark.
                </p>
              </div>
              
              <h2>Where Quercetin is Found in Nature</h2>
              <p>
                Quercetin is widely distributed in the plant kingdom and is found in various foods, including:
              </p>
              
              <ul>
                <li><strong>Fruits:</strong> Apples (especially the skin), berries, citrus fruits, grapes</li>
                <li><strong>Vegetables:</strong> Onions, kale, broccoli, tomatoes</li>
                <li><strong>Herbs:</strong> Ginkgo biloba, St. John's wort, elder flowers</li>
                <li><strong>Beverages:</strong> Green tea, red wine</li>
                <li><strong>Other Sources:</strong> Honey, propolis, capers</li>
              </ul>
              
              <p>
                Among these sources, onions (particularly red onions) and apples are considered to be among the richest 
                dietary sources of quercetin.
              </p>
              
              <h2>Molecular Structure and Properties</h2>
              <p>
                Chemically, quercetin belongs to a class of polyphenolic compounds known as flavonols. Its molecular formula 
                is C<sub>15</sub>H<sub>10</sub>O<sub>7</sub>, and it has a distinctive structure with five hydroxyl groups.
              </p>
              
              <p>
                This unique chemical structure is what gives quercetin its strong antioxidant properties, allowing it to efficiently 
                neutralize free radicals and protect cells from oxidative damage.
              </p>
              
              <h2>Bioavailability and Absorption</h2>
              <p>
                One challenge with quercetin is its bioavailability—how efficiently it's absorbed and utilized by the body. 
                In its natural form, quercetin is often bound to sugars (as glycosides), which affects how it's absorbed in the digestive tract.
              </p>
              
              <p>
                Supplements often address this issue by:
              </p>
              
              <ul>
                <li>Combining quercetin with bromelain (an enzyme from pineapple) to enhance absorption</li>
                <li>Using quercetin phytosome complexes that bind to phospholipids for better absorption</li>
                <li>Adding vitamin C, which may help improve quercetin absorption and efficacy</li>
              </ul>
              
              <h2>Health Benefits of Quercetin</h2>
              
              <h3>Antioxidant Activity</h3>
              <p>
                Quercetin is a powerful antioxidant that helps neutralize free radicals—unstable molecules that can damage cell 
                components through oxidation. This antioxidant activity helps protect cells from damage and may slow aging processes.
              </p>
              
              <h3>Anti-inflammatory Effects</h3>
              <p>
                Quercetin has been shown to inhibit various inflammatory pathways in the body. It can help reduce the production 
                of inflammatory markers and may help alleviate symptoms of inflammatory conditions.
              </p>
              
              <h3>Immune System Support</h3>
              <p>
                Research suggests quercetin may help regulate the immune response, potentially providing benefits for both 
                autoimmune conditions and strengthening defenses against infections.
              </p>
              
              <h3>Allergy Relief</h3>
              <p>
                Quercetin acts as a natural antihistamine by stabilizing mast cells that release histamine during allergic reactions. 
                This may help reduce symptoms like sneezing, itching, and watery eyes associated with seasonal allergies.
              </p>
              
              <h3>Cardiovascular Health</h3>
              <p>
                Studies indicate that quercetin may support heart health by helping to reduce inflammation, lower blood pressure, 
                prevent LDL cholesterol oxidation, and improve endothelial function.
              </p>
              
              <div className="my-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="mb-4">Why Consider Quercetin Supplements?</h3>
                <p>
                  While quercetin is present in many foods, the concentration is relatively low. For therapeutic benefits, 
                  supplements can provide higher doses that would be difficult to achieve through diet alone. Most studies 
                  showing significant health benefits have used doses ranging from 500-1,000 mg daily, which would require 
                  consuming very large quantities of quercetin-rich foods.
                </p>
              </div>
            </div>
            
            <div className="mt-12 space-y-6">
              <h2 className="text-2xl font-bold">Ready to try Quercetin supplements?</h2>
              <p className="text-gray-700">
                Check out our expert-reviewed top picks to find the best quercetin supplements on the market.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild>
                  <Link to="/products/top-picks">
                    View Top Picks <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                
                <Button variant="outline" asChild>
                  <Link to="/benefits">
                    Learn More About Benefits <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhatIsQuercetin;
