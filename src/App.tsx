import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import Index from "./pages/Index";
import Projects from "./pages/Projects";
import Experience from "./pages/Experience";
import GitHubStats from "./pages/GitHubStats";
import Education from "./pages/Education";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import BackToTop from "./components/BackToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="relative min-h-screen flex flex-col">
          <AnimatedBackground />

          {/* Scanline overlay */}
          <div className="fixed inset-0 scanlines z-[1]" />

          {/* Vignette */}
          <div className="fixed inset-0 vignette z-[1]" />

          {/* Floating orbs */}
          <div className="fixed top-[10%] left-[5%] w-[300px] h-[300px] floating-orb bg-primary/5 z-0" />
          <div
            className="fixed bottom-[20%] right-[10%] w-[250px] h-[250px] floating-orb bg-primary/4 z-0"
            style={{ animationDelay: "-4s" }}
          />
          <div
            className="fixed top-[60%] left-[60%] w-[200px] h-[200px] floating-orb bg-primary/3 z-0"
            style={{ animationDelay: "-8s" }}
          />

          {/* Hex grid overlay */}
          <div className="fixed inset-0 hex-grid z-0 opacity-40" />

          <Navbar />

          <main className="flex-1 relative z-10">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/github" element={<GitHubStats />} />
              <Route path="/education" element={<Education />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          <Footer />

          {/* Global Back To Top Button */}
          <BackToTop />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;