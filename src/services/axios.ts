import axios, { type InternalAxiosRequestConfig } from "axios";

const baseURL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api";

export const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

export function setAxiosAuthToken(token: string | null) {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
}

// Request interceptor: attach token; redirect to login if missing for protected routes
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window === "undefined") return config;
    const token = localStorage.getItem("infraseed_admin_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: on 401/403, clear token and redirect to login.
// Skipped in development (unless NEXT_PUBLIC_SKIP_AUTH=false) or when NEXT_PUBLIC_SKIP_AUTH=true.
const skipAuth =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_SKIP_AUTH !== "false"
    : process.env.NEXT_PUBLIC_SKIP_AUTH === "true";
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!skipAuth) {
      const status = error.response?.status;
      if (typeof window !== "undefined" && (status === 401 || status === 403)) {
        localStorage.removeItem("infraseed_admin_token");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);
