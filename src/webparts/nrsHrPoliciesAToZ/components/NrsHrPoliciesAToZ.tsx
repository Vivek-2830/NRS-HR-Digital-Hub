import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { INrsHrPoliciesAToZProps } from './INrsHrPoliciesAToZProps';
import { PolicyService, IPolicy, IDomain } from './PolicyService';

require('../assets/style.css');

const NrsHrPoliciesAToZ: React.FC<INrsHrPoliciesAToZProps> = (props) => {
  const [policies, setPolicies] = useState<IPolicy[]>([]);
  const [domains, setDomains] = useState<IDomain[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const [domainFilter, setDomainFilter] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  const [sortAsc, setSortAsc] = useState<boolean>(true);
const [collapsed, setCollapsed] = useState<{ [letter: string]: boolean }>({});

  // ---- Load data ----
  useEffect(() => {
    const service = new PolicyService(props.context);

    Promise.all([service.getDomains(), service.getPolicies()])
      .then(([d, p]) => {
  setDomains(d);
  setPolicies(p);
  setLoading(false);
})
      .catch(err => {
        console.error(err);
        setError('Unable to load policies. ' + (err.message || ''));
        setLoading(false);
      });
  }, []);

  // ---- Helpers ----
  const getLetter = (title: string): string => {
    const c = (title || '').charAt(0).toUpperCase();
    return /[A-Z]/.test(c) ? c : '#';
  };

  const isFiltering = domainFilter !== 'all' || search.trim() !== '';

  // ---- Filter + sort + group ----
  const groups = useMemo(() => {
    const term = search.trim().toLowerCase();

    const filtered = policies.filter(p => {
      const matchDomain = domainFilter === 'all' || p.domain === domainFilter;
      const matchSearch =
        !term ||
        p.title.toLowerCase().indexOf(term) > -1 ||
        p.domain.toLowerCase().indexOf(term) > -1 ||
        p.type.toLowerCase().indexOf(term) > -1;
      return matchDomain && matchSearch;
    });

    filtered.sort((a, b) =>
      sortAsc
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    );

    const map: { [letter: string]: IPolicy[] } = {};
    filtered.forEach(p => {
      const l = getLetter(p.title);
      (map[l] = map[l] || []).push(p);
    });

    const letters = Object.keys(map).sort((a, b) =>
      sortAsc ? a.localeCompare(b) : b.localeCompare(a)
    );

    return letters.map(l => ({ letter: l, items: map[l] }));
  }, [policies, domainFilter, search, sortAsc]);

 const toggleLetter = (letter: string): void => {
  setCollapsed(prev => ({ ...prev, [letter]: !prev[letter] }));
};
  // ---- Render ----
  return (
    <div style={{backgroundColor:'#faf9f8'}}>
      <div style={{ position: 'relative' }}>
    <section className="nrsHrPoliciesAToZ">
  <div className="nrsHomePage">
    <div className="hr-red-shapes"></div>

    <div className="hr-hero-copy">
      <h1 className="hr-title">{props.bannerTitle}</h1>
    </div>

    <div
      className="hr-team-photo"
      role="img"
      aria-label={props.bannerTitle}
      style={
        props.bannerImageUrl
          ? { backgroundImage: `url("${props.bannerImageUrl}")` }
          : undefined
      }
    ></div>
  </div>
</section>
      </div>

      <div className="page-container" style={{backgroundColor:'#faf9f8'}}>
<div className="breadcrumb">
  <a href={props.breadcrumbHomeUrl || '/'}>{props.breadcrumbHomeText}</a>
  <span>/</span>
  <span>{props.breadcrumbCurrentText}</span>
</div>

<header className="page-header">
  <h1>{props.pageTitle}</h1>
  <p>{props.pageDescription}</p>
  <div className="red-line"></div>
</header>

        <div className="policy-card">
          <div className="toolbar">
            <div className="filter-section">
              <span className="filter-icon">&#9776;</span>
              <select
                id="domainFilter"
                value={domainFilter}
                onChange={e => setDomainFilter(e.target.value)}
              >
                <option value="all">All HR domains</option>
                {domains.map(d => (
                  <option key={d.id} value={d.title}>
                    {d.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="search-box">
              <span className="search-icon">&#9906;</span>
              <input
                type="text"
                id="searchInput"
                placeholder="Search this list"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="table-wrapper">
            {loading && <div className="no-results">Loading policies...</div>}
            {error && <div className="no-results">{error}</div>}

            {!loading && !error && (
              <table className="policy-table">
                <thead>
                  <tr>
                    <th
                      className="policy-column"
                      style={{ cursor: 'pointer' }}
                      onClick={() => setSortAsc(!sortAsc)}
                    >
                      Policy
                      <span className="sort-icon">
                        {sortAsc ? '\u25B2' : '\u25BC'}
                      </span>
                    </th>
                    <th>HR domain</th>
                    <th>Type</th>
                  </tr>
                </thead>

                <tbody id="policyTableBody">
                  {groups.map(g => {
                   const open = isFiltering || !collapsed[g.letter];
                    return (
                      <React.Fragment key={g.letter}>
                        <tr className="alphabet-row" data-letter={g.letter}>
                          <td colSpan={3}>
                            <button
                              className="toggle-btn"
                              aria-expanded={open}
                              onClick={() => toggleLetter(g.letter)}
                            >
                              <span className="arrow">
                                {open ? '\u25BE' : '\u25B8'}
                              </span>
                              {g.letter}
                            </button>
                          </td>
                        </tr>

                        {open &&
                          g.items.map(p => (
                            <tr
                              key={p.id}
                              className="policy-row"
                              data-letter={g.letter}
                              data-domain={p.domain}
                            >
                              <td>
                                <a
                                  href={p.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  data-interception="off"
                                >
                                  {p.title}
                                </a>
                              </td>
                              <td>{p.domain}</td>
                              <td>{p.type}</td>
                            </tr>
                          ))}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            )}

            {!loading && !error && groups.length === 0 && (
              <div id="noResults" className="no-results">
                No matching policies found.
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="hr-container">
        <div className="cards-container">
          <a href="#" className="hr-card">
            <div className="icon-box">
             <img src={require('../assets/Faqicon1.png')} />
            </div>
            <div className="card-content">
              <h3 className="card-title">FAQs and Knowledge Base</h3>
              <p className="card-description">Quick answers for this area of HR.</p>
              <span className="card-link">
                Go to FAQs <span className="arrow">&#9656;</span>
              </span>
            </div>
          </a>

          <a href="#" className="hr-card">
            <div className="icon-box">
             <img src={require('../assets/Faqicon2.png')} />
            </div>
            <div className="card-content">
              <h3 className="card-title">Ask HR</h3>
              <p className="card-description">
                Raise a query through the People Service Portal.
              </p>
              <span className="card-link">
                Ask HR <span className="arrow">&#9656;</span>
              </span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default NrsHrPoliciesAToZ;