import * as React from 'react';
import { HrService, IDomain, IPolicyDoc } from './HrService';
import { INrsHrDomainsProps } from './INrsHrDomainsProps';

require('../assets/style.css');

const TYPES = {
  policies: 'Policies',
  procedures: 'Procedures',
  forms: 'Forms',
  guides: 'Guides and checklists'
};

const BADGE: { [k: string]: string } = {
  [TYPES.procedures]: 'Procedure',
  [TYPES.forms]: 'Form',
  [TYPES.guides]: 'Guide'
};

const stripExt = (n: string): string => n.replace(/\.[^/.]+$/, '');
const downloadUrl = (site: string, fileRef: string): string =>
  `${site}/_layouts/15/download.aspx?SourceUrl=${encodeURIComponent(fileRef)}`;

const DocIcon = (): JSX.Element => (
<img src={require('../assets/fileicon.png')} />
);

const DownloadIcon = (): JSX.Element => (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3V15M7 10L12 15L17 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5 19H19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const ResourceSection: React.FC<{ title: string; docs: IPolicyDoc[]; siteUrl: string }> = ({ title, docs, siteUrl }) => {
  if (!docs.length) return null;
  return (
    <section className="resource-section">
      <h2 className="section-title"><DocIcon />{title}</h2>
      <div className="resource-list">
        {docs.map(d => {
          const name = d.Title || stripExt(d.FileLeafRef);
          return (
            <div className="resource-item" key={d.Id}>
              <a href={d.FileRef} className="resource-name" target="_blank" rel="noreferrer" data-interception="off">
                <DocIcon />
                {name}
              </a>
              <div className="resource-actions">
                <span className="badge">{BADGE[d.PolicyType] || d.PolicyType}</span>
                <a href={downloadUrl(siteUrl, d.FileRef)} className="download-btn" aria-label={`Download ${name}`}>
                  <DownloadIcon />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

const NrsHrDomains: React.FC<INrsHrDomainsProps> = ({ service, categoryId, siteUrl }) => {
  const [domains, setDomains] = React.useState<IDomain[]>([]);
  const [docs, setDocs] = React.useState<IPolicyDoc[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    service.getDomains().then(setDomains).catch(e => setError(e.message));
  }, [service]);

 React.useEffect(() => {
  if (!categoryId) { setDocs([]); return; }

  let cancelled = false;
  setLoading(true);
  setError('');

  service.getDocs(categoryId)
    .then(result => {
      if (!cancelled) {
        setDocs(result);
        setLoading(false);
      }
    })
    .catch(e => {
      if (!cancelled) {
        setError(e.message);
        setLoading(false);
      }
    });

  return () => { cancelled = true; };
}, [service, categoryId]);

  if (!categoryId) return <div>Select a category in the web part property pane.</div>;
  if (error) return <div role="alert">Error: {error}</div>;

  const current = domains.filter(d => d.Id === categoryId)[0];
  const by = (t: string): IPolicyDoc[] => docs.filter(d => d.PolicyType === t);
  const policies = by(TYPES.policies);
  const related = domains.filter(d => d.Id !== categoryId).slice(0, 3);
  const title = current ? current.Title : '';

  return (
    <div style={{ position: 'relative' }}>
      {/* Hero */}
      <section className="nrsHrDomains">
        <div className="nrsHomePage">
          <div className="hr-red-shapes"></div>
          <div className="hr-hero-copy">
            <h1 className="hr-title">HR Policies and Procedures</h1>
          </div>
          <div className="hr-team-photo" role="img" aria-label="Human Capital Management Group team"></div>
        </div>
      </section>

      {/* Overview + Policies */}
      <main className="container">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <a href={siteUrl}>Home</a>
          <span className="separator">/</span>
          <a href="#">HR Domains</a>
          <span className="separator">/</span>
          <a href="#">{title}</a>
        </nav>

        <header>
          <h1 className="page-title">{title}</h1>
          <div className="title-underline"></div>
        </header>

        <section className="overview-section">
          <h2 className="section-heading">
            <svg className="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="12" r="9"></circle>
              <path d="M9.6 9a2.5 2.5 0 0 1 4.8 1c0 1.7-2.4 2-2.4 3.5"></path>
              <circle cx="12" cy="17" r=".6" fill="currentColor"></circle>
            </svg>
            <span>Overview</span>
          </h2>
          <div className="overview-box">
            {current && current.Overview && (
              <div dangerouslySetInnerHTML={{ __html: current.Overview }} />
            )}
            <p>
              This domain holds {policies.length} {policies.length === 1 ? 'policy' : 'policies'}.
              Use the sections below to reach the policies, procedures, forms and guidance for {title}.
            </p>
          </div>
        </section>

        {loading && <p>Loading…</p>}

        {policies.length > 0 && (
          <section className="policies-section">
            <h2 className="section-heading">
             <img src={require('../assets/fileicon.png')} />
              <span>Policies</span>
            </h2>
            <div className="policies-grid">
              {policies.map(p => (
                <a key={p.Id} href={p.FileRef} className="policy-card" target="_blank" rel="noreferrer" data-interception="off">
                  <div className="document-icon">
                    <svg viewBox="0 0 24 24">
                      <path d="M6 3h8l4 4v14H6z"></path>
                      <path d="M14 3v5h4"></path>
                      <path d="M9 12h6"></path>
                      <path d="M9 16h6"></path>
                    </svg>
                  </div>
                  <div className="policy-content">
                    <h3 className="policy-title">{p.Title || stripExt(p.FileLeafRef)}</h3>
                    {/* <span className="open-policy">
                      Open policy
                      <svg viewBox="0 0 10 10"><path d="M3 1L8 5L3 9Z"></path></svg>
                    </span> */}
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Procedures / Forms / Guides */}
      <div className="resources-container">
        <ResourceSection title="Procedures" docs={by(TYPES.procedures)} siteUrl={siteUrl} />
        <ResourceSection title="Forms" docs={by(TYPES.forms)} siteUrl={siteUrl} />
        <ResourceSection title="Guides and checklists" docs={by(TYPES.guides)} siteUrl={siteUrl} />
      </div>

      {/* FAQ, related, Ask HR */}
      <main className="Faqcontainer">
        <section className="faq-section">
          <h2 className="section-title">
            <i className="fa-regular fa-circle-question red-icon"></i>
            FAQs
          </h2>
          <div className="faq-box">
            <div className="faq-item">
              <h3>Where do I find the {title} policies?</h3>
              <p>They are listed in the Policies section above, and in the HR Policies A to Z.</p>
            </div>
            <div className="faq-item">
              <h3>Who do I contact about {title}?</h3>
              <p>Use Ask HR at the foot of this page to reach the People Service Portal.</p>
            </div>
            <a href="#" className="red-link">
              See all FAQs and the knowledge base
              <i className="fa-solid fa-caret-right"></i>
            </a>
          </div>
        </section>

        <section className="related-section">
          <h2 className="section-title">
            <i className="fa-solid fa-arrow-right-arrow-left red-icon"></i>
            Related HR processes
          </h2>
          <div className="process-grid">
            {related.map(r => (
              <div className="process-card" key={r.Id}>
                <div className="icon-box">
                  <img src={require('../assets/related.png')} />
                </div>
                <div className="card-content">
                  <h3>{r.Title}</h3>
                  <a href="#" className="red-link">
                    Open domain <i className="fa-solid fa-caret-right"></i>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="ask-hr-banner">
          <div className="banner-left">
            <div className="banner-icon"><img src={require('../assets/msg.png')} /></div>
            <div className="banner-content">
              <h2>Ask HR about {title}</h2>
              <p>Have a question this domain does not answer? Raise it through the People Service Portal.</p>
            </div>
          </div>
          <a href="#" className="portal-button">
            Open the People Service Portal
            <i className="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
        </section>

        <section className="bottom-grid">
          <div className="bottom-card">
            <div className="icon-box"> <svg className="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="12" r="9"></circle>
              <path d="M9.6 9a2.5 2.5 0 0 1 4.8 1c0 1.7-2.4 2-2.4 3.5"></path>
              <circle cx="12" cy="17" r=".6" fill="currentColor"></circle>
            </svg></div>
            <div className="bottom-content">
              <h3>FAQs and Knowledge Base</h3>
              <p>Quick answers for this area of HR.</p>
              <a href="#" className="bottom-link">Go to FAQs <i className="fa-solid fa-caret-right"></i></a>
            </div>
          </div>
          <div className="bottom-card">
            <div className="icon-box"><svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 5h14v12H8l-3 3z"></path><path d="M9 9h6M9 12h4"></path></svg></div>
            <div className="bottom-content">
              <h3>Ask HR</h3>
              <p>Raise a query through the People Service Portal.</p>
              <a href="#" className="bottom-link">Ask HR <i className="fa-solid fa-caret-right"></i></a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default NrsHrDomains;