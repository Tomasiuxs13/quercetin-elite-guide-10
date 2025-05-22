
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useBlogPosts, BlogPostType } from '@/hooks/useBlogPosts';
import BlogForm from '@/components/admin/blog/BlogForm';

const BlogEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isEditing = !!id;
  
  const { useFetchTags, createPost, updatePost, isSubmitting } = useBlogPosts();
  const { data: tags = [] } = useFetchTags();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(isEditing);
  
  // Extract categories from tags
  const categories = tags.map(tag => tag.name);

  useEffect(() => {
    const fetchPost = async () => {
      if (isEditing && id) {
        try {
          setLoading(true);
          // Try to get the post from the cache first
          const cachedPosts = queryClient.getQueryData<BlogPostType[]>(['blogPosts']);
          const cachedPost = cachedPosts?.find(p => p.id === id);
          
          if (cachedPost) {
            setPost(cachedPost);
          } else {
            // Fetch from the API if not in cache
            const { data, error } = await (window as any).supabase
              .from('blog_posts')
              .select('*')
              .eq('id', id)
              .single();
              
            if (error) throw error;
            setPost(data);
          }
        } catch (error) {
          console.error('Error fetching post:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    
    fetchPost();
  }, [id, isEditing, queryClient]);

  const handleSubmit = async (values: any) => {
    try {
      if (isEditing && id) {
        await updatePost(id, values);
      } else {
        await createPost(values);
      }
      navigate('/admin/blog');
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  const handleCancel = () => {
    navigate('/admin/blog');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/admin/blog')}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-3xl font-bold tracking-tight">
              {isEditing ? 'Edit Blog Post' : 'Create Blog Post'}
            </h2>
          </div>
          <p className="text-muted-foreground">
            {isEditing 
              ? 'Make changes to your blog post here' 
              : 'Create a new blog post to share with your audience'}
          </p>
        </div>
      </div>
      
      <Separator />
      
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <BlogForm
          post={post || undefined}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          onCancel={handleCancel}
          categories={categories}
        />
      )}
    </div>
  );
};

export default BlogEditor;
