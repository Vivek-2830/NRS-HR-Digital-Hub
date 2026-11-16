import { HrService } from '../../nrsHrDomains/components/HrService';

export interface INrsHrDomainSubpageProps {
  // description: string;
  // isDarkTheme: boolean;
  // environmentMessage: string;
  // hasTeamsContext: boolean;
  // userDisplayName: string;
   service: HrService;
  siteUrl: string;
  homeUrl?: string;
  domainPageUrl?: string;
}
