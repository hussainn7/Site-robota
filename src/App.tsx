import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { AdminDataProvider } from "./context/AdminDataContext";
import { InquiriesProvider } from "./context/InquiriesContext";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Careers from "./pages/Careers";
import Contacts from "./pages/Contacts";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import News from "./pages/News";
import NewsDetails from "./pages/NewsDetails";

function App() {
  return (
    <AdminDataProvider>
      <InquiriesProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/about" element={<About />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:id" element={<NewsDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster position="top-right" />
        </Router>
      </InquiriesProvider>
    </AdminDataProvider>
  );
}

export default App;
