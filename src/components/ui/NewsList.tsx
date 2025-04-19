import React, { useState, useMemo } from "react";
import { useAdminData } from "@/context/AdminDataContext";
import NewsCard from "@/components/ui/NewsCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface NewsListProps {
  initialVisibleCount?: number;
  showFilters?: boolean;
  showLoadMore?: boolean;
  className?: string;
}

const NewsList: React.FC<NewsListProps> = ({
  initialVisibleCount = 6,
  showFilters = true,
  showLoadMore = true,
  className = ""
}) => {
  const [visibleNews, setVisibleNews] = useState(initialVisibleCount);
  const { news } = useAdminData();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("date-desc");
  const [dateFilter, setDateFilter] = useState("all");
  
  // Date filter options
  const dateFilters = [
    { id: "all", name: "Все даты" },
    { id: "last-week", name: "За последнюю неделю" },
    { id: "last-month", name: "За последний месяц" },
    { id: "last-year", name: "За последний год" },
  ];
  
  // Filter and sort news
  const filteredAndSortedNews = useMemo(() => {
    // First filter by search query
    let filtered = news.filter(item => {
      const searchLower = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(searchLower) ||
        item.content.toLowerCase().includes(searchLower)
      );
    });
    
    // Then filter by date
    if (dateFilter !== "all") {
      const now = new Date();
      const filterDate = new Date();
      
      switch(dateFilter) {
        case "last-week":
          filterDate.setDate(now.getDate() - 7);
          break;
        case "last-month":
          filterDate.setMonth(now.getMonth() - 1);
          break;
        case "last-year":
          filterDate.setFullYear(now.getFullYear() - 1);
          break;
      }
      
      filtered = filtered.filter(item => new Date(item.date) >= filterDate);
    }
    
    // Then sort
    return filtered.sort((a, b) => {
      switch (sortOption) {
        case "date-desc":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "date-asc":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "title-asc":
          return a.title.localeCompare(b.title);
        case "title-desc":
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });
  }, [news, searchQuery, dateFilter, sortOption]);

  // Get visible news
  const displayedNews = filteredAndSortedNews.slice(0, visibleNews);

  // Load more news
  const loadMore = () => {
    setVisibleNews(prev => Math.min(prev + 3, filteredAndSortedNews.length));
  };

  return (
    <div className={className}>
      {/* Search and Filter Controls */}
      {showFilters && (
        <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                Поиск новостей
              </label>
              <Input 
                id="search"
                type="text" 
                placeholder="Введите заголовок или текст" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                Фильтр по дате
              </label>
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger id="date">
                  <SelectValue placeholder="Выберите период" />
                </SelectTrigger>
                <SelectContent>
                  {dateFilters.map((filter) => (
                    <SelectItem key={filter.id} value={filter.id}>
                      {filter.name}
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
                  <SelectItem value="date-desc">Сначала новые</SelectItem>
                  <SelectItem value="date-asc">Сначала старые</SelectItem>
                  <SelectItem value="title-asc">По названию (А-Я)</SelectItem>
                  <SelectItem value="title-desc">По названию (Я-А)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )}

      {/* News Grid */}
      {displayedNews.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedNews.map((newsItem) => (
              <NewsCard
                key={newsItem.id}
                id={newsItem.id}
                title={newsItem.title}
                excerpt={newsItem.content.substring(0, 150) + "..."}
                date={newsItem.date}
                image={typeof newsItem.image === 'string' ? newsItem.image : ''}
              />
            ))}
          </div>

          {/* Load More Button */}
          {showLoadMore && visibleNews < filteredAndSortedNews.length && (
            <div className="text-center mt-12">
              <Button onClick={loadMore} variant="outline" size="lg">
                Загрузить еще
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <p className="text-gray-600 text-lg">
            По вашему запросу новостей не найдено
          </p>
        </div>
      )}
    </div>
  );
};

export default NewsList; 