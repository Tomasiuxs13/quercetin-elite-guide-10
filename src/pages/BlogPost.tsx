
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Calendar, User, Clock, Share2, ExternalLink, Check, ChevronRight, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import StarRating from '@/components/StarRating';
import { useProducts } from '@/hooks/useProducts';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import { trackBlogView } from '@/integrations/supabase/client';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { useFetchPostBySlug } = useBlogPosts();
  const { products } = useProducts();
  const { data: post, isLoading, error } = useFetchPostBySlug(slug);
  
  // Get top product for promotion
  const topProduct = products.length > 0 ? 
    products.sort((a, b) => (a.rank || 999) - (b.rank || 999))[0] : null;

  // Track blog view
  useEffect(() => {
    if (post && post.id) {
      trackBlogView(post.id);
    }
  }, [post]);

  // Scroll to top when post changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [post]);

  // Get related posts - limit to 3
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
  
  useEffect(() => {
    if (post) {
      // Fetch related posts by category
      const fetchRelatedPosts = async () => {
        try {
          const { data, error } = await (window as any).supabase
            .from('blog_posts')
            .select(`
              id, title, slug, excerpt, image, category, published_at
            `)
            .eq('is_published', true)
            .eq('category', post.category)
            .neq('id', post.id)
            .limit(3);
            
          if (error) throw error;
          setRelatedPosts(data || []);
          
          // If we don't have enough related posts by category, get some recent ones
          if (data.length < 3) {
            const { data: moreData, error: moreError } = await (window as any).supabase
              .from('blog_posts')
              .select(`
                id, title, slug, excerpt, image, category, published_at
              `)
              .eq('is_published', true)
              .neq('id', post.id)
              .neq('category', post.category)
              .order('published_at', { ascending: false })
              .limit(3 - data.length);
              
            if (!moreError && moreData) {
              setRelatedPosts([...data, ...moreData]);
            }
          }
        } catch (err) {
          console.error('Error fetching related posts:', err);
        }
      };
      
      fetchRelatedPosts();
    }
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

  if (error || !post) {
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

  // Format date for display
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Get initials for avatar fallback
  const getInitials = (name: string | undefined | null) => {
    if (!name) return 'A';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

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
                  src={post.image || "https://placehold.co/1200x600/f5f5f5/cccccc?text=No+Image"} 
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
                      {formatDate(post.published_at || post.created_at)}
                    </div>
                    {post.reading_time && (
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {post.reading_time}
                      </div>
                    )}
                    {post.author && (
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {post.author.full_name || post.author.email}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Table of Contents - This is a placeholder, could be dynamically generated */}
              <div className="border-b border-gray-100">
                <div className="px-6 py-4">
                  <h2 className="text-sm font-semibold text-gray-700 flex items-center">
                    <BookOpen className="h-4 w-4 mr-1" />
                    Table of Contents
                  </h2>
                  <ul className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    <li className="hover:text-brand-600 cursor-pointer">Introduction</li>
                    <li className="hover:text-brand-600 cursor-pointer">Key Benefits</li>
                    <li className="hover:text-brand-600 cursor-pointer">Research Findings</li>
                    <li className="hover:text-brand-600 cursor-pointer">Usage Guidelines</li>
                    <li className="hover:text-brand-600 cursor-pointer">Recommendations</li>
                    <li className="hover:text-brand-600 cursor-pointer">Conclusion</li>
                  </ul>
                </div>
              </div>

              {/* Author Info */}
              <div className="p-6 flex items-center gap-4 border-b border-gray-100">
                <Avatar className="h-14 w-14 border-2 border-gray-100">
                  {post.author?.full_name && (
                    <AvatarImage src={`https://ui-avatars.com/api/?name=${post.author.full_name}&background=random`} alt={post.author.full_name} />
                  )}
                  <AvatarFallback>{getInitials(post.author?.full_name)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{post.author?.full_name || "Admin"}</div>
                  <div className="text-sm text-gray-500">Quercetin Research Team</div>
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
              <div 
                className="p-6 prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-brand-600 prose-a:no-underline hover:prose-a:underline"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

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
                  <p className="text-sm text-gray-500">
                    Last updated: {formatDate(post.updated_at)}
                  </p>
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
                  {relatedPosts.map((related) => (
                    <Card key={related.id} className="overflow-hidden">
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={related.image || "https://placehold.co/800x450/f5f5f5/cccccc?text=No+Image"}
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
                {['Research', 'Health Benefits', 'Supplement Guide', 'Nutrition', 'Performance', 'Product Guide'].map(cat => (
                  <Badge 
                    key={cat} 
                    className="bg-brand-100 text-brand-800 hover:bg-brand-200 cursor-pointer"
                    onClick={() => navigate('/blog?category=' + cat)}
                  >
                    {cat}
                  </Badge>
                ))}
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
