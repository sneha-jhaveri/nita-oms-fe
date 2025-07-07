// import { useState } from "react";
// import { Layout } from "@/components/layout";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import {
//   MoreHorizontal,
//   PlusIcon,
//   SearchIcon,
//   Shield,
//   User,
//   UserCog,
//   Users,
//   FilterIcon,
//   Mail,
//   Lock,
//   AlertCircle,
//   CheckCircle,
// } from "lucide-react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger
// } from "@/components/ui/dropdown-menu";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// // Mock users data
// const mockUsers = [
//   {
//     id: "user-001",
//     name: "Rajesh Kumar",
//     email: "rajesh@nitakitchen.com",
//     role: "admin",
//     status: "active",
//     avatarUrl: "",
//     brand: "Nita Kitchen Admin",
//     lastActive: "2025-04-11 10:30 AM",
//     created: "2024-12-05"
//   },
//   {
//     id: "user-002",
//     name: "Priya Sharma",
//     email: "priya@nitaessentials.com",
//     role: "brand_user",
//     status: "active",
//     avatarUrl: "",
//     brand: "Nita Essentials",
//     lastActive: "2025-04-10 03:45 PM",
//     created: "2025-01-15"
//   },
//   {
//     id: "user-003",
//     name: "Vikram Singh",
//     email: "vikram@nitakitchen.com",
//     role: "dispatcher",
//     status: "active",
//     avatarUrl: "",
//     brand: "Nita Kitchen Admin",
//     lastActive: "2025-04-11 09:20 AM",
//     created: "2025-02-08"
//   },
//   {
//     id: "user-004",
//     name: "Anita Desai",
//     email: "anita@nitahome.com",
//     role: "brand_user",
//     status: "active",
//     avatarUrl: "",
//     brand: "Nita Home",
//     lastActive: "2025-04-09 11:15 AM",
//     created: "2025-01-22"
//   },
//   {
//     id: "user-005",
//     name: "Ravi Patel",
//     email: "ravi@nitakitchen.com",
//     role: "finance",
//     status: "active",
//     avatarUrl: "",
//     brand: "Nita Kitchen Admin",
//     lastActive: "2025-04-10 04:30 PM",
//     created: "2025-02-14"
//   },
//   {
//     id: "user-006",
//     name: "Sanjay Kumar",
//     email: "sanjay@nitaessentials.com",
//     role: "cs_agent",
//     status: "inactive",
//     avatarUrl: "",
//     brand: "Nita Kitchen Admin",
//     lastActive: "2025-03-28 02:10 PM",
//     created: "2025-01-05"
//   },
//   {
//     id: "user-007",
//     name: "Neha Gupta",
//     email: "neha@nitaindigo.com",
//     role: "brand_user",
//     status: "pending",
//     avatarUrl: "",
//     brand: "Nita Indigo",
//     lastActive: "Not active yet",
//     created: "2025-04-08"
//   }
// ];

// // Role display names mapping
// const roleDisplayNames: Record<string, string> = {
//   'admin': 'Administrator',
//   'brand_user': 'Brand Manager',
//   'dispatcher': 'Dispatcher',
//   'finance': 'Finance Manager',
//   'cs_agent': 'CS Agent',
//   'rto_agent': 'RTO Agent',
//   'label_printer': 'Label Printer'
// };

// // Summary stats
// const userStats = {
//   totalUsers: mockUsers.length,
//   activeUsers: mockUsers.filter(u => u.status === "active").length,
//   pendingInvites: mockUsers.filter(u => u.status === "pending").length,
//   inactiveUsers: mockUsers.filter(u => u.status === "inactive").length,
// };

// const UsersPage = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [roleFilter, setRoleFilter] = useState("all");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [brandFilter, setBrandFilter] = useState("all");

//   // Get unique brands for filter
//   const brands = Array.from(new Set(mockUsers.map(user => user.brand)));

//   // Filter users based on search and filters
//   const filteredUsers = mockUsers.filter(user => {
//     const matchesSearch =
//       user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       user.email.toLowerCase().includes(searchTerm.toLowerCase());

//     const matchesRole = roleFilter === "all" || user.role === roleFilter;
//     const matchesStatus = statusFilter === "all" || user.status === statusFilter;
//     const matchesBrand = brandFilter === "all" || user.brand === brandFilter;

//     return matchesSearch && matchesRole && matchesStatus && matchesBrand;
//   });

//   return (
//     <Layout>
//       <div className="space-y-6">
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-3xl font-semibold tracking-tight">User Management</h1>
//             <p className="text-muted-foreground">
//               Manage users and their permissions in the system
//             </p>
//           </div>
//           <Button>
//             <PlusIcon className="mr-2 h-4 w-4" />
//             Add User
//           </Button>
//         </div>

//         {/* Stats overview */}
//         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Total Users</CardTitle>
//               <Users className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{userStats.totalUsers}</div>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Active Users</CardTitle>
//               <CheckCircle className="h-4 w-4 text-green-500" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{userStats.activeUsers}</div>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Pending Invites</CardTitle>
//               <Mail className="h-4 w-4 text-amber-500" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{userStats.pendingInvites}</div>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Inactive Users</CardTitle>
//               <AlertCircle className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{userStats.inactiveUsers}</div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Users table with filters */}
//         <Card>
//           <CardHeader className="pb-3">
//             <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//               <CardTitle>Users</CardTitle>
//               <div className="flex flex-wrap items-center gap-2">
//                 <div className="relative w-64">
//                   <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//                   <Input
//                     type="search"
//                     placeholder="Search users..."
//                     className="pl-8 w-full"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                   />
//                 </div>

//                 <Select
//                   value={roleFilter}
//                   onValueChange={setRoleFilter}
//                 >
//                   <SelectTrigger className="w-[160px]">
//                     <SelectValue placeholder="Role" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="all">All Roles</SelectItem>
//                     <SelectItem value="admin">Administrator</SelectItem>
//                     <SelectItem value="brand_user">Brand Manager</SelectItem>
//                     <SelectItem value="dispatcher">Dispatcher</SelectItem>
//                     <SelectItem value="finance">Finance Manager</SelectItem>
//                     <SelectItem value="cs_agent">CS Agent</SelectItem>
//                     <SelectItem value="rto_agent">RTO Agent</SelectItem>
//                     <SelectItem value="label_printer">Label Printer</SelectItem>
//                   </SelectContent>
//                 </Select>

//                 <Select
//                   value={statusFilter}
//                   onValueChange={setStatusFilter}
//                 >
//                   <SelectTrigger className="w-[140px]">
//                     <SelectValue placeholder="Status" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="all">All Statuses</SelectItem>
//                     <SelectItem value="active">Active</SelectItem>
//                     <SelectItem value="pending">Pending</SelectItem>
//                     <SelectItem value="inactive">Inactive</SelectItem>
//                   </SelectContent>
//                 </Select>

//                 <Select
//                   value={brandFilter}
//                   onValueChange={setBrandFilter}
//                 >
//                   <SelectTrigger className="w-[180px]">
//                     <SelectValue placeholder="Brand" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="all">All Brands</SelectItem>
//                     {brands.map((brand) => (
//                       <SelectItem key={brand} value={brand}>{brand}</SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>
//           </CardHeader>
//           <CardContent>
//             <div className="rounded-md border">
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead className="w-[250px]">User</TableHead>
//                     <TableHead>Role</TableHead>
//                     <TableHead>Status</TableHead>
//                     <TableHead>Brand</TableHead>
//                     <TableHead>Last Active</TableHead>
//                     <TableHead>Created</TableHead>
//                     <TableHead className="text-right">Actions</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {filteredUsers.map((user) => (
//                     <TableRow key={user.id}>
//                       <TableCell className="font-medium">
//                         <div className="flex items-center gap-2">
//                           <Avatar className="h-9 w-9">
//                             <AvatarImage src={user.avatarUrl} alt={user.name} />
//                             <AvatarFallback className="bg-primary text-primary-foreground">
//                               {user.name.split(' ').map(n => n[0]).join('')}
//                             </AvatarFallback>
//                           </Avatar>
//                           <div>
//                             <div>{user.name}</div>
//                             <div className="text-xs text-muted-foreground">{user.email}</div>
//                           </div>
//                         </div>
//                       </TableCell>
//                       <TableCell>
//                         <Badge variant="outline" className="bg-primary/10 text-primary hover:bg-primary/20">
//                           {roleDisplayNames[user.role] || user.role}
//                         </Badge>
//                       </TableCell>
//                       <TableCell>
//                         {user.status === "active" ? (
//                           <Badge variant="outline" className="bg-green-50 text-green-800 hover:bg-green-50 border-green-600">
//                             Active
//                           </Badge>
//                         ) : user.status === "pending" ? (
//                           <Badge variant="outline" className="bg-amber-50 text-amber-800 hover:bg-amber-50 border-amber-600">
//                             Pending
//                           </Badge>
//                         ) : (
//                           <Badge variant="outline" className="bg-gray-50 text-gray-800 hover:bg-gray-50 border-gray-500">
//                             Inactive
//                           </Badge>
//                         )}
//                       </TableCell>
//                       <TableCell>{user.brand}</TableCell>
//                       <TableCell>{user.lastActive}</TableCell>
//                       <TableCell>{user.created}</TableCell>
//                       <TableCell className="text-right">
//                         <DropdownMenu>
//                           <DropdownMenuTrigger asChild>
//                             <Button variant="ghost" size="icon">
//                               <MoreHorizontal className="h-4 w-4" />
//                             </Button>
//                           </DropdownMenuTrigger>
//                           <DropdownMenuContent align="end">
//                             <DropdownMenuLabel>Actions</DropdownMenuLabel>
//                             <DropdownMenuSeparator />
//                             <DropdownMenuItem>
//                               <UserCog className="mr-2 h-4 w-4" /> Edit User
//                             </DropdownMenuItem>
//                             <DropdownMenuItem>
//                               <Shield className="mr-2 h-4 w-4" /> Change Role
//                             </DropdownMenuItem>
//                             <DropdownMenuItem>
//                               <Lock className="mr-2 h-4 w-4" /> Reset Password
//                             </DropdownMenuItem>
//                             <DropdownMenuSeparator />
//                             <DropdownMenuItem className="text-red-600">
//                               {user.status === "inactive" ? (
//                                 <>
//                                   <User className="mr-2 h-4 w-4" /> Reactivate User
//                                 </>
//                               ) : (
//                                 <>
//                                   <AlertCircle className="mr-2 h-4 w-4" /> Deactivate User
//                                 </>
//                               )}
//                             </DropdownMenuItem>
//                           </DropdownMenuContent>
//                         </DropdownMenu>
//                       </TableCell>
//                     </TableRow>
//                   ))}

//                   {filteredUsers.length === 0 && (
//                     <TableRow>
//                       <TableCell colSpan={7} className="h-24 text-center">
//                         No users found matching your filters.
//                       </TableCell>
//                     </TableRow>
//                   )}
//                 </TableBody>
//               </Table>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </Layout>
//   );
// };

// export default UsersPage;

import { useEffect, useState } from "react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import {
  getAllUsers,
  createUser,
  updateUserById,
  deleteUserById,
} from "@/api/services/profile";
import { useAuth } from "@/context/AuthContext";
import { UserData } from "@/types/user";
import { UserTable } from "@/components/users/UserTable";
import { UserFormModal } from "@/components/users/UserFormModal";

const UsersPage = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserData | null>(null);

  const fetchUsers = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await getAllUsers();
      setUsers(res.data || []);
    } catch (err) {
      console.error("Failed to load users", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [user]);

  const handleCreateUser = async (formData: Partial<UserData>) => {
    try {
      // Ensure all required fields are present
      const { email, password, firstName, lastName, phoneNumber, role } =
        formData;
      if (
        !email ||
        !password ||
        !firstName ||
        !lastName ||
        !phoneNumber ||
        !role
      ) {
        throw new Error("Missing required user fields");
      }
      const payload = {
        email,
        password,
        firstName,
        lastName,
        phoneNumber,
        role,
        // Optionally include orgId if your backend expects it
        orgId: user?.orgId,
      };
      const res = await createUser(payload);
      setUsers((prev) => [...prev, res.data]);
      setIsModalOpen(false);
    } catch (err) {
      console.error("Failed to create user", err);
    }
  };

  const handleUpdateUser = async (id: string, formData: Partial<UserData>) => {
    try {
      // Find the existing user to fill in missing required fields
      const existingUser = users.find((u) => u.id === id);
      if (!existingUser) throw new Error("User not found");

      const payload = {
        email: formData.email ?? existingUser.email,
        password: formData.password ?? existingUser.password ?? "", // fallback to empty string if not present
        firstName: formData.firstName ?? existingUser.firstName,
        lastName: formData.lastName ?? existingUser.lastName,
        phoneNumber: formData.phoneNumber ?? existingUser.phoneNumber,
        isActive: formData.isActive ?? existingUser.isActive,
      };

      const res = await updateUserById(id, payload);
      setUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, ...res.data } : u))
      );
      setEditingUser(null);
      setIsModalOpen(false);
    } catch (err) {
      console.error("Failed to update user", err);
    }
  };

  const handleDeleteUser = async (id: string) => {
    try {
      await deleteUserById(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      console.error("Failed to delete user", err);
    }
  };

  const openEditModal = (user: UserData) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Users</h1>
            <p className="text-muted-foreground">
              Manage users within your organization.
            </p>
          </div>
          <Button
            size="sm"
            onClick={() => {
              setEditingUser(null);
              setIsModalOpen(true);
            }}
          >
            <PlusIcon className="mr-2 h-4 w-4" />
            Invite User
          </Button>
        </div>

        <UserTable
          users={users}
          loading={loading}
          onEdit={openEditModal}
          onDelete={handleDeleteUser}
        />

        <UserFormModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={
            editingUser
              ? (data) => handleUpdateUser(editingUser.id, data)
              : handleCreateUser
          }
          initialData={editingUser || undefined}
        />
      </div>
    </Layout>
  );
};

export default UsersPage;
