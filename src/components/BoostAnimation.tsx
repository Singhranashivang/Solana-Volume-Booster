
import { useEffect, useState } from "react";

interface BoostAnimationProps {
  isActive: boolean;
  loopCount: number;
  currentLoop: number;
}

const BoostAnimation = ({ isActive, loopCount, currentLoop }: BoostAnimationProps) => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive) {
      interval = setInterval(() => {
        setDots((prev) => {
          if (prev.length >= 3) return "";
          return prev + ".";
        });
      }, 500);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive]);

  if (!isActive) return null;

  const progress = Math.round((currentLoop / loopCount) * 100);

  return (
    <div className="fixed inset-0 bg-solana-darkest/80 backdrop-blur-sm flex flex-col items-center justify-center z-50 animate-fade-in">
      <div className="glass-panel p-8 max-w-md w-full mx-4 relative overflow-hidden">
        {/* Progress bar */}
        <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-solana-purple via-solana-cyan to-solana-purple-light" style={{ width: `${progress}%` }}></div>
        
        <h3 className="text-2xl font-bold text-white mb-4 text-glow">
          Boosting Volume{dots}
        </h3>
        
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full border-4 border-t-solana-purple border-solana-purple/30 animate-spin"></div>
        </div>
        
        <div className="space-y-4">
          <div className="bg-solana-darker rounded-lg p-3 terminal-text">
            <p className="text-solana-gray-light mb-1">Current Loop:</p>
            <p className="text-solana-cyan text-xl">{currentLoop} / {loopCount}</p>
          </div>
          
          <div className="bg-solana-darker rounded-lg p-3 terminal-text">
            <p className="text-solana-gray-light mb-1">Progress:</p>
            <div className="w-full bg-solana-dark rounded-full h-2.5">
              <div 
                className="bg-gradient-to-r from-solana-purple to-solana-cyan h-2.5 rounded-full"
                style={{ width: `${progress}%` }} 
              ></div>
            </div>
            <p className="text-right mt-1 text-solana-purple-light">{progress}%</p>
          </div>
        </div>
        
        <p className="text-solana-gray text-center mt-6 text-sm">
          Please don't close this window while boosting is in progress
        </p>
      </div>
    </div>
  );
};

export default BoostAnimation;
