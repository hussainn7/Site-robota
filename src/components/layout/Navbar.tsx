import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Search, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAdminData } from "@/context/AdminDataContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { products, news, vacancies } = useAdminData();
  
  // Define search result type
  type SearchResult = {
    id: number;
    title: string;
    description: string;
    type: 'product' | 'news' | 'vacancy';
    url: string;
  };

  const navigation = [
    { name: "Главная", href: "/" },
    { name: "О предприятии", href: "/about" },
    { name: "Продукция", href: "/products" },
    { name: "Новости", href: "/news" },
    { name: "Вакансии", href: "/careers" },
    { name: "Контакты", href: "/contacts" },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  // Perform search across all content
  const performSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    
    const q = query.toLowerCase();
    
    // Search in products
    const productResults = products
      .filter(product => 
        product.name.toLowerCase().includes(q) || 
        product.description.toLowerCase().includes(q)
      )
      .map(product => ({
        id: product.id,
        title: product.name,
        description: product.description.substring(0, 100) + '...',
        type: 'product' as const,
        url: `/products`
      }));
    
    // Search in news
    const newsResults = news
      .filter(item => 
        item.title.toLowerCase().includes(q) || 
        item.content.toLowerCase().includes(q)
      )
      .map(item => ({
        id: item.id,
        title: item.title,
        description: item.content.substring(0, 100) + '...',
        type: 'news' as const,
        url: `/news/${item.id}`
      }));
    
    // Search in vacancies
    const vacancyResults = vacancies
      .filter(vacancy => 
        vacancy.title.toLowerCase().includes(q) || 
        vacancy.description.toLowerCase().includes(q) ||
        vacancy.department.toLowerCase().includes(q)
      )
      .map(vacancy => ({
        id: vacancy.id,
        title: vacancy.title,
        description: `${vacancy.department} - ${vacancy.location}`,
        type: 'vacancy' as const,
        url: `/careers`
      }));
    
    // Combine and limit results
    setSearchResults([...productResults, ...newsResults, ...vacancyResults].slice(0, 10));
  };
  
  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    performSearch(value);
  };
  
  // Handle search result click
  const handleResultClick = (result: SearchResult) => {
    setIsSearchOpen(false);
    setSearchQuery("");
    navigate(result.url);
  };
  
  // Clear search when dialog closes
  useEffect(() => {
    if (!isSearchOpen) {
      setSearchQuery("");
      setSearchResults([]);
    }
  }, [isSearchOpen]);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-serif font-bold text-agro">
                Элит-Агро
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`nav-link ${isActive(item.href) ? "active-nav-link" : ""}`}
              >
                {item.name}
              </Link>
            ))}
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-gray-500 hover:text-agro hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Поиск по сайту"
            >
              <Search size={20} />
            </button>
            <Link 
              to="/admin"
              className="p-2 text-gray-500 hover:text-agro hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Админ-панель"
            >
              <Settings size={20} />
            </Link>
            <Button asChild>
              <Link to="/contacts" className="btn-primary">
                Связаться
              </Link>
            </Button>
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 animate-fade-in">
            <div className="flex flex-col space-y-4 py-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`nav-link px-4 py-2 rounded-md ${
                    isActive(item.href) ? "active-nav-link bg-gray-50" : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsSearchOpen(true);
                }}
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
              >
                <Search size={18} />
                <span>Поиск</span>
              </button>
              <Link
                to="/admin"
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                <Settings size={18} />
                <span>Админ-панель</span>
              </Link>
              <Button asChild className="mx-4">
                <Link
                  to="/contacts"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Связаться
                </Link>
              </Button>
            </div>
          </div>
        )}
        
        {/* Site-wide Search Dialog */}
        <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-hidden">
            <DialogHeader>
              <DialogTitle>Поиск по сайту</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col h-full">
              <div className="py-4">
                <Input
                  placeholder="Введите запрос для поиска..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  autoFocus
                  className="w-full"
                />
              </div>
              
              <div className="flex-1 min-h-0">
                {searchResults.length > 0 ? (
                  <div className="overflow-y-auto max-h-[60vh] pr-2">
                    <div className="space-y-2">
                      {searchResults.map((result) => (
                        <div 
                          key={`${result.type}-${result.id}`}
                          className="p-4 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors border border-gray-100"
                          onClick={() => handleResultClick(result)}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-gray-900 mb-1">{result.title}</p>
                              <p className="text-sm text-gray-500 line-clamp-2">{result.description}</p>
                            </div>
                            <span className={`shrink-0 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              result.type === 'product' ? 'bg-blue-100 text-blue-800' :
                              result.type === 'news' ? 'bg-green-100 text-green-800' :
                              'bg-amber-100 text-amber-800'
                            }`}>
                              {result.type === 'product' ? 'Продукция' :
                               result.type === 'news' ? 'Новости' :
                               'Вакансии'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : searchQuery ? (
                  <div className="text-center py-8 text-gray-500">
                    По вашему запросу ничего не найдено
                  </div>
                ) : null}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </nav>
  );
};

export default Navbar;
