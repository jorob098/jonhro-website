import { Link } from 'react-router-dom';
import Seo from './Seo';
import { LEGAL_UPDATED } from '../content/legal';
import './LegalPage.css';

export default function LegalPage({ path, doc, otherLink }) {
  return (
    <>
      <Seo path={path} />
      <main className="legal-page">
        <article className="legal-card">
          <div className="legal-head">
            <span className="legal-eyebrow">Legal</span>
            <h1>{doc.title}</h1>
            <p className="legal-updated">Last updated: {doc.updated || LEGAL_UPDATED}</p>
          </div>

          {doc.intro.map((p) => <p key={p}>{p}</p>)}

          {doc.sections.map(({ heading, paragraphs = [], list = [], paragraphs2 = [] }) => (
            <section key={heading}>
              <h2>{heading}</h2>
              {paragraphs.map((p) => <p key={p}>{p}</p>)}
              {list.length > 0 && (
                <ul>{list.map((item) => <li key={item}>{item}</li>)}</ul>
              )}
              {paragraphs2.map((p) => <p key={p}>{p}</p>)}
            </section>
          ))}

          <p className="legal-other">
            See also: <Link to={otherLink.to}>{otherLink.label}</Link>
          </p>
        </article>
      </main>
    </>
  );
}
