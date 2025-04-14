import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";
import VacancyCard from "@/components/ui/VacancyCard";
import ResumeForm from "@/components/ui/ResumeForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAdminData } from "@/context/AdminDataContext";

const Careers = () => {
  const { vacancies } = useAdminData();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedVacancy, setSelectedVacancy] = useState("");
  
  // Handle apply to vacancy
  const handleApply = (title: string) => {
    setSelectedVacancy(title);
    setDialogOpen(true);
  };

  return (
    <Layout>
      <PageHeader 
        title="Вакансии" 
        description="Присоединяйтесь к нашей команде профессионалов"
        bgImage="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop"
      />

      {/* Intro Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-6 text-agro-dark">
              Карьера в КСУП «Элит-Агро Больтиники»
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Мы всегда в поиске талантливых, энергичных и целеустремленных специалистов, 
              готовых внести свой вклад в развитие нашего предприятия. 
              Мы предлагаем конкурентную заработную плату, возможности для профессионального 
              роста и дружелюбную рабочую среду.
            </p>
          </div>

          {/* Vacancies List */}
          <div className="space-y-6">
            {vacancies.length > 0 ? (
              vacancies.map((vacancy) => (
                <VacancyCard
                  key={vacancy.id}
                  title={vacancy.title}
                  department={vacancy.department}
                  location={vacancy.location}
                  salary={vacancy.salary}
                  description={vacancy.description}
                  requirements={vacancy.requirements}
                  onApply={() => handleApply(vacancy.title)}
                />
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow-md">
                <p className="text-gray-600 text-lg">
                  В настоящее время открытых вакансий нет
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="section-title mb-12">Почему стоит работать у нас</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md card-hover">
              <div className="h-12 w-12 bg-agro-beige rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-agro">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Стабильность</h3>
              <p className="text-gray-700">
                Мы предлагаем официальное трудоустройство, своевременную выплату заработной платы 
                и полный социальный пакет.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md card-hover">
              <div className="h-12 w-12 bg-agro-beige rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-agro">2</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Развитие</h3>
              <p className="text-gray-700">
                Мы поощряем профессиональный рост и предоставляем возможности для обучения 
                и повышения квалификации.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md card-hover">
              <div className="h-12 w-12 bg-agro-beige rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-agro">3</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Современное оборудование</h3>
              <p className="text-gray-700">
                Наше предприятие оснащено современной техникой и оборудованием, 
                что делает работу более эффективной и комфортной.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md card-hover">
              <div className="h-12 w-12 bg-agro-beige rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-agro">4</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Социальная поддержка</h3>
              <p className="text-gray-700">
                Мы оказываем поддержку нашим сотрудникам в решении жилищных вопросов 
                и предоставляем различные социальные льготы.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md card-hover">
              <div className="h-12 w-12 bg-agro-beige rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-agro">5</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Дружный коллектив</h3>
              <p className="text-gray-700">
                У нас работают профессионалы своего дела, всегда готовые поделиться 
                опытом и поддержать новых сотрудников.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md card-hover">
              <div className="h-12 w-12 bg-agro-beige rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-agro">6</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Карьерный рост</h3>
              <p className="text-gray-700">
                Мы предоставляем возможности для карьерного роста и поощряем инициативу 
                и стремление к развитию.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Send Resume Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <h2 className="text-2xl font-bold mb-4">Не нашли подходящую вакансию?</h2>
              <p className="text-gray-700 mb-6">
                Отправьте нам свое резюме, и мы свяжемся с вами, когда появится 
                подходящая вакансия.
              </p>
              <Button asChild>
                <Link to="/feedback">Отправить резюме</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Apply Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-2xl">Отклик на вакансию</DialogTitle>
          </DialogHeader>
          <ResumeForm vacancyTitle={selectedVacancy} />
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Careers;
