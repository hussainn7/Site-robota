
import React from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  bgImage?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ 
  title, 
  description, 
  bgImage = "/images/field-header.jpg" 
}) => {
  return (
    <div 
      className="relative bg-agro-dark py-16 md:py-24"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="container-custom relative z-10 text-center text-white">
        <h1 className="mb-4">{title}</h1>
        {description && (
          <p className="max-w-3xl mx-auto text-lg md:text-xl opacity-90">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
