import React, { useState } from "react";
import { useAdminData } from "@/context/AdminDataContext";
import { useInquiries } from "@/context/InquiriesContext";
import { useNavigate } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { Printer } from "lucide-react";

// --- STYLE SYSTEM ---
const colors = {
  primary: "#4CAF50",
  secondary: "#f5f5f7",
  card: "#fff",
  border: "#e0e0e0",
  text: "#222",
  danger: "#ff5252",
  action: "#2196f3",
  shadow: "0 4px 24px #0002"
};
const card = {
  background: colors.card,
  borderRadius: 18,
  boxShadow: colors.shadow,
  padding: 32,
  maxWidth: 520,
  margin: "40px auto",
  border: `1px solid ${colors.border}`,
};
const loginInput = {
  width: "100%",
  marginBottom: 16,
  padding: "12px 14px",
  borderRadius: 10,
  border: `1px solid ${colors.border}`,
  fontSize: 18,
  outline: "none",
};
const loginBtn = {
  width: "100%",
  padding: "12px 0",
  borderRadius: 10,
  border: "none",
  background: colors.primary,
  color: "#fff",
  fontWeight: 600,
  fontSize: 18,
  cursor: "pointer",
  marginTop: 12,
  transition: "background 0.2s"
};
const errorMsg = {
  color: colors.danger,
  marginBottom: 16,
  textAlign: "center" as const
};
const adminLayout = {
  display: "flex",
  minHeight: "100vh",
  height: "100vh",
  maxHeight: "100vh",
  background: colors.secondary,
  borderRadius: 18,
  boxShadow: colors.shadow,
};
const sidebar = {
  width: 280,
  background: "#f8fafc",
  borderRight: `1px solid ${colors.border}`,
  borderTopLeftRadius: 18,
  borderBottomLeftRadius: 18,
  padding: 40,
  display: "flex",
  flexDirection: "column" as const,
  gap: 28,
};
const main = {
  flex: 1,
  padding: "56px 48px",
  display: "flex",
  flexDirection: "column" as const,
  height: "100%",
  overflow: "hidden",
};
const navBtn = (active: boolean) => ({
  background: active ? colors.primary : "#fff",
  color: active ? "#fff" : colors.text,
  border: `1.5px solid ${active ? colors.primary : colors.border}`,
  borderRadius: 8,
  fontWeight: 600,
  fontSize: 20,
  padding: "16px 0",
  marginBottom: 12,
  cursor: "pointer",
  transition: "all 0.2s"
});
const sectionHeader = {
  fontSize: 36,
  fontWeight: 700,
  marginBottom: 36,
};
const addBtn = {
  background: colors.action,
  color: "#fff",
  border: "none",
  borderRadius: 8,
  padding: "14px 28px",
  fontSize: 18,
  fontWeight: 600,
  cursor: "pointer",
  marginBottom: 24,
  marginRight: 12,
};
const tableWrap = {
  overflowX: "auto" as const,
  marginTop: 24,
  flex: 1,
  display: "flex",
  flexDirection: "column" as const,
};
const tableContainer = {
  flex: 1,
  overflow: "auto",
  minHeight: 0,
};
const table = {
  width: "100%",
  borderCollapse: "collapse" as const,
  background: "#fff",
  borderRadius: 12,
  boxShadow: colors.shadow,
};
const th = {
  background: "#f3f6fa",
  color: colors.text,
  fontWeight: 700,
  padding: 16,
  borderBottom: `1.5px solid ${colors.border}`,
  textAlign: "left" as const,
  position: "sticky" as const,
  top: 0,
  zIndex: 1,
  fontSize: 17,
};
const td = {
  padding: 16,
  borderBottom: `1px solid ${colors.border}`,
  verticalAlign: "middle" as const,
  fontSize: 16,
};
const iconBtn = (color: string) => ({
  background: color,
  color: "#fff",
  border: "none",
  borderRadius: 6,
  padding: "10px 20px",
  fontWeight: 600,
  fontSize: 17,
  marginRight: 12,
  cursor: "pointer",
  transition: "background 0.2s",
});
const modalBg = {
  position: "fixed" as const,
  top: 0, left: 0, right: 0, bottom: 0,
  background: "#0006",
  zIndex: 1000,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
const modalCard = {
  ...card,
  maxWidth: 500,
  width: "100%",
  margin: 0,
  zIndex: 1001,
};

// --- MOBILE RESPONSIVE HOOK ---
function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 700);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

// --- MAIN COMPONENT ---
interface ProductForm {
  name: string;
  description: string;
  image: string | File;
  price: string;
  category: string;
  unit: string; // Unit of measurement: кг, л, шт
}

interface VacancyForm {
  title: string;
  department: string;
  location: string;
  salary: string;
  description: string;
  requirements: string;
  date: string;
}

interface NewsForm {
  title: string;
  content: string;
  image: string | File;
  date: string;
}

interface Inquiry {
  id: number;
  type: 'product' | 'vacancy' | 'contact';
  name: string;
  email: string;
  phone: string;
  message: string;
  productName?: string;
  vacancyTitle?: string;
  date: string;
  status: 'new' | 'in-progress' | 'completed';
}

const Admin = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState<'products' | 'vacancies' | 'news' | 'inquiries'>("products");
  const [showProductModal, setShowProductModal] = useState(false);
  const [showVacancyModal, setShowVacancyModal] = useState(false);
  const [showNewsModal, setShowNewsModal] = useState(false);
  const [editProductId, setEditProductId] = useState<number | null>(null);
  const [editVacancyId, setEditVacancyId] = useState<number | null>(null);
  const [editNewsId, setEditNewsId] = useState<number | null>(null);
  const [productForm, setProductForm] = useState<ProductForm>({
    name: '',
    description: '',
    image: '',
    price: '',
    category: 'grain',
    unit: 'кг'
  });
  const [vacancyForm, setVacancyForm] = useState<VacancyForm>({
    title: "",
    department: "",
    location: "",
    salary: "",
    description: "",
    requirements: "",
    date: new Date().toISOString().split('T')[0],
  });
  const [newsForm, setNewsForm] = useState<NewsForm>({
    title: "",
    content: "",
    image: "",
    date: new Date().toISOString().split('T')[0]
  });

  // Add state for message modal
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState("");

  // State for print modal
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [printInquiry, setPrintInquiry] = useState<Inquiry | null>(null);

  const {
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
  } = useAdminData();

  const { inquiries, updateInquiryStatus, deleteInquiry } = useInquiries();

  const isMobile = useIsMobile();
  const navigate = useNavigate();

  // Add logout handler
  const handleLogout = () => {
    setLoggedIn(false);
    navigate('/');
  };

  // --- LOGIN LOGIC ---
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "admin") {
      setLoggedIn(true);
      setLoginError("");
    } else {
      setLoginError("Неверные данные для входа");
    }
  };

  // --- PRODUCTS CRUD ---
  const handleProductFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setProductForm({ ...productForm, [e.target.name]: e.target.value });
  };
  const openAddProduct = () => {
    setProductForm({ name: '', description: '', image: '', price: '', category: 'grain', unit: 'кг' });
    setEditProductId(null);
    setShowProductModal(true);
  };
  const openEditProduct = (product: any) => {
    setProductForm({
      ...product,
      unit: product.unit || 'кг' // Ensure unit is set, default to кг if not present
    });
    setEditProductId(product.id);
    setShowProductModal(true);
  };
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (editProductId) {
      editProduct({ ...productForm, id: editProductId });
    } else {
      addProduct(productForm);
    }
    setShowProductModal(false);
    setProductForm({ name: '', description: '', image: '', price: '', category: 'grain', unit: 'кг' });
  };
  const handleDeleteProduct = (id: number) => {
    if (window.confirm("Удалить продукт?")) removeProduct(id);
  };

  // --- VACANCIES CRUD ---
  const handleVacancyFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setVacancyForm({ ...vacancyForm, [e.target.name]: e.target.value });
  };
  const openAddVacancy = () => {
    setEditVacancyId(null);
    setVacancyForm({ title: "", department: "", location: "", salary: "", description: "", requirements: "", date: new Date().toISOString().split('T')[0] });
    setShowVacancyModal(true);
  };
  const openEditVacancy = (vacancy: any) => {
    setEditVacancyId(vacancy.id);
    setVacancyForm({ ...vacancy, requirements: vacancy.requirements.join("\n"), date: vacancy.date });
    setShowVacancyModal(true);
  };
  const handleSaveVacancy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vacancyForm.title) return;
    if (editVacancyId !== null) {
      editVacancy({ 
        ...vacancyForm, 
        id: editVacancyId, 
        requirements: vacancyForm.requirements.split("\n").map(r => r.trim()).filter(Boolean),
        date: vacancyForm.date 
      });
    } else {
      addVacancy({ 
        ...vacancyForm, 
        requirements: vacancyForm.requirements.split("\n").map(r => r.trim()).filter(Boolean),
        date: vacancyForm.date 
      });
    }
    setShowVacancyModal(false);
  };
  const handleDeleteVacancy = (id: number) => {
    if (window.confirm("Удалить вакансию?")) removeVacancy(id);
  };

  // --- NEWS CRUD ---
  const handleNewsFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewsForm({ ...newsForm, [e.target.name]: e.target.value });
  };
  const openAddNews = () => {
    setEditNewsId(null);
    setNewsForm({
      title: "",
      content: "",
      image: "",
      date: new Date().toISOString().split('T')[0]
    });
    setShowNewsModal(true);
  };
  const openEditNews = (news: any) => {
    setEditNewsId(news.id);
    setNewsForm(news);
    setShowNewsModal(true);
  };
  const handleSaveNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsForm.title) return;
    if (editNewsId !== null) {
      editNews({ ...newsForm, id: editNewsId });
    } else {
      addNews({ ...newsForm });
    }
    setShowNewsModal(false);
  };
  const handleDeleteNews = (id: number) => {
    if (window.confirm("Удалить новость?")) removeNews(id);
  };

  // Add new function to handle inquiry status change
  const handleInquiryStatusChange = (id: number, newStatus: 'new' | 'in-progress' | 'completed') => {
    updateInquiryStatus(id, newStatus);
  };
  
  // Parse product details from order message
  const parseOrderDetails = (productName: string | undefined) => {
    if (!productName) return [];
    
    // Split by comma to get individual products
    return productName.split(', ').map(item => {
      // Check if it has quantity and unit information
      const match = item.match(/(.+)\s\((\d+)\s([\u0430-\u044f\u0410-\u042f]+)\)/);
      
      if (match) {
        // Return structured data if it matches the pattern
        return {
          name: match[1],
          quantity: match[2],
          unit: match[3]
        };
      }
      
      // Return just the name if it doesn't match the pattern
      return { name: item, quantity: null, unit: null };
    });
  };

  // Add new function to delete inquiry
  const handleDeleteInquiry = (id: number) => {
    if (window.confirm("Удалить обращение?")) {
      deleteInquiry(id);
    }
  };

  // --- LOGIN PAGE ---
  if (!loggedIn) {
    return (
      <div style={{ minHeight: "100vh", background: colors.secondary, display: "flex", alignItems: "center", justifyContent: "center", padding: isMobile ? 0 : undefined }}>
        <div style={{ ...card, maxWidth: isMobile ? '97vw' : 520, padding: isMobile ? 18 : 32 }}>
          <h1 style={{ fontSize: isMobile ? 26 : 36, fontWeight: 800, marginBottom: 24, textAlign: "center" }}>Вход в админ-панель</h1>
          {loginError && <div style={errorMsg}> {loginError} </div>}
          <form onSubmit={handleLogin}>
            <input name="username" placeholder="Логин" value={username} onChange={e => setUsername(e.target.value)} style={{ ...loginInput, fontSize: isMobile ? 15 : 18 }} autoFocus />
            <input name="password" type="password" placeholder="Пароль" value={password} onChange={e => setPassword(e.target.value)} style={{ ...loginInput, fontSize: isMobile ? 15 : 18 }} />
            <button type="submit" style={{ ...loginBtn, fontSize: isMobile ? 16 : 18, padding: isMobile ? '10px 0' : '12px 0' }}>Войти</button>
          </form>
        </div>
      </div>
    );
  }

  // --- MAIN ADMIN PANEL ---
  return (
    <div style={{ maxWidth: 1400, margin: isMobile ? "0 auto" : "40px auto", padding: isMobile ? 0 : undefined }}>
      {/* Logout Button */}
      <button
        onClick={handleLogout}
        style={{
          position: "fixed",
          top: 14,
          right: 14,
          zIndex: 2000,
          background: colors.danger,
          color: "#fff",
          border: "none",
          borderRadius: 20,
          padding: "10px 15px",
          fontSize: 15,
          fontWeight: 600,
          cursor: "pointer",
          opacity: 0.85,
          transition: "opacity 0.2s",
        }}
        onMouseEnter={e => e.currentTarget.style.opacity = "1"}
        onMouseLeave={e => e.currentTarget.style.opacity = "0.85"}
      >
        Выйти
      </button>

      <div style={{
        ...adminLayout,
        flexDirection: isMobile ? "column" : "row",
        height: isMobile ? "auto" : "100vh",
        minHeight: isMobile ? "100vh" : "100vh",
        maxHeight: isMobile ? "none" : "100vh",
        boxShadow: isMobile ? undefined : colors.shadow,
        borderRadius: isMobile ? 0 : 18,
        background: isMobile ? colors.secondary : colors.secondary,
      }}>
        {/* Sidebar Navigation */}
        <nav style={{
          ...sidebar,
          width: isMobile ? "100%" : 280,
          borderRight: isMobile ? "none" : `1px solid ${colors.border}`,
          borderTopLeftRadius: isMobile ? 0 : 18,
          borderBottomLeftRadius: isMobile ? 0 : 18,
          borderTopRightRadius: isMobile ? 0 : undefined,
          borderBottomRightRadius: isMobile ? 0 : undefined,
          flexDirection: isMobile ? "row" : "column",
          gap: isMobile ? 0 : 28,
          padding: isMobile ? "0 0 14px 0" : 40,
          justifyContent: isMobile ? "space-around" : undefined,
        }}>
          <button style={{ ...navBtn(activeTab === 'products'), flex: 1, fontSize: isMobile ? 16 : 20, borderRadius: isMobile ? 0 : 8 }} onClick={() => setActiveTab('products')}>Продукция</button>
          <button style={{ ...navBtn(activeTab === 'vacancies'), flex: 1, fontSize: isMobile ? 16 : 20, borderRadius: isMobile ? 0 : 8 }} onClick={() => setActiveTab('vacancies')}>Вакансии</button>
          <button style={{ ...navBtn(activeTab === 'news'), flex: 1, fontSize: isMobile ? 16 : 20, borderRadius: isMobile ? 0 : 8 }} onClick={() => setActiveTab('news')}>Новости</button>
          <button style={{ ...navBtn(activeTab === 'inquiries'), flex: 1, fontSize: isMobile ? 16 : 20, borderRadius: isMobile ? 0 : 8 }} onClick={() => setActiveTab('inquiries')}>Обращения</button>
        </nav>
        <main style={{ ...main, padding: isMobile ? 14 : "56px 48px" }}>
          {/* Products Section */}
          {activeTab === 'products' && (
            <>
              <div style={{ ...sectionHeader, fontSize: isMobile ? 22 : 36, marginBottom: isMobile ? 18 : 36 }}>Управление продукцией</div>
              <button style={{ ...addBtn, fontSize: isMobile ? 15 : 18, padding: isMobile ? "10px 12px" : "14px 28px" }} onClick={openAddProduct}>+ Добавить продукт</button>
              <div style={{ ...tableWrap, marginTop: isMobile ? 12 : 24 }}>
                <div style={tableContainer}>
                  <table style={{ ...table, fontSize: isMobile ? 14 : 16 }}>
                    <thead>
                      <tr>
                        <th style={th}>ID</th><th style={th}>Название</th><th style={th}>Описание</th><th style={th}>Изображение</th><th style={th}>Цена</th><th style={th}>Категория</th><th style={th}>Единица измерения</th><th style={th}></th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map(product => (
                        <tr key={product.id}>
                          <td style={td}>{product.id}</td>
                          <td style={td}>{product.name}</td>
                          <td style={td}>{product.description}</td>
                          <td style={td}><img src={typeof product.image === 'string' ? product.image : URL.createObjectURL(product.image as File)} alt="img" style={{ width: isMobile ? 36 : 70, borderRadius: 8 }} /></td>
                          <td style={td}>{product.price}</td>
                          <td style={td}>{product.category}</td>
                          <td style={td}>{product.unit}</td>
                          <td style={td}>
                            <button style={iconBtn(colors.action)} title="Редактировать" onClick={() => openEditProduct(product)}>✏️</button>
                            <button style={iconBtn(colors.danger)} title="Удалить" onClick={() => handleDeleteProduct(product.id)}>🗑️</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* Vacancies Section */}
          {activeTab === 'vacancies' && (
            <>
              <div style={{ ...sectionHeader, fontSize: isMobile ? 22 : 36, marginBottom: isMobile ? 18 : 36 }}>Управление вакансиями</div>
              <button style={{ ...addBtn, fontSize: isMobile ? 15 : 18, padding: isMobile ? "10px 12px" : "14px 28px" }} onClick={openAddVacancy}>+ Добавить вакансию</button>
              <div style={{ ...tableWrap, marginTop: isMobile ? 12 : 24 }}>
                <div style={tableContainer}>
                  <table style={{ ...table, fontSize: isMobile ? 14 : 16 }}>
                    <thead>
                      <tr>
                        <th style={th}>ID</th>
                        <th style={th}>Дата</th>
                        <th style={th}>Должность</th><th style={th}>Отдел</th><th style={th}>Локация</th><th style={th}>Зарплата</th><th style={th}>Описание</th><th style={th}>Требования</th><th style={th}></th>
                      </tr>
                    </thead>
                    <tbody>
                      {vacancies.map(vacancy => (
                        <tr key={vacancy.id}>
                          <td style={td}>{vacancy.id}</td>
                          <td style={td}>{vacancy.date}</td>
                          <td style={td}>{vacancy.title}</td>
                          <td style={td}>{vacancy.department}</td>
                          <td style={td}>{vacancy.location}</td>
                          <td style={td}>{vacancy.salary}</td>
                          <td style={td}>{vacancy.description}</td>
                          <td style={td}><ul style={{ margin: 0, paddingLeft: 16 }}>{vacancy.requirements.map((r: string, idx: number) => <li key={idx}>{r}</li>)}</ul></td>
                          <td style={td}>
                            <button style={iconBtn(colors.action)} title="Редактировать" onClick={() => openEditVacancy(vacancy)}>✏️</button>
                            <button style={iconBtn(colors.danger)} title="Удалить" onClick={() => handleDeleteVacancy(vacancy.id)}>🗑️</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* News Section */}
          {activeTab === 'news' && (
            <>
              <div style={{ ...sectionHeader, fontSize: isMobile ? 22 : 36, marginBottom: isMobile ? 18 : 36 }}>Управление новостями</div>
              <button style={{ ...addBtn, fontSize: isMobile ? 15 : 18, padding: isMobile ? "10px 12px" : "14px 28px" }} onClick={openAddNews}>+ Добавить новость</button>
              <div style={{ ...tableWrap, marginTop: isMobile ? 12 : 24 }}>
                <div style={tableContainer}>
                  <table style={{ ...table, fontSize: isMobile ? 14 : 16 }}>
                    <thead>
                      <tr>
                        <th style={th}>ID</th>
                        <th style={th}>Дата</th>
                        <th style={th}>Заголовок</th>
                        <th style={th}>Содержание</th>
                        <th style={th}>Изображение</th>
                        <th style={th}></th>
                      </tr>
                    </thead>
                    <tbody>
                      {news.map(newsItem => (
                        <tr key={newsItem.id}>
                          <td style={td}>{newsItem.id}</td>
                          <td style={td}>{newsItem.date}</td>
                          <td style={td}>{newsItem.title}</td>
                          <td style={td}>{newsItem.content.substring(0, 100)}...</td>
                          <td style={td}>
                            {typeof newsItem.image === 'string' && (
                              <img src={newsItem.image} alt="" style={{ width: isMobile ? 36 : 70, borderRadius: 8 }} />
                            )}
                          </td>
                          <td style={td}>
                            <button style={iconBtn(colors.action)} title="Редактировать" onClick={() => openEditNews(newsItem)}>✏️</button>
                            <button style={iconBtn(colors.danger)} title="Удалить" onClick={() => handleDeleteNews(newsItem.id)}>🗑️</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* Inquiries Section */}
          {activeTab === 'inquiries' && (
            <>
              <div style={{ ...sectionHeader, fontSize: isMobile ? 22 : 36, marginBottom: isMobile ? 18 : 36 }}>
                Управление заявками
              </div>
              <div style={{ ...tableWrap, marginTop: isMobile ? 12 : 24 }}>
                <div style={tableContainer}>
                  <table style={{ ...table, fontSize: isMobile ? 14 : 16 }}>
                    <thead>
                      <tr>
                        <th style={th}>ID</th>
                        <th style={th}>Дата</th>
                        <th style={th}>Тип</th>
                        <th style={th}>Имя</th>
                        <th style={th}>Email</th>
                        <th style={th}>Телефон</th>
                        <th style={th}>Сообщение</th>
                        <th style={th}>Детали заказа</th>
                        <th style={th}>Дата</th>
                        <th style={th}>Статус</th>
                        <th style={th}>Действия</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inquiries.map(inquiry => (
                        <tr key={inquiry.id}>
                          <td style={td}>{inquiry.id}</td>
                          <td style={td}>{new Date(inquiry.date).toLocaleDateString()}</td>
                          <td style={td}>
                            {inquiry.type === 'product' ? 'Заказ продукции' :
                              inquiry.type === 'vacancy' ? 'Отклик на вакансию' :
                                'Контактная форма'}
                          </td>
                          <td style={td}>{inquiry.name}</td>
                          <td style={td}>{inquiry.email}</td>
                          <td style={td}>{inquiry.phone}</td>
                          <td style={{ ...td, maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            <span
                              style={{ cursor: 'pointer', color: colors.action, textDecoration: 'underline' }}
                              onClick={() => {
                                setSelectedMessage(inquiry.message);
                                setShowMessageModal(true);
                              }}
                            >
                              {inquiry.message.substring(0, 50)}{inquiry.message.length > 50 ? '...' : ''}
                            </span>
                          </td>
                          <td style={td}>
                            {inquiry.productName ? (
                              <div style={{ maxWidth: 250 }}>
                                {parseOrderDetails(inquiry.productName).map((item, idx) => (
                                  <div key={idx} style={{ marginBottom: 4, display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ fontWeight: item.quantity ? 600 : 400, marginRight: 8 }}>{item.name}</span>
                                    {item.quantity && (
                                      <Badge style={{ background: colors.primary, fontSize: 12 }}>
                                        {item.quantity} {item.unit}
                                      </Badge>
                                    )}
                                  </div>
                                ))}
                              </div>
                            ) : (
                              "-"
                            )}
                          </td>
                          <td style={td}>{new Date(inquiry.date).toLocaleDateString()}</td>
                          <td style={td}>
                            <select
                              value={inquiry.status}
                              onChange={(e) => updateInquiryStatus(inquiry.id, e.target.value as Inquiry['status'])}
                              style={{
                                padding: '4px 8px',
                                borderRadius: 4,
                                border: '1px solid #ddd',
                                backgroundColor: 
                                  inquiry.status === 'new' ? '#e3f2fd' :
                                  inquiry.status === 'in-progress' ? '#fff3e0' :
                                  '#e8f5e9'
                              }}
                            >
                              <option value="new">Новая</option>
                              <option value="in-progress">В работе</option>
                              <option value="completed">Завершена</option>
                            </select>
                          </td>
                          <td style={td}>
                            <button
                              style={iconBtn(colors.action)}
                              title="Распечатать"
                              onClick={() => {
                                setPrintInquiry(inquiry);
                                setShowPrintModal(true);
                              }}
                            >
                              <Printer size={18} />
                            </button>
                            <button
                              style={iconBtn(colors.danger)}
                              title="Удалить"
                              onClick={() => {
                                if (window.confirm('Удалить заявку?')) {
                                  deleteInquiry(inquiry.id);
                                }
                              }}
                            >
                              🗑️
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </main>
      </div>

      {/* Product Modal */}
      {showProductModal && (
        <div style={{ ...modalBg, padding: isMobile ? 8 : 0 }}>
          <form style={{ ...modalCard, maxWidth: isMobile ? '98vw' : 500, padding: isMobile ? 14 : 32 }} onSubmit={handleSaveProduct}>
            <h2 style={{ marginBottom: 18, fontSize: isMobile ? 18 : 22 }}>{editProductId ? "Редактировать продукт" : "Добавить продукт"}</h2>
            <input name="name" placeholder="Название" value={productForm.name} onChange={handleProductFormChange} style={{ ...loginInput, fontSize: isMobile ? 14 : 18 }} autoFocus />
            <input name="description" placeholder="Описание" value={productForm.description} onChange={handleProductFormChange} style={{ ...loginInput, fontSize: isMobile ? 14 : 18 }} />
            
            {/* Image Upload */}
            <div style={{ marginBottom: 16 }}>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setProductForm(prev => ({ ...prev, image: file }));
                  }
                }}
                style={{ display: 'none' }}
                id="imageUpload"
              />
              <label
                htmlFor="imageUpload"
                style={{
                  display: 'block',
                  padding: 12,
                  border: `1px dashed ${colors.border}`,
                  borderRadius: 10,
                  cursor: 'pointer',
                  textAlign: 'center',
                  marginBottom: 8,
                  background: '#f8f9fa'
                }}
              >
                {productForm.image instanceof File ? productForm.image.name : 'Нажмите, чтобы загрузить изображение'}
              </label>
              {typeof productForm.image === 'string' && productForm.image && (
                <div style={{ textAlign: 'center', position: 'relative' }}>
                  <img
                    src={productForm.image}
                    alt="Preview"
                    style={{ maxWidth: '100%', height: 120, objectFit: 'contain', borderRadius: 8 }}
                  />
                  <button 
                    type="button"
                    onClick={() => setProductForm(prev => ({ ...prev, image: "" }))}
                    style={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      background: colors.danger,
                      color: '#fff',
                      border: 'none',
                      borderRadius: '50%',
                      width: 28,
                      height: 28,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      fontSize: 16,
                      fontWeight: 'bold'
                    }}
                  >
                    ×
                  </button>
                </div>
              )}
            </div>

            <input name="price" placeholder="Цена" value={productForm.price} onChange={handleProductFormChange} style={{ ...loginInput, fontSize: isMobile ? 14 : 18 }} />
            
            <select
              name="category"
              value={productForm.category}
              onChange={handleProductFormChange}
              style={{
                ...loginInput,
                marginBottom: 20
              }}
            >
              <option value="grain">Зерновые культуры</option>
              <option value="beans">Бобовые культуры</option>
              <option value="livestock">Животноводство</option>
              <option value="services">Услуги</option>
            </select>
            
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>
              Единица измерения
            </label>
            <select
              name="unit"
              value={productForm.unit}
              onChange={handleProductFormChange}
              style={{
                ...loginInput,
                marginBottom: 20
              }}
            >
              <option value="кг">кг (килограмм)</option>
              <option value="л">л (литр)</option>
              <option value="шт">шт (штука)</option>
            </select>
            <div style={{ display: "flex", gap: 10, marginTop: 10, flexDirection: isMobile ? 'column' : 'row' }}>
              <button type="submit" style={{ ...addBtn, width: isMobile ? '100%' : undefined, fontSize: isMobile ? 15 : 16 }}>{editProductId ? "Сохранить" : "Добавить"}</button>
              <button type="button" style={{ ...addBtn, background: colors.danger, width: isMobile ? '100%' : undefined, fontSize: isMobile ? 15 : 16 }} onClick={() => setShowProductModal(false)}>Отмена</button>
            </div>
          </form>
        </div>
      )}

      {/* Vacancy Modal */}
      {showVacancyModal && (
        <div style={{ ...modalBg, padding: isMobile ? 8 : 0 }}>
          <form style={{ ...modalCard, maxWidth: isMobile ? '98vw' : 460, padding: isMobile ? 14 : 32 }} onSubmit={handleSaveVacancy}>
            <h2 style={{ marginBottom: 18, fontSize: isMobile ? 18 : 22 }}>{editVacancyId ? "Редактировать вакансию" : "Добавить вакансию"}</h2>
            <input name="title" placeholder="Должность" value={vacancyForm.title} onChange={handleVacancyFormChange} style={{ ...loginInput, fontSize: isMobile ? 14 : 18 }} autoFocus />
            <input name="department" placeholder="Отдел" value={vacancyForm.department} onChange={handleVacancyFormChange} style={{ ...loginInput, fontSize: isMobile ? 14 : 18 }} />
            <input name="location" placeholder="Локация" value={vacancyForm.location} onChange={handleVacancyFormChange} style={{ ...loginInput, fontSize: isMobile ? 14 : 18 }} />
            <input name="salary" placeholder="Зарплата" value={vacancyForm.salary} onChange={handleVacancyFormChange} style={{ ...loginInput, fontSize: isMobile ? 14 : 18 }} />
            <input name="description" placeholder="Описание" value={vacancyForm.description} onChange={handleVacancyFormChange} style={{ ...loginInput, fontSize: isMobile ? 14 : 18 }} />
            <textarea name="requirements" placeholder="Требования (каждое с новой строки)" value={vacancyForm.requirements} onChange={handleVacancyFormChange} style={{ ...loginInput, minHeight: 60, fontSize: isMobile ? 14 : 18 }} />
            <input 
              type="date" 
              name="date" 
              value={vacancyForm.date} 
              onChange={handleVacancyFormChange} 
              style={{ ...loginInput, fontSize: isMobile ? 14 : 18 }} 
            />
            <div style={{ display: "flex", gap: 10, marginTop: 10, flexDirection: isMobile ? 'column' : 'row' }}>
              <button type="submit" style={{ ...addBtn, width: isMobile ? '100%' : undefined, fontSize: isMobile ? 15 : 16 }}>{editVacancyId ? "Сохранить" : "Добавить"}</button>
              <button type="button" style={{ ...addBtn, background: colors.danger, width: isMobile ? '100%' : undefined, fontSize: isMobile ? 15 : 16 }} onClick={() => setShowVacancyModal(false)}>Отмена</button>
            </div>
          </form>
        </div>
      )}

      {/* News Modal */}
      {showNewsModal && (
        <div style={{ ...modalBg, padding: isMobile ? 8 : 0 }}>
          <form style={{ ...modalCard, maxWidth: isMobile ? '98vw' : 500, padding: isMobile ? 14 : 32 }} onSubmit={handleSaveNews}>
            <h2 style={{ marginBottom: 18, fontSize: isMobile ? 18 : 22 }}>{editNewsId ? "Редактировать новость" : "Добавить новость"}</h2>
            
            <input
              type="date"
              name="date"
              value={newsForm.date}
              onChange={handleNewsFormChange}
              style={{ ...loginInput, fontSize: isMobile ? 14 : 18 }}
            />
            
            <input
              name="title"
              placeholder="Заголовок"
              value={newsForm.title}
              onChange={handleNewsFormChange}
              style={{ ...loginInput, fontSize: isMobile ? 14 : 18 }}
              autoFocus
            />
            
            <textarea
              name="content"
              placeholder="Содержание новости"
              value={newsForm.content}
              onChange={handleNewsFormChange}
              style={{ ...loginInput, minHeight: 120, fontSize: isMobile ? 14 : 18 }}
            />
            
            {/* Image Upload */}
            <div style={{ marginBottom: 16 }}>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setNewsForm(prev => ({ ...prev, image: file }));
                  }
                }}
                style={{ display: 'none' }}
                id="newsImageUpload"
              />
              <label
                htmlFor="newsImageUpload"
                style={{
                  display: 'block',
                  padding: 12,
                  border: `1px dashed ${colors.border}`,
                  borderRadius: 10,
                  cursor: 'pointer',
                  textAlign: 'center',
                  marginBottom: 8,
                  background: '#f8f9fa'
                }}
              >
                {newsForm.image instanceof File ? newsForm.image.name : 'Нажмите, чтобы загрузить изображение'}
              </label>
              {typeof newsForm.image === 'string' && newsForm.image && (
                <div style={{ textAlign: 'center', position: 'relative' }}>
                  <img
                    src={newsForm.image}
                    alt="Preview"
                    style={{ maxWidth: '100%', height: 120, objectFit: 'contain', borderRadius: 8 }}
                  />
                  <button 
                    type="button"
                    onClick={() => setNewsForm(prev => ({ ...prev, image: "" }))}
                    style={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      background: colors.danger,
                      color: '#fff',
                      border: 'none',
                      borderRadius: '50%',
                      width: 28,
                      height: 28,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      fontSize: 16,
                      fontWeight: 'bold'
                    }}
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
            
            <div style={{ display: "flex", gap: 10, marginTop: 10, flexDirection: isMobile ? 'column' : 'row' }}>
              <button type="submit" style={{ ...addBtn, width: isMobile ? '100%' : undefined, fontSize: isMobile ? 15 : 16 }}>{editNewsId ? "Сохранить" : "Добавить"}</button>
              <button type="button" style={{ ...addBtn, background: colors.danger, width: isMobile ? '100%' : undefined, fontSize: isMobile ? 15 : 16 }} onClick={() => setShowNewsModal(false)}>Отмена</button>
            </div>
          </form>
        </div>
      )}

      {/* Message Modal */}
      {showMessageModal && (
        <div style={modalBg}>
          <div style={{...modalCard, maxWidth: 600, maxHeight: '80vh', overflow: 'auto'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16}}>
              <h2 style={{fontSize: 22, fontWeight: 600}}>Полный текст сообщения</h2>
              <button 
                onClick={() => setShowMessageModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: 24,
                  cursor: 'pointer',
                  color: '#666'
                }}
              >
                ×
              </button>
            </div>
            <div style={{
              whiteSpace: 'pre-wrap', 
              lineHeight: 1.6,
              wordBreak: 'break-word',
              overflowWrap: 'break-word',
              maxWidth: '100%',
              padding: '12px',
              background: '#f9f9f9',
              borderRadius: '8px',
              border: '1px solid #eee',
              fontSize: '16px'
            }}>
              {selectedMessage}
            </div>
            <div style={{marginTop: 24, textAlign: 'right'}}>
              <button 
                onClick={() => setShowMessageModal(false)}
                style={{
                  ...addBtn,
                  background: colors.danger,
                  marginRight: 0
                }}
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Print Modal */}
      {showPrintModal && printInquiry && (
        <div style={{ ...modalBg, zIndex: 3000 }}>
          <div id="print-area" style={{ ...modalCard, maxWidth: 600, width: '100%', margin: 0, zIndex: 3001, background: '#fff', color: '#222', fontSize: 17 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h2 style={{ fontSize: 22, fontWeight: 600 }}>Заявка №{printInquiry.id}</h2>
              <button 
                onClick={() => setShowPrintModal(false)}
                className="no-print"
                style={{ background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', color: '#666' }}
              >×</button>
            </div>
            <div style={{ marginBottom: 12 }}>
              <b>Тип:</b> {printInquiry.type === 'product' ? 'Заказ продукции' : printInquiry.type === 'vacancy' ? 'Отклик на вакансию' : 'Контактная форма'}
            </div>
            <div style={{ marginBottom: 12 }}><b>Имя:</b> {printInquiry.name}</div>
            <div style={{ marginBottom: 12 }}><b>Email:</b> {printInquiry.email}</div>
            <div style={{ marginBottom: 12 }}><b>Телефон:</b> {printInquiry.phone}</div>
            <div style={{ marginBottom: 12 }}><b>Дата:</b> {new Date(printInquiry.date).toLocaleString()}</div>
            <div style={{ marginBottom: 12 }}><b>Статус:</b> {printInquiry.status === 'new' ? 'Новая' : printInquiry.status === 'in-progress' ? 'В работе' : 'Завершена'}</div>
            {printInquiry.productName && (
              <div style={{ marginBottom: 12 }}>
                <b>Детали заказа:</b>
                <ul style={{ margin: '8px 0 0 18px' }}>
                  {parseOrderDetails(printInquiry.productName).map((item, idx) => {
                    const productDetails = products.find(p => p.name.trim() === item.name.trim());
                    const price = productDetails ? productDetails.price : 'Цена не указана';
                    return (
                      <li key={idx}>
                        {item.name} {item.quantity && `(${item.quantity} ${item.unit})`} - <b>{price}{productDetails && productDetails.price !== 'Договорная' ? ' руб.' : ''}</b>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
            {printInquiry.vacancyTitle && (
              <div style={{ marginBottom: 12 }}><b>Вакансия:</b> {printInquiry.vacancyTitle}</div>
            )}
            <div style={{ marginBottom: 12 }}>
              <b>Сообщение:</b>
              <div style={{ whiteSpace: 'pre-wrap', background: '#f9f9f9', borderRadius: 8, padding: 10, marginTop: 4, border: '1px solid #eee' }}>{printInquiry.message}</div>
            </div>
            <div style={{ marginTop: 24, textAlign: 'right', display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <button
                onClick={() => {
                  // Print only the print-area
                  const printContents = document.getElementById('print-area')?.innerHTML;
                  const win = window.open('', '', 'height=700,width=900');
                  if (win && printContents) {
                    win.document.write('<html><head><title>Печать заявки</title>');
                    win.document.write('<style>body{font-family:sans-serif;padding:24px;} h2{margin-bottom:18px;} b{font-weight:600;} ul{margin:0 0 0 18px;} li{margin-bottom:4px;} .print-btn{display:none;} .no-print{display:none !important;}</style>');
                    win.document.write('</head><body>');
                    win.document.write(printContents);
                    win.document.write('</body></html>');
                    win.document.close();
                    win.focus();
                    setTimeout(() => { win.print(); win.close(); }, 300);
                  }
                }}
                style={{ ...addBtn, background: colors.action, color: '#fff', fontSize: 16 }}
                className="no-print"
              >
                <Printer size={18} style={{ marginRight: 8, verticalAlign: 'middle' }} /> Печать
              </button>
              <button
                onClick={() => setShowPrintModal(false)}
                style={{ ...addBtn, background: colors.secondary, color: '#fff', padding: '10px 20px', fontSize: 16 }}
                className="no-print"
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
