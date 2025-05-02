
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useForest, Tree } from "@/contexts/ForestContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ForestMap from "@/components/ForestMap";
import ImpactStats from "@/components/ImpactStats";
import TreeCard from "@/components/TreeCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TreePine } from "lucide-react";

const DashboardPage = () => {
  const { user } = useAuth();
  const { trees } = useForest();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTree, setSelectedTree] = useState<Tree | null>(null);
  
  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);
  
  // Filter user's trees
  const userTrees = trees.filter(tree => {
    if (!user) return false;
    return tree.userId === user.id;
  });
  
  // Filter trees based on search
  const filteredTrees = userTrees.filter(tree => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    return (
      tree.name?.toLowerCase().includes(searchLower) ||
      tree.type.toLowerCase().includes(searchLower) ||
      tree.location.region.toLowerCase().includes(searchLower) ||
      tree.location.country.toLowerCase().includes(searchLower)
    );
  });
  
  const handleTreeClick = (tree: Tree) => {
    setSelectedTree(tree);
    // Scroll to tree details
    document.getElementById('tree-details')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };
  
  if (!user) {
    return <div className="p-8 text-center">Reindirizzamento...</div>;
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-[#fafdf6]">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-forest text-center">
            La tua foresta
          </h1>
          <p className="text-center text-forest-dark mt-2 mb-6">
            Esplora gli alberi che hai piantato con Nutella
          </p>
        </div>
        
        {/* Forest Map Section - prominently displayed */}
        <div className="mb-12 max-w-5xl mx-auto">
          <div className="rounded-xl overflow-hidden">
            <ForestMap 
              onTreeClick={handleTreeClick} 
              showUserTreesOnly={true}
              height="650px"
            />
          </div>
        </div>
        
        {/* Add Tree Button */}
        <div className="flex justify-center mb-10">
          <Button 
            onClick={() => navigate("/add-tree")}
            className="bg-forest hover:bg-forest-dark text-white px-6 py-6 rounded-lg shadow-md transform hover:scale-105 transition-all"
            size="lg"
          >
            <TreePine className="mr-2 h-5 w-5" /> Aggiungi un nuovo albero
          </Button>
        </div>
        
        {/* Impact Stats */}
        <div className="mb-10 max-w-5xl mx-auto">
          <ImpactStats />
        </div>
        
        {/* Selected Tree Details */}
        {selectedTree && (
          <div id="tree-details" className="mb-8 p-6 bg-gradient-to-r from-forest-light/20 to-leaf-light/20 rounded-lg max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-forest">{selectedTree.name}</h2>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate(`/tree/${selectedTree.id}`)}
                className="border-forest text-forest hover:bg-forest hover:text-white"
              >
                Dettagli completi
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/80 p-3 rounded-lg shadow-sm">
                <span className="text-muted-foreground text-sm">Tipo:</span>
                <span className="ml-2 font-medium text-forest">
                  {selectedTree.type.charAt(0).toUpperCase() + selectedTree.type.slice(1)}
                </span>
              </div>
              <div className="bg-white/80 p-3 rounded-lg shadow-sm">
                <span className="text-muted-foreground text-sm">Regione:</span>
                <span className="ml-2 font-medium text-forest">{selectedTree.location.region}</span>
              </div>
              <div className="bg-white/80 p-3 rounded-lg shadow-sm">
                <span className="text-muted-foreground text-sm">CO₂ assorbita:</span>
                <span className="ml-2 font-medium text-forest">{selectedTree.co2Absorbed.toFixed(2)} kg</span>
              </div>
            </div>
          </div>
        )}
        
        {/* Trees List */}
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <h2 className="text-2xl font-bold text-forest">I tuoi alberi ({userTrees.length})</h2>
            <div className="w-full md:w-64">
              <Input
                placeholder="Cerca i tuoi alberi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border-forest/30 focus:border-forest"
              />
            </div>
          </div>
          
          {userTrees.length === 0 ? (
            <div className="text-center py-12 bg-forest-light/10 rounded-lg border-2 border-dashed border-forest/20">
              <TreePine className="mx-auto h-16 w-16 text-forest/50 mb-4" />
              <h3 className="text-2xl font-medium mb-3 text-forest">Nessun albero piantato</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Non hai ancora piantato nessun albero nella tua foresta. Inizia a contribuire alla crescita della foresta.
              </p>
              <Button onClick={() => navigate("/add-tree")} className="bg-forest hover:bg-forest-dark px-6">
                Pianta il tuo primo albero
              </Button>
            </div>
          ) : filteredTrees.length === 0 ? (
            <div className="text-center py-8 bg-muted/30 rounded-lg border border-muted">
              <h3 className="text-xl font-medium mb-2 text-forest">Nessun risultato</h3>
              <p className="text-muted-foreground">
                Nessun albero corrisponde alla tua ricerca.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTrees.map((tree) => (
                <TreeCard key={tree.id} tree={tree} />
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DashboardPage;
