import "./App.css";
import Navbar from "./components/navbar";
import Sidebar from "./components/Sidebar";
import { BrowserRouter, Routes, Route } from "react-router";
import SidebarProvider from "./context/SidebarContext";
import { DetailMovieProvider } from "./context/DetailMovieProvider";
import { FeedbackProvider } from "./context/FeedbackContext";
import { useSidebar } from "./hooks/useSidebar";
import { useFeedback } from "./hooks/useFeedback";
import Home from "./pages/Home";
import DetailsPage from "./pages/DetailsPage";
import TVDetailsPage from "./pages/TVDetailsPage";
import Search from "./pages/Search";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import FeedbackModal from "./components/FeedbackModal";
import Movies from "./pages/Movies";
import Series from "./pages/Series";
import Favourites from "./pages/Favourites";
import OfflineBanner from "./components/OfflineBanner";

function AppContent() {
  const { isSidebarOpen } = useSidebar();
  const { isFeedbackModalOpen, closeFeedbackModal } = useFeedback();

  return (
    <DetailMovieProvider>
      <Navbar />
      <Sidebar />
      <main
        className={`transition-all duration-300 ${
          isSidebarOpen ? "md:ml-64" : "md:ml-0"
        }`}
      >
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/movie/:id" element={<DetailsPage />}/>
          <Route path="/details/tv/:id" element={<TVDetailsPage />}/>
          <Route path="/search" element={<Search />} />
          <Route path="/movies" element={<Movies/>} />
          <Route path="/series" element={<Series/>} />
          <Route path="/favourites" element={<Favourites />} />
        </Routes>
      </main>
      <Footer />
      <FeedbackModal isOpen={isFeedbackModalOpen} onClose={closeFeedbackModal} />
      <OfflineBanner />
    </DetailMovieProvider>
  );
}

function App() {
  return (
    <FeedbackProvider>
      <SidebarProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </SidebarProvider>
    </FeedbackProvider>
  );
}

export default App;
