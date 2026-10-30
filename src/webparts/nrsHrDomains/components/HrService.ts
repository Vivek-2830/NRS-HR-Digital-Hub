import { SPHttpClient } from '@microsoft/sp-http';

export interface IDomain {
  Id: number;
  Title: string;
  Overview?: string;
}

export interface IPolicyDoc {
  Id: number;
  Title: string;
  FileLeafRef: string;
  FileRef: string;
  PolicyType: string;
  HRDomain?: { Id: number; Title: string };
}

export class HrService {
  constructor(
    private http: SPHttpClient,
    private siteUrl: string,
    private hubList = 'HR Domain Hub',
    private library = 'HR Policies'
  ) {}

  private async get<T>(url: string): Promise<T> {
    const res = await this.http.get(url, SPHttpClient.configurations.v1);
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    return (await res.json()).value as T;
  }

  public getDomains(): Promise<IDomain[]> {
    return this.get<IDomain[]>(
      `${this.siteUrl}/_api/web/lists/getbytitle('${this.hubList}')/items` +
      `?$select=Id,Title,Overview&$orderby=Title&$top=500`
    );
  }

  public getDocs(HRDomainId: number): Promise<IPolicyDoc[]> {
    return this.get<IPolicyDoc[]>(
      `${this.siteUrl}/_api/web/lists/getbytitle('${this.library}')/items` +
      `?$select=Id,Title,FileLeafRef,FileRef,PolicyType,HRDomain/Id,HRDomain/Title` +
      `&$expand=HRDomain&$filter=HRDomain/Id eq ${HRDomainId} and FSObjType eq 0` +
      `&$orderby=Title&$top=500`
    );
  }
}