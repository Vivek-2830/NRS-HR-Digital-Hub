import * as React from 'react';
import { HrService, IPolicyDoc } from '../../nrsHrDomains/components/HrService';
import { INrsHrDomainSubpageProps } from './INrsHrDomainSubpageProps';

require('../assets/style.css');

const BADGE: { [k: string]: string } = {
  Procedures: 'Procedure', Forms: 'Form', 'Guides and checklists': 'Guide'
};
const stripExt = (n: string): string => n.replace(/\.[^/.]+$/, '');
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
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    if (!policyId) { setLoading(false); return; }
    let cancelled = false;

    service.getPolicy(policyId)
      .then(p => {
        if (cancelled) return;
        setPolicy(p);
        return service.getDocs(p.HRDomain ? p.HRDomain.Id : 0).then(all => {
          if (!cancelled) setSiblings(all.filter(d => d.Id !== p.Id));
        });
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
  const resources = siblings.filter(d => d.PolicyType !== 'Policies');
  const relatedPolicies = siblings.filter(d => d.PolicyType === 'Policies');
  const ext = (policy.FileLeafRef.split('.').pop() || '').toUpperCase();

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
          <a href={homeUrl || siteUrl}>Home</a><span className="sep">/</span>
          <a href={`${domainPageUrl || '#'}`}>{domain}</a><span className="sep">/</span>
          <span aria-current="page">{title}</span>
        </nav>

        <h2 className="title">{title}</h2>
        <span className="chip">{domain}</span>
        <div className="rule"></div>

        {policy.PolicyOverview && (
          <div className="lead" 
          // dangerouslySetInnerHTML={{ __html: policy.Overview }} 
          >
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

            {relatedPolicies.length > 0 && (
              <section>
                <h3 className="section-title">Related policies</h3>
                <div className="related">
                  {relatedPolicies.map(r => (
                    <a key={r.Id} href={`${window.location.pathname}?policyId=${r.Id}`} data-interception="off">
                      {r.Title || stripExt(r.FileLeafRef)}
                    </a>
                  ))}
                </div>
              </section>
            )}

            <section>
              <h3 className="section-title">Need help</h3>
              <div className="help">
                <a href="https://firsgovng.sharepoint.com/sites/HRDigitalHub/SitePages/FAQsandKnowledgeBase.aspx">
                  <span className="name" style={{ display: 'block' }}>FAQs and Knowledge Base</span>
                  <span className="desc" style={{ display: 'block' }}>Quick answers on this policy.</span>
                </a>
                <a href="https://firsgovng.sharepoint.com/sites/HRDigitalHub/SitePages/AskHR.aspx">
                  <span className="name" style={{ display: 'block' }}>Ask HR</span>
                  <span className="desc" style={{ display: 'block' }}>Raise a query through the People Service Portal.</span>
                </a>
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