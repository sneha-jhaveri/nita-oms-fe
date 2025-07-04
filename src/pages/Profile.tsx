import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ProfilePage = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-semibold tracking-tight">My Profile</h1>

        <Card>
          <CardHeader>
            <CardTitle>Profile Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <div>
              <strong>First Name:</strong> {user.firstName || "-"}
            </div>
            <div>
              <strong>Last Name:</strong> {user.lastName || "-"}
            </div>
            <div>
              <strong>Email:</strong> {user.email || "-"}
            </div>
            <div>
              <strong>Phone Number:</strong> {user.phoneNumber || "-"}
            </div>
            <div>
              <strong>Role:</strong> {user.role || "-"}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ProfilePage;

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useEffect, useState } from "react";
// import { getProfile, updateUserById } from "@/api/services/profile";
// import { Layout } from "@/components/layout";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";

// const ProfilePage = () => {
//   const [user, setUser] = useState<any>(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [form, setForm] = useState<any>({});
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await getProfile();
//         setUser(res.data);
//         setForm(res.data);
//       } catch (err) {
//         console.error("Failed to load profile", err);
//       }
//     };
//     fetchUser();
//   }, []);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSave = async () => {
//     if (!user?.id) return;
//     setLoading(true);
//     try {
//       await updateUserById(user.id, form);
//       setUser(form);
//       setIsEditing(false);
//     } catch (err) {
//       console.error("Update failed", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!user) {
//     return (
//       <div className="flex h-screen w-full items-center justify-center">
//         <div className="text-muted-foreground text-lg">Loading...</div>
//       </div>
//     );
//   }

//   return (
//     <Layout>
//       <div className="space-y-6">
//         <h1 className="text-3xl font-semibold tracking-tight">My Profile</h1>

//         <Card>
//           <CardHeader className="flex flex-row justify-between items-center">
//             <CardTitle>Profile Details</CardTitle>
//             {!isEditing && (
//               <Button size="sm" onClick={() => setIsEditing(true)}>
//                 Edit
//               </Button>
//             )}
//           </CardHeader>

//           <CardContent className="space-y-4 text-sm text-muted-foreground">
//             {["firstName", "lastName", "email", "phoneNumber", "role"].map(
//               (field) => (
//                 <div key={field}>
//                   <Label className="capitalize" htmlFor={field}>
//                     {field}
//                   </Label>
//                   {isEditing ? (
//                     <Input
//                       id={field}
//                       name={field}
//                       value={form[field] || ""}
//                       onChange={handleChange}
//                       disabled={field === "role"}
//                     />
//                   ) : (
//                     <div className="font-medium text-foreground">
//                       {user[field] || "-"}
//                     </div>
//                   )}
//                 </div>
//               )
//             )}

//             {isEditing && (
//               <div className="flex gap-2">
//                 <Button onClick={handleSave} disabled={loading}>
//                   {loading ? "Saving..." : "Save"}
//                 </Button>
//                 <Button variant="outline" onClick={() => setIsEditing(false)}>
//                   Cancel
//                 </Button>
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       </div>
//     </Layout>
//   );
// };

// export default ProfilePage;
