import { api } from "./axios";

export interface ServiceItem {
  id: string;
  name: string;
  status: "running" | "suspended" | "unknown";
}

export async function getServices(): Promise<ServiceItem[]> {
  const res = await api.get<ServiceItem[]>("/services");
  return res.data;
}

export async function suspendService(id: string): Promise<void> {
  await api.post(`/services/${id}/suspend`);
}

export async function reloadService(id: string): Promise<void> {
  await api.post(`/services/${id}/reload`);
}
