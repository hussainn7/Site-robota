import React from "react";
import Layout from "@/components/layout/Layout";
import HeroSlider from "@/components/ui/HeroSlider";
import LatestNews from "@/components/ui/LatestNews";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Wheat, Tractor, Users, Award, ChevronRight } from "lucide-react";

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

  // Quick links with icons
  const quickLinks = [
    {
      icon: <Wheat className="h-8 w-8 text-agro" />,
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
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-agro-dark mb-6 relative inline-block">
              <span className="relative z-10">О предприятии</span>
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-agro opacity-30 rounded"></span>
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              КСУП «Элит-Агро Больтиники» — это современное сельскохозяйственное предприятие, 
              специализирующееся на выращивании зерновых культур и животноводстве. 
              Мы находимся в Гродненском районе Республики Беларусь и обрабатываем 
              свыше 3000 гектаров сельскохозяйственных угодий.
            </p>
            <Link to="/about">
              <Button size="lg" className="group">
                Подробнее о нас
                <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="section-title mb-12 text-center">Наши направления</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {quickLinks.map((link, index) => (
              <Link 
                key={index} 
                to={link.link}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow card-hover"
              >
                <div className="mb-4">{link.icon}</div>
                <h3 className="text-xl font-bold mb-2">{link.title}</h3>
                <p className="text-gray-600">{link.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <LatestNews count={3} title="Последние новости" />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-agro text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-agro-dark/80 to-agro/60"></div>
        <div className="container-custom text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Готовы к сотрудничеству?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Свяжитесь с нами для получения дополнительной информации о нашей продукции и услугах
          </p>
          <Link to="/feedback">
            <Button size="lg" variant="outline" className="bg-white text-agro hover:bg-gray-100">
              Связаться с нами
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
