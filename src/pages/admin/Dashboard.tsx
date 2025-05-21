
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, Package, MousePointer, ArrowUp, ArrowDown } from 'lucide-react';

const Dashboard = () => {
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
            <CardTitle className="text-3xl">10</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-green-600">
                <ArrowUp className="h-4 w-4 mr-1" />
                <span>2 new this month</span>
              </div>
              <Package className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
        
        {/* Clicks Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Clicks</CardDescription>
            <CardTitle className="text-3xl">324</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-green-600">
                <ArrowUp className="h-4 w-4 mr-1" />
                <span>18% from last week</span>
              </div>
              <MousePointer className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
        
        {/* Conversion Rate Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Conversion Rate</CardDescription>
            <CardTitle className="text-3xl">5.2%</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-red-600">
                <ArrowDown className="h-4 w-4 mr-1" />
                <span>0.5% from last week</span>
              </div>
              <ArrowUpRight className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
        
        {/* Revenue Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Estimated Revenue</CardDescription>
            <CardTitle className="text-3xl">$1,245</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-green-600">
                <ArrowUp className="h-4 w-4 mr-1" />
                <span>12% from last month</span>
              </div>
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold">
                $
              </div>
            </div>
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
              {[
                { name: "Natural Quercetin Complex", brand: "PureSci Nutrition", clicks: 124 },
                { name: "Quercetin Plus Bromelain", brand: "Vitality Research", clicks: 98 },
                { name: "Advanced Quercetin 500mg", brand: "Optimal Health", clicks: 72 },
                { name: "Quercetin with Vitamin C", brand: "NutriPure", clicks: 53 },
                { name: "Quercetin Advanced Formula", brand: "VitaLabs", clicks: 41 }
              ].map((product, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div>
                    <div className="font-medium">{product.name}</div>
                    <div className="text-sm text-gray-500">{product.brand}</div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-sm font-medium">{product.clicks} clicks</div>
                    <div className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-green-500' : i < 3 ? 'bg-amber-500' : 'bg-gray-300'}`}></div>
                  </div>
                </div>
              ))}
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
              {[
                { type: "click", product: "Natural Quercetin Complex", time: "5 minutes ago" },
                { type: "update", product: "Quercetin Plus Bromelain", time: "1 hour ago" },
                { type: "click", product: "Advanced Quercetin 500mg", time: "2 hours ago" },
                { type: "click", product: "Natural Quercetin Complex", time: "3 hours ago" },
                { type: "update", product: "Quercetin with Vitamin C", time: "5 hours ago" }
              ].map((activity, i) => (
                <div key={i} className="flex items-start">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center mr-3 flex-shrink-0 ${
                    activity.type === "click" ? "bg-blue-100 text-blue-600" : "bg-purple-100 text-purple-600"
                  }`}>
                    {activity.type === "click" ? <MousePointer className="h-4 w-4" /> : <Package className="h-4 w-4" />}
                  </div>
                  <div>
                    <div className="flex items-center">
                      <span className="font-medium">{activity.product}</span>
                      <span className="mx-2 text-gray-500">•</span>
                      <span className="text-sm text-gray-500">{activity.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {activity.type === "click" 
                        ? "Product affiliate link was clicked" 
                        : "Product information was updated"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
