import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { UserData } from "@/types/user";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<UserData>) => void;
  initialData?: Partial<UserData>;
}

export const UserFormModal = ({
  open,
  onClose,
  onSubmit,
  initialData,
}: Props) => {
  const [form, setForm] = useState<Partial<UserData>>({});

  useEffect(() => {
    if (initialData) setForm(initialData);
    else setForm({ isActive: true });
  }, [initialData]);

  const handleChange = (key: keyof UserData, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    if (
      !form.email ||
      !form.firstName ||
      !form.lastName ||
      !form.role ||
      !form.password
    )
      return;
    onSubmit(form);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit User" : "Invite User"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <Input
            placeholder="First Name"
            value={form.firstName || ""}
            onChange={(e) => handleChange("firstName", e.target.value)}
          />
          <Input
            placeholder="Last Name"
            value={form.lastName || ""}
            onChange={(e) => handleChange("lastName", e.target.value)}
          />
          <Input
            placeholder="Email"
            type="email"
            value={form.email || ""}
            onChange={(e) => handleChange("email", e.target.value)}
          />
          <Input
            placeholder="Phone Number"
            value={form.phoneNumber || ""}
            onChange={(e) => handleChange("phoneNumber", e.target.value)}
          />
          <Input
            placeholder="Temporary Password"
            type="password"
            value={form.password || ""}
            onChange={(e) => handleChange("password", e.target.value)}
          />
          <select
            className="border rounded px-3 py-2"
            value={form.role || "user"}
            onChange={(e) => handleChange("role", e.target.value)}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={form.isActive ?? true}
              onChange={(e) => handleChange("isActive", e.target.checked)}
            />
            <label>Active</label>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {initialData ? "Update" : "Invite"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
