import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'NrsHrDomainSubpageWebPartStrings';
import NrsHrDomainSubpage from './components/NrsHrDomainSubpage';
import { INrsHrDomainSubpageProps } from './components/INrsHrDomainSubpageProps';
import { HrService } from '../nrsHrDomains/components/HrService';

export interface INrsHrDomainSubpageWebPartProps {
  homeUrl: string;
  domainPageUrl: string;
  hubList: string;
  library: string;
}

export default class NrsHrDomainSubpageWebPart extends BaseClientSideWebPart<INrsHrDomainSubpageWebPartProps> {

  public render(): void {
    const siteUrl: string = this.context.pageContext.web.absoluteUrl;

    const service: HrService = new HrService(
      this.context.spHttpClient,
      siteUrl,
      this.properties.hubList || 'HR Domain Hub',
      this.properties.library || 'HR Policies'
    );

    const element: React.ReactElement<INrsHrDomainSubpageProps> = React.createElement(
      NrsHrDomainSubpage,
      {
        service,
        siteUrl,
        homeUrl: this.properties.homeUrl || siteUrl,
        domainPageUrl: this.properties.domainPageUrl || undefined
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('homeUrl', {
                  label: 'Home page URL (breadcrumb)'
                }),
                PropertyPaneTextField('domainPageUrl', {
                  label: 'HR Domains page URL (breadcrumb)'
                }),
                PropertyPaneTextField('hubList', {
                  label: 'Domain hub list title',
                  placeholder: 'HR Domain Hub'
                }),
                PropertyPaneTextField('library', {
                  label: 'Policies library title',
                  placeholder: 'HR Policies'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}