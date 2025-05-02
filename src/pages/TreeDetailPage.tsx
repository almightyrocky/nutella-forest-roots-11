
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useForest } from "@/contexts/ForestContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TreeDetails from "@/components/TreeDetails";
import ForestMap from "@/components/ForestMap";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const TreeDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { getTree } = useForest();
  const navigate = useNavigate();
  
  // Get the tree from the forest context
  const tree = id ? getTree(id) : undefined;
  
  // Redirect if not logged in or tree doesn't exist
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    
    if (!tree) {
      navigate("/dashboard");
    }
  }, [user, tree, navigate]);
  
  if (!user || !tree) {
    return <div className="p-8 text-center">Caricamento...</div>;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <Button 
          variant="outline" 
          className="mb-4 text-white bg-nutella hover:bg-nutella-light border-nutella"
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Torna alla foresta
        </Button>
        
        <h1 className="text-3xl font-bold text-forest mb-6">{tree.name}</h1>
        
        {/* Tree details */}
        <div className="mb-8">
          <TreeDetails tree={tree} />
        </div>
        
        {/* Tree representation */}
        <div className="mb-8 p-6 bg-forest-light/10 rounded-lg">
          <h2 className="text-2xl font-bold text-forest mb-4">Il tuo albero</h2>
          
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative w-40 h-40">
              <div className="text-forest w-full h-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0.5" className="w-32 h-32">
                  <path d="m12 2-9 19h18L12 2z"/>
                </svg>
              </div>
              
              {/* Nutella jars based on CO2 absorbed - show exactly 1 jar for consistency */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div 
                  className="fruit-animation absolute"
                  style={{
                    top: '40%',
                    left: '40%',
                  }}
                >
                  <img 
                    src="/lovable-uploads/20436873-d6e7-4749-9458-fcc230280a73.png" 
                    alt="Nutella jar" 
                    className="w-6 h-6 object-contain"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-forest">Tipo</h3>
                  <Badge className="bg-forest-light/80 text-forest-dark hover:bg-forest-light border-none">
                    {tree.type.charAt(0).toUpperCase() + tree.type.slice(1)}
                  </Badge>
                </div>
                
                <div>
                  <h3 className="font-medium text-forest">Età</h3>
                  <p>{tree.ageInDays} giorni</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-forest">CO₂ assorbita</h3>
                  <p className="text-nutella font-medium">{tree.co2Absorbed.toFixed(2)} kg</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-forest">Ossigeno prodotto</h3>
                  <p>{tree.oxygenProduced.toFixed(2)} kg</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tree on map */}
        <div>
          <h2 className="text-2xl font-bold text-forest mb-4">Posizione nella foresta</h2>
          <ForestMap 
            onTreeClick={() => {}} 
            height="300px"
            showUserTreesOnly={false}
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TreeDetailPage;
