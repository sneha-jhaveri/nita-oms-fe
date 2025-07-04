// src/api/services/profile.ts

import axiosInstance from "../axiosInstance";

// Get current user's profile
export const getProfile = () => {
  return axiosInstance.get("/users/profile");
};

// Get all users (admin access typically required)
export const getAllUsers = () => {
  return axiosInstance.get("/users");
};

// Get a single user by ID
export const getUserById = (id: string) => {
  return axiosInstance.get(`/users/${id}`);
};

// Create a new user (admin access typically required)
export const createUser = (data: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  role: string;
}) => {
  return axiosInstance.post("/users", data);
};

// Update an existing user by ID
export const updateUserById = (
  id: string,
  data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    isActive: boolean;
  }
) => {
  return axiosInstance.put(`/users/${id}`, data);
};

// Delete a user by ID
export const deleteUserById = (id: string) => {
  return axiosInstance.delete(`/users/${id}`);
};
