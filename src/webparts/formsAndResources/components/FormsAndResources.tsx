import * as React from 'react';
import { sp } from '@pnp/sp/presets/all';
import { IFormsAndResourcesProps } from './IFormsAndResourcesProps';

require('../assets/style.css');

interface IResourceItem {
  id: number;
  name: string;        // value of the "Name" column (falls back to file name)
  fileName: string;    // actual file name incl. extension
  ext: string;         // PDF, DOCX, PNG ...
  url: string;         // open in browser
  downloadUrl: string; // force download
  domains: string[];   // HR Domain (lookup)
  types: string[];     // Type (choice)
}

interface IFormsAndResourcesState {
  items: IResourceItem[];
  loading: boolean;
  error: string;
  domainFilter: string;
  typeFilter: string;
  search: string;
}

const ALL_DOMAINS = '__all_domains__';
const ALL_TYPES = '__all_types__';

export default class FormsAndResources extends React.Component<IFormsAndResourcesProps,IFormsAndResourcesState> {

  constructor(props: IFormsAndResourcesProps) {
    super(props);
    this.state = {
      items: [],
      loading: true,
      error: '',
      domainFilter: ALL_DOMAINS,
      typeFilter: ALL_TYPES,
      search: ''
    };
  }

  public componentDidMount(): void {
    this.loadItems();
  }

  public componentDidUpdate(prev: IFormsAndResourcesProps): void {
    if (
      prev.listTitle !== this.props.listTitle ||
      prev.hrDomainField !== this.props.hrDomainField ||
      prev.typeField !== this.props.typeField ||
      prev.nameField !== this.props.nameField
    ) {
      this.loadItems();
    }
  }

  // ---------- helpers ----------

  private toArray(value: any, prop?: string): string[] {
    if (value === null || value === undefined || value === '') { return []; }
    const arr = Object.prototype.toString.call(value) === '[object Array]' ? value : [value];
    const out: string[] = [];
    for (let i = 0; i < arr.length; i++) {
      const v = prop && arr[i] ? arr[i][prop] : arr[i];
      if (v) { out.push(String(v)); }
    }
    return out;
  }

  private getExt(fileName: string): string {
    const idx = fileName.lastIndexOf('.');
    return idx > -1 ? fileName.substring(idx + 1).toUpperCase() : '';
  }

  private unique(values: string[]): string[] {
    const seen: { [k: string]: boolean } = {};
    const out: string[] = [];
    for (let i = 0; i < values.length; i++) {
      if (!seen[values[i]]) { seen[values[i]] = true; out.push(values[i]); }
    }
    return out.sort((a, b) => a.localeCompare(b));
  }

  // ---------- data ----------

  private async loadItems(): Promise<void> {
    const { listTitle, hrDomainField, typeField, nameField, siteUrl } = this.props;

    this.setState({ loading: true, error: '' });

    try {
      const select: string[] = ['Id', 'FileLeafRef', 'FileRef', 'FSObjType', typeField, hrDomainField + '/Id', hrDomainField + '/Title'];
      if (nameField && nameField !== 'FileLeafRef') { select.push(nameField); }

      // getAll() pages through the whole library, so every file type is returned
      const rows: any[] = await sp.web.lists
        .getByTitle(listTitle)
        .items
        .select(...select)
        .expand(hrDomainField)
        .getAll(5000);

      const items: IResourceItem[] = [];

      for (let i = 0; i < rows.length; i++) {
        const r = rows[i];
        if (r.FSObjType === 1) { continue; } // skip folders, keep every file type

        const fileName: string = r.FileLeafRef || '';
        const ext = this.getExt(fileName);
        const nameValue: string = nameField && nameField !== 'FileLeafRef' ? r[nameField] : '';
        const baseName = ext ? fileName.substring(0, fileName.length - ext.length - 1) : fileName;

        items.push({
          id: r.Id,
          name: nameValue || baseName,
          fileName: fileName,
          ext: ext,
          url: r.FileRef,
          downloadUrl: siteUrl + '/_layouts/15/download.aspx?SourceUrl=' + encodeURIComponent(r.FileRef),
          domains: this.toArray(r[hrDomainField], 'Title'),
          types: this.toArray(r[typeField])
        });
      }

      items.sort((a, b) => a.name.localeCompare(b.name));
      this.setState({ items: items, loading: false });
    } catch (e) {
      const msg = e && (e as any).message ? (e as any).message : String(e);
      this.setState({
        loading: false,
        error: 'Unable to load "' + listTitle + '". Check the library name and column internal names in the web part settings. (' + msg + ')'
      });
    }
  }

  // ---------- render ----------

  private getFilteredItems(): IResourceItem[] {
    const { items, domainFilter, typeFilter, search } = this.state;
    const q = search.trim().toLowerCase();

    return items.filter((item) => {
      if (domainFilter !== ALL_DOMAINS && item.domains.indexOf(domainFilter) === -1) { return false; }
      if (typeFilter !== ALL_TYPES && item.types.indexOf(typeFilter) === -1) { return false; }
      if (q) {
        const haystack = (item.name + ' ' + item.fileName + ' ' + item.domains.join(' ') + ' ' + item.types.join(' ')).toLowerCase();
        if (haystack.indexOf(q) === -1) { return false; }
      }
      return true;
    });
  }

  public render(): React.ReactElement<IFormsAndResourcesProps> {

    const { items, loading, error, domainFilter, typeFilter, search } = this.state;

    const domainOptions: string[] = [];
    const typeOptions: string[] = [];
    items.forEach((i) => {
      i.domains.forEach((d) => domainOptions.push(d));
      i.types.forEach((t) => typeOptions.push(t));
    });
    const domains = this.unique(domainOptions);
    const types = this.unique(typeOptions);
    const filtered = this.getFilteredItems();

    return (
      <div id="formsandresources">
        <section className="nrsHrDomains">
          <div className="nrsHomePage">
            <div className="hr-red-shapes"></div>
            <div className="hr-hero-copy">
              <h1 className="hr-title">HR Policies and Procedures</h1>
            </div>
            <div className="hr-team-photo" role="img" aria-label="Human Capital Management Group team"></div>
          </div>
        </section>

        
        <div className="container">
          <section className="formsAndResources">
            <div className="breadcrumb">
              <a href={this.props.siteUrl}>Home</a>
              <span>/</span>
              <span>Forms and Resources</span>
            </div>

            <div className="page-header">
              <h1>Forms and Resources</h1>
              <p>
                One place for every HR form, template and checklist.
                Filter by HR domain or type, search the list, and download what you need.
              </p>
              <div className="red-line"></div>
            </div>

            <div className="resource-container">

              <div className="toolbar">

                <div className="filters">
                  <select
                    value={domainFilter}
                    onChange={(e) => this.setState({ domainFilter: e.target.value })}
                  >
                    <option value={ALL_DOMAINS}>All HR domains</option>
                    {domains.map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>

                  <select
                    className="type-filter"
                    value={typeFilter}
                    onChange={(e) => this.setState({ typeFilter: e.target.value })}
                  >
                    <option value={ALL_TYPES}>All types</option>
                    {types.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                <div className="search-box">
                  <span className="search-icon">⌕</span>
                  <input
                    type="text"
                    placeholder="Search this list"
                    value={search}
                    onChange={(e) => this.setState({ search: e.target.value })}
                  />
                </div>

              </div>

              <div className="table-responsive">
                <table>
                  <thead>
                    <tr>
                      <th>Form or resource</th>
                      <th>HR domain</th>
                      <th>Type</th>
                    </tr>
                  </thead>

                  <tbody>
                    {loading && (
                      <tr><td colSpan={3} className="table-message">Loading...</td></tr>
                    )}

                    {!loading && error && (
                      <tr><td colSpan={3} className="table-message table-error">{error}</td></tr>
                    )}

                    {!loading && !error && filtered.length === 0 && (
                      <tr><td colSpan={3} className="table-message">No resources found.</td></tr>
                    )}

                    {!loading && !error && filtered.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <a href={item.url} target="_blank" rel="noopener noreferrer" data-interception="off">
                            {item.name}
                          </a>
                          {item.ext && <span className="file-ext">{item.ext}</span>}
                        </td>
                        <td>{item.domains.join(', ')}</td>
                        <td>
                          <a href={item.downloadUrl} data-interception="off">
                            {item.types.length > 0 ? item.types.join(', ') : 'Download'} <span className="download">↓</span>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>

            <p className='view'>This is a SharePoint document library view. Forms are linked to their policies and can be filtered by domain and type. Downloads are indicative in this prototype.</p>

            <div className="hr-container">

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
                  <a href="#">
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
                  <a href="#">
                    Ask HR <span>›</span>
                  </a>
                </div>
              </div>

            </div>

          </section>
        </div>
        
      </div>

    )
  }
}