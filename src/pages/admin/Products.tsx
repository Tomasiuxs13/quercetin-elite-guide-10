
import React, { useState, useEffect } from 'react';
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
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  ArrowUp, 
  ArrowDown,
  Loader2
} from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/sonner';
import StarRating from '@/components/StarRating';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Json } from '@/integrations/supabase/types';

type Product = {
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
};

// Form schema for product
const productSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  brand: z.string().min(1, { message: 'Brand is required' }),
  description: z.string().optional(),
  image: z.string().optional(),
  rating: z.number().min(0).max(5),
  review_count: z.number().int().nonnegative(),
  price: z.number().positive({ message: 'Price must be positive' }),
  link: z.string().url({ message: 'Must be a valid URL' }),
});

type ProductFormValues = z.infer<typeof productSchema>;

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  // Form setup
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      brand: '',
      description: '',
      image: '',
      rating: 0,
      review_count: 0,
      price: 0,
      link: '',
    }
  });

  // Query to fetch products
  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('rank', { ascending: true });
      
      if (error) throw error;
      return data as Product[];
    },
  });

  // Mutation to create/update product
  const upsertProductMutation = useMutation({
    mutationFn: async (values: ProductFormValues & { id?: string }) => {
      // Ensure all required fields are set
      const productData = { 
        ...values,
        // Ensure we set non-null values for required fields
        name: values.name,
        brand: values.brand,
        rating: values.rating,
        price: values.price,
        link: values.link,
        // Handle optional fields properly
        image: values.image || null,
        description: values.description || null,
      };
      
      if (selectedProduct) {
        // Update existing product
        const { data, error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', selectedProduct.id)
          .select();
        
        if (error) throw error;
        return data;
      } else {
        // Create new product
        const { data, error } = await supabase
          .from('products')
          .insert(productData)
          .select();
        
        if (error) throw error;
        return data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success(selectedProduct ? 'Product updated successfully' : 'Product created successfully');
      setIsFormDialogOpen(false);
      setSelectedProduct(null);
      form.reset();
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    }
  });

  // Mutation to delete product
  const deleteProductMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return id;
    },
    onSuccess: (deletedId) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product deleted successfully');
      setDeleteId(null);
      setIsDeleteDialogOpen(false);
    },
    onError: (error) => {
      toast.error(`Error deleting product: ${error.message}`);
    }
  });

  // Mutation to update product rank
  const updateRankMutation = useMutation({
    mutationFn: async ({ id, newRank }: { id: string; newRank: number }) => {
      const { error } = await supabase
        .from('products')
        .update({ rank: newRank })
        .eq('id', id);
      
      if (error) throw error;
      return { id, newRank };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: (error) => {
      toast.error(`Error updating rank: ${error.message}`);
    }
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products?.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    product.brand.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const moveRank = (id: string, direction: 'up' | 'down') => {
    if (!products) return;
    
    const currentIndex = products.findIndex(p => p.id === id);
    if (currentIndex === -1) return;

    const currentRank = products[currentIndex].rank || currentIndex + 1;
    let targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    
    // Ensure target index is within bounds
    if (targetIndex < 0 || targetIndex >= products.length) return;

    const targetRank = products[targetIndex].rank || targetIndex + 1;
    
    // Update both products with swapped ranks
    updateRankMutation.mutate({ id, newRank: targetRank });
    updateRankMutation.mutate({ id: products[targetIndex].id, newRank: currentRank });
  };

  const openDeleteDialog = (id: string) => {
    setDeleteId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    if (deleteId) {
      deleteProductMutation.mutate(deleteId);
    }
  };

  const openFormDialog = (product?: Product) => {
    if (product) {
      setSelectedProduct(product);
      form.reset({
        name: product.name,
        brand: product.brand,
        description: product.description || '',
        image: product.image || '',
        rating: product.rating,
        review_count: product.review_count || 0,
        price: product.price,
        link: product.link,
      });
    } else {
      setSelectedProduct(null);
      form.reset();
    }
    setIsFormDialogOpen(true);
  };

  const onSubmit = (values: ProductFormValues) => {
    if (selectedProduct) {
      upsertProductMutation.mutate({ ...values, id: selectedProduct.id });
    } else {
      upsertProductMutation.mutate(values);
    }
  };

  // Count clicks for each product
  const { data: clickCounts } = useQuery({
    queryKey: ['productClicks'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('product_clicks')
        .select('product_id, count')
        .select('product_id');
      
      if (error) throw error;
      
      // Count occurrences of each product_id
      const counts: Record<string, number> = {};
      data.forEach(click => {
        const productId = click.product_id;
        if (productId) {
          counts[productId] = (counts[productId] || 0) + 1;
        }
      });
      
      return counts;
    },
  });

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold mb-1">Products</h1>
          <p className="text-gray-600">Manage your Quercetin supplements catalog</p>
        </div>
        <Button className="mt-4 md:mt-0" onClick={() => openFormDialog()}>
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
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8">
                  <div className="flex justify-center items-center">
                    <Loader2 className="h-6 w-6 animate-spin mr-2" />
                    <span>Loading products...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8">
                  No products found. Try a different search or add a new product.
                </TableCell>
              </TableRow>
            ) : (
              filteredProducts.map(product => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <span>{product.rank || '-'}</span>
                      <div className="flex flex-col">
                        <button 
                          onClick={() => moveRank(product.id, 'up')}
                          className="text-gray-500 hover:text-gray-700 disabled:opacity-30"
                          disabled={filteredProducts.indexOf(product) === 0}
                        >
                          <ArrowUp className="h-3 w-3" />
                        </button>
                        <button 
                          onClick={() => moveRank(product.id, 'down')}
                          className="text-gray-500 hover:text-gray-700 disabled:opacity-30"
                          disabled={filteredProducts.indexOf(product) === filteredProducts.length - 1}
                        >
                          <ArrowDown className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <img 
                      src={product.image || "https://placehold.co/300x400/f5f5f5/cccccc?text=No+Image"} 
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
                      <span className="text-sm text-gray-600">({product.review_count || 0})</span>
                    </div>
                  </TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell className="text-right">{clickCounts?.[product.id] || 0}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="icon" onClick={() => openFormDialog(product)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-red-500 hover:text-red-600"
                        onClick={() => openDeleteDialog(product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Product Form Dialog */}
      <Dialog open={isFormDialogOpen} onOpenChange={setIsFormDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>{selectedProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="brand"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Brand</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price ($)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          step="0.01" 
                          {...field} 
                          onChange={(e) => field.onChange(parseFloat(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rating (0-5)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          step="0.1" 
                          min="0" 
                          max="5" 
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="review_count"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Review Count</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value || ''} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="link"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Affiliate Link</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea rows={3} {...field} value={field.value || ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button variant="outline" type="button" onClick={() => setIsFormDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={upsertProductMutation.isPending}>
                  {upsertProductMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : selectedProduct ? "Update Product" : "Create Product"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Are you sure you want to delete this product? This action cannot be undone.</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDelete}
              disabled={deleteProductMutation.isPending}
            >
              {deleteProductMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Products;
