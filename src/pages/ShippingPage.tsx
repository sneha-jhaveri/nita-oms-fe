import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon, CheckCircle, Printer, TruckIcon } from "lucide-react";
import { useState } from "react";

// Mock pending shipment data
const mockPendingShipments = [
  {
    id: "OD-1023759",
    customer: "Anita Singh",
    items: [
      { name: "Steel Kadhai 3L", sku: "SKU-KD-002", quantity: 1 }
    ],
    destination: "Mumbai, Maharashtra",
    assignedCourier: null,
    labelGenerated: false
  },
  {
    id: "OD-1023745",
    customer: "Rahul Kumar",
    items: [
      { name: "Pressure Cooker 5L", sku: "SKU-PC-005", quantity: 1 }
    ],
    destination: "Bangalore, Karnataka",
    assignedCourier: "Delhivery",
    labelGenerated: false
  },
  {
    id: "OD-1023721",
    customer: "Priya Mehta",
    items: [
      { name: "Non-stick Tawa", sku: "SKU-NT-003", quantity: 1 },
      { name: "Stainless Steel Bowl Set", sku: "SKU-SB-004", quantity: 1 }
    ],
    destination: "Delhi, Delhi",
    assignedCourier: "DTDC",
    labelGenerated: true
  }
];

// Mock courier options
const mockCourierOptions = [
  {
    id: "delhivery",
    name: "Delhivery",
    fee: "₹85",
    eta: "2-3 days",
    rtoRate: "3.2%"
  },
  {
    id: "dtdc",
    name: "DTDC",
    fee: "₹78",
    eta: "3-4 days",
    rtoRate: "2.7%"
  },
  {
    id: "bluedart",
    name: "Bluedart",
    fee: "₹110",
    eta: "1-2 days",
    rtoRate: "1.8%"
  },
  {
    id: "ekart",
    name: "Ekart",
    fee: "₹92",
    eta: "2-3 days",
    rtoRate: "4.1%"
  }
];

const ShippingPage = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [selectedCourier, setSelectedCourier] = useState<string | null>(null);
  const [labelFormat, setLabelFormat] = useState("a4");

  // Get the selected order details
  const orderDetails = mockPendingShipments.find(order => order.id === selectedOrder);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Shipping</h1>
            <p className="text-muted-foreground">
              Manage shipments and generate shipping labels
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <CalendarIcon className="mr-2 h-4 w-4" />
              View Schedule
            </Button>
            <Button>
              <Printer className="mr-2 h-4 w-4" />
              Batch Print Labels
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="pending" className="relative">
                    Pending Shipments
                    <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-xs text-white">
                      {mockPendingShipments.length}
                    </span>
                  </TabsTrigger>
                  <TabsTrigger value="processed">Processed</TabsTrigger>
                  <TabsTrigger value="in_transit">In Transit</TabsTrigger>
                  <TabsTrigger value="delivered">Delivered</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="pending" className="space-y-4">
                <Card>
                  <div className="rounded-md border">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-muted/50">
                          <tr>
                            <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold">
                              Order ID
                            </th>
                            <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold">
                              Customer
                            </th>
                            <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold">
                              Destination
                            </th>
                            <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold">
                              Courier
                            </th>
                            <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold">
                              Label
                            </th>
                            <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {mockPendingShipments.map((shipment) => (
                            <tr 
                              key={shipment.id} 
                              className={`border-t hover:bg-muted/50 ${selectedOrder === shipment.id ? 'bg-muted/50' : ''}`}
                            >
                              <td className="px-4 py-3 text-sm font-medium">{shipment.id}</td>
                              <td className="px-4 py-3 text-sm">{shipment.customer}</td>
                              <td className="px-4 py-3 text-sm">{shipment.destination}</td>
                              <td className="px-4 py-3 text-sm">
                                {shipment.assignedCourier ? (
                                  <span className="font-medium">{shipment.assignedCourier}</span>
                                ) : (
                                  <span className="text-muted-foreground">Not assigned</span>
                                )}
                              </td>
                              <td className="px-4 py-3 text-sm">
                                {shipment.labelGenerated ? (
                                  <span className="inline-flex items-center text-green-600">
                                    <CheckCircle className="mr-1 h-4 w-4" /> Generated
                                  </span>
                                ) : (
                                  <span className="text-muted-foreground">Not generated</span>
                                )}
                              </td>
                              <td className="px-4 py-3 text-sm">
                                <Button 
                                  size="sm" 
                                  variant={selectedOrder === shipment.id ? "default" : "outline"}
                                  onClick={() => setSelectedOrder(shipment.id)}
                                >
                                  {selectedOrder === shipment.id ? "Selected" : "Select"}
                                </Button>
                              </td>
                            </tr>
                          ))}

                          {mockPendingShipments.length === 0 && (
                            <tr>
                              <td colSpan={6} className="px-4 py-6 text-center text-muted-foreground">
                                No pending shipments found
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="processed" className="space-y-4">
                <div className="flex h-40 items-center justify-center rounded-md border border-dashed">
                  <div className="text-center">
                    <TruckIcon className="mx-auto h-10 w-10 text-muted-foreground" />
                    <h3 className="mt-2 text-lg font-medium">No processed shipments</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Processed shipments will appear here
                    </p>
                  </div>
                </div>
              </TabsContent>

              {/* Other tab contents would follow the same pattern */}
              <TabsContent value="in_transit" className="space-y-4">
                <div className="flex h-40 items-center justify-center rounded-md border border-dashed">
                  <div className="text-center">
                    <TruckIcon className="mx-auto h-10 w-10 text-muted-foreground" />
                    <h3 className="mt-2 text-lg font-medium">No in-transit shipments</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      In-transit shipments will appear here
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="delivered" className="space-y-4">
                <div className="flex h-40 items-center justify-center rounded-md border border-dashed">
                  <div className="text-center">
                    <CheckCircle className="mx-auto h-10 w-10 text-muted-foreground" />
                    <h3 className="mt-2 text-lg font-medium">No delivered shipments</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Delivered shipments will appear here
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            {selectedOrder ? (
              <>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Courier Assignment</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Selected Order: {selectedOrder}</h4>
                      <p className="text-sm text-muted-foreground">
                        Customer: {orderDetails?.customer}<br />
                        Destination: {orderDetails?.destination}<br />
                        Items: {orderDetails?.items.length}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Select Courier Partner</h4>
                      <Select 
                        value={selectedCourier || ""} 
                        onValueChange={setSelectedCourier}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select courier" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockCourierOptions.map(courier => (
                            <SelectItem key={courier.id} value={courier.id}>
                              {courier.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {selectedCourier && (
                      <div className="pt-2">
                        <h4 className="text-sm font-medium mb-2">Courier Details</h4>
                        <div className="rounded-md border p-3 text-sm">
                          {(() => {
                            const courier = mockCourierOptions.find(c => c.id === selectedCourier);
                            return courier ? (
                              <>
                                <div className="flex justify-between py-1 border-b">
                                  <span>Name:</span>
                                  <span className="font-medium">{courier.name}</span>
                                </div>
                                <div className="flex justify-between py-1 border-b">
                                  <span>Shipping Fee:</span>
                                  <span className="font-medium">{courier.fee}</span>
                                </div>
                                <div className="flex justify-between py-1 border-b">
                                  <span>Estimated Delivery:</span>
                                  <span className="font-medium">{courier.eta}</span>
                                </div>
                                <div className="flex justify-between py-1">
                                  <span>RTO Rate:</span>
                                  <span className="font-medium">{courier.rtoRate}</span>
                                </div>
                              </>
                            ) : null;
                          })()}
                        </div>
                        
                        <Button className="w-full mt-4">
                          Assign Courier
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Shipping Label</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Label Format</h4>
                      <div className="flex gap-3">
                        <Button 
                          variant={labelFormat === "a4" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setLabelFormat("a4")}
                          className="flex-1"
                        >
                          A4 Format
                        </Button>
                        <Button 
                          variant={labelFormat === "100x150" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setLabelFormat("100x150")}
                          className="flex-1"
                        >
                          100x150 mm
                        </Button>
                      </div>
                    </div>
                    
                    <div className="pt-2">
                      <h4 className="text-sm font-medium mb-2">Print Options</h4>
                      <div className="space-y-2">
                        <Button 
                          className="w-full" 
                          disabled={!orderDetails?.assignedCourier}
                        >
                          <Printer className="mr-2 h-4 w-4" />
                          Generate & Print Now
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full"
                          disabled={!orderDetails?.assignedCourier}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          Schedule for 9 AM Batch
                        </Button>
                      </div>
                    </div>
                    
                    {!orderDetails?.assignedCourier && (
                      <div className="rounded-md bg-yellow-50 p-3 text-sm text-yellow-800 mt-2">
                        Please assign a courier before generating the shipping label.
                      </div>
                    )}
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card>
                <div className="flex h-64 items-center justify-center p-6">
                  <div className="text-center">
                    <TruckIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">No order selected</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Select an order from the pending shipments list to assign a courier and generate a shipping label.
                    </p>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ShippingPage;
