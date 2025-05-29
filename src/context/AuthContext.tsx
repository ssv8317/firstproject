import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // For now, mock the user data retrieval
          // In a real implementation, this would be a request to validate the token
          const userData = {
            id: '123',
            name: 'John Doe',
            email: 'john@example.com',
            role: 'student' as const
          };
          setUser(userData);
        } catch (err) {
          console.error('Authentication error:', err);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Mock API call - replace with actual API endpoint
      // const response = await axios.post('/api/auth/login', { email, password });
      // localStorage.setItem('token', response.data.token);
      // setUser(response.data.user);
      
      // Mock user data for demonstration
      const mockResponse = {
        token: 'mock-jwt-token',
        user: {
          id: '123',
          name: 'John Doe',
          email: email,
          role: email.includes('admin') ? 'admin' : 'student'
        } as User
      };
      
      localStorage.setItem('token', mockResponse.token);
      setUser(mockResponse.user);
      
    } catch (err) {
      setError('Invalid email or password');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Mock API call - replace with actual API endpoint
      // const response = await axios.post('/api/auth/register', { name, email, password });
      // localStorage.setItem('token', response.data.token);
      // setUser(response.data.user);
      
      // Mock user data for demonstration
      const mockResponse = {
        token: 'mock-jwt-token',
        user: {
          id: '123',
          name: name,
          email: email,
          role: 'student'
        } as User
      };
      
      localStorage.setItem('token', mockResponse.token);
      setUser(mockResponse.user);
      
    } catch (err) {
      setError('Registration failed. Please try again.');
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const isAuthenticated = !!user;
  const isAdmin = !!user && user.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        isAuthenticated,
        isAdmin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};