import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'NrsHrPoliciesAToZWebPartStrings';
import NrsHrPoliciesAToZ from './components/NrsHrPoliciesAToZ';
import { INrsHrPoliciesAToZProps } from './components/INrsHrPoliciesAToZProps';

export interface INrsHrPoliciesAToZWebPartProps {
  description: string;
  bannerImageUrl: string;
  bannerTitle: string;
  breadcrumbHomeText: string;
  breadcrumbHomeUrl: string;
  breadcrumbCurrentText: string;
  pageTitle: string;
  pageDescription: string;
}

export default class NrsHrPoliciesAToZWebPart extends BaseClientSideWebPart<INrsHrPoliciesAToZWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';

  protected onInit(): Promise<void> {
    this._environmentMessage = this._getEnvironmentMessage();

    return super.onInit();
  }

  public render(): void {
    const element: React.ReactElement<INrsHrPoliciesAToZProps> = React.createElement(
      NrsHrPoliciesAToZ,
      {
        description: this.properties.description,
        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName,
        context: this.context,
        
        bannerImageUrl: this.properties.bannerImageUrl,
      bannerTitle: this.properties.bannerTitle,
      breadcrumbHomeText: this.properties.breadcrumbHomeText,
      breadcrumbHomeUrl: this.properties.breadcrumbHomeUrl,
      breadcrumbCurrentText: this.properties.breadcrumbCurrentText,
      pageTitle: this.properties.pageTitle,
      pageDescription: this.properties.pageDescription
      }
    );

    ReactDom.render(element, this.domElement);
  }

  private _getEnvironmentMessage(): string {
    if (!!this.context.sdks.microsoftTeams) { // running in Teams
      return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
    }

    return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment;
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    const {
      semanticColors
    } = currentTheme;
    this.domElement.style.setProperty('--bodyText', semanticColors.bodyText);
    this.domElement.style.setProperty('--link', semanticColors.link);
    this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered);

  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  // protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
  //   return {
  //     pages: [
  //       {
  //         header: {
  //           description: strings.PropertyPaneDescription
  //         },
  //         groups: [
  //           {
  //             groupName: strings.BasicGroupName,
  //             groupFields: [
  //               PropertyPaneTextField('description', {
  //                 label: strings.DescriptionFieldLabel
  //               })
  //             ]
  //           }
  //         ]
  //       }
  //     ]
  //   };
  // }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
  return {
    pages: [
      {
        header: { description: 'HR Policies A to Z settings' },
        groups: [
          {
            groupName: 'Banner',
            groupFields: [
              PropertyPaneTextField('bannerImageUrl', {
                label: 'Banner image URL',
                description: 'Paste the full or site-relative URL of the image'
              }),
              PropertyPaneTextField('bannerTitle', {
                label: 'Banner title'
              })
            ]
          },
          {
            groupName: 'Breadcrumb',
            groupFields: [
              PropertyPaneTextField('breadcrumbHomeText', {
                label: 'Home link text'
              }),
              PropertyPaneTextField('breadcrumbHomeUrl', {
                label: 'Home link URL'
              }),
              PropertyPaneTextField('breadcrumbCurrentText', {
                label: 'Current page text'
              })
            ]
          },
          {
            groupName: 'Page header',
            groupFields: [
              PropertyPaneTextField('pageTitle', {
                label: 'Title'
              }),
              PropertyPaneTextField('pageDescription', {
                label: 'Description',
                multiline: true,
                rows: 4
              })
            ]
          }
        ]
      }
    ]
  };
}
}
