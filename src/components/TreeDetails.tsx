
import { Tree, useForest } from "@/contexts/ForestContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TreeDetailsProps {
  tree: Tree;
}

const TreeDetails = ({ tree }: TreeDetailsProps) => {
  const { toast } = useToast();
  
  // Format the date
  const formattedDate = new Intl.DateTimeFormat('it-IT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(tree.plantedDate);

  // Calculate number of jars (fruits) based on CO2 absorbed
  const numJars = Math.min(12, Math.max(1, Math.floor(tree.co2Absorbed / 5)));

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Il mio albero ${tree.name} nella Nutella Forest`,
        text: `Ho piantato un albero di tipo ${tree.type} nella Nutella Forest! Finora ha assorbito ${tree.co2Absorbed.toFixed(1)}kg di CO₂. Unisciti anche tu!`,
        url: window.location.href,
      })
      .catch((error) => console.log('Errore nella condivisione', error));
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(
        `Ho piantato un albero di tipo ${tree.type} nella Nutella Forest! Finora ha assorbito ${tree.co2Absorbed.toFixed(1)}kg di CO₂. Unisciti anche tu! ${window.location.href}`
      )
        .then(() => {
          toast({
            title: "Link copiato",
            description: "Il link è stato copiato negli appunti!",
          });
        })
        .catch((err) => console.error('Errore nella copia: ', err));
    }
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <div className="aspect-square bg-muted rounded-lg overflow-hidden mb-4 relative">
          {/* Tree image */}
          <img 
            src="/lovable-uploads/2f36f8d8-ccd3-4b33-b9f7-7ec8b88d4209.png" 
            alt={tree.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Share button */}
        <div className="flex gap-4">
          <Button 
            className="flex-1 bg-nutella hover:bg-nutella-dark" 
            onClick={handleShare}
          >
            <Share2 size={16} className="mr-2" />
            Condividi
          </Button>
        </div>   </div>
      

      <div className="space-y-4">
        <Card>
          <CardHeader className="bg-nutella/10">
            <CardTitle className="text-nutella-dark">{tree.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              <div>
                <p className="text-sm text-muted-foreground">Tipo</p>
                <p className="font-medium">{tree.type.charAt(0).toUpperCase() + tree.type.slice(1)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Piantato il</p>
                <p className="font-medium">{formattedDate}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Località</p>
                <p className="font-medium">{tree.location.region}, {tree.location.country}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Età</p>
                <p className="font-medium">{tree.ageInDays} giorni</p>
              </div>
            </div>
            
            <div className="pt-2 border-t">
              <h4 className="font-semibold mb-2">Impatto ambientale</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-leaf-light/20 p-2 rounded-lg">
                  <p className="text-sm text-forest-dark">CO₂ assorbita</p>
                  <p className="font-bold text-forest">{tree.co2Absorbed.toFixed(2)} kg</p>
                </div>
                <div className="bg-leaf-light/20 p-2 rounded-lg">
                  <p className="text-sm text-forest-dark">Ossigeno prodotto</p>
                  <p className="font-bold text-forest">{tree.oxygenProduced.toFixed(2)} kg</p>
                </div>
              </div>
              <div className="mt-3">
                <p className="text-sm text-forest-dark mb-1">Vasetti Nutella</p>
                <div className="flex flex-wrap">
                  {Array(numJars).fill(0).map((_, i) => (
                    <div key={i} className="mr-1 mb-1">
                      <img 
                        src="/lovable-uploads/20436873-d6e7-4749-9458-fcc230280a73.png" 
                        alt="Nutella jar" 
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {numJars} {numJars === 1 ? 'vasetto' : 'vasetti'} registrati
                </p>
              </div>
            </div>
            
            <div className="pt-2 border-t">
              <h4 className="font-semibold mb-2">Codice</h4>
              <p className="font-mono bg-muted p-2 rounded text-center">{tree.code}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>


  );
};

export default TreeDetails;
