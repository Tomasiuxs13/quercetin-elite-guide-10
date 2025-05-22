
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import StarRating from '@/components/StarRating';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { useProducts } from '@/hooks/useProducts';
import { Skeleton } from '@/components/ui/skeleton';
import { trackProductClick } from '@/integrations/supabase/client';

const benefits = [
  {
    title: "Powerful Antioxidant",
    description: "Helps neutralize free radicals and reduce oxidative stress throughout the body."
  },
  {
    title: "Anti-inflammatory Properties",
    description: "May help reduce inflammation and alleviate symptoms of inflammatory conditions."
  },
  {
    title: "Immune System Support",
    description: "Can help strengthen the body's natural defenses against infections."
  },
  {
    title: "Allergy Relief",
    description: "May help reduce histamine release and alleviate allergy symptoms."
  }
];

const faqs = [
  {
    question: "What is Quercetin?",
    answer: "Quercetin is a plant flavonoid found in many fruits, vegetables, and grains. It's one of the most abundant antioxidants in the human diet and is known for its anti-inflammatory and immune-supporting properties."
  },
  {
    question: "How much Quercetin should I take daily?",
    answer: "Most studies have used quercetin doses ranging from 500 to 1,000 mg per day. However, the optimal dose depends on your health conditions and goals. It's always best to consult with a healthcare provider before starting any new supplement."
  },
  {
    question: "When is the best time to take Quercetin?",
    answer: "Quercetin is often best absorbed when taken with food that contains fats. Many people take it with meals, split into two doses throughout the day. However, timing may vary based on your specific health goals and routine."
  },
  {
    question: "Are there any side effects of taking Quercetin supplements?",
    answer: "Quercetin is generally considered safe for most people when taken at recommended doses. Some individuals might experience mild side effects like headaches or digestive discomfort. If you're on medication or have health conditions, consult with a healthcare provider before supplementation."
  }
];

const Home = () => {
  const { products, isLoading } = useProducts();
  
  // Get ranked products instead of top rated
  const rankedProducts = React.useMemo(() => {
    return [...products]
      .sort((a, b) => {
        // Sort by rank first (if available)
        if (a.rank && b.rank) return a.rank - b.rank;
        if (a.rank) return -1; // If only a has rank, prioritize it
        if (b.rank) return 1;  // If only b has rank, prioritize it
        // Fall back to rating if no rank is available
        return b.rating - a.rating;
      })
      .slice(0, 5); // Get top 5 ranked products
  }, [products]);
  
  // Featured product is the top ranked one
  const featuredProduct = rankedProducts[0];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-50 to-blue-50 py-16 md:py-24">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-in">
              <span className="inline-block bg-brand-100 text-brand-800 text-sm font-medium px-3 py-1 rounded-full mb-6">
                Top Quercetin Supplements of {new Date().getFullYear()}
              </span>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Find Your <span className="text-brand-600">Perfect Quercetin</span> Supplement
              </h1>
              
              <p className="text-lg text-gray-700 mb-8 max-w-lg">
                Expert-reviewed, science-backed recommendations to help you choose the best Quercetin supplement for your health needs.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link to="/products/top-picks">
                    View Top Picks <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                
                <Button size="lg" variant="outline" asChild>
                  <Link to="/what-is-quercetin">
                    Learn About Quercetin
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -top-6 -right-6 w-64 h-64 bg-teal-100 rounded-full opacity-60 blur-2xl z-0"></div>
              <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-brand-100 rounded-full opacity-60 blur-2xl z-0"></div>
              
              {isLoading || !featuredProduct ? (
                <div className="relative z-10 bg-white rounded-2xl shadow-xl overflow-hidden p-6 md:p-8">
                  <div className="flex items-center mb-6">
                    <div className="mr-4 flex-shrink-0">
                      <Skeleton className="w-16 h-20" />
                    </div>
                    <div>
                      <div className="text-sm text-brand-600 font-medium">#1 TOP RATED</div>
                      <Skeleton className="h-6 w-48 mb-2" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                  
                  <Skeleton className="h-10 w-full" />
                </div>
              ) : (
                <div className="relative z-10 bg-white rounded-2xl shadow-xl overflow-hidden p-6 md:p-8">
                  <div className="flex items-center mb-6">
                    <div className="mr-4 flex-shrink-0">
                      <img 
                        src={featuredProduct.image || "https://placehold.co/300x400/f5f5f5/cccccc?text=Quercetin+Complex"} 
                        alt={featuredProduct.name} 
                        className="w-16 h-20 object-contain"
                      />
                    </div>
                    <div>
                      <div className="text-sm text-brand-600 font-medium">
                        {featuredProduct.rank ? `#${featuredProduct.rank} TOP RATED` : "TOP RATED"}
                      </div>
                      <h3 className="font-bold text-lg">{featuredProduct.name}</h3>
                      <div className="flex items-center">
                        <StarRating rating={featuredProduct.rating} size={14} className="mr-2" />
                        <span className="text-sm text-gray-600">{featuredProduct.rating}/5 ({featuredProduct.review_count || 0} reviews)</span>
                      </div>
                    </div>
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-teal-500 mr-2 mt-0.5" />
                      <span>Highest bioavailability in our tests</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-teal-500 mr-2 mt-0.5" />
                      <span>500mg pure quercetin per serving</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-teal-500 mr-2 mt-0.5" />
                      <span>Added bromelain for enhanced absorption</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-teal-500 mr-2 mt-0.5" />
                      <span>Free from common allergens</span>
                    </li>
                  </ul>
                  
                  <Button 
                    asChild 
                    className="w-full bg-teal-600 hover:bg-teal-700"
                    onClick={() => trackProductClick(featuredProduct.id, "hero_section")}
                  >
                    <a href={featuredProduct.link} target="_blank" rel="noopener noreferrer">
                      View Best Price
                    </a>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Top Products Section */}
      <section className="section bg-white py-16">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Top Quercetin Supplements</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our expert team has researched and tested dozens of Quercetin supplements to bring you the very best options on the market.
            </p>
          </div>
          
          <div className="space-y-6 mb-10">
            {isLoading ? (
              // Skeleton loading state
              [...Array(3)].map((_, i) => (
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
              rankedProducts.slice(0, 3).map((product, index) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  showRank={true} 
                />
              ))
            )}
          </div>
          
          <div className="text-center">
            <Button asChild variant="outline" size="lg">
              <Link to="/products">
                View All Supplements <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="section bg-gray-50 py-16">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Quercetin?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Quercetin is a powerful flavonoid with numerous health benefits backed by scientific research.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <Button asChild>
              <Link to="/benefits">
                Learn More About Benefits <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="section bg-white py-16">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get answers to the most common questions about Quercetin supplements.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            
            <div className="mt-10 text-center">
              <Button asChild variant="outline">
                <Link to="/faq">
                  View All FAQs <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-brand-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Find Your Perfect Supplement?</h2>
          <p className="text-lg text-brand-100 mb-8 max-w-2xl mx-auto">
            Discover the best Quercetin supplement for your specific needs with our in-depth reviews and comparison guides.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/products/top-picks">
              View Our Top Recommendations
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
