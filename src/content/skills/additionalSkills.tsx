import type { HomeSkillItem } from "@/content/skills/homeSkills";

function TextSkillIcon({ label }: { label: string }) {
  return <span className="text-base font-black tracking-tight">{label}</span>;
}

export const additionalSkillsByGroupId: Record<string, HomeSkillItem[]> = {
  frontend: [
    { icon: <TextSkillIcon label="Ax" />, label: "Axios", slug: "axios" },
    { icon: <TextSkillIcon label="Rx" />, label: "Redux", slug: "redux" },
    { icon: <TextSkillIcon label="Zu" />, label: "Zustand", slug: "zustand" },
    {
      icon: <TextSkillIcon label="Ctx" />,
      label: "Context API",
      slug: "context-api",
    },
    { icon: <TextSkillIcon label="Fk" />, label: "Formik", slug: "formik" },
    { icon: <TextSkillIcon label="Yp" />, label: "Yup", slug: "yup" },
    { icon: <TextSkillIcon label="Zd" />, label: "Zod", slug: "zod" },
    { icon: <TextSkillIcon label="i18" />, label: "i18next", slug: "i18next" },
    {
      icon: <TextSkillIcon label="L10" />,
      label: "Localization",
      slug: "localization",
    },
    {
      icon: <TextSkillIcon label="ES" />,
      label: "ESLint Configuration",
      slug: "eslint-configuration",
    },
    {
      icon: <TextSkillIcon label="Lc" />,
      label: "Lucide React",
      slug: "lucide-react",
    },
    { icon: <TextSkillIcon label="Day" />, label: "Day.js", slug: "day-js" },
    { icon: <TextSkillIcon label="ID" />, label: "UUID", slug: "uuid" },
  ],
  backend: [
    { icon: <TextSkillIcon label="Ws" />, label: "Winston", slug: "winston" },
    {
      icon: <TextSkillIcon label="SE" />,
      label: "Serialize Error",
      slug: "serialize-error",
    },
    { icon: <TextSkillIcon label="Ch" />, label: "Chalk", slug: "chalk" },
    { icon: <TextSkillIcon label="Ck" />, label: "Chokidar", slug: "chokidar" },
  ],
};
