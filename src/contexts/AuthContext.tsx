
import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  impactScore: number;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        // Ensure the createdAt is a Date object
        parsedUser.createdAt = new Date(parsedUser.createdAt);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // In a real app, this would be an API call
      // For demo purposes, we'll simulate a successful login if email contains "nutella"
      if (!email.includes('@') || password.length < 6) {
        toast({
          title: "Errore di login",
          description: "Email o password non validi.",
          variant: "destructive",
        });
        return false;
      }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));

      // Create mock user
      const mockUser: User = {
        id: 'user_' + Date.now(),
        name: email.split('@')[0],
        email,
        createdAt: new Date(),
        impactScore: 120,
      };

      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      toast({
        title: "Login effettuato con successo!",
        description: `Bentornato, ${mockUser.name}!`,
      });
      
      return true;
    } catch (error) {
      toast({
        title: "Errore di login",
        description: "Si è verificato un errore durante il login. Riprova più tardi.",
        variant: "destructive",
      });
      return false;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      // In a real app, this would be an API call
      if (!name || !email.includes('@') || password.length < 6) {
        toast({
          title: "Errore di registrazione",
          description: "Inserisci un nome valido, un'email valida e una password di almeno 6 caratteri.",
          variant: "destructive",
        });
        return false;
      }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));

      // Create mock user
      const mockUser: User = {
        id: 'user_' + Date.now(),
        name,
        email,
        createdAt: new Date(),
        impactScore: 0,
      };

      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      toast({
        title: "Registrazione completata!",
        description: "Il tuo account è stato creato con successo.",
      });
      
      return true;
    } catch (error) {
      toast({
        title: "Errore di registrazione",
        description: "Si è verificato un errore durante la registrazione. Riprova più tardi.",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast({
      title: "Logout effettuato",
      description: "Hai effettuato il logout con successo.",
    });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
