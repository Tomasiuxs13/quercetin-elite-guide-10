
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
import Auth from "./pages/Auth";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

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
                {/* More admin routes will be added later */}
              </Route>
            </Route>
            
            {/* Public Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/what-is-quercetin" element={<WhatIsQuercetin />} />
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
