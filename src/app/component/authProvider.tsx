"use client";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { logIn as loginApi, logOut as logoutApi, signUp as signupApi } from "@/app/api/auth";
import { fetchInfo } from "@/app/api/user";

interface User {
  id: string;
  email: string;
  role: string;
  isVerify: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);

    const fetchUser = async () => {
      try {
        const response = await fetchInfo();
        if (response) {
          setUser(response);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch {
        setIsAuthenticated(false);
      }
    };

    if (isMounted && isAuthenticated) {
      fetchUser();
    }
  }, [isMounted, isAuthenticated]);

  const login = async (email: string, password: string) => {
    try {
      const response = await loginApi(email, password);
      if (response) {
        if (!response.isVerify) {
          alert("Account is not verified");
          return;
        }
        setUser(response);
        setIsAuthenticated(true);
        router.push(response.role === "admin" ? "/admin" : "/");
      }
    } catch (error: any) {
      if (error.response?.status === 403) {
        alert("Account not verified. Please verify your account.");
      } else {
        console.error("Login failed:", error);
      }
    }
  };

  const signup = async (email: string, password: string) => {
    try {
      await signupApi(email, password);
      alert("Account created successfully! Redirecting to login...");
      router.push("/login");
    } catch (error) {
      console.error("Signup failed:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await logoutApi();
      setUser(null);
      setIsAuthenticated(false);
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  };

  if (!isMounted) {
    return null; // Wait for the component to be mounted on the client-side
  }

  return (
    <AuthContext.Provider
      value={{ user, login, signup, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
