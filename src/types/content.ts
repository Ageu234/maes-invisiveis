export interface Story {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  date: string;
  location: string;
  documentRef: string;
  featuredImage: string;
  featuredImageAlt: string;
  content: string[];
  photographerCredit?: string;
  tags: string[];
  isFeatured?: boolean;
}

export interface NavItem {
  label: string;
  href: string;
  description?: string;
  isExternal?: boolean;
}

export interface ProjectInstitutionalInfo {
  name: string;
  projectName: string;
  founderName: string;
  founderTitle: string;
  brandStatement: string;
  tagline: string;
  siteUrl: string;
  aboutText?: string;
  mission?: string;
  objective?: string;
  values?: string[];
  publicPositioning: {
    target: string;
    pillars: string[];
    missionStatement: string;
    callToAction: string;
  };
  communityLinks: {
    instagram: string;
    whatsappCommunity: string | null;
  };
  statusFlags: {
    officialHistoryProvided: boolean;
    officialMissionProvided: boolean;
    officialVisionProvided: boolean;
    officialPartnersProvided: boolean;
    donationsEnabled: boolean;
  };
}
