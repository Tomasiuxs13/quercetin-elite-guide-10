
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

// Sample blog post data
const blogPosts = [
  {
    id: 1,
    title: 'The Science Behind Quercetin: How It Works in Your Body',
    excerpt: 'Explore the mechanisms through which quercetin exerts its antioxidant and anti-inflammatory effects in the human body.',
    date: 'May 15, 2025',
    author: 'Dr. Sarah Johnson',
    category: 'Research',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
    slug: 'science-behind-quercetin'
  },
  {
    id: 2,
    title: 'Quercetin and Seasonal Allergies: What the Research Shows',
    excerpt: 'Learn how quercetin supplements may help reduce allergy symptoms and which formulations work best for different allergy types.',
    date: 'May 3, 2025',
    author: 'Emma Richards, RD',
    category: 'Health Benefits',
    image: 'https://images.unsplash.com/photo-1607326957431-29d25d2b386f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
    slug: 'quercetin-seasonal-allergies'
  },
  {
    id: 3,
    title: 'Combining Quercetin with Vitamin C: Synergistic Effects',
    excerpt: 'Discover why many supplements pair quercetin with vitamin C and how this combination enhances the benefits of both compounds.',
    date: 'April 22, 2025',
    author: 'Dr. Michael Chen',
    category: 'Supplement Guide',
    image: 'https://images.unsplash.com/photo-1606939232603-acc00ee2e581?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    slug: 'quercetin-vitamin-c-synergy'
  },
  {
    id: 4,
    title: 'Quercetin for Athletes: Recovery and Performance Benefits',
    excerpt: 'Explore how quercetin may help reduce exercise-induced inflammation and support recovery for both professional and recreational athletes.',
    date: 'April 10, 2025',
    author: 'James Wilson, MS',
    category: 'Performance',
    image: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
    slug: 'quercetin-for-athletes'
  },
  {
    id: 5,
    title: 'Quercetin-Rich Foods vs. Supplements: Which Is Better?',
    excerpt: 'Compare the bioavailability and practical benefits of dietary quercetin sources with supplement forms to determine the best approach for your needs.',
    date: 'March 28, 2025',
    author: 'Olivia Martinez, RDN',
    category: 'Nutrition',
    image: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
    slug: 'quercetin-foods-vs-supplements'
  },
  {
    id: 6,
    title: 'Quercetin Supplement Quality: How to Spot the Best Products',
    excerpt: 'Learn the key indicators of high-quality quercetin supplements and red flags to watch for when shopping for effective products.',
    date: 'March 15, 2025',
    author: 'Robert Thompson',
    category: 'Product Guide',
    image: 'https://images.unsplash.com/photo-1626963781637-dc8e0140eb0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
    slug: 'quercetin-supplement-quality'
  }
];

// Categories for filtering
const categories = [
  'All Posts',
  'Research',
  'Health Benefits',
  'Supplement Guide',
  'Nutrition',
  'Performance',
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
          <h1 className="text-4xl font-bold mb-4 text-center">Quercetin Research & Insights</h1>
          <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto">
            Expert-backed articles on quercetin benefits, research, and supplement guides
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
