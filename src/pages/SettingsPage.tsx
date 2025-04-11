
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  BellIcon,
  Building,
  CircleUser,
  CreditCard,
  FileText,
  KeyIcon,
  MailIcon,
  MapPin,
  Package2Icon,
  Palette,
  Save,
  ShieldIcon,
  TruckIcon,
  UserCog,
  Wallet
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("general");
  
  // Mock form states
  const [companyName, setCompanyName] = useState("Nita Kitchen Pvt. Ltd.");
  const [companyLogo, setCompanyLogo] = useState("");
  const [taxId, setTaxId] = useState("GSTIN: 22AAAAA0000A1Z5");
  const [address, setAddress] = useState("123 Business Park, Andheri East");
  const [city, setCity] = useState("Mumbai");
  const [state, setState] = useState("Maharashtra");
  const [pincode, setPincode] = useState("400053");
  const [country, setCountry] = useState("India");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [email, setEmail] = useState("hello@nitakitchen.com");
  const [website, setWebsite] = useState("https://www.nitakitchen.com");
  
  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [orderAlerts, setOrderAlerts] = useState(true);
  const [stockAlerts, setStockAlerts] = useState(true);
  const [returnsAlerts, setReturnsAlerts] = useState(true);
  const [paymentAlerts, setPaymentAlerts] = useState(false);
  const [marketingEmails, setMarketingEmails] = useState(false);

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div>
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 lg:grid-cols-6 h-auto p-1 gap-1">
              <TabsTrigger value="general" className="text-center py-2 h-auto flex flex-col items-center gap-1">
                <Building className="h-4 w-4" />
                <span>General</span>
              </TabsTrigger>
              <TabsTrigger value="profile" className="text-center py-2 h-auto flex flex-col items-center gap-1">
                <CircleUser className="h-4 w-4" />
                <span>Profile</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="text-center py-2 h-auto flex flex-col items-center gap-1">
                <BellIcon className="h-4 w-4" />
                <span>Notifications</span>
              </TabsTrigger>
              <TabsTrigger value="shipping" className="text-center py-2 h-auto flex flex-col items-center gap-1">
                <TruckIcon className="h-4 w-4" />
                <span>Shipping</span>
              </TabsTrigger>
              <TabsTrigger value="payment" className="text-center py-2 h-auto flex flex-col items-center gap-1">
                <Wallet className="h-4 w-4" />
                <span>Payment</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="text-center py-2 h-auto flex flex-col items-center gap-1">
                <ShieldIcon className="h-4 w-4" />
                <span>Security</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* General Settings */}
          <TabsContent value="general">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="col-span-1 md:col-span-2">
                <CardHeader>
                  <CardTitle>Company Details</CardTitle>
                  <CardDescription>
                    Update your company information and business details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4">
                    <div>
                      <Label htmlFor="company-name">Company Name</Label>
                      <Input 
                        id="company-name" 
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="tax-id">Tax ID (GSTIN)</Label>
                      <Input 
                        id="tax-id" 
                        value={taxId}
                        onChange={(e) => setTaxId(e.target.value)}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="company-email">Email</Label>
                        <Input 
                          id="company-email" 
                          type="email" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>

                      <div>
                        <Label htmlFor="company-phone">Phone</Label>
                        <Input 
                          id="company-phone" 
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="company-website">Website</Label>
                      <Input 
                        id="company-website" 
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-5">
                  <Button variant="outline">Reset</Button>
                  <Button>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>

              <Card className="md:row-span-2">
                <CardHeader>
                  <CardTitle>System Preferences</CardTitle>
                  <CardDescription>
                    Configure system-wide settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="date-format">Date Format</Label>
                      <Select defaultValue="dd-mm-yyyy">
                        <SelectTrigger>
                          <SelectValue placeholder="Select a format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dd-mm-yyyy">DD-MM-YYYY</SelectItem>
                          <SelectItem value="mm-dd-yyyy">MM-DD-YYYY</SelectItem>
                          <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select defaultValue="asia-kolkata">
                        <SelectTrigger>
                          <SelectValue placeholder="Select a timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="asia-kolkata">Asia/Kolkata (IST)</SelectItem>
                          <SelectItem value="utc">UTC</SelectItem>
                          <SelectItem value="america-new_york">America/New_York (EST)</SelectItem>
                          <SelectItem value="europe-london">Europe/London (GMT)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="currency">Currency</Label>
                      <Select defaultValue="inr">
                        <SelectTrigger>
                          <SelectValue placeholder="Select a currency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="inr">Indian Rupee (₹)</SelectItem>
                          <SelectItem value="usd">US Dollar ($)</SelectItem>
                          <SelectItem value="eur">Euro (€)</SelectItem>
                          <SelectItem value="gbp">British Pound (£)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch id="auto-backup" defaultChecked />
                      <Label htmlFor="auto-backup">Automatic backups</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch id="analytics" defaultChecked />
                      <Label htmlFor="analytics">Usage analytics</Label>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="justify-between border-t pt-5">
                  <Button variant="outline">Reset</Button>
                  <Button>
                    <Save className="mr-2 h-4 w-4" />
                    Save Preferences
                  </Button>
                </CardFooter>
              </Card>

              <Card className="col-span-1 md:col-span-2">
                <CardHeader>
                  <CardTitle>Business Address</CardTitle>
                  <CardDescription>
                    Update your business address and location details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4">
                    <div>
                      <Label htmlFor="address">Street Address</Label>
                      <Textarea 
                        id="address" 
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        rows={3}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input 
                          id="city" 
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                        />
                      </div>

                      <div>
                        <Label htmlFor="state">State</Label>
                        <Input 
                          id="state" 
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="pincode">Pincode</Label>
                        <Input 
                          id="pincode" 
                          value={pincode}
                          onChange={(e) => setPincode(e.target.value)}
                        />
                      </div>

                      <div>
                        <Label htmlFor="country">Country</Label>
                        <Input 
                          id="country" 
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="justify-between border-t pt-5">
                  <Button variant="outline">Reset</Button>
                  <Button>
                    <MapPin className="mr-2 h-4 w-4" />
                    Update Address
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          {/* Profile Settings */}
          <TabsContent value="profile">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Update your personal details and account information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="first-name">First Name</Label>
                        <Input id="first-name" defaultValue="Rajesh" />
                      </div>
                      
                      <div>
                        <Label htmlFor="last-name">Last Name</Label>
                        <Input id="last-name" defaultValue="Kumar" />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="display-name">Display Name</Label>
                      <Input id="display-name" defaultValue="Rajesh K." />
                      <p className="text-sm text-muted-foreground mt-1">
                        This is how your name will appear to other users.
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="rajesh@nitakitchen.com" />
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" defaultValue="+91 98765 43210" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="justify-between border-t pt-5">
                  <Button variant="outline">Cancel</Button>
                  <Button>
                    <UserCog className="mr-2 h-4 w-4" />
                    Update Profile
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription>
                    Update your password to keep your account secure
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4">
                    <div>
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    
                    <div>
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    
                    <div>
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="justify-between border-t pt-5">
                  <Button variant="outline">Cancel</Button>
                  <Button>
                    <KeyIcon className="mr-2 h-4 w-4" />
                    Change Password
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          {/* Notifications Settings */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Configure how and when you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium">Email Notifications</h3>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications via email
                      </p>
                    </div>
                    <Switch 
                      checked={emailNotifications} 
                      onCheckedChange={setEmailNotifications}
                    />
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="order-alerts" className="flex flex-col gap-1">
                        <span>Order Alerts</span>
                        <span className="font-normal text-xs text-muted-foreground">
                          New orders, status updates, and cancellations
                        </span>
                      </Label>
                      <Switch 
                        id="order-alerts" 
                        checked={orderAlerts} 
                        onCheckedChange={setOrderAlerts}
                        disabled={!emailNotifications}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="stock-alerts" className="flex flex-col gap-1">
                        <span>Inventory Alerts</span>
                        <span className="font-normal text-xs text-muted-foreground">
                          Low stock notifications and inventory changes
                        </span>
                      </Label>
                      <Switch 
                        id="stock-alerts" 
                        checked={stockAlerts} 
                        onCheckedChange={setStockAlerts}
                        disabled={!emailNotifications}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="returns-alerts" className="flex flex-col gap-1">
                        <span>Returns & RTO Alerts</span>
                        <span className="font-normal text-xs text-muted-foreground">
                          Return requests and RTO notifications
                        </span>
                      </Label>
                      <Switch 
                        id="returns-alerts" 
                        checked={returnsAlerts} 
                        onCheckedChange={setReturnsAlerts}
                        disabled={!emailNotifications}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="payment-alerts" className="flex flex-col gap-1">
                        <span>Payment Alerts</span>
                        <span className="font-normal text-xs text-muted-foreground">
                          Payment confirmations and failures
                        </span>
                      </Label>
                      <Switch 
                        id="payment-alerts" 
                        checked={paymentAlerts} 
                        onCheckedChange={setPaymentAlerts}
                        disabled={!emailNotifications}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="marketing-emails" className="flex flex-col gap-1">
                        <span>Marketing & Updates</span>
                        <span className="font-normal text-xs text-muted-foreground">
                          Product updates and marketing communications
                        </span>
                      </Label>
                      <Switch 
                        id="marketing-emails" 
                        checked={marketingEmails} 
                        onCheckedChange={setMarketingEmails}
                        disabled={!emailNotifications}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-between border-t pt-5">
                <Button variant="outline">Reset to Defaults</Button>
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Save Preferences
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Shipping Settings */}
          <TabsContent value="shipping">
            <Card>
              <CardHeader>
                <CardTitle>Shipping Settings</CardTitle>
                <CardDescription>
                  Configure shipping options and courier integrations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Preferred Couriers</h3>
                  
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <TruckIcon className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Delhivery</p>
                          <p className="text-sm text-muted-foreground">Default for North & West India</p>
                        </div>
                      </div>
                      <Switch defaultChecked id="delhivery" />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <TruckIcon className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">BlueDart</p>
                          <p className="text-sm text-muted-foreground">Default for South India</p>
                        </div>
                      </div>
                      <Switch defaultChecked id="bluedart" />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <TruckIcon className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">DTDC</p>
                          <p className="text-sm text-muted-foreground">Default for East India</p>
                        </div>
                      </div>
                      <Switch id="dtdc" />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <TruckIcon className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Xpressbees</p>
                          <p className="text-sm text-muted-foreground">Secondary option for all regions</p>
                        </div>
                      </div>
                      <Switch defaultChecked id="xpressbees" />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Default Packaging Preferences</h3>
                  
                  <RadioGroup defaultValue="eco" className="space-y-3">
                    <div className="flex items-center space-x-3 rounded-md border p-3">
                      <RadioGroupItem value="eco" id="eco" />
                      <Label htmlFor="eco" className="flex-1">
                        <span className="font-medium">Eco-friendly Packaging</span>
                        <span className="block text-sm text-muted-foreground">
                          Biodegradable materials, minimal plastic
                        </span>
                      </Label>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">+₹15 per order</span>
                    </div>
                    
                    <div className="flex items-center space-x-3 rounded-md border p-3">
                      <RadioGroupItem value="standard" id="standard" />
                      <Label htmlFor="standard" className="flex-1">
                        <span className="font-medium">Standard Packaging</span>
                        <span className="block text-sm text-muted-foreground">
                          Regular cardboard boxes and bubble wrap
                        </span>
                      </Label>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">+₹5 per order</span>
                    </div>
                    
                    <div className="flex items-center space-x-3 rounded-md border p-3">
                      <RadioGroupItem value="premium" id="premium" />
                      <Label htmlFor="premium" className="flex-1">
                        <span className="font-medium">Premium Packaging</span>
                        <span className="block text-sm text-muted-foreground">
                          High-quality branded boxes and materials
                        </span>
                      </Label>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">+₹25 per order</span>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
              <CardFooter className="justify-between border-t pt-5">
                <Button variant="outline">Reset to Defaults</Button>
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Save Shipping Settings
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Payment Settings */}
          <TabsContent value="payment">
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>
                  Manage your payment methods and billing preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Connected Payment Gateways</h3>
                  
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <CreditCard className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Razorpay</p>
                          <p className="text-sm text-muted-foreground">Connected on Apr 10, 2025</p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <CreditCard className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">PayU</p>
                          <p className="text-sm text-muted-foreground">Connected on Feb 23, 2025</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="border-gray-500 text-gray-800">Inactive</Badge>
                    </div>
                    
                    <Separator />
                    
                    <Button variant="outline" className="flex items-center gap-2">
                      <PlusIcon className="h-4 w-4" />
                      Add Payment Gateway
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Supported Payment Methods</h3>
                  
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="enable-cards">
                        Credit/Debit Cards
                      </Label>
                      <Switch defaultChecked id="enable-cards" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="enable-upi">
                        UPI
                      </Label>
                      <Switch defaultChecked id="enable-upi" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="enable-netbanking">
                        Netbanking
                      </Label>
                      <Switch defaultChecked id="enable-netbanking" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="enable-wallet">
                        Wallets
                      </Label>
                      <Switch defaultChecked id="enable-wallet" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="enable-cod">
                        Cash on Delivery
                      </Label>
                      <Switch id="enable-cod" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="enable-bnpl">
                        Buy Now Pay Later
                      </Label>
                      <Switch id="enable-bnpl" />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-between border-t pt-5">
                <Button variant="outline">Reset</Button>
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Save Payment Settings
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Login Security</CardTitle>
                  <CardDescription>
                    Configure authentication and security options
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium">Two-Factor Authentication</h3>
                        <p className="text-sm text-muted-foreground">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <Switch id="enable-2fa" />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium">Session Timeout</h3>
                        <p className="text-sm text-muted-foreground">
                          Automatically log out after a period of inactivity
                        </p>
                      </div>
                      <Select defaultValue="30">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select timeout" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 minutes</SelectItem>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="60">1 hour</SelectItem>
                          <SelectItem value="120">2 hours</SelectItem>
                          <SelectItem value="never">Never timeout</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium">Failed Login Attempts</h3>
                        <p className="text-sm text-muted-foreground">
                          Lock account after multiple failed login attempts
                        </p>
                      </div>
                      <Select defaultValue="5">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select limit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3">3 attempts</SelectItem>
                          <SelectItem value="5">5 attempts</SelectItem>
                          <SelectItem value="10">10 attempts</SelectItem>
                          <SelectItem value="disabled">Disabled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="justify-between border-t pt-5">
                  <Button variant="outline">Reset</Button>
                  <Button>
                    <Save className="mr-2 h-4 w-4" />
                    Save Security Settings
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Password Policy</CardTitle>
                  <CardDescription>
                    Set requirements for user passwords
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="min-length" className="text-sm">
                        Minimum Password Length
                      </Label>
                      <Select defaultValue="8">
                        <SelectTrigger className="w-[100px]">
                          <SelectValue placeholder="Length" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="6">6</SelectItem>
                          <SelectItem value="8">8</SelectItem>
                          <SelectItem value="10">10</SelectItem>
                          <SelectItem value="12">12</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Password Requirements</h3>
                      
                      <div className="flex items-center space-x-2">
                        <Switch id="require-uppercase" defaultChecked />
                        <Label htmlFor="require-uppercase">Require uppercase letters</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Switch id="require-numbers" defaultChecked />
                        <Label htmlFor="require-numbers">Require numbers</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Switch id="require-special" defaultChecked />
                        <Label htmlFor="require-special">Require special characters</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Switch id="prevent-reuse" defaultChecked />
                        <Label htmlFor="prevent-reuse">Prevent password reuse (last 3)</Label>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password-expiry" className="text-sm">
                        Password Expiry
                      </Label>
                      <Select defaultValue="90">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select expiry" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30">30 days</SelectItem>
                          <SelectItem value="60">60 days</SelectItem>
                          <SelectItem value="90">90 days</SelectItem>
                          <SelectItem value="never">Never expire</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="justify-between border-t pt-5">
                  <Button variant="outline">Reset to Defaults</Button>
                  <Button>
                    <Save className="mr-2 h-4 w-4" />
                    Save Policy
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default SettingsPage;
