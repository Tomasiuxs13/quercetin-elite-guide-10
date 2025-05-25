
import { useQuery } from '@tanstack/react-query';
import { supabase, trackProductClick } from '@/integrations/supabase/client';

export type ProductType = {
  id: string;
  name: string;
  brand: string;
  image: string | null;
  rating: number;
  review_count: number | null;
  price: number;
  link: string;
  rank: number | null;
  description?: string | null;
  pros?: string[] | null;
  cons?: string[] | null;
  features?: string[] | null;
};

// Mock spermidine product data
const mockSpermidineProducts: ProductType[] = [
  {
    id: '1',
    name: 'Premium Spermidine Complex',
    brand: 'LifeExtension',
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300',
    rating: 4.8,
    review_count: 1247,
    price: 34.99,
    link: 'https://example.com/premium-spermidine',
    rank: 1,
    description: 'High-potency spermidine supplement with wheat germ extract',
    pros: ['Highest spermidine concentration', 'Natural wheat germ source', 'Third-party tested'],
    cons: ['Premium price point', 'Large capsule size'],
    features: ['10mg spermidine per serving', 'Wheat germ extract', 'Vegan capsules', 'No artificial additives']
  },
  {
    id: '2',
    name: 'Pure Spermidine Plus',
    brand: 'Thorne',
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300',
    rating: 4.6,
    review_count: 892,
    price: 28.50,
    link: 'https://example.com/pure-spermidine',
    rank: 2,
    description: 'Clinical-grade spermidine with enhanced bioavailability',
    pros: ['Enhanced absorption', 'Clinical research backing', 'Great value'],
    cons: ['Lower concentration than premium options'],
    features: ['8mg spermidine per serving', 'Enhanced bioavailability', 'Third-party tested', 'GMP certified']
  },
  {
    id: '3',
    name: 'Spermidine Longevity Formula',
    brand: 'DoNotAge',
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300',
    rating: 4.5,
    review_count: 634,
    price: 39.99,
    link: 'https://example.com/longevity-spermidine',
    rank: 3,
    description: 'Advanced spermidine formula with additional longevity compounds',
    pros: ['Additional longevity compounds', 'High purity', 'Research-backed formula'],
    cons: ['Higher price', 'Complex formula may not suit everyone'],
    features: ['12mg spermidine per serving', 'Added resveratrol', 'NAD+ precursors', 'Delayed release capsules']
  },
  {
    id: '4',
    name: 'Natural Spermidine Extract',
    brand: 'NOW Foods',
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300',
    rating: 4.3,
    review_count: 445,
    price: 19.99,
    link: 'https://example.com/natural-spermidine',
    rank: 4,
    description: 'Budget-friendly spermidine from natural sources',
    pros: ['Affordable price', 'Natural sourcing', 'Trusted brand'],
    cons: ['Lower potency', 'Basic formulation'],
    features: ['5mg spermidine per serving', 'Natural wheat germ', 'No artificial ingredients', 'Vegetarian capsules']
  },
  {
    id: '5',
    name: 'Advanced Spermidine Complex',
    brand: 'Jarrow Formulas',
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300',
    rating: 4.4,
    review_count: 567,
    price: 32.75,
    link: 'https://example.com/advanced-spermidine',
    rank: 5,
    description: 'Comprehensive spermidine supplement with supporting nutrients',
    pros: ['Comprehensive formula', 'Good potency', 'Supporting nutrients'],
    cons: ['Multiple ingredients may cause interactions'],
    features: ['9mg spermidine per serving', 'Added vitamin C', 'Zinc and selenium', 'Enteric coated']
  }
];

export function useProducts() {
  // Use mock data instead of Supabase for now
  const { data: products = mockSpermidineProducts, isLoading = false, error = null } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      // Return mock data
      return mockSpermidineProducts;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Top products are the highest rated ones
  const { data: topProducts = [] } = useQuery({
    queryKey: ['topProducts'],
    queryFn: async () => {
      return mockSpermidineProducts.slice(0, 5).sort((a, b) => b.rating - a.rating);
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Get a single product by ID
  const getProduct = async (id: string): Promise<ProductType | null> => {
    const product = mockSpermidineProducts.find(p => p.id === id);
    return product || null;
  };

  // Get a product by ID (using React Query)
  const useProductDetail = (id: string | undefined) => {
    return useQuery({
      queryKey: ['product', id],
      queryFn: async () => {
        if (!id) return null;
        return await getProduct(id);
      },
      enabled: !!id,
      staleTime: 1000 * 60 * 5, // 5 minutes
    });
  };

  // Log a product click
  const logProductClick = async (productId: string) => {
    await trackProductClick(productId);
  };

  return {
    products,
    topProducts,
    isLoading,
    error,
    getProduct,
    useProductDetail,
    logProductClick,
    refetch: () => {}
  };
}
