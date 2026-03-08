import { createSlice } from "@reduxjs/toolkit";

const AUTH_TOKEN_KEY = "infraseed_admin_token";

function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export interface AuthState {
  token: string | null;
  isInitialized: boolean;
}

const initialState: AuthState = {
  token: getStoredToken(),
  isInitialized: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: { payload: string | null }) => {
      state.token = action.payload;
      state.isInitialized = true;
      if (typeof window !== "undefined") {
        if (action.payload) {
          localStorage.setItem(AUTH_TOKEN_KEY, action.payload);
        } else {
          localStorage.removeItem(AUTH_TOKEN_KEY);
        }
      }
    },
    clearToken: (state) => {
      state.token = null;
      state.isInitialized = true;
      if (typeof window !== "undefined") {
        localStorage.removeItem(AUTH_TOKEN_KEY);
      }
    },
    setInitialized: (state) => {
      state.isInitialized = true;
    },
  },
});

export const { setToken, clearToken, setInitialized } = authSlice.actions;
export default authSlice.reducer;
export { AUTH_TOKEN_KEY };
