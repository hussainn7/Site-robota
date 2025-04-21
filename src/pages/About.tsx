import React from "react";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";
import Timeline from "@/components/ui/Timeline";
import ImageGallery from "@/components/ui/ImageGallery";
import YandexMap from "@/components/ui/YandexMap";
import { Target, Leaf, ShieldCheck, TrendingUp } from "lucide-react";

const About = () => {
  // Timeline data
  const historyItems = [
    {
      year: "2009",
      title: "Основание предприятия",
      description: "Создание сельскохозяйственного предприятия в агрогородке Больтиники",
    },
    {
      year: "2012",
      title: "Модернизация производства",
      description: "Первый этап модернизации сельскохозяйственной техники и оборудования",
    },
    {
      year: "2015",
      title: "Расширение земельных угодий",
      description: "Увеличение площади обрабатываемых земель до 3000 гектаров",
    },
    {
      year: "2018",
      title: "Внедрение новых технологий",
      description: "Использование GPS-навигации и точного земледелия в полевых работах",
    },
    {
      year: "2020",
      title: "Сертификация продукции",
      description: "Получение международных сертификатов качества на продукцию",
    },
    {
      year: "2023",
      title: "Новые горизонты",
      description: "Расширение рынков сбыта и увеличение объемов производства",
    },
  ];

  // Gallery images
  const galleryImages = [
    {
      src: "https://i.postimg.cc/bJFYSbXC/5197285658434073185.jpg",
      alt: "Поля предприятия"
    },
    {
      src: "https://i.postimg.cc/mgNbNKfF/5197285658434073186.jpg",
      alt: "Сельскохозяйственная техника"
    },
    {
      src: "https://i.postimg.cc/WzFNG3T2/5197285658434073187.jpg",
      alt: "Зерновые культуры"
    },
    {
      src: "https://i.postimg.cc/SsKNKdPY/5197285658434073188.jpg",
      alt: "Животноводство"
    },
    {
      src: "https://i.postimg.cc/DyGfm8x6/5197285658434073189.jpg",
      alt: "Наша команда"
    },
    {
      src: "https://i.postimg.cc/5yhxnV28/5197285658434073190.jpg",
      alt: "Административное здание"
    },
  ];

  return (
    <Layout>
      <PageHeader 
        title="О предприятии" 
        description="История развития и ценности КСУП «Элит-Агро Больтиники»"
        bgImage="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop"
      />

      {/* Company Description */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-title mb-8">Наше предприятие</h2>
            <p className="text-lg text-gray-700 mb-6">
              КСУП «Элит-Агро Больтиники» — современное сельскохозяйственное предприятие, 
              специализирующееся на выращивании зерновых культур и животноводстве. 
              Мы находимся в Гродненском районе Республики Беларусь и обрабатываем 
              свыше 3000 гектаров сельскохозяйственных угодий.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Предприятие оснащено современной сельскохозяйственной техникой и применяет 
              передовые агротехнологии для достижения высокой урожайности и качества продукции. 
              Мы постоянно развиваемся, внедряем инновации и повышаем эффективность производства.
            </p>
            <p className="text-lg text-gray-700">
              Наша команда состоит из опытных специалистов, преданных своему делу и 
              стремящихся к постоянному совершенствованию. Мы гордимся нашими достижениями 
              и с оптимизмом смотрим в будущее.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="section-title mb-12">Миссия и ценности</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-md text-center card-hover">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-agro-beige mb-4">
                <Target className="h-8 w-8 text-agro" />
              </div>
              <h3 className="text-xl font-bold mb-3">Миссия</h3>
              <p className="text-gray-600">
                Производство высококачественной сельскохозяйственной продукции с использованием 
                современных технологий и заботой об окружающей среде.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md text-center card-hover">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-agro-beige mb-4">
                <Leaf className="h-8 w-8 text-agro" />
              </div>
              <h3 className="text-xl font-bold mb-3">Экологичность</h3>
              <p className="text-gray-600">
                Применение методов устойчивого земледелия и бережное отношение к природным 
                ресурсам во всех аспектах нашей деятельности.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md text-center card-hover">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-agro-beige mb-4">
                <ShieldCheck className="h-8 w-8 text-agro" />
              </div>
              <h3 className="text-xl font-bold mb-3">Качество</h3>
              <p className="text-gray-600">
                Строгий контроль на всех этапах производства для обеспечения 
                высшего качества и безопасности нашей продукции.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md text-center card-hover">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-agro-beige mb-4">
                <TrendingUp className="h-8 w-8 text-agro" />
              </div>
              <h3 className="text-xl font-bold mb-3">Инновации</h3>
              <p className="text-gray-600">
                Постоянное внедрение современных технологий и передовых методов 
                для повышения эффективности производства.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="section-title mb-12">История предприятия</h2>
          <div className="max-w-3xl mx-auto">
            <Timeline items={historyItems} />
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="section-title mb-10">Фотогалерея</h2>
          <div className="mb-4">
            <ImageGallery images={galleryImages} columns={3} />
          </div>
        </div>
      </section>

      {/* Contacts Map Section */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="section-title mb-12">Наше расположение</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">Контактная информация</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-agro">Адрес:</h4>
                  <p className="text-gray-700">
                    аг. Больтиники, Гродненский район<br />
                    Гродненская область<br />
                    Республика Беларусь, 231741
                  </p>
                </div>
                
                <div>
                  <h4 className="font-bold text-agro">Телефон:</h4>
                  <p className="text-gray-700">
                    <a href="tel:+375291234567" className="hover:text-agro">
                      +375 (29) 123-45-67
                    </a>
                  </p>
                </div>
                
                <div>
                  <h4 className="font-bold text-agro">Email:</h4>
                  <p className="text-gray-700">
                    <a href="mailto:elit-agro-2009@mail.ru" className="hover:text-agro">
                      elit-agro-2009@mail.ru
                    </a>
                  </p>
                </div>
                
                <div>
                  <h4 className="font-bold text-agro">Время работы:</h4>
                  <p className="text-gray-700">
                    Понедельник - Пятница: 8:00 - 17:00<br />
                    Суббота, Воскресенье: выходные
                  </p>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-2 overflow-hidden rounded-lg h-full">
              <div className="w-full h-[400px]">
                <YandexMap height="100%" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
