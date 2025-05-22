
import React from 'react';
import { Loader2, Package, MousePointer, ArrowUpRight, ArrowUp, ArrowDown, Settings, Users } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Link } from 'react-router-dom';
import StatCard from '@/components/admin/dashboard/StatCard';
import TopProductsList from '@/components/admin/dashboard/TopProductsList';
import RecentActivityList from '@/components/admin/dashboard/RecentActivityList';
import PromotionTrackingCard from '@/components/admin/dashboard/PromotionTrackingCard';
import AdminNavCard from '@/components/admin/dashboard/AdminNavCard';
import { 
  useProductCount, 
  useClicksData, 
  usePromotionClicksData, 
  useUserCount,
  useProductDetails
} from '@/hooks/useDataFetching';
import { 
  calculateConversionRate, 
  calculateEstimatedRevenue, 
  getClicksPercentageChange,
  getTopProducts, 
  getRecentActivity,
  getNewProductsThisMonth
} from '@/utils/dashboardUtils';

const Dashboard = () => {
  // Fetch data using custom hooks
  const { data: productCount = 0, isLoading: isLoadingProducts } = useProductCount();
  const { data: clicksData = [], isLoading: isLoadingClicks } = useClicksData();
  const { data: promotionClicksData = [], isLoading: isLoadingPromotionClicks } = usePromotionClicksData();
  const { data: userCount = 0, isLoading: isLoadingUsers } = useUserCount();

  // Calculate derived metrics
  const totalClicks = clicksData?.length || 0;
  const clicksPercentageChange = getClicksPercentageChange(clicksData);
  const isClicksIncreasing = clicksPercentageChange >= 0;
  const conversionRate = calculateConversionRate(clicksData);
  const estimatedRevenue = calculateEstimatedRevenue(totalClicks, conversionRate);

  // Get top products and recent activity
  const topProducts = getTopProducts(clicksData);
  const recentActivity = getRecentActivity(clicksData, promotionClicksData);

  // Fetch product details for top products and recent activity
  const { data: products = [], isLoading: isLoadingProductDetails } = useProductDetails(
    topProducts.length > 0 || recentActivity.length > 0
  );

  const newProductsThisMonth = getNewProductsThisMonth(products);

  const isLoading = isLoadingProducts || isLoadingClicks || 
                    isLoadingProductDetails || isLoadingPromotionClicks || 
                    isLoadingUsers;

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
        <StatCard 
          title="Total Products"
          value={productCount}
          description={
            <div className="flex items-center text-sm text-green-600">
              <ArrowUp className="h-4 w-4 mr-1" />
              <span>{newProductsThisMonth} new this month</span>
            </div>
          }
          icon={<Package className="h-8 w-8 text-gray-400" />}
        />
        
        {/* Clicks Card */}
        <StatCard 
          title="Total Clicks"
          value={totalClicks}
          description={
            <div className={`flex items-center text-sm ${isClicksIncreasing ? 'text-green-600' : 'text-red-600'}`}>
              {isClicksIncreasing ? (
                <ArrowUp className="h-4 w-4 mr-1" />
              ) : (
                <ArrowDown className="h-4 w-4 mr-1" />
              )}
              <span>{Math.abs(clicksPercentageChange)}% from last week</span>
            </div>
          }
          icon={<MousePointer className="h-8 w-8 text-gray-400" />}
        />
        
        {/* Conversion Rate Card */}
        <StatCard 
          title="Conversion Rate"
          value={`${conversionRate.toFixed(1)}%`}
          description={
            <div className="flex items-center text-sm text-gray-600">
              <span>Industry average: 4.8%</span>
            </div>
          }
          icon={<ArrowUpRight className="h-8 w-8 text-gray-400" />}
        />
        
        {/* Revenue Card */}
        <StatCard 
          title="Estimated Revenue"
          value={`$${estimatedRevenue}`}
          description={
            <div className="flex items-center text-sm text-green-600">
              <ArrowUp className="h-4 w-4 mr-1" />
              <span>Based on actual conversions</span>
            </div>
          }
          icon={
            <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold">
              $
            </div>
          }
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Admin Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Users Card */}
          <AdminNavCard
            title="Users"
            description="Manage user accounts and permissions"
            to="/admin/users"
            icon={<Users className="h-6 w-6 text-brand-500" />}
            metric={userCount}
          />
          
          {/* Settings Card */}
          <AdminNavCard
            title="Settings"
            description="Adjust site settings and configurations"
            to="/admin/settings"
            icon={<Settings className="h-6 w-6 text-brand-500" />}
            badge={{ text: "Configuration" }}
          />
        </div>
        
        {/* Promotion Tracking */}
        <PromotionTrackingCard 
          promotionClicksData={promotionClicksData} 
          conversionRate={conversionRate} 
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <TopProductsList topProducts={topProducts} products={products} />
        
        {/* Recent Activity */}
        <RecentActivityList recentActivity={recentActivity} products={products} />
      </div>
    </div>
  );
};

export default Dashboard;
