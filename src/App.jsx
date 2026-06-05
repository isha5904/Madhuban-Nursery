import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Plants from './pages/Plants';
import PlantDetail from './pages/PlantDetail';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import CategoryPage from './pages/CategoryPage';
import Phase2Page from './pages/Phase2Page';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppLayout() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main style={{ paddingTop: '72px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/plants" element={<Plants />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          <Route path="/plants/:id" element={<PlantDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Phase2Page />} />
          <Route path="/register" element={<Phase2Page />} />
          <Route path="/cart" element={<Phase2Page />} />
          <Route path="/checkout" element={<Phase2Page />} />
          <Route path="/wishlist" element={<Phase2Page />} />
          <Route path="/orders" element={<Phase2Page />} />
          <Route path="/admin" element={<Phase2Page />} />
          <Route path="/admin/plants" element={<Phase2Page />} />
          <Route path="/admin/orders" element={<Phase2Page />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}
