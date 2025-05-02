
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useForest } from "@/contexts/ForestContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TreePine } from "lucide-react";

const AddTreePage = () => {
  const [code, setCode] = useState("");
  const [treeName, setTreeName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { addTree } = useForest();
  const navigate = useNavigate();
  
  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const success = await addTree(code, treeName);
      if (success) {
        navigate("/dashboard");
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  if (!user) {
    return <div className="p-8 text-center">Reindirizzamento...</div>;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto bg-nutella rounded-full p-4 mb-4 w-16 h-16 flex items-center justify-center">
                <TreePine className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Aggiungi un albero</CardTitle>
              <CardDescription>
                Inserisci il codice che trovi nel vasetto di Nutella per piantare un albero nella tua foresta.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="code" className="text-sm font-medium">
                    Codice univoco
                  </label>
                  <Input
                    id="code"
                    placeholder="Inserisci il codice (es. NUT-12345)"
                    required
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Puoi trovare il codice all'interno della confezione del vasetto di Nutella.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="treeName" className="text-sm font-medium">
                    Nome del tuo albero (opzionale)
                  </label>
                  <Input
                    id="treeName"
                    placeholder="Es. Il mio primo albero"
                    value={treeName}
                    onChange={(e) => setTreeName(e.target.value)}
                  />
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-nutella hover:bg-nutella-dark"
                  disabled={isLoading}
                >
                  {isLoading ? "Aggiunta in corso..." : "Pianta il tuo albero"}
                </Button>
              </form>
              
              <div className="mt-8 border-t pt-4">
                <h3 className="font-medium mb-2">Dove trovo il codice?</h3>
                <ol className="list-decimal pl-4 space-y-2 text-sm text-muted-foreground">
                  <li>Acquista un vasetto di Nutella</li>
                  <li>Cerca all'interno della confezione il codice univoco a 8-10 caratteri</li>
                  <li>Inserisci il codice nel campo sopra</li>
                </ol>
                <p className="mt-4 text-sm text-muted-foreground">
                  Ogni codice può essere utilizzato una sola volta.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-6 text-center">
            <Button variant="ghost" onClick={() => navigate("/dashboard")} className="text-nutella">
              Torna alla tua foresta
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AddTreePage;
