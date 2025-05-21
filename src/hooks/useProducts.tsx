
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

export function useProducts() {
  // Fetch all products, sorted by rank
  const { data: products = [], isLoading, error, refetch } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('rank', { ascending: true });
      
      if (error) throw error;
      return data as ProductType[];
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Fetch top rated products
  const { data: topProducts = [] } = useQuery({
    queryKey: ['topProducts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('rating', { ascending: false })
        .limit(5);
      
      if (error) throw error;
      return data as ProductType[];
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Get a single product by ID with full details
  const getProduct = async (id: string): Promise<ProductType | null> => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error || !data) return null;
    
    // Convert jsonb columns to appropriate format
    const formattedData: ProductType = {
      ...data,
      pros: data.pros ? (data.pros as string[]) : null,
      cons: data.cons ? (data.cons as string[]) : null,
      features: data.features ? (data.features as string[]) : null
    };
    
    return formattedData;
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
    refetch
  };
}
