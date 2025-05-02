
import { useForest } from "@/contexts/ForestContext";
import { Card, CardContent } from "@/components/ui/card";
import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const getBadgeInfo = (score: number) => {
  if (score >= 200) return { name: "Guardiano della Foresta", color: "bg-forest text-white" };
  if (score >= 100) return { name: "Difensore della Natura", color: "bg-forest-light text-forest-dark" };
  if (score >= 50) return { name: "Amico degli Alberi", color: "bg-earth-light text-white" };
  return { name: "Nuovo Piantatore", color: "bg-muted text-forest" };
};

const ImpactBadge = () => {
  const { getUserImpact } = useForest();
  const impact = getUserImpact();
  const badge = getBadgeInfo(impact.biodiversityScore);
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Il mio Impact Score nella Nutella Forest',
        text: `Ho un Impact Score di ${impact.biodiversityScore} con ${impact.totalTrees} alberi piantati nella Nutella Forest! Unisciti anche tu!`,
        url: window.location.href,
      })
      .catch((error) => console.log('Errore nella condivisione', error));
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(
        `Ho un Impact Score di ${impact.biodiversityScore} con ${impact.totalTrees} alberi piantati nella Nutella Forest! Unisciti anche tu! ${window.location.href}`
      )
        .then(() => alert('Link copiato negli appunti!'))
        .catch((err) => console.error('Errore nella copia: ', err));
    }
  };
  
  // Calculate the number of jars to display based on the total number of trees
  // Show 1 jar per tree, with minimum 1 and maximum 10
  const numJars = Math.min(10, Math.max(1, impact.totalTrees));
  
  return (
    <Card className="overflow-hidden">
      <div className={`p-6 ${badge.color}`}>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold">Il tuo badge</h3>
            <p className="text-sm opacity-80">Basato sul tuo Impact Score</p>
          </div>
          <Button 
            size="sm" 
            variant="ghost" 
            className="hover:bg-white/20"
            onClick={handleShare}
          >
            <Share2 size={16} className="mr-1" />
            Condividi
          </Button>
        </div>
      </div>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h4 className="font-bold text-2xl text-forest">{badge.name}</h4>
            <p className="text-sm text-muted-foreground">
              {impact.totalTrees} {impact.totalTrees === 1 ? 'albero piantato' : 'alberi piantati'}
            </p>
          </div>
          <div className="text-4xl font-bold text-forest">
            {impact.biodiversityScore}
          </div>
        </div>
        
        {/* Tree with jars visualization */}
        <div className="flex justify-center my-6 relative">
          <div className="relative">
            <img 
              src="/lovable-uploads/b35159df-0ff4-41dc-a4d4-872913479a4c.png" 
              alt="Your impact tree" 
              className="h-40 object-contain"
            />
            <div className="absolute inset-0 flex flex-wrap justify-center items-center">
              {Array(numJars).fill(0).map((_, i) => (
                <div 
                  key={i} 
                  className="fruit-animation absolute"
                  style={{
                    top: `${20 + Math.sin(i * 0.8) * 20}%`,
                    left: `${20 + (i * 60 / numJars)}%`,
                    animationDelay: `${i * 0.15}s`
                  }}
                >
                  <img 
                    src="/lovable-uploads/20436873-d6e7-4749-9458-fcc230280a73.png" 
                    alt="Nutella jar" 
                    className="w-8 h-8 object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="h-2 w-full bg-gray-200 rounded-full">
            <div 
              className="h-2 bg-forest rounded-full" 
              style={{ width: `${Math.min(100, impact.biodiversityScore / 3)}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>0</span>
            <span>100</span>
            <span>200</span>
            <span>300</span>
          </div>
        </div>
        
        <p className="mt-4 text-sm text-muted-foreground">
          {impact.biodiversityScore < 50 
            ? "Continua a piantare alberi per aumentare il tuo impatto!" 
            : impact.biodiversityScore < 100 
              ? "Stai facendo la differenza! Continua così." 
              : "Sei un vero eroe ambientale! Il tuo contributo è significativo."}
        </p>
      </CardContent>
    </Card>
  );
};

export default ImpactBadge;
