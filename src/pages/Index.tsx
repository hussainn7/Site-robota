
import React from "react";
import Layout from "@/components/layout/Layout";
import HeroSlider from "@/components/ui/HeroSlider";
import NewsCard from "@/components/ui/NewsCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Grain, Tractor, Users, Award, ChevronRight } from "lucide-react";

const Index = () => {
  // Sample data for hero slider
  const heroSlides = [
    {
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop",
      title: "КСУП «Элит-Агро Больтиники»",
      description: "Современное сельскохозяйственное предприятие, специализирующееся на выращивании зерновых культур и животноводстве",
      link: "/about",
    },
    {
      image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop",
      title: "Качественная продукция",
      description: "Мы производим высококачественные сельскохозяйственные продукты, соответствующие мировым стандартам",
      link: "/products",
    },
    {
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop",
      title: "Экологичное производство",
      description: "Мы придерживаемся принципов устойчивого развития и заботимся об окружающей среде",
      link: "/about",
    },
  ];

  // Sample data for news
  const latestNews = [
    {
      id: 1,
      title: "Завершена уборка озимых зерновых культур",
      excerpt: "Наше предприятие успешно завершило уборку озимых зерновых культур с рекордной урожайностью 52 ц/га.",
      date: "15.08.2023",
      image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Новая сельскохозяйственная техника",
      excerpt: "Парк техники предприятия пополнился новыми тракторами John Deere для повышения эффективности полевых работ.",
      date: "01.07.2023",
      image: "https://images.unsplash.com/photo-1498936178812-4b2e558d2937?auto=format&fit=crop",
    },
    {
      id: 3,
      title: "Участие в международной выставке АгроЭкспо-2023",
      excerpt: "Наше предприятие представило свою продукцию на крупнейшей агропромышленной выставке региона.",
      date: "10.06.2023",
      image: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop",
    },
  ];

  // Quick links with icons
  const quickLinks = [
    {
      icon: <Grain className="h-8 w-8 text-agro" />,
      title: "Продукция",
      description: "Зерновые, бобовые, технические культуры",
      link: "/products",
    },
    {
      icon: <Tractor className="h-8 w-8 text-agro" />,
      title: "Услуги",
      description: "Сельскохозяйственные услуги и аренда техники",
      link: "/products",
    },
    {
      icon: <Users className="h-8 w-8 text-agro" />,
      title: "Карьера",
      description: "Присоединяйтесь к команде профессионалов",
      link: "/careers",
    },
    {
      icon: <Award className="h-8 w-8 text-agro" />,
      title: "О нас",
      description: "История и ценности компании",
      link: "/about",
    },
  ];

  return (
    <Layout>
      {/* Hero Slider */}
      <HeroSlider slides={heroSlides} />

      {/* About Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-agro-dark mb-6">
              О предприятии
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              КСУП «Элит-Агро Больтиники» — это современное сельскохозяйственное предприятие, 
              специализирующееся на выращивании зерновых культур и животноводстве. 
              Наша миссия — производство высококачественной сельскохозяйственной продукции 
              с соблюдением экологических норм и применением современных технологий.
            </p>
            <Button asChild variant="outline" size="lg">
              <Link to="/about" className="flex items-center">
                Узнать больше <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {quickLinks.map((link, index) => (
              <Link key={index} to={link.link} className="group">
                <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow h-full flex flex-col card-hover">
                  <div className="mb-4">{link.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{link.title}</h3>
                  <p className="text-gray-600 mb-4 flex-grow">{link.description}</p>
                  <div className="text-agro font-medium flex items-center group-hover:translate-x-1 transition-transform">
                    Подробнее <ChevronRight className="ml-1 h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-10">
            <h2 className="text-3xl font-bold text-agro-dark">
              Последние новости
            </h2>
            <Link 
              to="/news" 
              className="text-agro hover:text-agro-dark font-medium flex items-center mt-4 md:mt-0"
            >
              Все новости <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestNews.map((news) => (
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
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-agro text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Заинтересованы в сотрудничестве?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Мы всегда открыты для новых партнерств и готовы обсудить возможности сотрудничества
          </p>
          <Button asChild variant="outline" size="lg" className="bg-white text-agro hover:bg-gray-100">
            <Link to="/contacts">Связаться с нами</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
