
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useBlogPosts } from '@/hooks/useBlogPosts';

const Blog = () => {
  const { useFetchPosts, useFetchTags } = useBlogPosts();
  const { data: posts = [], isLoading: isLoadingPosts } = useFetchPosts({ publishedOnly: true });
  const { data: tags = [], isLoading: isLoadingTags } = useFetchTags();
  const [activeCategory, setActiveCategory] = useState('All Posts');

  // Get unique categories for the filter
  const categories = ['All Posts', ...new Set(posts.map(post => post.category).filter(Boolean))];

  // Filter posts by selected category
  const filteredPosts = activeCategory === 'All Posts'
    ? posts
    : posts.filter(post => post.category === activeCategory);

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4 text-center">Quercetin Research & Insights</h1>
          <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto">
            Expert-backed articles on quercetin benefits, research, and supplement guides
          </p>
        </div>

        {/* Category Filters */}
        {isLoadingTags ? (
          <div className="mb-8 flex flex-wrap gap-2 justify-center">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-9 w-24 rounded-full" />
            ))}
          </div>
        ) : (
          <div className="mb-8 flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        )}

        {/* Blog Grid */}
        {isLoadingPosts ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm border">
                <Skeleton className="h-48 w-full" />
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-5 w-5" />
                    <Skeleton className="h-5 w-24" />
                  </div>
                  <Skeleton className="h-7 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-3/4 mb-4" />
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {filteredPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg overflow-hidden shadow-sm border hover:shadow-md transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={post.image || "https://placehold.co/800x450/f5f5f5/cccccc?text=No+Image"} 
                    alt={post.title} 
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <span>{new Date(post.published_at || post.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</span>
                    <Separator orientation="vertical" className="mx-2 h-4" />
                    <span>{post.category}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      By {post.author?.full_name || "Admin"}
                    </span>
                    <Button variant="link" asChild className="p-0 h-auto flex items-center">
                      <Link to={`/blog/${post.slug}`}>
                        Read More
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 max-w-md mx-auto">
            <p className="text-lg text-gray-600 mb-4">
              No blog posts found for this category.
            </p>
            {activeCategory !== 'All Posts' && (
              <Button onClick={() => setActiveCategory('All Posts')}>
                View All Posts
              </Button>
            )}
          </div>
        )}

        {/* Newsletter Signup */}
        <div className="bg-brand-50 p-8 rounded-xl max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Stay Updated on Quercetin Research</h2>
          <p className="mb-6">
            Subscribe to our newsletter for the latest research findings, supplement reviews, and health insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
            />
            <Button>Subscribe</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
