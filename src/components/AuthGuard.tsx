"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setToken, setInitialized } from "@/store/slices/authSlice";
import { setAxiosAuthToken } from "@/services/axios";
import { AUTH_TOKEN_KEY } from "@/store/slices/authSlice";

const PUBLIC_PATHS = ["/login"];

// Skip auth in development by default so you can view all pages without a backend token.
// Set NEXT_PUBLIC_SKIP_AUTH=false in .env.local to test the login flow in dev.
const skipAuth =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_SKIP_AUTH !== "false"
    : process.env.NEXT_PUBLIC_SKIP_AUTH === "true";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const token = useAppSelector((s) => s.auth.token);
  const isInitialized = useAppSelector((s) => s.auth.isInitialized);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem(AUTH_TOKEN_KEY);
    if (stored && !token) {
      dispatch(setToken(stored));
      setAxiosAuthToken(stored);
    }
    dispatch(setInitialized());
  }, [dispatch, token]);

  useEffect(() => {
    if (skipAuth) return;
    if (!isInitialized) return;
    const isPublic = PUBLIC_PATHS.some((p) => pathname?.startsWith(p));
    if (!isPublic && !token) {
      router.replace("/login");
    }
  }, [isInitialized, token, pathname, router]);

  if (skipAuth) {
    return <>{children}</>;
  }

  const isPublic = PUBLIC_PATHS.some((p) => pathname?.startsWith(p));
  if (!isPublic && !token && isInitialized) {
    return null;
  }

  return <>{children}</>;
}
