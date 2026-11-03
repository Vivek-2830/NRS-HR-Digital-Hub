export interface IFormsAndResourcesProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;

  // Dynamic data settings
  siteUrl: string;
  listTitle: string;       // Document library name
  hrDomainField: string;   // Lookup column (internal name)
  typeField: string;       // Choice column (internal name)
  nameField: string;
}
