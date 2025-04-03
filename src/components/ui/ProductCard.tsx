
import React from "react";
import { Button } from "@/components/ui/button";
import { Tag } from "lucide-react";

interface ProductCardProps {
  id: number;
  name: string;
  description: string;
  image: string;
  price: string;
  category: string;
  onOrder: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  description,
  image,
  price,
  category,
  onOrder,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden card-hover h-full flex flex-col">
      <div className="relative h-56 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        />
        <div className="absolute top-0 left-0 m-3">
          <span className="px-3 py-1 bg-agro-beige text-agro-dark rounded-full text-sm font-medium inline-flex items-center">
            <Tag className="h-3.5 w-3.5 mr-1 stroke-[2.5]" />
            {category}
          </span>
        </div>
        <div className="absolute bottom-0 right-0 m-3">
          <div className="px-3 py-1 bg-agro text-white rounded-full text-sm font-bold">
            {price}
          </div>
        </div>
      </div>
      
      <div className="p-5 flex-grow flex flex-col">
        <h3 className="text-xl font-bold mb-2 text-agro-dark">{name}</h3>
        <p className="text-gray-600 mb-5 flex-grow">{description}</p>
        <Button 
          onClick={(e) => {
            e.preventDefault();
            onOrder();
          }}
          className="w-full bg-agro hover:bg-agro-dark transition-colors duration-300 shadow-sm"
        >
          Заказать
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
