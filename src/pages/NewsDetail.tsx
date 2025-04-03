
import React from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Calendar, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NewsDetail = () => {
  const { id } = useParams<{ id: string }>();
  
  // This would normally come from an API call based on the ID
  // For now, we'll just hard-code a sample article
  const newsArticle = {
    id: id,
    title: "Завершена уборка озимых зерновых культур",
    date: "15.08.2023",
    image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop",
    content: `
      <p>КСУП «Элит-Агро Больтиники» успешно завершило уборку озимых зерновых культур с рекордной урожайностью 52 ц/га. Этот результат был достигнут благодаря внедрению новых агротехнологий, использованию высококачественного посевного материала и благоприятным погодным условиям.</p>
      
      <p>За период уборочной кампании, которая длилась 15 дней, было собрано более 5000 тонн зерна высокого качества. Вся техника работала без серьезных поломок, что позволило провести уборку в оптимальные сроки и минимизировать потери урожая.</p>
      
      <h3>Факторы успеха</h3>
      
      <p>Директор предприятия Иванов Иван Иванович отметил, что достижению высоких результатов способствовали следующие факторы:</p>
      
      <ul>
        <li>Использование современной сельскохозяйственной техники</li>
        <li>Применение передовых агротехнологий</li>
        <li>Профессионализм и слаженная работа коллектива</li>
        <li>Качественные семена и эффективные средства защиты растений</li>
      </ul>
      
      <p>Особая благодарность была выражена механизаторам и водителям, которые работали в две смены, обеспечивая непрерывный процесс уборки и транспортировки зерна.</p>
      
      <h3>Планы на будущее</h3>
      
      <p>В ближайшие дни начнется подготовка почвы под озимый сев 2023 года. Планируется увеличить площади под озимыми зерновыми культурами на 10% по сравнению с предыдущим годом.</p>
      
      <p>Также ведется активная работа по подготовке семенного материала для будущего сева. Приобретены элитные семена озимой пшеницы и тритикале, которые будут использованы для обновления семенного фонда предприятия.</p>
      
      <p>КСУП «Элит-Агро Больтиники» продолжает реализацию программы модернизации технического парка. До конца года планируется приобретение еще двух современных зерноуборочных комбайнов, что позволит еще более эффективно проводить полевые работы в следующем сезоне.</p>
    `,
    tags: ["Уборка", "Озимые", "Урожай", "Техника"]
  };

  // Related news
  const relatedNews = [
    {
      id: 2,
      title: "Новая сельскохозяйственная техника",
      excerpt: "Парк техники предприятия пополнился новыми тракторами John Deere для повышения эффективности полевых работ.",
      date: "01.07.2023",
      image: "https://images.unsplash.com/photo-1498936178812-4b2e558d2937?auto=format&fit=crop",
    },
    {
      id: 5,
      title: "Начало посевной кампании 2023",
      excerpt: "На полях КСУП «Элит-Агро Больтиники» начались весенние полевые работы.",
      date: "05.04.2023",
      image: "https://images.unsplash.com/photo-1535911062114-764574491173?auto=format&fit=crop",
    },
  ];

  return (
    <Layout>
      <div className="container-custom py-12">
        <Button asChild variant="outline" className="mb-6" size="sm">
          <Link to="/news" className="flex items-center">
            <ChevronLeft className="mr-1 h-4 w-4" /> Ко всем новостям
          </Link>
        </Button>
        
        <article className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Featured Image */}
          <div className="w-full h-[400px] overflow-hidden">
            <img 
              src={newsArticle.image} 
              alt={newsArticle.title} 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Article Content */}
          <div className="p-8">
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <Calendar className="mr-1 h-4 w-4" />
              <time dateTime={newsArticle.date}>{newsArticle.date}</time>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-6">{newsArticle.title}</h1>
            
            <div 
              className="prose prose-green max-w-none"
              dangerouslySetInnerHTML={{ __html: newsArticle.content }}
            />
            
            {/* Tags */}
            {newsArticle.tags && (
              <div className="mt-8 pt-4 border-t border-gray-200">
                <div className="flex flex-wrap gap-2">
                  {newsArticle.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="inline-block bg-agro-beige text-agro-dark px-3 py-1 rounded-md text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>
        
        {/* Related News */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Похожие новости</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedNews.map((news) => (
              <div 
                key={news.id}
                className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row card-hover"
              >
                <div className="md:w-1/3 h-48 md:h-auto overflow-hidden">
                  <img 
                    src={news.image} 
                    alt={news.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="md:w-2/3 p-5">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <Calendar className="mr-1 h-4 w-4" />
                    <time dateTime={news.date}>{news.date}</time>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{news.title}</h3>
                  <p className="text-gray-600 mb-4">{news.excerpt}</p>
                  <Link 
                    to={`/news/${news.id}`} 
                    className="text-agro hover:text-agro-dark font-medium"
                  >
                    Читать полностью
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NewsDetail;
