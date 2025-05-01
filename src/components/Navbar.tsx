
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-10 bg-solana-darkest/80 backdrop-blur-lg border-b border-solana-purple/20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex-1 flex items-center">
            <span className="font-bold text-xl text-glow">
              <span className="text-solana-cyan">SOLABOOST</span>
            </span>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="text-solana-gray hover:text-white">
              Dashboard
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <Button 
              variant="ghost" 
              className="text-solana-gray hover:text-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden pt-2 pb-4 space-y-2 animate-fade-in">
            <Button 
              variant="ghost" 
              className="text-solana-gray hover:text-white w-full justify-start"
            >
              Dashboard
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

