"use client";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { logIn as loginApi, logOut as logoutApi, signUp as signupApi } from "@/app/api/auth";
import { fetchInfo } from "@/app/api/user";

interface User {
  id: string;
  email: string;
  role: string;
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
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetchInfo();
        if (response) {
          setUser(response);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await loginApi(email, password);
      if (response) {
        setUser(response);
        router.push(response.role === "admin" ? "/admin" : "/");
      }
    } catch (error) {
      console.error("Login failed:", error);
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
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, signup, logout, isAuthenticated: !!user }}
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
