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

const POLICY_LIBRARY = 'HR Policies';
const DOMAIN_LIST = 'HR Domain Hub';
const DOMAIN_FIELD = 'HRDomain';     // lookup internal name
const TYPE_FIELD = 'PolicyType';     // choice internal name

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

  public async getPolicies(): Promise<IPolicy[]> {
    const base = this.context.pageContext.web.absoluteUrl;
    const url =
      `${base}/_api/web/lists/getbytitle('${POLICY_LIBRARY}')/items` +
      `?$select=Id,Title,FileLeafRef,FileRef,FSObjType,${TYPE_FIELD},` +
      `${DOMAIN_FIELD}/Id,${DOMAIN_FIELD}/Title` +
      `&$expand=${DOMAIN_FIELD}&$filter=FSObjType eq 0&$top=500`;

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