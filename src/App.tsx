import "./App.css";
import { lazy, Suspense } from "react";
import Navbar from "./components/navbar";
import Sidebar from "./components/Sidebar";
import { BrowserRouter, Routes, Route } from "react-router";
import SidebarProvider from "./context/SidebarContext";
import { DetailMovieProvider } from "./context/DetailMovieProvider";
import { FeedbackProvider } from "./context/FeedbackContext";
import { useSidebar } from "./hooks/useSidebar";
import { useFeedback } from "./hooks/useFeedback";
// Home is the landing route and stays eagerly imported: lazy-loading it would
// insert a network round-trip before first paint and hurt LCP, which works
// against the point of code-splitting.
import Home from "./pages/Home";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import OfflineBanner from "./components/OfflineBanner";
import InstallPrompt from "./components/InstallPrompt";

const DetailsPage = lazy(() => import("./pages/DetailsPage"));
const TVDetailsPage = lazy(() => import("./pages/TVDetailsPage"));
const Search = lazy(() => import("./pages/Search"));
const Movies = lazy(() => import("./pages/Movies"));
const Series = lazy(() => import("./pages/Series"));
const Browse = lazy(() => import("./pages/Browse"));
const Favourites = lazy(() => import("./pages/Favourites"));
const FeedbackModal = lazy(() => import("./components/FeedbackModal"));

function AppContent() {
  const { isSidebarOpen } = useSidebar();
  const { isFeedbackModalOpen, closeFeedbackModal } = useFeedback();

  return (
    <DetailMovieProvider>
      <Navbar />
      <Sidebar />
      <main
        className={`transition-all duration-300 pt-14 ${
          isSidebarOpen ? "md:ml-64" : "md:ml-0"
        }`}
      >
        <ScrollToTop />
        {/*
          SkeletonLoader renders a fixed 10-item movie-grid shape with no
          min-h-screen/background of its own, so it only matches the grid
          pages (Movies/Series/Browse/Favourites/Search). Reusing it here as
          one shared fallback would flash a movie grid in front of
          non-grid routes like DetailsPage/TVDetailsPage, which is more
          jarring than helpful. A minimal full-height dark block avoids a
          white flash against the theme without pretending to match content
          it hasn't fetched yet.
        */}
        <Suspense
          fallback={
            <div className="min-h-screen" style={{ background: "#0e0e0e" }} />
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/details/movie/:id" element={<DetailsPage />}/>
            <Route path="/details/tv/:id" element={<TVDetailsPage />}/>
            <Route path="/search" element={<Search />} />
            <Route path="/movies" element={<Movies/>} />
            <Route path="/series" element={<Series/>} />
            <Route path="/browse/:slug" element={<Browse />} />
            <Route path="/favourites" element={<Favourites />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <Suspense fallback={null}>
        <FeedbackModal isOpen={isFeedbackModalOpen} onClose={closeFeedbackModal} />
      </Suspense>
      <OfflineBanner />
      <InstallPrompt />
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
