export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter: string;
    github: string;
    linkedin: string;
  };
  author: {
    name: string;
    email: string;
  };
}

export interface SEOConfig {
  title: {
    default: string;
    template: string;
  };
  description: string;
  keywords: string[];
  openGraph: {
    type: string;
    locale: string;
    url: string;
    siteName: string;
    images: {
      url: string;
      width: number;
      height: number;
      alt: string;
    }[];
  };
  twitter: {
    handle: string;
    site: string;
    cardType: string;
  };
}
