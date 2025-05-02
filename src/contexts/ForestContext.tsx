
import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

export type TreeType = 'oak' | 'pine' | 'maple' | 'birch';

export type Tree = {
  id: string;
  userId: string;
  code: string;
  plantedDate: Date;
  type: TreeType;
  name?: string;
  location: {
    lat: number;
    lng: number;
    country: string;
    region: string;
  };
  co2Absorbed: number; // kg
  oxygenProduced: number; // kg
  ageInDays: number;
};

type ForestContextType = {
  trees: Tree[];
  loading: boolean;
  error: string | null;
  addTree: (code: string, name?: string) => Promise<boolean>;
  getTree: (id: string) => Tree | undefined;
  getUserImpact: () => {
    totalTrees: number;
    totalCO2: number;
    totalOxygen: number;
    biodiversityScore: number;
  };
};

const ForestContext = createContext<ForestContextType | undefined>(undefined);

export const useForest = () => {
  const context = useContext(ForestContext);
  if (!context) {
    throw new Error('useForest must be used within a ForestProvider');
  }
  return context;
};

// Helper to generate random tree data
const generateRandomTree = (userId: string, code: string, name?: string): Tree => {
  const treeTypes: TreeType[] = ['oak', 'pine', 'maple', 'birch'];
  const countries = ['Italia', 'Spagna', 'Francia', 'Germania'];
  const regions = ['Nutella Forest'];
  
  const randomType = treeTypes[Math.floor(Math.random() * treeTypes.length)];
  const randomCountry = countries[Math.floor(Math.random() * countries.length)];
  const randomRegion = regions[Math.floor(Math.random() * regions.length)];
  
  // Random coordinates around Europe
  const lat = 41 + (Math.random() * 6);
  const lng = 8 + (Math.random() * 12);
  
  const plantedDate = new Date();
  plantedDate.setDate(plantedDate.getDate() - Math.floor(Math.random() * 365)); // Random planting date in the last year
  
  const ageInDays = Math.floor((new Date().getTime() - plantedDate.getTime()) / (1000 * 60 * 60 * 24));
  
  // CO2 and oxygen values based on age
  const co2Absorbed = ageInDays * 0.02; // Approx 7.3kg per year
  const oxygenProduced = ageInDays * 0.015; // Approx 5.5kg per year
  
  return {
    id: 'tree_' + Date.now() + Math.random().toString(36).substr(2, 5),
    userId,
    code,
    plantedDate,
    type: randomType,
    name: name || `Albero ${randomType.charAt(0).toUpperCase() + randomType.slice(1)}`,
    location: {
      lat,
      lng,
      country: randomCountry,
      region: randomRegion
    },
    co2Absorbed,
    oxygenProduced,
    ageInDays
  };
};

export const ForestProvider = ({ children }: { children: ReactNode }) => {
  const [trees, setTrees] = useState<Tree[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Load trees from localStorage on mount
  useEffect(() => {
    const storedTrees = localStorage.getItem('trees');
    if (storedTrees) {
      try {
        const parsedTrees = JSON.parse(storedTrees);
        // Convert string dates back to Date objects
        const treesWithDates = parsedTrees.map((tree: any) => ({
          ...tree,
          plantedDate: new Date(tree.plantedDate)
        }));
        setTrees(treesWithDates);
      } catch (error) {
        console.error('Error parsing stored trees data:', error);
        localStorage.removeItem('trees');
      }
    }
  }, []);

  // Save trees to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('trees', JSON.stringify(trees));
  }, [trees]);

  const addTree = async (code: string, name?: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      // In a real app, this would validate the code against a database
      if (!code || code.length < 5) {
        toast({
          title: "Codice non valido",
          description: "Inserisci un codice valido dal vasetto di Nutella.",
          variant: "destructive",
        });
        setLoading(false);
        return false;
      }

      // Check if code already exists
      if (trees.some(tree => tree.code === code)) {
        toast({
          title: "Codice già utilizzato",
          description: "Questo codice è già stato riscattato.",
          variant: "destructive",
        });
        setLoading(false);
        return false;
      }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Get user ID from localStorage
      const storedUser = localStorage.getItem('user');
      if (!storedUser) {
        setError("Utente non autenticato");
        setLoading(false);
        return false;
      }

      const user = JSON.parse(storedUser);
      const newTree = generateRandomTree(user.id, code, name);

      setTrees(prevTrees => [...prevTrees, newTree]);
      
      toast({
        title: "Albero aggiunto con successo!",
        description: `Il tuo albero ${newTree.name} è stato piantato nella foresta.`,
      });
      
      setLoading(false);
      return true;
    } catch (error) {
      setError("Errore nell'aggiunta dell'albero");
      toast({
        title: "Errore",
        description: "Si è verificato un errore durante l'aggiunta dell'albero.",
        variant: "destructive",
      });
      setLoading(false);
      return false;
    }
  };

  const getTree = (id: string): Tree | undefined => {
    return trees.find(tree => tree.id === id);
  };

  const getUserImpact = () => {
    const userTrees = trees.filter(tree => {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) return false;
      const user = JSON.parse(storedUser);
      return tree.userId === user.id;
    });
    
    const totalTrees = userTrees.length;
    const totalCO2 = userTrees.reduce((sum, tree) => sum + tree.co2Absorbed, 0);
    const totalOxygen = userTrees.reduce((sum, tree) => sum + tree.oxygenProduced, 0);
    
    // Calculate a biodiversity score based on the variety of tree types
    const uniqueTypes = new Set(userTrees.map(tree => tree.type)).size;
    const biodiversityScore = Math.round((uniqueTypes / 4) * 100) + (totalTrees * 5);
    
    return {
      totalTrees,
      totalCO2,
      totalOxygen,
      biodiversityScore
    };
  };

  return (
    <ForestContext.Provider value={{
      trees,
      loading,
      error,
      addTree,
      getTree,
      getUserImpact
    }}>
      {children}
    </ForestContext.Provider>
  );
};
