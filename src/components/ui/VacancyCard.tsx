
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface VacancyCardProps {
  title: string;
  department: string;
  location: string;
  salary: string;
  description: string;
  requirements: string[];
  onApply: () => void;
}

const VacancyCard: React.FC<VacancyCardProps> = ({
  title,
  department,
  location,
  salary,
  description,
  requirements,
  onApply,
}) => {
  return (
    <Card className="overflow-hidden card-hover">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
          <div>
            <h3 className="text-xl font-bold">{title}</h3>
            <p className="text-gray-600">{department} · {location}</p>
          </div>
          <div className="bg-agro-beige text-agro-dark px-4 py-2 rounded-md font-medium text-center md:text-right whitespace-nowrap">
            {salary}
          </div>
        </div>
        
        <div className="mb-4">
          <p className="text-gray-700">{description}</p>
        </div>
        
        {requirements.length > 0 && (
          <div className="mb-4">
            <h4 className="font-bold mb-2">Требования:</h4>
            <ul className="list-disc pl-5 space-y-1">
              {requirements.map((req, index) => (
                <li key={index} className="text-gray-700">{req}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="px-6 pb-6 pt-0">
        <Button onClick={onApply} className="w-full sm:w-auto">
          Откликнуться
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VacancyCard;
