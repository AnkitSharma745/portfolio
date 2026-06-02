import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const openGithub = () => {
    window.open("https://github.com/ankitsharma745", "_blank");
};

export const openLinkedin = () => {
    window.open("https://linkedin.com/in/ankitsharma745", "_blank");
};

export const openTwitter = () => {
    window.open("https://twitter.com/ankitsharma745", "_blank");
};

export const downloadResume = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Ankit_Sharma_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

export const navigateTo = (router: AppRouterInstance, path: string) => {
    router.push(path);
};
