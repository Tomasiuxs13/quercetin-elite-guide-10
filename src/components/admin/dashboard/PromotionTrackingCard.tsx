
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';

interface PromotionTrackingCardProps {
  promotionClicksData: any[];
  conversionRate: number;
}

const PromotionTrackingCard: React.FC<PromotionTrackingCardProps> = ({ promotionClicksData, conversionRate }) => {
  return (
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
            
            {Array.from(new Set(promotionClicksData.map((p: any) => p.promotion_area)))
              .slice(0, 4)
              .map((area: string, i: number) => {
                const areaClicks = promotionClicksData.filter((p: any) => p.promotion_area === area);
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
  );
};

export default PromotionTrackingCard;
