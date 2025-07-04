import axiosInstance from "../axiosInstance";

// Login API call
export const login = (data: { email: string; password: string }) => {
  return axiosInstance.post("/auth/login", data);
};

// Signup API call
export const signup = (data: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  organizationName: string;
}) => {
  return axiosInstance.post("/auth/signup", data);
};
