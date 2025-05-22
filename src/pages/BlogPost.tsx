
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronLeft, Calendar, User, Clock, Share2, ExternalLink, Check, ChevronRight, StarIcon, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import StarRating from '@/components/StarRating';
import { useProducts } from '@/hooks/useProducts';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Placeholder blog post data - in a real app, this would come from a CMS or API
const blogPosts = [
  {
    id: "science-behind-quercetin",
    slug: "science-behind-quercetin",
    title: "The Science Behind Quercetin: How It Works in Your Body",
    excerpt: "Explore the mechanisms through which quercetin exerts its antioxidant and anti-inflammatory effects in the human body.",
    date: "May 15, 2025",
    author: "Dr. Sarah Johnson",
    authorTitle: "Ph.D in Nutritional Biochemistry",
    authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    category: "Research",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    readingTime: "8 min read",
    content: `
      <h2>Understanding Quercetin: A Powerful Flavonoid</h2>
      <p>Quercetin is one of the most abundant dietary flavonoids found in many fruits, vegetables, and plants. As a bioactive compound, it has gained significant attention in scientific research for its potential health benefits.</p>
      
      <p>Studies have shown that quercetin possesses numerous biological properties, including antioxidant, anti-inflammatory, anti-allergic, and even anti-cancer effects. But how exactly does this powerful compound work in your body?</p>
      
      <h2>Antioxidant Mechanisms of Quercetin</h2>
      <p>One of quercetin's most well-established properties is its antioxidant activity. As an antioxidant, quercetin helps neutralize harmful free radicals that can damage cells and contribute to various chronic diseases and aging.</p>
      
      <p>Quercetin exerts its antioxidant effects through several mechanisms:</p>
      
      <ul>
        <li><strong>Direct scavenging of free radicals</strong>: Quercetin can directly neutralize various types of free radicals due to its chemical structure.</li>
        <li><strong>Metal chelation</strong>: It can bind to metal ions like iron and copper, preventing them from participating in reactions that generate free radicals.</li>
        <li><strong>Enzyme inhibition</strong>: Quercetin can inhibit enzymes involved in free radical production.</li>
        <li><strong>Upregulation of antioxidant defenses</strong>: It enhances the body's own antioxidant enzymes through activation of the Nrf2 pathway.</li>
      </ul>
      
      <h2>Anti-inflammatory Effects</h2>
      <p>Chronic inflammation underlies many diseases, and quercetin shows significant anti-inflammatory properties. It achieves this by:</p>
      
      <ul>
        <li>Inhibiting pro-inflammatory enzymes like cyclooxygenase (COX) and lipoxygenase</li>
        <li>Reducing the production of inflammatory cytokines</li>
        <li>Modulating the NF-κB pathway, a key regulator of inflammatory responses</li>
        <li>Stabilizing mast cells, which reduces histamine release</li>
      </ul>
      
      <h2>Immune System Modulation</h2>
      <p>Quercetin has been found to modulate immune function in various ways. It can help regulate the immune response by affecting:</p>
      
      <ul>
        <li>T-lymphocyte proliferation and activation</li>
        <li>Macrophage phagocytic activity</li>
        <li>Natural killer cell activity</li>
        <li>Antibody production</li>
      </ul>
      
      <p>These effects may contribute to quercetin's potential benefits for conditions like allergies, asthma, and viral infections.</p>
      
      <h2>Bioavailability Challenges</h2>
      <p>Despite its many potential benefits, quercetin faces bioavailability challenges in the body. When consumed orally, quercetin undergoes extensive metabolism in the intestine and liver, resulting in low blood concentrations.</p>
      
      <p>This is why many supplements combine quercetin with other compounds like vitamin C or enzymes like bromelain, which may enhance its absorption and efficacy.</p>
      
      <h2>Conclusion</h2>
      <p>Quercetin works through multiple mechanisms in the body, primarily through its antioxidant and anti-inflammatory properties. While more research is needed to fully understand its effects and optimal dosage, the current evidence suggests that quercetin supplementation may offer various health benefits.</p>
      
      <p>When considering quercetin supplements, look for formulations that address bioavailability issues and provide an effective dosage based on current research findings.</p>
    `,
    relatedPosts: [
      "quercetin-seasonal-allergies",
      "quercetin-vitamin-c-synergy",
      "quercetin-for-athletes"
    ]
  },
  {
    id: "quercetin-seasonal-allergies",
    slug: "quercetin-seasonal-allergies",
    title: "Quercetin and Seasonal Allergies: What the Research Shows",
    excerpt: "Learn how quercetin supplements may help reduce allergy symptoms and which formulations work best for different allergy types.",
    date: "May 3, 2025",
    author: "Emma Richards",
    authorTitle: "Registered Dietitian",
    authorAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    category: "Health Benefits",
    image: "https://images.unsplash.com/photo-1607326957431-29d25d2b386f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    readingTime: "7 min read",
    content: `
      <h2>Seasonal Allergies: A Common Challenge</h2>
      <p>Seasonal allergies affect millions of people worldwide, causing symptoms like sneezing, runny nose, itchy eyes, and congestion. These allergic reactions occur when the immune system overreacts to environmental allergens like pollen, grass, or mold.</p>
      
      <p>While conventional treatments like antihistamines and decongestants provide relief, many people seek natural alternatives with fewer side effects. Quercetin has emerged as a promising natural option for allergy management.</p>
      
      <h2>How Quercetin May Help with Allergies</h2>
      <p>Research suggests that quercetin can help alleviate allergy symptoms through several mechanisms:</p>
      
      <h3>Mast Cell Stabilization</h3>
      <p>Quercetin acts as a natural mast cell stabilizer. Mast cells release histamine and other inflammatory compounds during an allergic response, triggering symptoms. By stabilizing these cells, quercetin may reduce the release of histamine and alleviate allergy symptoms.</p>
      
      <h3>Anti-inflammatory Effects</h3>
      <p>Allergic reactions involve inflammation in affected tissues. Quercetin's potent anti-inflammatory properties may help reduce this inflammation, easing symptoms like nasal congestion and irritated eyes.</p>
      
      <h3>Antioxidant Activity</h3>
      <p>Oxidative stress can worsen allergic responses. As a powerful antioxidant, quercetin helps neutralize free radicals and may reduce the severity of allergic reactions.</p>
      
      <h2>Clinical Evidence for Quercetin and Allergies</h2>
      <p>Several studies have investigated quercetin's effects on allergy symptoms:</p>
      
      <ul>
        <li>A study published in the Journal of Allergy and Clinical Immunology found that quercetin inhibited the release of histamine and pro-inflammatory cytokines from mast cells.</li>
        <li>Research in the International Archives of Allergy and Immunology demonstrated that quercetin could suppress allergic inflammation in airways.</li>
        <li>A clinical trial showed that participants taking quercetin experienced reduced nasal symptoms compared to those taking a placebo.</li>
      </ul>
      
      <h2>Optimal Quercetin Formulations for Allergies</h2>
      <p>When selecting a quercetin supplement for allergy relief, consider these factors:</p>
      
      <h3>Enhanced Bioavailability</h3>
      <p>Standard quercetin has limited absorption in the digestive tract. Look for formulations with enhanced bioavailability, such as:</p>
      
      <ul>
        <li><strong>Quercetin phytosome</strong>: Combines quercetin with phospholipids for better absorption</li>
        <li><strong>Enzymatically modified isoquercitrin (EMIQ)</strong>: A more bioavailable form of quercetin</li>
        <li><strong>Quercetin with bromelain</strong>: Bromelain enhances quercetin absorption and has additional anti-inflammatory benefits</li>
      </ul>
      
      <h3>Synergistic Combinations</h3>
      <p>Quercetin often works better when combined with other natural compounds:</p>
      
      <ul>
        <li><strong>Quercetin + Vitamin C</strong>: Enhances the antihistamine and antioxidant effects</li>
        <li><strong>Quercetin + Bromelain + Vitamin C</strong>: A popular triple combination for allergy relief</li>
        <li><strong>Quercetin + Nettle extract</strong>: Nettle provides additional antihistamine properties</li>
      </ul>
      
      <h2>Dosage and Timing for Allergy Relief</h2>
      <p>For seasonal allergies, research suggests:</p>
      
      <ul>
        <li><strong>Preventive approach</strong>: Start taking quercetin 4-6 weeks before allergy season begins</li>
        <li><strong>Typical dosage</strong>: 500-1000 mg daily, divided into 2-3 doses</li>
        <li><strong>Timing</strong>: Take with meals to improve absorption</li>
        <li><strong>Duration</strong>: Continue throughout allergy season</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Quercetin shows promise as a natural approach to managing seasonal allergies, particularly when used in bioavailable forms and combined with complementary nutrients. While more research is needed, current evidence suggests quercetin may offer relief for many allergy sufferers with fewer side effects than conventional medications.</p>
      
      <p>As with any supplement, consult with a healthcare provider before starting quercetin, especially if you're pregnant, nursing, or taking medications.</p>
    `,
    relatedPosts: [
      "science-behind-quercetin",
      "quercetin-foods-vs-supplements",
      "quercetin-supplement-quality"
    ]
  }
];

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
  const { products } = useProducts();
  
  // Get top product for promotion
  const topProduct = products.length > 0 ? 
    products.sort((a, b) => (a.rank || 999) - (b.rank || 999))[0] : null;

  useEffect(() => {
    // Simulate API fetch with delay
    const timer = setTimeout(() => {
      const foundPost = blogPosts.find(p => p.slug === slug);
      setPost(foundPost || null);
      
      if (foundPost && foundPost.relatedPosts) {
        const related = foundPost.relatedPosts
          .map(relatedSlug => blogPosts.find(p => p.slug === relatedSlug))
          .filter(p => p !== undefined);
        setRelatedPosts(related as any[]);
      }
      
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [slug]);

  // Scroll to top when post changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [post]);

  if (isLoading) {
    return (
      <div className="container mx-auto py-12 px-4 max-w-4xl">
        <Skeleton className="h-10 w-3/4 mb-4" />
        <div className="flex items-center gap-3 mb-10">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-5 w-24" />
        </div>
        <Skeleton className="h-64 w-full mb-10" />
        <div className="space-y-4">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-3/4" />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="bg-red-50 border border-red-200 text-red-700 p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Blog Post Not Found</h2>
          <p className="mb-6">We couldn't find the blog post you're looking for.</p>
          <Button asChild>
            <Link to="/blog">Return to Blog</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="mb-8">
          <Link to="/blog" className="text-brand-600 hover:text-brand-800 flex items-center">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Blog
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            <article className="bg-white rounded-xl shadow-sm overflow-hidden">
              {/* Feature Image */}
              <div className="relative h-72 sm:h-96 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <Badge className="mb-3 bg-brand-500">{post.category}</Badge>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">{post.title}</h1>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-200">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {post.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {post.readingTime}
                    </div>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {post.author}
                    </div>
                  </div>
                </div>
              </div>

              {/* Table of Contents */}
              <div className="border-b border-gray-100">
                <div className="px-6 py-4">
                  <h2 className="text-sm font-semibold text-gray-700 flex items-center">
                    <BookOpen className="h-4 w-4 mr-1" />
                    Table of Contents
                  </h2>
                  <ul className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    <li className="hover:text-brand-600 cursor-pointer">Understanding Quercetin</li>
                    <li className="hover:text-brand-600 cursor-pointer">Antioxidant Mechanisms</li>
                    <li className="hover:text-brand-600 cursor-pointer">Anti-inflammatory Effects</li>
                    <li className="hover:text-brand-600 cursor-pointer">Immune System Modulation</li>
                    <li className="hover:text-brand-600 cursor-pointer">Bioavailability Challenges</li>
                    <li className="hover:text-brand-600 cursor-pointer">Conclusion</li>
                  </ul>
                </div>
              </div>

              {/* Author Info */}
              <div className="p-6 flex items-center gap-4 border-b border-gray-100">
                <Avatar className="h-14 w-14 border-2 border-gray-100">
                  <AvatarImage src={post.authorAvatar} alt={post.author} />
                  <AvatarFallback>{post.author.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{post.author}</div>
                  <div className="text-sm text-gray-500">{post.authorTitle}</div>
                </div>
                <div className="ml-auto flex gap-2">
                  <Button size="sm" variant="outline" className="rounded-full">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Top Product Promo - Above content */}
              {topProduct && (
                <div className="mx-6 my-6 p-4 bg-blue-50 border border-blue-100 rounded-lg flex flex-col sm:flex-row items-center gap-4">
                  <div className="sm:w-1/4">
                    <img 
                      src={topProduct.image} 
                      alt={topProduct.name} 
                      className="w-full max-h-28 object-contain"
                    />
                  </div>
                  <div className="sm:w-3/4 text-center sm:text-left">
                    <Badge className="mb-2 bg-brand-500">Top Rated Product</Badge>
                    <h3 className="font-bold text-lg mb-1">{topProduct.name}</h3>
                    <div className="flex items-center justify-center sm:justify-start mb-2">
                      <StarRating rating={topProduct.rating} size={16} className="mr-2" />
                      <span className="text-sm text-gray-600">({topProduct.review_count || 0} reviews)</span>
                    </div>
                    <Button size="sm" className="bg-teal-600 hover:bg-teal-700" asChild>
                      <Link to={`/products/${topProduct.id}`}>
                        View Details <ChevronRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="p-6 prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-brand-600 prose-a:no-underline hover:prose-a:underline"
                dangerouslySetInnerHTML={{ __html: post.content }}>
              </div>

              {/* Bottom Product Promotion */}
              {topProduct && (
                <div className="p-6 bg-brand-50 border-t border-brand-100">
                  <h3 className="text-xl font-bold mb-4">Our Top Recommendation</h3>
                  <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="md:w-1/4 bg-white p-4 rounded-lg shadow-sm">
                      <img 
                        src={topProduct.image} 
                        alt={topProduct.name} 
                        className="w-full max-h-40 object-contain"
                      />
                    </div>
                    <div className="md:w-3/4">
                      <h4 className="text-lg font-bold mb-2">{topProduct.name}</h4>
                      <div className="flex items-center mb-2">
                        <StarRating rating={topProduct.rating} size={18} className="mr-2" />
                        <span>{topProduct.rating.toFixed(1)} out of 5</span>
                      </div>
                      
                      <p className="text-gray-700 mb-4">{topProduct.description}</p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                        {topProduct.pros && topProduct.pros.slice(0, 4).map((pro: string, idx: number) => (
                          <div key={idx} className="flex items-start">
                            <Check className="h-4 w-4 text-green-500 mr-2 mt-1" />
                            <span className="text-sm">{pro}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex gap-3 flex-wrap">
                        <Button asChild className="bg-teal-600 hover:bg-teal-700">
                          <a href={topProduct.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                            View Best Price <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                        
                        <Button asChild variant="outline">
                          <Link to={`/products/${topProduct.id}`}>
                            Read Full Review <ChevronRight className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Article Footer */}
              <div className="p-6 bg-gray-50 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Last updated: {post.date}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="rounded-full">
                    Share
                  </Button>
                </div>
              </div>
            </article>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {relatedPosts.map((related: any) => (
                    <Card key={related.id} className="overflow-hidden">
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={related.image} 
                          alt={related.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-5">
                        <Badge className="mb-2">{related.category}</Badge>
                        <h3 className="font-bold text-lg mb-2 line-clamp-2">{related.title}</h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{related.excerpt}</p>
                        <Button asChild variant="link" className="p-0">
                          <Link to={`/blog/${related.slug}`} className="flex items-center">
                            Read More <ChevronRight className="h-4 w-4 ml-1" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            {/* Top Products Sidebar */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h3 className="font-bold text-xl mb-4">Our Top Picks</h3>
              <div className="space-y-4">
                {products.slice(0, 3).map(product => (
                  <div key={product.id} className="flex gap-3 pb-4 border-b last:border-0 last:pb-0">
                    <div className="w-20 h-20 bg-gray-50 flex-shrink-0 rounded-md p-2">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-contain" 
                      />
                    </div>
                    <div className="flex-1">
                      <Link to={`/products/${product.id}`} className="font-medium hover:text-brand-600 line-clamp-2">
                        {product.name}
                      </Link>
                      <div className="flex items-center mt-1">
                        <StarRating rating={product.rating} size={12} className="mr-1" />
                        <span className="text-xs text-gray-600">({product.rating.toFixed(1)})</span>
                      </div>
                      <div className="mt-1 text-sm font-semibold">${product.price.toFixed(2)}</div>
                    </div>
                  </div>
                ))}
              </div>
              <Button asChild className="w-full mt-4">
                <Link to="/products/top-picks">
                  See All Top Products <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h3 className="font-bold text-xl mb-4">Categories</h3>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-brand-100 text-brand-800 hover:bg-brand-200">Research</Badge>
                <Badge className="bg-brand-100 text-brand-800 hover:bg-brand-200">Health Benefits</Badge>
                <Badge className="bg-brand-100 text-brand-800 hover:bg-brand-200">Supplement Guide</Badge>
                <Badge className="bg-brand-100 text-brand-800 hover:bg-brand-200">Nutrition</Badge>
                <Badge className="bg-brand-100 text-brand-800 hover:bg-brand-200">Performance</Badge>
                <Badge className="bg-brand-100 text-brand-800 hover:bg-brand-200">Product Guide</Badge>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-brand-50 rounded-xl p-6 border border-brand-100">
              <h3 className="font-bold text-xl mb-2">Subscribe to Our Newsletter</h3>
              <p className="text-sm text-gray-600 mb-4">Get the latest research, supplement reviews and health tips delivered to your inbox.</p>
              <div className="space-y-3">
                <input 
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-2 border rounded-md"
                />
                <Button className="w-full">Subscribe</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
