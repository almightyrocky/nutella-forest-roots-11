
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useForest } from "@/contexts/ForestContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ImpactStats from "@/components/ImpactStats";
import ImpactBadge from "@/components/ImpactBadge";
import { Card, CardContent } from "@/components/ui/card";
import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const ImpactPage = () => {
  const { user } = useAuth();
  const { getUserImpact } = useForest();
  const navigate = useNavigate();
  const impact = getUserImpact();
  
  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);
  
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
  
  if (!user) {
    return <div className="p-8 text-center">Reindirizzamento...</div>;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <h1 className="text-3xl font-bold text-forest">Impact Score</h1>
          <Button 
            onClick={handleShare}
            variant="outline"
            className="border-forest text-forest hover:bg-forest hover:text-white"
          >
            <Share2 className="mr-2 h-4 w-4" /> Condividi
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <ImpactStats />
            
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-forest mb-4">Come si calcola l'Impact Score</h2>
              <Card>
                <CardContent className="p-6">
                  <p className="mb-4">
                    L'Impact Score è un punteggio che rappresenta il tuo contributo positivo all'ambiente attraverso la Nutella Forest. Viene calcolato sulla base di diversi fattori:
                  </p>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-start">
                      <span className="bg-forest text-white rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0">1</span>
                      <div>
                        <span className="font-medium">Numero di alberi piantati</span>
                        <p className="text-sm text-muted-foreground">Ogni albero che pianti aumenta il tuo punteggio.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-forest text-white rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0">2</span>
                      <div>
                        <span className="font-medium">Varietà delle specie</span>
                        <p className="text-sm text-muted-foreground">Piantare diverse specie di alberi aumenta la biodiversità e il tuo punteggio.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-forest text-white rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0">3</span>
                      <div>
                        <span className="font-medium">Età degli alberi</span>
                        <p className="text-sm text-muted-foreground">Alberi più vecchi hanno un impatto maggiore sull'ambiente.</p>
                      </div>
                    </li>
                  </ul>
                  <p className="text-sm text-muted-foreground">
                    Continua a piantare alberi e a monitorare il loro sviluppo per aumentare il tuo Impact Score!
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div>
            <ImpactBadge />
            
            <div className="mt-6">
              <h3 className="text-xl font-bold text-forest mb-4">I tuoi obiettivi</h3>
              <Card>
                <CardContent className="p-6 space-y-4">
                  {impact.totalTrees < 3 ? (
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Pianta 3 alberi</p>
                        <p className="text-xs text-muted-foreground">
                          {impact.totalTrees}/3 alberi
                        </p>
                      </div>
                      <div className="w-16 h-4 bg-gray-200 rounded-full">
                        <div 
                          className="h-4 bg-forest rounded-full" 
                          style={{ width: `${(impact.totalTrees / 3) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-forest">Pianta 3 alberi</p>
                        <p className="text-xs text-forest">Completato!</p>
                      </div>
                      <div className="w-16 h-4 bg-forest rounded-full"></div>
                    </div>
                  )}
                  
                  {impact.biodiversityScore < 100 ? (
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Raggiungi 100 Impact Points</p>
                        <p className="text-xs text-muted-foreground">
                          {impact.biodiversityScore}/100 punti
                        </p>
                      </div>
                      <div className="w-16 h-4 bg-gray-200 rounded-full">
                        <div 
                          className="h-4 bg-forest rounded-full" 
                          style={{ width: `${Math.min(100, impact.biodiversityScore)}%` }}
                        ></div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-forest">Raggiungi 100 Impact Points</p>
                        <p className="text-xs text-forest">Completato!</p>
                      </div>
                      <div className="w-16 h-4 bg-forest rounded-full"></div>
                    </div>
                  )}
                  
                  <div className="pt-2 border-t text-center">
                    <Button
                      onClick={() => navigate('/add-tree')}
                      className="w-full bg-forest hover:bg-forest-dark mt-2"
                    >
                      Pianta più alberi
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ImpactPage;
