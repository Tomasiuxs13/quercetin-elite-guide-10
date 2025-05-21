
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Plus, Search, Edit, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import StarRating from '@/components/StarRating';

// Sample products data
const sampleProducts = [
  {
    id: 1,
    name: "Natural Quercetin Complex",
    brand: "PureSci Nutrition",
    image: "https://placehold.co/300x400/f5f5f5/cccccc?text=Quercetin+Complex",
    rating: 4.9,
    reviewCount: 432,
    price: 29.99,
    link: "#affiliate-link-1",
    rank: 1,
    clicks: 124
  },
  {
    id: 2,
    name: "Quercetin Plus Bromelain",
    brand: "Vitality Research",
    image: "https://placehold.co/300x400/f5f5f5/cccccc?text=Quercetin+Plus",
    rating: 4.8,
    reviewCount: 387,
    price: 27.99,
    link: "#affiliate-link-2",
    rank: 2,
    clicks: 98
  },
  {
    id: 3,
    name: "Advanced Quercetin 500mg",
    brand: "Optimal Health",
    image: "https://placehold.co/300x400/f5f5f5/cccccc?text=Advanced+Quercetin",
    rating: 4.7,
    reviewCount: 312,
    price: 23.95,
    link: "#affiliate-link-3",
    rank: 3,
    clicks: 72
  },
  {
    id: 4,
    name: "Quercetin with Vitamin C",
    brand: "NutriPure",
    image: "https://placehold.co/300x400/f5f5f5/cccccc?text=Quercetin+with+C",
    rating: 4.6,
    reviewCount: 256,
    price: 21.99,
    link: "#affiliate-link-4",
    rank: 4,
    clicks: 53
  },
  {
    id: 5,
    name: "Quercetin Advanced Formula",
    brand: "VitaLabs",
    image: "https://placehold.co/300x400/f5f5f5/cccccc?text=Quercetin+Advanced",
    rating: 4.5,
    reviewCount: 198,
    price: 24.95,
    link: "#affiliate-link-5",
    rank: 5,
    clicks: 41
  },
];

const Products = () => {
  const [products, setProducts] = useState(sampleProducts);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    product.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const moveRank = (id: number, direction: 'up' | 'down') => {
    const currentIndex = products.findIndex(p => p.id === id);
    if (currentIndex === -1) return;

    const newProducts = [...products];
    const currentRank = newProducts[currentIndex].rank!;

    // Can't move the top item up or the bottom item down
    if ((direction === 'up' && currentRank === 1) || 
        (direction === 'down' && currentRank === products.length)) {
      return;
    }

    const swapIndex = products.findIndex(p => p.rank === (direction === 'up' ? currentRank - 1 : currentRank + 1));
    if (swapIndex === -1) return;

    // Swap ranks
    newProducts[currentIndex].rank = newProducts[swapIndex].rank;
    newProducts[swapIndex].rank = currentRank;

    // Sort by rank
    newProducts.sort((a, b) => (a.rank || 0) - (b.rank || 0));
    setProducts(newProducts);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold mb-1">Products</h1>
          <p className="text-gray-600">Manage your Quercetin supplements catalog</p>
        </div>
        <Button className="mt-4 md:mt-0">
          <Plus className="mr-2 h-4 w-4" /> Add New Product
        </Button>
      </div>
      
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input 
            className="pl-10" 
            placeholder="Search products..." 
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>
      
      <div className="bg-white rounded-md shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">Rank</TableHead>
              <TableHead className="w-16">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Clicks</TableHead>
              <TableHead className="w-28">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map(product => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="flex items-center space-x-1">
                    <span>{product.rank}</span>
                    <div className="flex flex-col">
                      <button 
                        onClick={() => moveRank(product.id, 'up')}
                        className="text-gray-500 hover:text-gray-700 disabled:opacity-30"
                        disabled={product.rank === 1}
                      >
                        <ArrowUp className="h-3 w-3" />
                      </button>
                      <button 
                        onClick={() => moveRank(product.id, 'down')}
                        className="text-gray-500 hover:text-gray-700 disabled:opacity-30"
                        disabled={product.rank === products.length}
                      >
                        <ArrowDown className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-12 h-16 object-contain"
                  />
                </TableCell>
                <TableCell>
                  <div className="font-medium">{product.name}</div>
                </TableCell>
                <TableCell>{product.brand}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <StarRating rating={product.rating} size={14} className="mr-2" />
                    <span className="text-sm text-gray-600">({product.reviewCount})</span>
                  </div>
                </TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell className="text-right">{product.clicks}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Products;
