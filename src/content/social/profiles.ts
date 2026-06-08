export type SocialProfileId = "github" | "linkedin" | "twitter";

export interface SocialProfile {
  id: SocialProfileId;
  title: string;
  url: string;
}

export const socialProfiles: Record<SocialProfileId, SocialProfile> = {
  github: {
    id: "github",
    title: "GitHub",
    url: "https://github.com/ankitsharma745",
  },
  linkedin: {
    id: "linkedin",
    title: "LinkedIn",
    url: "https://www.linkedin.com/in/ankitsharma745",
  },
  twitter: {
    id: "twitter",
    title: "Twitter",
    url: "https://twitter.com",
  },
};

export const actionSocialProfiles = {
  github: {
    ...socialProfiles.github,
    url: "https://github.com/ankitsharma745",
  },
  linkedin: {
    ...socialProfiles.linkedin,
    url: "https://linkedin.com/in/ankitsharma745",
  },
  twitter: {
    ...socialProfiles.twitter,
    url: "https://twitter.com/ankitsharma745",
  },
} satisfies Record<SocialProfileId, SocialProfile>;
