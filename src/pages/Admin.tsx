import React, { useState } from "react";
import { useAdminData } from "@/context/AdminDataContext";
import { useNavigate } from 'react-router-dom';

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
  minHeight: "80vh",
  background: colors.secondary,
  borderRadius: 18,
  boxShadow: colors.shadow,
};
const sidebar = {
  width: 220,
  background: "#f8fafc",
  borderRight: `1px solid ${colors.border}`,
  borderTopLeftRadius: 18,
  borderBottomLeftRadius: 18,
  padding: 32,
  display: "flex",
  flexDirection: "column" as const,
  gap: 20,
};
const main = {
  flex: 1,
  padding: "40px 32px",
};
const navBtn = (active: boolean) => ({
  background: active ? colors.primary : "#fff",
  color: active ? "#fff" : colors.text,
  border: `1.5px solid ${active ? colors.primary : colors.border}`,
  borderRadius: 8,
  fontWeight: 600,
  fontSize: 17,
  padding: "12px 0",
  marginBottom: 8,
  cursor: "pointer",
  transition: "all 0.2s"
});
const sectionHeader = {
  fontSize: 28,
  fontWeight: 700,
  marginBottom: 28,
};
const addBtn = {
  background: colors.action,
  color: "#fff",
  border: "none",
  borderRadius: 8,
  padding: "10px 22px",
  fontSize: 16,
  fontWeight: 600,
  cursor: "pointer",
  marginBottom: 18,
  marginRight: 8,
};
const tableWrap = {
  overflowX: "auto" as const,
  marginTop: 18,
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
  padding: 12,
  borderBottom: `1.5px solid ${colors.border}`,
  textAlign: "left" as const,
};
const td = {
  padding: 12,
  borderBottom: `1px solid ${colors.border}`,
  verticalAlign: "middle" as const,
};
const iconBtn = (color: string) => ({
  background: color,
  color: "#fff",
  border: "none",
  borderRadius: 6,
  padding: "6px 16px",
  fontWeight: 600,
  fontSize: 15,
  marginRight: 8,
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
  maxWidth: 420,
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
}

interface VacancyForm {
  title: string;
  department: string;
  location: string;
  salary: string;
  description: string;
  requirements: string;
}

interface NewsForm {
  title: string;
  content: string;
  image: string | File;
  date: string;
}

const Admin = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState<'products' | 'vacancies' | 'news'>("products");
  const [showProductModal, setShowProductModal] = useState(false);
  const [showVacancyModal, setShowVacancyModal] = useState(false);
  const [showNewsModal, setShowNewsModal] = useState(false);
  const [editProductId, setEditProductId] = useState<number | null>(null);
  const [editVacancyId, setEditVacancyId] = useState<number | null>(null);
  const [editNewsId, setEditNewsId] = useState<number | null>(null);
  const [productForm, setProductForm] = useState<ProductForm>({
    name: "",
    description: "",
    image: "",
    price: "",
    category: "grain",
  });
  const [vacancyForm, setVacancyForm] = useState<VacancyForm>({
    title: "",
    department: "",
    location: "",
    salary: "",
    description: "",
    requirements: "",
  });
  const [newsForm, setNewsForm] = useState<NewsForm>({
    title: "",
    content: "",
    image: "",
    date: new Date().toISOString().split('T')[0]
  });

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
    setEditProductId(null);
    setProductForm({ name: "", description: "", image: "", price: "", category: "grain" });
    setShowProductModal(true);
  };
  const openEditProduct = (product: any) => {
    setEditProductId(product.id);
    setProductForm(product);
    setShowProductModal(true);
  };
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name) return;
    if (editProductId !== null) {
      editProduct({ ...productForm, id: editProductId });
    } else {
      addProduct({ ...productForm });
    }
    setShowProductModal(false);
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
    setVacancyForm({ title: "", department: "", location: "", salary: "", description: "", requirements: "" });
    setShowVacancyModal(true);
  };
  const openEditVacancy = (vacancy: any) => {
    setEditVacancyId(vacancy.id);
    setVacancyForm({ ...vacancy, requirements: vacancy.requirements.join("\n") });
    setShowVacancyModal(true);
  };
  const handleSaveVacancy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vacancyForm.title) return;
    if (editVacancyId !== null) {
      editVacancy({ ...vacancyForm, id: editVacancyId, requirements: vacancyForm.requirements.split("\n").map(r => r.trim()).filter(Boolean) });
    } else {
      addVacancy({ ...vacancyForm, requirements: vacancyForm.requirements.split("\n").map(r => r.trim()).filter(Boolean) });
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
    <div style={{ maxWidth: 1200, margin: isMobile ? "0 auto" : "40px auto", padding: isMobile ? 0 : undefined }}>
      {/* Logout Button */}
      <button
        onClick={handleLogout}
        style={{
          position: "fixed",
          top: 16,
          right: 16,
          zIndex: 2000,
          background: colors.danger,
          color: "#fff",
          border: "none",
          borderRadius: 20,
          padding: "7px 16px",
          fontSize: 13,
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
        minHeight: isMobile ? undefined : "80vh",
        boxShadow: isMobile ? undefined : colors.shadow,
        borderRadius: isMobile ? 0 : 18,
        background: isMobile ? colors.secondary : colors.secondary,
      }}>
        {/* Sidebar Navigation */}
        <nav style={{
          ...sidebar,
          width: isMobile ? "100%" : 220,
          borderRight: isMobile ? "none" : `1px solid ${colors.border}`,
          borderTopLeftRadius: isMobile ? 0 : 18,
          borderBottomLeftRadius: isMobile ? 0 : 18,
          borderTopRightRadius: isMobile ? 0 : undefined,
          borderBottomRightRadius: isMobile ? 0 : undefined,
          flexDirection: isMobile ? "row" : "column",
          gap: isMobile ? 0 : 20,
          padding: isMobile ? "0 0 10px 0" : 32,
          justifyContent: isMobile ? "space-around" : undefined,
        }}>
          <button style={{ ...navBtn(activeTab === 'products'), flex: 1, fontSize: isMobile ? 15 : 17, borderRadius: isMobile ? 0 : 8 }} onClick={() => setActiveTab('products')}>Продукция</button>
          <button style={{ ...navBtn(activeTab === 'vacancies'), flex: 1, fontSize: isMobile ? 15 : 17, borderRadius: isMobile ? 0 : 8 }} onClick={() => setActiveTab('vacancies')}>Вакансии</button>
          <button style={{ ...navBtn(activeTab === 'news'), flex: 1, fontSize: isMobile ? 15 : 17, borderRadius: isMobile ? 0 : 8 }} onClick={() => setActiveTab('news')}>Новости</button>
        </nav>
        <main style={{ ...main, padding: isMobile ? 12 : "40px 32px" }}>
          {/* Products Section */}
          {activeTab === 'products' && (
            <>
              <div style={{ ...sectionHeader, fontSize: isMobile ? 20 : 28, marginBottom: isMobile ? 16 : 28 }}>Управление продукцией</div>
              <button style={{ ...addBtn, fontSize: isMobile ? 14 : 16, padding: isMobile ? "8px 10px" : "10px 22px" }} onClick={openAddProduct}>+ Добавить продукт</button>
              <div style={{ ...tableWrap, marginTop: isMobile ? 10 : 18 }}>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ ...table, fontSize: isMobile ? 13 : undefined }}>
                    <thead>
                      <tr>
                        <th style={th}>ID</th><th style={th}>Название</th><th style={th}>Описание</th><th style={th}>Изображение</th><th style={th}>Цена</th><th style={th}>Категория</th><th style={th}></th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map(product => (
                        <tr key={product.id}>
                          <td style={td}>{product.id}</td>
                          <td style={td}>{product.name}</td>
                          <td style={td}>{product.description}</td>
                          <td style={td}><img src={product.image} alt="img" style={{ width: isMobile ? 32 : 50, borderRadius: 6 }} /></td>
                          <td style={td}>{product.price}</td>
                          <td style={td}>{product.category}</td>
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
              <div style={{ ...sectionHeader, fontSize: isMobile ? 20 : 28, marginBottom: isMobile ? 16 : 28 }}>Управление вакансиями</div>
              <button style={{ ...addBtn, fontSize: isMobile ? 14 : 16, padding: isMobile ? "8px 10px" : "10px 22px" }} onClick={openAddVacancy}>+ Добавить вакансию</button>
              <div style={{ ...tableWrap, marginTop: isMobile ? 10 : 18 }}>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ ...table, fontSize: isMobile ? 13 : undefined }}>
                    <thead>
                      <tr>
                        <th style={th}>ID</th><th style={th}>Должность</th><th style={th}>Отдел</th><th style={th}>Локация</th><th style={th}>Зарплата</th><th style={th}>Описание</th><th style={th}>Требования</th><th style={th}></th>
                      </tr>
                    </thead>
                    <tbody>
                      {vacancies.map(vacancy => (
                        <tr key={vacancy.id}>
                          <td style={td}>{vacancy.id}</td>
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
              <div style={{ ...sectionHeader, fontSize: isMobile ? 20 : 28, marginBottom: isMobile ? 16 : 28 }}>Управление новостями</div>
              <button style={{ ...addBtn, fontSize: isMobile ? 14 : 16, padding: isMobile ? "8px 10px" : "10px 22px" }} onClick={openAddNews}>+ Добавить новость</button>
              <div style={{ ...tableWrap, marginTop: isMobile ? 10 : 18 }}>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ ...table, fontSize: isMobile ? 13 : undefined }}>
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
                              <img src={newsItem.image} alt="" style={{ width: isMobile ? 32 : 50, borderRadius: 6 }} />
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
        </main>
      </div>

      {/* Product Modal */}
      {showProductModal && (
        <div style={{ ...modalBg, padding: isMobile ? 8 : 0 }}>
          <form style={{ ...modalCard, maxWidth: isMobile ? '98vw' : 420, padding: isMobile ? 14 : 32 }} onSubmit={handleSaveProduct}>
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
              {typeof productForm.image === 'string' && (
                <div style={{ textAlign: 'center' }}>
                  <img
                    src={productForm.image}
                    alt="Preview"
                    style={{ maxWidth: '100%', height: 120, objectFit: 'contain', borderRadius: 8 }}
                  />
                </div>
              )}
            </div>

            <input name="price" placeholder="Цена" value={productForm.price} onChange={handleProductFormChange} style={{ ...loginInput, fontSize: isMobile ? 14 : 18 }} />
            <select name="category" value={productForm.category} onChange={handleProductFormChange} style={{ ...loginInput, fontSize: isMobile ? 14 : 18 }}>
              <option value="grain">Зерновые</option>
              <option value="beans">Бобовые</option>
              <option value="livestock">Животноводство</option>
              <option value="services">Услуги</option>
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
          <form style={{ ...modalCard, maxWidth: isMobile ? '98vw' : 420, padding: isMobile ? 14 : 32 }} onSubmit={handleSaveVacancy}>
            <h2 style={{ marginBottom: 18, fontSize: isMobile ? 18 : 22 }}>{editVacancyId ? "Редактировать вакансию" : "Добавить вакансию"}</h2>
            <input name="title" placeholder="Должность" value={vacancyForm.title} onChange={handleVacancyFormChange} style={{ ...loginInput, fontSize: isMobile ? 14 : 18 }} autoFocus />
            <input name="department" placeholder="Отдел" value={vacancyForm.department} onChange={handleVacancyFormChange} style={{ ...loginInput, fontSize: isMobile ? 14 : 18 }} />
            <input name="location" placeholder="Локация" value={vacancyForm.location} onChange={handleVacancyFormChange} style={{ ...loginInput, fontSize: isMobile ? 14 : 18 }} />
            <input name="salary" placeholder="Зарплата" value={vacancyForm.salary} onChange={handleVacancyFormChange} style={{ ...loginInput, fontSize: isMobile ? 14 : 18 }} />
            <input name="description" placeholder="Описание" value={vacancyForm.description} onChange={handleVacancyFormChange} style={{ ...loginInput, fontSize: isMobile ? 14 : 18 }} />
            <textarea name="requirements" placeholder="Требования (каждое с новой строки)" value={vacancyForm.requirements} onChange={handleVacancyFormChange} style={{ ...loginInput, minHeight: 60, fontSize: isMobile ? 14 : 18 }} />
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
          <form style={{ ...modalCard, maxWidth: isMobile ? '98vw' : 420, padding: isMobile ? 14 : 32 }} onSubmit={handleSaveNews}>
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
                <div style={{ textAlign: 'center' }}>
                  <img
                    src={newsForm.image}
                    alt="Preview"
                    style={{ maxWidth: '100%', height: 120, objectFit: 'contain', borderRadius: 8 }}
                  />
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
    </div>
  );
};

export default Admin;
