import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AdminDataProvider>
        <BrowserRouter>
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
        </BrowserRouter>
      </AdminDataProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
