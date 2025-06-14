import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'donor' | 'ngo' | 'admin';
  location?: {
    lat: number;
    lng: number;
    address: string;
  };
  points?: number;
  registrationDate: string;
  verified?: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Omit<User, 'id' | 'registrationDate'> & { password: string }) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USERS: (User & { password: string })[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'donor@foodsaver.com',
    password: 'password',
    role: 'donor',
    location: { lat: 40.7128, lng: -74.0060, address: 'New York, NY' },
    points: 150,
    registrationDate: '2024-01-15',
  },
  {
    id: '2',
    name: 'Sarah Wilson',
    email: 'ngo@foodsaver.com',
    password: 'password',
    role: 'ngo',
    location: { lat: 40.7580, lng: -73.9855, address: 'Manhattan, NY' },
    registrationDate: '2024-02-10',
    verified: true,
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@foodsaver.com',
    password: 'password',
    role: 'admin',
    registrationDate: '2024-01-01',
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('foodsaver_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const foundUser = DEMO_USERS.find(u => u.email === email && u.password === password);
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('foodsaver_user', JSON.stringify(userWithoutPassword));
      return true;
    }
    return false;
  };

  const register = async (userData: Omit<User, 'id' | 'registrationDate'> & { password: string }): Promise<boolean> => {
    const newUser: User = {
      ...userData,
      id: Math.random().toString(36).substr(2, 9),
      registrationDate: new Date().toISOString().split('T')[0],
      points: userData.role === 'donor' ? 0 : undefined,
    };
    delete (newUser as any).password;
    
    setUser(newUser);
    localStorage.setItem('foodsaver_user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('foodsaver_user');
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('foodsaver_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}