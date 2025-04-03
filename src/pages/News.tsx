
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";
import NewsCard from "@/components/ui/NewsCard";
import { Button } from "@/components/ui/button";

const News = () => {
  const [visibleNews, setVisibleNews] = useState(6);
  
  // Sample news data
  const allNews = [
    {
      id: 1,
      title: "Завершена уборка озимых зерновых культур",
      excerpt: "Наше предприятие успешно завершило уборку озимых зерновых культур с рекордной урожайностью 52 ц/га. Этот результат был достигнут благодаря внедрению новых агротехнологий и благоприятным погодным условиям.",
      date: "15.08.2023",
      image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Новая сельскохозяйственная техника",
      excerpt: "Парк техники предприятия пополнился новыми тракторами John Deere для повышения эффективности полевых работ. Новые машины оснащены системой точного земледелия и помогут оптимизировать расход ресурсов.",
      date: "01.07.2023",
      image: "https://images.unsplash.com/photo-1498936178812-4b2e558d2937?auto=format&fit=crop",
    },
    {
      id: 3,
      title: "Участие в международной выставке АгроЭкспо-2023",
      excerpt: "Наше предприятие представило свою продукцию на крупнейшей агропромышленной выставке региона. Посетители высоко оценили качество нашей продукции и проявили интерес к сотрудничеству.",
      date: "10.06.2023",
      image: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop",
    },
    {
      id: 4,
      title: "Внедрение системы точного земледелия",
      excerpt: "КСУП «Элит-Агро Больтиники» завершило первый этап внедрения системы точного земледелия на всех полях предприятия. Это позволит более эффективно использовать удобрения и средства защиты растений.",
      date: "20.05.2023",
      image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ce?auto=format&fit=crop",
    },
    {
      id: 5,
      title: "Начало посевной кампании 2023",
      excerpt: "На полях КСУП «Элит-Агро Больтиники» начались весенние полевые работы. В этом году планируется засеять различными культурами более 3000 гектаров сельскохозяйственных угодий.",
      date: "05.04.2023",
      image: "https://images.unsplash.com/photo-1535911062114-764574491173?auto=format&fit=crop",
    },
    {
      id: 6,
      title: "Модернизация животноводческого комплекса",
      excerpt: "Завершена модернизация животноводческого комплекса предприятия. Установлено новое оборудование, которое позволит улучшить условия содержания животных и повысить продуктивность.",
      date: "15.03.2023",
      image: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop",
    },
    {
      id: 7,
      title: "Подведены итоги 2022 года",
      excerpt: "На предприятии подведены итоги работы за 2022 год. Достигнуты высокие производственные показатели по всем направлениям деятельности, намечены планы развития на новый год.",
      date: "20.01.2023",
      image: "https://images.unsplash.com/photo-1524646794171-c204a6e14576?auto=format&fit=crop",
    },
    {
      id: 8,
      title: "Социальная программа для сотрудников",
      excerpt: "На предприятии запущена новая социальная программа для сотрудников, включающая дополнительное медицинское страхование, помощь в обеспечении жильём и образовательные программы.",
      date: "10.12.2022",
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop",
    },
    {
      id: 9,
      title: "Завершение уборочной кампании 2022",
      excerpt: "Успешно завершена уборочная кампания 2022 года. Несмотря на сложные погодные условия, удалось собрать хороший урожай и полностью выполнить план по всем культурам.",
      date: "30.10.2022",
      image: "https://images.unsplash.com/photo-1536657464693-9723c48ac2bc?auto=format&fit=crop",
    },
  ];

  // Get visible news
  const displayedNews = allNews.slice(0, visibleNews);

  // Load more news
  const loadMore = () => {
    setVisibleNews(prev => Math.min(prev + 3, allNews.length));
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
            {displayedNews.map((news) => (
              <NewsCard
                key={news.id}
                id={news.id}
                title={news.title}
                excerpt={news.excerpt}
                date={news.date}
                image={news.image}
              />
            ))}
          </div>
          
          {visibleNews < allNews.length && (
            <div className="mt-12 text-center">
              <Button 
                onClick={loadMore} 
                variant="outline" 
                size="lg"
              >
                Загрузить ещё новости
              </Button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default News;
