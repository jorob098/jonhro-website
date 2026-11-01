import { Link } from 'react-router-dom';
import Seo from './Seo';

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found | Jonhro Robles" description="This page doesn't exist." noindex />
      <main className="not-found-page">
        <h1>Page not found</h1>
        <p>The page you're looking for doesn't exist or has moved.</p>
        <Link to="/" className="cta-button">Back to home</Link>
      </main>
    </>
  );
}
