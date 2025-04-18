import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";
import NewsCard from "@/components/ui/NewsCard";
import { Button } from "@/components/ui/button";
import { useAdminData } from "@/context/AdminDataContext";

const News = () => {
  const [visibleNews, setVisibleNews] = useState(6);
  const { news } = useAdminData();
  
  // Sort news by date in descending order
  const sortedNews = [...news].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Get visible news
  const displayedNews = sortedNews.slice(0, visibleNews);

  // Load more news
  const loadMore = () => {
    setVisibleNews(prev => Math.min(prev + 3, news.length));
  };

  return (
    <Layout>
      <PageHeader 
        title="Новости и события" 
        description="Последние новости о нашей деятельности и событиях в сельском хозяйстве"
        bgImage="https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop"
      />

      {/* News Grid */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedNews.map((newsItem) => (
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

          {/* Load More Button */}
          {visibleNews < news.length && (
            <div className="text-center mt-12">
              <Button onClick={loadMore} variant="outline" size="lg">
                Загрузить еще
              </Button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default News;
