import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'NrsHomePageWebPartStrings';
import NrsHomePage from './components/NrsHomePage';
import { INrsHomePageProps } from './components/INrsHomePageProps';
import { sp } from '@pnp/sp/presets/all';
import {
  PropertyFieldFilePicker, IFilePickerResult
} from "@pnp/spfx-property-controls/lib/PropertyFieldFilePicker";

import {
  SPHttpClient,
  SPHttpClientResponse
} from "@microsoft/sp-http";

export interface INrsHomePageWebPartProps {
  description: string;
  HRPolicieTitle: string;
  HRPolicieSource: string;
  HRPolicieDescription: string;
  filePickerResult: IFilePickerResult;
  bannerImageUrl: string;
}

export default class NrsHomePageWebPart extends BaseClientSideWebPart<INrsHomePageWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';

  protected onInit(): Promise<void> {
    this._environmentMessage = this._getEnvironmentMessage();

    sp.setup({
      spfxContext: this.context
    });

    return super.onInit();
  }

  public render(): void {
    const element: React.ReactElement<INrsHomePageProps> = React.createElement(
      NrsHomePage,
      {
        description: this.properties.description,
        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName,
        context: this.context,
        HRPolicieTitle: this.properties.HRPolicieTitle,
        HRPolicieSource: this.properties.HRPolicieSource,
        HRPolicieDescription: this.properties.HRPolicieDescription,
        filePickerResult: this.properties.filePickerResult,
        bannerImageUrl: this.properties.bannerImageUrl
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

  private async _saveBannerImage(
  result: IFilePickerResult
): Promise<void> {

  try {

    let imageUrl: string;

    // Case 1: Image already exists in SharePoint
    if (result.fileAbsoluteUrl) {

      imageUrl = result.fileAbsoluteUrl;

    }

    // Case 2: Image uploaded from local computer
    else {

      const fileContent: File =
        await result.downloadFileContent();

      const fileName = fileContent.name;

      const webUrl =
        this.context.pageContext.web.absoluteUrl;

      const serverRelativeUrl =
        this.context.pageContext.web.serverRelativeUrl;

      const siteAssetsUrl =
        (serverRelativeUrl === "/"
          ? ""
          : serverRelativeUrl) + "/SiteAssets";

      const safeFileName =
        encodeURIComponent(fileName.replace(/'/g, "''"));

      const uploadApi =
        `${webUrl}/_api/web/GetFolderByServerRelativeUrl('${siteAssetsUrl}')/Files/add(url='${safeFileName}',overwrite=true)`;

      const response: SPHttpClientResponse =
        await this.context.spHttpClient.post(
          uploadApi,
          SPHttpClient.configurations.v1,
          {
            headers: {
              "Accept": "application/json;odata=nometadata",
              "Content-Type": "application/octet-stream"
            },
            body: fileContent
          }
        );

      if (!response.ok) {
        throw new Error(
          `Image upload failed: ${response.status} ${response.statusText}`
        );
      }

      const uploadedFile = await response.json();

      const uploadedServerRelativeUrl =
        uploadedFile.ServerRelativeUrl ||
        uploadedFile.d.ServerRelativeUrl;

      const origin = webUrl.split("/").slice(0, 3).join("/");

      imageUrl = origin + uploadedServerRelativeUrl;

    }

    // Save image URL in web part properties
    const oldValue = this.properties.bannerImageUrl;

    this.properties.bannerImageUrl = imageUrl;

    this.onPropertyPaneFieldChanged(
      "bannerImageUrl",
      oldValue,
      imageUrl
    );

    console.log("Final Banner Image URL:", imageUrl);

    // Refresh web part
    this.render();

  } catch (error) {

    console.error("Banner Image Upload Error:", error);

  }

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
                PropertyPaneTextField('HRPolicieTitle', {
                  label: 'HR Policies Title'
                }),
                PropertyPaneTextField('HRPolicieSource', {
                  label: 'HR Policies Source'
                }),
                PropertyPaneTextField('HRPolicieDescription', {
                  label: 'HR Policies Description'
                }),
                PropertyFieldFilePicker("filePickerResult", {
                context: this.context,

                filePickerResult: undefined,

                onPropertyChange:
                  this.onPropertyPaneFieldChanged.bind(this),

                properties: this.properties,

                onSave: (result: IFilePickerResult) => {
                  console.log("Selected Image:", result);

                  this._saveBannerImage(result);
                },

                buttonLabel: "Upload Image",
                label: "Our Image",
                key: "BannerImagePicker",

                accepts: [
                  ".jpg",
                  ".jpeg",
                  ".png",
                  ".gif"
                ]
              })
              ]
            }
          ]
        }
      ]
    };
  }
}
