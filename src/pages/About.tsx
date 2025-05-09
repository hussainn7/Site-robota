import React from "react";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";
import Timeline from "@/components/ui/Timeline";
import ImageGallery from "@/components/ui/ImageGallery";
import YandexMap from "@/components/ui/YandexMap";
import { Target, Leaf, ShieldCheck, TrendingUp, Tractor, Award, Users } from "lucide-react";

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

  const features = [
    {
      icon: <Tractor className="h-12 w-12 text-agro" />,
      title: "Современная техника",
      description: "Наше предприятие оснащено современной сельскохозяйственной техникой и оборудованием"
    },
    {
      icon: <Award className="h-12 w-12 text-agro" />,
      title: "Высокое качество",
      description: "Мы производим продукцию, соответствующую международным стандартам качества"
    },
    {
      icon: <Leaf className="h-12 w-12 text-agro" />,
      title: "Экологичность",
      description: "Мы придерживаемся принципов устойчивого развития и заботимся об окружающей среде"
    },
    {
      icon: <Users className="h-12 w-12 text-agro" />,
      title: "Профессионализм",
      description: "В нашей команде работают высококвалифицированные специалисты"
    }
  ];

  return (
    <Layout>
      <PageHeader 
        title="О предприятии" 
        description="КСУП «Элит-Агро Больтиники» - Ваш надежный партнер в сельском хозяйстве"
        bgImage="https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?auto=format&fit=crop"
      />

      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-6 text-agro-dark">О нашем предприятии</h2>
            <p className="text-lg text-gray-700">
              КСУП «Элит-Агро Больтиники» — это современное сельскохозяйственное предприятие, 
              специализирующееся на выращивании зерновых культур и животноводстве. 
              Мы находимся в Гродненском районе Республики Беларусь и обрабатываем 
              свыше 3000 гектаров сельскохозяйственных угодий.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center text-agro-dark">Наша миссия</h2>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <p className="text-lg text-gray-700 mb-6">
                Наша миссия — обеспечить население качественными сельскохозяйственными продуктами, 
                способствуя развитию агропромышленного комплекса Республики Беларусь.
              </p>
              <p className="text-lg text-gray-700">
                Мы стремимся к постоянному совершенствованию производственных процессов, 
                внедрению инновационных технологий и развитию кадрового потенциала.
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
