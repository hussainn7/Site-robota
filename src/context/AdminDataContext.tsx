import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

// Types
type Product = {
  id: number;
  name: string;
  description: string;
  image: string;
  price: string;
  category: string;
};

type Vacancy = {
  id: number;
  title: string;
  department: string;
  location: string;
  salary: string;
  description: string;
  requirements: string[];
};

type AdminDataContextType = {
  products: Product[];
  vacancies: Vacancy[];
  addProduct: (product: Omit<Product, "id">) => void;
  editProduct: (product: Product) => void;
  removeProduct: (id: number) => void;
  addVacancy: (vacancy: Omit<Vacancy, "id">) => void;
  editVacancy: (vacancy: Vacancy) => void;
  removeVacancy: (id: number) => void;
};

const defaultProducts: Product[] = [
  {
    id: 1,
    name: "Пшеница озимая",
    description: "Высококачественная озимая пшеница сортов Элегия, Капэлла и Августина. Подходит для пищевой промышленности.",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ed40c3e2?auto=format&fit=crop",
    price: "от 650 руб/т",
    category: "grain",
  },
  {
    id: 2,
    name: "Ячмень",
    description: "Яровой и озимый ячмень высокого качества. Используется для кормовых целей и пивоваренной промышленности.",
    image: "https://images.unsplash.com/photo-1591117207239-788bf8de6c3b?auto=format&fit=crop",
    price: "от 550 руб/т",
    category: "grain",
  },
  {
    id: 3,
    name: "Рапс",
    description: "Озимый и яровой рапс. Используется для производства растительного масла и биотоплива.",
    image: "https://images.unsplash.com/photo-1599371625276-1aadef22311b?auto=format&fit=crop",
    price: "от 1200 руб/т",
    category: "grain",
  },
  {
    id: 4,
    name: "Горох",
    description: "Горох для пищевой промышленности и кормовых целей. Высокое содержание белка.",
    image: "https://images.unsplash.com/photo-1563635707507-5d44cadb2b48?auto=format&fit=crop",
    price: "от 750 руб/т",
    category: "beans",
  },
  {
    id: 5,
    name: "Соя",
    description: "Высококачественная соя для пищевой промышленности и производства комбикормов.",
    image: "https://images.unsplash.com/photo-1620636875061-73b99318f12b?auto=format&fit=crop",
    price: "от 950 руб/т",
    category: "beans",
  },
  {
    id: 6,
    name: "Молоко",
    description: "Свежее коровье молоко высшего сорта. Поставляется на молокоперерабатывающие предприятия.",
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop",
    price: "Договорная",
    category: "livestock",
  },
  {
    id: 7,
    name: "Мясо говядины",
    description: "Качественное мясо говядины от собственного животноводческого комплекса.",
    image: "https://images.unsplash.com/photo-1551028150-64b9f398f678?auto=format&fit=crop",
    price: "Договорная",
    category: "livestock",
  },
  {
    id: 8,
    name: "Аренда сельхозтехники",
    description: "Предоставление в аренду современной сельскохозяйственной техники с операторами.",
    image: "https://images.unsplash.com/photo-1588464083885-8abe494ab4dd?auto=format&fit=crop",
    price: "от 100 руб/час",
    category: "services",
  },
  {
    id: 9,
    name: "Хранение зерна",
    description: "Услуги по временному хранению зерна в специально оборудованных складских помещениях.",
    image: "https://images.unsplash.com/photo-1557690756-59716d0a4cdc?auto=format&fit=crop",
    price: "от 5 руб/т в день",
    category: "services",
  },
];

const defaultVacancies: Vacancy[] = [
  {
    id: 1,
    title: "Агроном",
    department: "Растениеводство",
    location: "д. Больтиники",
    salary: "от 1500 руб.",
    description: "Мы ищем опытного агронома для организации и контроля полевых работ, разработки технологических карт и мониторинга состояния посевов.",
    requirements: [
      "Высшее образование по специальности \"Агрономия\"",
      "Опыт работы в сельском хозяйстве от 3 лет",
      "Знание современных агротехнологий",
      "Умение работать с сельскохозяйственной техникой",
      "Ответственность, организованность, нацеленность на результат"
    ]
  },
  {
    id: 2,
    title: "Механизатор",
    department: "Механизация",
    location: "д. Больтиники",
    salary: "от 1200 руб.",
    description: "Требуется механизатор для выполнения различных сельскохозяйственных работ на современной технике.",
    requirements: [
      "Опыт работы на сельскохозяйственной технике от 2 лет",
      "Наличие водительского удостоверения категории В, С",
      "Навыки работы с современной сельхозтехникой",
      "Ответственность, исполнительность, трудолюбие"
    ]
  },
  {
    id: 3,
    title: "Зоотехник",
    department: "Животноводство",
    location: "д. Больтиники",
    salary: "от 1400 руб.",
    description: "Приглашаем на работу зоотехника для организации и контроля процессов кормления, содержания и разведения сельскохозяйственных животных.",
    requirements: [
      "Высшее образование по специальности \"Зоотехния\"",
      "Опыт работы в животноводстве от 2 лет",
      "Знание современных методов разведения и содержания КРС",
      "Умение вести учетную документацию",
      "Ответственность, инициативность, аналитические способности"
    ]
  },
  {
    id: 4,
    title: "Бухгалтер",
    department: "Бухгалтерия",
    location: "д. Больтиники",
    salary: "от 1300 руб.",
    description: "Требуется бухгалтер для ведения учета в сельскохозяйственном предприятии.",
    requirements: [
      "Высшее экономическое образование",
      "Опыт работы в бухгалтерии от 3 лет",
      "Знание программы 1С:Бухгалтерия",
      "Опыт работы в сельскохозяйственных предприятиях (желательно)",
      "Внимательность, ответственность, аккуратность"
    ]
  }
];

const AdminDataContext = createContext<AdminDataContextType | undefined>(undefined);

export const useAdminData = () => {
  const context = useContext(AdminDataContext);
  if (!context) throw new Error("useAdminData must be used within AdminDataProvider");
  return context;
};

export const AdminDataProvider = ({ children }: { children: ReactNode }) => {
  // Try to load from localStorage, else use defaults
  const [products, setProducts] = useState<Product[]>(() => {
    const stored = localStorage.getItem("products");
    return stored ? JSON.parse(stored) : defaultProducts;
  });
  const [vacancies, setVacancies] = useState<Vacancy[]>(() => {
    const stored = localStorage.getItem("vacancies");
    return stored ? JSON.parse(stored) : defaultVacancies;
  });

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);
  useEffect(() => {
    localStorage.setItem("vacancies", JSON.stringify(vacancies));
  }, [vacancies]);

  // Products CRUD
  const addProduct = (product: Omit<Product, "id">) => {
    setProducts(prev => [...prev, { ...product, id: Date.now() }]);
  };
  const editProduct = (product: Product) => {
    setProducts(prev => prev.map(p => (p.id === product.id ? product : p)));
  };
  const removeProduct = (id: number) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  // Vacancies CRUD
  const addVacancy = (vacancy: Omit<Vacancy, "id">) => {
    setVacancies(prev => [...prev, { ...vacancy, id: Date.now() }]);
  };
  const editVacancy = (vacancy: Vacancy) => {
    setVacancies(prev => prev.map(v => (v.id === vacancy.id ? vacancy : v)));
  };
  const removeVacancy = (id: number) => {
    setVacancies(prev => prev.filter(v => v.id !== id));
  };

  return (
    <AdminDataContext.Provider
      value={{
        products,
        vacancies,
        addProduct,
        editProduct,
        removeProduct,
        addVacancy,
        editVacancy,
        removeVacancy,
      }}
    >
      {children}
    </AdminDataContext.Provider>
  );
};
