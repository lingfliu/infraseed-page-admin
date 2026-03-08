import { api } from "./axios";

export interface DashboardStats {
  users: number;
  dataCategories: number;
  dataCount: number;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const res = await api.get<DashboardStats>("/stats");
  return res.data;
}
