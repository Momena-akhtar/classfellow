"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";

export interface Student {
  _id: string;
  email: string;
  name: string;
  photo: string;
  university: string;
  courses: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface AuthContextType {
  student: Student | null;
  loading: boolean;
  login: (student: Student) => void;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const checkAuth = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/profile`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
          },
          credentials: "include",
        }
      );

      const data = await response.json();

      if (data.success && data.student) {
        setStudent(data.student);
      } else {
        setStudent(null);
        // If user is on a protected route, redirect to login
        if (pathname.startsWith("/dashboard")) {
          router.push("/login");
        }
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      setStudent(null);
      // If user is on a protected route, redirect to login
      if (pathname.startsWith("/dashboard")) {
        router.push("/login");
      }
    } finally {
      setLoading(false);
    }
  }, [pathname, router]);

  const login = (student: Student) => {
    setStudent(student);
  };

  const logout = async () => {
    try {
      // Call logout API to clear server-side session
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setStudent(null);
      router.push("/login");
    }
  };

  useEffect(() => {
    void checkAuth();
  }, [checkAuth]);

  const value = {
    student,
    loading,
    login,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
