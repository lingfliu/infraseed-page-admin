import { api } from "./axios";

export interface User {
  id: string;
  username: string;
  email?: string;
  createdAt?: string;
}

export interface UserCreate {
  username: string;
  email?: string;
  password: string;
}

export interface UserUpdate {
  username?: string;
  email?: string;
  password?: string;
}

export async function getUsers(): Promise<User[]> {
  const res = await api.get<User[]>("/users");
  return res.data;
}

export async function getUser(id: string): Promise<User> {
  const res = await api.get<User>(`/users/${id}`);
  return res.data;
}

export async function createUser(data: UserCreate): Promise<User> {
  const res = await api.post<User>("/users", data);
  return res.data;
}

export async function updateUser(id: string, data: UserUpdate): Promise<User> {
  const res = await api.patch<User>(`/users/${id}`, data);
  return res.data;
}

export async function deleteUser(id: string): Promise<void> {
  await api.delete(`/users/${id}`);
}
