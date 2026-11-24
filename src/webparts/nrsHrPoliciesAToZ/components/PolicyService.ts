import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface IPolicy {
  id: number;
  title: string;
  domain: string;
  type: string;
  url: string;
}

export interface IDomain {
  id: number;
  title: string;
}

export interface IUserAccess {
  isOwner: boolean;            // member of the Site Owners group (or site collection admin)
  allowedDomains: string[];    // domain titles the user's groups map to
}

const POLICY_LIBRARY = 'HR Policies';
const DOMAIN_LIST = 'HR Domain Hub';
const DOMAIN_FIELD = 'HRDomain';     // lookup internal name
const TYPE_FIELD = 'PolicyType';     // choice internal name
const DEFAULT_POLICY_TYPE = 'Policies'; // exact choice value in the PolicyType column

// Group naming convention: a group maps to a domain when its name equals the domain title.
// If your groups look like "HR - Recruitment", set the prefix/suffix here so they get stripped.
const GROUP_NAME_PREFIX: string = '';
const GROUP_NAME_SUFFIX: string = '';

const normalize = (s: string): string => (s || '').trim().toLowerCase().replace(/\s+/g, ' ');

const groupToDomainKey = (groupTitle: string): string => {
  let t = (groupTitle || '').trim();
  if (GROUP_NAME_PREFIX && t.toLowerCase().indexOf(GROUP_NAME_PREFIX.toLowerCase()) === 0) {
    t = t.substring(GROUP_NAME_PREFIX.length);
  }
  if (GROUP_NAME_SUFFIX && t.toLowerCase().slice(-GROUP_NAME_SUFFIX.length) === GROUP_NAME_SUFFIX.toLowerCase()) {
    t = t.substring(0, t.length - GROUP_NAME_SUFFIX.length);
  }
  return normalize(t);
};

export class PolicyService {
  constructor(private context: WebPartContext) {}

  private async getAll(url: string): Promise<any[]> {
    let results: any[] = [];
    let next: string | undefined = url;

    while (next) {
      const res: SPHttpClientResponse = await this.context.spHttpClient.get(
        next,
        SPHttpClient.configurations.v1
      );
      if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`);
      }
      const json: any = await res.json();
      results = results.concat(json.value);
      next = json['odata.nextLink'] || json['@odata.nextLink'];
    }
    return results;
  }

  public async getDomains(): Promise<IDomain[]> {
    const base = this.context.pageContext.web.absoluteUrl;
    const url =
      `${base}/_api/web/lists/getbytitle('${DOMAIN_LIST}')/items` +
      `?$select=Id,Title&$orderBy=Title&$top=500`;

    const items = await this.getAll(url);
    return items.map(i => ({ id: i.Id, title: i.Title }));
  }

  private async getJson(url: string): Promise<any> {
    const res: SPHttpClientResponse = await this.context.spHttpClient.get(
      url,
      SPHttpClient.configurations.v1
    );
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    return res.json();
  }

  /**
   * Works out what the current user may see:
   *  - Site Owners group member (or site collection admin) => everything
   *  - otherwise => only domains whose title matches one of the user's groups
   */
  public async getUserAccess(domains: IDomain[]): Promise<IUserAccess> {
    const base = this.context.pageContext.web.absoluteUrl;

    const [groupsJson, ownerGroup, me] = await Promise.all([
      this.getJson(`${base}/_api/web/currentuser/groups?$select=Id,Title`),
      this.getJson(`${base}/_api/web/associatedownergroup?$select=Id,Title`),
      this.getJson(`${base}/_api/web/currentuser?$select=IsSiteAdmin`)
    ]);

    const groups: { Id: number; Title: string }[] = groupsJson.value || [];

    const isOwner =
      !!me.IsSiteAdmin || groups.some(g => g.Id === ownerGroup.Id);

    if (isOwner) {
      return { isOwner: true, allowedDomains: domains.map(d => d.title) };
    }

    const groupKeys = groups.map(g => groupToDomainKey(g.Title));
    const allowedDomains = domains
      .filter(d => groupKeys.indexOf(normalize(d.title)) > -1)
      .map(d => d.title);

    return { isOwner: false, allowedDomains };
  }

  /**
   * Returns only files whose PolicyType equals `type` (default: "Policies").
   */
  public async getPolicies(type: string = DEFAULT_POLICY_TYPE): Promise<IPolicy[]> {
    const base = this.context.pageContext.web.absoluteUrl;
    const safeType = type.replace(/'/g, "''"); // escape apostrophes for OData

    const url =
      `${base}/_api/web/lists/getbytitle('${POLICY_LIBRARY}')/items` +
      `?$select=Id,Title,FileLeafRef,FileRef,FSObjType,${TYPE_FIELD},` +
      `${DOMAIN_FIELD}/Id,${DOMAIN_FIELD}/Title` +
      `&$expand=${DOMAIN_FIELD}` +
      `&$filter=FSObjType eq 0 and ${TYPE_FIELD} eq '${safeType}'` +
      `&$top=500`;

    const items = await this.getAll(url);

    return items.map(i => ({
      id: i.Id,
      title: (i.Title || i.FileLeafRef || '').trim(),
      domain: i[DOMAIN_FIELD] ? i[DOMAIN_FIELD].Title : '',
      type: i[TYPE_FIELD] || '',
      url: i.FileRef
    }));
  }
}