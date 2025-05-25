
import React, { useState } from 'react';
import { useProducts } from '@/hooks/useProducts';
import ProductCard from '@/components/ProductCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Filter, Search } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Products = () => {
  const { topProducts, isLoading } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('rating');
  const [priceFilter, setPriceFilter] = useState('all');

  // Filter and sort products
  const filteredProducts = topProducts
    .filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .filter(product => {
      if (priceFilter === 'all') return true;
      if (priceFilter === 'under25' && product.price < 25) return true;
      if (priceFilter === '25to50' && product.price >= 25 && product.price <= 50) return true;
      if (priceFilter === 'over50' && product.price > 50) return true;
      return false;
    })
    .sort((a, b) => {
      if (sortOption === 'rating') return b.rating - a.rating;
      if (sortOption === 'price_low') return a.price - b.price;
      if (sortOption === 'price_high') return b.price - a.price;
      if (sortOption === 'name') return a.name.localeCompare(b.name);
      return 0;
    });

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4 text-center">Spermidine Supplements</h1>
          <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto">
            Compare the best spermidine supplements based on our expert analysis,
            quality testing, and user reviews for optimal longevity support.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-1 md:col-span-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search supplements..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="w-full">
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="price_low">Price: Low to High</SelectItem>
                  <SelectItem value="price_high">Price: High to Low</SelectItem>
                  <SelectItem value="name">Name: A to Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-full">
              <Select value={priceFilter} onValueChange={setPriceFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Price range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="under25">Under $25</SelectItem>
                  <SelectItem value="25to50">$25 - $50</SelectItem>
                  <SelectItem value="over50">Over $50</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Products Listing */}
        <div className="space-y-6 mb-10">
          {isLoading ? (
            // Skeleton loading state
            [...Array(5)].map((_, i) => (
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
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} showRank={true} />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No products match your search criteria.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchTerm('');
                  setPriceFilter('all');
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
