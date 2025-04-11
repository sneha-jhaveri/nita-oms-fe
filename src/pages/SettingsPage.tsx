
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bell, 
  CreditCard, 
  GlobeIcon, 
  HelpCircleIcon, 
  KeyIcon, 
  MailIcon, 
  MessageSquareIcon, 
  SaveIcon, 
  ServerIcon,
  Settings, 
  Smartphone, 
  ShieldCheck,
  UserIcon,
  Building2,
  BellRing,
  Calendar,
  Smartphone as PhoneIcon,
  Truck,
  DatabaseIcon
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { PlusIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="api">API & Integrations</TabsTrigger>
          </TabsList>

          {/* General Settings Tab */}
          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
                <CardDescription>
                  Update your company details and contact information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company-name">Company Name</Label>
                    <Input id="company-name" defaultValue="Nita Kitchen" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company-website">Website</Label>
                    <Input id="company-website" defaultValue="www.nitakitchen.com" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company-email">Email Address</Label>
                    <Input id="company-email" defaultValue="contact@nitakitchen.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company-phone">Phone Number</Label>
                    <Input id="company-phone" defaultValue="+91 98765 43210" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-address">Registered Address</Label>
                  <Textarea id="company-address" defaultValue="123 Business Park, Sector 5, Delhi, India - 110001" />
                </div>
              </CardContent>
              <CardFooter className="justify-end">
                <Button variant="outline" className="mr-2">Cancel</Button>
                <Button>
                  <SaveIcon className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Interface Preferences</CardTitle>
                <CardDescription>
                  Customize how the application looks and behaves
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-medium">Date Format</Label>
                    <p className="text-sm text-muted-foreground">
                      Choose how dates are displayed throughout the application
                    </p>
                  </div>
                  <Select defaultValue="dd-mm-yyyy">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Date Format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dd-mm-yyyy">DD-MM-YYYY</SelectItem>
                      <SelectItem value="mm-dd-yyyy">MM-DD-YYYY</SelectItem>
                      <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-medium">Time Format</Label>
                    <p className="text-sm text-muted-foreground">
                      Choose your preferred time format
                    </p>
                  </div>
                  <RadioGroup defaultValue="12" className="flex items-center gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="12" id="time-12" />
                      <Label htmlFor="time-12">12 Hour</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="24" id="time-24" />
                      <Label htmlFor="time-24">24 Hour</Label>
                    </div>
                  </RadioGroup>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auto-refresh" className="font-medium">Auto Refresh</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically refresh order status and data
                    </p>
                  </div>
                  <Switch id="auto-refresh" defaultChecked />
                </div>
              </CardContent>
              <CardFooter className="justify-end">
                <Button variant="outline" className="mr-2">Cancel</Button>
                <Button>
                  <SaveIcon className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Manage when and how you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium flex items-center">
                      <Bell className="mr-2 h-4 w-4" />
                      Order Notifications
                    </h3>
                    <Separator className="my-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="font-medium">New Orders</Label>
                        <p className="text-sm text-muted-foreground">
                          Notification when new orders are received
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Label htmlFor="new-orders-email">Email</Label>
                          <Switch id="new-orders-email" defaultChecked />
                        </div>
                        <div className="flex items-center gap-2">
                          <Label htmlFor="new-orders-push">Push</Label>
                          <Switch id="new-orders-push" defaultChecked />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="font-medium">Order Status Updates</Label>
                        <p className="text-sm text-muted-foreground">
                          Notification when an order status changes
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Label htmlFor="order-updates-email">Email</Label>
                          <Switch id="order-updates-email" defaultChecked />
                        </div>
                        <div className="flex items-center gap-2">
                          <Label htmlFor="order-updates-push">Push</Label>
                          <Switch id="order-updates-push" defaultChecked />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="font-medium">Return Requests</Label>
                        <p className="text-sm text-muted-foreground">
                          Notification when a customer requests a return
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Label htmlFor="return-email">Email</Label>
                          <Switch id="return-email" defaultChecked />
                        </div>
                        <div className="flex items-center gap-2">
                          <Label htmlFor="return-push">Push</Label>
                          <Switch id="return-push" defaultChecked />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium flex items-center">
                      <BellRing className="mr-2 h-4 w-4" />
                      System Notifications
                    </h3>
                    <Separator className="my-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="font-medium">Low Inventory Alerts</Label>
                        <p className="text-sm text-muted-foreground">
                          Notification when product inventory is low
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Label htmlFor="inventory-email">Email</Label>
                          <Switch id="inventory-email" defaultChecked />
                        </div>
                        <div className="flex items-center gap-2">
                          <Label htmlFor="inventory-push">Push</Label>
                          <Switch id="inventory-push" defaultChecked />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="font-medium">Courier Updates</Label>
                        <p className="text-sm text-muted-foreground">
                          Notification for shipping status changes
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Label htmlFor="courier-email">Email</Label>
                          <Switch id="courier-email" defaultChecked />
                        </div>
                        <div className="flex items-center gap-2">
                          <Label htmlFor="courier-push">Push</Label>
                          <Switch id="courier-push" defaultChecked />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-end">
                <Button variant="outline" className="mr-2">Cancel</Button>
                <Button>
                  <SaveIcon className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Email Notification Settings</CardTitle>
                <CardDescription>
                  Configure who receives email notifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Email Recipients</Label>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="flex items-center gap-1 px-2 py-1">
                        operations@nitakitchen.com
                        <Button variant="ghost" size="icon" className="h-4 w-4 rounded-full">
                          ×
                        </Button>
                      </Badge>
                      <Badge className="flex items-center gap-1 px-2 py-1">
                        shipping@nitakitchen.com
                        <Button variant="ghost" size="icon" className="h-4 w-4 rounded-full">
                          ×
                        </Button>
                      </Badge>
                      <Button variant="outline" size="sm" className="h-7 gap-1">
                        <PlusIcon className="h-3.5 w-3.5" />
                        Add Email
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="daily-digest">Daily Digest Email</Label>
                    <Select defaultValue="yes">
                      <SelectTrigger>
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes, send daily summary</SelectItem>
                        <SelectItem value="weekdays">Only on weekdays</SelectItem>
                        <SelectItem value="no">No, don't send</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">
                      Receive a daily summary of all activity at 6:00 PM
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-end">
                <Button variant="outline" className="mr-2">Cancel</Button>
                <Button>
                  <SaveIcon className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Shipping Tab */}
          <TabsContent value="shipping" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Shipping Partners</CardTitle>
                <CardDescription>
                  Manage your courier integrations and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <Truck className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Delhivery</h3>
                        <p className="text-sm text-muted-foreground">
                          API Integration Active
                        </p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <Truck className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">BlueDart</h3>
                        <p className="text-sm text-muted-foreground">
                          API Integration Active
                        </p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <Truck className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">DTDC</h3>
                        <p className="text-sm text-muted-foreground">
                          API Integration Active
                        </p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                        <Truck className="h-5 w-5 text-gray-400" />
                      </div>
                      <div>
                        <h3 className="font-medium">Ecom Express</h3>
                        <p className="text-sm text-muted-foreground">
                          Not Connected
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <PlusIcon className="mr-2 h-4 w-4" />
                      Connect
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-end">
                <Button>
                  <Settings className="mr-2 h-4 w-4" />
                  Configure Partners
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Default Shipping Settings</CardTitle>
                <CardDescription>
                  Configure default shipping options for new orders
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="default-courier">Default Courier</Label>
                    <Select defaultValue="delhivery">
                      <SelectTrigger id="default-courier">
                        <SelectValue placeholder="Select courier" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="delhivery">Delhivery</SelectItem>
                        <SelectItem value="bluedart">BlueDart</SelectItem>
                        <SelectItem value="dtdc">DTDC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="shipping-mode">Default Shipping Mode</Label>
                    <Select defaultValue="surface">
                      <SelectTrigger id="shipping-mode">
                        <SelectValue placeholder="Select mode" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="surface">Surface</SelectItem>
                        <SelectItem value="express">Express</SelectItem>
                        <SelectItem value="premium">Premium</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rto-address">Return to Origin Address</Label>
                  <Textarea 
                    id="rto-address" 
                    defaultValue="Nita Kitchen, Warehouse #5, Industrial Area Phase 2, Delhi - 110001"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-medium">Auto-generate AWB</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically generate AWB when order status is ready for shipping
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
              <CardFooter className="justify-end">
                <Button variant="outline" className="mr-2">Cancel</Button>
                <Button>
                  <SaveIcon className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Billing Information</CardTitle>
                <CardDescription>
                  Update your billing details and payment methods
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="billing-name">Billing Name</Label>
                    <Input id="billing-name" defaultValue="Nita Kitchen Pvt Ltd" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gstin">GSTIN</Label>
                    <Input id="gstin" defaultValue="29ABCDE1234F1Z5" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="billing-address">Billing Address</Label>
                  <Textarea 
                    id="billing-address" 
                    defaultValue="123 Business Park, Sector 5, Delhi, India - 110001"
                  />
                </div>

                <h3 className="font-medium pt-2">Payment Methods</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between border rounded-md p-3">
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-5 w-5 text-blue-600" />
                      <div>
                        <h4 className="font-medium">HDFC Credit Card</h4>
                        <p className="text-sm text-muted-foreground">Ending in 4242</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge>Default</Badge>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border rounded-md p-3">
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-5 w-5 text-gray-500" />
                      <div>
                        <h4 className="font-medium">ICICI Bank</h4>
                        <p className="text-sm text-muted-foreground">Ending in 8888</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Make Default</Button>
                  </div>
                  <div className="flex justify-center py-2">
                    <Button variant="outline">
                      <PlusIcon className="mr-2 h-4 w-4" />
                      Add Payment Method
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Subscription Plan</CardTitle>
                <CardDescription>
                  Manage your subscription and usage details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between border rounded-md p-4 bg-primary/5">
                  <div>
                    <h3 className="font-medium text-lg">Business Plan</h3>
                    <p className="text-sm text-muted-foreground">
                      ₹15,000/month, renews on May 11, 2025
                    </p>
                  </div>
                  <Button variant="outline">Upgrade</Button>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">Current Usage</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="text-sm">Orders</p>
                      <p className="text-sm font-medium">1,234 / 2,000</p>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div className="bg-primary h-full rounded-full" style={{ width: '62%' }}></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm">API Calls</p>
                      <p className="text-sm font-medium">45,678 / 100,000</p>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div className="bg-primary h-full rounded-full" style={{ width: '45%' }}></div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline">View Billing History</Button>
                  <Button variant="ghost" className="text-red-500 hover:text-red-500 hover:bg-red-50">
                    Cancel Subscription
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* API & Integrations Tab */}
          <TabsContent value="api" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>API Keys</CardTitle>
                <CardDescription>
                  Manage your API keys for connecting external services
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between border rounded-md p-3">
                    <div>
                      <h4 className="font-medium">Production API Key</h4>
                      <p className="text-sm text-muted-foreground">
                        Last used 2 hours ago
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input 
                        value="••••••••••••••••••••••••"
                        className="w-48 font-mono"
                        disabled
                      />
                      <Button variant="outline" size="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border rounded-md p-3">
                    <div>
                      <h4 className="font-medium">Test API Key</h4>
                      <p className="text-sm text-muted-foreground">
                        Last used 5 days ago
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input 
                        value="••••••••••••••••••••••••"
                        className="w-48 font-mono"
                        disabled
                      />
                      <Button variant="outline" size="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <Button variant="outline">
                    <PlusIcon className="mr-2 h-4 w-4" />
                    Generate New Key
                  </Button>
                  <Button variant="ghost">Revoke All Keys</Button>
                </div>

                <div className="pt-2">
                  <h3 className="font-medium">API Documentation</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Access our API documentation to integrate with our platform
                  </p>
                  <Button variant="link" className="px-0">
                    View API Documentation
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Connected Applications</CardTitle>
                <CardDescription>
                  Manage third-party applications connected to your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between border rounded-md p-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <DatabaseIcon className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Accounting System</h4>
                        <p className="text-sm text-muted-foreground">Connected on Apr 1, 2025</p>
                      </div>
                    </div>
                    <Button variant="ghost" className="text-red-500 hover:text-red-500 hover:bg-red-50">
                      Disconnect
                    </Button>
                  </div>
                  <div className="flex items-center justify-between border rounded-md p-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                        <PhoneIcon className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">SMS Gateway</h4>
                        <p className="text-sm text-muted-foreground">Connected on Mar 15, 2025</p>
                      </div>
                    </div>
                    <Button variant="ghost" className="text-red-500 hover:text-red-500 hover:bg-red-50">
                      Disconnect
                    </Button>
                  </div>
                </div>

                <div className="flex justify-center py-2">
                  <Button>
                    <PlusIcon className="mr-2 h-4 w-4" />
                    Connect Application
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default SettingsPage;
