
import { Link } from "react-router-dom";
import { TreePine, Facebook, Instagram, Share2 } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-nutella text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <TreePine className="w-6 h-6" />
              <h3 className="text-xl font-bold text-white">Nutella Forest</h3>
            </div>
            <p className="text-sm opacity-80">
              Unisciti a noi per creare un futuro più verde. Ogni albero piantato è un passo verso un mondo più sostenibile.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4 text-white">Link utili</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm hover:text-hazelnut-light transition-colors">Home</Link></li>
              <li><Link to="/dashboard" className="text-sm hover:text-hazelnut-light transition-colors">La mia foresta</Link></li>
              <li><Link to="/impact" className="text-sm hover:text-hazelnut-light transition-colors">Impact Score</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4 text-white">Seguici</h4>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-hazelnut-light transition-colors">
                <Facebook />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-hazelnut-light transition-colors">
                <Instagram />
              </a>
              <a href="#" className="hover:text-hazelnut-light transition-colors">
                <Share2 />
              </a>
            </div>
            <p className="mt-4 text-sm opacity-80">
              © {new Date().getFullYear()} Nutella Forest. <br />
              Tutti i diritti riservati.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
