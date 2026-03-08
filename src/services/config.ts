import { api } from "./axios";

export type ConfigSection = "api" | "agent" | "oss";

export interface ConfigEntry {
  key: string;
  value: string;
}

export async function getConfig(section: ConfigSection): Promise<Record<string, string>> {
  const res = await api.get<Record<string, string>>(`/config/${section}`);
  return res.data;
}

export async function saveConfig(
  section: ConfigSection,
  data: Record<string, string>
): Promise<void> {
  await api.put(`/config/${section}`, data);
}
