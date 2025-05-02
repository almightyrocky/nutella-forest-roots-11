
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { TreePine } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <TreePine className="h-24 w-24 text-nutella" />
              <div className="absolute -right-4 bottom-0 bg-hazelnut text-white text-2xl font-bold w-12 h-12 rounded-full flex items-center justify-center">
                404
              </div>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-nutella mb-4">Pagina non trovata</h1>
          <p className="text-lg text-muted-foreground mb-6">
            La pagina che stai cercando non esiste o è stata spostata.
          </p>
          <Link to="/">
            <Button className="bg-nutella hover:bg-nutella-dark">
              Torna alla home
            </Button>
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
