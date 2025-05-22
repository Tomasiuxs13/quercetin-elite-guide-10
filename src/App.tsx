
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicLayout from "./components/layouts/PublicLayout";
import Home from "./pages/Home";
import WhatIsQuercetin from "./pages/WhatIsQuercetin";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Products from "./pages/admin/Products";
import Users from "./pages/admin/Users";
import Settings from "./pages/admin/Settings";
import Auth from "./pages/Auth";
import Benefits from "./pages/Benefits";
import FAQ from "./pages/FAQ";
import ProductsPage from "./pages/Products";
import TopPicks from "./pages/TopPicks";
import ProductsComparison from "./pages/ProductsComparison";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import ProductDetail from "./pages/ProductDetail";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 minute
      refetchOnWindowFocus: true,
      retry: 1
    }
  }
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Auth Page */}
            <Route path="/auth" element={<Auth />} />
            
            {/* Admin Routes - Protected */}
            <Route element={<ProtectedRoute requireAdmin={true} />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="products" element={<Products />} />
                <Route path="users" element={<Users />} />
                <Route path="settings" element={<Settings />} />
                {/* More admin routes will be added later */}
              </Route>
            </Route>
            
            {/* Public Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/what-is-quercetin" element={<WhatIsQuercetin />} />
              <Route path="/benefits" element={<Benefits />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/top-picks" element={<TopPicks />} />
              <Route path="/products/comparison" element={<ProductsComparison />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="*" element={<NotFound />} />
            </Route>
            
            {/* Auth Pages */}
            <Route path="/unauthorized" element={<Unauthorized />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
