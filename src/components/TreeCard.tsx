
import { Link } from "react-router-dom";
import { Tree } from "@/contexts/ForestContext";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface TreeCardProps {
  tree: Tree;
}

const TreeCard = ({ tree }: TreeCardProps) => {
  // Format the date
  const formattedDate = new Intl.DateTimeFormat('it-IT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(tree.plantedDate);
  
  // Calculate number of jars (fruits) based on CO2 absorbed
  const numJars = Math.min(5, Math.max(1, Math.floor(tree.co2Absorbed / 5)));
  
  return (
    <Card className="overflow-hidden card-hover">
      <div className="h-40 bg-hazelnut/20 flex items-center justify-center overflow-hidden relative">
        {/* Albero principale */}
        <img 
          src="/lovable-uploads/2f36f8d8-ccd3-4b33-b9f7-7ec8b88d4209.png" 
          alt={tree.name} 
          className="w-full h-full object-cover"
        />
        
        {/* Vasetti come frutti */}
        <div className="absolute bottom-2 right-2 flex flex-wrap justify-end max-w-24">
          {Array(numJars).fill(0).map((_, i) => (
            <div key={i} className="fruit-animation" style={{ animationDelay: `${i * 0.15}s` }}>
              <img 
                src="/lovable-uploads/20436873-d6e7-4749-9458-fcc230280a73.png" 
                alt="Nutella jar" 
                className="w-7 h-7 object-contain -mr-1 -mb-1"
              />
            </div>
          ))}
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold text-lg text-nutella">{tree.name}</h3>
        <div className="text-sm text-muted-foreground">
          <p>Piantato il {formattedDate}</p>
          <p>
            {tree.location.region}, {tree.location.country}
          </p>
          <div className="mt-2 flex gap-2">
            <span className="bg-forest/20 text-forest-dark text-xs py-1 px-2 rounded-full">
              {tree.co2Absorbed.toFixed(1)} kg CO₂
            </span>
            <span className="bg-hazelnut/20 text-nutella text-xs py-1 px-2 rounded-full">
              {tree.type}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link to={`/tree/${tree.id}`} className="w-full">
          <Button variant="outline" className="w-full border-nutella text-nutella hover:bg-nutella hover:text-white">
            Dettagli
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default TreeCard;
