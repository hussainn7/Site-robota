import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Calendar, ChevronLeft, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAdminData } from "@/context/AdminDataContext";
import NewsCard from "@/components/ui/NewsCard";

const NewsDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { news } = useAdminData();
  
  // Find the current news article
  const newsArticle = news.find(n => n.id === parseInt(id || '', 10));

  // If article not found, redirect to news page
  if (!newsArticle) {
    navigate('/news');
    return null;
  }

  // Get related news (excluding current article)
  const relatedNews = news
    .filter(n => n.id !== parseInt(id || '', 10))
    .sort(() => Math.random() - 0.5) // Randomly shuffle
    .slice(0, 2); // Get 2 random articles

  // Format the content with proper paragraphs
  const formattedContent = newsArticle.content
    .split('\n')
    .filter(paragraph => paragraph.trim())
    .map((paragraph, index) => (
      <p key={index} className="mb-4">{paragraph}</p>
    ));

  return (
    <Layout>
      <div className="container-custom py-12">
        {/* Back Button */}
        <Button asChild variant="outline" className="mb-6" size="sm">
          <Link to="/news" className="flex items-center">
            <ChevronLeft className="mr-1 h-4 w-4" /> Ко всем новостям
          </Link>
        </Button>
        
        <article className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Featured Image */}
          {typeof newsArticle.image === 'string' && (
            <div className="w-full h-[400px] overflow-hidden">
              <img 
                src={newsArticle.image} 
                alt={newsArticle.title} 
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          {/* Article Content */}
          <div className="p-8">
            {/* Date */}
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <Calendar className="mr-1 h-4 w-4" />
              <time dateTime={newsArticle.date}>{newsArticle.date}</time>
            </div>
            
            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold mb-6">{newsArticle.title}</h1>
            
            {/* Content */}
            <div className="prose prose-green max-w-none">
              {formattedContent}
            </div>
          </div>
        </article>

        {/* Related News Section */}
        {relatedNews.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8">Похожие новости</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedNews.map((relatedItem) => (
                <NewsCard
                  key={relatedItem.id}
                  id={relatedItem.id}
                  title={relatedItem.title}
                  excerpt={relatedItem.content.substring(0, 150) + "..."}
                  date={relatedItem.date}
                  image={typeof relatedItem.image === 'string' ? relatedItem.image : ''}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default NewsDetail;
