import { api } from "./axios";

export interface DataItem {
  id: string;
  name?: string;
  category: string;
  tenantId: string;
  tenantName?: string;
  createdAt?: string;
}

export interface DataListParams {
  category?: string;
  page?: number;
  limit?: number;
}

export async function getDataItems(params?: DataListParams): Promise<DataItem[]> {
  const res = await api.get<DataItem[]>("/data", { params });
  return res.data;
}

export async function getCategories(): Promise<string[]> {
  const res = await api.get<string[]>("/data/categories");
  return res.data;
}
