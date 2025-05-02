
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { TreePine } from "lucide-react";

const HomePage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 bg-nutella text-white">
          <div className="absolute inset-0 overflow-hidden z-0">
            <img 
              src="https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1600" 
              alt="Forest" 
              className="w-full h-full object-cover opacity-20"
            />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Nutella Forest
              </h1>
              <p className="text-xl mb-8">
                Con ogni vasetto di Nutella pianti un albero nella nostra foresta virtuale. Unisciti a noi per costruire un futuro più verde!
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="bg-white text-nutella hover:bg-hazelnut hover:text-white"
                  onClick={() => navigate("/register")}
                >
                  Unisciti ora
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="bg-white text-hazelnut hover:bg-nutella hover:text-white"
                  onClick={() => navigate("/login")}
                >
                  Accedi
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* How It Works */}
        <section className="py-16 bg-ivory">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-nutella text-center mb-12">
              Come funziona
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-nutella text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-2">Acquista Nutella</h3>
                <p className="text-muted-foreground">
                  Ogni vasetto di Nutella contiene un codice univoco.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-nutella text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-2">Registrati</h3>
                <p className="text-muted-foreground">
                  Crea un account e inserisci il tuo codice per piantare un albero.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-nutella text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-2">Fai crescere la foresta</h3>
                <p className="text-muted-foreground">
                  Monitora la crescita del tuo albero e il tuo impatto ambientale.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Benefits */}
        <section className="py-16 bg-hazelnut/10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-nutella mb-6">
                  Il tuo impatto positivo sul pianeta
                </h2>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <TreePine className="text-nutella mr-2 mt-1 flex-shrink-0" />
                    <p>
                      <strong className="text-nutella">Contrasto al cambiamento climatico</strong>
                      <span className="block text-muted-foreground">Ogni albero assorbe CO₂ dall'atmosfera.</span>
                    </p>
                  </li>
                  <li className="flex items-start">
                    <TreePine className="text-nutella mr-2 mt-1 flex-shrink-0" />
                    <p>
                      <strong className="text-nutella">Supporto alla biodiversità</strong>
                      <span className="block text-muted-foreground">Gli alberi forniscono habitat per diverse specie.</span>
                    </p>
                  </li>
                  <li className="flex items-start">
                    <TreePine className="text-nutella mr-2 mt-1 flex-shrink-0" />
                    <p>
                      <strong className="text-nutella">Ossigeno e aria pulita</strong>
                      <span className="block text-muted-foreground">Ogni albero produce ossigeno e filtra l'aria.</span>
                    </p>
                  </li>
                </ul>
                <Button
                  className="mt-6 bg-nutella hover:bg-nutella-dark text-white"
                  onClick={() => navigate("/register")}
                >
                  Inizia ora
                </Button>
              </div>
              
              <div className="relative h-64 md:h-80 lg:h-96">
                <img 
                  src="https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800" 
                  alt="Forest impact" 
                  className="rounded-lg shadow-lg object-cover w-full h-full"
                />
                <div className="absolute top-4 right-4 bg-white p-3 rounded-lg shadow-lg">
                  <p className="text-nutella text-sm font-bold">+10,000</p>
                  <p className="text-xs text-muted-foreground">Alberi piantati</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Join Now CTA */}
        <section className="py-16 bg-hazelnut text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Unisciti alla Nutella Forest</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Ogni albero conta. Insieme possiamo fare la differenza per il nostro pianeta, un vasetto di Nutella alla volta.
            </p>
            <Button 
              size="lg" 
              className="bg-white text-hazelnut hover:bg-nutella hover:text-white"
              onClick={() => navigate("/register")}
            >
              Registrati ora
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;
