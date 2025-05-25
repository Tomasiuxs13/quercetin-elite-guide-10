
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

// Sample blog post data - Updated for Spermidine
const blogPosts = [
  {
    id: 1,
    title: 'The Science Behind Spermidine: How It Works in Your Body',
    excerpt: 'Explore the mechanisms through which spermidine promotes autophagy and supports cellular longevity in the human body.',
    date: 'May 15, 2025',
    author: 'Dr. Sarah Johnson',
    category: 'Research',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
    slug: 'science-behind-spermidine'
  },
  {
    id: 2,
    title: 'Spermidine and Autophagy: What the Research Shows',
    excerpt: 'Learn how spermidine supplements enhance cellular cleanup processes and which formulations work best for longevity support.',
    date: 'May 3, 2025',
    author: 'Emma Richards, RD',
    category: 'Health Benefits',
    image: 'https://images.unsplash.com/photo-1607326957431-29d25d2b386f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
    slug: 'spermidine-autophagy-research'
  },
  {
    id: 3,
    title: 'Combining Spermidine with Resveratrol: Synergistic Longevity Effects',
    excerpt: 'Discover why many longevity supplements pair spermidine with resveratrol and how this combination enhances cellular health benefits.',
    date: 'April 22, 2025',
    author: 'Dr. Michael Chen',
    category: 'Supplement Guide',
    image: 'https://images.unsplash.com/photo-1606939232603-acc00ee2e581?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    slug: 'spermidine-resveratrol-synergy'
  },
  {
    id: 4,
    title: 'Spermidine for Longevity: Benefits for Healthy Aging',
    excerpt: 'Explore how spermidine may help support healthy aging and cellular function for both active adults and longevity enthusiasts.',
    date: 'April 10, 2025',
    author: 'James Wilson, MS',
    category: 'Longevity',
    image: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
    slug: 'spermidine-for-longevity'
  },
  {
    id: 5,
    title: 'Spermidine-Rich Foods vs. Supplements: Which Is Better?',
    excerpt: 'Compare the bioavailability and practical benefits of dietary spermidine sources with supplement forms to determine the best approach for longevity.',
    date: 'March 28, 2025',
    author: 'Olivia Martinez, RDN',
    category: 'Nutrition',
    image: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
    slug: 'spermidine-foods-vs-supplements'
  },
  {
    id: 6,
    title: 'Spermidine Supplement Quality: How to Spot the Best Products',
    excerpt: 'Learn the key indicators of high-quality spermidine supplements and red flags to watch for when shopping for effective longevity products.',
    date: 'March 15, 2025',
    author: 'Robert Thompson',
    category: 'Product Guide',
    image: 'https://images.unsplash.com/photo-1626963781637-dc8e0140eb0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
    slug: 'spermidine-supplement-quality'
  }
];

// Categories for filtering - Updated for Spermidine
const categories = [
  'All Posts',
  'Research',
  'Health Benefits',
  'Supplement Guide',
  'Nutrition',
  'Longevity',
  'Product Guide'
];

const Blog = () => {
  const [activeCategory, setActiveCategory] = React.useState('All Posts');

  const filteredPosts = activeCategory === 'All Posts'
    ? blogPosts
    : blogPosts.filter(post => post.category === activeCategory);

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4 text-center">Spermidine Research & Insights</h1>
          <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto">
            Expert-backed articles on spermidine benefits, longevity research, and supplement guides
          </p>
        </div>

        {/* Category Filters */}
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

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg overflow-hidden shadow-sm border hover:shadow-md transition-shadow">
              <div className="h-48 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <span>{post.date}</span>
                  <Separator orientation="vertical" className="mx-2 h-4" />
                  <span>{post.category}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">By {post.author}</span>
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

        {/* Newsletter Signup */}
        <div className="bg-brand-50 p-8 rounded-xl max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Stay Updated on Spermidine Research</h2>
          <p className="mb-6">
            Subscribe to our newsletter for the latest longevity research findings, supplement reviews, and health insights.
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
