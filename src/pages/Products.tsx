import React, { useState, useMemo } from "react";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";
import ProductCard from "@/components/ui/ProductCard";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import ContactForm from "@/components/ui/ContactForm";
import { useAdminData } from "@/context/AdminDataContext";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Products = () => {
  const { products } = useAdminData();
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("name-asc");
  const [priceFilter, setPriceFilter] = useState("all");

  // Product categories
  const categories = [
    { id: "all", name: "Все категории" },
    { id: "grain", name: "Зерновые культуры" },
    { id: "beans", name: "Бобовые культуры" },
    { id: "livestock", name: "Животноводство" },
    { id: "services", name: "Услуги" },
  ];

  // Price ranges
  const priceRanges = [
    { id: "all", name: "Все цены" },
    { id: "low", name: "До 700 руб/т" },
    { id: "medium", name: "700-1000 руб/т" },
    { id: "high", name: "Свыше 1000 руб/т" },
  ];

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    // First filter by category
    let filtered = activeCategory === "all" 
      ? products 
      : products.filter(product => product.category === activeCategory);
    
    // Then filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query)
      );
    }
    
    // Then filter by price range
    if (priceFilter !== "all") {
      filtered = filtered.filter(product => {
        // Extract numeric price value (remove "от " and " руб/т")
        const priceString = product.price.replace(/от\s+|\s+руб\/т|Договорная/gi, "");
        const price = priceString === "" ? 0 : parseInt(priceString, 10);
        
        switch(priceFilter) {
          case "low":
            return price < 700;
          case "medium":
            return price >= 700 && price <= 1000;
          case "high":
            return price > 1000;
          default:
            return true;
        }
      });
    }
    
    // Then sort
    return filtered.sort((a, b) => {
      switch (sortOption) {
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "price-asc": {
          const priceA = a.price.includes("Договорная") ? Infinity : parseInt(a.price.replace(/от\s+|\s+руб\/т/gi, ""), 10);
          const priceB = b.price.includes("Договорная") ? Infinity : parseInt(b.price.replace(/от\s+|\s+руб\/т/gi, ""), 10);
          return priceA - priceB;
        }
        case "price-desc": {
          const priceA = a.price.includes("Договорная") ? -Infinity : parseInt(a.price.replace(/от\s+|\s+руб\/т/gi, ""), 10);
          const priceB = b.price.includes("Договорная") ? -Infinity : parseInt(b.price.replace(/от\s+|\s+руб\/т/gi, ""), 10);
          return priceB - priceA;
        }
        default:
          return 0;
      }
    });
  }, [products, activeCategory, searchQuery, priceFilter, sortOption]);

  // Helper functions for category badges
  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : categoryId;
  };
  
  const getCategoryBadgeColor = (categoryId: string) => {
    switch(categoryId) {
      case 'grain':
        return 'bg-green-100 text-green-800';
      case 'beans':
        return 'bg-blue-100 text-blue-800';
      case 'livestock':
        return 'bg-amber-100 text-amber-800';
      case 'services':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

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

      {/* Search, Filter and Sort Controls */}
      <section className="py-8 bg-gray-50">
        <div className="container-custom">
          {/* Category Buttons */}
          <div className="flex flex-wrap gap-3 justify-center mb-6">
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
          
          {/* Advanced Search and Sort Controls */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                  Поиск продукции
                </label>
                <Input 
                  id="search"
                  type="text" 
                  placeholder="Введите название или описание" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                  Ценовой диапазон
                </label>
                <Select value={priceFilter} onValueChange={setPriceFilter}>
                  <SelectTrigger id="price">
                    <SelectValue placeholder="Выберите ценовой диапазон" />
                  </SelectTrigger>
                  <SelectContent>
                    {priceRanges.map((range) => (
                      <SelectItem key={range.id} value={range.id}>
                        {range.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">
                  Сортировка
                </label>
                <Select value={sortOption} onValueChange={setSortOption}>
                  <SelectTrigger id="sort">
                    <SelectValue placeholder="Сортировка" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name-asc">По названию (А-Я)</SelectItem>
                    <SelectItem value="name-desc">По названию (Я-А)</SelectItem>
                    <SelectItem value="price-asc">По цене (возрастание)</SelectItem>
                    <SelectItem value="price-desc">По цене (убывание)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="section-title mb-12">Наша продукция</h2>
          
          {filteredAndSortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAndSortedProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  {typeof product.image === 'string' && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <span className={`absolute top-4 left-4 ${getCategoryBadgeColor(product.category)} text-xs font-medium px-2.5 py-0.5 rounded`}>
                        {getCategoryName(product.category)}
                      </span>
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-agro">{product.price}</span>
                      <button
                        onClick={() => handleOrderClick(product.name)}
                        className="bg-agro hover:bg-agro-dark text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                      >
                        Заказать
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                {searchQuery || priceFilter !== "all" ? 
                  "По вашему запросу продукции не найдено" : 
                  "В данной категории пока нет продуктов"}
              </p>
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
