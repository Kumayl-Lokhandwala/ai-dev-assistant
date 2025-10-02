import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  type ReactNode,
} from "react";
import {
  login as loginApi,
  register as registerApi,
  getMe,
} from "../api/apiService";

interface User {
  _id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; message?: string }>;
  register: (
    name: string,
    email: string,
    password: string
  ) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          // Fetch the user's data using the token
          const response = await getMe();
          setUser(response.data);
        } catch (error) {
          console.error("Session expired or token is invalid", error);
          logout(); // If token is invalid, log the user out
        }
      }
    };
    loadUser();
  }, [token]);

  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await registerApi({ name, email, password });
      const { token, ...userData } = response.data;
      localStorage.setItem("token", token);
      setToken(token);
      setUser(userData);
      return { success: true };
    } catch (error: any) {
      const message = error.response?.data?.message || "Failed to register.";
      return { success: false, message };
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await loginApi({ email, password });
      const { token, ...userData } = response.data;
      localStorage.setItem("token", token);
      setToken(token);
      setUser(userData);
      return { success: true };
    } catch (error) {
      return { success: false, message: "Invalid credentials" };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const value = { user, isAuthenticated: !!user, login, register, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
