
import React from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  bgImage?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ 
  title, 
  description, 
  bgImage = "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop" 
}) => {
  return (
    <div className="relative">
      <div 
        className="h-[300px] md:h-[400px] bg-cover bg-center relative"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-agro-dark/80 to-agro/60"></div>
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="max-w-3xl px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fade-in opacity-0" 
                style={{animation: "fade-in 0.8s forwards 0.2s", textShadow: "0 2px 4px rgba(0,0,0,0.3)"}}>
              {title}
            </h1>
            {description && (
              <p className="text-lg md:text-xl text-white/90 animate-fade-in opacity-0" 
                 style={{animation: "fade-in 0.8s forwards 0.4s", textShadow: "0 1px 2px rgba(0,0,0,0.3)"}}>
                {description}
              </p>
            )}
          </div>
        </div>
      </div>
      
      <div className="absolute -bottom-5 left-0 right-0 flex justify-center">
        <div className="w-24 h-10 bg-white shadow-md rounded-t-lg"></div>
      </div>
    </div>
  );
};

export default PageHeader;
