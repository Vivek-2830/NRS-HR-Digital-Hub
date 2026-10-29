import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface INrsHrPoliciesAToZProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  context: WebPartContext;

  bannerImageUrl: string;
  bannerTitle: string;
  breadcrumbHomeText: string;
  breadcrumbHomeUrl: string;
  breadcrumbCurrentText: string;
  pageTitle: string;
  pageDescription: string;
}