
import React from "react";
import { Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface NewsCardProps {
  id: string | number;
  title: string;
  excerpt: string;
  date: string;
  image: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ id, title, excerpt, date, image }) => {
  return (
    <Card className="overflow-hidden card-hover h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <CardContent className="p-5 flex-grow">
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <Calendar className="mr-1 h-4 w-4" />
          <time dateTime={date}>{date}</time>
        </div>
        <h3 className="text-xl font-bold mb-2 line-clamp-2">{title}</h3>
        <p className="text-gray-600 line-clamp-3">{excerpt}</p>
      </CardContent>
      <CardFooter className="p-5 pt-0">
        <Link 
          to={`/news/${id}`} 
          className="text-agro hover:text-agro-dark font-medium flex items-center"
        >
          Читать полностью
        </Link>
      </CardFooter>
    </Card>
  );
};

export default NewsCard;
