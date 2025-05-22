
// Format time ago for dashboard displays
export function formatTimeAgo(date: Date) {
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

// Calculate conversion rate based on clicks data
export function calculateConversionRate(clicksData: any[] | undefined) {
  if (!clicksData || clicksData.length === 0) return 5.2; // Default value if no data
  
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  
  // Get clicks from the last 24 hours
  const recentClicks = clicksData.filter(click => {
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
}

// Calculate estimated revenue based on conversion rate
export function calculateEstimatedRevenue(totalClicks: number, conversionRate: number) {
  const AVERAGE_ORDER_VALUE = 24.99; // Average order value  
  return (totalClicks * (conversionRate / 100) * AVERAGE_ORDER_VALUE).toFixed(2);
}

// Get top products by clicks
export function getTopProducts(clicksData: any[] | undefined) {
  if (!clicksData || clicksData.length === 0) return [];
  
  const productClicks: Record<string, number> = {};
  
  clicksData.forEach(click => {
    if (click.product_id) {
      productClicks[click.product_id] = (productClicks[click.product_id] || 0) + 1;
    }
  });
  
  return Object.entries(productClicks)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([productId, clicks]) => ({ productId, clicks }));
}

// Get recent activity from clicks and promotion data
export function getRecentActivity(clicksData: any[] | undefined, promotionClicksData: any[] | undefined) {
  if ((!clicksData || clicksData.length === 0) && (!promotionClicksData || promotionClicksData.length === 0)) {
    return [];
  }
  
  const allActivity = [
    ...(clicksData || []).map(click => ({
      type: "click" as const,
      productId: click.product_id,
      time: new Date(click.clicked_at),
      source: click.source || 'unknown'
    })),
    ...(promotionClicksData || []).map((promo: any) => ({
      type: "promotion" as const,
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
}

// Get percentage change for clicks
export function getClicksPercentageChange(clicksData: any[] | undefined) {
  if (!clicksData || clicksData.length === 0) return 0;
  
  const totalClicks = clicksData.length;
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  
  // Count clicks from last week
  const lastWeekClicks = clicksData.filter(click => {
    const clickDate = new Date(click.clicked_at);
    return clickDate >= oneWeekAgo;
  }).length || 0;
  
  // Simple percentage calculation for demo purposes
  const totalPreviousClicks = totalClicks - lastWeekClicks;
  if (totalPreviousClicks === 0) return 100; // If no previous clicks, consider it 100% growth
  
  return Math.round((lastWeekClicks / totalPreviousClicks) * 100);
}

// Get new products this month
export function getNewProductsThisMonth(products: any[] | undefined) {
  if (!products || products.length === 0) return 0;
  
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  
  return products.filter(product => {
    const createdAt = new Date(product.created_at);
    return createdAt >= oneMonthAgo;
  }).length || 0;
}
