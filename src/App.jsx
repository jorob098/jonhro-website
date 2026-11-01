import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary';

// Other pages and the chat load on demand so the homepage opens faster.
const About = lazy(() => import('./components/About'));
const Services = lazy(() => import('./components/Services'));
const Contact = lazy(() => import('./components/Contact'));
const Blog = lazy(() => import('./components/Blog'));
const Rfq = lazy(() => import('./components/Rfq'));
const Privacy = lazy(() => import('./components/Privacy'));
const Terms = lazy(() => import('./components/Terms'));
const NotFound = lazy(() => import('./components/NotFound'));
const ChatBox = lazy(() => import('./components/ChatBox/ChatBox'));

export default function App() {
  return (
    <div className="app-container">
      <ScrollToTop />
      <Header />
      <Suspense fallback={<div className="page-loading" aria-busy="true" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/rfq" element={<Rfq />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      <ErrorBoundary>
        <Suspense fallback={null}>
          <ChatBox />
        </Suspense>
      </ErrorBoundary>
      <Footer />
    </div>
  );
}
