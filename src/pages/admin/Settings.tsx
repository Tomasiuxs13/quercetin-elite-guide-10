
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Globe, 
  ShieldAlert, 
  BarChart3, 
  Mail, 
  Save, 
  FileText,
  RefreshCw
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';

const Settings = () => {
  // Site settings state
  const [siteSettings, setSiteSettings] = React.useState({
    siteName: 'Quercetin Guide',
    siteDescription: 'Expert reviews and advice on Quercetin supplements',
    enableBlog: true,
    enableComments: true,
    maintenanceMode: false
  });

  // Analytics settings state
  const [analyticsSettings, setAnalyticsSettings] = React.useState({
    trackClicks: true,
    trackPromotions: true,
    anonymizeIp: true,
    dataRetentionDays: 90
  });

  // Email settings state
  const [emailSettings, setEmailSettings] = React.useState({
    notifyOnPurchase: true,
    notifyOnComment: false,
    adminEmail: 'admin@quercetinguide.com',
    emailFooter: 'Thanks for using Quercetin Guide'
  });

  // Meta data settings
  const [metaDataSettings, setMetaDataSettings] = React.useState({
    defaultTitle: 'Quercetin Guide: Find the Best Supplements',
    defaultDescription: 'Expert reviews and scientific advice to help you choose the best quercetin supplements for your health needs.',
    defaultKeywords: 'quercetin, supplements, immune support, flavonoids, antioxidants',
    ogImageUrl: 'https://example.com/og-image.jpg'
  });
  
  // Handle form submissions
  const handleSiteSettingsSave = () => {
    toast({
      title: "Site Settings Saved",
      description: "Your site settings have been updated successfully.",
    });
  };
  
  const handleAnalyticsSave = () => {
    toast({
      title: "Analytics Settings Saved",
      description: "Your analytics preferences have been updated.",
    });
  };
  
  const handleEmailSettingsSave = () => {
    toast({
      title: "Email Settings Saved",
      description: "Your email notification settings have been updated.",
    });
  };
  
  const handleMetaDataSave = () => {
    toast({
      title: "SEO Settings Saved",
      description: "Your SEO metadata settings have been updated.",
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Settings</h1>
      
      <Tabs defaultValue="site" className="space-y-8">
        <TabsList className="grid grid-cols-4 w-full max-w-3xl">
          <TabsTrigger value="site" className="flex items-center gap-2">
            <Globe className="h-4 w-4" /> Site
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" /> Analytics
          </TabsTrigger>
          <TabsTrigger value="email" className="flex items-center gap-2">
            <Mail className="h-4 w-4" /> Email
          </TabsTrigger>
          <TabsTrigger value="seo" className="flex items-center gap-2">
            <FileText className="h-4 w-4" /> SEO
          </TabsTrigger>
        </TabsList>
        
        {/* Site Settings */}
        <TabsContent value="site">
          <Card>
            <CardHeader>
              <CardTitle>Site Settings</CardTitle>
              <CardDescription>
                Manage the general settings for your website
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="siteName">Site Name</Label>
                    <Input 
                      id="siteName" 
                      value={siteSettings.siteName}
                      onChange={(e) => setSiteSettings({...siteSettings, siteName: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="siteDescription">Site Description</Label>
                    <Input 
                      id="siteDescription" 
                      value={siteSettings.siteDescription}
                      onChange={(e) => setSiteSettings({...siteSettings, siteDescription: e.target.value})}
                    />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Features</h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Enable Blog</h4>
                    <p className="text-sm text-gray-500">Allow blog posts and articles on the site</p>
                  </div>
                  <Switch 
                    checked={siteSettings.enableBlog}
                    onCheckedChange={(checked) => setSiteSettings({...siteSettings, enableBlog: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Enable Comments</h4>
                    <p className="text-sm text-gray-500">Allow users to comment on blog posts and products</p>
                  </div>
                  <Switch 
                    checked={siteSettings.enableComments}
                    onCheckedChange={(checked) => setSiteSettings({...siteSettings, enableComments: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-red-600">Maintenance Mode</h4>
                    <p className="text-sm text-gray-500">Temporarily disable the site for maintenance</p>
                  </div>
                  <Switch 
                    checked={siteSettings.maintenanceMode}
                    onCheckedChange={(checked) => setSiteSettings({...siteSettings, maintenanceMode: checked})}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSiteSettingsSave} className="gap-2">
                <Save className="h-4 w-4" /> Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Analytics Settings */}
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Analytics Settings</CardTitle>
              <CardDescription>
                Configure how user data and interactions are tracked
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Track Product Clicks</h4>
                    <p className="text-sm text-gray-500">Monitor when users click on affiliate links</p>
                  </div>
                  <Switch 
                    checked={analyticsSettings.trackClicks}
                    onCheckedChange={(checked) => setAnalyticsSettings({...analyticsSettings, trackClicks: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Track Promotional Areas</h4>
                    <p className="text-sm text-gray-500">Record which promotional sections drive conversions</p>
                  </div>
                  <Switch 
                    checked={analyticsSettings.trackPromotions}
                    onCheckedChange={(checked) => setAnalyticsSettings({...analyticsSettings, trackPromotions: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Anonymize IP Addresses</h4>
                    <p className="text-sm text-gray-500">Enhance user privacy by anonymizing IPs</p>
                  </div>
                  <Switch 
                    checked={analyticsSettings.anonymizeIp}
                    onCheckedChange={(checked) => setAnalyticsSettings({...analyticsSettings, anonymizeIp: checked})}
                  />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label htmlFor="dataRetention">Data Retention (Days)</Label>
                <Input 
                  id="dataRetention" 
                  type="number" 
                  value={analyticsSettings.dataRetentionDays}
                  onChange={(e) => setAnalyticsSettings({
                    ...analyticsSettings, 
                    dataRetentionDays: parseInt(e.target.value) || 0
                  })}
                />
                <p className="text-xs text-gray-500">Set to 0 for unlimited retention</p>
              </div>
              
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-md flex items-start gap-3">
                <ShieldAlert className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-amber-800">GDPR Compliance</h4>
                  <p className="text-sm text-amber-700">Ensure your analytics settings comply with local privacy laws and regulations.</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" className="gap-2">
                <RefreshCw className="h-4 w-4" /> Clear Analytics Data
              </Button>
              <Button onClick={handleAnalyticsSave} className="gap-2">
                <Save className="h-4 w-4" /> Save Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Email Settings */}
        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>
                Configure when and how you receive email notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="adminEmail">Admin Email Address</Label>
                  <Input 
                    id="adminEmail" 
                    type="email"
                    value={emailSettings.adminEmail}
                    onChange={(e) => setEmailSettings({...emailSettings, adminEmail: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="emailFooter">Email Footer Text</Label>
                  <Input 
                    id="emailFooter"
                    value={emailSettings.emailFooter}
                    onChange={(e) => setEmailSettings({...emailSettings, emailFooter: e.target.value})}
                  />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notification Preferences</h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Purchase Notifications</h4>
                    <p className="text-sm text-gray-500">Get notified when users make a purchase through affiliate links</p>
                  </div>
                  <Switch 
                    checked={emailSettings.notifyOnPurchase}
                    onCheckedChange={(checked) => setEmailSettings({...emailSettings, notifyOnPurchase: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Comment Notifications</h4>
                    <p className="text-sm text-gray-500">Get notified when users comment on your content</p>
                  </div>
                  <Switch 
                    checked={emailSettings.notifyOnComment}
                    onCheckedChange={(checked) => setEmailSettings({...emailSettings, notifyOnComment: checked})}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleEmailSettingsSave} className="gap-2">
                <Save className="h-4 w-4" /> Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* SEO Settings */}
        <TabsContent value="seo">
          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
              <CardDescription>
                Optimize your content for search engines
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="defaultTitle">Default Page Title</Label>
                  <Input 
                    id="defaultTitle" 
                    value={metaDataSettings.defaultTitle}
                    onChange={(e) => setMetaDataSettings({...metaDataSettings, defaultTitle: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="defaultDescription">Default Meta Description</Label>
                  <Input 
                    id="defaultDescription" 
                    value={metaDataSettings.defaultDescription}
                    onChange={(e) => setMetaDataSettings({...metaDataSettings, defaultDescription: e.target.value})}
                  />
                  <p className="text-xs text-gray-500">Recommended length: 120-160 characters</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="defaultKeywords">Default Keywords</Label>
                  <Input 
                    id="defaultKeywords" 
                    value={metaDataSettings.defaultKeywords}
                    onChange={(e) => setMetaDataSettings({...metaDataSettings, defaultKeywords: e.target.value})}
                  />
                  <p className="text-xs text-gray-500">Comma-separated list of keywords</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="ogImage">Default Social Media Image URL</Label>
                  <Input 
                    id="ogImage" 
                    value={metaDataSettings.ogImageUrl}
                    onChange={(e) => setMetaDataSettings({...metaDataSettings, ogImageUrl: e.target.value})}
                  />
                  <p className="text-xs text-gray-500">Used when your content is shared on social media</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleMetaDataSave} className="gap-2">
                <Save className="h-4 w-4" /> Save SEO Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
