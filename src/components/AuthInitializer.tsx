"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { setToken } from "@/store/slices/authSlice";
import { setAxiosAuthToken } from "@/services/axios";
import { AUTH_TOKEN_KEY } from "@/store/slices/authSlice";

export function AuthInitializer() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const stored = localStorage.getItem(AUTH_TOKEN_KEY);
    if (stored) {
      dispatch(setToken(stored));
      setAxiosAuthToken(stored);
    }
  }, [dispatch]);

  return null;
}
