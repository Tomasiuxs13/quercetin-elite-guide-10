
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MousePointer, Package } from 'lucide-react';

interface ActivityItem {
  type: "click" | "promotion";
  productId: string | null;
  time: Date;
  timeFormatted: string;
  source?: string;
  area?: string;
}

interface Product {
  id: string;
  name: string;
  [key: string]: any;
}

interface RecentActivityListProps {
  recentActivity: ActivityItem[];
  products: Product[];
}

const RecentActivityList: React.FC<RecentActivityListProps> = ({ recentActivity, products }) => {
  // Get product name by ID
  const getProductName = (productId: string | null) => {
    if (!productId) return "Unknown Product";
    const product = products.find(p => p.id === productId);
    return product?.name || "Unknown Product";
  };

  return (
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
  );
};

export default RecentActivityList;
