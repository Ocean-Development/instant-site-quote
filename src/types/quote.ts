
export type WebsiteType = 
  | "informational" 
  | "ecommerce" 
  | "blog" 
  | "portfolio" 
  | "custom";

export type DesignComplexity = 
  | "basic" 
  | "standard" 
  | "premium" 
  | "custom";

export type PageCount = number;

export type Features = {
  contactForm: boolean;
  userAccounts: boolean;
  paymentProcessing: boolean;
  contentManagement: boolean;
  seo: boolean;
  analytics: boolean;
  socialMediaIntegration: boolean;
  responsiveDesign: boolean;
  customEmailAddresses: boolean;
  blog: boolean;
};

export type Timeline = 
  | "standard" 
  | "expedited" 
  | "rush";

export type QuoteFormData = {
  name: string;
  email: string;
  phone?: string;
  websiteType: WebsiteType;
  designComplexity: DesignComplexity;
  pageCount: PageCount;
  features: Features;
  timeline: Timeline;
  additionalInfo?: string;
};

export type QuoteResult = {
  basePrice: number;
  designPrice: number;
  featuresPrice: number;
  timelineMultiplier: number;
  totalPrice: number;
  breakdown: {
    [key: string]: number;
  };
  estimatedTimeInWeeks: number;
};
