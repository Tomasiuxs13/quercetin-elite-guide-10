
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff, 
  Plus, 
  Search, 
  Calendar, 
  MoreVertical, 
  FileText,
  Clock,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useBlogPosts, BlogPostType } from '@/hooks/useBlogPosts';

const BlogPosts = () => {
  const navigate = useNavigate();
  const { useFetchPosts, useFetchTags, useDeletePost, useUpdatePost } = useBlogPosts();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [publishedFilter, setPublishedFilter] = useState<string>('all');
  const [postToDelete, setPostToDelete] = useState<BlogPostType | null>(null);
  
  const { data: posts = [], isLoading } = useFetchPosts({});
  const { data: tags = [] } = useFetchTags();
  const { mutate: deletePost } = useDeletePost();
  const { mutate: updatePost } = useUpdatePost();

  // Filter posts based on search term and filters
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (post.excerpt || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !categoryFilter || post.category === categoryFilter;
    
    const matchesPublished = publishedFilter === 'all' ||
                           (publishedFilter === 'published' && post.is_published) ||
                           (publishedFilter === 'draft' && !post.is_published);
    
    return matchesSearch && matchesCategory && matchesPublished;
  });

  // Get unique categories from posts
  const categories = [...new Set(posts.map(post => post.category).filter(Boolean))];

  const handleDeleteConfirm = () => {
    if (postToDelete) {
      deletePost(postToDelete.id);
      setPostToDelete(null);
    }
  };

  const togglePublishStatus = (post: BlogPostType) => {
    updatePost({
      id: post.id,
      updates: { 
        is_published: !post.is_published,
        published_at: !post.is_published ? new Date().toISOString() : null
      }
    });
  };

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return 'Not published';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Blog Posts</h2>
          <p className="text-muted-foreground">
            Manage your blog content here
          </p>
        </div>
        <Button onClick={() => navigate('/admin/blog/new')}>
          <Plus className="mr-2 h-4 w-4" /> New Post
        </Button>
      </div>

      <Separator />

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search blog posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger>
            <div className="flex items-center">
              <Filter className="mr-2 h-4 w-4" />
              <span>{categoryFilter || "All Categories"}</span>
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category || ''}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={publishedFilter} onValueChange={setPublishedFilter}>
          <SelectTrigger>
            <div className="flex items-center">
              {publishedFilter === 'published' ? (
                <Eye className="mr-2 h-4 w-4" />
              ) : publishedFilter === 'draft' ? (
                <EyeOff className="mr-2 h-4 w-4" />
              ) : (
                <FileText className="mr-2 h-4 w-4" />
              )}
              <span>
                {publishedFilter === 'published'
                  ? 'Published'
                  : publishedFilter === 'draft'
                  ? 'Drafts'
                  : 'All Posts'}
              </span>
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Posts</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="draft">Drafts</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Blog Posts List */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="h-32 bg-gray-100"></CardHeader>
              <CardContent className="pt-6">
                <div className="h-6 bg-gray-100 rounded mb-4 w-3/4"></div>
                <div className="h-4 bg-gray-100 rounded mb-2"></div>
                <div className="h-4 bg-gray-100 rounded mb-2 w-5/6"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <Card key={post.id} className={!post.is_published ? "border-dashed" : ""}>
              <CardHeader className="relative p-0">
                <div className="h-40 overflow-hidden">
                  {post.image ? (
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <FileText className="h-10 w-10 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="absolute top-2 right-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 bg-white/80 hover:bg-white">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => navigate(`/admin/blog/edit/${post.id}`)}>
                        <Edit className="mr-2 h-4 w-4" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => togglePublishStatus(post)}>
                        {post.is_published ? (
                          <>
                            <EyeOff className="mr-2 h-4 w-4" /> Unpublish
                          </>
                        ) : (
                          <>
                            <Eye className="mr-2 h-4 w-4" /> Publish
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setPostToDelete(post)}>
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="mb-3 flex items-center gap-2">
                  <Badge variant={post.is_published ? "default" : "outline"}>
                    {post.is_published ? "Published" : "Draft"}
                  </Badge>
                  {post.category && (
                    <Badge variant="secondary">{post.category}</Badge>
                  )}
                </div>
                <CardTitle className="mb-2 line-clamp-2">{post.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {post.excerpt || "No excerpt available"}
                </CardDescription>
              </CardContent>
              <CardFooter className="flex justify-between text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Calendar className="mr-1 h-3 w-3" />
                  {formatDate(post.published_at)}
                </div>
                {post.reading_time && (
                  <div className="flex items-center">
                    <Clock className="mr-1 h-3 w-3" />
                    {post.reading_time}
                  </div>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <FileText className="mx-auto h-10 w-10 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium">No blog posts found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || categoryFilter || publishedFilter !== 'all'
              ? "Try adjusting your filters"
              : "Get started by creating a new blog post"}
          </p>
          <Button onClick={() => navigate('/admin/blog/new')} className="mt-6">
            <Plus className="mr-2 h-4 w-4" /> New Post
          </Button>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!postToDelete} onOpenChange={(open) => !open && setPostToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the blog post 
              "{postToDelete?.title}" and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default BlogPosts;
