import * as React from 'react';
import { HrService, IPolicyDoc } from '../../nrsHrDomains/components/HrService';
import { INrsHrDomainSubpageProps } from './INrsHrDomainSubpageProps';

require('../assets/style.css');

const FAQ_URL = 'https://firsgovng.sharepoint.com/sites/HRDigitalHub/SitePages/FAQsandKnowledgeBase.aspx';
const ASK_HR_URL = 'https://firsgovng.sharepoint.com/sites/HRDigitalHub/SitePages/AskHR.aspx';

const BADGE: { [k: string]: string } = {
  Procedures: 'Procedure', Forms: 'Form', 'Guides and checklists': 'Guide'
};
const stripExt = (n: string): string => n.replace(/\.[^/.]+$/, '');
const extOf = (n: string): string => (n.split('.').pop() || '').toUpperCase();
const downloadUrl = (site: string, fileRef: string): string =>
  `${site}/_layouts/15/download.aspx?SourceUrl=${encodeURIComponent(fileRef)}`;
const fmt = (d?: string): string =>
  d ? new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }) : '—';

const DlIcon = (): JSX.Element => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M12 3v12m0 0l-4.5-4.5M12 15l4.5-4.5M4 20h16" />
  </svg>
);

const NrsHrDomainSubpage: React.FC<INrsHrDomainSubpageProps> = ({ service, siteUrl, homeUrl, domainPageUrl }) => {
  const policyId = parseInt(new URLSearchParams(window.location.search).get('policyId') || '0', 10);

  const [policy, setPolicy] = React.useState<IPolicyDoc | undefined>();
  const [siblings, setSiblings] = React.useState<IPolicyDoc[]>([]);
  const [domainLink, setDomainLink] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    if (!policyId) { setLoading(false); return; }
    let cancelled = false;

    service.getPolicy(policyId)
      .then(p => {
        if (cancelled) return;
        setPolicy(p);

        const domainId = p.HRDomain ? p.HRDomain.Id : 0;

        // "Domain Link" column from the "HR Domain Hub" list (failure is non-fatal: breadcrumb falls back)
        const linkPromise = domainId
          ? service.getDomainLink(domainId)
            .then(u => { if (!cancelled) setDomainLink(u); })
            .catch(() => { /* ignore, fall back to home link */ })
          : Promise.resolve();

        const docsPromise = service.getDocs(domainId).then(all => {
          if (!cancelled) setSiblings(all.filter(d => d.Id !== p.Id));
        });

        return Promise.all([linkPromise, docsPromise]);
      })
      .catch(e => { if (!cancelled) setError(e.message); })
      .then(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, [service, policyId]);

  if (!policyId) return <div>No policy selected.</div>;
  if (loading) return <p>Loading…</p>;
  if (error) return <div role="alert">Error: {error}</div>;
  if (!policy) return <div>Policy not found.</div>;

  const title = policy.Title || stripExt(policy.FileLeafRef);
  const domain = policy.HRDomain ? policy.HRDomain.Title : '';

  // Breadcrumb target: Domain Link from the HR Domain Hub list, else the web part prop, else home
  const domainHref = domainLink || domainPageUrl || homeUrl || siteUrl;

  const resources = siblings.filter(d => d.PolicyType !== 'Policies' && d.PolicyType !== 'Procedures');
  const procedures = siblings.filter(d => d.PolicyType === 'Procedures').slice(0, 1);
  const ext = extOf(policy.FileLeafRef);

  return (
    <div id="nrsHrDomainssubpage">
      <section className="nrsHrDomains">
        <div className="nrsHomePage">
          <div className="hr-red-shapes"></div>
          <div className="hr-hero-copy"><h1 className="hr-title">HR Policies and Procedures</h1></div>
          <div className="hr-team-photo" role="img" aria-label="Human Capital Management Group team"></div>
        </div>
      </section>

      <div className="page">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <a href={homeUrl || siteUrl} data-interception="off">Home</a><span className="sep">/</span>
          <a href={domainHref} data-interception="off">{domain}</a><span className="sep">/</span>
          <span aria-current="page">{title}</span>
        </nav>

        <h2 className="title">{title}</h2>
        <span className="chip">{domain}</span>
        <div className="rule"></div>

        {policy.PolicyOverview && (
          <div className="lead">
            {policy.PolicyOverview}
          </div>
        )}

        <div className="layout">
          <div className="main">
            <section>
              <h3 className="section-title">Download</h3>
              <div className="downloads">
                <a href={downloadUrl(siteUrl, policy.FileRef)} className="dl primary">
                  <span className="icon"><DlIcon /></span>
                  <span>
                    <span className="name" style={{ display: 'block' }}>Policy</span>
                    <span className="type">{ext}</span>
                  </span>
                </a>

                {procedures.map(p => (
                  <a key={p.Id} href={downloadUrl(siteUrl, p.FileRef)} className="dl">
                    <span className="icon"><DlIcon /></span>
                    <span>
                      <span className="name" style={{ display: 'block' }}>Procedure</span>
                      <span className="type">{extOf(p.FileLeafRef)}</span>
                    </span>
                  </a>
                ))}
              </div>
            </section>

            {resources.length > 0 && (
              <section>
                <h3 className="section-title">Resources</h3>
                <div className="list">
                  {resources.map(r => (
                    <a key={r.Id} href={downloadUrl(siteUrl, r.FileRef)} className="row">
                      <svg className="doc" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 2h9l5 5v15H6z" /><path d="M9 12h8M9 16h8M9 8h3" />
                      </svg>
                      <span className="label">{r.Title || stripExt(r.FileLeafRef)}</span>
                      <span className="tag">{BADGE[r.PolicyType] || r.PolicyType}</span>
                      <DlIcon />
                    </a>
                  ))}
                </div>
              </section>
            )}

            <section>
              <h3 className="section-title">Need help</h3>
              <div className="hr-container" style={{ marginTop: '0' }}>

                {/* Cards are <div>s with a single inner link: nested <a> tags are invalid HTML */}
                <div className="hr-card">
                  <div className="hr-icon">
                    <svg viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="9"></circle>
                      <path d="M9.5 9a2.5 2.5 0 0 1 5 0c0 2-2.5 2-2.5 4"></path>
                      <circle cx="12" cy="16.5" r=".5" fill="currentColor"></circle>
                    </svg>
                  </div>

                  <div className="hr-content">
                    <h3>FAQs and Knowledge Base</h3>
                    <p>Quick answers for this area of HR.</p>
                    <a href={FAQ_URL} data-interception="off">
                      Go to FAQs <span>›</span>
                    </a>
                  </div>
                </div>

                <div className="hr-card">
                  <div className="hr-icon">
                    <svg viewBox="0 0 24 24">
                      <path d="M5 4.5h14v12H9l-4 3v-15z"></path>
                      <path d="M9 9h6M9 12h4"></path>
                    </svg>
                  </div>

                  <div className="hr-content">
                    <h3>Ask HR</h3>
                    <p>Raise a query through the People Service Portal.</p>
                    <a href={ASK_HR_URL} data-interception="off">
                      Ask HR <span>›</span>
                    </a>
                  </div>
                </div>

              </div>
            </section>
          </div>

          <aside className="control" aria-label="Document control">
            <h2>Document control</h2>
            <dl>
              <div className="item"><dt>Reference</dt><dd>{policy.Reference || '—'}</dd></div>
              <div className="item"><dt>HR domain</dt><dd>{domain}</dd></div>
              <div className="item"><dt>Document type</dt><dd>{policy.PolicyType}</dd></div>
              <div className="item"><dt>Version</dt><dd>{policy.PolicyVersion || '—'}</dd></div>
              <div className="item"><dt>Approval date</dt><dd>{fmt(policy.ApprovalDate)}</dd></div>
              <div className="item"><dt>Effective date</dt><dd>{fmt(policy.EffectiveDate)}</dd></div>
              <div className="item"><dt>Next review</dt><dd>{fmt(policy.NextReview)}</dd></div>
              <div className="item"><dt>Owner</dt><dd>{policy.DocOwner || '—'}</dd></div>
            </dl>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default NrsHrDomainSubpage;