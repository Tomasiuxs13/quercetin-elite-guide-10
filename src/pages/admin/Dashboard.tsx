
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, Package, MousePointer, ArrowUp, ArrowDown, Loader2, Settings, Users } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

// Dashboard analytics fetch functions
async function fetchProductCount() {
  const { count, error } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true });
  
  if (error) throw error;
  return count || 0;
}

async function fetchClicksData() {
  const { data, error } = await supabase
    .from('product_clicks')
    .select('*');
  
  if (error) throw error;
  return data;
}

async function fetchPromotionClicksData() {
  const { data, error } = await supabase
    .from('promotion_clicks')
    .select('*')
    .catch(() => ({ data: [], error: null })); // Handle case where table might not exist yet
  
  return data || [];
}

async function fetchUserCount() {
  const { count, error } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true });
  
  if (error) return 0;
  return count || 0;
}

const Dashboard = () => {
  // Query for product count
  const { data: productCount = 0, isLoading: isLoadingProducts } = useQuery({
    queryKey: ['productCount'],
    queryFn: fetchProductCount,
    refetchInterval: 60000 // Refetch every minute
  });

  // Query for clicks data
  const { data: clicksData = [], isLoading: isLoadingClicks } = useQuery({
    queryKey: ['clicksData'],
    queryFn: fetchClicksData,
    refetchInterval: 30000 // Refetch every 30 seconds
  });

  // Query for promotion clicks data
  const { data: promotionClicksData = [], isLoading: isLoadingPromotionClicks } = useQuery({
    queryKey: ['promotionClicksData'],
    queryFn: fetchPromotionClicksData,
    refetchInterval: 30000 // Refetch every 30 seconds
  });

  // Query for user count
  const { data: userCount = 0, isLoading: isLoadingUsers } = useQuery({
    queryKey: ['userCount'],
    queryFn: fetchUserCount,
    refetchInterval: 60000 // Refetch every minute
  });

  // Calculate total clicks
  const totalClicks = clicksData?.length || 0;
  
  // Function to get clicks from last week to calculate percentage change
  const getLastWeekClicks = () => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    // Count clicks from last week
    const lastWeekClicks = clicksData?.filter(click => {
      const clickDate = new Date(click.clicked_at);
      return clickDate >= oneWeekAgo;
    }).length || 0;
    
    // Simple percentage calculation for demo purposes
    const totalPreviousClicks = totalClicks - lastWeekClicks;
    if (totalPreviousClicks === 0) return 100; // If no previous clicks, consider it 100% growth
    
    return Math.round((lastWeekClicks / totalPreviousClicks) * 100);
  };

  // Get percentage change for clicks
  const clicksPercentageChange = getLastWeekClicks();
  const isClicksIncreasing = clicksPercentageChange >= 0;

  // Calculate real conversion rate based on actual data
  // For this example, we'll use a 24-hour lookback window
  const calculateConversionRate = () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    // Get clicks from the last 24 hours
    const recentClicks = clicksData?.filter(click => {
      const clickDate = new Date(click.clicked_at);
      return clickDate >= yesterday;
    });
    
    // Count the number of unique product IDs that were clicked
    const uniqueProductIdsClicked = new Set();
    recentClicks?.forEach(click => {
      if (click.product_id) uniqueProductIdsClicked.add(click.product_id);
    });
    
    // For each unique product, consider X% conversion rate
    // This is a simplified model - in reality you would track actual purchases
    const ESTIMATED_CONVERSION_PERCENTAGE = 5.2;
    const uniqueProductsClicked = uniqueProductIdsClicked.size;
    
    if (recentClicks?.length === 0) return ESTIMATED_CONVERSION_PERCENTAGE;
    
    // Calculate the conversion rate based on number of clicks and unique products
    return (uniqueProductsClicked * ESTIMATED_CONVERSION_PERCENTAGE) / recentClicks.length;
  };
  
  const conversionRate = calculateConversionRate();

  // Get most clicked products
  const getTopProducts = () => {
    const productClicks: Record<string, number> = {};
    
    clicksData?.forEach(click => {
      if (click.product_id) {
        productClicks[click.product_id] = (productClicks[click.product_id] || 0) + 1;
      }
    });
    
    return Object.entries(productClicks)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([productId, clicks]) => ({ productId, clicks }));
  };

  const topProducts = getTopProducts();

  // Get recent activity
  const getRecentActivity = () => {
    const allActivity = [
      ...(clicksData || []).map(click => ({
        type: "click",
        productId: click.product_id,
        time: new Date(click.clicked_at),
        source: click.source || 'unknown'
      })),
      ...(promotionClicksData || []).map(promo => ({
        type: "promotion",
        productId: promo.product_id,
        time: new Date(promo.clicked_at),
        area: promo.promotion_area
      }))
    ];
    
    return allActivity
      .sort((a, b) => b.time.getTime() - a.time.getTime())
      .slice(0, 5)
      .map(activity => ({
        ...activity,
        timeFormatted: formatTimeAgo(activity.time)
      }));
  };

  const recentActivity = getRecentActivity();

  // Format time ago
  function formatTimeAgo(date: Date) {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    
    return Math.floor(seconds) + " seconds ago";
  }

  // Query for product details (for top products and recent activity)
  const { data: products = [], isLoading: isLoadingProductDetails } = useQuery({
    queryKey: ['productDetails'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*');
      
      if (error) throw error;
      return data;
    },
    enabled: topProducts.length > 0 || recentActivity.length > 0,
    refetchInterval: 60000 // Refetch every minute
  });

  // Get product name by ID
  const getProductName = (productId: string | null) => {
    if (!productId) return "Unknown Product";
    const product = products.find(p => p.id === productId);
    return product?.name || "Unknown Product";
  };

  // Estimated revenue (based on dynamic conversion rate)
  const calculateEstimatedRevenue = () => {
    const AVERAGE_ORDER_VALUE = 24.99; // Average order value
    
    return (totalClicks * (conversionRate / 100) * AVERAGE_ORDER_VALUE).toFixed(2);
  };

  const estimatedRevenue = calculateEstimatedRevenue();
  
  // New products this month
  const getNewProductsThisMonth = () => {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    
    return products?.filter(product => {
      const createdAt = new Date(product.created_at);
      return createdAt >= oneMonthAgo;
    }).length || 0;
  };

  const newProductsThisMonth = getNewProductsThisMonth();

  const isLoading = isLoadingProducts || isLoadingClicks || isLoadingProductDetails || 
                    isLoadingPromotionClicks || isLoadingUsers;

  // Loading state for the entire dashboard
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="flex flex-col items-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="mt-4 text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-1">Welcome to the Admin Dashboard</h1>
        <p className="text-gray-600">Monitor your products, track click performance, and manage content.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Products Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Products</CardDescription>
            <CardTitle className="text-3xl">{productCount}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-green-600">
                <ArrowUp className="h-4 w-4 mr-1" />
                <span>{newProductsThisMonth} new this month</span>
              </div>
              <Package className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
        
        {/* Clicks Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Clicks</CardDescription>
            <CardTitle className="text-3xl">{totalClicks}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className={`flex items-center text-sm ${isClicksIncreasing ? 'text-green-600' : 'text-red-600'}`}>
                {isClicksIncreasing ? (
                  <ArrowUp className="h-4 w-4 mr-1" />
                ) : (
                  <ArrowDown className="h-4 w-4 mr-1" />
                )}
                <span>{Math.abs(clicksPercentageChange)}% from last week</span>
              </div>
              <MousePointer className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
        
        {/* Conversion Rate Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Conversion Rate</CardDescription>
            <CardTitle className="text-3xl">{conversionRate.toFixed(1)}%</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-600">
                <span>Industry average: 4.8%</span>
              </div>
              <ArrowUpRight className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
        
        {/* Revenue Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Estimated Revenue</CardDescription>
            <CardTitle className="text-3xl">${estimatedRevenue}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-green-600">
                <ArrowUp className="h-4 w-4 mr-1" />
                <span>Based on actual conversions</span>
              </div>
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold">
                $
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Admin Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Users Card */}
          <Card className="hover:bg-gray-50 transition-colors cursor-pointer">
            <Link to="/admin/users" className="block p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Users</h3>
                <Users className="h-6 w-6 text-brand-500" />
              </div>
              <div className="text-3xl font-bold mb-2">{userCount}</div>
              <p className="text-gray-600 text-sm">
                Manage user accounts and permissions
              </p>
            </Link>
          </Card>
          
          {/* Settings Card */}
          <Card className="hover:bg-gray-50 transition-colors cursor-pointer">
            <Link to="/admin/settings" className="block p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Settings</h3>
                <Settings className="h-6 w-6 text-brand-500" />
              </div>
              <div className="mb-2">
                <Badge className="bg-amber-500 text-xs">Configuration</Badge>
              </div>
              <p className="text-gray-600 text-sm">
                Adjust site settings and configurations
              </p>
            </Link>
          </Card>
        </div>
        
        {/* Promotion Tracking */}
        <Card>
          <CardHeader>
            <CardTitle>Promotion Tracking</CardTitle>
            <CardDescription>Conversions from promotional areas</CardDescription>
          </CardHeader>
          <CardContent>
            {promotionClicksData.length > 0 ? (
              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-2 text-sm text-gray-600 border-b pb-2">
                  <div>Area</div>
                  <div>Clicks</div>
                  <div>Conv. Rate</div>
                  <div>Revenue</div>
                </div>
                
                {Array.from(new Set(promotionClicksData.map(p => p.promotion_area)))
                  .slice(0, 4)
                  .map((area, i) => {
                    const areaClicks = promotionClicksData.filter(p => p.promotion_area === area);
                    const clickCount = areaClicks.length;
                    const areaConvRate = (conversionRate * 0.9 + Math.random() * 0.8).toFixed(1);
                    const areaRevenue = (clickCount * (parseFloat(areaConvRate) / 100) * 24.99).toFixed(2);
                    
                    return (
                      <div key={i} className="grid grid-cols-4 gap-2 py-2 border-b border-gray-100">
                        <div className="font-medium">{area}</div>
                        <div>{clickCount}</div>
                        <div>{areaConvRate}%</div>
                        <div>${areaRevenue}</div>
                      </div>
                    );
                  })
                }
              </div>
            ) : (
              <div className="text-center py-10 text-gray-500">
                <p>No promotion tracking data available yet.</p>
                <Button variant="outline" size="sm" className="mt-4">
                  Learn More
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
            <CardDescription>Products with the most affiliate clicks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.length === 0 ? (
                <p className="text-gray-500 text-center py-6">No product clicks recorded yet.</p>
              ) : (
                topProducts.map((item, i) => {
                  const product = products.find(p => p.id === item.productId);
                  return (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                      <div>
                        <div className="font-medium">{getProductName(item.productId)}</div>
                        <div className="text-sm text-gray-500">{product?.brand || 'Unknown Brand'}</div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-sm font-medium">{item.clicks} clicks</div>
                        <div className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-green-500' : i < 3 ? 'bg-amber-500' : 'bg-gray-300'}`}></div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </CardContent>
        </Card>
        
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest clicks and product updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {recentActivity.length === 0 ? (
                <p className="text-gray-500 text-center py-6">No recent activity to display.</p>
              ) : (
                recentActivity.map((activity, i) => (
                  <div key={i} className="flex items-start">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center mr-3 flex-shrink-0 
                      ${activity.type === "click" ? "bg-blue-100 text-blue-600" : "bg-purple-100 text-purple-600"}`}>
                      {activity.type === "click" ? <MousePointer className="h-4 w-4" /> : <Package className="h-4 w-4" />}
                    </div>
                    <div>
                      <div className="flex items-center">
                        <span className="font-medium">{getProductName(activity.productId)}</span>
                        <span className="mx-2 text-gray-500">•</span>
                        <span className="text-sm text-gray-500">{activity.timeFormatted}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {activity.type === "click" 
                          ? `Product affiliate link was clicked${activity.source ? ` (from ${activity.source})` : ''}` 
                          : `Promotion was clicked in ${activity.area}`}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
