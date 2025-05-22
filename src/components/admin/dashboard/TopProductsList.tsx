
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Product {
  id: string;
  name: string;
  brand?: string;
  [key: string]: any;
}

interface TopProductsListProps {
  topProducts: Array<{ productId: string; clicks: number }>;
  products: Product[];
}

const TopProductsList: React.FC<TopProductsListProps> = ({ topProducts, products }) => {
  // Get product name by ID
  const getProductName = (productId: string | null) => {
    if (!productId) return "Unknown Product";
    const product = products.find(p => p.id === productId);
    return product?.name || "Unknown Product";
  };

  return (
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
  );
};

export default TopProductsList;
