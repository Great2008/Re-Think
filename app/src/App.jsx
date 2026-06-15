import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { ThemeProvider } from './lib/theme.jsx';
import Nav from './components/Nav.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Series from './pages/Series.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Admin from './pages/Admin.jsx';

function Analytics() {
  useEffect(() => {
    const id = 'e10d7e11-0cc0-4170-8c1f-72faf9a78101';
    if (document.getElementById('umami-script')) return;
    const s = document.createElement('script');
    s.id = 'umami-script';
    s.defer = true;
    s.src = 'https://cloud.umami.is/script.js';
    s.setAttribute('data-website-id', id);
    document.head.appendChild(s);
  }, []);
  return null;
}

function PublicLayout() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/series/:id" element={<Series />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Analytics />
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="/*" element={<PublicLayout />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
