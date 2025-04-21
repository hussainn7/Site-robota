import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-agro-dark text-white pt-12 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">КСУП "Элит-Агро Больтиники"</h3>
            <p className="mb-4 text-gray-300">
              Современное сельскохозяйственное предприятие, специализирующееся на выращивании зерновых культур и животноводстве.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">Разделы сайта</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition">
                  Главная
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition">
                  О компании
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-300 hover:text-white transition">
                  Продукция
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-gray-300 hover:text-white transition">
                  Новости
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-300 hover:text-white transition">
                  Вакансии
                </Link>
              </li>
              <li>
                <Link to="/contacts" className="text-gray-300 hover:text-white transition">
                  Контакты
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">Контакты</h3>
            <div className="space-y-3">
              <p className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 text-agro-beige shrink-0" />
                <span className="text-gray-300">аг. Больтиники, Гродненский район, Беларусь</span>
              </p>
              <p className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-agro-beige" />
                <a href="tel:+375291234567" className="text-gray-300 hover:text-white transition">
                  +375 (29) 123-45-67
                </a>
              </p>
              <p className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-agro-beige" />
                <a href="mailto:elit-agro-2009@mail.ru" className="text-gray-300 hover:text-white transition">
                  elit-agro-2009@mail.ru
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {currentYear} КСУП "Элит-Агро Больтиники". Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
