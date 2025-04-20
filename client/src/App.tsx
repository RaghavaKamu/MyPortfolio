import { Toaster } from "@/components/ui/toaster";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./lib/ThemeProvider";
import Navbar from "@/components/Navbar";
import Home from "@/pages/Home";
import Footer from "@/components/Footer";
import AIChatbot from "@/components/AIChatbot";
import CursorLight from "@/components/CursorLight";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Home />
          </main>
          <Footer />
          <AIChatbot />
          <CursorLight />
        </div>
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
