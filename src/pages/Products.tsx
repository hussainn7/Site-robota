import React, { useState, useMemo, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";
import ProductCard from "@/components/ui/ProductCard";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import ContactForm from "@/components/ui/ContactForm";
import { useAdminData } from "@/context/AdminDataContext";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShoppingCart, Trash2, Plus, Minus, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Toaster, toast } from "sonner";

// Define cart item type
interface CartItem {
  productId: number;
  name: string;
  price: string;
  quantity: number;
  unit: string;
  category: string;
}

const Products = () => {
  const { products } = useAdminData();
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("name-asc");
  const [priceFilter, setPriceFilter] = useState("all");
  
  // Cart state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  
  // Product quantity and unit selection
  const [productQuantities, setProductQuantities] = useState<{[key: number]: number}>({});
  
  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

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
      case "grain":
        return "bg-amber-100 text-amber-800";
      case "beans":
        return "bg-green-100 text-green-800";
      case "livestock":
        return "bg-blue-100 text-blue-800";
      case "services":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  // Get unit for a product from its data or use default
  const getProductUnit = (product: any) => {
    // If product has a unit defined, use it
    if (product.unit) {
      return product.unit;
    }
    
    // Otherwise use default logic based on category and name
    if (product.category === 'livestock' && product.name.toLowerCase().includes('молоко')) {
      return 'л';
    } else if (product.category === 'services') {
      return 'шт';
    }
    return 'кг';
  };
  
  // Handle adding product to cart
  const handleAddToCart = (product: any) => {
    const productId = product.id;
    const existingItemIndex = cart.findIndex(item => item.productId === productId);
    const unit = getProductUnit(product);
    
    if (existingItemIndex >= 0) {
      // Update quantity if already in cart
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += productQuantities[productId] || 1;
      setCart(updatedCart);
    } else {
      // Add new item to cart
      setCart([...cart, {
        productId,
        name: product.name,
        price: product.price,
        quantity: productQuantities[productId] || 1,
        unit,
        category: product.category
      }]);
    }
    
    // Reset quantity
    setProductQuantities(prev => ({
      ...prev,
      [productId]: 1
    }));
    
    toast.success(`${product.name} добавлен в корзину`, {
      position: 'bottom-right'
    });
  };
  
  // Handle removing item from cart
  const handleRemoveFromCart = (productId: number) => {
    setCart(cart.filter(item => item.productId !== productId));
    toast.success('Товар удален из корзины', {
      position: 'bottom-right'
    });
  };
  
  // Handle quantity change for cart items
  const handleCartQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCart(cart.map(item => 
      item.productId === productId ? {...item, quantity: newQuantity} : item
    ));
  };
  
  // Handle unit change for cart items
  const handleUnitChange = (productId: number, unit: string) => {
    setCart(cart.map(item => 
      item.productId === productId ? {...item, unit} : item
    ));
  };
  
  // Handle quantity change for products before adding to cart
  const handleQuantityChange = (productId: number, change: number) => {
    setProductQuantities(prev => {
      const currentQuantity = prev[productId] || 1;
      const newQuantity = Math.max(1, currentQuantity + change);
      return {...prev, [productId]: newQuantity};
    });
  };
  
  // Handle direct input of quantity
  const handleQuantityInput = (productId: number, value: string) => {
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue) && numValue > 0) {
      setProductQuantities(prev => ({
        ...prev,
        [productId]: numValue
      }));
    }
  };
  
  // Количество уникальных товаров в корзине
  const cartItemCount = cart.length;
  
  // Handle checkout
  const handleCheckout = () => {
    setShowCart(false);
    setShowCheckout(true);
  };
  
  // Handle order completion
  const handleOrderComplete = () => {
    setShowCheckout(false);
    setCart([]);
    localStorage.removeItem('cart');
    toast.success('Ваш заказ успешно отправлен!', {
      position: 'bottom-right'
    });
  };

  return (
    <Layout>
      {/* Custom Toaster position */}
      <Toaster position="bottom-right" richColors />
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
      {/* Cart Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button 
          onClick={() => setShowCart(true)}
          className="bg-agro hover:bg-agro-dark text-white rounded-full p-4 shadow-lg flex items-center justify-center relative transition-all duration-300 hover:scale-105"
        >
          <ShoppingCart size={24} />
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
              {cartItemCount}
            </span>
          )}
        </button>
      </div>
      
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
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-semibold text-agro">{product.price}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center border rounded-md">
                            <button 
                              onClick={() => handleQuantityChange(product.id, -1)}
                              className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                            >
                              <Minus size={16} />
                            </button>
                            <input
                              type="number"
                              min="1"
                              value={productQuantities[product.id] || 1}
                              onChange={(e) => handleQuantityInput(product.id, e.target.value)}
                              className="w-12 text-center px-1 py-1 border-0 focus:ring-0 focus:outline-none"
                            />
                            <button 
                              onClick={() => handleQuantityChange(product.id, 1)}
                              className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                            >
                              <Plus size={16} />
                            </button>
                            <span className="px-2 py-1 text-gray-500 text-sm border-l">
                              {getProductUnit(product)}
                            </span>
                          </div>
                          <button
                            onClick={() => handleAddToCart(product)}
                            className="bg-agro hover:bg-agro-dark text-white font-bold py-2 px-4 rounded transition-colors duration-300 flex items-center"
                          >
                            <ShoppingCart size={16} className="mr-2" />
                            В корзину
                          </button>
                        </div>
                      </div>
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

      {/* Shopping Cart Dialog */}
      <Dialog open={showCart} onOpenChange={setShowCart}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Корзина</DialogTitle>
            <DialogDescription>
              {cart.length > 0 ? 'Ваши товары' : 'Ваша корзина пуста'}
            </DialogDescription>
          </DialogHeader>
          
          {cart.length > 0 ? (
            <>
              <div className="space-y-4 my-4">
                {cart.map((item) => (
                  <div key={item.productId} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold">{item.name}</h4>
                      <p className="text-sm text-gray-600">{item.price}</p>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center">
                        <button 
                          onClick={() => handleCartQuantityChange(item.productId, item.quantity - 1)}
                          className="p-1 text-gray-600 hover:bg-gray-100 rounded-md"
                        >
                          <Minus size={14} />
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => {
                            const val = parseInt(e.target.value, 10);
                            if (!isNaN(val) && val > 0) {
                              handleCartQuantityChange(item.productId, val);
                            }
                          }}
                          className="w-20 text-center px-1 py-1 border-0 focus:ring-0 focus:outline-none"
                        />
                        <button 
                          onClick={() => handleCartQuantityChange(item.productId, item.quantity + 1)}
                          className="p-1 text-gray-600 hover:bg-gray-100 rounded-md"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      
                      <Select 
                        value={item.unit} 
                        onValueChange={(value) => handleUnitChange(item.productId, value)}
                      >
                        <SelectTrigger className="w-[70px]">
                          <SelectValue placeholder="Ед." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="кг">кг</SelectItem>
                          <SelectItem value="л">л</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <button 
                        onClick={() => handleRemoveFromCart(item.productId)}
                        className="p-1 text-red-500 hover:bg-red-50 rounded-md"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold">Всего товаров:</span>
                <span>{cartItemCount}</span>
              </div>
              
              <div className="flex justify-end space-x-3">
                <Button variant="outline" onClick={() => setShowCart(false)}>
                  Продолжить покупки
                </Button>
                <Button className="bg-agro hover:bg-agro-dark" onClick={handleCheckout}>
                  Оформить заказ
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <ShoppingCart className="mx-auto mb-4 text-gray-400" size={48} />
              <p className="text-gray-600">Ваша корзина пуста</p>
              <Button className="mt-4 bg-agro hover:bg-agro-dark" onClick={() => setShowCart(false)}>
                Начать покупки
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Checkout Dialog */}
      <Dialog open={showCheckout} onOpenChange={setShowCheckout}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-2xl">Оформление заказа</DialogTitle>
            <DialogDescription>
              Заполните форму для оформления заказа
            </DialogDescription>
          </DialogHeader>
          
          <div className="my-4">
            <h3 className="font-semibold mb-2">Ваш заказ:</h3>
            <div className="space-y-2 max-h-[200px] overflow-y-auto p-2 border rounded-md">
              {cart.map((item) => (
                <div key={item.productId} className="flex justify-between">
                  <span>{item.name}</span>
                  <span>{item.quantity} {item.unit}</span>
                </div>
              ))}
            </div>
          </div>
          
          <ContactForm 
            title="Данные для заказа" 
            subtitle="Заполните форму, и наш менеджер свяжется с вами для уточнения деталей заказа"
            productName={cart.map(item => `${item.name} (${item.quantity} ${item.unit})`).join(', ')}
            onSubmitSuccess={handleOrderComplete}
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
