import { UserData } from "@/types/user";
import { Button } from "@/components/ui/button";

interface UserTableProps {
  users: UserData[];
  loading?: boolean;
  onEdit: (user: UserData) => void;
  onDelete: (id: string) => void;
}

export const UserTable = ({
  users,
  loading,
  onEdit,
  onDelete,
}: UserTableProps) => {
  if (loading) return <p>Loading users...</p>;
  if (users.length === 0) return <p>No users found.</p>;

  return (
    <div className="border rounded-lg overflow-hidden">
      <table className="min-w-full text-sm">
        <thead className="bg-muted">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Role</th>
            <th className="p-3 text-left">Phone</th>
            <th className="p-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t">
              <td className="p-3">
                {user.firstName} {user.lastName}
              </td>
              <td className="p-3">{user.email}</td>
              <td className="p-3 capitalize">{user.role}</td>
              <td className="p-3">{user.phoneNumber || "-"}</td>
              <td className="p-3 text-right space-x-2">
                <Button size="sm" onClick={() => onEdit(user)}>
                  Edit
                </Button>
                {user.role !== "admin" && (
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => onDelete(user.id)}
                  >
                    Delete
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
