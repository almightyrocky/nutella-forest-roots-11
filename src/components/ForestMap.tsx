import { useEffect, useRef } from "react";
import { useForest, Tree } from "@/contexts/ForestContext";
import { useAuth } from "@/contexts/AuthContext";

// Function to create the forest map with trees
const createForestMap = (element: HTMLDivElement, trees: Tree[], userId: string, onTreeClick: (tree: Tree) => void) => {
  // Clear the container
  element.innerHTML = '';

  // Calculate safe margins as a percentage
  const safeMarginX = 10; // 10% margin on left and right
  const safeMarginY = 15; // 15% margin on top and bottom
  
    // Set up the main container styles
  element.style.position = 'relative';
  element.style.overflow = 'hidden';
  element.style.backgroundImage = 'url("/lovable-uploads/aebc19c4-a416-4c1f-b1b3-4326f207d15c.png")';
  element.style.backgroundSize = 'cover';
  element.style.backgroundPosition = 'center';
  element.style.borderRadius = '12px';
  element.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
  
  // Add a semi-transparent overlay for better contrast
  const overlay = document.createElement('div');
  overlay.style.position = 'absolute';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.backgroundColor = 'rgba(75, 41, 24, 0.1)';
  overlay.style.zIndex = '1';
  element.appendChild(overlay);
  
  // For each tree, create a marker on the map
  trees.forEach((tree) => {
    const marker = document.createElement('div');
    marker.style.position = 'absolute';

    // Normalize coordinates to position within the div
    // Normalize coordinates to position within the div, with safe margins
    let posX = (tree.location.lng - 8) / 12 * 100; // 8-20 longitude range
    let posY = (46 - tree.location.lat) / 6 * 100; // 41-47 latitude range
    
    // Ensure trees are not placed within the safe margins
    posX = safeMarginX + (posX * (100 - 2 * safeMarginX) / 100);
    posY = safeMarginY + (posY * (100 - 2 * safeMarginY) / 100);

    marker.style.left = `${posX}%`;
    marker.style.top = `${posY}%`;
    marker.style.transform = 'translate(-50%, -50%)';
    marker.style.cursor = 'pointer';
    marker.style.zIndex = '10';
    
    // Style markers based on whether it's the user's tree or not
      const isUserTree = tree.userId === userId;

    if (isUserTree) {
      // User's trees - larger with custom tree icon
      const iconSize = 64; // Increased icon size
      marker.innerHTML = `
        <div class="group relative animate-tree-grow" style="width: ${iconSize}px; height: ${iconSize}px;">
          <div class="relative" >
             <img 
                src="/lovable-uploads/b35159df-0ff4-41dc-a4d4-872913479a4c.png" 
                alt="Albero" 
                class="w-full h-full object-contain"
             />

            <div class="absolute bottom-1 right-1 flex flex-wrap justify-end items-end max-w-16 z-30">
              ${Array(Math.min(3, Math.max(1, Math.floor(tree.co2Absorbed / 5)))).fill(0).map((_, i) => `
                <img 
                  src="/lovable-uploads/20436873-d6e7-4749-9458-fcc230280a73.png" 
                  alt="Barattolo di Nutella" 
                  class="w-6 h-6 object-contain -mr-1 -mb-1"
                  style="animation: bounce 1s infinite alternate; animation-delay: ${i * 0.2}s"
                />
              `).join('')}
            </div>
          </div>
          <div class="opacity-0 group-hover:opacity-100 absolute -top-16 left-1/2 transform -translate-x-1/2 bg-white text-nutella text-xs px-3 py-1.5 rounded-lg shadow-md transition-opacity whitespace-nowrap z-40">
            <strong>${tree.name}</strong><br/>
            <span class="text-forest font-medium">${tree.co2Absorbed.toFixed(1)}kg CO₂</span>
          </div>
        </div>
      `;
    } else {
      // Alberi degli altri utenti - più piccoli
      const iconSize = 24; 
      marker.innerHTML = `
        <div class="group relative animate-tree-grow" style="width: ${iconSize}px; height: ${iconSize}px;">
         
             <img src="/lovable-uploads/b35159df-0ff4-41dc-a4d4-872913479a4c.png" alt="Albero" class="w-full h-full object-contain" />
          <div class="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 transform -translate-x-1/2 bg-white text-nutella text-xs px-2 py-1 rounded shadow transition-opacity whitespace-nowrap z-40">
            ${tree.name}         
          </div>
        </div>
      `;
    }
    
    // Add click event
    marker.onclick = () => onTreeClick(tree);
    element.appendChild(marker);
  });

  // Add fade-in animation
  element.style.animation = 'fadeIn 1s ease-in-out';
};

interface ForestMapProps {
  onTreeClick: (tree: Tree) => void;
  height?: string;
  showUserTreesOnly?: boolean;
}

const ForestMap = ({ onTreeClick, height = "500px", showUserTreesOnly = false }: ForestMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const { trees } = useForest();
  const { user } = useAuth();
  
  useEffect(() => {
    if (mapRef.current && user) {
      const filteredTrees = showUserTreesOnly 
        ? trees.filter(tree => tree.userId === user.id)
        : trees;
      
      createForestMap(mapRef.current, filteredTrees, user.id, onTreeClick);
    }
  }, [trees, user, showUserTreesOnly, onTreeClick]);
  
  const treeIcon = "/lovable-uploads/b35159df-0ff4-41dc-a4d4-872913479a4c.png";
  
  return (
    <div className="relative w-full">
      <div
        ref={mapRef}
        style={{ height, width: '100%' }}
        className="w-full border-4 border-forest/30 rounded-xl shadow-2xl bg-green-100"
        data-testid="forest-map"
      >
        {/* The map will be rendered here */}
      </div>
      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-3 z-20 border border-forest/20">
        <div className="flex items-center space-x-2">
          <div className="text-forest" style={{ width: '24px', height: '24px' }}>
             <img src={treeIcon} alt="Albero" className="w-full h-full object-contain" />
           
          </div>
          <span className="text-xs">I tuoi alberi</span>
        </div>
      </div>
    </div>
  );
};

export default ForestMap;
