"use client";
import { createContext, useContext, ReactNode } from "react";
import useAuth from "./useAuth";

// Define the shape of the context value
const AuthContext = createContext<ReturnType<typeof useAuth> | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used within an AuthProvider");
  return ctx;
}
