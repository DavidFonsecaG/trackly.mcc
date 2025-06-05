import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import type { User } from '../types';
import api from '../api/axios';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      setUser(res.data);
      navigate("/");
    } catch (err: any) {
      console.error("Login failed:", err.response?.data?.message || err.message );
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
      setUser(null);
      navigate("/login");
    } catch (err: any) {
      console.error("Login failed:", err.response?.data?.message || err.message );
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      const res = await api.post("/auth/register", {name, email, password});
      setUser(res.data);
      navigate("/");
    } catch (err: any) {
      console.error("Signup failed:", err.response?.data?.message || err.message );
    }
  };

  const fetchUser = async () => {
    try {
      const res = await api.get("/auth/me");
      setUser(res.data);
    } catch (err) {
      // silently fail
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
