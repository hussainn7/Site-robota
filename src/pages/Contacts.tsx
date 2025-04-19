import React from "react";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";
import ContactForm from "@/components/ui/ContactForm";
import { Phone, Mail, MapPin, Clock, Share2 } from "lucide-react";
import YandexMap from "@/components/ui/YandexMap";

const Contacts = () => {
  // Company contacts
  const contactInfo = {
    address: "д. Больтиники, Гродненский район, Гродненская область, Республика Беларусь, 231741",
    phone: "+375 (29) 123-45-67",
    email: "info@elit-agro.by",
    workHours: "Понедельник - Пятница: 8:00 - 17:00, Обед: 12:00 - 13:00",
    mapLocation: {
      lat: 53.6884,
      lng: 23.8181,
    },
  };

  return (
    <Layout>
      <PageHeader 
        title="Контакты" 
        description="Свяжитесь с нами для получения дополнительной информации или сотрудничества"
        bgImage="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop"
      />

      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold mb-8 text-agro-dark">Наши контакты</h2>
              
              <div className="bg-white p-8 rounded-lg shadow-md mb-8">
                <div className="space-y-6">
                  <div className="flex items-start">
                    <MapPin className="mr-3 h-6 w-6 text-agro shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Адрес</h3>
                      <p className="text-gray-700">{contactInfo.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="mr-3 h-6 w-6 text-agro shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Телефон</h3>
                      <p className="text-gray-700">
                        <a href={`tel:${contactInfo.phone}`} className="hover:text-agro">
                          {contactInfo.phone}
                        </a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Mail className="mr-3 h-6 w-6 text-agro shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Email</h3>
                      <p className="text-gray-700">
                        <a href={`mailto:${contactInfo.email}`} className="hover:text-agro">
                          {contactInfo.email}
                        </a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="mr-3 h-6 w-6 text-agro shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Режим работы</h3>
                      <p className="text-gray-700">{contactInfo.workHours}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex items-start mb-6">
                  <Share2 className="mr-3 h-6 w-6 text-agro shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">QR-код для сохранения контактов</h3>
                    <p className="text-gray-700">Отсканируйте QR-код, чтобы сохранить наши контакты</p>
                  </div>
                </div>
                
                {/* QR Code Placeholder - This would be generated with actual contact information */}
                <div className="w-48 h-48 mx-auto bg-gray-200 flex items-center justify-center">
                  <p className="text-gray-500 text-center">QR-код <br />с контактами</p>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-8 text-agro-dark">Обратная связь</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-8 pb-16">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-8 text-agro-dark text-center">Карта проезда</h2>
          
          <div className="rounded-lg shadow-md overflow-hidden">
            <YandexMap height="350px" />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contacts;
