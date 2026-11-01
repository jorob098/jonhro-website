import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './components/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary';

// Other pages and the chat load on demand so the homepage opens faster.
const About = lazy(() => import('./components/About'));
const Services = lazy(() => import('./components/Services'));
const Contact = lazy(() => import('./components/Contact'));
const BlogList = lazy(() => import('./components/blog/BlogList'));
const BlogPost = lazy(() => import('./components/blog/BlogPost'));
const Rfq = lazy(() => import('./components/Rfq'));
const Track = lazy(() => import('./components/Track'));
const Privacy = lazy(() => import('./components/Privacy'));
const Terms = lazy(() => import('./components/Terms'));
const NotFound = lazy(() => import('./components/NotFound'));
const ChatBox = lazy(() => import('./components/ChatBox/ChatBox'));

// Old links to /track.html (keeps ?tn=... so shared links still work)
function OldTrackRedirect() {
  const { search } = useLocation();
  return <Navigate to={`/track${search}`} replace />;
}

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
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/rfq" element={<Rfq />} />
          <Route path="/track" element={<Track />} />
          <Route path="/track.html" element={<OldTrackRedirect />} />
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
