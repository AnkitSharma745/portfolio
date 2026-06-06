import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { resumeAsset } from "@/content/assets/resume";
import { actionSocialProfiles } from "@/content/social/profiles";

export const openGithub = () => {
    window.open(actionSocialProfiles.github.url, "_blank");
};

export const openLinkedin = () => {
    window.open(actionSocialProfiles.linkedin.url, "_blank");
};

export const openTwitter = () => {
    window.open(actionSocialProfiles.twitter.url, "_blank");
};

export const downloadResume = () => {
    const link = document.createElement('a');
    link.href = resumeAsset.commandPalettePath;
    link.download = resumeAsset.commandPaletteDownloadFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

export const navigateTo = (router: AppRouterInstance, path: string) => {
    router.push(path);
};
