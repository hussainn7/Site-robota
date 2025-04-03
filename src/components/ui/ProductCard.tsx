
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  id: string | number;
  name: string;
  description: string;
  image: string;
  price?: string;
  category: string;
  onOrder?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  id, 
  name, 
  description, 
  image, 
  price, 
  category,
  onOrder 
}) => {
  return (
    <Card className="overflow-hidden card-hover h-full flex flex-col">
      <div className="relative h-56 overflow-hidden">
        <div className="absolute top-2 left-2 bg-agro text-white text-xs py-1 px-2 rounded-md">
          {category}
        </div>
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <CardContent className="p-5 flex-grow">
        <h3 className="text-xl font-bold mb-2">{name}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{description}</p>
        {price && (
          <p className="text-agro-dark font-bold">
            {price}
          </p>
        )}
      </CardContent>
      <CardFooter className="p-5 pt-0">
        <Button 
          className="w-full" 
          onClick={onOrder}
        >
          Заказать
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
