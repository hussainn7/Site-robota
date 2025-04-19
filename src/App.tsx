import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Products from "./pages/Products";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import Careers from "./pages/Careers";
import Contacts from "./pages/Contacts";
import Feedback from "./pages/Feedback";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import { AdminDataProvider } from "@/context/AdminDataContext";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AdminDataProvider>
          <BrowserRouter>
            <div>
              {/* Small Admin Button in top-right corner */}
              <Link
                to="/admin"
                className="admin-button"
                style={{
                  position: "fixed",
                  top: 16,
                  zIndex: 2000,
                  background: "#222",
                  color: "#fff",
                  borderRadius: 20,
                  padding: "7px 16px",
                  fontSize: 13,
                  fontWeight: 600,
                  boxShadow: "0 2px 8px #0002",
                  opacity: 0.75,
                  textDecoration: "none",
                  transition: "opacity 0.2s, background 0.2s",
                  cursor: "pointer",
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = "1"}
                onMouseLeave={e => e.currentTarget.style.opacity = "0.75"}
              >
                Admin
              </Link>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/products" element={<Products />} />
                <Route path="/news" element={<News />} />
                <Route path="/news/:id" element={<NewsDetail />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/feedback" element={<Feedback />} />
                <Route path="/admin" element={<Admin />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </BrowserRouter>
        </AdminDataProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
