import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import type { User } from '../types';
import api from '../api/axios';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  updateUser: (password: string, newPassword: string) => Promise<string>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      setUser(res.data);
      navigate("/login/loading");
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
    } catch (err: any) {
      if (err.response?.status === 401) {
        //
      } else {
        console.error("Failed to fetch user:", err.response?.data?.message || err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (password: string, newPassword: string): Promise<string> => {
    try {
      const res = await api.post("/auth/update", {password, newPassword});
      return res.data.message
    } catch (err: any) {
      if (err.response?.status === 401) {
        return "Invalid credentials. Please check your password.";
      }
      console.error("Failed to update user:", err.response?.data?.message || err.message);
      return "Not able to update!";
    }
  };

  useEffect(() => {
    fetchUser()
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, signup, updateUser }}>
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
