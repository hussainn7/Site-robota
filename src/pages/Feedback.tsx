
import React from "react";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";
import ResumeForm from "@/components/ui/ResumeForm";
import ContactForm from "@/components/ui/ContactForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Feedback = () => {
  return (
    <Layout>
      <PageHeader 
        title="Обратная связь" 
        description="Свяжитесь с нами или отправьте свое резюме"
        bgImage="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop"
      />

      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <Tabs defaultValue="contact" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="contact">Связаться с нами</TabsTrigger>
                <TabsTrigger value="resume">Отправить резюме</TabsTrigger>
              </TabsList>
              
              <TabsContent value="contact">
                <div className="bg-white rounded-lg shadow-md">
                  <div className="p-6 pb-0">
                    <h2 className="text-2xl font-bold mb-4">Свяжитесь с нами</h2>
                    <p className="text-gray-700 mb-6">
                      Заполните форму ниже, и мы ответим на ваш запрос в самое ближайшее время.
                    </p>
                  </div>
                  <ContactForm title="" subtitle="" />
                </div>
              </TabsContent>
              
              <TabsContent value="resume">
                <div className="bg-white rounded-lg shadow-md">
                  <div className="p-6 pb-0">
                    <h2 className="text-2xl font-bold mb-4">Отправить резюме</h2>
                    <p className="text-gray-700 mb-6">
                      Мы всегда рады талантливым специалистам! Отправьте нам свое резюме, 
                      даже если сейчас нет подходящей вакансии.
                    </p>
                  </div>
                  <div className="p-6">
                    <ResumeForm />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="section-title mb-12">Часто задаваемые вопросы</h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-3">Как можно приобрести вашу продукцию?</h3>
              <p className="text-gray-700">
                Для приобретения нашей продукции вы можете оставить заявку на сайте, 
                позвонить по телефону или приехать к нам напрямую. Для оптовых закупок 
                мы предлагаем специальные условия.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-3">Доставляете ли вы продукцию?</h3>
              <p className="text-gray-700">
                Да, мы осуществляем доставку продукции собственным транспортом по 
                Гродненской области и всей Беларуси. Условия доставки обсуждаются 
                индивидуально в зависимости от объема и расстояния.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-3">Как часто обновляется информация на сайте?</h3>
              <p className="text-gray-700">
                Мы стараемся регулярно обновлять информацию на нашем сайте, особенно 
                в разделах "Новости" и "Продукция". Актуальные цены и наличие продукции 
                лучше уточнять по телефону.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-3">Возможно ли сотрудничество на постоянной основе?</h3>
              <p className="text-gray-700">
                Да, мы заинтересованы в долгосрочном сотрудничестве и предлагаем 
                специальные условия для постоянных партнеров. Для обсуждения деталей 
                сотрудничества, пожалуйста, свяжитесь с нашим отделом продаж.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Feedback;
