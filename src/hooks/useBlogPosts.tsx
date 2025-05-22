
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export type BlogPostType = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  content: string;
  published_at?: string | null;
  author_id?: string | null;
  category?: string | null;
  image?: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  metadata?: any;
  reading_time?: string | null;
  author?: {
    full_name?: string | null;
    email: string;
  } | null;
};

export function useBlogPosts() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch all blog posts with optional filters
  const useFetchPosts = (options: { 
    category?: string; 
    publishedOnly?: boolean; 
    limit?: number; 
    authorId?: string 
  } = {}) => {
    const { category, publishedOnly = false, limit, authorId } = options;
    
    return useQuery({
      queryKey: ['blogPosts', { category, publishedOnly, limit, authorId }],
      queryFn: async () => {
        let query = supabase
          .from('blog_posts')
          .select(`
            *,
            author:profiles(full_name, email)
          `);
        
        if (publishedOnly) {
          query = query.eq('is_published', true);
        }
        
        if (category) {
          query = query.eq('category', category);
        }
        
        if (authorId) {
          query = query.eq('author_id', authorId);
        }
        
        if (limit) {
          query = query.limit(limit);
        }
        
        query = query.order('published_at', { ascending: false });
        
        const { data, error } = await query;
        
        if (error) throw error;
        return data as BlogPostType[];
      }
    });
  };

  // Fetch a single blog post by slug
  const useFetchPostBySlug = (slug: string | undefined) => {
    return useQuery({
      queryKey: ['blogPost', slug],
      queryFn: async () => {
        if (!slug) return null;
        
        const { data, error } = await supabase
          .from('blog_posts')
          .select(`
            *,
            author:profiles(full_name, email)
          `)
          .eq('slug', slug)
          .single();
        
        if (error) {
          if (error.code === 'PGRST116') {
            return null; // No rows found
          }
          throw error;
        }
        
        return data as BlogPostType;
      },
      enabled: !!slug
    });
  };

  // Create a new blog post
  const createPost = async (post: Partial<BlogPostType>) => {
    setIsSubmitting(true);
    try {
      // Make sure the slug is URL-friendly
      if (post.slug) {
        post.slug = post.slug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      }
      
      // If publishing now, set the published_at date
      if (post.is_published) {
        post.published_at = new Date().toISOString();
      }

      const { data, error } = await supabase
        .from('blog_posts')
        .insert(post)
        .select()
        .single();

      if (error) throw error;
      
      toast({
        title: "Blog post created",
        description: "Your blog post has been created successfully."
      });

      queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
      return data;
    } catch (error: any) {
      toast({
        title: "Error creating blog post",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  // Update an existing blog post
  const updatePost = async (id: string, updates: Partial<BlogPostType>) => {
    setIsSubmitting(true);
    try {
      // If publishing for the first time, set published_at
      if (updates.is_published && !updates.published_at) {
        updates.published_at = new Date().toISOString();
      }
      
      // Make sure the slug is URL-friendly if it's being updated
      if (updates.slug) {
        updates.slug = updates.slug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      }

      const { data, error } = await supabase
        .from('blog_posts')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      toast({
        title: "Blog post updated",
        description: "Your blog post has been updated successfully."
      });

      queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
      queryClient.invalidateQueries({ queryKey: ['blogPost', data.slug] });
      return data;
    } catch (error: any) {
      toast({
        title: "Error updating blog post",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete a blog post
  const deletePost = async (id: string) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: "Blog post deleted",
        description: "The blog post has been deleted successfully."
      });

      queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
    } catch (error: any) {
      toast({
        title: "Error deleting blog post",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
  };

  // Fetch all blog tags
  const useFetchTags = () => {
    return useQuery({
      queryKey: ['blogTags'],
      queryFn: async () => {
        const { data, error } = await supabase
          .from('blog_tags')
          .select('*')
          .order('name');
        
        if (error) throw error;
        return data;
      }
    });
  };

  // Create useMutation hooks for operations
  const useCreatePost = () => {
    return useMutation({
      mutationFn: createPost,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
      }
    });
  };

  const useUpdatePost = () => {
    return useMutation({
      mutationFn: ({ id, updates }: { id: string; updates: Partial<BlogPostType> }) => 
        updatePost(id, updates),
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
        queryClient.invalidateQueries({ queryKey: ['blogPost', data?.slug] });
      }
    });
  };

  const useDeletePost = () => {
    return useMutation({
      mutationFn: deletePost,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
      }
    });
  };

  return {
    useFetchPosts,
    useFetchPostBySlug,
    createPost,
    updatePost,
    deletePost,
    isSubmitting,
    useCreatePost,
    useUpdatePost,
    useDeletePost,
    useFetchTags
  };
}
