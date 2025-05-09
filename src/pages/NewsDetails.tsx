import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useAdminData } from '@/context/AdminDataContext';
import { ChevronLeft } from 'lucide-react';

const NewsDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { news } = useAdminData();
  
  const newsItem = news.find(item => item.id === Number(id));

  if (!newsItem) {
    return (
      <Layout>
        <div className="container-custom py-16">
          <h1 className="text-2xl font-bold text-red-600">Новость не найдена</h1>
          <Link to="/news" className="text-agro hover:underline mt-4 inline-block">
            Вернуться к списку новостей
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container-custom py-16">
        <Link 
          to="/news" 
          className="inline-flex items-center text-agro hover:text-agro-dark mb-8"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          К списку новостей
        </Link>

        <article className="max-w-4xl mx-auto">
          <div className="text-sm text-gray-500 mb-4">{newsItem.date}</div>
          <h1 className="text-3xl font-bold mb-6">{newsItem.title}</h1>
          
          {typeof newsItem.image === 'string' && (
            <div className="mb-8">
              <img
                src={newsItem.image}
                alt={newsItem.title}
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
          )}
          
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 whitespace-pre-line">
              {newsItem.content}
            </p>
          </div>
        </article>
      </div>
    </Layout>
  );
};

export default NewsDetails; 