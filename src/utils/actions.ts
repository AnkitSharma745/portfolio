import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { resumeAsset } from "@/content/assets/resume";
import { socialProfiles } from "@/content/social/profiles";

export const openGithub = () => {
    window.open(socialProfiles.github.url, "_blank");
};

export const openLinkedin = () => {
    window.open(socialProfiles.linkedin.url, "_blank");
};

export const openTwitter = () => {
    window.open(socialProfiles.twitter.url, "_blank");
};

export const downloadResume = () => {
    const link = document.createElement('a');
    link.href = resumeAsset.path;
    link.download = resumeAsset.downloadFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

export const navigateTo = (router: AppRouterInstance, path: string) => {
    router.push(path);
};
