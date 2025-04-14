import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";
import ProductCard from "@/components/ui/ProductCard";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import ContactForm from "@/components/ui/ContactForm";
import { useAdminData } from "@/context/AdminDataContext";

const Products = () => {
  const { products } = useAdminData();
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");

  // Product categories
  const categories = [
    { id: "all", name: "Все категории" },
    { id: "grain", name: "Зерновые культуры" },
    { id: "beans", name: "Бобовые культуры" },
    { id: "livestock", name: "Животноводство" },
    { id: "services", name: "Услуги" },
  ];

  // Filter products by category
  const filteredProducts = activeCategory === "all" 
    ? products 
    : products.filter(product => product.category === activeCategory);

  // Handle product order
  const handleOrderClick = (productName: string) => {
    setSelectedProduct(productName);
    setOpen(true);
  };

  return (
    <Layout>
      <PageHeader 
        title="Продукция и услуги" 
        description="Высококачественная сельскохозяйственная продукция и услуги"
        bgImage="https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?auto=format&fit=crop"
      />

      {/* Filter Categories */}
      <section className="py-8 bg-gray-50">
        <div className="container-custom">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-4 py-2 rounded-md transition-colors ${
                  activeCategory === category.id
                    ? "bg-agro text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="section-title mb-12">Наша продукция</h2>
          
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  description={product.description}
                  image={product.image}
                  price={product.price}
                  category={categories.find(cat => cat.id === product.category)?.name || product.category}
                  onOrder={() => handleOrderClick(product.name)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">В данной категории пока нет продуктов</p>
            </div>
          )}
        </div>
      </section>

      {/* Order Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-2xl">Заказать продукцию</DialogTitle>
            <DialogDescription>
              {selectedProduct && `Оставьте заявку на продукцию: ${selectedProduct}`}
            </DialogDescription>
          </DialogHeader>
          <ContactForm 
            title="Оформить заказ" 
            subtitle="Заполните форму, и наш менеджер свяжется с вами для уточнения деталей заказа"
          />
        </DialogContent>
      </Dialog>

      {/* Additional Info Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-agro-dark">
              Индивидуальные заказы и оптовые поставки
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Мы предлагаем гибкие условия сотрудничества и индивидуальный подход к каждому клиенту. 
              Для получения подробной информации о ценах, условиях поставки и заключения договоров, 
              пожалуйста, свяжитесь с нашими менеджерами.
            </p>
            <div className="bg-white p-8 rounded-lg shadow-md text-left">
              <h3 className="text-xl font-bold mb-4">Контакты отдела продаж</h3>
              <div className="space-y-2">
                <p>
                  <span className="font-semibold">Телефон:</span>{" "}
                  <a href="tel:+375291234567" className="text-agro hover:underline">
                    +375 (29) 123-45-67
                  </a>
                </p>
                <p>
                  <span className="font-semibold">Email:</span>{" "}
                  <a href="mailto:sales@elit-agro.by" className="text-agro hover:underline">
                    sales@elit-agro.by
                  </a>
                </p>
                <p>
                  <span className="font-semibold">Время работы:</span> Пн-Пт, 8:00-17:00
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Products;
