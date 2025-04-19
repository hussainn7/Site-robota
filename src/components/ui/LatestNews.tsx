import React from "react";
import { useAdminData } from "@/context/AdminDataContext";
import NewsCard from "@/components/ui/NewsCard";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface LatestNewsProps {
  count?: number;
  title?: string;
  showViewAll?: boolean;
  className?: string;
}

const LatestNews: React.FC<LatestNewsProps> = ({
  count = 3,
  title = "Последние новости",
  showViewAll = true,
  className = ""
}) => {
  const { news } = useAdminData();
  
  // Sort news by date (newest first) and take the specified count
  const latestNews = [...news]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);

  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-8">
        <h2 className="section-title">{title}</h2>
        {showViewAll && (
          <Link to="/news">
            <Button variant="outline">Все новости</Button>
          </Link>
        )}
      </div>
      
      {latestNews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestNews.map((newsItem) => (
            <NewsCard
              key={newsItem.id}
              id={newsItem.id}
              title={newsItem.title}
              excerpt={newsItem.content.substring(0, 150) + "..."}
              date={newsItem.date}
              image={typeof newsItem.image === 'string' ? newsItem.image : ''}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <p className="text-gray-600 text-lg">
            Новостей пока нет
          </p>
        </div>
      )}
    </div>
  );
};

export default LatestNews; 