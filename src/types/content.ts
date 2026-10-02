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
  founderName: string;
  brandStatement: string;
  tagline: string;
  publicPositioning: {
    target: string;
    pillars: string[];
    missionStatement: string;
    callToAction: string;
  };
  communityLinks: {
    instagram: string;
    whatsappCommunity: string;
  };
  // Pending official information marked as placeholder
  statusFlags: {
    officialHistoryProvided: boolean;
    officialMissionProvided: boolean;
    officialVisionProvided: boolean;
    officialPartnersProvided: boolean;
    donationsEnabled: boolean;
  };
}
