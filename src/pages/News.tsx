import React from "react";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";
import NewsList from "@/components/ui/NewsList";

const News = () => {
  return (
    <Layout>
      <PageHeader 
        title="Новости и события" 
        description="Последние новости о нашей деятельности и событиях в сельском хозяйстве"
        bgImage="https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop"
      />

      <section className="py-16">
        <div className="container-custom">
          <NewsList />
        </div>
      </section>
    </Layout>
  );
};

export default News;
