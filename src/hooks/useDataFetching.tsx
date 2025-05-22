
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

// Dashboard analytics fetch functions
export async function fetchProductCount() {
  const { count, error } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true });
  
  if (error) throw error;
  return count || 0;
}

export async function fetchClicksData() {
  const { data, error } = await supabase
    .from('product_clicks')
    .select('*');
  
  if (error) throw error;
  return data;
}

export async function fetchPromotionClicksData() {
  try {
    // Use any type to bypass TypeScript check until the types are regenerated
    const { data, error } = await (supabase as any)
      .from('promotion_clicks')
      .select('*');
    
    if (error) throw error;
    return data || [];
  } catch (err) {
    console.error('Failed to fetch promotion clicks:', err);
    return [];
  }
}

export async function fetchUserCount() {
  const { count, error } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true });
  
  if (error) return 0;
  return count || 0;
}

export function useProductCount() {
  return useQuery({
    queryKey: ['productCount'],
    queryFn: fetchProductCount,
    refetchInterval: 60000 // Refetch every minute
  });
}

export function useClicksData() {
  return useQuery({
    queryKey: ['clicksData'],
    queryFn: fetchClicksData,
    refetchInterval: 30000 // Refetch every 30 seconds
  });
}

export function usePromotionClicksData() {
  return useQuery({
    queryKey: ['promotionClicksData'],
    queryFn: fetchPromotionClicksData,
    refetchInterval: 30000 // Refetch every 30 seconds
  });
}

export function useUserCount() {
  return useQuery({
    queryKey: ['userCount'],
    queryFn: fetchUserCount,
    refetchInterval: 60000 // Refetch every minute
  });
}

export function useProductDetails(enabled: boolean) {
  return useQuery({
    queryKey: ['productDetails'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*');
      
      if (error) throw error;
      return data;
    },
    enabled,
    refetchInterval: 60000 // Refetch every minute
  });
}
