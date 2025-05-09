import React from 'react';
import Layout from '@/components/layout/Layout';
import PageHeader from '@/components/layout/PageHeader';
import { useAdminData } from '@/context/AdminDataContext';
import { Link } from 'react-router-dom';

const News = () => {
  const { news } = useAdminData();

  return (
    <Layout>
      <PageHeader 
        title="Новости" 
        description="Последние новости и события КСУП «Элит-Агро Больтиники»"
        bgImage="https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop"
      />

      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item) => (
              <Link 
                key={item.id} 
                to={`/news/${item.id}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow card-hover"
              >
                {typeof item.image === 'string' && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="text-sm text-gray-500 mb-2">{item.date}</div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-600 line-clamp-3">{item.content}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default News;
