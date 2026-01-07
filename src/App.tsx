import "./App.css";
import Navbar from "./components/navbar";
import Sidebar from "./components/Sidebar";
import { BrowserRouter, Routes, Route } from "react-router";
import SidebarProvider from "./context/SidebarContext";
import { useSidebar } from "./hooks/useSidebar";
import Home from "./pages/Home";

function AppContent() {
  const { isSidebarOpen } = useSidebar();

  return (
    <>
      <Navbar />
      <Sidebar />
      <main
        className={`transition-all duration-300 ${
          isSidebarOpen ? "md:ml-64" : "md:ml-0"
        }`}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<div className="p-6">Movies Page Coming Soon</div>} />
          <Route path="/series" element={<div className="p-6">Series Page Coming Soon</div>} />
          <Route path="/favourites" element={<div className="p-6">Favourites Page Coming Soon</div>} />
          <Route path="/search" element={<div className="p-6">Search Results Page Coming Soon</div>} />
        </Routes>
      </main>
    </>
  );
}

function App() {
  return (
    <SidebarProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </SidebarProvider>
  );
}

export default App;
