export interface UserData {
  id: string;
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  role: "admin" | "user";
  orgId: string;
  isActive?: boolean;
}
