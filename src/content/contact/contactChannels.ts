import {
  socialProfiles,
  type SocialProfileId,
} from "@/content/social/profiles";

export type ContactChannelIcon = SocialProfileId | "phone" | "email";

export interface ContactChannel {
  id: string;
  icon: ContactChannelIcon;
  title: string;
  link: string;
  description: string;
  detailText?: string;
  hoverColor: string;
}

export const contactChannels: ContactChannel[] = [
  {
    id: "github",
    icon: "github",
    title: socialProfiles.github.title,
    link: socialProfiles.github.url,
    description: "Check out my code",
    hoverColor: "group-hover:text-white",
  },
  {
    id: "linkedin",
    icon: "linkedin",
    title: socialProfiles.linkedin.title,
    link: socialProfiles.linkedin.url,
    description: "Let's connect professionally",
    hoverColor: "group-hover:text-blue-500",
  },
  {
    id: "twitter",
    icon: "twitter",
    title: socialProfiles.twitter.title,
    link: socialProfiles.twitter.url,
    description: "Follow my updates",
    hoverColor: "group-hover:text-sky-400",
  },
  {
    id: "phone",
    icon: "phone",
    title: "Phone",
    link: "tel:+916395794139",
    description: "+91 63957 94139",
    detailText: "+91 63957 94139",
    hoverColor: "group-hover:text-green-500",
  },
  {
    id: "email",
    icon: "email",
    title: "Email",
    link: "mailto:ankitaksharma9763@gmail.com",
    description: "ankitaksharma9763@gmail.com",
    detailText: "ankitaksharma9763@gmail.com",
    hoverColor: "group-hover:text-red-500",
  },
];
