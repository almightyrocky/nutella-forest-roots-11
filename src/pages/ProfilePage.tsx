
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useForest } from "@/contexts/ForestContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { User } from "lucide-react";

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const { getUserImpact } = useForest();
  const navigate = useNavigate();
  const impact = getUserImpact();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  
  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    
    setName(user.name);
    setEmail(user.email);
  }, [user, navigate]);
  
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  
  if (!user) {
    return <div className="p-8 text-center">Reindirizzamento...</div>;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-forest mb-6">Il tuo profilo</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Informazioni personali</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Nome
                    </label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  
                  <Button className="bg-forest hover:bg-forest-dark">
                    Aggiorna profilo
                  </Button>
                </form>
                
                <div className="mt-8 pt-4 border-t">
                  <h3 className="font-medium mb-4">Azioni account</h3>
                  <div className="flex flex-wrap gap-4">
                    <Button variant="outline" className="border-forest text-forest hover:bg-forest hover:text-white">
                      Cambia password
                    </Button>
                    <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white" onClick={handleLogout}>
                      Disconnetti
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto bg-forest w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <User className="h-8 w-8 text-white" />
                </div>
                <CardTitle>{user.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Membro dal</p>
                    <p className="font-medium">
                      {new Intl.DateTimeFormat('it-IT', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      }).format(user.createdAt)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Alberi piantati</p>
                    <p className="font-medium">{impact.totalTrees}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Impact Score</p>
                    <p className="font-bold text-forest text-xl">{impact.biodiversityScore}</p>
                  </div>
                  
                  <Button 
                    className="w-full"
                    onClick={() => navigate('/impact')}
                    variant="outline"
                  >
                    Vai all'Impact Score
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProfilePage;
