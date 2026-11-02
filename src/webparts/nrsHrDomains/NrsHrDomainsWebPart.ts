import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneDropdown,
  IPropertyPaneDropdownOption
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import NrsHrDomains from './components/NrsHrDomains';
import { HrService } from './components/HrService';

import { INrsHrDomainsProps } from './components/INrsHrDomainsProps';

export interface INrsHrDomainsWebPartProps {
service: HrService;
  categoryId: number;
  siteUrl: string;
}

export default class NrsHrDomainsWebPart extends BaseClientSideWebPart<INrsHrDomainsWebPartProps> {
  private service: HrService;
  private options: IPropertyPaneDropdownOption[] = [];
  private loadingOptions = false;

  protected async onInit(): Promise<void> {
    this.service = new HrService(
      this.context.spHttpClient,
      this.context.pageContext.web.absoluteUrl
    );
  }

  public render(): void {
    const element: React.ReactElement<INrsHrDomainsProps> = React.createElement(NrsHrDomains, {
      service: this.service,
      categoryId: Number(this.properties.categoryId),
      siteUrl: this.context.pageContext.web.absoluteUrl
    });
    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected async onPropertyPaneConfigurationStart(): Promise<void> {
    if (this.options.length || this.loadingOptions) return;
    this.loadingOptions = true;
    this.context.propertyPane.refresh();
    try {
      const domains = await this.service.getDomains();
      this.options = domains.map(d => ({ key: d.Id, text: d.Title }));
    } finally {
      this.loadingOptions = false;
      this.context.propertyPane.refresh();
    }
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: { description: 'HR Domain settings' },
          groups: [
            {
              groupName: 'Data',
              groupFields: [
                PropertyPaneDropdown('categoryId', {
                  label: 'Category (HR Domain Hub)',
                  options: this.options,
                  selectedKey: this.properties.categoryId,
                  disabled: this.loadingOptions
                })
              ]
            }
          ]
        }
      ]
    };
  }
}