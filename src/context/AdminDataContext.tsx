import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from "react";

// Types
type Product = {
  id: number;
  name: string;
  description: string;
  image: string | File;
  imageUrl?: string;
  price: string;
  category: string;
  unit: string; // Unit of measurement: кг, л, шт
};

type Vacancy = {
  id: number;
  title: string;
  department: string;
  location: string;
  salary: string;
  description: string;
  requirements: string[];
  date: string; // Date when vacancy was added
};

type News = {
  id: number;
  title: string;
  content: string;
  image: string | File;
  date: string;
};

type AdminDataContextType = {
  products: Product[];
  vacancies: Vacancy[];
  news: News[];
  addProduct: (product: Omit<Product, "id">) => void;
  editProduct: (product: Product) => void;
  removeProduct: (id: number) => void;
  addVacancy: (vacancy: Omit<Vacancy, "id">) => void;
  editVacancy: (vacancy: Vacancy) => void;
  removeVacancy: (id: number) => void;
  addNews: (news: Omit<News, "id">) => void;
  editNews: (news: News) => void;
  removeNews: (id: number) => void;
};

const defaultProducts: Product[] = [
  {
    id: 1,
    name: "Пшеница озимая",
    description: "Высококачественная озимая пшеница сортов Элегия, Капэлла и Августина. Подходит для пищевой промышленности.",
    image: "https://i.postimg.cc/DyGfm8x6/5197285658434073189.jpg",
    price: "от 650 руб/т",
    category: "grain",
    unit: "кг",
  },
  {
    id: 2,
    name: "Ячмень",
    description: "Яровой и озимый ячмень высокого качества. Используется для кормовых целей и пивоваренной промышленности.",
    image: "https://i.postimg.cc/WzFNG3T2/5197285658434073187.jpg",
    price: "от 550 руб/т",
    category: "grain",
    unit: "кг",
  },
  {
    id: 3,
    name: "Рапс",
    description: "Озимый и яровой рапс. Используется для производства растительного масла и биотоплива.",
    image: "https://i.postimg.cc/bJFYSbXC/5197285658434073185.jpg",
    price: "от 1200 руб/т",
    category: "grain",
    unit: "кг",
  },
  {
    id: 4,
    name: "Горох",
    description: "Горох для пищевой промышленности и кормовых целей. Высокое содержание белка.",
    image: "https://i.postimg.cc/mgNbNKfF/5197285658434073186.jpg",
    price: "от 750 руб/т",
    category: "beans",
    unit: "кг",
  },
  {
    id: 5,
    name: "Соя",
    description: "Высококачественная соя для пищевой промышленности и производства комбикормов.",
    image: "https://i.postimg.cc/5yhxnV28/5197285658434073190.jpg",
    price: "от 950 руб/т",
    category: "beans",
    unit: "кг",
  },
  {
    id: 6,
    name: "Молоко",
    description: "Свежее коровье молоко высшего сорта. Поставляется на молокоперерабатывающие предприятия.",
    image: "https://i.postimg.cc/SsKNKdPY/5197285658434073188.jpg",
    price: "Договорная",
    category: "livestock",
    unit: "л",
  },
  {
    id: 7,
    name: "Мясо говядины",
    description: "Качественное мясо говядины от собственного животноводческого комплекса.",
    image: "https://i.postimg.cc/SsKNKdPY/5197285658434073188.jpg",
    price: "Договорная",
    category: "livestock",
    unit: "кг",
  },
  {
    id: 8,
    name: "Аренда сельхозтехники",
    description: "Предоставление в аренду современной сельскохозяйственной техники с операторами.",
    image: "https://i.postimg.cc/mgNbNKfF/5197285658434073186.jpg",
    price: "от 100 руб/час",
    category: "services",
    unit: "шт",
  },
  {
    id: 9,
    name: "Хранение зерна",
    description: "Услуги по хранению зерна в современных элеваторах с контролем качества.",
    image: "https://i.postimg.cc/bJFYSbXC/5197285658434073185.jpg",
    price: "от 80 руб/т в месяц",
    category: "services",
    unit: "шт",
  }
];

const defaultVacancies: Vacancy[] = [
  {
    id: 1,
    title: "Агроном",
    department: "Растениеводство",
    location: "аг. Больтиники",
    salary: "от 1500 руб.",
    description: "Требуется агроном для работы на полях предприятия. Обязанности включают планирование и контроль выращивания сельскохозяйственных культур, разработку и внедрение новых технологий.",
    requirements: [
      "Высшее образование по специальности",
      "Опыт работы от 3 лет",
      "Знание современных агротехнологий",
      "Умение работать с сельскохозяйственной техникой"
    ],
    date: "2025-03-15"
  },
  {
    id: 2,
    title: "Механизатор",
    department: "Механизация",
    location: "аг. Больтиники",
    salary: "от 1200 руб.",
    description: "Требуется механизатор для работы на сельскохозяйственной технике. Обязанности включают обработку полей, уборку урожая, техническое обслуживание техники.",
    requirements: [
      "Среднее специальное образование",
      "Опыт работы от 1 года",
      "Наличие прав категории B, C, D",
      "Знание сельскохозяйственной техники"
    ],
    date: "2025-04-01"
  },
  {
    id: 3,
    title: "Зоотехник",
    department: "Животноводство",
    location: "аг. Больтиники",
    salary: "от 1400 руб.",
    description: "Требуется зоотехник для работы на животноводческом комплексе. Обязанности включают контроль за содержанием и кормлением животных, ведение учета, разработку рационов.",
    requirements: [
      "Высшее образование по специальности",
      "Опыт работы от 2 лет",
      "Знание современных методов животноводства",
      "Ответственность и внимательность"
    ],
    date: "2025-04-10"
  },
  {
    id: 4,
    title: "Бухгалтер",
    department: "Бухгалтерия",
    location: "аг. Больтиники",
    salary: "от 1300 руб.",
    description: "Требуется бухгалтер для ведения бухгалтерского учета, составления отчетности и работы с первичной документацией.",
    requirements: [
      "Высшее экономическое образование",
      "Опыт работы в сельском хозяйстве от 1 года",
      "Знание 1С:Бухгалтерия",
      "Внимательность, аккуратность, ответственность"
    ],
    date: "2025-04-15"
  }
];

const defaultNews: News[] = [
  {
    id: 1,
    title: "Новый урожай пшеницы",
    content: "В этом году мы собрали рекордный урожай озимой пшеницы.",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800",
    date: "2025-04-15"
  }
];

const AdminDataContext = createContext<AdminDataContextType | undefined>(undefined);

export const useAdminData = () => {
  const context = useContext(AdminDataContext);
  if (!context) throw new Error("useAdminData must be used within AdminDataProvider");
  return context;
};

export const AdminDataProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const stored = localStorage.getItem("products");
    return stored ? JSON.parse(stored) : defaultProducts;
  });

  const [vacancies, setVacancies] = useState<Vacancy[]>(() => {
    const stored = localStorage.getItem("vacancies");
    return stored ? JSON.parse(stored) : defaultVacancies;
  });

  const [news, setNews] = useState<News[]>(() => {
    const stored = localStorage.getItem("news");
    return stored ? JSON.parse(stored) : defaultNews;
  });

  // Get next available ID by finding the highest ID across all entities
  const getNextId = () => {
    const allIds = [
      ...products.map(p => p.id),
      ...vacancies.map(v => v.id),
      ...news.map(n => n.id)
    ];
    return allIds.length ? Math.max(...allIds) + 1 : 1;
  };

  // Products CRUD
  const addProduct = (product: Omit<Product, "id">) => {
    const newProduct = { ...product, id: getNextId() };
    
    if (product.image instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const productWithImage = { ...newProduct, image: base64String };
        setProducts(prev => [...prev, productWithImage]);
        localStorage.setItem('products', JSON.stringify([...products, productWithImage]));
      };
      reader.readAsDataURL(product.image);
    } else {
      setProducts(prev => [...prev, newProduct]);
      localStorage.setItem('products', JSON.stringify([...products, newProduct]));
    }
  };
  const editProduct = (product: Product) => {
    if (product.image instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const productWithImage = { ...product, image: base64String };
        setProducts(prev => prev.map(p => p.id === product.id ? productWithImage : p));
        localStorage.setItem('products', JSON.stringify(products.map(p => p.id === product.id ? productWithImage : p)));
      };
      reader.readAsDataURL(product.image);
    } else {
      setProducts(prev => prev.map(p => p.id === product.id ? product : p));
      localStorage.setItem('products', JSON.stringify(products.map(p => p.id === product.id ? product : p)));
    }
  };
  const removeProduct = (id: number) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    localStorage.setItem('products', JSON.stringify(products.filter(p => p.id !== id)));
  };

  // Vacancies CRUD
  const addVacancy = (vacancy: Omit<Vacancy, "id" | "date">) => {
    const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
    const newVacancy = { ...vacancy, id: getNextId(), date: today };
    setVacancies(prev => [...prev, newVacancy]);
    localStorage.setItem('vacancies', JSON.stringify([...vacancies, newVacancy]));
  };
  const editVacancy = (vacancy: Vacancy) => {
    setVacancies(prev => prev.map(v => v.id === vacancy.id ? vacancy : v));
    localStorage.setItem('vacancies', JSON.stringify(vacancies.map(v => v.id === vacancy.id ? vacancy : v)));
  };
  const removeVacancy = (id: number) => {
    setVacancies(prev => prev.filter(v => v.id !== id));
    localStorage.setItem('vacancies', JSON.stringify(vacancies.filter(v => v.id !== id)));
  };

  // News CRUD
  const addNews = (newsItem: Omit<News, "id">) => {
    const newNews = { ...newsItem, id: getNextId() };
    
    if (newsItem.image instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const newsWithImage = { ...newNews, image: base64String };
        setNews(prev => [...prev, newsWithImage]);
        localStorage.setItem('news', JSON.stringify([...news, newsWithImage]));
      };
      reader.readAsDataURL(newsItem.image);
    } else {
      setNews(prev => [...prev, newNews]);
      localStorage.setItem('news', JSON.stringify([...news, newNews]));
    }
  };

  const editNews = (newsItem: News) => {
    if (newsItem.image instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const newsWithImage = { ...newsItem, image: base64String };
        setNews(prev => prev.map(n => n.id === newsItem.id ? newsWithImage : n));
        localStorage.setItem('news', JSON.stringify(news.map(n => n.id === newsItem.id ? newsWithImage : n)));
      };
      reader.readAsDataURL(newsItem.image);
    } else {
      setNews(prev => prev.map(n => n.id === newsItem.id ? newsItem : n));
      localStorage.setItem('news', JSON.stringify(news.map(n => n.id === newsItem.id ? newsItem : n)));
    }
  };

  const removeNews = (id: number) => {
    setNews(prev => prev.filter(n => n.id !== id));
    localStorage.setItem('news', JSON.stringify(news.filter(n => n.id !== id)));
  };

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);
  useEffect(() => {
    localStorage.setItem("vacancies", JSON.stringify(vacancies));
  }, [vacancies]);
  useEffect(() => {
    localStorage.setItem("news", JSON.stringify(news));
  }, [news]);

  return (
    <AdminDataContext.Provider
      value={{
        products,
        vacancies,
        news,
        addProduct,
        editProduct,
        removeProduct,
        addVacancy,
        editVacancy,
        removeVacancy,
        addNews,
        editNews,
        removeNews,
      }}
    >
      {children}
    </AdminDataContext.Provider>
  );
};
