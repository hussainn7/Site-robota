
import React from "react";
import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";

interface NewsCardProps {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  image: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ id, title, excerpt, date, image }) => {
  return (
    <Link to={`/news/${id}`} className="group card-hover">
      <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
            <div className="flex items-center text-white text-sm">
              <Calendar className="mr-1 h-4 w-4" />
              <time dateTime={date}>{date}</time>
            </div>
          </div>
        </div>
        
        <div className="p-5 flex-grow flex flex-col">
          <h3 className="text-xl font-bold mb-2 group-hover:text-agro transition-colors">{title}</h3>
          <p className="text-gray-600 mb-4 flex-grow">{excerpt}</p>
          <div className="text-agro font-medium flex items-center group-hover:translate-x-2 transition-transform">
            Читать полностью
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;
