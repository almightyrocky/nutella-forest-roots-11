
import { useForest } from "@/contexts/ForestContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ImpactStatsProps {
  showTitle?: boolean;
}

const ImpactStats = ({ showTitle = true }: ImpactStatsProps) => {
  const { getUserImpact } = useForest();
  const impact = getUserImpact();
  
  return (
    <div className="space-y-4">
      {showTitle && (
        <h2 className="text-2xl font-bold text-forest">Il tuo impatto ambientale</h2>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-forest">Alberi piantati</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{impact.totalTrees}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {impact.totalTrees === 0 
                ? "Pianta il tuo primo albero!" 
                : impact.totalTrees === 1 
                  ? "Hai piantato il tuo primo albero!" 
                  : "Continua così!"}
            </p>
          </CardContent>
        </Card>
        
        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-forest">CO₂ assorbita</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{impact.totalCO2.toFixed(2)} kg</div>
            <p className="text-xs text-muted-foreground mt-1">
              {impact.totalCO2 === 0 
                ? "Aggiungi un albero per iniziare" 
                : `Equivalente a ${(impact.totalCO2 / 2).toFixed(1)} giorni senza auto`}
            </p>
          </CardContent>
        </Card>
        
        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-forest">Ossigeno prodotto</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{impact.totalOxygen.toFixed(2)} kg</div>
            <p className="text-xs text-muted-foreground mt-1">
              {impact.totalOxygen === 0 
                ? "Aggiungi un albero per iniziare" 
                : `Sufficiente per ${Math.round(impact.totalOxygen * 50)} ore di respirazione`}
            </p>
          </CardContent>
        </Card>
        
        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-forest">Biodiversità</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{impact.biodiversityScore}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {impact.biodiversityScore < 50 
                ? "Livello iniziale" 
                : impact.biodiversityScore < 100 
                  ? "Livello intermedio" 
                  : "Livello avanzato!"}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ImpactStats;
