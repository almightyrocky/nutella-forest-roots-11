
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, TreePine, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-nutella text-white shadow-md w-full z-10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <TreePine className="w-8 h-8" />
            <span className="font-bold text-xl">Nutella Forest</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`hover:text-hazelnut-light transition-colors ${isActive("/") ? "font-semibold" : ""}`}
            >
              Home
            </Link>
            
            {user ? (
              <>
                <Link 
                  to="/dashboard" 
                  className={`hover:text-hazelnut-light transition-colors ${isActive("/dashboard") ? "font-semibold" : ""}`}
                >
                  La mia foresta
                </Link>
                <Link 
                  to="/add-tree" 
                  className={`hover:text-hazelnut-light transition-colors ${isActive("/add-tree") ? "font-semibold" : ""}`}
                >
                  Aggiungi Albero
                </Link>
                <Link 
                  to="/impact" 
                  className={`hover:text-hazelnut-light transition-colors ${isActive("/impact") ? "font-semibold" : ""}`}
                >
                  Impact Score
                </Link>
                <div className="flex items-center space-x-3">
                  <Link to="/profile" className="flex items-center space-x-1 hover:text-hazelnut-light">
                    <User className="h-5 w-5" />
                    <span>{user.name}</span>
                  </Link>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleLogout} 
                    className="logout-btn"
                  >
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className={`hover:text-hazelnut-light transition-colors ${isActive("/login") ? "font-semibold" : ""}`}
                >
                  Accedi
                </Link>
                <Link to="/register">
                  <Button size="sm" className="login-btn">
                    Registrati
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-3 pb-3 space-y-3">
            <Link 
              to="/" 
              className="block py-2 hover:text-hazelnut-light"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            
            {user ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="block py-2 hover:text-hazelnut-light"
                  onClick={() => setIsMenuOpen(false)}
                >
                  La mia foresta
                </Link>
                <Link 
                  to="/add-tree" 
                  className="block py-2 hover:text-hazelnut-light"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Aggiungi Albero
                </Link>
                <Link 
                  to="/impact" 
                  className="block py-2 hover:text-hazelnut-light"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Impact Score
                </Link>
                <Link 
                  to="/profile" 
                  className="flex items-center space-x-1 py-2 hover:text-hazelnut-light"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="h-5 w-5" />
                  <span>{user.name}</span>
                </Link>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }} 
                  className="w-full logout-btn"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="block py-2 hover:text-hazelnut-light"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Accedi
                </Link>
                <Link to="/register" className="block" onClick={() => setIsMenuOpen(false)}>
                  <Button size="sm" className="w-full login-btn">
                    Registrati
                  </Button>
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
